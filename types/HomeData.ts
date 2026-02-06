import {SanityImageSource} from "@sanity/image-url";

export type HomeData = {
    heroTitle: string
    heroSubtitle?: string
    heroImage?: SanityImageSource
    about?: {
        title: string
        description: string
    }[]
    skills?: string[]
}