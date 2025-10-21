import Navigation from "@/components/Navigation";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import product1 from "@/assets/product-1.jpg";

const images = [product1];

const ProductPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="py-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <Link 
              to="/#work" 
              className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors mb-12"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver a Selected Work
            </Link>
            
            <h1 className="font-display text-5xl md:text-6xl font-semibold mb-8 tracking-tight fade-in-up">
              Foto de Producto
            </h1>
            
            <p className="font-body text-lg text-muted-foreground mb-20 max-w-2xl">
              Fotografía profesional de productos que destaca la calidad y detalles de cada artículo.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="overflow-hidden bg-card aspect-[4/5] fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <img
                    src={image}
                    alt={`Producto ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
