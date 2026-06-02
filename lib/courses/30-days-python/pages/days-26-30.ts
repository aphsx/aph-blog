import type { Page } from "@/lib/types";

export const days2630Pages: Record<string, Page> = {
  // ─── วันที่ 26: Python Web ────────────────────────────────────────
  "py30-day26": {
    slug: "py30-day26",
    title: "วันที่ 26 — เว็บด้วย Python (Python Web)",
    lead: "สร้างเว็บแอปพลิเคชันด้วย Flask — จาก Hello World ไปจนถึง dynamic web page",
    group: "สัปดาห์ที่ 6: เว็บ & API",
    blocks: [
      {
        t: "callout",
        title: "กำลังแปล",
        c: "เนื้อหาของบทนี้อยู่ระหว่างการแปลจากภาษาอังกฤษ กลับมาดูใหม่เร็ว ๆ นี้ — ต้นฉบับ: github.com/Asabeneh/30-Days-Of-Python/blob/master/26_Day_Python_web/26_python_web.md",
      },
      { t: "h2", c: "Python สำหรับงานเว็บ" },
      { t: "h2", c: "Flask" },
      { t: "h2", c: "สร้าง Flask App" },
      { t: "h3", c: "โฟลเดอร์โปรเจกต์" },
      { t: "h3", c: "สร้าง Route" },
      { t: "h2", c: "Templates" },
      { t: "h2", c: "Static Files" },
      { t: "h2", c: "แบบฝึกหัด — วันที่ 26" },
    ],
  },

  // ─── วันที่ 27: Python with MongoDB ──────────────────────────────
  "py30-day27": {
    slug: "py30-day27",
    title: "วันที่ 27 — Python กับ MongoDB",
    lead: "เชื่อมต่อและจัดการฐานข้อมูล NoSQL ยอดนิยมด้วย pymongo",
    group: "สัปดาห์ที่ 6: เว็บ & API",
    blocks: [
      {
        t: "callout",
        title: "กำลังแปล",
        c: "เนื้อหาของบทนี้อยู่ระหว่างการแปลจากภาษาอังกฤษ กลับมาดูใหม่เร็ว ๆ นี้ — ต้นฉบับ: github.com/Asabeneh/30-Days-Of-Python/blob/master/27_Day_Python_with_mongodb/27_python_with_mongodb.md",
      },
      { t: "h2", c: "MongoDB" },
      { t: "h2", c: "SQL กับ NoSQL" },
      { t: "h2", c: "Getting Connection String (MongoDB URI)" },
      { t: "h2", c: "เชื่อมต่อ Flask กับ MongoDB" },
      { t: "h2", c: "สร้าง Database และ Collection" },
      { t: "h2", c: "แทรกข้อมูลลงไปใน Collection" },
      { t: "h2", c: "Find" },
      { t: "h2", c: "Find with Query" },
      { t: "h2", c: "Find with Modifier" },
      { t: "h2", c: "Count" },
      { t: "h2", c: "Limit" },
      { t: "h2", c: "Find with Sort" },
      { t: "h2", c: "Update กับ Query" },
      { t: "h2", c: "Delete Document" },
      { t: "h2", c: "Drop a Collection" },
      { t: "h2", c: "แบบฝึกหัด — วันที่ 27" },
    ],
  },

  // ─── วันที่ 28: API ───────────────────────────────────────────────
  "py30-day28": {
    slug: "py30-day28",
    title: "วันที่ 28 — API",
    lead: "เรียกใช้ API จากภายนอกด้วย requests — ดึงข้อมูลจาก REST API จริง ๆ",
    group: "สัปดาห์ที่ 6: เว็บ & API",
    blocks: [
      {
        t: "callout",
        title: "กำลังแปล",
        c: "เนื้อหาของบทนี้อยู่ระหว่างการแปลจากภาษาอังกฤษ กลับมาดูใหม่เร็ว ๆ นี้ — ต้นฉบับ: github.com/Asabeneh/30-Days-Of-Python/blob/master/28_Day_API/28_API.md",
      },
      { t: "h2", c: "API คืออะไร" },
      { t: "h2", c: "API vs Web URL" },
      { t: "h2", c: "การสร้าง API" },
      { t: "h2", c: "HTTP" },
      { t: "h2", c: "Building APIs using Flask" },
      { t: "h3", c: "Route กับ Methods" },
      { t: "h3", c: "Logger" },
      { t: "h3", c: "Serve Static File" },
      { t: "h2", c: "แบบฝึกหัด — วันที่ 28" },
    ],
  },

  // ─── วันที่ 29: Building API ──────────────────────────────────────
  "py30-day29": {
    slug: "py30-day29",
    title: "วันที่ 29 — สร้าง API (Building API)",
    lead: "สร้าง RESTful API ที่ใช้งานได้จริงด้วย Flask — GET, POST, PUT, DELETE ครบ",
    group: "สัปดาห์ที่ 6: เว็บ & API",
    blocks: [
      {
        t: "callout",
        title: "กำลังแปล",
        c: "เนื้อหาของบทนี้อยู่ระหว่างการแปลจากภาษาอังกฤษ กลับมาดูใหม่เร็ว ๆ นี้ — ต้นฉบับ: github.com/Asabeneh/30-Days-Of-Python/blob/master/29_Day_Building_API/29_building_API.md",
      },
      { t: "h2", c: "Building APIs" },
      { t: "h2", c: "ขั้นตอนสร้าง API" },
      { t: "h3", c: "GET" },
      { t: "h3", c: "สร้าง Data ด้วย POST" },
      { t: "h3", c: "GET Single Item" },
      { t: "h3", c: "PUT" },
      { t: "h3", c: "DELETE" },
      { t: "h2", c: "แบบฝึกหัด — วันที่ 29" },
    ],
  },

  // ─── วันที่ 30: บทสรุป ────────────────────────────────────────────
  "py30-day30": {
    slug: "py30-day30",
    title: "วันที่ 30 — บทสรุปและก้าวต่อไป (Conclusions)",
    lead: "สรุปสิ่งที่เรียนมาทั้ง 30 วัน และเส้นทางต่อจากนี้ที่จะพาคุณไปสู่นักพัฒนา Python มืออาชีพ",
    group: "สัปดาห์ที่ 6: เว็บ & API",
    blocks: [
      {
        t: "callout",
        title: "กำลังแปล",
        c: "เนื้อหาของบทนี้อยู่ระหว่างการแปลจากภาษาอังกฤษ กลับมาดูใหม่เร็ว ๆ นี้ — ต้นฉบับ: github.com/Asabeneh/30-Days-Of-Python/blob/master/30_Day_Conclusions/30_conclusions.md",
      },
      { t: "h2", c: "บทสรุป" },
      { t: "h2", c: "สิ่งที่คุณเรียนมาตลอด 30 วัน" },
      { t: "h2", c: "ก้าวต่อไปหลังจาก 30 วัน" },
      { t: "h3", c: "Data Science & Machine Learning" },
      { t: "h3", c: "Web Development" },
      { t: "h3", c: "Automation & Scripting" },
      { t: "h3", c: "Backend Development" },
      { t: "h2", c: "แหล่งเรียนรู้เพิ่มเติม" },
    ],
  },
};
