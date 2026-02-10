'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {Album} from "../../types/Album";
import {urlFor} from "../../lib/sanityImage";

interface AlbumCardProps {
    album: Album
}

export function AlbumCard({ album }: AlbumCardProps) {
    const router = useRouter()

    return (
        <div
            className="cursor-pointer rounded-lg overflow-hidden bg-secondary"
            onClick={() => router.push(`/albums/${album.slug.current}`)}
        >
            <div className="relative w-full aspect-square">
                <Image
                    src={urlFor(album.coverImage).url()}
                    alt={album.title}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="p-4">
                <h3 className="text-xl font-bold">{album.title}</h3>
                {album.category && (
                    <p className="text-sm text-muted-foreground">{album.category}</p>
                )}
            </div>
        </div>
    )
}
