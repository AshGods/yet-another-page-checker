"use client";

import { motion } from "framer-motion";
import { ease, blurInFromBottom, fadeInFromBottom } from "../utils/animation";

interface TitleProps {
    siteName: string;
}

export function Title({ siteName }: TitleProps) {
    return (
        <motion.h1
            className="lg:text-left text-4xl text-center font-semibold leading-tighter text-foreground sm:text-5xl md:text-6xl"
            {...blurInFromBottom}
            transition={{
                duration: 1,
                ease,
                staggerChildren: 0.2,
            }}
        >
            <motion.span
                className="text-balance text-white"
                {...fadeInFromBottom}
                transition={{
                    duration: 0.8,
                    delay: 0.5,
                    ease,
                }}
            >
                {siteName} <br />
                线路检测页
            </motion.span>
        </motion.h1>
    );
} 