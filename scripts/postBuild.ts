import { existsSync, copyFileSync } from "fs";
import { resolve } from "path";

const sourcePath = resolve(process.cwd(), "public/config.json");
const destPath = resolve(process.cwd(), "out/config.json");

if (existsSync(sourcePath)) {
    try {
        copyFileSync(sourcePath, destPath);
        console.log("超过复制 config.json 到 out 目录");
    } catch (error) {
        console.error("复制 config.json 失败:", error);
        process.exit(1);
    }
} else {
    console.error("public 目录下没有 config.json 文件");
    process.exit(1);
}
