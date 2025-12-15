import Navigation from "@/components/Navigation";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import GalleryImage from "@/components/ui/GalleryImage";
// Dynamically import all images from the Retrato folder using Vite's glob import
const modules = import.meta.glob('@/assets/Retrato/*.jpg', { eager: true });
const images = Object.values(modules).map((mod: any) => mod.default);
const slides = images.map((src) => ({ src }));

const PortraitPage = () => {
  const [index, setIndex] = useState(-1);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const totalImages = images.length;
  const isGalleryReady = imagesLoaded === totalImages;

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="py-32 bg-background relative min-h-screen">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <Link
              to="/#work"
              className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors mb-12"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Selected Work
            </Link>

            <h1 className="font-display text-5xl md:text-6xl font-semibold mb-8 tracking-tight fade-in-up">
              Portraits
            </h1>

            <p className="font-body text-lg text-muted-foreground mb-20 max-w-2xl">
              Professional portrait photography capturing the essence and personality of each individual.
            </p>

            {/* PRELOADER OVERLAY - Visible until all images are loaded */}
            {!isGalleryReady && (
              <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center">
                <div className="font-serif text-xl tracking-widest animate-pulse text-muted-foreground">
                  LOADING GALLERY ({Math.min(100, Math.round((imagesLoaded / totalImages) * 100))}%)
                </div>
              </div>
            )}

            {/* 
                GALLERY GRID 
                Refactored to Manual Masonry to match Animation Order (Horizontal Flow) with Layout.
            */}

            {/* MOBILE (< md): Single Column - Standard sequential order */}
            <div className={`md:hidden flex flex-col gap-8 transition-opacity duration-500 ease-out ${isGalleryReady ? 'opacity-100' : 'opacity-0'}`}>
              {images.map((image, i) => (
                <div
                  key={i}
                  className={`break-inside-avoid ${isGalleryReady && i < 3 ? 'fade-in-up' : ''} ${isGalleryReady && i >= 3 ? 'opacity-100' : ''} ${!isGalleryReady ? 'opacity-0' : ''}`}
                  style={{ animationDelay: i < 3 ? `${i * 0.1}s` : '0s' }}
                >
                  <GalleryImage
                    src={image}
                    alt={`Portrait ${i + 1}`}
                    category="Portrait Series"
                    title={`Capture ${i + 1}`}
                    index={i}
                    onClick={() => setIndex(i)}
                    onImageLoad={() => setImagesLoaded(prev => Math.min(prev + 1, totalImages))}
                  />
                </div>
              ))}
            </div>

            {/* DESKTOP (>= md): 3 Columns - Distributed horizontally (0->Col1, 1->Col2, 2->Col3) */}
            <div className={`hidden md:grid md:grid-cols-3 gap-8 items-start ${isGalleryReady ? 'opacity-100' : 'opacity-0'}`}>
              {[0, 1, 2].map((colIndex) => (
                <div key={colIndex} className="flex flex-col gap-8">
                  {images
                    .map((image, i) => ({ src: image, originalIndex: i })) // Preserve original index for animation/lightbox
                    .filter((_, i) => i % 3 === colIndex)
                    .map((item) => (
                      <div
                        key={item.originalIndex}
                        // ANIMATION REMOVED: User requested all images behave like bottom ones (Static).
                        // Now everything is opacity-100 instantly when ready.
                        className={`break-inside-avoid ${isGalleryReady ? 'opacity-100' : 'opacity-0'}`}
                        style={{ animationDelay: '0s' }}
                      >
                        <GalleryImage
                          src={item.src}
                          alt={`Portrait ${item.originalIndex + 1}`}
                          category="Portrait Series"
                          title={`Capture ${item.originalIndex + 1}`}
                          index={item.originalIndex}
                          onClick={() => setIndex(item.originalIndex)}
                          onImageLoad={() => setImagesLoaded(prev => Math.min(prev + 1, totalImages))}
                        />
                      </div>
                    ))}
                </div>
              ))}
            </div>

            <Lightbox
              index={index}
              slides={slides}
              open={index >= 0}
              close={() => setIndex(-1)}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortraitPage;
