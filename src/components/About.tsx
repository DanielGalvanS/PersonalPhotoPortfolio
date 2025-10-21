const About = () => {
  return (
    <section id="about" className="py-32 bg-background">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="fade-in-up">
          <h2 className="font-display text-5xl md:text-6xl font-semibold mb-12 tracking-tight">
            About
          </h2>
          
          <div className="space-y-6 font-body text-lg leading-relaxed text-muted-foreground">
            <p>
              I'm a photography student with a passion for capturing the essence of moments through 
              a minimalist approach. My work focuses on the interplay of light, shadow, and form.
            </p>
            
            <p>
              Based in the heart of the city, I specialize in architectural, portrait, and street 
              photography. Each photograph is an exploration of visual storytelling, stripped down 
              to its fundamental elements.
            </p>
            
            <p>
              My approach is simple: less is more. Through careful composition and an eye for 
              detail, I aim to create images that resonate with clarity and purpose.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
