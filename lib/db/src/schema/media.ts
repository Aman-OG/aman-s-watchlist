import { pgTable, text, serial, integer, real, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const mediaTable = pgTable("media", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type", { enum: ["anime", "series"] }).notNull(),
  year: integer("year").notNull(),
  poster: text("poster"),
  banner: text("banner"),
  rating: real("rating"),
  genres: jsonb("genres").$type<string[]>().notNull().default([]),
  synopsis: text("synopsis"),
  review: text("review"),
  isFavorite: boolean("is_favorite").notNull().default(false),
  rank: integer("rank"),
  episodes: integer("episodes"),
  seasons: integer("seasons"),
  status: text("status", { enum: ["completed", "watching", "plan_to_watch", "dropped"] }).notNull().default("completed"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertMediaSchema = createInsertSchema(mediaTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertMedia = z.infer<typeof insertMediaSchema>;
export type Media = typeof mediaTable.$inferSelect;
