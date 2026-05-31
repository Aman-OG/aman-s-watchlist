import React, { useState } from "react";
import { Tv } from "lucide-react";
import { allItems, filterAndSort } from "@/hooks/useWatchlist";
import { MediaCard } from "@/components/MediaCard";
import { SearchBar } from "@/components/SearchBar";
import { FilterBar } from "@/components/FilterBar";
import { EmptyState } from "@/components/EmptyState";

export default function Anime() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("rating-desc");

  const items = filterAndSort(allItems, { search, status, sort, type: "anime" });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-black mb-4 flex items-center gap-4">
          <Tv className="w-10 h-10 text-primary" />
          Anime
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Every anime I've watched — from classics to modern masterpieces.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8 bg-card border border-border p-4 rounded-xl">
        <SearchBar value={search} onChange={setSearch} placeholder="Search anime..." />
        <FilterBar status={status} onStatusChange={setStatus} sort={sort} onSortChange={setSort} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {items.length === 0 ? (
          <EmptyState
            icon={<Tv className="w-16 h-16" />}
            title="No anime found"
            description="Try adjusting your search or filters."
          />
        ) : (
          items.map((item, i) => (
            <MediaCard key={item.id} item={item} index={i} />
          ))
        )}
      </div>
    </div>
  );
}
