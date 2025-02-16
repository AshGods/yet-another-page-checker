"use client";

import { motion } from "framer-motion";
import { fadeIn } from "../utils/animation";
import { Link } from "./Link";

interface TelegramLinkProps {
    link: string;
}

export function TelegramLink({ link }: TelegramLinkProps) {
    if (link === "#") return null;

    return (
        <motion.span
            className="inline-block text-sm text-white"
            {...fadeIn}
            transition={{ delay: 1.0, duration: 0.8 }}
        >
            Telegram 群组{" "}
            <Link href={link}>
                @{link.split("https://t.me/")[1]}
            </Link>
        </motion.span>
    );
} 