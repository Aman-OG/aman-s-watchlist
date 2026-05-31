import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-32 text-center flex flex-col items-center gap-6">
      <h1 className="text-8xl font-black text-ring">404</h1>
      <h2 className="text-3xl font-bold">Page Not Found</h2>
      <p className="text-muted-foreground text-lg max-w-md">
        This page doesn't exist in the vault. Head back home to explore the collection.
      </p>
      <Link href="/">
        <Button size="lg" className="h-12 px-8 text-base font-bold">
          Back to Home
        </Button>
      </Link>
    </div>
  );
}
