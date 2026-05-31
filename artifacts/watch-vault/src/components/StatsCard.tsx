import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  valueClassName?: string;
}

export function StatsCard({ title, value, subtitle, icon, valueClassName }: StatsCardProps) {
  return (
    <Card className="bg-card/50 border-border/50 shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className={`text-4xl font-black ${valueClassName ?? ""}`}>{value}</div>
        {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
      </CardContent>
    </Card>
  );
}
