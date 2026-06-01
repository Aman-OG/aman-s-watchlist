import React from "react";
import { useFavorites } from "@/hooks/useWatchlist";
import { Star } from "lucide-react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";

export default function Favorites() {
  const favorites = useFavorites().sort((a, b) => (b.rating || 0) - (a.rating || 0));
  const [location] = useLocation();

  const handleClick = () => {
    // Save current page and scroll position
    sessionStorage.setItem('mediaDetailReferrer', location);
    sessionStorage.setItem(`scrollPos_${location}`, window.scrollY.toString());
  };

  return (
    <div className="min-h-screen bg-background dark:bg-black text-foreground dark:text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-0 leading-tight">
            The ones I'd
          </h1>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 text-ring leading-tight">
            defend with my life.
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed font-medium">
            Not the best by any objective measure. Just the ones I'd put on if you said "show me who you are."
          </p>
        </motion.div>
      </section>

      {/* Favorites List */}
      <section className="container mx-auto px-4 pb-20">
        {favorites.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-xl">No favorites marked yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
            {favorites.map((item, index) => (
              <Link key={item.id} href={`/media/${item.id}`} onClick={handleClick}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group cursor-pointer"
                >
                  <div className="flex gap-6 items-start hover:opacity-80 transition-opacity duration-300">
                    {/* Rank Number */}
                    <div className="text-8xl md:text-9xl font-extrabold text-muted-foreground/20 leading-none select-none group-hover:text-ring/70 transition-colors duration-300">
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-2">
                      <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-semibold">
                        {item.type} · {item.year}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-extrabold mb-3 group-hover:text-ring transition-colors duration-300">
                        {item.title}
                      </h3>
                      {item.thoughts && (
                        <p className="text-muted-foreground italic text-sm md:text-base mb-3 line-clamp-2 font-medium">
                          "{item.thoughts}"
                        </p>
                      )}
                      {item.rating && (
                        <div className="flex items-center gap-2 text-ring">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="font-extrabold">{item.rating.toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
