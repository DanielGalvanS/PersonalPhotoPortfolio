import { Mail, Instagram, Linkedin } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-background">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="fade-in-up">
          <h2 className="font-display text-5xl md:text-6xl font-semibold mb-12 tracking-tight">
            Get in Touch
          </h2>
          
          <p className="font-body text-lg text-muted-foreground mb-16 leading-relaxed">
            Available for collaborations, commissions, and creative projects. 
            Let's create something beautiful together.
          </p>
          
          <div className="space-y-6">
            <a
              href="mailto:hello@photographer.com"
              className="flex items-center gap-4 group w-fit"
            >
              <Mail className="w-5 h-5 text-accent" />
              <span className="font-body text-lg group-hover:text-accent transition-colors">
                hello@photographer.com
              </span>
            </a>
            
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 group w-fit"
            >
              <Instagram className="w-5 h-5 text-accent" />
              <span className="font-body text-lg group-hover:text-accent transition-colors">
                @photographer
              </span>
            </a>
            
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 group w-fit"
            >
              <Linkedin className="w-5 h-5 text-accent" />
              <span className="font-body text-lg group-hover:text-accent transition-colors">
                LinkedIn
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
