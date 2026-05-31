import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Star, TrendingUp, Tv, Film, PlayCircle } from "lucide-react";
import { useGetTopMedia, useGetStats } from "@workspace/api-client-react";
import { MediaCard, MediaCardSkeleton } from "@/components/MediaCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: topMedia, isLoading: isLoadingTop } = useGetTopMedia({ limit: 10 });
  const { data: stats, isLoading: isLoadingStats } = useGetStats();

  const heroItem = topMedia?.[0];

  return (
    <div className="w-full flex flex-col pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] w-full bg-background flex items-center overflow-hidden">
        {heroItem ? (
          <>
            <div className="absolute inset-0 z-0">
              <img 
                src={heroItem.banner || heroItem.poster || ""} 
                alt={heroItem.title}
                className="w-full h-full object-cover opacity-40 blur-[2px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
            </div>
            
            <div className="container mx-auto px-4 z-10 relative">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-2xl"
              >
                <div className="flex items-center gap-2 mb-4 text-ring font-bold tracking-widest text-sm uppercase">
                  <Star className="w-4 h-4 fill-current" />
                  <span>Highest Rated • {heroItem.rating?.toFixed(1)}/10</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black mb-4 text-white drop-shadow-lg leading-tight">
                  {heroItem.title}
                </h1>
                <p className="text-lg md:text-xl text-gray-300 mb-8 line-clamp-3 leading-relaxed">
                  {heroItem.synopsis || "An epic journey awaits in this top-rated masterpiece from Aman's curated vault."}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href={`/media/${heroItem.id}`}>
                    <Button size="lg" className="h-12 px-8 text-lg font-bold">
                      <PlayCircle className="w-5 h-5 mr-2" />
                      View Details
                    </Button>
                  </Link>
                  <Link href="/browse">
                    <Button size="lg" variant="outline" className="h-12 px-8 text-lg font-bold bg-background/20 backdrop-blur-sm border-white/20 hover:bg-white/10 text-white">
                      Browse Vault
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </>
        ) : (
          <div className="container mx-auto px-4 z-10 relative flex items-center h-full">
            <div className="max-w-2xl space-y-4">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-3/4" />
              <div className="flex gap-4 pt-4">
                <Skeleton className="h-12 w-40" />
                <Skeleton className="h-12 w-40" />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Stats Bar */}
      <section className="border-y border-border/40 bg-card/30 backdrop-blur-md sticky top-16 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-x divide-border/40">
            {[
              { label: "Total Anime", value: stats?.totalAnime, icon: <Tv className="w-5 h-5 text-ring" /> },
              { label: "Total Series", value: stats?.totalSeries, icon: <Film className="w-5 h-5 text-ring" /> },
              { label: "Avg Rating", value: stats?.averageRating?.toFixed(1), icon: <Star className="w-5 h-5 text-ring" /> },
              { label: "Completed", value: stats?.totalCompleted, icon: <TrendingUp className="w-5 h-5 text-ring" /> }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className={`flex flex-col items-center justify-center text-center ${i % 2 === 0 ? "pl-0" : "pl-6 md:pl-0"}`}
              >
                <div className="flex items-center gap-2 mb-2 text-muted-foreground font-medium text-sm uppercase tracking-wider">
                  {stat.icon}
                  {stat.label}
                </div>
                <div className="text-3xl font-black">
                  {isLoadingStats ? <Skeleton className="h-8 w-16" /> : stat.value || 0}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top 10 Ranking */}
      <section className="container mx-auto px-4 pt-24">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black mb-2 flex items-center gap-3">
              <Star className="w-8 h-8 text-ring fill-ring" />
              Top Ranked Masterpieces
            </h2>
            <p className="text-muted-foreground text-lg">The absolute best from the vault.</p>
          </div>
          <Link href="/browse?sort=rating&order=desc" className="text-primary font-bold hover:underline">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {isLoadingTop
            ? Array.from({ length: 5 }).map((_, i) => <MediaCardSkeleton key={i} />)
            : topMedia?.slice(0, 10).map((item, i) => (
                <MediaCard key={item.id} item={item} index={i} />
              ))}
        </div>
      </section>
    </div>
  );
}
