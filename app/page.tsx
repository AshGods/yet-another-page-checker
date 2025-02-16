"use client";

import { type ReactElement, Suspense } from "react";
import { PageContent } from "./components/PageContent";

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