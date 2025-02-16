"use client";

export interface Host {
    api: string;
    site: string;
}

export interface Config {
    siteName: string;
    telegramLink: string;
    domains: Host[];
    timeout?: number; // 总检测超时时间（毫秒）
}

const configPromise = fetch("/config.json")
    .then((res) => res.json())
    .then((data) => ({
        ...data,
        timeout: data.timeout || 15000, // 默认 15 秒
    } as Config))
    .catch((err) => {
        console.error("获取配置失败:", err);
        return {
            siteName: "加载中...",
            telegramLink: "#",
            domains: [],
            timeout: 15000,
        } as Config;
    });

export const config = configPromise;

export function validateConfig(config: Config): string[] {
    const errors: string[] = [];
    if (!config.siteName || config.siteName === "加载中...") {
        errors.push('站点名称未配置');
    }
    if (!config.telegramLink || config.telegramLink === "#") {
        errors.push('Telegram 群组链接未配置');
    }
    if (config.domains.length === 0) {
        errors.push('未配置任何域名');
    }
    return errors;
}

export function checkDomains(domains: Host[]): void {
    domains.forEach(({ api, site }) => {
        fetch(api).then((res) => {
            if (res.ok && res.status === 200) {
                if (window.location.hostname === "localhost") { // Dev
                    console.log(`api: ${api} site: ${site}, OK`);
                } else {
                    window.location.href = site + window.location.search;
                }
            }
        });
    });
} 