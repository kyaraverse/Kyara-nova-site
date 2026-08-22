import { COOKIE_NAME } from "@shared/const";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createMuralMessage, listMuralMessages, markMuralEmailDelivered } from "./db";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { sendMuralEmail } from "./muralEmail";

const muralMessageInput = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(320),
  purpose: z.string().trim().min(1).max(120),
  message: z.string().trim().min(5).max(4000),
  locale: z.enum(["en", "pt", "es", "ko", "fr", "zh"]),
});

const MURAL_WINDOW_MS = 15 * 60 * 1000;
const MURAL_MAX_SUBMISSIONS = 5;
const muralSubmissionWindows = new Map<string, { startedAt: number; count: number }>();

function enforceMuralRateLimit(key: string) {
  const now = Date.now();
  const window = muralSubmissionWindows.get(key);
  if (!window || now - window.startedAt >= MURAL_WINDOW_MS) {
    muralSubmissionWindows.set(key, { startedAt: now, count: 1 });
    return;
  }
  if (window.count >= MURAL_MAX_SUBMISSIONS) {
    throw new TRPCError({ code: "TOO_MANY_REQUESTS", message: "Mural rate limit reached" });
  }
  window.count += 1;
}

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  mural: router({
    submit: publicProcedure.input(muralMessageInput).mutation(async ({ ctx, input }) => {
      const forwardedFor = ctx.req.headers["x-forwarded-for"];
      const ip = typeof forwardedFor === "string" ? forwardedFor.split(",")[0].trim() : ctx.req.ip ?? "unknown";
      enforceMuralRateLimit(`${ip}:${input.email.toLowerCase()}`);
      const id = await createMuralMessage({
        senderName: input.name,
        senderEmail: input.email,
        purpose: input.purpose,
        message: input.message,
        locale: input.locale,
      });
      const delivered = await sendMuralEmail(input);
      if (delivered) await markMuralEmailDelivered(id);
      return { success: true, delivered } as const;
    }),
    list: adminProcedure.query(() => listMuralMessages()),
  }),

  // TODO: add feature routers here, e.g.
  // todo: router({
  //   list: protectedProcedure.query(({ ctx }) =>
  //     db.getUserTodos(ctx.user.id)
  //   ),
  // }),
});

export type AppRouter = typeof appRouter;
