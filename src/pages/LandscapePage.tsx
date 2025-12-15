import Navigation from "@/components/Navigation";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import GalleryImage from "@/components/ui/GalleryImage";
import landscape1 from "@/assets/landscape-1.jpg";
import gallery4 from "@/assets/gallery-4.jpg";

const images = [landscape1, gallery4];
const slides = images.map((src) => ({ src }));

const LandscapePage = () => {
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
              Landscapes
            </h1>

            <p className="font-body text-lg text-muted-foreground mb-20 max-w-2xl">
              Landscape photography capturing natural beauty and unique spaces.
            </p>

            {/* PRELOADER OVERLAY */}
            {!isGalleryReady && (
              <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center">
                <div className="font-serif text-xl tracking-widest animate-pulse text-muted-foreground">
                  LOADING GALLERY ({Math.min(100, Math.round((imagesLoaded / totalImages) * 100))}%)
                </div>
              </div>
            )}

            {/* GALLERY GRID - Static Instant Reveal */}
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${isGalleryReady ? 'opacity-100' : 'opacity-0'}`}>
              {images.map((image, i) => (
                <div
                  key={i}
                  className={`break-inside-avoid ${isGalleryReady ? 'opacity-100' : 'opacity-0'}`}
                  style={{ animationDelay: '0s' }}
                >
                  <GalleryImage
                    src={image}
                    alt={`Landscape ${i + 1}`}
                    category="Landscape Series"
                    title={`Capture ${i + 1}`}
                    index={i}
                    onClick={() => setIndex(i)}
                    onImageLoad={() => setImagesLoaded(prev => Math.min(prev + 1, totalImages))}
                  />
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

export default LandscapePage;
