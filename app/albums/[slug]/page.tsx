import { sanityClient } from "@/lib/sanity";
import { urlFor } from "@/lib/sanityImage";
import { Album } from "@/types/Album";
import AlbumGallery from "@/components/albums/AlbumGallery";

interface AlbumPageProps {
    params: Promise<{ slug: string }>;
}

export default async function AlbumPage({ params }: AlbumPageProps) {
    const { slug } = await params;

    const album = await sanityClient.fetch<Album>(
        `
    *[_type == "album" && slug.current == $slug][0]{
      title,
      slug,
      coverImage,
      photos,
      description,
      category
    }
    `,
        {
            slug: slug,
        }
    );

    if (!album) {
        return (
            <div className="p-8 text-center text-muted-foreground">
                Album not found
            </div>
        );
    }

    const imageUrls = album.photos.map((photo) => urlFor(photo).url());

    return (
        <main className="min-h-screen bg-background text-foreground px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Album header */}
                <div className="space-y-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold">{album.title}</h1>
                    {album.description && (
                        <p className="text-muted-foreground max-w-2xl mx-auto">{album.description}</p>
                    )}
                </div>

                {/* Masonry grid */}
                <AlbumGallery imageUrls={imageUrls} />
            </div>
        </main>
    );
}