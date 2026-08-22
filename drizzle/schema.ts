import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const muralMessages = mysqlTable("mural_messages", {
  id: varchar("id", { length: 21 }).primaryKey(),
  senderName: varchar("senderName", { length: 120 }).notNull(),
  senderEmail: varchar("senderEmail", { length: 320 }).notNull(),
  purpose: varchar("purpose", { length: 120 }).notNull(),
  message: text("message").notNull(),
  locale: varchar("locale", { length: 8 }).notNull(),
  emailDelivered: int("emailDelivered").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type MuralMessage = typeof muralMessages.$inferSelect;
export type InsertMuralMessage = typeof muralMessages.$inferInsert;

// TODO: Add your tables here
