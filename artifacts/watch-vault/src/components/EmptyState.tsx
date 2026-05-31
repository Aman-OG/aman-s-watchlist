interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <div className="col-span-full py-24 text-center flex flex-col items-center gap-4">
      <div className="opacity-20">{icon}</div>
      <h3 className="text-xl font-bold text-foreground">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
