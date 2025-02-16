import { writeFileSync, existsSync } from "fs";
import { resolve } from "path";
import { config } from "dotenv";

config({ path: ".env.local" });

interface Host {
    api: string;
    site: string;
}

interface Config {
    siteName: string;
    telegramLink: string;
    domains: Host[];
}

const buildConfig = (): Config => {
    const domains: Host[] = [];
    let index = 1;

    while (true) {
        const api = process.env[`NEXT_PUBLIC_DOMAIN_${index}_API`];
        if (!api) break;

        domains.push({
            api: api.trim(),
            site: (process.env[`NEXT_PUBLIC_DOMAIN_${index}_SITE`] || api).trim(),
        });

        index++;
    }

    const config: Config = {
        siteName: process.env.NEXT_PUBLIC_SITE_NAME || "站点名称未配置",
        telegramLink: process.env.NEXT_PUBLIC_TELEGRAM_LINK || "https://t.me/undefined",
        domains,
    };

    const missingVars = [];
    if (!config.siteName || config.siteName === "站点名称未配置") {
        missingVars.push("NEXT_PUBLIC_SITE_NAME");
    }
    if (!config.telegramLink || config.telegramLink === "https://t.me/undefined") {
        missingVars.push("NEXT_PUBLIC_TELEGRAM_LINK");
    }
    if (config.domains.length === 0) {
        missingVars.push("NEXT_PUBLIC_DOMAIN_*_API");
    }

    if (missingVars.length > 0) {
        throw new Error(`缺少必需的环境变量配置: ${missingVars.join(", ")}，请参考 README.md 配置`);
    }

    return config;
};

try {
    const lockFilePath = resolve(process.cwd(), "checker.lock");
    if (existsSync(lockFilePath)) {
        console.log("检测到 checker.lock 文件，跳过自动生成 config.json");
        process.exit(0);
    }

    const config = buildConfig();
    const configPath = resolve(process.cwd(), "public/config.json");
    writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log("配置文件已生成:", configPath);
    console.log("配置内容:", config);
} catch (error) {
    console.error("生成配置文件失败:", error);
    process.exit(1);
}
