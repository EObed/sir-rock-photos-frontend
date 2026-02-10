"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react'
import {Button} from "@/components/ui/button";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        message: ''
    });
    const [showPhoneWarning, setShowPhoneWarning] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Show warning when phone number reaches 3 characters
        if (name === 'phone' && value.length === 3) {
            setShowPhoneWarning(true);
        }
    };

    // Check if all fields are filled
    const isFormValid = formData.name.trim() !== '' &&
        formData.phone.trim() !== '' &&
        formData.message.trim() !== '';

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            console.log('Sending form data:', formData);

            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            console.log('Response status:', response.status);
            console.log('Response ok:', response.ok);

            // Check if response has content before parsing
            const text = await response.text();
            console.log('Response text:', text);

            let data;
            if (text) {
                data = JSON.parse(text);
            } else {
                throw new Error('Empty response from server');
            }

            if (response.ok) {
                alert('Message sent successfully! I\'ll contact you soon.');
                setFormData({ name: '', phone: '', message: '' });
                setShowPhoneWarning(false);
            } else {
                alert(`Failed to send message: ${data.error || 'Unknown error'}`);
            }
        } catch (error) {

            alert('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
            <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <div className="space-y-2">
                <input
                    type="text"
                    name="phone"
                    placeholder="Your Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
                {showPhoneWarning && (
                    <p className="text-sm text-amber-600 dark:text-amber-500">
                        ⚠️ Kindly ensure that you have entered the correct phone number as I&apos;ll be contacting you via that number
                    </p>
                )}
            </div>
            <textarea
                name="message"
                placeholder="Tell me about your project"
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent resize-none"
            />
            <Button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className="w-full bg-black text-white hover:bg-accent/90 hover:text-black cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
        </form>
    )
}

export default ContactForm