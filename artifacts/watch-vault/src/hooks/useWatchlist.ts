import watchlist from "@/data/watchlist.json";
import type { WatchItem } from "@/types";

export const allItems = watchlist as WatchItem[];

export function useWatchlist() {
  return allItems;
}

export function filterAndSort(
  items: WatchItem[],
  {
    search = "",
    status = "all",
    sort = "rating-desc",
    type,
  }: {
    search?: string;
    status?: string;
    sort?: string;
    type?: "anime" | "series";
  }
): WatchItem[] {
  let result = [...items];

  if (type) result = result.filter((i) => i.type === type);
  if (status !== "all") result = result.filter((i) => i.status === status);
  if (search.trim()) {
    const q = search.toLowerCase();
    result = result.filter((i) => i.title.toLowerCase().includes(q));
  }

  const [sortKey, sortDir] = sort.split("-");
  result.sort((a, b) => {
    let av: string | number = 0;
    let bv: string | number = 0;
    if (sortKey === "rating") { av = a.rating ?? 0; bv = b.rating ?? 0; }
    else if (sortKey === "title") { av = a.title; bv = b.title; }
    else if (sortKey === "year") { av = a.year; bv = b.year; }
    if (av < bv) return sortDir === "asc" ? -1 : 1;
    if (av > bv) return sortDir === "asc" ? 1 : -1;
    return 0;
  });

  return result;
}
