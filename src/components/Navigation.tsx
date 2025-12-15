import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const Navigation = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      // Determine active section (Only on Home)
      if (isHome) {
        const sections = ["hero", "about", "work", "contact"];
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top >= 0 && rect.top < 300) {
              setActiveSection(section);
            }
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const handleLogoClick = () => {
    if (isHome) {
      scrollToSection("hero");
    } else {
      navigate("/");
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-sm border-b border-border" : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-6 py-6">
        <div className="flex justify-between items-center">
          <button
            onClick={handleLogoClick}
            className="font-display text-xl font-semibold tracking-tight hover:text-accent transition-colors"
          >
            Portfolio
          </button>

          {/* Only show navigation links on Home Page */}
          {isHome && (
            <div className="flex gap-8">
              {["about", "work", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`font-body text-sm tracking-wide transition-colors capitalize ${activeSection === section
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {section}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-accent-foreground origin-left"
        style={{ scaleX }}
      />
    </nav>
  );
};

export default Navigation;
