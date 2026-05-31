import React from "react";
import { Link, useLocation } from "wouter";
import { useTheme } from "./ThemeProvider";
import { Moon, Sun, Tv, Film, Home, Heart, BarChart3, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "./ui/sheet";

export function Navbar() {
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();

  const navLinks = [
    { href: "/", label: "Home", icon: <Home className="w-4 h-4 mr-2" /> },
    { href: "/series", label: "Series", icon: <Film className="w-4 h-4 mr-2" /> },
    { href: "/anime", label: "Anime", icon: <Tv className="w-4 h-4 mr-2" /> },
    { href: "/favorites", label: "Favorites", icon: <Heart className="w-4 h-4 mr-2" /> },
    { href: "/stats", label: "Stats", icon: <BarChart3 className="w-4 h-4 mr-2" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <Tv className="w-6 h-6 text-primary" />
          <span>Aman's Vault</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center text-sm font-medium transition-colors hover:text-primary ${
                location === link.href ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 dark:hidden" />
            <Moon className="h-5 w-5 hidden dark:block" />
          </Button>

          {/* Mobile Nav */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] bg-background/95 backdrop-blur-md border-border/40">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <SheetDescription className="sr-only">
                Navigate to different sections of the watch vault
              </SheetDescription>
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center text-lg font-medium transition-colors hover:text-primary ${
                      location === link.href ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
