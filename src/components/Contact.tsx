import { Mail, Instagram, Linkedin, Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add submission logic here
  };

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    setFormData({ ...formData, message: target.value });

    // Auto-resize logic
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  // Reset height if message is cleared programmatically
  useEffect(() => {
    if (formData.message === "" && textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [formData.message]);

  return (
    <section id="contact" className="py-32 bg-background">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="fade-in-up">
            <h2 className="font-display text-5xl md:text-6xl font-semibold mb-12 tracking-tight">
              Get in Touch
            </h2>

            <p className="font-body text-lg text-muted-foreground mb-16 leading-relaxed max-w-md">
              Available for collaborations, commissions, and creative projects.
              Let's create something beautiful together.
            </p>

            <div className="space-y-8">
              <a href="mailto:hello@photographer.com" className="flex items-center gap-6 group w-fit">
                <Mail className="w-6 h-6 text-accent" />
                <span className="font-display text-2xl group-hover:text-accent transition-colors">
                  paula@gmail.com
                </span>
              </a>

              <a href="https://instagram.com/paumitchellv" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group w-fit">
                <Instagram className="w-6 h-6 text-accent" />
                <span className="font-display text-2xl group-hover:text-accent transition-colors">
                  @paumitchellv
                </span>
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium tracking-wide text-muted-foreground uppercase">Name</label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-transparent border-b border-border py-4 text-xl focus:border-accent focus:outline-none transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium tracking-wide text-muted-foreground uppercase">Email</label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent border-b border-border py-4 text-xl focus:border-accent focus:outline-none transition-colors"
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium tracking-wide text-muted-foreground uppercase">Message</label>
              <textarea
                id="message"
                ref={textareaRef}
                rows={1}
                value={formData.message}
                onChange={handleTextareaInput}
                className="w-full bg-transparent border-b border-border py-4 text-xl focus:border-accent focus:outline-none transition-colors resize-none overflow-hidden min-h-[60px]"
                placeholder="Tell me about your project..."
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 text-sm tracking-widest uppercase hover:bg-primary/90 transition-all duration-300"
            >
              Send Message
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
