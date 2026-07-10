"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ScrollProgressBar from "@/components/common/ScrollProgressBar";
import NoiseOverlay from "@/components/common/NoiseOverlay";
import AIAssistantBot from "@/components/chat/AIAssistantBot";
import { theme } from "@/lib/theme";

import Particles from "@/components/three/Particles";
const DynamicParticles = dynamic(() => Promise.resolve(Particles), { ssr: false });
const DynamicLightPillar = dynamic(() => import("@/components/three/LightPillar"), { ssr: false });

export default function ClientLayout({ children }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    return (
        <>
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-canvas">
                <div className="absolute inset-0">
                    <div className="gradient-mesh-blob gradient-mesh-blob--foreground opacity-20" />
                    <div className="gradient-mesh-blob gradient-mesh-blob--accent opacity-20" />
                    <div className="gradient-mesh-blob gradient-mesh-blob--deep" />
                </div>
                {mounted && (
                    <div className="absolute inset-0 w-full h-full">
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
                {mounted && (
                    <div className="absolute inset-0 w-full h-full opacity-60">
                        <DynamicParticles
                            particleColors={theme.particles.colors}
                            particleCount={500}
                            particleSpread={10}
                            speed={0.1}
                            particleBaseSize={100}
                            moveParticlesOnHover
                            alphaParticles={false}
                            disableRotation={false}
                            pixelRatio={2}
                        />
                    </div>
                )}
            </div>

            <div className="relative z-10 overflow-x-hidden w-full">
                <ScrollProgressBar visible={true} />
                <NoiseOverlay />
                <div style={{ visibility: mounted ? "visible" : "hidden" }}>
                    {children}
                </div>
                {mounted && <AIAssistantBot />}
            </div>
        </>
    );
}
