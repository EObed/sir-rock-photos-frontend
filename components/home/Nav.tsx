"use client";

import React, {useState, useEffect} from 'react'
import {Menu, X} from "lucide-react";
import {useRouter, usePathname} from 'next/navigation';

const Nav = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState('home')
    const router = useRouter()
    const pathname = usePathname()

    const scrollToSection = (sectionId: string) => {
        if (pathname !== '/') {
            router.push(`/#${sectionId}`)
            setIsMenuOpen(false)
            return
        }

        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
            setActiveSection(sectionId)
            setIsMenuOpen(false)
        }
    }

    useEffect(() => {
        if (pathname === '/' && window.location.hash) {
            const sectionId = window.location.hash.substring(1)
            setTimeout(() => {
                const element = document.getElementById(sectionId)
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                    setActiveSection(sectionId)
                }
            }, 100)
        }
    }, [pathname])

    useEffect(() => {
        if (pathname !== '/') return

        const handleScroll = () => {
            const sections = ['home', 'about', 'selected-works', 'contact']
            const scrollPosition = window.scrollY + 100

            for (const sectionId of sections) {
                const element = document.getElementById(sectionId)
                if (element) {
                    const { offsetTop, offsetHeight } = element
                    if (
                        scrollPosition >= offsetTop &&
                        scrollPosition < offsetTop + offsetHeight
                    ) {
                        setActiveSection(sectionId)
                        break
                    }
                }
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [pathname])

    const navItems = [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'selected-works', label: 'My Work' },
        { id: 'contact', label: 'Contact' },
    ]

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <h1 className="text-2xl font-bold tracking-tight">Rockson Teye Tetteh</h1>
                        <p className="text-xs text-muted-foreground">Photographer</p>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex gap-8">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={`text-sm font-medium transition-colors duration-200 ${
                                    activeSection === item.id && pathname === '/'
                                        ? 'text-foreground border-b-2 border-accent'
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-secondary"
                    >
                        {isMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden pb-4 space-y-2 animate-in fade-in slide-in-from-top-2">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className="block w-full text-left px-4 py-2 rounded-lg hover:bg-secondary transition-colors"
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    )
}
export default Nav