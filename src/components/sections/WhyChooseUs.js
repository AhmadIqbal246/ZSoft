"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bot, Globe, ShieldCheck, Headphones, ChevronLeft, ChevronRight } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

const features = [
    {
        icon: <Bot size={32} />,
        title: "AI Chatbots & RAG Systems",
        description:
            "Intelligent conversational AI and Retrieval-Augmented Generation systems that enhance customer engagement and automate complex business processes.",
        color: "accent",
        gradient: "from-accent/20 to-transparent",
        borderHover: "hover:border-accent/30",
        iconBg: "bg-accent/10",
        iconColor: "text-accent",
    },
    {
        icon: <Globe size={32} />,
        title: "Web Development Excellence",
        description:
            "Custom web applications built with Python and JavaScript. From responsive frontends to robust backends, we create scalable solutions that drive business growth.",
        color: "foreground",
        gradient: "from-foreground/20 to-transparent",
        borderHover: "hover:border-foreground/30",
        iconBg: "bg-foreground/10",
        iconColor: "text-accent",
    },
    {
        icon: <ShieldCheck size={32} />,
        title: "Enterprise Security & Compliance",
        description:
            "Bank-grade security with end-to-end encryption, role-based access control, and full compliance with industry standards and regulations.",
        color: "accent",
        gradient: "from-accent/20 to-transparent",
        borderHover: "hover:border-accent/30",
        iconBg: "bg-accent/10",
        iconColor: "text-accent",
    },
    {
        icon: <Headphones size={32} />,
        title: "24/7 Support & Maintenance",
        description:
            "Round-the-clock technical support, regular maintenance, and continuous monitoring to ensure your systems run smoothly and efficiently.",
        color: "foreground",
        gradient: "from-foreground/20 to-transparent",
        borderHover: "hover:border-foreground/30",
        iconBg: "bg-foreground/10",
        iconColor: "text-accent",
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.15,
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
};

export default function WhyChooseUs() {
    const [activeSlide, setActiveSlide] = useState(0);
    const slidesCount = Math.ceil(features.length / 2);
    const visibleFeatures = features.slice(activeSlide * 2, activeSlide * 2 + 2);

    const next = () => setActiveSlide((prev) => (prev + 1) % slidesCount);
    const prev = () => setActiveSlide((prev) => (prev - 1 + slidesCount) % slidesCount);

    return (
        <section id="why-us" className="py-10 lg:py-32 bg-transparent overflow-hidden relative">
            {/* Decorative background glow */}
            <div className="absolute top-[30%] left-[-15%] w-[500px] h-[500px] bg-foreground/5 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 lg:px-12">
                {/* Section Header */}
                <div className="flex flex-col gap-6 mb-20 items-center justify-center text-center">
                    <FadeIn direction="down" delay={0.2} distance={20}>
                    </FadeIn>
                    <h2 className="text-4xl md:text-6xl font-serif font-bold text-foreground">
                        Why Businesses Trust{" "}
                        <span className="gradient-text-animated">Z Soft</span>.
                    </h2>
                    <p className="text-muted text-lg max-w-2xl">
                        We combine cutting-edge technology with deep industry expertise to deliver solutions that truly transform your business.
                    </p>
                </div>

                {/* Feature Cards Carousel */}
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {visibleFeatures.map((feature, index) => (
                            <motion.div
                                key={`${activeSlide}-${feature.title}`}
                                custom={index}
                                initial="hidden"
                                animate="visible"
                                variants={cardVariants}
                                className={`group relative p-8 md:p-10 rounded-2xl bg-surface border border-white/5 ${feature.borderHover} transition-all duration-300 ease-out overflow-hidden hover:-translate-y-2 shadow-[0_10px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.8)]`}
                            >
                                {/* Hover gradient overlay */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                                />

                                {/* Content */}
                                <div className="relative z-10 flex flex-col gap-5">
                                    {/* Icon */}
                                    <div
                                        className={`w-14 h-14 rounded-xl ${feature.iconBg} ${feature.iconColor} flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
                                    >
                                        {feature.icon}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground group-hover:text-white transition-colors duration-300">
                                        {feature.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-foreground text-sm md:text-base leading-relaxed">
                                        {feature.description}
                                    </p>

                                    {/* Bottom accent line */}
                                    <div
                                        className={`w-0 h-[2px] bg-gradient-accent group-hover:w-full transition-all duration-700 rounded-full mt-2`}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="flex items-center justify-center gap-10 mt-12">
                        <button
                            type="button"
                            onClick={prev}
                            className="p-4 rounded-full border border-white/10 text-muted hover:text-accent hover:border-accent transition-all duration-300 transform hover:scale-110 cursor-pointer"
                            aria-label="Previous cards"
                        >
                            <ChevronLeft size={32} />
                        </button>
                        <div className="flex gap-4">
                            {Array.from({ length: slidesCount }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-1 rounded-full transition-all duration-500 ${i === activeSlide ? "bg-gradient-accent w-20" : "bg-white/10 w-12"
                                        }`}
                                />
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={next}
                            className="p-4 rounded-full border border-white/10 text-muted hover:text-accent hover:border-foreground transition-all duration-300 transform hover:scale-110 cursor-pointer"
                            aria-label="Next cards"
                        >
                            <ChevronRight size={32} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
