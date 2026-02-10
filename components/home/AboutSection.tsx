import {sanityClient} from "@/lib/sanity";
import {HomeData} from "@/types/HomeData";

export default async function AboutSection() {

    const home = await sanityClient.fetch<HomeData>(
        `*[_type == "home"][0]`
    )

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
            <div className="max-w-6xl mx-auto">
                <div className=" gap-12 mb-16">
                    {home.about?.map((item) => (
                        <div key={item.title} className="space-y-4">
                            <h3 className="text-4xl font-bold">{item.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Skills / Expertise */}
                {home.skills && home.skills.length > 0 && (
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold">Expertise</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {home.skills.map((skill) => (
                                <div
                                    key={skill}
                                    className="flex items-center gap-3 p-4 bg-background rounded-lg border border-border"
                                >
                                    <div className="w-2 h-2 bg-black rounded-full" />
                                    <span className="font-medium">{skill}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}