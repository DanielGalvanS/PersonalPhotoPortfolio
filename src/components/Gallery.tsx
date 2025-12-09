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
import productoP2 from "@/assets/Producto_p2.jpg";
import landscape1 from "@/assets/landscape-1.jpg";
import editorial1 from "@/assets/editorial-1.jpg";

const collections = [
  {
    title: "Portraits",
    image: gallery1,
    count: 2,
    className: "md:col-span-2 md:row-span-2",
    description: "An exploration of human identity through natural light and authentic expressions. This collection seeks to capture not just the face, but the story behind the gaze.",
    year: "2024",
    client: "Various"
  },
  {
    title: "Product",
    image: productoP2,
    count: 2,
    className: "md:col-span-1 md:row-span-1",
    description: "High-impact commercial photography designed to highlight the quality and unique details of each object. Minimalist and clean approach.",
    year: "2023-2024",
    client: "Commercial"
  },
  {
    title: "Landscapes",
    image: landscape1,
    count: 2,
    className: "md:col-span-2 md:row-span-1",
    description: "The vastness of nature captured at its most dramatic moments. From misty mountains to tranquil coasts.",
    year: "2023",
    client: "Personal"
  },
  {
    title: "Editorial",
    image: editorial1,
    count: 2,
    className: "md:col-span-1 md:row-span-2",
    description: "Visual narratives for publications and fashion. Cinematic style and careful composition to tell silent stories.",
    year: "2024",
    client: "Magazines"
  },
];

const GalleryItem = ({ collection, idx, onClick, reverseParallax = false }: { collection: any, idx: number, onClick: () => void, reverseParallax?: boolean }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Cinematic "Window" Effect: Image moves slower than scroll
  // If reverseParallax is true, we flip the start/end values
  // Reduced movement to 3% - SAFE ZONE. Scale is 1.06, so 6% buffer > 3% movement.
  const startY = reverseParallax ? "3%" : "-3%";
  const endY = reverseParallax ? "-3%" : "3%";

  const y = useTransform(scrollYProgress, [0, 1], [startY, endY]);
  // Scale [1.06, 1.1] -> Minimum 6% zoom creates a safety buffer larger than the 3% movement
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1.1, 1.06]);

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
      {/* Image Wrapper for Scaling Effect - Apply Hover Scale Here */}
      <div className="w-full h-full overflow-hidden transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105">
        <motion.img
          style={{ y, scale }}
          src={collection.image}
          alt={collection.title}
          className="w-full h-full object-cover will-change-transform" // Removed CSS transition/hover from here
        />
      </div>

      <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/40" />

      {/* Decorative Frame */}
      <div className="absolute inset-4 border border-white/20 opacity-0 scale-95 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 rounded-sm pointer-events-none z-10" />

      <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
        <div />
        <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
          <p className="text-white/80 text-sm tracking-widest uppercase mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">Collection</p>
          <h3 className="font-display text-4xl text-white font-medium mb-4">{collection.title}</h3>

          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
            <span className="text-white text-sm font-medium tracking-wide">View Gallery</span>
            <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center bg-white/10 backdrop-blur-sm group-hover:bg-white group-hover:text-black transition-colors duration-300">
              <ArrowRight className="w-4 h-4" />
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
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]); // Column 1 Moves DOWN
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);  // Column 2 Moves UP (to catch up)

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
                reverseParallax={true}
              />
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Gallery;
