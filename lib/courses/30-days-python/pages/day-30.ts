import type { Page } from "@/lib/types";

const IMG = "https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images";

export const day30Page: Record<string, Page> = {
  "py30-day30": {
    slug: "py30-day30",
    title: { th: "วันที่ 30 — บทสรุปและก้าวต่อไป (Conclusions)", en: "" },
    lead: { th: "ยินดีด้วย! คุณมาถึงวันสุดท้ายของ 30 Days of Python แล้ว — บทสรุปและก้าวต่อไปในสายอาชีพ", en: "" },
    group: "สัปดาห์ที่ 6: เว็บ & API",
    blocks: {
      th: [
        { t: "image", src: `${IMG}/30DaysOfPython_banner3@2x.png`, alt: "30 Days of Python Banner", caption: "30 Days of Python — Day 30" },

        { t: "h2", c: "บทสรุป (Conclusions)" },

        { t: "p", c: "ในกระบวนการจัดทำเนื้อหานี้ ผมได้เรียนรู้มากมาย และคุณก็เป็นแรงบันดาลใจให้ผมทำมากขึ้นเรื่อยๆ ขอแสดงความยินดีที่คุณมาถึงระดับนี้แล้ว หากคุณได้ทำแบบฝึกหัดและโปรเจกต์ทั้งหมดครบแล้ว ตอนนี้คุณพร้อมที่จะก้าวไปสู่เส้นทาง data analysis, data science, machine learning หรือ web development แล้ว" },
        { t: "p", c: "สนับสนุนผู้เขียนเพื่อสื่อการเรียนรู้เพิ่มเติมได้ที่ https://www.paypal.com/paypalme/asabeneh" },

        { t: "h2", c: "ข้อความรับรอง (Testimony)" },

        { t: "p", c: "ถึงเวลาแล้วที่จะแสดงความคิดเห็นของคุณเกี่ยวกับผู้เขียนและ 30DaysOfPython คุณสามารถฝากข้อความรับรองของคุณได้ที่ลิงก์นี้: https://www.asabeneh.com/testimonials" },
        { t: "p", c: "ส่ง Feedback ได้ที่: http://thirtydayofpython-api.herokuapp.com/feedback" },

        { t: "p", c: "🎉 ยินดีด้วย ! 🎉" },
      ],
      en: [],
    },
  },
};
