import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { LazyMotion, domAnimation } from "framer-motion";

// Lazy Loading Pages to reduce initial bundle size (LCP optimization)
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PortraitPage = lazy(() => import("./pages/PortraitPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const LandscapePage = lazy(() => import("./pages/LandscapePage"));
const EditorialPage = lazy(() => import("./pages/EditorialPage"));

import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import CustomCursor from "./components/ui/CustomCursor";

const queryClient = new QueryClient();

// Simple loading fallback
const PageLoader = () => (
  <div className="h-screen w-full flex items-center justify-center bg-black">
    <div className="animate-pulse text-white/50 font-display tracking-widest uppercase text-sm">Loading...</div>
  </div>
);

const App = () => {
  // Disable right-click
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextMenu);
    return () => document.removeEventListener("contextmenu", handleContextMenu);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LazyMotion features={domAnimation}>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <CustomCursor />
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/portraits" element={<PortraitPage />} />
                <Route path="/product" element={<ProductPage />} />
                <Route path="/landscapes" element={<LandscapePage />} />
                <Route path="/editorial" element={<EditorialPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <Footer />
          </BrowserRouter>
        </LazyMotion>
      </TooltipProvider>
    </QueryClientProvider >
  );
};

export default App;
