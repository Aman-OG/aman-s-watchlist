import React from "react";
import { useGetStats } from "@workspace/api-client-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart3, TrendingUp, Tv, Film, Star, PieChart as PieChartIcon } from "lucide-react";

export default function Stats() {
  const { data: stats, isLoading } = useGetStats();

  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

  if (isLoading || !stats) {
    return (
      <div className="container mx-auto px-4 py-12 space-y-8">
        <Skeleton className="h-12 w-64 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-32 w-full" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-[400px] w-full" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      </div>
    );
  }

  const pieData = [
    { name: "Completed", value: stats.totalCompleted },
    { name: "Watching", value: stats.totalWatching },
    { name: "Plan to Watch", value: stats.totalPlanToWatch }
  ].filter(d => d.value > 0);

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
            <div className="text-4xl font-black">{stats.totalItems}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.totalAnime} Anime • {stats.totalSeries} Series
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 border-border/50 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Average Rating</CardTitle>
            <Star className="w-4 h-4 text-ring fill-ring" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black text-ring">{stats.averageRating?.toFixed(1) || "-"}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all rated items</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Completed</CardTitle>
            <TrendingUp className="w-4 h-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black text-chart-3">{stats.totalCompleted}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {Math.round((stats.totalCompleted / (stats.totalItems || 1)) * 100)}% of vault
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Highest Rated</CardTitle>
            <Star className="w-4 h-4 text-ring" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold leading-tight line-clamp-1">{stats.highestRated?.title || "-"}</div>
            <p className="text-xs text-ring font-bold mt-1">
              {stats.highestRated?.rating ? `${stats.highestRated.rating}/10` : ""}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Rating Distribution */}
        <Card className="bg-card/50 border-border/50 shadow-lg">
          <CardHeader>
            <CardTitle>Rating Distribution</CardTitle>
            <CardDescription>How you've scored items out of 10</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.ratingDistribution} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="range" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <RechartsTooltip 
                  cursor={{ fill: 'hsl(var(--accent))' }}
                  contentStyle={{ backgroundColor: 'hsl(var(--popover))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                  itemStyle={{ color: 'hsl(var(--ring))', fontWeight: 'bold' }}
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
                    contentStyle={{ backgroundColor: 'hsl(var(--popover))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
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
    </div>
  );
}
