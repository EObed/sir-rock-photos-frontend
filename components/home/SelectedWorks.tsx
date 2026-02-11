"use client";
import { Carousel, CarouselContent, CarouselItem} from '@/components/ui/carousel'
import { Album } from '@/types/Album'
import {AlbumCard} from "@/components/albums/AlbumCard";

interface SelectedWorksProps {
    albums: Album[]
}

export function SelectedWorks({ albums }: SelectedWorksProps) {
    return (
        <section id={"selected-works"} className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-8">
                <h2 className="text-4xl md:text-5xl font-bold">Selected Works</h2>

                <Carousel className="w-full">
                    <CarouselContent className="-ml-4">
                        {albums.slice(0, 5).map((album) => (
                            <CarouselItem
                                key={album.slug.current}
                                className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                            >
                                <AlbumCard album={album} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>

                <div className="text-center">
                    <button
                        className="px-6 py-3 rounded-lg bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition cursor-pointer"
                        onClick={() => window.location.href = '/albums'}
                    >
                        View Full Portfolio
                    </button>
                </div>
            </div>
        </section>
    )
}
