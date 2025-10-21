import { useState, useEffect } from "react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-sm border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-6">
        <div className="flex justify-between items-center">
          <button
            onClick={() => scrollToSection("hero")}
            className="font-display text-xl font-semibold tracking-tight hover:text-accent transition-colors"
          >
            Portfolio
          </button>
          
          <div className="flex gap-8">
            <button
              onClick={() => scrollToSection("about")}
              className="font-body text-sm tracking-wide hover:text-accent transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("work")}
              className="font-body text-sm tracking-wide hover:text-accent transition-colors"
            >
              Work
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="font-body text-sm tracking-wide hover:text-accent transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
