"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "./Lightbox";

interface AlbumGalleryProps {
    imageUrls: string[];
}

export default function AlbumGallery({ imageUrls }: AlbumGalleryProps) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const openLightbox = (index: number) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % imageUrls.length);
    };

    const previousImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? imageUrls.length - 1 : prev - 1
        );
    };

    return (
        <>
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
                {imageUrls.map((url, index) => (
                    <div
                        key={index}
                        className="break-inside-avoid mb-4 group cursor-pointer"
                        onClick={() => openLightbox(index)}
                    >
                        <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <Image
                                src={url}
                                alt={`Photo ${index + 1}`}
                                width={800}
                                height={600}
                                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    </div>
                ))}
            </div>

            {lightboxOpen && (
                <Lightbox
                    images={imageUrls}
                    currentIndex={currentImageIndex}
                    onClose={closeLightbox}
                    onNext={nextImage}
                    onPrevious={previousImage}
                />
            )}
        </>
    );
}