import type { Page } from "@/lib/types";

export const days1115Pages: Record<string, Page> = {
  // ─── วันที่ 11: ฟังก์ชัน ─────────────────────────────────────────
  "py30-day11": {
    slug: "py30-day11",
    title: "วันที่ 11 — ฟังก์ชัน (Functions)",
    lead: "เขียนโค้ดที่ใช้ซ้ำได้ด้วยฟังก์ชัน — ตั้งแต่พื้นฐานจนถึง *args, **kwargs และ lambda",
    group: "สัปดาห์ที่ 3: ฟังก์ชัน & Functional",
    blocks: [
      {
        t: "callout",
        title: "กำลังแปล",
        c: "เนื้อหาของบทนี้อยู่ระหว่างการแปลจากภาษาอังกฤษ กลับมาดูใหม่เร็ว ๆ นี้ — ต้นฉบับ: github.com/Asabeneh/30-Days-Of-Python/blob/master/11_Day_Functions/11_functions.md",
      },
      { t: "h2", c: "การนิยามฟังก์ชัน" },
      { t: "h2", c: "การเรียกใช้ฟังก์ชัน" },
      { t: "h2", c: "ฟังก์ชันที่ไม่มี Parameter" },
      { t: "h2", c: "ฟังก์ชันที่ Return ค่า" },
      { t: "h2", c: "ฟังก์ชันกับ Parameters" },
      { t: "h2", c: "ส่งผ่าน Arguments 2 แบบ" },
      { t: "h2", c: "ฟังก์ชันกับ Default Parameter" },
      { t: "h2", c: "Arbitrary Number of Arguments (*args)" },
      { t: "h2", c: "Default & Arbitrary Number of Parameters" },
      { t: "h2", c: "Arbitrary Keyword Arguments (**kwargs)" },
      { t: "h2", c: "ฟังก์ชันเป็น Parameter" },
      { t: "h2", c: "แบบฝึกหัด — วันที่ 11" },
    ],
  },

  // ─── วันที่ 12: โมดูล ────────────────────────────────────────────
  "py30-day12": {
    slug: "py30-day12",
    title: "วันที่ 12 — โมดูล (Modules)",
    lead: "จัดระเบียบโค้ดและนำโค้ดที่คนอื่นเขียนมาใช้ได้ทันทีด้วย import",
    group: "สัปดาห์ที่ 3: ฟังก์ชัน & Functional",
    blocks: [
      {
        t: "callout",
        title: "กำลังแปล",
        c: "เนื้อหาของบทนี้อยู่ระหว่างการแปลจากภาษาอังกฤษ กลับมาดูใหม่เร็ว ๆ นี้ — ต้นฉบับ: github.com/Asabeneh/30-Days-Of-Python/blob/master/12_Day_Modules/12_modules.md",
      },
      { t: "h2", c: "โมดูลคืออะไร" },
      { t: "h2", c: "การสร้างโมดูล" },
      { t: "h2", c: "การ Import โมดูล" },
      { t: "h2", c: "Import ฟังก์ชันจากโมดูล" },
      { t: "h2", c: "Import ฟังก์ชันพร้อม Alias" },
      { t: "h2", c: "โมดูลพื้นฐาน (Built-in Modules)" },
      { t: "h3", c: "โมดูล os" },
      { t: "h3", c: "โมดูล sys" },
      { t: "h3", c: "โมดูล statistics" },
      { t: "h3", c: "โมดูล math" },
      { t: "h3", c: "โมดูล string" },
      { t: "h3", c: "โมดูล random" },
      { t: "h2", c: "แบบฝึกหัด — วันที่ 12" },
    ],
  },

  // ─── วันที่ 13: List Comprehension ────────────────────────────────
  "py30-day13": {
    slug: "py30-day13",
    title: "วันที่ 13 — List Comprehension",
    lead: "เขียนลิสต์ใน 1 บรรทัดด้วย List Comprehension — Python style ที่กระชับและอ่านได้ดี",
    group: "สัปดาห์ที่ 3: ฟังก์ชัน & Functional",
    blocks: [
      {
        t: "callout",
        title: "กำลังแปล",
        c: "เนื้อหาของบทนี้อยู่ระหว่างการแปลจากภาษาอังกฤษ กลับมาดูใหม่เร็ว ๆ นี้ — ต้นฉบับ: github.com/Asabeneh/30-Days-Of-Python/blob/master/13_Day_List_comprehension/13_list_comprehension.md",
      },
      { t: "h2", c: "List Comprehension" },
      { t: "h2", c: "Lambda Function" },
      { t: "h2", c: "Lambda Function ใน map()" },
      { t: "h2", c: "Lambda Function ใน filter()" },
      { t: "h2", c: "Lambda Function ใน reduce()" },
      { t: "h2", c: "แบบฝึกหัด — วันที่ 13" },
    ],
  },

  // ─── วันที่ 14: Higher Order Functions ───────────────────────────
  "py30-day14": {
    slug: "py30-day14",
    title: "วันที่ 14 — Higher Order Functions",
    lead: "ฟังก์ชันที่รับหรือส่งคืนฟังก์ชันอื่น — map, filter, reduce และ Closure",
    group: "สัปดาห์ที่ 3: ฟังก์ชัน & Functional",
    blocks: [
      {
        t: "callout",
        title: "กำลังแปล",
        c: "เนื้อหาของบทนี้อยู่ระหว่างการแปลจากภาษาอังกฤษ กลับมาดูใหม่เร็ว ๆ นี้ — ต้นฉบับ: github.com/Asabeneh/30-Days-Of-Python/blob/master/14_Day_Higher_order_functions/14_higher_order_functions.md",
      },
      { t: "h2", c: "Python เป็นภาษา Functional Programming" },
      { t: "h2", c: "Higher Order Functions" },
      { t: "h3", c: "Closure" },
      { t: "h3", c: "Closure ใน Python" },
      { t: "h2", c: "Python Decorators" },
      { t: "h3", c: "Creating Decorators" },
      { t: "h3", c: "Applying Multiple Decorators" },
      { t: "h3", c: "Accepting Parameters ใน Decorator Functions" },
      { t: "h2", c: "Built-in Higher Order Functions" },
      { t: "h3", c: "map()" },
      { t: "h3", c: "filter()" },
      { t: "h3", c: "reduce()" },
      { t: "h2", c: "แบบฝึกหัด — วันที่ 14" },
    ],
  },

  // ─── วันที่ 15: Python Type Errors ───────────────────────────────
  "py30-day15": {
    slug: "py30-day15",
    title: "วันที่ 15 — ประเภทข้อผิดพลาด (Python Type Errors)",
    lead: "เข้าใจ Error ต่าง ๆ ใน Python — อ่าน traceback ออก แก้บั๊กได้เร็วขึ้น",
    group: "สัปดาห์ที่ 3: ฟังก์ชัน & Functional",
    blocks: [
      {
        t: "callout",
        title: "กำลังแปล",
        c: "เนื้อหาของบทนี้อยู่ระหว่างการแปลจากภาษาอังกฤษ กลับมาดูใหม่เร็ว ๆ นี้ — ต้นฉบับ: github.com/Asabeneh/30-Days-Of-Python/blob/master/15_Day_Python_type_errors/15_python_type_errors.md",
      },
      { t: "h2", c: "Python Type Errors" },
      { t: "h2", c: "SyntaxError" },
      { t: "h2", c: "NameError" },
      { t: "h2", c: "IndexError" },
      { t: "h2", c: "ModuleNotFoundError" },
      { t: "h2", c: "AttributeError" },
      { t: "h2", c: "KeyError" },
      { t: "h2", c: "TypeError" },
      { t: "h2", c: "ImportError" },
      { t: "h2", c: "ValueError" },
      { t: "h2", c: "ZeroDivisionError" },
      { t: "h2", c: "แบบฝึกหัด — วันที่ 15" },
    ],
  },
};
