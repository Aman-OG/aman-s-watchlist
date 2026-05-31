import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Star, TrendingUp, Tv, Film, PlayCircle, User } from "lucide-react";
import { useGetTopMedia, useGetStats } from "@workspace/api-client-react";
import { MediaCard, MediaCardSkeleton } from "@/components/MediaCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

// ─── Replace this with your own photo URL ───────────────────────────────────
const AMAN_PHOTO_URL = "";
// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  const { data: topMedia, isLoading: isLoadingTop } = useGetTopMedia({ limit: 10 });
  const { data: stats, isLoading: isLoadingStats } = useGetStats();

  const heroItem = topMedia?.[0];

  return (
    <div className="w-full flex flex-col pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] w-full bg-background flex items-center overflow-hidden">
        {/* Faint background texture from highest-rated poster */}
        {heroItem && (
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img
              src={heroItem.banner || heroItem.poster || ""}
              alt=""
              className="w-full h-full object-cover opacity-[0.06]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/50" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/60" />
          </div>
        )}

        <div className="container mx-auto px-4 z-10 relative py-20">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20">

            {/* LEFT — Identity text */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="flex-1 max-w-2xl order-2 lg:order-1"
            >
              {/* The name — big, proud, impossible to miss */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8 }}
                className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.95] tracking-tight mb-4"
              >
                <span className="text-white">Aman's</span>
                <br />
                <span className="text-ring">Watch</span>
                <br />
                <span className="text-white">Vault.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="text-base md:text-lg text-gray-400 mb-10 leading-relaxed max-w-md"
              >
                Every series and anime I've lived inside — rated, reviewed, and ranked.
                A quiet archive for the stories that stayed with me.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.6 }}
                className="flex flex-wrap gap-4"
              >
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
              </motion.div>

              {/* Highest Rated pill — subtle callout */}
              {heroItem && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75, duration: 0.6 }}
                  className="mt-10 inline-flex items-center gap-4 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm px-5 py-3"
                >
                  {heroItem.poster && (
                    <img
                      src={heroItem.poster}
                      alt={heroItem.title}
                      className="w-10 h-14 object-cover rounded-md shrink-0 shadow-lg"
                    />
                  )}
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-[10px] text-ring font-bold tracking-widest uppercase flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      Highest Rated
                    </span>
                    <Link href={`/media/${heroItem.id}`}>
                      <span className="text-white font-bold text-sm leading-tight hover:text-ring transition-colors cursor-pointer truncate block">
                        {heroItem.title}
                      </span>
                    </Link>
                    <span className="text-gray-500 text-xs">{heroItem.rating?.toFixed(1)}/10 · {heroItem.year}</span>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* RIGHT — Personal photo portrait */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.9, ease: "easeOut" }}
              className="order-1 lg:order-2 flex flex-col items-center gap-4 shrink-0"
            >
              {/* Glow ring + photo */}
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-ring/20 blur-3xl scale-110 pointer-events-none" />
                <div className="relative w-52 h-52 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full border-2 border-ring/40 overflow-hidden shadow-2xl bg-card">
                  {AMAN_PHOTO_URL ? (
                    <img
                      src={AMAN_PHOTO_URL}
                      alt="Aman"
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-card to-card/50">
                      <User className="w-16 h-16 text-ring/40" strokeWidth={1.5} />
                      <span className="text-xs text-gray-600 text-center px-4 leading-relaxed">
                        Add your photo URL in<br />
                        <code className="text-ring/60 text-[10px]">home.tsx → AMAN_PHOTO_URL</code>
                      </span>
                    </div>
                  )}
                </div>
                {/* Decorative arc */}
                <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-ring flex items-center justify-center shadow-lg shadow-ring/30">
                  <Star className="w-4 h-4 text-black fill-black" />
                </div>
              </div>

              <div className="text-center">
                <p className="text-white font-bold text-lg tracking-wide">Aman</p>
                <p className="text-gray-500 text-sm">Curator & Reviewer</p>
              </div>
            </motion.div>

          </div>
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
