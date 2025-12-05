import { motion, useScroll, useTransform } from "framer-motion";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 300]); // Background parallax
  const textY = useTransform(scrollY, [0, 500], [0, 100]); // Text parallax (slower)

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          style={{ y }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full h-full"
        >
          <img
            src={heroImage}
            alt="Photography portfolio hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>
      </div>

      <motion.div
        style={{ y: textY }}
        className="relative h-full flex items-center justify-center"
      >
        <div className="text-center text-white px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-display text-6xl md:text-8xl font-bold mb-6 tracking-tight"
          >
            Visual Stories
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
