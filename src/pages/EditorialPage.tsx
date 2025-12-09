import Navigation from "@/components/Navigation";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import GalleryImage from "@/components/ui/GalleryImage";
import editorial1 from "@/assets/editorial-1.jpg";
import gallery5 from "@/assets/gallery-5.jpg";

const images = [editorial1, gallery5];
const slides = images.map((src) => ({ src }));

const EditorialPage = () => {
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
              Editorial
            </h1>

            <p className="font-body text-lg text-muted-foreground mb-20 max-w-2xl">
              Editorial photography for fashion, magazines, and creative campaigns.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {images.map((image, i) => (
                <div
                  key={i}
                  className="fade-in"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <GalleryImage
                    src={image}
                    alt={`Editorial ${i + 1}`}
                    category="Editorial Series"
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

export default EditorialPage;
