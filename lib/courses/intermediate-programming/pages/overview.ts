import type { Page } from "@/lib/types";

export const overviewPages: Record<string, Page> = {
  intermediate: {
    slug: "intermediate",
    title: { th: "เขียนโปรแกรมเชิงลึก — ภาพรวม & หลักสูตร", en: "" },
    lead: { th: "คอร์สเขียนโปรแกรมแบบลงลึก ต่อยอดจากคอร์สพื้นฐาน เจาะลึกทุกหัวข้อให้ละเอียดกว่าเดิม — โดยมี Data Structures & Algorithms เป็นหัวใจ", en: "" },
    group: "เขียนโปรแกรมเชิงลึก",
    blocks: {
      th: [
        { t: "p", c: "ถ้าคุณเขียนโปรแกรมพื้นฐานเป็นแล้ว (ตัวแปร, loop, function, list/dict, OOP เบื้องต้น) คอร์สนี้จะพาเจาะลึกต่อในทุกหัวข้อให้ละเอียดกว่าคอร์สพื้นฐาน — ตั้งแต่ Python เชิงลึก, การ debug, การเขียนเทสต์, ไปจนถึงฐานข้อมูลและอัลกอริทึมที่ลงลึกถึงการเขียนเองและวิเคราะห์" },
        { t: "p", c: "คอร์สนี้ไม่ผูกกับสายงานใดสายงานหนึ่ง แต่เน้น \"สิ่งที่ software engineer ทุกคนต้องมี\" และให้น้ำหนักพิเศษกับ Data Structures & Algorithms ซึ่งเป็นหัวใจของการเป็นโปรแกรมเมอร์ที่เก่งขึ้นและเป็นด่านสัมภาษณ์งานทุกที่" },

        { t: "callout", title: "ก่อนเริ่ม — ต้องรู้อะไรมาก่อน", c: "คอร์สนี้ต่อจากคอร์ส \"เขียนโปรแกรมจากศูนย์\" ถ้ายังไม่แม่นพื้นฐาน Python (ตัวแปร, เงื่อนไข, loop, ฟังก์ชัน, list/dict, class เบื้องต้น) แนะนำให้เรียนคอร์สพื้นฐานให้จบก่อน แล้วค่อยกลับมา" },

        { t: "h2", c: "คอร์สนี้อยู่ตรงไหน" },
        { t: "p", c: "คอร์สนี้คือเวอร์ชันลงลึกที่ต่อจากคอร์สพื้นฐาน:" },
        {
          t: "table",
          head: ["ลำดับ", "คอร์ส", "รายละเอียด"],
          rows: [
            ["1", "เขียนโปรแกรมจากศูนย์", "ปูพื้นฐานตั้งแต่ไม่เคยเขียนโค้ด"],
            ["2", "เขียนโปรแกรมเชิงลึก (คอร์สนี้)", "ต่อยอดจากพื้นฐาน เจาะลึกทุกหัวข้อให้ละเอียดกว่าเดิม"],
            ["3", "SE Roadmap", "แนวทาง & แหล่งอ้างอิงสำหรับก้าวต่อไป"],
          ],
        },

        { t: "h2", c: "หลักสูตร (Curriculum)" },
        { t: "p", c: "13 บท รวมกว่า 77 หัวข้อย่อย ออกแบบให้เรียนเรียงตามลำดับ แต่ละบทต่อยอดจากบทก่อนหน้า แต่ละหัวข้อเจาะลึกพร้อมโค้ด Python ที่รันได้จริงและแบบฝึกหัด" },
        {
          t: "table",
          head: ["บท", "เนื้อหา", "หัวข้อ"],
          rows: [
            ["1", "Python ระดับลึก — comprehension, generator, *args/**kwargs, lambda/HOF, closure, decorator, context manager, mutability/copy, collections/itertools", "9"],
            ["2", "Error handling & โค้ดที่แข็งแรง — exception ลึก, custom exception, logging, type hints, defensive programming", "5"],
            ["3", "Debugging, Profiling & Performance — debugger/pdb, อ่าน traceback, profiling, เพิ่มประสิทธิภาพ", "4"],
            ["4", "โครงสร้างโปรเจกต์ & เครื่องมือ — module/package, venv/pip, argparse CLI, env vars/config", "5"],
            ["5", "Git สำหรับทำงานเป็นทีม — branch, remote/GitHub, conflict/rebase, PR workflow", "5"],
            ["6", "การเขียนเทสต์ — ทำไมต้องเทสต์, pytest, fixture, mock, TDD/coverage", "5"],
            ["7", "Clean Code & การออกแบบ — naming/docstring, DRY/KISS, SOLID, refactoring, design patterns", "5"],
            ["8", "ทำงานกับข้อมูลจริง — ไฟล์/pathlib, CSV/JSON, regex, requests/REST, datetime, pandas เบื้องต้น", "6"],
            ["9", "ฐานข้อมูล & SQL — relational model, SQL ลึก, index/transaction, sqlite3, ORM", "5"],
            ["10", "สร้างเว็บแอป & API — HTTP, framework, request/validation, เชื่อม DB, API จริง, authentication, security", "7"],
            ["11", "⭐ Data Structures & Algorithms — เลือกโครงสร้าง, stack/queue, linked list, tree, hash, sorting, binary search, two-pointer/sliding window, recursion, DP, greedy, graph", "13"],
            ["12", "Concurrency & Async — concurrency vs parallelism, threading/GIL, multiprocessing, asyncio", "4"],
            ["13", "Capstone Project — วางแผน, สร้าง, คุณภาพ/CI, deploy", "4"],
          ],
        },
        { t: "callout", title: "บทเด่นของคอร์ส", c: "บทที่ 11 (Data Structures & Algorithms) คือหัวใจของคอร์ส ลงลึกทั้งการเขียนเอง, การวิเคราะห์ Big-O และโจทย์ฝึก — เป็นบทที่ลงลึกกว่าคอร์สพื้นฐานชัดเจนที่สุด (มี heap, two-pointer, DP, greedy, graph ที่พื้นฐานไม่มี)" },

        { t: "h2", c: "เรียนอย่างไรให้ได้ผล" },
        {
          t: "ol",
          c: [
            "อ่านทำความเข้าใจแนวคิด \"ทำไม\" ก่อน \"ทำยังไง\"",
            "พิมพ์โค้ดตัวอย่างเองทุกครั้ง อย่าแค่อ่านผ่าน — ลงมือทำคือหัวใจ",
            "ทำแบบฝึกหัดท้ายหัวข้อก่อนไปหัวข้อถัดไป",
            "เมื่อถึงบทท้าย ๆ ให้ลงมือทำ capstone project จริงควบคู่ไป",
          ],
        },
        { t: "callout", title: "เตรียมเครื่องมือ", c: "คอร์สนี้ควรติดตั้ง Python 3.10+ ลงเครื่องจริง พร้อม editor อย่าง VS Code และใช้ terminal เป็น (ต่างจากคอร์สพื้นฐานที่รันออนไลน์ได้) บางบท เช่น Git, venv, testing ต้องใช้ command line" },

        { t: "h2", c: "เริ่มเรียน" },
        { t: "p", c: "เนื้อหาแต่ละบทกำลังทยอยเพิ่มเข้ามา เมนูด้านข้างจะอัปเดตตามบทที่พร้อมแล้ว เริ่มจากบทที่ 1 ได้เลยเมื่อพร้อม" },
        {
          t: "links",
          c: [
            { title: "← กลับไปคอร์ส เขียนโปรแกรมจากศูนย์", slug: "learn", desc: "ถ้ายังไม่แม่นพื้นฐาน เริ่มหรือทบทวนที่คอร์สแรกก่อน" },
          ],
        },
      ],
      en: [],
    },
  },
};
