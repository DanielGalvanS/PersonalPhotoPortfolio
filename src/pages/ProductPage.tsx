import Navigation from "@/components/Navigation";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import GalleryImage from "@/components/ui/GalleryImage";
// Dynamically import all images from the Producto folder using Vite's glob import
const modules = import.meta.glob('@/assets/Producto/*.jpg', { eager: true });
const images = Object.values(modules).map((mod: any) => mod.default);
const slides = images.map((src) => ({ src }));

const ProductPage = () => {
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
              Product Photography
            </h1>

            <p className="font-body text-lg text-muted-foreground mb-20 max-w-2xl">
              Professional product photography that highlights the quality and details of every item.
            </p>

            {/* PRELOADER OVERLAY */}
            {!isGalleryReady && (
              <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center">
                <div className="font-serif text-xl tracking-widest animate-pulse text-muted-foreground">
                  LOADING GALLERY ({Math.min(100, Math.round((imagesLoaded / totalImages) * 100))}%)
                </div>
              </div>
            )}

            {/* 
                GALLERY GRID 
                Refactored to Manual Masonry (3 Columns) to match Portraits Page.
            */}

            {/* MOBILE (< md): Single Column */}
            <div className={`md:hidden flex flex-col gap-8 transition-opacity duration-500 ease-out ${isGalleryReady ? 'opacity-100' : 'opacity-0'}`}>
              {images.map((image, i) => (
                <div
                  key={i}
                  className={`break-inside-avoid ${isGalleryReady ? 'opacity-100' : 'opacity-0'}`}
                  style={{ animationDelay: '0s' }}
                >
                  <GalleryImage
                    src={image}
                    alt={`Product ${i + 1}`}
                    category="Product Series"
                    title={`Item ${i + 1}`}
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
                    .map((image, i) => ({ src: image, originalIndex: i }))
                    .filter((_, i) => i % 3 === colIndex)
                    .map((item) => (
                      <div
                        key={item.originalIndex}
                        className={`break-inside-avoid ${isGalleryReady ? 'opacity-100' : 'opacity-0'}`}
                        style={{ animationDelay: '0s' }}
                      >
                        <GalleryImage
                          src={item.src}
                          alt={`Product ${item.originalIndex + 1}`}
                          category="Product Series"
                          title={`Item ${item.originalIndex + 1}`}
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

export default ProductPage;
