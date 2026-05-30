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
    <div className="docs-wrapper">
      <Header onMenu={() => setOpen((o) => !o)} />
      <div className="main-wrapper">
        <div className="shell">
          <Sidebar open={open} onNavigate={() => setOpen(false)} />
          <main
            className="content"
            onClick={() => open && setOpen(false)}
          >
            <div className="doc-item-container">{children}</div>
          </main>
          <Toc headings={toc} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
