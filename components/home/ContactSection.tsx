import React from 'react'
import {Button} from "@/components/ui/button";
import {sanityClient} from "@/lib/sanity";
import {ContactInformation} from "@/types/ContactInformation";
import ContactForm from "@/components/home/ContactForm";

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

                    <ContactForm />

                </div>
            </div>
        </section>
    )
}
export default ContactSection
