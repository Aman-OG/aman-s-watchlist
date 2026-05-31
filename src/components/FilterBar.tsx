import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, SortDesc } from "lucide-react";

interface FilterBarProps {
  status: string;
  onStatusChange: (v: string) => void;
  sort: string;
  onSortChange: (v: string) => void;
}

export function FilterBar({ status, onStatusChange, sort, onSortChange }: FilterBarProps) {
  return (
    <div className="flex gap-3 flex-wrap">
      <Select value={status} onValueChange={onStatusChange}>
        <SelectTrigger className="h-12 w-44 bg-background">
          <Filter className="w-4 h-4 mr-2" />
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="watching">Watching</SelectItem>
          <SelectItem value="plan_to_watch">Plan to Watch</SelectItem>
          <SelectItem value="dropped">Dropped</SelectItem>
        </SelectContent>
      </Select>

      <Select value={sort} onValueChange={onSortChange}>
        <SelectTrigger className="h-12 w-52 bg-background">
          <SortDesc className="w-4 h-4 mr-2" />
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="rating-desc">Highest Rated</SelectItem>
          <SelectItem value="rating-asc">Lowest Rated</SelectItem>
          <SelectItem value="title-asc">Title (A–Z)</SelectItem>
          <SelectItem value="title-desc">Title (Z–A)</SelectItem>
          <SelectItem value="year-desc">Newest First</SelectItem>
          <SelectItem value="year-asc">Oldest First</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
