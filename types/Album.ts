import {SanityImageSource} from '@sanity/image-url'

export type Album = {
    title: string
    slug: {current: string}
    coverImage: SanityImageSource
    photos: SanityImageSource[]
    description?: string
    category?: string
}
