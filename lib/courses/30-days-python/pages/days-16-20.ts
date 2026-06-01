import type { Page } from "@/lib/types";

export const days1620Pages: Record<string, Page> = {
  // ─── วันที่ 16: DateTime ──────────────────────────────────────────
  "py30-day16": {
    slug: "py30-day16",
    title: "วันที่ 16 — วันที่และเวลา (Python DateTime)",
    lead: "จัดการวันที่และเวลาใน Python ด้วย datetime module — ที่ขาดไม่ได้ในงาน backend จริง",
    group: "สัปดาห์ที่ 4: เทคนิคระดับกลาง",
    blocks: [
      {
        t: "callout",
        title: "กำลังแปล",
        c: "เนื้อหาของบทนี้อยู่ระหว่างการแปลจากภาษาอังกฤษ กลับมาดูใหม่เร็ว ๆ นี้ — ต้นฉบับ: github.com/Asabeneh/30-Days-Of-Python/blob/master/16_Day_Python_date_time/16_python_datetime.md",
      },
      { t: "h2", c: "Getting DateTime Information" },
      { t: "h2", c: "การจัดรูปแบบผลลัพธ์วันที่" },
      { t: "h2", c: "สตริงเป็น Datetime" },
      { t: "h2", c: "ใช้ strftime จัดรูปแบบ Datetime" },
      { t: "h2", c: "แบบฝึกหัด — วันที่ 16" },
    ],
  },

  // ─── วันที่ 17: Exception Handling ───────────────────────────────
  "py30-day17": {
    slug: "py30-day17",
    title: "วันที่ 17 — การจัดการข้อผิดพลาด (Exception Handling)",
    lead: "เขียนโปรแกรมที่ไม่พังง่าย ๆ ด้วย try, except, else, finally และการ raise exception",
    group: "สัปดาห์ที่ 4: เทคนิคระดับกลาง",
    blocks: [
      {
        t: "callout",
        title: "กำลังแปล",
        c: "เนื้อหาของบทนี้อยู่ระหว่างการแปลจากภาษาอังกฤษ กลับมาดูใหม่เร็ว ๆ นี้ — ต้นฉบับ: github.com/Asabeneh/30-Days-Of-Python/blob/master/17_Day_Exception_handling/17_exception_handling.md",
      },
      { t: "h2", c: "Exception Handling" },
      { t: "h2", c: "Packing & Unpacking Arguments" },
      { t: "h3", c: "Unpacking" },
      { t: "h3", c: "Packing" },
      { t: "h3", c: "Unpacking Lists" },
      { t: "h3", c: "Unpacking Dictionaries" },
      { t: "h2", c: "Spreading in Python" },
      { t: "h2", c: "Enumerate" },
      { t: "h2", c: "Zip" },
      { t: "h2", c: "แบบฝึกหัด — วันที่ 17" },
    ],
  },

  // ─── วันที่ 18: Regular Expressions ──────────────────────────────
  "py30-day18": {
    slug: "py30-day18",
    title: "วันที่ 18 — Regular Expressions",
    lead: "ค้นหาและจัดการข้อความด้วย pattern matching — regex ที่ดูน่ากลัวแต่ทรงพลังมาก",
    group: "สัปดาห์ที่ 4: เทคนิคระดับกลาง",
    blocks: [
      {
        t: "callout",
        title: "กำลังแปล",
        c: "เนื้อหาของบทนี้อยู่ระหว่างการแปลจากภาษาอังกฤษ กลับมาดูใหม่เร็ว ๆ นี้ — ต้นฉบับ: github.com/Asabeneh/30-Days-Of-Python/blob/master/18_Day_Regular_expressions/18_regular_expressions.md",
      },
      { t: "h2", c: "Regular Expressions คืออะไร" },
      { t: "h2", c: "โมดูล re" },
      { t: "h2", c: "เมธอดใน re" },
      { t: "h3", c: "re.match()" },
      { t: "h3", c: "re.search()" },
      { t: "h3", c: "re.findall()" },
      { t: "h3", c: "re.split()" },
      { t: "h3", c: "re.sub()" },
      { t: "h2", c: "Writing Regex Patterns" },
      { t: "h3", c: "Square Bracket" },
      { t: "h3", c: "Escape Character (\\.)" },
      { t: "h3", c: "One or More Times (+)" },
      { t: "h3", c: "Period (.)" },
      { t: "h3", c: "Zero or More Times (*)" },
      { t: "h3", c: "Zero or One Time (?)" },
      { t: "h3", c: "Quantifier ใน RegEx" },
      { t: "h3", c: "Cart ^" },
      { t: "h2", c: "แบบฝึกหัด — วันที่ 18" },
    ],
  },

  // ─── วันที่ 19: File Handling ─────────────────────────────────────
  "py30-day19": {
    slug: "py30-day19",
    title: "วันที่ 19 — การจัดการไฟล์ (File Handling)",
    lead: "อ่านและเขียนไฟล์ใน Python — ทั้ง text file, JSON และการจัดการ path",
    group: "สัปดาห์ที่ 4: เทคนิคระดับกลาง",
    blocks: [
      {
        t: "callout",
        title: "กำลังแปล",
        c: "เนื้อหาของบทนี้อยู่ระหว่างการแปลจากภาษาอังกฤษ กลับมาดูใหม่เร็ว ๆ นี้ — ต้นฉบับ: github.com/Asabeneh/30-Days-Of-Python/blob/master/19_Day_File_handling/19_file_handling.md",
      },
      { t: "h2", c: "การเปิดไฟล์" },
      { t: "h2", c: "การเปิดไฟล์เพื่ออ่าน" },
      { t: "h3", c: "อ่านไฟล์ทั้งหมด" },
      { t: "h3", c: "อ่านทีละบรรทัด" },
      { t: "h3", c: "อ่านเป็นลิสต์" },
      { t: "h2", c: "การเปิดไฟล์เพื่อเขียน & เพิ่มข้อมูล" },
      { t: "h2", c: "การลบไฟล์" },
      { t: "h2", c: "File Types" },
      { t: "h3", c: "ไฟล์ txt" },
      { t: "h3", c: "ไฟล์ json" },
      { t: "h3", c: "เปลี่ยน JSON เป็น Dictionary" },
      { t: "h3", c: "เปลี่ยน Dictionary เป็น JSON" },
      { t: "h3", c: "บันทึกเป็น JSON File" },
      { t: "h3", c: "ไฟล์ csv" },
      { t: "h3", c: "ไฟล์ xlsx" },
      { t: "h3", c: "ไฟล์ xml" },
      { t: "h2", c: "แบบฝึกหัด — วันที่ 19" },
    ],
  },

  // ─── วันที่ 20: Package Manager ───────────────────────────────────
  "py30-day20": {
    slug: "py30-day20",
    title: "วันที่ 20 — ตัวจัดการแพ็กเกจ (Python Package Manager)",
    lead: "ติดตั้งและจัดการ package ภายนอกด้วย pip — เปิดประตูสู่ ecosystem ขนาดใหญ่ของ Python",
    group: "สัปดาห์ที่ 4: เทคนิคระดับกลาง",
    blocks: [
      {
        t: "callout",
        title: "กำลังแปล",
        c: "เนื้อหาของบทนี้อยู่ระหว่างการแปลจากภาษาอังกฤษ กลับมาดูใหม่เร็ว ๆ นี้ — ต้นฉบับ: github.com/Asabeneh/30-Days-Of-Python/blob/master/20_Day_Python_package_manager/20_python_package_manager.md",
      },
      { t: "h2", c: "pip คืออะไร" },
      { t: "h2", c: "ติดตั้ง packages ด้วย pip" },
      { t: "h2", c: "Uninstall Packages" },
      { t: "h2", c: "แสดง Package ที่ติดตั้ง" },
      { t: "h2", c: "แสดงข้อมูล Package" },
      { t: "h2", c: "PIP Freeze" },
      { t: "h2", c: "อ่าน URL" },
      { t: "h2", c: "สร้าง Package" },
      { t: "h2", c: "ข้อมูลเพิ่มเติมเกี่ยวกับ Package" },
      { t: "h2", c: "แบบฝึกหัด — วันที่ 20" },
    ],
  },
};
