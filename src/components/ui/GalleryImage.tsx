import { motion } from "framer-motion";

interface GalleryImageProps {
    src: string;
    alt: string;
    category: string;
    title: string;
    index: number;
    onClick: () => void;
}

const GalleryImage = ({ src, alt, category, title, index, onClick }: GalleryImageProps) => {
    return (
        <div
            className="group relative cursor-pointer overflow-hidden bg-transparent"
            onClick={onClick}
        >
            {/* Image Container - Slides Up on Hover */}
            <div className="relative w-full aspect-[4/5] overflow-hidden transition-transform duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)] will-change-transform group-hover:-translate-y-[15%]">
                <img
                    src={src}
                    alt={alt}
                    className="h-full w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-105"
                />
                {/* Subtle overlay on image */}
                <div className="absolute inset-0 bg-black/0 transition-colors duration-1000 group-hover:bg-black/10" />
            </div>

            {/* Text Content - Appears in the bottom space */}
            <div className="absolute bottom-0 left-0 w-full h-[15%] flex flex-col justify-center px-4 opacity-0 transform translate-y-8 transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:opacity-100 group-hover:translate-y-0">
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">
                    {category}
                </p>
                <h3 className="font-display text-lg font-medium text-foreground tracking-tight">
                    {title}
                </h3>
            </div>
        </div>
    );
};

export default GalleryImage;
