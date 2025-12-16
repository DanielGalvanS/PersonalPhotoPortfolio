const About = () => {
  return (
    <section id="about" className="py-32 bg-background relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-12 items-center">
          <div className="w-full relative aspect-[3/4] overflow-hidden rounded-sm fade-in-up" style={{ animationDelay: '0.1s' }}>
            <img
              src="/profile-about.png"
              alt="Portrait of the photographer"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>

          <div className="fade-in-up space-y-8" style={{ animationDelay: '0.2s' }}>
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

              <div className="pt-4">
                <p className="font-display text-2xl font-medium text-foreground">Paula Mitchell</p>
                <p className="text-sm tracking-widest uppercase text-muted-foreground mt-1">Photographer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
