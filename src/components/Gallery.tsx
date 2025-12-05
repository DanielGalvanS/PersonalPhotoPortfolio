import { useState, useEffect } from "react";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import "react-photo-album/styles.css";
import "yet-another-react-lightbox/styles.css";

// Import images
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import portrait1 from "@/assets/portrait-1.jpg";
import landscape1 from "@/assets/landscape-1.jpg";
import editorial1 from "@/assets/editorial-1.jpg";
import product1 from "@/assets/product-1.jpg";

const photos = [
  { src: gallery1, width: 800, height: 1000, category: "Retratos" },
  { src: gallery2, width: 1200, height: 800, category: "Producto" },
  { src: portrait1, width: 800, height: 1200, category: "Retratos" },
  { src: gallery3, width: 1000, height: 800, category: "Autor" },
  { src: editorial1, width: 800, height: 1000, category: "Editorial" },
  { src: gallery4, width: 1200, height: 800, category: "Landscapes" },
  { src: landscape1, width: 1500, height: 1000, category: "Landscapes" },
  { src: gallery5, width: 800, height: 1200, category: "Editorial" },
  { src: product1, width: 1000, height: 1000, category: "Producto" },
  { src: gallery6, width: 1200, height: 800, category: "Autor" },
];

const collections = [
  {
    title: "Retratos",
    image: gallery1,
    count: 2,
    className: "md:col-span-2 md:row-span-2",
    description: "Una exploración de la identidad humana a través de la luz natural y expresiones auténticas. Esta colección busca capturar no solo el rostro, sino la historia detrás de la mirada.",
    year: "2024",
    client: "Various"
  },
  {
    title: "Producto",
    image: gallery2,
    count: 2,
    className: "md:col-span-1 md:row-span-1",
    description: "Fotografía comercial de alto impacto diseñada para resaltar la calidad y los detalles únicos de cada objeto. Enfoque minimalista y limpio.",
    year: "2023-2024",
    client: "Commercial"
  },
  {
    title: "Autor",
    image: gallery3,
    count: 2,
    className: "md:col-span-1 md:row-span-1",
    description: "Proyectos personales y experimentales donde la creatividad no tiene límites. Una mezcla de técnicas y conceptos abstractos.",
    year: "Ongoing",
    client: "Personal"
  },
  {
    title: "Landscapes",
    image: landscape1,
    count: 2,
    className: "md:col-span-2 md:row-span-1",
    description: "La inmensidad de la naturaleza capturada en su momento más dramático. Desde montañas neblinosas hasta costas tranquilas.",
    year: "2023",
    client: "Personal"
  },
  {
    title: "Editorial",
    image: editorial1,
    count: 2,
    className: "md:col-span-1 md:row-span-2",
    description: "Narrativas visuales para publicaciones y moda. Estilo cinematográfico y composición cuidada para contar historias mudas.",
    year: "2024",
    client: "Magazines"
  },
];

const Gallery = () => {
  const [index, setIndex] = useState(-1);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);

  // Scroll to top of gallery when collection is selected
  useEffect(() => {
    if (selectedCollection) {
      const element = document.getElementById("work");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [selectedCollection]);

  // Filter photos based on selection
  const filteredPhotos = selectedCollection
    ? photos.filter(photo => photo.category === selectedCollection)
    : [];

  return (
    <section id="work" className="py-20 md:py-32 bg-secondary min-h-screen relative scroll-mt-24">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">

          <AnimatePresence mode="wait">
            {!selectedCollection ? (
              // COLLECTIONS GRID VIEW
              <motion.div
                key="collections"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="font-display text-5xl md:text-6xl font-semibold mb-16 tracking-tight text-center">
                  Selected Work
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                  {collections.map((collection, idx) => (
                    <motion.div
                      key={collection.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      onClick={() => setSelectedCollection(collection.title)}
                      className={`group relative cursor-pointer overflow-hidden rounded-md ${collection.className}`}
                    >
                      <img
                        src={collection.image}
                        alt={collection.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:bg-black/40" />

                      {/* Decorative Frame */}
                      <div className="absolute inset-4 border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm pointer-events-none" />

                      <div className="absolute inset-0 p-8 flex flex-col justify-between">
                        <div className="self-end opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-y-2 group-hover:translate-y-0 delay-75">

                        </div>

                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <p className="text-white/80 text-sm tracking-widest uppercase mb-2">Collection</p>
                          <h3 className="font-display text-3xl text-white font-medium mb-4">{collection.title}</h3>

                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                            <span className="text-white text-sm font-medium tracking-wide">View Gallery</span>
                            <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center bg-white/10 backdrop-blur-sm">
                              <ArrowRight className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              // DETAIL GALLERY VIEW
              <motion.div
                key="gallery"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.5 }}
                  className="mb-12 pt-8"
                >
                  <button
                    onClick={() => setSelectedCollection(null)}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group mb-8"
                  >
                    <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                    <span className="text-lg font-body tracking-wide">Volver a la Galería</span>
                  </button>

                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                    <div>
                      <h3 className="font-display text-5xl md:text-6xl font-medium tracking-tight text-foreground/90 text-left mb-6">
                        {collections.find(c => c.title === selectedCollection)?.title}
                      </h3>
                      <p className="font-body text-muted-foreground text-lg max-w-xl text-left leading-relaxed">
                        {collections.find(c => c.title === selectedCollection)?.description}
                      </p>
                    </div>

                    <div className="flex gap-12 border-t border-border pt-6 md:border-t-0 md:pt-0">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Year</p>
                        <p className="font-display text-xl">{collections.find(c => c.title === selectedCollection)?.year}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Client</p>
                        <p className="font-display text-xl">{collections.find(c => c.title === selectedCollection)?.client}</p>
                      </div>
                    </div>
                  </div>

                  <div className="h-px w-full bg-border mb-12" />
                </motion.div>

                <motion.div
                  className="gallery-container min-h-[400px]"
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.7 }}
                >
                  <PhotoAlbum
                    layout="masonry"
                    photos={filteredPhotos}
                    columns={(containerWidth) => {
                      if (containerWidth < 640) return 1;
                      if (containerWidth < 1024) return 2;
                      return 3;
                    }}
                    onClick={({ index }) => {
                      // Map index back to original photos array if needed, 
                      // or just show filtered photos in lightbox (easier)
                      setIndex(index);
                    }}
                  />
                </motion.div>

                <Lightbox
                  open={index >= 0}
                  index={index}
                  close={() => setIndex(-1)}
                  slides={filteredPhotos}
                />
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
};

export default Gallery;
