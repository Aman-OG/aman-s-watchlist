import React, { useState } from "react";
import { useFilteredMedia } from "@/hooks/useWatchlist";
import { MediaCard } from "@/components/MediaCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, SortDesc } from "lucide-react";

export default function Anime() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"title" | "rating" | "year">("title");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const media = useFilteredMedia({
    type: "anime",
    search,
    sort,
    order
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-black mb-4">Anime Collection</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Explore all the anime I've watched. Search, filter, and sort to find your next recommendation.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8 bg-card border border-border p-4 rounded-xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input 
            placeholder="Search anime titles..." 
            className="pl-10 h-12 bg-background border-border/50 text-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="w-full md:w-48">
          <Select 
            value={`${sort}-${order}`} 
            onValueChange={(v) => {
              const [s, o] = v.split("-");
              setSort(s as "title" | "rating" | "year");
              setOrder(o as "asc" | "desc");
            }}
          >
            <SelectTrigger className="h-12 bg-background">
              <SortDesc className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title-asc">Title (A-Z)</SelectItem>
              <SelectItem value="title-desc">Title (Z-A)</SelectItem>
              <SelectItem value="rating-desc">Highest Rated</SelectItem>
              <SelectItem value="rating-asc">Lowest Rated</SelectItem>
              <SelectItem value="year-desc">Newest First</SelectItem>
              <SelectItem value="year-asc">Oldest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {media.length === 0 ? (
          <div className="col-span-full py-20 text-center">
            <div className="text-muted-foreground mb-4">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-bold mb-2 text-foreground">No anime found</h3>
              <p>Try adjusting your search.</p>
            </div>
          </div>
        ) : (
          media.map((item, i) => (
            <MediaCard key={item.id} item={item} index={i} />
          ))
        )}
      </div>
    </div>
  );
}
