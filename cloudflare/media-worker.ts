export interface Env {
  KYARA_MEDIA: R2Bucket;
  MIGRATION_TOKEN: string;
}

const origin = "https://kyaranova-kdbxcdvq.manus.space/manus-storage/";

function isSafeKey(value: unknown): value is string {
  return typeof value === "string" && /^[a-zA-Z0-9._-]+$/.test(value);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname.startsWith("/media/")) {
      const key = decodeURIComponent(url.pathname.slice("/media/".length));
      if (!isSafeKey(key)) return new Response("Not found", { status: 404 });

      const object = await env.KYARA_MEDIA.get(key);
      if (!object) return new Response("Not found", { status: 404 });

      const headers = new Headers();
      object.writeHttpMetadata(headers);
      headers.set("etag", object.httpEtag);
      headers.set("access-control-allow-origin", "https://kyaranova.kyaraverse.com");
      return new Response(object.body, { headers });
    }

    if (request.method !== "POST" || url.pathname !== "/migrate") {
      return new Response("Not found", { status: 404 });
    }

    if (request.headers.get("Authorization") !== `Bearer ${env.MIGRATION_TOKEN}`) {
      return new Response("Unauthorized", { status: 401 });
    }

    let payload: { key?: unknown };
    try {
      payload = await request.json();
    } catch {
      return new Response("Invalid JSON", { status: 400 });
    }

    if (!isSafeKey(payload.key)) return new Response("Invalid key", { status: 400 });

    const upstream = await fetch(`${origin}${encodeURIComponent(payload.key)}`);
    if (!upstream.ok || !upstream.body) {
      return new Response("Source unavailable", { status: 502 });
    }

    await env.KYARA_MEDIA.put(payload.key, upstream.body, {
      httpMetadata: {
        contentType: upstream.headers.get("content-type") ?? "application/octet-stream",
        cacheControl: "public, max-age=31536000, immutable",
      },
    });

    return Response.json({ success: true, key: payload.key });
  },
} satisfies ExportedHandler<Env>;
