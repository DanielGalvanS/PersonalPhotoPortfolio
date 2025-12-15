import { useRef, useState, useLayoutEffect } from "react";
import { motion } from "framer-motion";

interface GalleryImageProps {
    src: string;
    alt: string;
    category: string;
    title: string;
    index: number;
    onClick: () => void;
    onImageLoad?: () => void; // New prop for global preloader
}

const GalleryImage = ({ src, alt, category, title, index, onClick, onImageLoad }: GalleryImageProps) => {
    const imgRef = useRef<HTMLImageElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useLayoutEffect(() => {
        const img = imgRef.current;
        if (img && img.complete) {
            setIsLoaded(true);
            onImageLoad?.(); // Notify parent immediately if cached
        }
    }, []);

    const handleLoad = () => {
        setIsLoaded(true);
        onImageLoad?.(); // Notify parent on load
    };

    return (
        <div
            className="group relative cursor-pointer overflow-hidden bg-background mb-8 break-inside-avoid"
            onClick={onClick}
        >
            {/* 
                THE TRICK: Counter-Translation Masking (The "Curtain" Effect)
                Outer Wrapper moves UP (-15%) -> This pulls the "bottom curtain" up.
                Image moves DOWN (+15%) -> This cancels out the movement, keeping the photo static on screen.
                Result: The bottom of the photo visually gets "cut" or "eaten" by the white bar below.
                
                Updated: "Cover Strategy" + Hardware Acceleration. 
                - Removed animate-pulse (caused flickering).
                - Added transform-gpu & backface-hidden for stability.
            */}
            <div className={`relative w-full z-10 overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-[15%] min-h-[300px] bg-secondary/20 transform-gpu backface-hidden`}>
                <img
                    ref={imgRef}
                    src={src}
                    alt={alt}
                    loading="eager" // User request: 'Already there when I scroll'.
                    decoding="sync" // Changed from 'async' to 'sync'. Forces paint BEFORE display. Prevents "appearing" on scroll.
                    className={`h-auto w-full object-cover transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.02] group-hover:translate-y-[15%] ${isLoaded ? 'opacity-100 translate-y-0 scale-100 blur-0' : 'opacity-0 translate-y-4 scale-[0.98] blur-sm'}`}
                    onLoad={handleLoad}
                />
            </div>

            {/* 
                Text Content - The "Card" underneath
                Matches Cassia style: White background, Black Serif Text.
                Updated: Left aligned to match reference "FREELANCE".
            */}
            <div className="absolute bottom-0 left-0 w-full h-[15%] z-0 flex flex-col justify-center items-start px-6 bg-white">
                <div className="flex flex-col items-start gap-1 opacity-0 translate-y-2 transition-all duration-300 delay-100 ease-out group-hover:opacity-100 group-hover:translate-y-0">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-medium font-body">
                        {category}
                    </p>
                    <h3 className="font-serif text-xl text-black tracking-tight font-normal">
                        {title}
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default GalleryImage;
