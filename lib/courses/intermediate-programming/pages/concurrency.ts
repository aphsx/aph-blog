import type { Page } from "@/lib/types";

const GROUP = "บทที่ 12: Concurrency & Async";

export const concurrencyPages: Record<string, Page> = {
  // ─────────────────────────────────────────────────────────────
  "async-why": {
    slug: "async-why",
    title: { th: "Concurrency vs Parallelism", en: "" },
    lead: { th: "เข้าใจความต่างของ \"ทำสลับกัน\" กับ \"ทำพร้อมกันจริง\" และเลือกเครื่องมือให้ถูกกับงาน", en: "" },
    group: GROUP,
    blocks: {
      th: [
        { t: "p", c: "เมื่อโปรแกรมต้องทำหลายอย่าง การทำให้เร็วขึ้นด้วยการทำพร้อมกันเป็นทักษะสำคัญ แต่ \"พร้อมกัน\" มีหลายแบบ และเลือกผิดเครื่องมืออาจไม่เร็วขึ้นเลย หัวข้อนี้ปูพื้นให้เลือกถูก" },

        { t: "h2", c: "Concurrency vs Parallelism" },
        {
          t: "table",
          head: ["", "Concurrency", "Parallelism"],
          rows: [
            ["ความหมาย", "สลับทำหลายงาน", "ทำหลายงานพร้อมกันจริง"],
            ["เปรียบเทียบ", "เชฟคนเดียวสลับทำหลายจาน", "เชฟหลายคนทำคนละจาน"],
            ["ต้องใช้", "งานสลับได้ (รอ I/O)", "หลาย CPU core"],
          ],
        },

        { t: "h2", c: "I/O-bound vs CPU-bound (ตัวกำหนดเครื่องมือ)" },
        { t: "p", c: "ก่อนเลือกเครื่องมือ ต้องรู้ว่างานของเราติดที่อะไร — รอข้อมูล (I/O) หรือคำนวณหนัก (CPU)" },
        {
          t: "table",
          head: ["ชนิดงาน", "ติดที่", "ตัวอย่าง", "เครื่องมือ"],
          rows: [
            ["I/O-bound", "รอ network/ดิสก์", "เรียก API หลายตัว, อ่านไฟล์", "threading / asyncio"],
            ["CPU-bound", "คำนวณหนัก", "ประมวลผลภาพ, คำนวณเลขเยอะ", "multiprocessing"],
          ],
        },
        { t: "callout", title: "เลือกผิดเครื่องมือ = ไม่เร็วขึ้น", warn: true, c: "งาน I/O-bound (รอเยอะ) ใช้ threading/asyncio ได้ผลดี เพราะระหว่างรอตัวหนึ่ง ทำตัวอื่นได้; แต่งาน CPU-bound ต้องใช้ multiprocessing เพราะ threading ใน Python ไม่ช่วย (เพราะ GIL — หัวข้อถัดไป) เข้าใจจุดนี้ก่อนเขียนโค้ด" },

        { t: "h2", c: "สรุปหัวข้อนี้" },
        {
          t: "ul",
          c: [
            "concurrency = สลับทำ; parallelism = ทำพร้อมกันจริง (ต้องหลาย core)",
            "I/O-bound (รอ network/ดิสก์) → threading / asyncio",
            "CPU-bound (คำนวณหนัก) → multiprocessing",
            "เลือกผิดชนิด = ไม่เร็วขึ้น (หรือช้าลง)",
          ],
        },
        { t: "callout", title: "แบบฝึกหัด", c: "1) จำแนกว่าเป็น I/O-bound หรือ CPU-bound: ดาวน์โหลด 100 ไฟล์ / คำนวณ prime ล้านตัว / อ่าน DB / resize รูป 1000 รูป  2) อธิบาย concurrency vs parallelism ด้วยตัวอย่างของตัวเอง  3) บอกว่างานในข้อ 1 ควรใช้เครื่องมือไหน" },
        {
          t: "links",
          c: [
            { title: "ถัดไป: Threading & GIL →", slug: "async-threads", desc: "ทำหลายงานด้วย thread + ข้อจำกัด GIL" },
            { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
          ],
        },
      ],
      en: [],
    },
  },

  // ─────────────────────────────────────────────────────────────
  "async-threads": {
    slug: "async-threads",
    title: { th: "Threading & GIL", en: "" },
    lead: { th: "ทำหลายงาน I/O พร้อมกันด้วย thread — และเข้าใจว่าทำไม GIL ทำให้ thread ไม่เร่งงานคำนวณ", en: "" },
    group: GROUP,
    blocks: {
      th: [
        { t: "p", c: "thread คือสายการทำงานย่อยภายในโปรแกรมเดียว ใช้ทำหลายงานสลับกันได้ เหมาะกับงาน I/O-bound แต่มีข้อจำกัดสำคัญใน Python ที่ชื่อ GIL ที่ต้องเข้าใจ" },

        { t: "h2", c: "ThreadPoolExecutor — วิธีที่ใช้ง่ายสุด" },
        { t: "p", c: "แทนการสร้าง thread เอง ใช้ ThreadPoolExecutor จัดการ pool ของ thread ให้ — เหมาะกับงาน I/O หลายชิ้น เช่นดาวน์โหลดหลายไฟล์" },
        { t: "code", lang: "python", c: "from concurrent.futures import ThreadPoolExecutor\nimport time\n\ndef download(url):\n    time.sleep(1)          # จำลองรอ network (I/O)\n    return f\"เสร็จ {url}\"\n\nurls = [\"a\", \"b\", \"c\", \"d\"]\n\n# แบบลำดับ: ~4 วินาที\n# for u in urls: download(u)\n\n# แบบ thread: ~1 วินาที (รอพร้อมกัน)\nwith ThreadPoolExecutor(max_workers=4) as executor:\n    results = list(executor.map(download, urls))\nprint(results)" },

        { t: "h2", c: "GIL — Global Interpreter Lock" },
        { t: "p", c: "Python (CPython) มี GIL ที่อนุญาตให้รันโค้ด Python ได้ทีละ thread เท่านั้น ณ เวลาหนึ่ง — แปลว่า thread ไม่ช่วยเร่งงาน CPU-bound (คำนวณหนัก) เพราะถึงมีหลาย thread ก็รันโค้ดทีละตัวอยู่ดี" },
        { t: "callout", title: "GIL ทำให้ thread ไม่ช่วย CPU-bound", warn: true, c: "thread เร่งได้เฉพาะงาน I/O-bound เพราะระหว่างที่ thread หนึ่ง \"รอ\" network/ดิสก์ GIL จะถูกปล่อยให้ thread อื่นทำงาน แต่ถ้าทุก thread เอาแต่คำนวณ (ไม่รอ) GIL จะกั๊กให้ทำทีละตัว — งานคำนวณหนักต้องใช้ multiprocessing (หัวข้อถัดไป)" },

        { t: "h2", c: "สรุปหัวข้อนี้" },
        {
          t: "ul",
          c: [
            "thread = สายงานย่อยในโปรแกรมเดียว; ThreadPoolExecutor ใช้ง่ายสุด",
            "เหมาะกับงาน I/O-bound (รอ network/ดิสก์) — เร่งได้จริง",
            "GIL: Python รันโค้ดทีละ thread → thread ไม่ช่วย CPU-bound",
            "งานคำนวณหนักให้ใช้ multiprocessing แทน",
          ],
        },
        { t: "callout", title: "แบบฝึกหัด", c: "1) ใช้ ThreadPoolExecutor เร่งงานจำลอง I/O (time.sleep) หลายชิ้น เทียบเวลากับแบบลำดับ  2) ลองใช้ thread กับงานคำนวณหนักแล้วสังเกตว่าไม่เร็วขึ้น  3) อธิบายว่า GIL คืออะไร  4) บอกว่าทำไม thread ช่วย I/O แต่ไม่ช่วย CPU" },
        {
          t: "links",
          c: [
            { title: "ถัดไป: Multiprocessing →", slug: "async-process", desc: "ข้าม GIL ด้วยหลาย process สำหรับงานคำนวณ" },
            { title: "← ก่อนหน้า: Concurrency vs Parallelism", slug: "async-why" },
            { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
          ],
        },
      ],
      en: [],
    },
  },

  // ─────────────────────────────────────────────────────────────
  "async-process": {
    slug: "async-process",
    title: { th: "Multiprocessing", en: "" },
    lead: { th: "ข้ามข้อจำกัด GIL ด้วยการแยกเป็นหลาย process — สำหรับงานคำนวณหนัก (CPU-bound)", en: "" },
    group: GROUP,
    blocks: {
      th: [
        { t: "p", c: "เมื่องานเป็น CPU-bound (คำนวณหนัก) thread ช่วยไม่ได้เพราะ GIL ทางออกคือ multiprocessing — แยกเป็นหลาย process ที่แต่ละตัวมี Python interpreter ของตัวเอง (มี GIL ของตัวเอง) จึงรันพร้อมกันจริงบนหลาย core" },

        { t: "h2", c: "ProcessPoolExecutor" },
        { t: "p", c: "ใช้คล้าย ThreadPoolExecutor แต่เป็น process — เหมาะกับงานคำนวณหนักที่แบ่งเป็นชิ้นได้" },
        { t: "code", lang: "python", c: "from concurrent.futures import ProcessPoolExecutor\n\ndef heavy_compute(n):\n    # งาน CPU-bound: คำนวณหนัก\n    return sum(i * i for i in range(n))\n\nif __name__ == \"__main__\":      # จำเป็นสำหรับ multiprocessing\n    tasks = [10_000_000] * 4\n    with ProcessPoolExecutor() as executor:\n        results = list(executor.map(heavy_compute, tasks))\n    print(results)\n    # ใช้หลาย core พร้อมกันจริง เร็วกว่าทำทีละตัว" },
        { t: "callout", title: "ต้องมี if __name__ == \"__main__\"", warn: true, c: "multiprocessing ต้องอยู่ใต้ guard if __name__ == \"__main__\": (จากบท 4) ไม่งั้นบางระบบจะสร้าง process ซ้อนไม่รู้จบ — เป็นกับดักที่เจอบ่อยกับมือใหม่" },

        { t: "h2", c: "thread vs process — ต้นทุน" },
        {
          t: "table",
          head: ["", "thread", "process"],
          rows: [
            ["memory", "แชร์กัน (เบา)", "แยกกัน (หนัก)"],
            ["ข้าม GIL", "ไม่ได้", "ได้ (พร้อมกันจริง)"],
            ["เหมาะกับ", "I/O-bound", "CPU-bound"],
            ["ต้นทุนสร้าง", "ต่ำ", "สูง"],
          ],
        },
        { t: "callout", title: "process หนักกว่า thread", c: "การสร้าง process มีต้นทุนสูงกว่า thread (แยก memory, ส่งข้อมูลข้าม process ต้อง serialize) — ใช้กับงานคำนวณหนักจริง ๆ ที่คุ้มค่า ไม่ใช่งานเล็ก ๆ" },

        { t: "h2", c: "สรุปหัวข้อนี้" },
        {
          t: "ul",
          c: [
            "multiprocessing แยกเป็นหลาย process ข้าม GIL → รันพร้อมกันจริง",
            "เหมาะกับ CPU-bound; ใช้ ProcessPoolExecutor คล้าย thread pool",
            "ต้องมี if __name__ == \"__main__\" guard",
            "process หนักกว่า thread (memory แยก, ต้นทุนสูง) — ใช้เมื่อคุ้ม",
          ],
        },
        { t: "callout", title: "แบบฝึกหัด", c: "1) ใช้ ProcessPoolExecutor เร่งงานคำนวณหนักหลายชิ้น เทียบเวลากับแบบลำดับ  2) ลองงานเดียวกันด้วย thread แล้วเทียบ (จะเห็นว่า process เร็วกว่าสำหรับ CPU-bound)  3) อธิบายว่าทำไม process ข้าม GIL ได้  4) บอกข้อเสียของ process เทียบ thread" },
        {
          t: "links",
          c: [
            { title: "ถัดไป: async/await & asyncio →", slug: "async-asyncio", desc: "concurrency แบบ I/O จำนวนมากด้วย event loop" },
            { title: "← ก่อนหน้า: Threading & GIL", slug: "async-threads" },
            { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
          ],
        },
      ],
      en: [],
    },
  },

  // ─────────────────────────────────────────────────────────────
  "async-asyncio": {
    slug: "async-asyncio",
    title: { th: "async/await & asyncio", en: "" },
    lead: { th: "จัดการงาน I/O จำนวนมากพร้อมกันด้วย async/await — เบาและขยายได้กว่า thread", en: "" },
    group: GROUP,
    blocks: {
      th: [
        { t: "p", c: "asyncio เป็นวิธีทำ concurrency สำหรับงาน I/O-bound จำนวนมาก (เช่นยิง API หลายพันตัว) ด้วย event loop ที่สลับงานเมื่อตัวหนึ่งรอ I/O — เบากว่า thread เพราะไม่ต้องสร้าง thread จริงหลายตัว เป็นพื้นฐานของ framework สมัยใหม่อย่าง FastAPI (บท 10)" },

        { t: "h2", c: "async def & await" },
        { t: "p", c: "ฟังก์ชัน async (coroutine) ประกาศด้วย async def และใช้ await ตรงจุดที่ \"รอ\" — ระหว่างรอ event loop ไปทำงานอื่นได้" },
        { t: "code", lang: "python", c: "import asyncio\n\nasync def fetch(name):\n    print(f\"เริ่ม {name}\")\n    await asyncio.sleep(1)      # จำลองรอ I/O (ระหว่างนี้ทำตัวอื่นได้)\n    print(f\"เสร็จ {name}\")\n    return name\n\nasync def main():\n    result = await fetch(\"A\")    # await = รอ coroutine นี้\n    print(result)\n\nasyncio.run(main())             # รัน event loop" },

        { t: "h2", c: "asyncio.gather — ทำหลายงานพร้อมกัน" },
        { t: "p", c: "พลังจริงของ asyncio คือรันหลาย coroutine พร้อมกัน — gather รอทั้งหมดเสร็จ" },
        { t: "code", lang: "python", c: "import asyncio\n\nasync def fetch(name):\n    await asyncio.sleep(1)\n    return f\"เสร็จ {name}\"\n\nasync def main():\n    # ยิง 3 งานพร้อมกัน — รวม ~1 วินาที (ไม่ใช่ 3)\n    results = await asyncio.gather(\n        fetch(\"A\"), fetch(\"B\"), fetch(\"C\")\n    )\n    print(results)   # ['เสร็จ A', 'เสร็จ B', 'เสร็จ C']\n\nasyncio.run(main())" },

        { t: "h2", c: "async vs thread (เลือกยังไง)" },
        {
          t: "ul",
          c: [
            "asyncio: I/O-bound จำนวนมาก ๆ (พัน++), เบา, แต่ต้องใช้ library ที่รองรับ async",
            "thread: I/O-bound ไม่เยอะมาก, ใช้กับโค้ด blocking เดิมได้เลย",
            "ทั้งคู่ไม่ช่วย CPU-bound (นั่นคืองานของ multiprocessing)",
          ],
        },
        { t: "callout", title: "ห้ามเรียก blocking ใน async", warn: true, c: "ในฟังก์ชัน async อย่าเรียกโค้ด blocking ปกติ (เช่น time.sleep แทน asyncio.sleep, หรือ requests แทน async client) เพราะมันจะบล็อก event loop ทั้งระบบ ทำให้ coroutine อื่นค้างหมด — ต้องใช้เวอร์ชัน async ของ library นั้น" },

        { t: "h2", c: "สรุปหัวข้อนี้ & จบบท" },
        {
          t: "ul",
          c: [
            "async def + await: coroutine ที่สลับงานตอนรอ I/O ผ่าน event loop",
            "asyncio.run() เริ่ม loop; asyncio.gather() รันหลายงานพร้อมกัน",
            "เหมาะ I/O-bound จำนวนมาก เบากว่า thread (FastAPI ใช้ async)",
            "ห้ามเรียก blocking ใน async — ใช้เวอร์ชัน async ของ library",
          ],
        },
        { t: "callout", title: "แบบฝึกหัด", c: "1) เขียน coroutine ที่ await asyncio.sleep แล้วคืนค่า  2) ใช้ asyncio.gather ยิง 5 งานพร้อมกัน เทียบเวลากับทำทีละตัว  3) อธิบายว่าทำไม asyncio เบากว่า thread  4) อธิบายว่าทำไมห้ามใช้ time.sleep ใน async" },
        {
          t: "links",
          c: [
            { title: "จบบทที่ 12 แล้ว 🎉 — กลับหน้าภาพรวมคอร์ส", slug: "intermediate", desc: "บทที่ 13: Capstone Project (บทสุดท้าย) กำลังจัดทำ" },
            { title: "← ก่อนหน้า: Multiprocessing", slug: "async-process" },
            { title: "ทบทวน: Concurrency vs Parallelism (ต้นบท)", slug: "async-why" },
          ],
        },
      ],
      en: [],
    },
  },
};
