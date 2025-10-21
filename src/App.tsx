import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PortraitPage from "./pages/PortraitPage";
import ProductPage from "./pages/ProductPage";
import AuthorPage from "./pages/AuthorPage";
import LandscapePage from "./pages/LandscapePage";
import EditorialPage from "./pages/EditorialPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/retratos" element={<PortraitPage />} />
          <Route path="/producto" element={<ProductPage />} />
          <Route path="/autor" element={<AuthorPage />} />
          <Route path="/landscapes" element={<LandscapePage />} />
          <Route path="/editorial" element={<EditorialPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
