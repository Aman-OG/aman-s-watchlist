export interface MediaItem {
  id: number;
  title: string;
  type: "anime" | "series";
  year: number;
  genres: string[];
  poster: string;
  banner?: string;
  status: "completed" | "watching" | "plan_to_watch" | "dropped";
  rating: number;
  favorite: boolean;
  thoughts?: string;
  synopsis?: string;
  review?: string;
  episodes?: number;
  seasons?: number;
}

export interface Stats {
  totalItems: number;
  totalAnime: number;
  totalSeries: number;
  averageRating: number;
  highestRated: MediaItem | null;
  totalCompleted: number;
  totalWatching: number;
  totalPlanToWatch: number;
  favoriteCount: number;
  ratingDistribution: { range: string; count: number }[];
  genreBreakdown: { genre: string; count: number }[];
}
