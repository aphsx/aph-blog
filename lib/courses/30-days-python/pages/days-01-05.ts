import type { Page } from "@/lib/types";

export const days0105Pages: Record<string, Page> = {
  // ─── วันที่ 1: บทนำ ────────────────────────────────────────────
  "py30-day01": {
    slug: "py30-day01",
    title: "วันที่ 1 — บทนำ (Introduction)",
    lead: "รู้จัก Python, ติดตั้งให้พร้อม แล้วเขียนโปรแกรมแรก — เริ่มต้นการเดินทาง 30 วัน",
    group: "สัปดาห์ที่ 1: พื้นฐาน Python",
    blocks: [
      {
        t: "callout",
        title: "กำลังแปล",
        c: "เนื้อหาของบทนี้อยู่ระหว่างการแปลจากภาษาอังกฤษ กลับมาดูใหม่เร็ว ๆ นี้ — ต้นฉบับ: github.com/Asabeneh/30-Days-Of-Python/blob/master/readme.md",
      },
      { t: "h2", c: "Python คืออะไร" },
      { t: "h2", c: "ทำไมต้องเรียน Python" },
      { t: "h2", c: "สภาพแวดล้อมการพัฒนา (Environment Setup)" },
      { t: "h3", c: "ติดตั้ง Python" },
      { t: "h3", c: "Python Shell" },
      { t: "h3", c: "ติดตั้ง Visual Studio Code" },
      { t: "h2", c: "พื้นฐาน Python" },
      { t: "h3", c: "Syntax ของ Python" },
      { t: "h3", c: "Indentation" },
      { t: "h3", c: "Comment" },
      { t: "h2", c: "ชนิดข้อมูล (Data Types)" },
      { t: "h2", c: "เช็คชนิดข้อมูล" },
      { t: "h2", c: "Python ไฟล์แรก" },
      { t: "h2", c: "แบบฝึกหัด — วันที่ 1" },
    ],
  },

  // ─── วันที่ 2: ตัวแปร & ฟังก์ชันพื้นฐาน ─────────────────────────
  "py30-day02": {
    slug: "py30-day02",
    title: "วันที่ 2 — ตัวแปร & ฟังก์ชันพื้นฐาน (Variables & Built-in Functions)",
    lead: "เรียนรู้การสร้างตัวแปร, ชนิดข้อมูล และฟังก์ชันในตัวที่ Python มีให้ใช้งานทันที",
    group: "สัปดาห์ที่ 1: พื้นฐาน Python",
    blocks: [
      {
        t: "callout",
        title: "กำลังแปล",
        c: "เนื้อหาของบทนี้อยู่ระหว่างการแปลจากภาษาอังกฤษ กลับมาดูใหม่เร็ว ๆ นี้ — ต้นฉบับ: github.com/Asabeneh/30-Days-Of-Python/blob/master/02_Day_Variables_builtin_functions/02_variables_builtin_functions.md",
      },
      { t: "h2", c: "Built-in Functions" },
      { t: "h2", c: "ตัวแปร (Variables)" },
      { t: "h3", c: "การประกาศตัวแปร" },
      { t: "h3", c: "ชนิดข้อมูลของตัวแปร" },
      { t: "h3", c: "ตัวแปรหลายตัวในบรรทัดเดียว" },
      { t: "h2", c: "การรับข้อมูลจากผู้ใช้ (User Input)" },
      { t: "h2", c: "แบบฝึกหัด — วันที่ 2" },
    ],
  },

  // ─── วันที่ 3: ตัวดำเนินการ ──────────────────────────────────────
  "py30-day03": {
    slug: "py30-day03",
    title: "วันที่ 3 — ตัวดำเนินการ (Operators)",
    lead: "เรียนตัวดำเนินการทุกประเภทใน Python ตั้งแต่คณิตศาสตร์, การเปรียบเทียบ, ตรรกศาสตร์ จนถึง bitwise",
    group: "สัปดาห์ที่ 1: พื้นฐาน Python",
    blocks: [
      {
        t: "callout",
        title: "กำลังแปล",
        c: "เนื้อหาของบทนี้อยู่ระหว่างการแปลจากภาษาอังกฤษ กลับมาดูใหม่เร็ว ๆ นี้ — ต้นฉบับ: github.com/Asabeneh/30-Days-Of-Python/blob/master/03_Day_Operators/03_operators.md",
      },
      { t: "h2", c: "ตัวดำเนินการเลขคณิต (Arithmetic Operators)" },
      { t: "h2", c: "ตัวดำเนินการการกำหนดค่า (Assignment Operators)" },
      { t: "h2", c: "ตัวดำเนินการการเปรียบเทียบ (Comparison Operators)" },
      { t: "h2", c: "ตัวดำเนินการตรรกศาสตร์ (Logical Operators)" },
      { t: "h2", c: "ตัวดำเนินการ Bitwise" },
      { t: "h2", c: "แบบฝึกหัด — วันที่ 3" },
    ],
  },

  // ─── วันที่ 4: สตริง ──────────────────────────────────────────────
  "py30-day04": {
    slug: "py30-day04",
    title: "วันที่ 4 — สตริง (Strings)",
    lead: "เจาะลึกการใช้งานสตริงใน Python ตั้งแต่การสร้าง, การจัดรูปแบบ, การตัดต่อ จนถึง method ทุกตัว",
    group: "สัปดาห์ที่ 1: พื้นฐาน Python",
    blocks: [
      {
        t: "callout",
        title: "กำลังแปล",
        c: "เนื้อหาของบทนี้อยู่ระหว่างการแปลจากภาษาอังกฤษ กลับมาดูใหม่เร็ว ๆ นี้ — ต้นฉบับ: github.com/Asabeneh/30-Days-Of-Python/blob/master/04_Day_Strings/04_strings.md",
      },
      { t: "h2", c: "การสร้างสตริง" },
      { t: "h2", c: "Multiline String" },
      { t: "h2", c: "String Concatenation" },
      { t: "h2", c: "Escape Sequences" },
      { t: "h2", c: "String Formatting" },
      { t: "h3", c: "Old Style (%)" },
      { t: "h3", c: "New Style (str.format)" },
      { t: "h3", c: "f-Strings (Python 3.6+)" },
      { t: "h2", c: "Python Strings เป็น Sequences of Characters" },
      { t: "h3", c: "Unpacking Characters" },
      { t: "h3", c: "การเข้าถึงตัวอักษร (Accessing Characters)" },
      { t: "h3", c: "Slicing" },
      { t: "h3", c: "การกลับสตริง" },
      { t: "h2", c: "String Methods" },
      { t: "h2", c: "แบบฝึกหัด — วันที่ 4" },
    ],
  },

  // ─── วันที่ 5: ลิสต์ ──────────────────────────────────────────────
  "py30-day05": {
    slug: "py30-day05",
    title: "วันที่ 5 — ลิสต์ (Lists)",
    lead: "โครงสร้างข้อมูลที่ใช้บ่อยที่สุดใน Python — เรียนการสร้าง, เข้าถึง, แก้ไข และ method ทั้งหมด",
    group: "สัปดาห์ที่ 1: พื้นฐาน Python",
    blocks: [
      {
        t: "callout",
        title: "กำลังแปล",
        c: "เนื้อหาของบทนี้อยู่ระหว่างการแปลจากภาษาอังกฤษ กลับมาดูใหม่เร็ว ๆ นี้ — ต้นฉบับ: github.com/Asabeneh/30-Days-Of-Python/blob/master/05_Day_Lists/05_lists.md",
      },
      { t: "h2", c: "การสร้างลิสต์" },
      { t: "h2", c: "การเข้าถึงข้อมูลในลิสต์" },
      { t: "h3", c: "Positive Indexing" },
      { t: "h3", c: "Negative Indexing" },
      { t: "h3", c: "Unpacking List Items" },
      { t: "h3", c: "Slicing" },
      { t: "h2", c: "การแก้ไขลิสต์" },
      { t: "h2", c: "เช็คข้อมูลในลิสต์" },
      { t: "h2", c: "การเพิ่มข้อมูล" },
      { t: "h2", c: "การแทรกข้อมูล" },
      { t: "h2", c: "การลบข้อมูล" },
      { t: "h2", c: "การคัดลอกลิสต์" },
      { t: "h2", c: "การรวมลิสต์" },
      { t: "h2", c: "การนับข้อมูล" },
      { t: "h2", c: "การหาตำแหน่ง" },
      { t: "h2", c: "การกลับลิสต์" },
      { t: "h2", c: "การเรียงลำดับ" },
      { t: "h2", c: "แบบฝึกหัด — วันที่ 5" },
    ],
  },
};
