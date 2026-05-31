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
      <section className="relative min-h-[88vh] w-full bg-background flex items-center overflow-hidden">
        {/* Subtle background: faint poster behind everything */}
        {heroItem && (
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img
              src={heroItem.banner || heroItem.poster || ""}
              alt=""
              className="w-full h-full object-cover opacity-[0.07]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
          </div>
        )}

        <div className="container mx-auto px-4 z-10 relative flex flex-col items-start justify-center py-24">
          {/* Identity-first hero */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-ring font-semibold tracking-[0.25em] text-sm uppercase mb-5"
            >
              Aman's Watch Vault
            </motion.p>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight mb-6 text-white">
              Every story
              <br />
              <span className="text-ring">I've lived inside.</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed max-w-xl">
              Rated, reviewed, and ranked — a quiet archive for the anime and series that stayed with me long after the credits rolled.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/browse">
                <Button size="lg" className="h-12 px-8 text-base font-bold">
                  Browse the Vault
                </Button>
              </Link>
              <Link href="/favorites">
                <Button size="lg" variant="outline" className="h-12 px-8 text-base font-bold bg-white/5 backdrop-blur-sm border-white/15 hover:bg-white/10 text-white">
                  View Favorites
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Featured: Highest rated — secondary, below the identity */}
          {heroItem && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="mt-16 flex items-center gap-5 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm px-6 py-4 max-w-lg"
            >
              {heroItem.poster && (
                <img
                  src={heroItem.poster}
                  alt={heroItem.title}
                  className="w-14 h-20 object-cover rounded-lg shrink-0 shadow-lg"
                />
              )}
              <div className="flex flex-col gap-1 min-w-0">
                <span className="text-xs text-ring font-semibold tracking-widest uppercase flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  Highest Rated
                </span>
                <Link href={`/media/${heroItem.id}`}>
                  <span className="text-white font-bold text-lg leading-tight hover:text-ring transition-colors cursor-pointer truncate block">
                    {heroItem.title}
                  </span>
                </Link>
                <span className="text-gray-400 text-sm">{heroItem.rating?.toFixed(1)}/10 · {heroItem.year}</span>
              </div>
              <Link href={`/media/${heroItem.id}`} className="ml-auto shrink-0">
                <Button size="sm" variant="ghost" className="text-ring hover:text-ring hover:bg-ring/10">
                  <PlayCircle className="w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
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
