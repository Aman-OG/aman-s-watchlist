import React from "react";
import { allItems } from "@/hooks/useWatchlist";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Film, Star, PieChart as PieChartIcon } from "lucide-react";

export default function Stats() {
  const items = allItems;
  const anime = items.filter((i) => i.type === "anime");
  const series = items.filter((i) => i.type === "series");
  const rated = items.filter((i) => i.rating != null);
  const avgRating = rated.length
    ? rated.reduce((s, i) => s + i.rating, 0) / rated.length
    : 0;
  const highestRated = [...items].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))[0];
  const completed = items.filter((i) => i.status === "completed");
  const watching = items.filter((i) => i.status === "watching");
  const planToWatch = items.filter((i) => i.status === "plan_to_watch");

  // Rating distribution
  const ratingBuckets = [
    { range: "0-2", min: 0, max: 2 },
    { range: "3-4", min: 3, max: 4 },
    { range: "5-6", min: 5, max: 6 },
    { range: "7-8", min: 7, max: 8 },
    { range: "9-10", min: 9, max: 10 },
  ];
  const ratingDistribution = ratingBuckets.map((b) => ({
    range: b.range,
    count: rated.filter((i) => i.rating >= b.min && i.rating <= b.max).length,
  }));

  // Genre breakdown
  const genreMap: Record<string, number> = {};
  for (const item of items) {
    for (const g of item.genres) {
      genreMap[g] = (genreMap[g] || 0) + 1;
    }
  }
  const genreBreakdown = Object.entries(genreMap)
    .map(([genre, count]) => ({ genre, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];

  const pieData = [
    { name: "Completed", value: completed.length },
    { name: "Watching", value: watching.length },
    { name: "Plan to Watch", value: planToWatch.length },
  ].filter((d) => d.value > 0);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-black mb-4 flex items-center gap-4">
          <BarChart3 className="w-10 h-10 text-primary" />
          Vault Analytics
        </h1>
        <p className="text-muted-foreground text-lg">
          Dive deep into the watching habits and distribution of your curated vault.
        </p>
      </div>

      {/* Top Level KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-card/50 border-border/50 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Items</CardTitle>
            <Film className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black">{items.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {anime.length} Anime · {series.length} Series
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Average Rating</CardTitle>
            <Star className="w-4 h-4 text-ring fill-ring" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black text-ring">{avgRating.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all rated items</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Completed</CardTitle>
            <TrendingUp className="w-4 h-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black text-chart-3">{completed.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {Math.round((completed.length / (items.length || 1)) * 100)}% of vault
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Highest Rated</CardTitle>
            <Star className="w-4 h-4 text-ring" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold leading-tight line-clamp-1">{highestRated?.title || "-"}</div>
            <p className="text-xs text-ring font-bold mt-1">
              {highestRated?.rating != null ? `${highestRated.rating}/10` : ""}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Rating Distribution */}
        <Card className="bg-card/50 border-border/50 shadow-lg">
          <CardHeader>
            <CardTitle>Rating Distribution</CardTitle>
            <CardDescription>How you've scored items out of 10</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ratingDistribution} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="range" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <RechartsTooltip
                  cursor={{ fill: "hsl(var(--accent))" }}
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  itemStyle={{ color: "hsl(var(--ring))", fontWeight: "bold" }}
                />
                <Bar dataKey="count" fill="hsl(var(--ring))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Status Breakdown */}
        <Card className="bg-card/50 border-border/50 shadow-lg">
          <CardHeader>
            <CardTitle>Watch Status</CardTitle>
            <CardDescription>Current state of your vault</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] flex items-center justify-center">
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      borderColor: "hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-muted-foreground flex flex-col items-center">
                <PieChartIcon className="w-16 h-16 mb-4 opacity-20" />
                <p>No status data available</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Genre Breakdown */}
      <Card className="bg-card/50 border-border/50 shadow-lg">
        <CardHeader>
          <CardTitle>Top Genres</CardTitle>
          <CardDescription>Most common genres across the vault</CardDescription>
        </CardHeader>
        <CardContent className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={genreBreakdown} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis type="category" dataKey="genre" stroke="hsl(var(--muted-foreground))" fontSize={12} width={80} />
              <RechartsTooltip
                cursor={{ fill: "hsl(var(--accent))" }}
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "8px",
                }}
                itemStyle={{ color: "hsl(var(--ring))", fontWeight: "bold" }}
              />
              <Bar dataKey="count" fill="hsl(var(--chart-2))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
