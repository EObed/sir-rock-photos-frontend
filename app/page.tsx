import ContactSection from "@/components/home/ContactSection";
import HeroSection from "@/components/home/HeroSection";
import HeroImage from "@/components/home/HeroImage";
import AboutSection from "@/components/home/AboutSection";
import SelectedWorksSection from "@/components/home/SelectedWorksSection";

export default function HomePage() {

    return (
        <main className="min-h-screen bg-background text-foreground">
            <section id={"home"} className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <HeroSection />
                    </div>
                    <HeroImage />
                </div>
            </section>
           <AboutSection />
           <SelectedWorksSection />
           <ContactSection />
        </main>
    )
}