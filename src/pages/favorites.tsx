import React from "react";
import { useFavorites } from "@/hooks/useWatchlist";
import { Star } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function Favorites() {
  const favorites = useFavorites().sort((a, b) => (b.rating || 0) - (a.rating || 0));

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-6 leading-tight">
            The ones I'd
          </h1>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif italic mb-8 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
            defend with my life.
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
            Not the best by any objective measure. Just the ones I'd put on if you said "show me who you are."
          </p>
        </motion.div>
      </section>

      {/* Favorites List */}
      <section className="container mx-auto px-4 pb-20">
        {favorites.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">No favorites marked yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
            {favorites.map((item, index) => (
              <Link key={item.id} href={`/media/${item.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group cursor-pointer"
                >
                  <div className="flex gap-6 items-start hover:opacity-80 transition-opacity duration-300">
                    {/* Rank Number */}
                    <div className="text-8xl md:text-9xl font-bold text-gray-800 leading-none select-none">
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-2">
                      <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">
                        {item.type} · {item.year}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-serif mb-3 group-hover:text-orange-400 transition-colors duration-300">
                        {item.title}
                      </h3>
                      {item.thoughts && (
                        <p className="text-gray-400 italic text-sm md:text-base mb-3 line-clamp-2">
                          "{item.thoughts}"
                        </p>
                      )}
                      {item.rating && (
                        <div className="flex items-center gap-2 text-orange-500">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="font-bold">{item.rating.toFixed(1)}</span>
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
