"use client";

import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Shell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Header onMenu={() => setOpen((o) => !o)} />
      <div className="shell">
        <Sidebar open={open} />
        <main className="content" onClick={() => open && setOpen(false)}>
          {children}
        </main>
      </div>
    </>
  );
}
