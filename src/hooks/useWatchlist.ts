import { useMemo } from "react";
import watchlistData from "../../data/watchlist.json";
import type { MediaItem, Stats } from "@/types";

// Cast the imported data to our type
const watchlist = watchlistData as MediaItem[];

export function useWatchlist() {
  return useMemo(() => watchlist, []);
}

export function useMediaById(id: number) {
  const watchlist = useWatchlist();
  return useMemo(() => {
    console.log("useMediaById - Looking for ID:", id);
    console.log("useMediaById - Watchlist length:", watchlist.length);
    console.log("useMediaById - First item ID:", watchlist[0]?.id);
    const found = watchlist.find((item) => item.id === id);
    console.log("useMediaById - Found:", !!found);
    return found;
  }, [watchlist, id]);
}

export function useFilteredMedia(filters: {
  type?: "anime" | "series";
  search?: string;
  favorite?: boolean;
  sort?: "title" | "rating" | "year";
  order?: "asc" | "desc";
}) {
  const watchlist = useWatchlist();

  return useMemo(() => {
    let filtered = [...watchlist];

    // Filter by type
    if (filters.type) {
      filtered = filtered.filter((item) => item.type === filters.type);
    }

    // Filter by favorite
    if (filters.favorite !== undefined) {
      filtered = filtered.filter((item) => item.favorite === filters.favorite);
    }

    // Filter by search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(searchLower)
      );
    }

    // Sort
    const sortField = filters.sort || "title";
    const sortOrder = filters.order || "asc";

    filtered.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      // Handle string comparison
      if (typeof aVal === "string" && typeof bVal === "string") {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [watchlist, filters]);
}

export function useTopMedia(limit = 10) {
  const watchlist = useWatchlist();

  return useMemo(() => {
    return [...watchlist]
      .filter((item) => item.rating > 0)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  }, [watchlist, limit]);
}

export function useFavorites() {
  const watchlist = useWatchlist();

  return useMemo(() => {
    return watchlist.filter((item) => item.favorite);
  }, [watchlist]);
}

export function useStats(): Stats {
  const watchlist = useWatchlist();

  return useMemo(() => {
    const totalItems = watchlist.length;
    const totalAnime = watchlist.filter((item) => item.type === "anime").length;
    const totalSeries = watchlist.filter((item) => item.type === "series").length;

    const ratedItems = watchlist.filter((item) => item.rating > 0);
    const averageRating =
      ratedItems.length > 0
        ? ratedItems.reduce((sum, item) => sum + item.rating, 0) / ratedItems.length
        : 0;

    const highestRated =
      ratedItems.length > 0
        ? ratedItems.reduce((max, item) => (item.rating > max.rating ? item : max))
        : null;

    const totalCompleted = watchlist.filter((item) => item.status === "completed").length;
    const totalWatching = watchlist.filter((item) => item.status === "watching").length;
    const totalPlanToWatch = watchlist.filter(
      (item) => item.status === "plan_to_watch"
    ).length;
    const favoriteCount = watchlist.filter((item) => item.favorite).length;

    // Rating distribution
    const ratingBuckets = [
      { range: "0-2", min: 0, max: 2 },
      { range: "3-4", min: 3, max: 4 },
      { range: "5-6", min: 5, max: 6 },
      { range: "7-8", min: 7, max: 8 },
      { range: "9-10", min: 9, max: 10 },
    ];

    const ratingDistribution = ratingBuckets.map((bucket) => ({
      range: bucket.range,
      count: watchlist.filter(
        (item) => item.rating >= bucket.min && item.rating <= bucket.max
      ).length,
    }));

    // Genre breakdown
    const genreMap: Record<string, number> = {};
    watchlist.forEach((item) => {
      item.genres.forEach((genre) => {
        genreMap[genre] = (genreMap[genre] || 0) + 1;
      });
    });

    const genreBreakdown = Object.entries(genreMap)
      .map(([genre, count]) => ({ genre, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return {
      totalItems,
      totalAnime,
      totalSeries,
      averageRating,
      highestRated,
      totalCompleted,
      totalWatching,
      totalPlanToWatch,
      favoriteCount,
      ratingDistribution,
      genreBreakdown,
    };
  }, [watchlist]);
}
