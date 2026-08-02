import type { Page } from "@/lib/types";

const IMG =
  "https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images";

export const day23Page: Record<string, Page> = {
  "py30-day23": {
    slug: "py30-day23",
    title: { th: "วันที่ 23 — Virtual Environment", en: "" },
    lead: { th: "เรียนรู้การสร้าง Virtual Environment เพื่อแยก dependencies ของแต่ละโปรเจกต์ Python ออกจากกัน ป้องกันปัญหา version conflict", en: "" },
    group: "สัปดาห์ที่ 5: OOP & ข้อมูล",
    blocks: {
      th: [
        {
          t: "image",
          src: `${IMG}/30DaysOfPython_banner3@2x.png`,
          alt: "30 Days of Python banner",
          caption: "30 Days of Python",
        },

        { t: "h2", c: "การตั้งค่า Virtual Environment" },
        {
          t: "p",
          c: "เพื่อเริ่มต้นโปรเจกต์ ควรมี Virtual Environment ไว้ก่อน Virtual Environment ช่วยให้เราสร้างสภาพแวดล้อมที่แยกออกจากกัน (isolated environment) ซึ่งจะช่วยหลีกเลี่ยงความขัดแย้งของ dependencies ข้ามโปรเจกต์ ถ้าพิมพ์ pip freeze ในเทอร์มินัล จะเห็น packages ทั้งหมดที่ติดตั้งอยู่บนเครื่อง แต่ถ้าใช้ virtualenv เราจะเข้าถึงเฉพาะ packages ที่จำเป็นสำหรับโปรเจกต์นั้นเท่านั้น เปิดเทอร์มินัลแล้วติดตั้ง virtualenv:",
        },
        {
          t: "code",
          lang: "shell",
          c: "asabeneh@Asabeneh:~$ pip install virtualenv",
        },
        {
          t: "p",
          c: "ภายใน folder 30DaysOfPython ให้สร้าง folder ชื่อ flask_project",
        },
        {
          t: "p",
          c: "หลังจากติดตั้ง package virtualenv แล้ว ให้ไปที่ folder โปรเจกต์ แล้วสร้าง virtual environment โดยพิมพ์คำสั่งต่อไปนี้:",
        },
        {
          t: "p",
          c: "สำหรับ Mac/Linux:",
        },
        {
          t: "code",
          lang: "shell",
          c: "asabeneh@Asabeneh:~/Desktop/30DaysOfPython/flask_project$ virtualenv venv",
        },
        {
          t: "p",
          c: "สำหรับ Windows:",
        },
        {
          t: "code",
          lang: "shell",
          c: "C:\\Users\\User\\Documents\\30DaysOfPython\\flask_project>python -m venv venv",
        },
        {
          t: "p",
          c: "เรียกโปรเจกต์ใหม่ว่า venv แต่สามารถตั้งชื่ออื่นได้ตามต้องการ ลองตรวจสอบว่า venv ถูกสร้างขึ้นมาแล้วหรือไม่ โดยใช้คำสั่ง ls (หรือ dir สำหรับ Windows command prompt):",
        },
        {
          t: "code",
          lang: "shell",
          c: "asabeneh@Asabeneh:~/Desktop/30DaysOfPython/flask_project$ ls\nvenv/",
        },
        {
          t: "p",
          c: "เปิดใช้งาน Virtual Environment โดยพิมพ์คำสั่งต่อไปนี้ใน folder โปรเจกต์:",
        },
        {
          t: "p",
          c: "สำหรับ Mac/Linux:",
        },
        {
          t: "code",
          lang: "shell",
          c: "asabeneh@Asabeneh:~/Desktop/30DaysOfPython/flask_project$ source venv/bin/activate",
        },
        {
          t: "p",
          c: "การ Activate Virtual Environment บน Windows อาจแตกต่างกันระหว่าง Windows Power Shell และ git bash",
        },
        {
          t: "p",
          c: "สำหรับ Windows Power Shell:",
        },
        {
          t: "code",
          lang: "shell",
          c: "C:\\Users\\User\\Documents\\30DaysOfPython\\flask_project> venv\\Scripts\\activate",
        },
        {
          t: "p",
          c: "สำหรับ Windows Git bash:",
        },
        {
          t: "code",
          lang: "shell",
          c: "C:\\Users\\User\\Documents\\30DaysOfPython\\flask_project> venv\\Scripts\\. activate",
        },
        {
          t: "p",
          c: "หลังจากพิมพ์คำสั่ง activate แล้ว directory ของโปรเจกต์จะขึ้นต้นด้วย venv ดังตัวอย่างด้านล่าง:",
        },
        {
          t: "code",
          lang: "shell",
          c: "(venv) asabeneh@Asabeneh:~/Desktop/30DaysOfPython/flask_project$",
        },
        {
          t: "p",
          c: "ตอนนี้ให้ลองตรวจสอบ packages ที่มีอยู่ในโปรเจกต์นี้โดยพิมพ์ pip freeze จะไม่เห็น packages ใดๆ เลย",
        },
        {
          t: "p",
          c: "เราจะทำโปรเจกต์ flask เล็กๆ ดังนั้นให้ติดตั้ง package flask ลงในโปรเจกต์นี้:",
        },
        {
          t: "code",
          lang: "shell",
          c: "(venv) asabeneh@Asabeneh:~/Desktop/30DaysOfPython/flask_project$ pip install Flask",
        },
        {
          t: "p",
          c: "ตอนนี้ลองพิมพ์ pip freeze เพื่อดูรายการ packages ที่ติดตั้งในโปรเจกต์:",
        },
        {
          t: "code",
          lang: "shell",
          c: "(venv) asabeneh@Asabeneh:~/Desktop/30DaysOfPython/flask_project$ pip freeze\nClick==7.0\nFlask==1.1.1\nitsdangerous==1.1.0\nJinja2==2.10.3\nMarkupSafe==1.1.1\nWerkzeug==0.16.0",
        },
        {
          t: "p",
          c: "เมื่อทำงานเสร็จแล้ว ควร deactivate โปรเจกต์ที่ active อยู่โดยใช้คำสั่ง deactivate:",
        },
        {
          t: "code",
          lang: "shell",
          c: "(venv) asabeneh@Asabeneh:~/Desktop/30DaysOfPython$ deactivate",
        },
        {
          t: "p",
          c: "โมดูลที่จำเป็นสำหรับการทำงานกับ flask ถูกติดตั้งแล้ว ตอนนี้ directory โปรเจกต์ของคุณพร้อมสำหรับ flask project แล้ว ควรเพิ่ม venv ลงใน .gitignore เพื่อไม่ให้ push ขึ้น GitHub",
        },

        { t: "h2", c: "💻 แบบฝึกหัด: วันที่ 23" },
        {
          t: "ol",
          c: [
            "สร้าง project directory พร้อม virtual environment ตามตัวอย่างที่ให้ไว้ข้างต้น",
          ],
        },
      ],
      en: [],
    },
  },
};
