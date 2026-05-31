export interface WatchItem {
  id: number;
  title: string;
  type: "series" | "anime";
  year: number;
  rating: number;
  favorite: boolean;
  status: "completed" | "watching" | "plan_to_watch" | "dropped";
  genres: string[];
  thoughts: string;
  poster: string;
  banner?: string;
}
