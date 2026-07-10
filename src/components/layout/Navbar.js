"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { createPortal } from "react-dom";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [portalTarget, setPortalTarget] = useState(null);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Our Team", href: "/team" },
        { name: "Services", href: "/services" },
        { name: "Our Work", href: "/#projects" },
        { name: "FAQ", href: "/#faq" },
    ];

    // Set portal target after mount
    useEffect(() => {
        setPortalTarget(document.body);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    const mobileMenu = isMenuOpen && portalTarget ? createPortal(
        <div
            className="fixed inset-0 z-[99999] flex flex-col bg-canvas"
        >
            {/* Menu Header */}
            <div className="flex justify-between items-center w-full px-6 py-4 border-b border-white/5 bg-canvas">
                <div className="flex items-center gap-1">
                    <div className="relative w-12 h-12 flex items-center justify-center overflow-hidden rounded-xl bg-transparent">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="object-cover w-full h-full scale-[1.5]"
                        >
                            <source src="/Animated Logo/RobotSaludando.webm" type="video/webm" />
                        </video>
                    </div>
                    <span className="font-serif text-xl font-bold tracking-tighter text-foreground uppercase">
                        Z Soft
                    </span>
                </div>
                <button
                    onClick={() => setIsMenuOpen(false)}
                    className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white"
                    aria-label="Close menu"
                >
                    <X size={24} />
                </button>
            </div>

            {/* Links - Beautifully centered */}
            <div
                className="flex-1 flex flex-col justify-center items-center gap-5 px-6 overflow-y-auto bg-canvas"
            >
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="w-full text-center"
                    >
                        <span className="text-2xl sm:text-3xl font-serif font-bold text-foreground hover:text-accent uppercase tracking-tight block py-2">
                            {link.name}
                        </span>
                    </Link>
                ))}
            </div>


        </div>,
        portalTarget
    ) : null;

    return (
        <>
            <nav
                className="fixed top-0 inset-x-0 w-full z-[1000] outline-none py-4 bg-transparent"
            >
                <div className="relative flex items-center justify-between w-full max-w-[100vw] px-6 lg:px-16 mx-auto outline-none">
                    <Link href="/" className="relative z-10">
                        <div className="flex items-center gap-1 group cursor-pointer">
                            <div className="relative w-12 h-12 flex items-center justify-center overflow-hidden rounded-xl bg-transparent transition-transform duration-300 group-hover:scale-105">
                                <video
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="object-cover w-full h-full scale-[1.5]"
                                >
                                    <source src="/Animated Logo/RobotSaludando.webm" type="video/webm" />
                                </video>
                            </div>
                            <span className="font-serif text-2xl font-bold tracking-tighter text-foreground uppercase">
                                Z Soft
                            </span>
                        </div>
                    </Link>

                    <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-8">
                        {navLinks.map((link) => (
                            <div key={link.name} className="group relative">
                                <Link
                                    href={link.href}
                                    className="text-foreground hover:text-accent text-sm lg:text-base uppercase tracking-[0.12em] font-medium cursor-pointer [font-family:var(--font-space)]"
                                >
                                    {link.name}
                                </Link>
                                <div className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-gradient-accent group-hover:w-full rounded-full" />
                            </div>
                        ))}
                    </div>

                    <div className="relative z-10 flex items-center gap-4 ml-auto">
                        <Link href="/contact" className="hidden lg:block">
                            <button className="relative py-3.5 px-10 rounded-full bg-gradient-btn text-[11px] font-bold uppercase tracking-[0.15em] text-btn-primary-foreground shadow-glow hover:shadow-glow-accent group overflow-hidden cursor-pointer">
                                <span className="relative z-10">Contact Us</span>
                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100" />
                            </button>
                        </Link>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-foreground active:bg-white/10 cursor-pointer"
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile menu rendered via portal - outside nav stacking context */}
            {mobileMenu}
        </>
    );
}
