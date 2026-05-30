"use client";

import { useState } from "react";
import type { Heading } from "@/lib/content";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Toc from "./Toc";
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
      <div className="flex-1">
        <div className="flex max-w-full items-start">
          <Sidebar open={open} onNavigate={() => setOpen(false)} />
          <main
            className="min-w-0 flex-1 px-5 py-7 pb-16 max-[996px]:px-5 max-[996px]:py-6 max-[996px]:pb-12 md:px-8"
            onClick={() => open && setOpen(false)}
          >
            <div className="mx-auto max-w-[820px]">{children}</div>
          </main>
          <Toc headings={toc} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
