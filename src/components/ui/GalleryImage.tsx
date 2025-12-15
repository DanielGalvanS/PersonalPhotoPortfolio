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
            className="group relative cursor-pointer overflow-hidden bg-background mb-8 break-inside-avoid"
            onClick={onClick}
        >
            {/* 
                THE TRICK: Counter-Translation Masking (The "Curtain" Effect)
                Outer Wrapper moves UP (-15%) -> This pulls the "bottom curtain" up.
                Image moves DOWN (+15%) -> This cancels out the movement, keeping the photo static on screen.
                Result: The bottom of the photo visually gets "cut" or "eaten" by the white bar below.
            */}
            <div className="relative w-full z-10 overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-[15%]">
                <img
                    src={src}
                    alt={alt}
                    loading={index < 4 ? "eager" : "lazy"}
                    decoding="async"
                    className="h-auto w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.02] group-hover:translate-y-[15%]"
                />
            </div>

            {/* 
                Text Content - The "Card" underneath
                Matches Cassia style: White background, Black Serif Text.
            */}
            <div className="absolute bottom-0 left-0 w-full h-[15%] z-0 flex flex-col justify-center px-6 bg-white">
                <div className="flex flex-col gap-1 opacity-0 translate-y-2 transition-all duration-300 delay-100 ease-out group-hover:opacity-100 group-hover:translate-y-0">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-medium font-body">
                        {category}
                    </p>
                    <h3 className="font-serif text-2xl text-black tracking-tight truncate">
                        {title}
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default GalleryImage;
