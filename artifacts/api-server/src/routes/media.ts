import { Router } from "express";
import { db, mediaTable } from "@workspace/db";
import { eq, desc, asc, ilike, and, sql } from "drizzle-orm";
import {
  ListMediaQueryParams,
  GetMediaParams,
  UpdateMediaParams,
  DeleteMediaParams,
  ToggleFavoriteParams,
  GetTopMediaQueryParams,
  CreateMediaBody,
  UpdateMediaBody,
} from "@workspace/api-zod";

const router = Router();

router.get("/media", async (req, res) => {
  const parsed = ListMediaQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid query parameters" });
    return;
  }
  const { type, favorite, search, sort = "rating", order = "desc" } = parsed.data;

  const conditions = [];
  if (type) conditions.push(eq(mediaTable.type, type));
  if (favorite !== undefined) conditions.push(eq(mediaTable.isFavorite, favorite));
  if (search) conditions.push(ilike(mediaTable.title, `%${search}%`));

  const sortCol =
    sort === "year" ? mediaTable.year :
    sort === "title" ? mediaTable.title :
    sort === "rank" ? mediaTable.rank :
    mediaTable.rating;

  const orderFn = order === "asc" ? asc : desc;

  const items = await db
    .select()
    .from(mediaTable)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(orderFn(sortCol));

  res.json(items.map(serializeMedia));
});

router.post("/media", async (req, res) => {
  const parsed = CreateMediaBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid body" });
    return;
  }
  const [item] = await db.insert(mediaTable).values(parsed.data).returning();
  res.status(201).json(serializeMedia(item));
});

router.get("/media/top", async (req, res) => {
  const parsed = GetTopMediaQueryParams.safeParse(req.query);
  const limit = parsed.success ? (parsed.data.limit ?? 10) : 10;

  const items = await db
    .select()
    .from(mediaTable)
    .where(sql`${mediaTable.rating} IS NOT NULL`)
    .orderBy(desc(mediaTable.rating))
    .limit(limit);

  res.json(items.map(serializeMedia));
});

router.get("/media/favorites", async (req, res) => {
  const items = await db
    .select()
    .from(mediaTable)
    .where(eq(mediaTable.isFavorite, true))
    .orderBy(desc(mediaTable.rating));

  res.json(items.map(serializeMedia));
});

router.get("/media/:id", async (req, res) => {
  const parsed = GetMediaParams.safeParse(req.params);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const [item] = await db.select().from(mediaTable).where(eq(mediaTable.id, parsed.data.id));
  if (!item) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(serializeMedia(item));
});

router.patch("/media/:id", async (req, res) => {
  const paramsParsed = UpdateMediaParams.safeParse(req.params);
  if (!paramsParsed.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const bodyParsed = UpdateMediaBody.safeParse(req.body);
  if (!bodyParsed.success) {
    res.status(400).json({ error: "Invalid body" });
    return;
  }
  const [item] = await db
    .update(mediaTable)
    .set({ ...bodyParsed.data, updatedAt: new Date() })
    .where(eq(mediaTable.id, paramsParsed.data.id))
    .returning();
  if (!item) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(serializeMedia(item));
});

router.delete("/media/:id", async (req, res) => {
  const parsed = DeleteMediaParams.safeParse(req.params);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const [item] = await db.delete(mediaTable).where(eq(mediaTable.id, parsed.data.id)).returning();
  if (!item) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.status(204).send();
});

router.patch("/media/:id/favorite", async (req, res) => {
  const parsed = ToggleFavoriteParams.safeParse(req.params);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const [existing] = await db.select().from(mediaTable).where(eq(mediaTable.id, parsed.data.id));
  if (!existing) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  const [item] = await db
    .update(mediaTable)
    .set({ isFavorite: !existing.isFavorite, updatedAt: new Date() })
    .where(eq(mediaTable.id, parsed.data.id))
    .returning();
  res.json(serializeMedia(item));
});

function serializeMedia(item: typeof mediaTable.$inferSelect) {
  return {
    ...item,
    genres: Array.isArray(item.genres) ? item.genres : [],
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  };
}

export default router;
