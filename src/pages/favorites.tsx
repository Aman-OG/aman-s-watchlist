import React from "react";
import { useFavorites } from "@/hooks/useWatchlist";
import { MediaCard } from "@/components/MediaCard";
import { Heart } from "lucide-react";

export default function Favorites() {
  const favorites = useFavorites();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-black mb-4 flex items-center gap-4">
          <Heart className="w-10 h-10 text-destructive fill-destructive" />
          Hall of Favorites
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          The prestige showcase. These are the unforgettable stories that define the vault.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {favorites.length === 0 ? (
          <div className="col-span-full py-20 text-center border border-border/50 rounded-2xl bg-card/30">
            <div className="text-muted-foreground mb-4">
              <Heart className="w-16 h-16 mx-auto mb-6 opacity-20" />
              <h3 className="text-2xl font-bold mb-2 text-foreground">No favorites yet</h3>
              <p className="text-lg">Mark items as favorite in the JSON file to see them here.</p>
            </div>
          </div>
        ) : (
          favorites.map((item, i) => (
            <MediaCard key={item.id} item={item} index={i} />
          ))
        )}
      </div>
    </div>
  );
}
