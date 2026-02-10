import React from 'react'
import {Button} from "@/components/ui/button";
import {sanityClient} from "@/lib/sanity";
import {ContactInformation} from "@/types/ContactInformation";

export async function ContactSection () {
    const contactInformation = await sanityClient.fetch<ContactInformation>(
        `*[_type == "contactInformation"][0]`
    )

    if (!contactInformation) {
        return (
            <div className="p-8 text-center text-muted-foreground">
                No information yet
            </div>
        )
    }

    return (
        <section
            className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20"
        >
            <div className="max-w-4xl mx-auto">
                <div className="space-y-12">
                    <div className="space-y-4 text-center">
                        <h2 className="text-4xl md:text-5xl font-bold">
                            {contactInformation.contactInformationTitle}
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            {contactInformation.contactInformationSubtitle}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center space-y-3">
                            <div className="text-4xl">📧</div>
                            <h3 className="font-bold">Email</h3>
                            <p className="text-muted-foreground">
                                {contactInformation.email}
                            </p>
                        </div>
                        <div className="text-center space-y-3">
                            <div className="text-4xl">📱</div>
                            <h3 className="font-bold">Phone</h3>
                            <p className="text-muted-foreground">{contactInformation.phoneNumber}</p>
                        </div>
                        <div className="text-center space-y-3">
                            <div className="text-4xl">📍</div>
                            <h3 className="font-bold">Location</h3>
                            <p className="text-muted-foreground">{contactInformation.location}</p>
                        </div>
                    </div>

                    <form className="space-y-4 max-w-2xl mx-auto">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                        <textarea
                            placeholder="Tell me about your project"
                            rows={5}
                            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                        />
                        <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                            Send Message
                        </Button>
                    </form>


                </div>
            </div>
        </section>
    )
}
export default ContactSection
