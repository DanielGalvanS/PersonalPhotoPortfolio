import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
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
  { src: editorial1, width: 800, height: 1000, category: "Editorial" },
  { src: gallery4, width: 1200, height: 800, category: "Landscapes" },
  { src: landscape1, width: 1500, height: 1000, category: "Landscapes" },
  { src: gallery5, width: 800, height: 1200, category: "Editorial" },
  { src: product1, width: 1000, height: 1000, category: "Producto" }
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

const GalleryItem = ({ collection, idx, onClick }: { collection: any, idx: number, onClick: () => void }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Cinematic "Window" Effect: Image moves slower than scroll
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  // Scale keeps edges covered during movement
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.25, 1.15]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-sm w-full aspect-[3/4]"
    >
      <motion.img
        style={{ y, scale }}
        src={collection.image}
        alt={collection.title}
        className="w-full h-full object-cover will-change-transform"
      />
      <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:bg-black/40" />

      {/* Decorative Frame */}
      <div className="absolute inset-4 border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm pointer-events-none z-10" />

      <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
        <div />
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
  );
};

const Gallery = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Split collections into 2 columns (excluding duplicate/Author if needed)
  const columns = [[], []] as any[][];

  // Filter out any "Author" titled collection if present in the data
  const visibleCollections = collections.filter(c => c.title !== "Author");

  visibleCollections.forEach((collection, i) => {
    columns[i % 2].push(collection);
  });

  // Parallax transforms for 2 columns (Opposing directions)
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]); // Column 1 Moves Up
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);  // Column 2 Moves Down

  return (
    <section id="work" className="py-20 bg-background relative z-10" ref={containerRef}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-8 md:gap-24 items-start justify-center">

          {/* Column 1 */}
          <motion.div
            style={{ y: isMobile ? 0 : y1 }}
            className="flex flex-col gap-12 md:gap-24 w-full md:w-1/2"
          >
            {columns[0].map((collection, idx) => (
              <GalleryItem
                key={idx}
                collection={collection}
                idx={idx}
                onClick={() => navigate(collection.link || `/${collection.title.toLowerCase()}`)}
              />
            ))}
          </motion.div>

          {/* Column 2 */}
          <motion.div
            style={{ y: isMobile ? 0 : y2 }}
            className="flex flex-col gap-12 md:gap-24 w-full md:w-1/2 md:mt-32"
          >
            {columns[1].map((collection, idx) => (
              <GalleryItem
                key={idx}
                collection={collection}
                idx={idx}
                onClick={() => navigate(collection.link || `/${collection.title.toLowerCase()}`)}
              />
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Gallery;
