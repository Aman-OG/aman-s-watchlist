export function Footer() {
  return (
    <footer className="border-t border-border/40 py-6 mt-auto">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        Aman's Watch Vault · {new Date().getFullYear()}
      </div>
    </footer>
  );
}
