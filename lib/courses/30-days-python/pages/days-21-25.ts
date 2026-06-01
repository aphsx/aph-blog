import type { Page } from "@/lib/types";

export const days2125Pages: Record<string, Page> = {
  // ─── วันที่ 21: Classes and Objects ──────────────────────────────
  "py30-day21": {
    slug: "py30-day21",
    title: "วันที่ 21 — คลาสและออบเจกต์ (Classes and Objects)",
    lead: "เขียนโปรแกรมเชิงวัตถุ (OOP) ใน Python ตั้งแต่การสร้างคลาสจนถึง Inheritance และ Polymorphism",
    group: "สัปดาห์ที่ 5: OOP & ข้อมูล",
    blocks: [
      {
        t: "callout",
        title: "กำลังแปล",
        c: "เนื้อหาของบทนี้อยู่ระหว่างการแปลจากภาษาอังกฤษ กลับมาดูใหม่เร็ว ๆ นี้ — ต้นฉบับ: github.com/Asabeneh/30-Days-Of-Python/blob/master/21_Day_Classes_and_objects/21_classes_and_objects.md",
      },
      { t: "h2", c: "คลาส (Classes)" },
      { t: "h2", c: "การสร้างคลาส" },
      { t: "h2", c: "การสร้างออบเจกต์ (Object)" },
      { t: "h2", c: "Constructor" },
      { t: "h2", c: "Object Methods" },
      { t: "h2", c: "Object Default Methods" },
      { t: "h2", c: "เมธอดในการแก้ไข Default Values ของ Object" },
      { t: "h2", c: "Inheritance" },
      { t: "h2", c: "Overriding Parent Method" },
      { t: "h2", c: "แบบฝึกหัด — วันที่ 21" },
    ],
  },

  // ─── วันที่ 22: Web Scraping ──────────────────────────────────────
  "py30-day22": {
    slug: "py30-day22",
    title: "วันที่ 22 — Web Scraping",
    lead: "ดึงข้อมูลจากเว็บไซต์อัตโนมัติด้วย requests และ BeautifulSoup4",
    group: "สัปดาห์ที่ 5: OOP & ข้อมูล",
    blocks: [
      {
        t: "callout",
        title: "กำลังแปล",
        c: "เนื้อหาของบทนี้อยู่ระหว่างการแปลจากภาษาอังกฤษ กลับมาดูใหม่เร็ว ๆ นี้ — ต้นฉบับ: github.com/Asabeneh/30-Days-Of-Python/blob/master/22_Day_Web_scraping/22_web_scraping.md",
      },
      { t: "h2", c: "Web Scraping คืออะไร" },
      { t: "h2", c: "ขั้นตอนการทำ Web Scraping" },
      { t: "h2", c: "ติดตั้งที่ต้องใช้" },
      { t: "h3", c: "requests" },
      { t: "h3", c: "beautifulsoup4" },
      { t: "h2", c: "Web Scraping จริง" },
      { t: "h2", c: "แบบฝึกหัด — วันที่ 22" },
    ],
  },

  // ─── วันที่ 23: Virtual Environment ──────────────────────────────
  "py30-day23": {
    slug: "py30-day23",
    title: "วันที่ 23 — Virtual Environment",
    lead: "แยก dependencies แต่ละโปรเจกต์ออกจากกัน — การ setup ที่นักพัฒนา Python ทุกคนต้องทำ",
    group: "สัปดาห์ที่ 5: OOP & ข้อมูล",
    blocks: [
      {
        t: "callout",
        title: "กำลังแปล",
        c: "เนื้อหาของบทนี้อยู่ระหว่างการแปลจากภาษาอังกฤษ กลับมาดูใหม่เร็ว ๆ นี้ — ต้นฉบับ: github.com/Asabeneh/30-Days-Of-Python/blob/master/23_Day_Virtual_environment/23_virtual_environment.md",
      },
      { t: "h2", c: "การตั้งค่า Virtual Environment" },
      { t: "h3", c: "MacOS / Linux" },
      { t: "h3", c: "Windows" },
      { t: "h2", c: "การเปิดใช้งาน Virtual Environment" },
      { t: "h2", c: "Flask ใน Virtual Environment" },
      { t: "h2", c: "แบบฝึกหัด — วันที่ 23" },
    ],
  },

  // ─── วันที่ 24: Statistics ────────────────────────────────────────
  "py30-day24": {
    slug: "py30-day24",
    title: "วันที่ 24 — สถิติ (Statistics)",
    lead: "วิเคราะห์ข้อมูลเบื้องต้นด้วย statistics module และ NumPy — พื้นฐาน Data Science",
    group: "สัปดาห์ที่ 5: OOP & ข้อมูล",
    blocks: [
      {
        t: "callout",
        title: "กำลังแปล",
        c: "เนื้อหาของบทนี้อยู่ระหว่างการแปลจากภาษาอังกฤษ กลับมาดูใหม่เร็ว ๆ นี้ — ต้นฉบับ: github.com/Asabeneh/30-Days-Of-Python/blob/master/24_Day_Statistics/24_statistics.md",
      },
      { t: "h2", c: "สถิติ (Statistics)" },
      { t: "h2", c: "ข้อมูล (Data)" },
      { t: "h2", c: "โมดูล Statistics" },
      { t: "h2", c: "NumPy" },
      { t: "h2", c: "การ Import NumPy" },
      { t: "h2", c: "การสร้าง NumPy Array" },
      { t: "h3", c: "การสร้าง Array จาก List" },
      { t: "h3", c: "การสร้าง Array ของ Integers" },
      { t: "h3", c: "การสร้าง Float Array" },
      { t: "h3", c: "การสร้าง Multidimensional Array" },
      { t: "h2", c: "ฟังก์ชันทางคณิตศาสตร์" },
      { t: "h2", c: "แบบฝึกหัด — วันที่ 24" },
    ],
  },

  // ─── วันที่ 25: Pandas ────────────────────────────────────────────
  "py30-day25": {
    slug: "py30-day25",
    title: "วันที่ 25 — Pandas",
    lead: "วิเคราะห์และจัดการข้อมูลด้วย Pandas DataFrame — เครื่องมือหลักของ Data Science ใน Python",
    group: "สัปดาห์ที่ 5: OOP & ข้อมูล",
    blocks: [
      {
        t: "callout",
        title: "กำลังแปล",
        c: "เนื้อหาของบทนี้อยู่ระหว่างการแปลจากภาษาอังกฤษ กลับมาดูใหม่เร็ว ๆ นี้ — ต้นฉบับ: github.com/Asabeneh/30-Days-Of-Python/blob/master/25_Day_Pandas/25_pandas.md",
      },
      { t: "h2", c: "Pandas" },
      { t: "h2", c: "การ Import Pandas" },
      { t: "h2", c: "สร้าง Pandas Series ด้วย Default Index" },
      { t: "h2", c: "สร้าง Pandas Series ด้วย Custom Index" },
      { t: "h2", c: "สร้าง Pandas Series จาก Dictionary" },
      { t: "h2", c: "Pandas DataFrame" },
      { t: "h2", c: "อ่านไฟล์ CSV ด้วย Pandas" },
      { t: "h3", c: "Data Exploration" },
      { t: "h2", c: "การแก้ไข DataFrame" },
      { t: "h3", c: "สร้าง Column ใหม่" },
      { t: "h3", c: "แก้ไขค่าใน Column" },
      { t: "h2", c: "เช็ค Data Types" },
      { t: "h2", c: "Boolean Indexing" },
      { t: "h2", c: "แบบฝึกหัด — วันที่ 25" },
    ],
  },
};
