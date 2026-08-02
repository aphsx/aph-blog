import type { Page } from "@/lib/types";

export const systemDesignPages: Record<string, Page> = {
  "system-design": {
    slug: "system-design",
    title: { th: "System Design", en: "" },
    lead: { th: "ออกแบบระบบขนาดใหญ่ — สำคัญมากสำหรับระดับ mid-senior", en: "" },
    group: "รอบอื่น ๆ",
    blocks: {
      th: [
        { t: "p", c: "รอบ system design ทดสอบความสามารถในการออกแบบระบบที่รองรับผู้ใช้จำนวนมาก ไม่มีคำตอบเดียวที่ถูก ผู้สัมภาษณ์ดูว่าคุณคิดถึง trade-off ต่าง ๆ อย่างไรและสื่อสารได้ชัดแค่ไหน รอบนี้มักเริ่มมีน้ำหนักตั้งแต่ระดับ mid-level ขึ้นไป" },
        { t: "h2", c: "กรอบการตอบ (Framework)" },
        {
          t: "ol",
          c: [
            "Requirements — ถามให้ชัดทั้ง functional (ระบบต้องทำอะไรได้) และ non-functional (scale, latency, ความพร้อมใช้งาน)",
            "Estimation — ประเมินจำนวนผู้ใช้, QPS, ปริมาณข้อมูล/storage แบบคร่าว ๆ",
            "API design — กำหนด endpoint หลัก ๆ และรูปแบบ request/response",
            "High-level design — วาด component หลัก: client, load balancer, service, database, cache",
            "Deep dive — เจาะส่วนสำคัญ เช่น schema ฐานข้อมูล, การ scale, การจัดการ bottleneck",
            "Trade-offs — สรุปข้อดีข้อเสียของแต่ละทางเลือก",
          ],
        },
        { t: "h2", c: "แนวคิดพื้นฐานที่ต้องรู้" },
        {
          t: "ul",
          c: [
            "Load balancing — กระจาย request ไปหลายเครื่อง",
            "Caching — ลดภาระ database ด้วย Redis/Memcached (เข้าใจ cache invalidation)",
            "Database — เลือกระหว่าง SQL กับ NoSQL ตามรูปแบบข้อมูลและ query",
            "Replication & Sharding — ทำสำเนาและแบ่งข้อมูลเพื่อ scale",
            "Message queue — แยกงานแบบ async ด้วย Kafka/RabbitMQ",
            "CAP theorem — เข้าใจ trade-off ระหว่าง consistency กับ availability",
          ],
        },
        {
          t: "callout",
          title: "โจทย์ที่เจอบ่อย",
          c: "ออกแบบ URL shortener, ระบบแชต, news feed, ระบบจองตั๋ว, rate limiter, ระบบอัปโหลดวิดีโอ — ฝึกอธิบายแต่ละอันให้ครบกรอบด้านบน",
        },
        { t: "h2", c: "SQL vs NoSQL" },
        {
          t: "table",
          head: ["ประเด็น", "SQL", "NoSQL"],
          rows: [
            ["โครงสร้าง", "schema ตายตัว มีความสัมพันธ์", "ยืดหยุ่น schema-less"],
            ["Consistency", "แข็งแรง (ACID)", "มักเป็น eventual"],
            ["Scale", "scale แนวตั้งง่ายกว่า", "scale แนวนอนง่ายกว่า"],
            ["เหมาะกับ", "ธุรกรรมการเงิน ข้อมูลสัมพันธ์กัน", "ข้อมูลมหาศาล อ่าน/เขียนเร็ว"],
          ],
        },
        { t: "h2", c: "หัวข้อใหม่ที่ถูกถามเพิ่มในปี 2026" },
        { t: "p", c: "ระบบยุคใหม่มี AI เข้ามาเกี่ยวข้องมากขึ้น ผู้สัมภาษณ์ที่บริษัท product เริ่มถามหัวข้อกลุ่มนี้ — เข้าใจระดับแนวคิดก็พอ ไม่ต้องลงลึกระดับ implement" },
        {
          t: "ul",
          c: [
            "Vector database (Pinecone, Weaviate, pgvector) — เก็บ embedding เพื่อค้นแบบ semantic search",
            "RAG (Retrieval-Augmented Generation) — ต่อ LLM เข้ากับฐานความรู้ของบริษัท",
            "Event-driven architecture — ออกแบบระบบที่สื่อสารผ่าน event/stream",
            "Observability — logging, metrics, tracing (เช่น OpenTelemetry) เพื่อมองเห็นปัญหาใน production",
            "CDN & edge computing — ลด latency ด้วยการประมวลผลใกล้ผู้ใช้",
            "Rate limiting & idempotency — กันระบบล่มและกัน request ซ้ำ",
          ],
        },
        { t: "h2", c: "ระบบที่ควรฝึกออกแบบ" },
        { t: "p", c: "ฝึกอธิบายแต่ละระบบให้ครบกรอบด้านบน เรียงจากง่ายไปยาก" },
        {
          t: "ol",
          c: [
            "URL shortener (เริ่มง่ายที่สุด เข้าใจ hashing + redirect)",
            "Rate limiter",
            "News feed / Twitter timeline",
            "ระบบแชต (WhatsApp / LINE)",
            "ระบบจองตั๋ว / ที่นั่ง (จัดการ concurrency)",
            "YouTube / ระบบอัปโหลดและสตรีมวิดีโอ",
            "Google Drive / ระบบเก็บไฟล์",
            "Search autocomplete",
          ],
        },
      ],
      en: [],
    },
  },
};
