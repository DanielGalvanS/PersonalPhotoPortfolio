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

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="py-32 bg-background">
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

            <div className="columns-1 md:columns-3 gap-8 space-y-8">
              {images.map((image, i) => (
                <div
                  key={i}
                  className="break-inside-avoid fade-in"
                  style={{ animationDelay: `${i * 0.05}s` }} // Faster stagger
                >
                  <GalleryImage
                    src={image}
                    alt={`Portrait ${i + 1}`}
                    category="Portrait Series"
                    title={`Capture ${i + 1}`}
                    index={i}
                    onClick={() => setIndex(i)}
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

export default PortraitPage;
