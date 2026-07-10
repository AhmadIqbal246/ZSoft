"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

import AIChatbot from "@/components/three/AIChatbot";
import BlurText from "@/components/animations/BlurText";
import Navbar from "@/components/layout/Navbar";

const headlineClass =
    "text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-[1.1] tracking-tight justify-center";

const DynamicChatbot = dynamic(() => Promise.resolve(AIChatbot), { ssr: false });

export default function Hero() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    const [role, setRole] = useState("Web Development");
    const roles = ["Web Development", "AI Solutions", "Custom Software", "Digital Transformation"];
    const roleIndex = useRef(0);

    useEffect(() => {
        const interval = setInterval(() => {
            roleIndex.current = (roleIndex.current + 1) % roles.length;
            setRole(roles[roleIndex.current]);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-screen flex flex-col overflow-hidden bg-transparent pb-4 lg:pb-8">
            <Navbar />
            <div className="crt-overlay" />
            <motion.div
                className="container mx-auto px-6 lg:px-12 flex flex-col flex-1 items-center justify-center relative z-10 w-full"
            >
                <div className="flex flex-col gap-4 items-center text-center w-full">
                    <h1 className="w-full mb-2">
                        <div className={`flex flex-wrap justify-center items-baseline gap-x-2 ${headlineClass}`}>
                            <BlurText
                                text="Transform Your"
                                className={`text-accent ${headlineClass}`}
                                delay={120}
                                direction="top"
                                threshold={0}
                            />
                            <BlurText
                                text="Business with AI"
                                className={`text-foreground ${headlineClass}`}
                                delay={120}
                                direction="top"
                                threshold={0}
                            />
                        </div>
                        <BlurText
                            text="& Web Solutions."
                            className={`text-foreground ${headlineClass}`}
                            delay={120}
                            direction="top"
                            threshold={0}
                        />
                    </h1>
                    <div className="h-10 md:h-12 overflow-hidden mt-2">
                        <motion.p
                            key={role}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            style={{ fontFamily: "var(--font-space)" }}
                            className="text-xl md:text-3xl text-accent font-bold tracking-wide"
                        >
                            {role}
                        </motion.p>
                    </div>
                </div>

                <div className="w-full max-w-3xl flex justify-center">
                    {mounted && <DynamicChatbot isAbsolute={false} />}
                </div>
            </motion.div>

        </section>
    );
}
