"use client";

import { motion } from "framer-motion";
import { lazy, useMemo, use } from "react";
import { Toaster } from "sonner";
import { config, validateConfig } from "../utils/config";
import { fadeIn } from "../utils/animation";
import { useDomainCheck } from "../utils/domainCheck";
import { Title } from "./Title";
import { TelegramLink } from "./TelegramLink";
import Image from "next/image"; // 导入 next/image

export function PageContent() {
    const configuration = use(config);
    const configError = useMemo(() => validateConfig(configuration), [configuration]);
    
    useDomainCheck(
        configuration.domains, 
        configError.length > 0, 
        configuration.timeout!,
    );

    return (
        <>
            <Toaster 
                theme="dark" 
                position="top-center"
                closeButton
                richColors
                expand
                visibleToasts={4}
                toastOptions={{
                    style: {
                        fontSize: '1.25rem',
                    },
                }}
            />
            <div className="flex flex-col-reverse w-full lg:grid lg:grid-cols-2 p-6 lg:p-12 overflow-hidden">
                <div className="flex h-full w-full max-w-3xl flex-col overflow-hidden pt-8 justify-center items-center gap-4">
                    <Title siteName={configuration.siteName} />
                    <TelegramLink link={configuration.telegramLink} />
                </div>
                <motion.div
                    {...fadeIn}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="relative h-96"
                >
                    <Image
                        src="https://cdn-fusion.imgcdn.store/i/2025/bd3IOsOsbxNeOFF1.png"
                        alt="Replacement image"
                        fill // 替代 layout="fill"（Next.js 13+ 推荐用法）
                        className="object-cover" // 替换 w-full h-full flex items-center justify-center
                        priority // 可选：如果这是主要内容图片，加速加载
                    />
                </motion.div>
            </div>
        </>
    );
}
