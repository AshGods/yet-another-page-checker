"use client";

export interface Host {
    api: string;
    site: string;
}

export interface Config {
    siteName: string;
    telegramLink: string;
    domains: Host[];
}

const configPromise = fetch("/config.json")
    .then((res) => res.json())
    .then((data) => data as Config)
    .catch((err) => {
        console.error("获取配置失败:", err);
        return {
            siteName: "加载中...",
            telegramLink: "#",
            domains: [],
        } as Config;
    });

export const config = configPromise;
