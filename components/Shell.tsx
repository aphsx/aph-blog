"use client";

import { useState } from "react";
import type { Heading } from "@/lib/content";
import Header from "./Header";
import Sidebar from "./Sidebar";
import TocDesktop from "./Toc";
import Footer from "./Footer";

export default function Shell({
  children,
  toc = [],
}: {
  children: React.ReactNode;
  toc?: Heading[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-screen flex-col">
      <Header onMenu={() => setOpen((o) => !o)} />
      <div className="flex flex-1">
        <Sidebar open={open} onNavigate={() => setOpen(false)} />
        <div className="flex min-w-0 flex-1 justify-center">
          <main
            className="min-w-0 flex-1 px-4 py-6 pb-16 md:px-8 md:py-8 lg:max-w-[860px] lg:px-10"
            onClick={() => open && setOpen(false)}
          >
            {children}
          </main>
          <TocDesktop headings={toc} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
