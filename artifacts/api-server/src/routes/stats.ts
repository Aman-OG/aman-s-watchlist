import { Router } from "express";
import { db, mediaTable } from "@workspace/db";
import { eq, desc, avg, count, sql } from "drizzle-orm";

const router = Router();

router.get("/stats", async (req, res) => {
  const [totals] = await db
    .select({
      totalItems: count(),
      totalAnime: sql<number>`COUNT(*) FILTER (WHERE ${mediaTable.type} = 'anime')`,
      totalSeries: sql<number>`COUNT(*) FILTER (WHERE ${mediaTable.type} = 'series')`,
      averageRating: avg(mediaTable.rating),
      totalCompleted: sql<number>`COUNT(*) FILTER (WHERE ${mediaTable.status} = 'completed')`,
      totalWatching: sql<number>`COUNT(*) FILTER (WHERE ${mediaTable.status} = 'watching')`,
      totalPlanToWatch: sql<number>`COUNT(*) FILTER (WHERE ${mediaTable.status} = 'plan_to_watch')`,
      favoriteCount: sql<number>`COUNT(*) FILTER (WHERE ${mediaTable.isFavorite} = true)`,
    })
    .from(mediaTable);

  const [highestRatedRow] = await db
    .select()
    .from(mediaTable)
    .where(sql`${mediaTable.rating} IS NOT NULL`)
    .orderBy(desc(mediaTable.rating))
    .limit(1);

  const allItems = await db.select({ rating: mediaTable.rating }).from(mediaTable);
  const ratingBuckets = [
    { range: "0-2", min: 0, max: 2 },
    { range: "3-4", min: 3, max: 4 },
    { range: "5-6", min: 5, max: 6 },
    { range: "7-8", min: 7, max: 8 },
    { range: "9-10", min: 9, max: 10 },
  ];
  const ratingDistribution = ratingBuckets.map((b) => ({
    range: b.range,
    count: allItems.filter((i) => i.rating !== null && i.rating >= b.min && i.rating <= b.max).length,
  }));

  const allWithGenres = await db.select({ genres: mediaTable.genres }).from(mediaTable);
  const genreMap: Record<string, number> = {};
  for (const row of allWithGenres) {
    const genres = Array.isArray(row.genres) ? row.genres : [];
    for (const g of genres) {
      genreMap[g] = (genreMap[g] || 0) + 1;
    }
  }
  const genreBreakdown = Object.entries(genreMap)
    .map(([genre, count]) => ({ genre, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  res.json({
    totalItems: Number(totals.totalItems),
    totalAnime: Number(totals.totalAnime),
    totalSeries: Number(totals.totalSeries),
    averageRating: totals.averageRating ? Number(Number(totals.averageRating).toFixed(1)) : null,
    highestRated: highestRatedRow
      ? {
          ...highestRatedRow,
          genres: Array.isArray(highestRatedRow.genres) ? highestRatedRow.genres : [],
          createdAt: highestRatedRow.createdAt.toISOString(),
          updatedAt: highestRatedRow.updatedAt.toISOString(),
        }
      : null,
    totalCompleted: Number(totals.totalCompleted),
    totalWatching: Number(totals.totalWatching),
    totalPlanToWatch: Number(totals.totalPlanToWatch),
    favoriteCount: Number(totals.favoriteCount),
    ratingDistribution,
    genreBreakdown,
  });
});

export default router;
