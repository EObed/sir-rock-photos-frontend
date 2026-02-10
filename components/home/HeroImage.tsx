import Image from "next/image";
import {urlFor} from "@/lib/sanityImage";
import {sanityClient} from "@/lib/sanity";
import {HomeData} from "@/types/HomeData";

export default async function HeroImage() {

    const home = await sanityClient.fetch<HomeData>(
        `*[_type == "home"][0]`
    )

    if (!home) {
        return (
            <div className="p-8 text-center text-muted-foreground">
                No home content yet
            </div>
        )
    }

    return (
        <div>
            {home.heroImage && (
                <div className="relative w-full h-[280px] sm:h-[360px] md:h-[420px] lg:h-[520px]">
                    <Image
                        src={urlFor(home.heroImage).url()}
                        alt={home.heroTitle}
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            )}
        </div>
    )}