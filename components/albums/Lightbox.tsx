"use client";

import Image from "next/image";
import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
    images: string[];
    currentIndex: number;
    onClose: () => void;
    onNext: () => void;
    onPrevious: () => void;
}

export default function Lightbox({
                                     images,
                                     currentIndex,
                                     onClose,
                                     onNext,
                                     onPrevious,
                                 }: LightboxProps) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") onNext();
            if (e.key === "ArrowLeft") onPrevious();
        };

        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "unset";
        };
    }, [onClose, onNext, onPrevious]);

    return (
        <div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={onClose}
        >
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50"
                aria-label="Close lightbox"
            >
                <X size={32} />
            </button>

            {/* Previous button */}
            {currentIndex > 0 && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onPrevious();
                    }}
                    className="absolute left-4 text-white hover:text-gray-300 transition-colors z-50"
                    aria-label="Previous image"
                >
                    <ChevronLeft size={48} />
                </button>
            )}

            {/* Next button */}
            {currentIndex < images.length - 1 && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onNext();
                    }}
                    className="absolute right-4 text-white hover:text-gray-300 transition-colors z-50"
                    aria-label="Next image"
                >
                    <ChevronRight size={48} />
                </button>
            )}

            {/* Image counter */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-sm z-50">
                {currentIndex + 1} / {images.length}
            </div>

            {/* Image */}
            <div
                className="relative w-full h-full flex items-center justify-center p-4"
                onClick={(e) => e.stopPropagation()}
            >
                <Image
                    src={images[currentIndex]}
                    alt={`Photo ${currentIndex + 1}`}
                    fill
                    className="object-contain"
                    quality={100}
                />
            </div>
        </div>
    );
}