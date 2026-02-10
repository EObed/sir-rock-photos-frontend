import { sanityClient } from '@/lib/sanity'
import { Album } from '@/types/Album'
import {AlbumCard} from "@/components/albums/AlbumCard";

export default async function AlbumsPage() {
    const albums: Album[] = await sanityClient.fetch(
        `*[_type == "album"] | order(publishedAt desc)`
    )

    if (!albums || albums.length === 0) {
        return <div className="p-8 text-center text-muted-foreground">No albums yet</div>
    }

    return (
        <main className="min-h-screen bg-background text-foreground py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-12">
                <h1 className="text-4xl md:text-5xl font-bold">All Albums</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {albums.map((album) => (
                        <AlbumCard key={album.slug.current} album={album} />
                    ))}
                </div>
            </div>
        </main>
    )
}
