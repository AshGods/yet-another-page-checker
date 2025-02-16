"use client";

import { Link } from "@heroui/react";
import { motion } from "framer-motion";
import { lazy, useEffect, useState } from "react";

const ease = [0.16, 1, 0.3, 1];
const LazySpline = lazy(() => import("@splinetool/react-spline"));

interface Host {
  api: string;
  site: string;
}

export default function Home() {
  const [config, setConfig] = useState({
    siteName: "",
    telegramGroup: "",
    telegramContact: "",
    domains: [],
  });

  const checkDomain = (domains: Array<Host | string>) => {
    for (let i = 0; i < domains.length; i++) {
      let api: string;
      let site: string;

      const host = domains[i];
      if (typeof host === "string") {
        api = host;
        site = host;
      } else {
        api = host.api;
        site = host.site;
      }
      fetch(api).then((res) => {
        if (res.ok && res.status === 200) {
          window.location.href = site + location.search;
        }
      });
    }
  };

  useEffect(() => {
    fetch("/config.json").then(async (res) => {
      const data = await res.json();
      setConfig(data);
    });
  }, []);

  useEffect(() => {
    if (config.domains.length === 0) return;

    const timeOut = setTimeout(() => {
      checkDomain(config.domains);
      const timer = setInterval(() => {
        checkDomain(config.domains);
      }, 3000);
      setTimeout(() => {
        clearInterval(timer);
        const text = "若卡在此页面无法跳转可用站点，请联系客服";
        alert(text);
        document.getElementById("info")!.innerText = text;
      }, 60000);
    }, 3000);

    return () => {
      clearTimeout(timeOut);
    };
  }, [config]);

  return (
    <main className="bg-[#2b2b2b] h-screen w-full flex flex-row justify-center items-center">
      <div className="flex flex-col-reverse w-full lg:grid lg:grid-cols-2 p-6 lg:p-12 overflow-hidden">
        <div className="flex h-full w-full max-w-3xl flex-col overflow-hidden pt-8 justify-center items-center gap-4">
          <motion.h1
            className="text-left text-4xl text-center font-semibold leading-tighter text-foreground sm:text-5xl md:text-6xl"
            initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
            animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease,
              staggerChildren: 0.2,
            }}
          >
            <motion.span
              className="text-balance text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease,
              }}
            >
              {config.siteName} <br />
              线路检测页
            </motion.span>
          </motion.h1>
          <motion.p
            className="text-center text-lg text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.6,
              duration: 0.8,
              ease,
            }}
            id="info"
          >
            线路测试中
            <br />
            将自动跳转最快域名
            <br />
            请耐心等候
          </motion.p>
          <motion.span
            className="inline-block text-sm text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.8 }}
          >
            Telegram 群组{" "}
            <Link href={config.telegramGroup}>
              @{config.telegramGroup.split("https://t.me/")[1]}
            </Link>
          </motion.span>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="relative h-96"
        >
          <LazySpline
            scene="/scene.splinecode"
            className="absolute w-full h-full flex items-center justify-center"
          />
        </motion.div>
      </div>
    </main>
  );
}
