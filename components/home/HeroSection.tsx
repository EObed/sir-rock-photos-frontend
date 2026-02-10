import {sanityClient} from "@/lib/sanity";
import {HomeData} from "@/types/HomeData";


export default async function HeroSection () {

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
        <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                {home.heroTitle}
            </h1>

            {home.heroSubtitle && (
                <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                    {home.heroSubtitle}
                </p>
            )}
        </div>
    )
}