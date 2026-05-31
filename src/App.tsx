import { Switch, Route, Router as WouterRouter } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Layout } from "@/components/Layout";

import Home from "@/pages/home";
import Anime from "@/pages/anime";
import Series from "@/pages/series";
import Favorites from "@/pages/favorites";
import Stats from "@/pages/stats";
import MediaDetail from "@/pages/media-detail";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/anime" component={Anime} />
        <Route path="/series" component={Series} />
        <Route path="/favorites" component={Favorites} />
        <Route path="/stats" component={Stats} />
        <Route path="/media/:id" component={MediaDetail} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vault-theme">
      <TooltipProvider>
        <WouterRouter>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
