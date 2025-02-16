"use client";

import { type ReactElement } from "react";
import { motion } from "framer-motion";
import { lazy, useEffect, useCallback, useMemo, use, Suspense } from "react";
import type { Host } from "./config";
import { config } from "./config";

interface Link {
  href: string;
  children: React.ReactNode;
}

const ease = [0.16, 1, 0.3, 1];
const LazySpline = lazy(() => import("@splinetool/react-spline"));

function Link({ href, children }: Link) {
  return (
    <a href={href} className="text-blue-400 hover:text-blue-300">
      {children}
    </a>
  );
}

function PageContent() {
  // 使用 use hook 来处理 Promise
  const configuration = use(config);

  const configError = useMemo(() => {
    const errors: string[] = [];
    if (!configuration.siteName || configuration.siteName === "加载中...") {
      errors.push('站点名称未配置');
    }
    if (!configuration.telegramLink || configuration.telegramLink === "#") {
      errors.push('Telegram 群组链接未配置');
    }
    if (configuration.domains.length === 0) {
      errors.push('未配置任何域名');
    }
    return errors;
  }, [configuration]);

  const checkDomain = useCallback((domains: Array<Host>) => {
    if (configError.length > 0) return;

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
  }, [configError]);

  useEffect(() => {
    if (configError.length > 0) return;
    if (configuration.domains.length === 0) return;

    const timeOut = setTimeout(() => {
      checkDomain(configuration.domains);
      const timer = setInterval(() => {
        checkDomain(configuration.domains);
      }, 3000);
      setTimeout(() => {
        clearInterval(timer);
        const text = "若卡在此页面无法跳转可用站点，请联系客服";
        alert(text);
        const infoElement = document.getElementById("info");
        if (infoElement) {
          infoElement.innerText = text;
        }
      }, 60000);
    }, 3000);

    return () => {
      clearTimeout(timeOut);
    };
  }, [checkDomain, configError, configuration.domains]);

  return (
    <div className="flex flex-col-reverse w-full lg:grid lg:grid-cols-2 p-6 lg:p-12 overflow-hidden">
      <div className="flex h-full w-full max-w-3xl flex-col overflow-hidden pt-8 justify-center items-center gap-4">
        <motion.h1
          className="lg:text-left text-4xl text-center font-semibold leading-tighter text-foreground sm:text-5xl md:text-6xl"
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
            {configuration.siteName} <br />
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
          {configError.length > 0 ? (
            <>
              配置错误：
              <br />
              {configError.map((error, index) => (
                <span key={index} className="text-red-500">
                  {error}
                  <br />
                </span>
              ))}
              请参考 README.md 进行配置
            </>
          ) : (
            <>
              线路测试中
              <br />
              将自动跳转最快域名
              <br />
              请耐心等候
            </>
          )}
        </motion.p>
        {configuration.telegramLink !== "#" && (
          <motion.span
            className="inline-block text-sm text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.8 }}
          >
            Telegram 群组{" "}
            <Link href={configuration.telegramLink}>
              {configuration.telegramLink.split("https://t.me/")[1]}
            </Link>
          </motion.span>
        )}
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
  );
}

export default function Home(): ReactElement {
  return (
    <main className="bg-[#2b2b2b] h-screen w-full flex flex-row justify-center items-center">
      <Suspense fallback={
        <div className="text-white text-2xl">
          加载中...
        </div>
      }>
        <PageContent />
      </Suspense>
    </main>
  );
}