import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Star, Tv, Film } from "lucide-react";
import type { MediaItem } from "@workspace/api-client-react/src/generated/api.schemas";
import { Badge } from "./ui/badge";

export function MediaCard({ item, index = 0 }: { item: MediaItem; index?: number }) {
  return (
    <Link href={`/media/${item.id}`} className="block group">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.4 }}
        className="relative overflow-hidden rounded-xl bg-card border border-border transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(var(--ring),0.2)]"
      >
        <div className="aspect-[2/3] w-full relative bg-muted flex items-center justify-center">
          {item.poster ? (
            <img
              src={item.poster}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="text-muted-foreground flex flex-col items-center">
              {item.type === "anime" ? <Tv className="w-12 h-12 mb-2 opacity-20" /> : <Film className="w-12 h-12 mb-2 opacity-20" />}
              <span className="text-xs uppercase tracking-wider font-semibold opacity-50">No Poster</span>
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="absolute top-2 right-2 flex flex-col gap-1">
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm border-none shadow-sm uppercase text-[10px] tracking-widest font-bold">
              {item.type}
            </Badge>
            {item.status && (
              <Badge variant="outline" className="bg-background/80 backdrop-blur-sm border-none shadow-sm capitalize text-[10px]">
                {item.status.replace(/_/g, " ")}
              </Badge>
            )}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="font-bold text-lg leading-tight text-white line-clamp-2 mb-1 drop-shadow-md">
              {item.title}
            </h3>
            <div className="flex items-center justify-between text-sm text-gray-300 font-medium">
              <span>{item.year}</span>
              {item.rating != null && (
                <div className="flex items-center gap-1 text-ring drop-shadow-md">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-white font-bold">{item.rating.toFixed(1)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export function MediaCardSkeleton() {
  return (
    <div className="aspect-[2/3] w-full rounded-xl bg-muted animate-pulse"></div>
  );
}
