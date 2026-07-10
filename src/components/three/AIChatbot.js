"use client";

import React, { useRef } from "react";
import { theme, rgbaFromHex } from "@/lib/theme";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion } from "framer-motion";

const LOTTIE_SRC = "https://lottie.host/e57c550b-fe00-459d-a813-0656080774d3/8AEjBkgleY.lottie";

function LottieRobot({ className = "", size }) {
    return (
        <DotLottieReact
            src={LOTTIE_SRC}
            loop
            autoplay
            className={className}
            style={{
                ...(size ? { width: size, height: size } : {}),
                background: "transparent",
                border: "none",
                outline: "none",
                display: "block",
                filter: `drop-shadow(0 0 30px ${rgbaFromHex(theme.colors.accent, 0.5)}) drop-shadow(0 0 60px ${rgbaFromHex(theme.colors.foreground, 0.3)})`,
            }}
        />
    );
}

function RoboModel({ isAbsolute }) {
    const { viewport } = useThree();
    const isMobile = viewport.width < 6;
    const size = isAbsolute
        ? (isMobile ? 280 : 400)
        : (isMobile ? 320 : 480);

    return (
        <Html
            center
            transform
            distanceFactor={isMobile ? (isAbsolute ? 10 : 9) : (isAbsolute ? 6 : 5.2)}
            position={[0, 0, 0]}
            style={{
                width: `${size}px`,
                height: `${size}px`,
                pointerEvents: "none",
                userSelect: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "transparent",
                border: "none",
                outline: "none",
                overflow: "visible",
            }}
        >
            <LottieRobot size={size} />
        </Html>
    );
}

function ChatbotScene({ isAbsolute }) {
    const groupRef = useRef();
    const { viewport } = useThree();
    const isMobile = viewport.width < 6;

    const position = isAbsolute && !isMobile ? [2.8, 0, 0] : [0, 0.15, 0];
    const scale = isMobile
        ? (isAbsolute ? 0.5 : 0.58)
        : (isAbsolute ? 0.6 : 0.72);

    useFrame((state) => {
        if (!groupRef.current) return;
        const t = state.clock.getElapsedTime();
        groupRef.current.position.y = position[1] + Math.sin(t * 1.5) * 0.15;
        groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.05;
    });

    return (
        <group ref={groupRef} position={position} scale={scale}>
            <RoboModel isAbsolute={isAbsolute} />
        </group>
    );
}

function HeroLottieChatbot({ className = "" }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className={`relative flex justify-center items-start pointer-events-none bg-transparent border-0 outline-none mt-2 sm:mt-4 ${className}`}
        >
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="bg-transparent border-0 outline-none"
            >
                <LottieRobot className="w-[min(82vw,320px)] h-[min(82vw,320px)] sm:w-[min(70vw,480px)] sm:h-[min(70vw,480px)]" />
            </motion.div>
        </motion.div>
    );
}

export default function AIChatbot({ className = "", isAbsolute = true }) {
    const [ready, setReady] = React.useState(false);

    React.useEffect(() => {
        setReady(true);
    }, []);

    if (!isAbsolute) {
        return <HeroLottieChatbot className={className} />;
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 100, y: 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className={`absolute inset-0 w-full h-full z-[2] overflow-hidden pointer-events-none bg-transparent ${className}`}
            style={{
                WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 55%, black 35%, transparent 100%)",
                maskImage: "radial-gradient(ellipse 80% 60% at 50% 55%, black 35%, transparent 100%)",
            }}
        >
            <Canvas
                dpr={[1, 1.5]}
                gl={{ alpha: true, antialias: true, premultipliedAlpha: true }}
                onCreated={({ gl }) => {
                    gl.setClearColor(0x000000, 0);
                }}
                camera={{ position: [0, 0, 5], fov: 50 }}
                className="!bg-transparent pointer-events-auto border-0 outline-none"
                style={{ background: "transparent", border: "none", outline: "none", display: "block" }}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <ChatbotScene isAbsolute={isAbsolute} />
                {ready && (
                    <EffectComposer multisampling={0} disableNormalPass>
                        <Bloom
                            intensity={0.8}
                            luminanceThreshold={0.1}
                            luminanceSmoothing={0.9}
                            radius={0.8}
                            mipmapBlur
                        />
                    </EffectComposer>
                )}
            </Canvas>
        </motion.div>
    );
}
