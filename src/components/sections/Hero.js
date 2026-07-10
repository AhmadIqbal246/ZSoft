"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { theme } from "@/lib/theme";

import AIChatbot from "@/components/three/AIChatbot";

const DynamicChatbot = dynamic(() => Promise.resolve(AIChatbot), { ssr: false });
const DynamicLightPillar = dynamic(() => import("@/components/three/LightPillar"), { ssr: false });

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
        <section className="relative min-h-screen flex flex-col items-center overflow-hidden bg-transparent pt-20 pb-4 lg:pb-8">

            {mounted && (
                <div className="absolute inset-0 z-[1] pointer-events-none">
                    <DynamicLightPillar
                        topColor={theme.colors.foreground}
                        bottomColor={theme.colors.foreground}
                        intensity={0.35}
                        rotationSpeed={1}
                        pillarRotation={35}
                        glowAmount={0.003}
                        pillarWidth={2.8}
                        pillarHeight={0.45}
                        noiseIntensity={0.25}
                        mixBlendMode="screen"
                        quality="medium"
                    />
                </div>
            )}

            <div className="crt-overlay" />

            <motion.div
                className="container mx-auto px-6 lg:px-12 flex flex-col items-center relative z-10 pt-8 lg:pt-16 w-full"
            >
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                    className="flex flex-col gap-4 items-center text-center w-full"
                >
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-[1.1] mb-2 tracking-tight">
                        <span className="block">
                            <span className="text-accent">Transform Your</span>{" "}
                            <span className="text-foreground">Business with AI</span>
                        </span>
                        <span className="gradient-text-animated block">&amp; Web Solutions.</span>
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
                </motion.div>

                <div className="w-full max-w-3xl flex justify-center">
                    {mounted && <DynamicChatbot isAbsolute={false} />}
                </div>
            </motion.div>

        </section>
    );
}
