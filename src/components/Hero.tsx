import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Photography portfolio hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      <div className="relative h-full flex items-center justify-center">
        <div className="text-center text-white px-6 fade-in-up">
          <h1 className="font-display text-6xl md:text-8xl font-bold mb-6 tracking-tight">
            Visual Stories
          </h1>
          <p className="font-body text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto">
            Capturing moments through a minimalist lens
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
