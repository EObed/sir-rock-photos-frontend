import imageUrlBuilder, {SanityImageSource} from '@sanity/image-url'
import { sanityClient } from './sanity'

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
    return builder.image(source)
}
