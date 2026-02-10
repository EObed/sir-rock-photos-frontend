
import ContactSection from "@/components/home/ContactSection";
import HeroSection from "@/components/home/HeroSection";
import HeroImage from "@/components/home/HeroImage";
import AboutSection from "@/components/home/AboutSection";
import SelectedWorksSection from "@/components/home/SelectedWorksSection";
import Nav from "@/components/home/Nav";

export default function HomePage() {

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Nav />
            {/* Home / Hero Section */}
            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Text */}
                    <div className="space-y-6">
                        <HeroSection />

                        {/* Buttons (static for now) */}
                        <div className="flex gap-4">
                            <button className="px-6 py-3 rounded-lg bg-black text-white font-medium hover:bg-accent/90 hover:text-black transition cursor-pointer">
                                View My Work
                            </button>

                            <button className="px-6 py-3 rounded-lg border border-border font-medium hover:bg-secondary transition cursor-pointer">
                                Get In Touch
                            </button>
                        </div>
                    </div>

                    {/* Placeholder visual */}
                    <HeroImage />


                </div>
            </section>

            {/* About Section */}
           <AboutSection />

            <SelectedWorksSection />

            <ContactSection />


        </main>
    )
}
