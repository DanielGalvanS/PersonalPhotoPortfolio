import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Gallery />
      <Contact />
      
      <footer className="py-8 text-center border-t border-border">
        <p className="font-body text-sm text-muted-foreground">
          © 2025 Photography Portfolio. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Index;
