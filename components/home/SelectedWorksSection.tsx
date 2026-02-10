import {Album} from "@/types/Album";
import {sanityClient} from "@/lib/sanity";
import {SelectedWorks} from "@/components/home/SelectedWorks";

export default async function SelectedWorksSection() {

    const albums: Album[] = await sanityClient.fetch(
        `*[_type == "album"] | order(publishedAt desc)[0...5]{
      title,
      slug,
      coverImage,
      description,
      category
    }`
    )

    return (
        <SelectedWorks albums={albums} />
    )
}