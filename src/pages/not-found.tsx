import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] w-full flex items-center justify-center">
      <div className="text-center">
        <AlertCircle className="w-16 h-16 mx-auto mb-4 text-destructive" />
        <h1 className="text-4xl font-black mb-2">404 - Page Not Found</h1>
        <p className="text-muted-foreground mb-8">The page you're looking for doesn't exist.</p>
        <Link href="/">
          <Button size="lg">Go Home</Button>
        </Link>
      </div>
    </div>
  );
}
