"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import JsonLd from "@/components/seo/JsonLd";
import { faqPageSchema } from "@/lib/seo/schemas";
import { faqs } from "@/data/faqs";

function FAQItem({ faq, index, isOpen, onToggle }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
            <div
                className={`border border-white/5 rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? "bg-surface border-foreground/20 shadow-glow-accent" : "bg-surface/50 hover:bg-surface hover:border-white/10"
                    }`}
            >
                <button
                    onClick={onToggle}
                    className="w-full flex items-center justify-between p-6 md:p-7 text-left gap-4 cursor-pointer"
                    aria-expanded={isOpen}
                >
                    <span className={`text-base md:text-lg font-bold transition-colors duration-300 ${isOpen ? "text-white" : "text-white/80"}`}>
                        {faq.question}
                    </span>
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className={`flex-shrink-0 p-1 rounded-full transition-colors duration-300 ${isOpen ? "text-accent" : "text-white/40"}`}
                    >
                        <ChevronDown size={20} />
                    </motion.div>
                </button>
                <AnimatePresence initial={false}>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                        >
                            <div className="px-6 md:px-7 pb-6 md:pb-7">
                                <div className="w-full h-[1px] bg-white/5 mb-5" />
                                <p className="text-foreground text-sm md:text-base leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

export default function FAQ({ hideHeader = false }) {
    const [openIndex, setOpenIndex] = useState(0);
    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };
    return (
        <section id="faq" className="py-10 lg:py-32 bg-transparent overflow-hidden relative">
            <JsonLd data={faqPageSchema(faqs)} />
            <div className="absolute top-[20%] right-[-15%] w-[500px] h-[500px] bg-foreground/5 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="container mx-auto px-6 lg:px-12">
                {!hideHeader && (
                    <div className="flex flex-col gap-6 mb-20 items-center justify-center text-center">
                        <FadeIn direction="down" delay={0.2} distance={20}>
                            <span className="text-accent font-mono text-sm tracking-widest uppercase">
                                FAQ
                            </span>
                        </FadeIn>
                        <h2 className="text-4xl md:text-6xl font-serif font-bold text-foreground leading-tight">
                            Got questions?<br />
                            <span className="gradient-text-animated">We&apos;ve got answers</span>.
                        </h2>
                        <p className="text-muted text-lg max-w-2xl">
                            Learn about Protonixs AI chatbot development, custom RAG systems, and web development services in Lahore.
                        </p>
                    </div>
                )}
                <div className="max-w-3xl mx-auto flex flex-col gap-4">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={faq.question}
                            faq={faq}
                            index={index}
                            isOpen={openIndex === index}
                            onToggle={() => handleToggle(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
