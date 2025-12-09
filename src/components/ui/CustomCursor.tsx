import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CustomCursor = () => {
    const [cursorVariant, setCursorVariant] = useState<"default" | "hover" | "arrow-left" | "arrow-right">("default");
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Smooth spring for the outer ring (drag effect)
    const springConfig = { damping: 15, stiffness: 150, mass: 0.5 };
    const cursorXSpring = useSpring(mouseX, springConfig);
    const cursorYSpring = useSpring(mouseY, springConfig);

    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Force cursor:none on the root element to override any browser quirks
        document.documentElement.style.cursor = 'none';

        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            setIsVisible(true); // Ensure visible on interaction
            const target = e.target as HTMLElement;

            // Check for specific data-cursor attribute first
            const cursorType = target.getAttribute("data-cursor") || target.closest("[data-cursor]")?.getAttribute("data-cursor");

            if (cursorType === "arrow-left") {
                setCursorVariant("arrow-left");
                return;
            }
            if (cursorType === "arrow-right") {
                setCursorVariant("arrow-right");
                return;
            }

            // Default hover checks
            if (
                target.tagName.toLowerCase() === "a" ||
                target.tagName.toLowerCase() === "button" ||
                target.closest("a") ||
                target.closest("button") ||
                target.closest(".gallery-item") ||
                target.closest(".cursor-hover")
            ) {
                setCursorVariant("hover");
            } else {
                setCursorVariant("default");
            }
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mouseenter", handleMouseEnter);
        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.removeEventListener("mouseleave", handleMouseLeave);
            // Cleanup: allow cursor to return if component unmounts
            document.documentElement.style.cursor = '';
        };
    }, [mouseX, mouseY]);

    // Only show on desktop
    const [isDesktop, setIsDesktop] = useState(false);
    useEffect(() => {
        setIsDesktop(window.matchMedia("(pointer: fine)").matches);
    }, []);

    if (!isDesktop || !isVisible) return null;

    return (
        <>
            <motion.div
                className={`fixed top-0 left-0 rounded-full pointer-events-none z-[2147483647] flex items-center justify-center mix-blend-difference ${cursorVariant === "arrow-left" || cursorVariant === "arrow-right" ? "bg-white" : "bg-white"
                    }`}
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    width: cursorVariant === "hover" ? 40 : (cursorVariant === "arrow-left" || cursorVariant === "arrow-right" ? 48 : 20),
                    height: cursorVariant === "hover" ? 40 : (cursorVariant === "arrow-left" || cursorVariant === "arrow-right" ? 48 : 20),
                    scale: cursorVariant === "hover" ? 1 : 1, // Reset scale, use width/height for smoother size change
                }}
                transition={{
                    type: "spring", stiffness: 300, damping: 20
                }}
            >
                {/* Aesthetic Long Arrows */}
                {cursorVariant === "arrow-left" && (
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-black">
                        <path d="M10 16H26M10 16L16 10M10 16L16 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}
                {cursorVariant === "arrow-right" && (
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-black">
                        <path d="M22 16H6M22 16L16 10M22 16L16 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}
            </motion.div>
        </>
    );
};

export default CustomCursor;
