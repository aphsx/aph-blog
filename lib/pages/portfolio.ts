import type { Page } from "../types";

export const portfolioPages: Record<string, Page> = {
  portfolio: {
    slug: "portfolio",
    title: "สร้าง Portfolio & Projects",
    lead: "ในปี 2026 portfolio คือหลักฐานที่พิสูจน์ความสามารถได้โดยตรง — สำคัญมากสำหรับ junior",
    group: "Portfolio & Projects",
    blocks: [
      { t: "p", c: "บริษัทให้ความสำคัญกับโปรเจกต์จริงมากขึ้น โดยเฉพาะสำหรับ junior และ new grad ที่ยังมีประสบการณ์ทำงานน้อย โปรเจกต์ที่ดีพร้อม demo ทดแทนประสบการณ์งานได้มาก และเป็นวัตถุดิบชั้นดีสำหรับตอบ behavioral" },
      { t: "h2", c: "เลือกโปรเจกต์ให้เหมาะกับระดับ" },
      { t: "h3", c: "ระดับเริ่มต้น" },
      { t: "ul", c: ["Todo App (CRUD + database)", "Weather App (เรียก public API)", "Calculator"] },
      { t: "h3", c: "ระดับกลาง (แนะนำสำหรับสมัครงาน)" },
      {
        t: "ul",
        c: [
          "Full-stack Blog / CMS — React/Next.js + Node/FastAPI + PostgreSQL พร้อม auth",
          "Real-time Chat — WebSocket",
          "E-commerce ขนาดเล็ก — cart, checkout, JWT auth",
          "REST API พร้อม documentation และ test ครบ",
        ],
      },
      { t: "h3", c: "ระดับสูง + เทรนด์ 2026" },
      {
        t: "ul",
        c: [
          "AI-powered app — RAG chatbot / document Q&A ด้วย LLM + vector database",
          "Clone แอปจริง — Notion clone, GitHub clone",
          "Open Source contribution ที่ merge แล้ว",
        ],
      },
      { t: "callout", title: "คุณภาพสำคัญกว่าปริมาณ", c: "2-3 โปรเจกต์ที่มี live demo, README ดี และโค้ดสะอาด ดีกว่า 10 โปรเจกต์ที่ทำค้างไว้ ทุกโปรเจกต์ต้อง deploy จริงให้กดดูได้" },
      { t: "h2", c: "Tech stack แนะนำปี 2026" },
      {
        t: "table",
        head: ["ชั้น", "เทคโนโลยี", "เหตุผล"],
        rows: [
          ["Frontend", "React / Next.js + TypeScript", "ตลาดงานใหญ่สุด ecosystem สมบูรณ์"],
          ["Backend", "Node.js (Fastify) หรือ Python (FastAPI)", "เขียนเร็ว นิยมใน startup"],
          ["Database", "PostgreSQL + Redis", "SQL หลัก + cache/session"],
          ["DevOps", "Docker + GitHub Actions", "CI/CD พื้นฐานที่ทุกที่คาดหวัง"],
          ["Deploy", "Vercel, Railway, Render", "ฟรี/ถูก deploy ได้เร็ว"],
        ],
      },
      { t: "h2", c: "GitHub profile ที่ดี" },
      {
        t: "ul",
        c: [
          "Pin 6 repo ที่ดีที่สุด ใส่ description + topic tags",
          "ทุก repo มี README — tech stack, วิธีรัน, screenshot/demo link",
          "commit สม่ำเสมอ (ไม่ต้องเยอะ แต่ให้ต่อเนื่อง)",
          "มี Profile README แนะนำตัวสั้น ๆ",
        ],
      },
      { t: "callout", title: "Deploy ก่อนส่ง resume", warn: true, c: "link ที่ตายหรือแอปที่โหลดไม่ขึ้นตอนผู้สัมภาษณ์เปิดดู แย่กว่าไม่มีโปรเจกต์ ตรวจให้แน่ใจว่าทุก demo ใช้งานได้จริงก่อนยื่นสมัคร" },
    ],
  },

  "ai-tools-2026": {
    slug: "ai-tools-2026",
    title: "AI Tools สำหรับนักพัฒนา 2026",
    lead: "การใช้ AI เสริมการทำงานและการเรียนรู้เป็นทักษะที่สร้างความได้เปรียบในปี 2026",
    group: "Portfolio & Projects",
    blocks: [
      { t: "p", c: "ในปี 2026 นักพัฒนาที่ใช้ AI เป็นทำงานได้เร็วขึ้นชัดเจน บริษัทจำนวนมากคาดหวังว่าผู้สมัครใช้เครื่องมือเหล่านี้เป็น และบางตำแหน่งเริ่มถามทักษะด้าน AI/LLM ในรอบเทคนิคด้วย" },
      { t: "h2", c: "เครื่องมือที่ควรรู้จัก" },
      {
        t: "table",
        head: ["เครื่องมือ", "ใช้สำหรับ"],
        rows: [
          ["GitHub Copilot / Cursor", "เขียนโค้ดเร็วขึ้น, autocomplete ขั้นสูง, agentic coding"],
          ["Claude / ChatGPT", "อธิบาย concept, review code, debug, mock interview"],
          ["v0 / Bolt", "prototype frontend เร็วด้วย prompt"],
          ["Perplexity", "research บริษัทและข้อมูลก่อนสัมภาษณ์"],
        ],
      },
      { t: "h2", c: "ใช้ AI ช่วยเรียนรู้และเตรียมตัว" },
      {
        t: "ol",
        c: [
          "ให้อธิบาย concept ที่ไม่เข้าใจด้วยตัวอย่าง — เร็วกว่าอ่าน doc ยาว ๆ",
          "ให้ review โค้ดที่เขียนเอง ขอ feedback เรื่อง readability และ edge case",
          "ฝึก mock behavioral — ให้ AI ถามแล้วฝึกตอบแบบ STAR",
          "ให้อธิบาย solution ที่ไม่เข้าใจ เจาะ \"ทำไม\" ไม่ใช่แค่ \"อะไร\"",
        ],
      },
      { t: "callout", title: "ระวังตอนสัมภาษณ์จริง", warn: true, c: "การสัมภาษณ์ coding ส่วนใหญ่ยังไม่อนุญาตให้ใช้ AI ต้องเขียนได้เองจริง ใช้ AI เพื่อเรียนรู้และฝึกซ้อม ไม่ใช่ลัดขั้นตอนการคิด" },
      { t: "h2", c: "ทักษะ AI/LLM ที่ถูกถามเพิ่มในปี 2026" },
      {
        t: "ul",
        c: [
          "Prompt engineering พื้นฐาน — เขียน prompt ให้ได้ผลลัพธ์ที่ต้องการ",
          "RAG — แนวคิดต่อ LLM เข้ากับฐานความรู้",
          "Vector database — Pinecone, Weaviate, pgvector สำหรับ semantic search",
          "เรียก LLM API (OpenAI/Anthropic) มาใช้ในแอปจริง",
        ],
      },
    ],
  },
};
