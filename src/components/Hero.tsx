import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import heroImage from "@/assets/hero-image.jpg";
import portrait1 from "@/assets/portrait-1.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery4 from "@/assets/gallery-4.jpg";

const slides = [heroImage, portrait1, gallery1, gallery4];

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 300]); // Background parallax
  const textY = useTransform(scrollY, [0, 500], [0, 100]); // Text parallax (slower)

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const isMobile = useIsMobile();
  const [heroHeight, setHeroHeight] = useState("100svh");

  // Lock height on mount to prevent mobile address bar resize glitches
  useEffect(() => {
    // Set explicit pixel height to prevent "dvh/svh" layout thrashing on scroll
    setHeroHeight(`${window.innerHeight}px`);
  }, []);

  // Fade out hero when scrolling down to prevent "overscroll leak" at bottom of page
  const opacity = useTransform(scrollY, [window.innerHeight, window.innerHeight * 1.5], [1, 0]);

  return (
    <section id="hero" className="relative w-full overflow-hidden" style={{ height: heroHeight }}>
      {/* Background Slideshow 
          - Mobile: Fixed Position (Curtain Effect) 
          - Desktop: Absolute Position (Classic Parallax) 
      */}
      <div
        className="fixed top-0 left-0 z-0 w-full md:absolute md:inset-0"
        style={{ height: heroHeight }}
      >
        <motion.div style={{ y: isMobile ? 0 : y, opacity }} className="w-full h-full relative">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={currentSlide}
              src={slides[currentSlide]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              alt="Portfolio Hero"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/30 w-full h-full z-10 pointer-events-none" />
        </motion.div>
      </div>

      {/* Navigation Zones (Invisible layers on top) */}
      <div
        className="absolute inset-y-0 left-0 w-1/2 z-1 cursor-none touch-pan-y"
        data-cursor="arrow-left"
        onClick={handlePrev}
      />
      <div
        className="absolute inset-y-0 right-0 w-1/2 z-1 cursor-none touch-pan-y"
        data-cursor="arrow-right"
        onClick={handleNext}
      />

      {/* Content */}
      <motion.div
        style={{ y: isMobile ? 0 : textY }}
        className="relative h-full flex items-center justify-center z-2 pointer-events-none"
      >
        <div className="text-center text-white px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-display text-6xl md:text-8xl font-bold mb-6 tracking-tight"
          >
            Paula Mitchell
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="font-body text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto"
          >
            Capturing moments through a minimalist lens
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
