import React from "react";
import { useRoute, useLocation } from "wouter";
import { useMediaById } from "@/hooks/useWatchlist";
import { Star, Heart, Calendar, Clock, Tv, Film, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function MediaDetail() {
  const [, params] = useRoute("/media/:id");
  const [, setLocation] = useLocation();
  const id = params?.id ? parseInt(params.id, 10) : 0;
  
  const media = useMediaById(id);

  const handleBack = () => {
    // Get the referrer from session storage
    const referrer = sessionStorage.getItem('mediaDetailReferrer');
    
    if (referrer && referrer !== '/') {
      // Go back to the referrer page
      setLocation(referrer);
      
      // Restore scroll position after a short delay
      setTimeout(() => {
        const scrollPos = sessionStorage.getItem(`scrollPos_${referrer}`);
        if (scrollPos) {
          window.scrollTo(0, parseInt(scrollPos, 10));
        }
      }, 50);
    } else {
      // Default to home if no referrer
      setLocation("/");
    }
  };

  if (!media) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-3xl font-bold mb-4">Media not found</h2>
        <p className="text-muted-foreground mb-4">Looking for ID: {id}</p>
        <Button onClick={handleBack}>Back</Button>
      </div>
    );
  }

  return (
    <div className="w-full pb-20">
      {/* Cinematic Banner */}
      <div className="relative h-[50vh] min-h-[400px] w-full bg-background overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={media.banner || media.poster || ""} 
            alt={media.title}
            className="w-full h-full object-cover opacity-30 blur-[2px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 h-full flex items-start pt-6">
          <Button variant="ghost" className="text-white hover:bg-white/20 bg-black/20 backdrop-blur-md" onClick={handleBack}>
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-32 md:-mt-48 relative z-20">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          {/* Poster */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-48 md:w-64 lg:w-72 shrink-0 rounded-xl overflow-hidden shadow-2xl border border-border bg-card"
          >
            {media.poster ? (
              <img src={media.poster} alt={media.title} className="w-full h-auto object-cover aspect-[2/3]" />
            ) : (
              <div className="w-full aspect-[2/3] flex flex-col items-center justify-center text-muted-foreground bg-muted">
                {media.type === "anime" ? <Tv className="w-16 h-16 mb-4 opacity-20" /> : <Film className="w-16 h-16 mb-4 opacity-20" />}
                <span>No Poster</span>
              </div>
            )}
          </motion.div>

          {/* Content */}
          <div className="flex-1 pt-4 md:pt-32">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="uppercase tracking-widest text-xs font-bold px-3 py-1">
                  {media.type}
                </Badge>
                {media.status && (
                  <Badge variant="outline" className="capitalize text-xs font-bold px-3 py-1 border-primary/50 text-primary">
                    {media.status.replace(/_/g, " ")}
                  </Badge>
                )}
                {media.favorite && (
                  <Badge variant="destructive" className="text-xs font-bold px-3 py-1">
                    <Heart className="w-3 h-3 mr-1 fill-current" />
                    Favorite
                  </Badge>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">{media.title}</h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-muted-foreground mb-8">
                {media.rating > 0 && (
                  <div className="flex items-center gap-2 text-ring text-xl font-bold">
                    <Star className="w-6 h-6 fill-current" />
                    <span>{media.rating.toFixed(1)} <span className="text-muted-foreground text-sm font-normal">/ 10</span></span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{media.year}</span>
                </div>
                {media.episodes && (
                  <div className="flex items-center gap-2">
                    <Tv className="w-4 h-4" />
                    <span>{media.episodes} Episodes</span>
                  </div>
                )}
                {media.seasons && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{media.seasons} Seasons</span>
                  </div>
                )}
              </div>

              {media.genres && media.genres.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {media.genres.map(genre => (
                    <Badge key={genre} variant="secondary" className="bg-secondary/20 text-secondary-foreground hover:bg-secondary/30">
                      {genre}
                    </Badge>
                  ))}
                </div>
              )}

              {media.synopsis && (
                <div className="mb-12">
                  <h3 className="text-xl font-bold mb-3 border-b border-border/50 pb-2">Synopsis</h3>
                  <p className="text-lg leading-relaxed text-muted-foreground/90">{media.synopsis}</p>
                </div>
              )}

              {(media.review || media.thoughts) && (
                <div className="mb-12 bg-card border border-border/50 rounded-xl p-6 md:p-8 relative">
                  <div className="absolute -top-3 -left-3 text-4xl text-primary opacity-50">"</div>
                  <h3 className="text-xl font-bold mb-3 text-primary">Aman's Take</h3>
                  <p className="text-lg leading-relaxed italic">{media.review || media.thoughts}</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
