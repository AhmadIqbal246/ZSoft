"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import MagneticButton from "@/components/animations/MagneticButton";
import { trackContactFormSubmit } from "@/lib/analytics/gtag";

export default function Contact() {
    const [formStatus, setFormStatus] = useState("idle");
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStatus("loading");
        setTimeout(() => {
            setFormStatus("success");
            trackContactFormSubmit("home_contact");
        }, 2000);
    };
    return (
        <section id="contact" className="py-10 lg:py-32 bg-transparent overflow-hidden relative">
            <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-foreground/10 blur-[150px] -z-1" />
            <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-accent/10 blur-[150px] -z-1" />
            <div className="container mx-auto px-6 lg:px-12">
                <div className="max-w-3xl mx-auto flex flex-col gap-10 items-center text-center">
                    <h2 className="text-4xl md:text-6xl font-serif font-bold text-foreground">
                        Let&apos;s <span className="text-accent transition-colors duration-500 hover:text-gradient-accent">Build</span> Something Great.
                    </h2>
                    <div className="relative mt-10 w-full">
                        <AnimatePresence mode="wait">
                            {formStatus === "success" ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="p-16 rounded-3xl bg-surface border border-accent/20 flex flex-col items-center justify-center text-center gap-6 shadow-glow-accent"
                                >
                                    <CheckCircle className="text-accent" size={80} />
                                    <h3 className="text-3xl font-serif font-bold text-foreground">Message Sent Successfully!</h3>
                                    <p className="text-muted text-lg">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                                    <button
                                        onClick={() => setFormStatus("idle")}
                                        className="mt-6 px-10 py-3 rounded-full border border-accent/30 text-accent hover:bg-accent/10 transition-colors uppercase tracking-widest font-mono text-sm cursor-pointer"
                                    >
                                        Send Another Message
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -30 }}
                                    onSubmit={handleSubmit}
                                    className="flex flex-col gap-8 w-full text-left"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="flex flex-col gap-2 relative">
                                            <label className="text-xs font-mono text-muted uppercase tracking-wider mb-2">Full Name</label>
                                            <input
                                                required
                                                type="text"
                                                placeholder="John Doe"
                                                className="p-6 rounded-2xl bg-surface border border-white/5 text-foreground focus:border-foreground focus:ring-1 focus:ring-accent transition-all outline-none"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs font-mono text-muted uppercase tracking-wider mb-2">Email Address</label>
                                            <input
                                                required
                                                type="email"
                                                placeholder="john@example.com"
                                                className="p-6 rounded-2xl bg-surface border border-white/5 text-foreground focus:border-accent focus:ring-1 focus:ring-accent transition-all outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-mono text-muted uppercase tracking-wider mb-2">Your Message</label>
                                        <textarea
                                            required
                                            rows="6"
                                            placeholder="Tell us about your project..."
                                            className="p-10 rounded-3xl bg-surface border border-white/5 text-foreground focus:border-foreground focus:ring-1 focus:ring-accent transition-all outline-none resize-none"
                                        />
                                    </div>
                                    <MagneticButton>
                                        <button
                                            type="submit"
                                            disabled={formStatus === "loading"}
                                            className="w-full py-6 rounded-2xl bg-gradient-btn text-btn-primary-foreground text-base font-bold uppercase tracking-[0.2em] shadow-glow flex items-center justify-center gap-4 group disabled:opacity-50 cursor-pointer"
                                        >
                                            {formStatus === "loading" ? (
                                                <div className="w-6 h-6 border-b-2 border-white rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    Send Message <Send className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300" size={20} />
                                                </>
                                            )}
                                        </button>
                                    </MagneticButton>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
