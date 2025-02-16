"use client";

import { useEffect, useCallback } from "react";
import { toast } from "sonner";
import type { Host } from "./config";

const DEFAULT_REDIRECT_COUNTDOWN = 6; // 默认重定向倒计时（秒）

async function fetchWithTimeout(api: string, timeout: number) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(api, { signal: controller.signal });
        clearTimeout(timeoutId);
        return response;
    } catch (error: unknown) {
        clearTimeout(timeoutId);
        if (error instanceof Error && error.name === "AbortError") {
            console.log(`检测超时: ${api}`);
        }
        throw error;
    }
}

export function useDomainCheck(domains: Host[], hasError: boolean, timeout: number) {
    const handleDomainCheck = useCallback(async () => {
        if (hasError) {
            toast.error("配置错误", {
                description: "请检查配置文件",
                duration: 5000,
            });
            return;
        }

        const checkingToast = toast.loading("正在检测最佳线路...", {
            id: "checking",
            duration: Infinity,
        });

        const results = await Promise.all(
            domains.map(({ api, site }, index) =>
                fetchWithTimeout(api, timeout)
                    .then((res) => ({ ok: res.ok && res.status === 200, index, site }))
                    .catch(() => ({ ok: false, index, site }))
            )
        );

        const availableRoute = results.find((result) => result.ok);
        if (availableRoute) {
            toast.dismiss(checkingToast);
            
            let countdown = DEFAULT_REDIRECT_COUNTDOWN;
            const countdownInterval = setInterval(() => {
                countdown--;
                if (countdown <= 0) {
                    clearInterval(countdownInterval);
                    toast.success("请稍等，正在重定向中...", {
                        id: "redirecting",
                        duration: Infinity,
                    });
                    
                    if (window.location.hostname === "localhost") {
                        console.log(`重定向到线路 ${availableRoute.index + 1}: ${availableRoute.site}`);
                        toast.success(`开发环境：模拟重定向到线路 ${availableRoute.index + 1}`, {
                            duration: 5000,
                            id: "checked_success",
                        });
                    } else {
                        window.location.href = availableRoute.site + window.location.search;
                    }
                } else {
                    toast.success(`检测完毕，将在 ${countdown} 秒后自动重定向到线路 ${availableRoute.index + 1}...`, {
                        id: "redirecting",
                        duration: Infinity,
                        style: { backgroundColor: "#0B1F17" },
                    });
                }
            }, 1000);
        } else {
            toast.dismiss(checkingToast);
            toast.error("未找到可用线路", {
                id: "checked_error",
                duration: 5000,
            });
        }
    }, [hasError, domains, timeout]);

    useEffect(() => {
        if (hasError) return;
        if (domains.length === 0) {
            toast.error("未配置任何域名", {
                duration: 5000,
                id: "checked_error",
            });
            return;
        }

        const timeOut = setTimeout(() => {
            handleDomainCheck();
            const timer = setInterval(handleDomainCheck, timeout * 2);
            const timeoutTimer = setTimeout(() => {
                clearInterval(timer);
                toast.error("检测超时", {
                    description: "若无法访问，请联系客服",
                    duration: 5000,
                    id: "checked_error_total_timeout",
                });
            }, timeout * 5);

            return () => {
                clearInterval(timer);
                clearTimeout(timeoutTimer);
            };
        }, 1000);

        return () => {
            clearTimeout(timeOut);
        };
    }, [handleDomainCheck, hasError, domains, timeout]);
}
