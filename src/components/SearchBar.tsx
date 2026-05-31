import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = "Search titles..." }: SearchBarProps) {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
      <Input
        placeholder={placeholder}
        className="pl-10 h-12 bg-background border-border/50 text-base"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
