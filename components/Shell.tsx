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
  const hasToc = toc.length > 0;

  return (
    <div className="flex min-h-screen flex-col">
      <Header onMenu={() => setOpen((o) => !o)} />
      <div className="flex min-w-0 flex-1">
        <Sidebar open={open} onNavigate={() => setOpen(false)} />
        {/* docMainContainer — เต็มความกว้างที่เหลือ ชิด sidebar */}
        <div className="doc-main flex min-w-0 flex-1 flex-col">
          {/* container — centered with max-width, มีขอบว่างห่างจาก sidebar */}
          <div className="w-full max-w-6xl mx-auto px-8 pt-6 pb-16 md:pt-8">
            {/* row — flex แทน grid */}
            <div
              className={`flex w-full min-w-0 ${hasToc ? "min-[997px]:flex-row" : ""}`}
            >
              {/* col docItemCol — 75% เมื่อมี TOC, เต็มความกว้างเมื่อไม่มี */}
              <main
                className={`min-w-0 ${
                  hasToc
                    ? "w-full min-[997px]:w-[75%] min-[997px]:max-w-[75%] min-[997px]:shrink-0"
                    : "w-full flex-1"
                }`}
                onClick={() => open && setOpen(false)}
              >
                {children}
              </main>
              {hasToc && <TocDesktop headings={toc} />}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
