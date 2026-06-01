import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Star, TrendingUp, Tv, Film, User } from "lucide-react";
import { useTopMedia, useStats } from "@/hooks/useWatchlist";
import { MediaCard } from "@/components/MediaCard";
import { Button } from "@/components/ui/button";

// ─── Replace this with your own photo URL ───────────────────────────────────
const AMAN_PHOTO_URL = "/aman-photo.jpg";
// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  const topMedia = useTopMedia(10);
  const stats = useStats();
  const heroItem = topMedia[0];

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
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-16 lg:gap-32">

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
                className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight mb-6"
              >
                <span className="text-foreground">Aman's </span>
                <span className="text-ring">Watchlist</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="text-base md:text-lg text-muted-foreground mb-10 leading-relaxed max-w-2xl"
              >
                A personal archive of every series and anime I've watched, rated, and remembered over the years.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Link href="/series">
                  <Button size="lg" className="h-12 px-8 text-base font-bold">
                    Browse Series
                  </Button>
                </Link>
                <Link href="/anime">
                  <Button size="lg" variant="outline" className="h-12 px-8 text-base font-bold bg-background/5 backdrop-blur-sm border-border hover:bg-accent">
                    Browse Anime
                  </Button>
                </Link>
              </motion.div>
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
                        <code className="text-ring/60 text-[10px]">src/pages/home.tsx → AMAN_PHOTO_URL</code>
                      </span>
                    </div>
                  )}
                </div>
                {/* Decorative arc */}
                <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-ring flex items-center justify-center shadow-lg shadow-ring/30">
                  <Star className="w-4 h-4 text-white fill-white" />
                </div>
              </div>

              <div className="text-center">
                <p className="text-foreground font-bold text-lg tracking-wide">Aman</p>
                <p className="text-muted-foreground text-sm">Curator & Reviewer</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-border/40 bg-card/30 backdrop-blur-md">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-x divide-border/40">
            {[
              { label: "Total Series", value: stats.totalSeries, icon: <Film className="w-5 h-5 text-ring" /> },
              { label: "Total Anime", value: stats.totalAnime, icon: <Tv className="w-5 h-5 text-ring" /> },
              { label: "Avg Rating", value: stats.averageRating.toFixed(1), icon: <Star className="w-5 h-5 text-ring" /> },
              { label: "Completed", value: stats.totalCompleted, icon: <TrendingUp className="w-5 h-5 text-ring" /> }
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
                <div className="text-3xl font-black">{stat.value || 0}</div>
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
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {topMedia.slice(0, 10).map((item, i) => (
            <MediaCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
