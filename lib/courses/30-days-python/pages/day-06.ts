import type { Page } from "@/lib/types";

const IMG = "https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images";

export const day06Page: Record<string, Page> = {
  "py30-day06": {
    slug: "py30-day06",
    title: { th: "วันที่ 6 — ทูเพิล (Tuples)", en: "" },
    lead: { th: "เรียนรู้ Tuple ใน Python — โครงสร้างข้อมูลที่มีลำดับและเปลี่ยนแปลงไม่ได้ (immutable)", en: "" },
    group: "สัปดาห์ที่ 2: โครงสร้างข้อมูล & การควบคุม",
    blocks: {
      th: [
        { t: "h2", c: "ทูเพิล (Tuples)" },
        { t: "p", c: "Tuple คือ collection ของชนิดข้อมูลต่าง ๆ ที่มีลำดับและเปลี่ยนแปลงไม่ได้ (ordered and unchangeable/immutable) Tuple เขียนด้วยวงเล็บกลม () เมื่อสร้าง tuple แล้วเราไม่สามารถเปลี่ยนค่าได้ ไม่สามารถใช้ add, insert, remove methods ได้เหมือน list เพราะ tuple ไม่ใช่ mutable Tuple มี methods น้อยกว่า list methods ที่เกี่ยวข้องกับ tuple:" },
        { t: "ul", c: [
          "count: นับจำนวนสมาชิกที่ระบุใน tuple",
          "index: หา index ของสมาชิกที่ระบุใน tuple",
          "+ operator: ใช้ต่อ tuple สองตัวหรือมากกว่าเข้าด้วยกันเพื่อสร้าง tuple ใหม่",
        ]},

        { t: "h3", c: "การสร้าง Tuple" },
        { t: "p", c: "สร้าง empty tuple:" },
        { t: "code", lang: "python", c: "# syntax\nempty_tuple = ()\n# หรือใช้ tuple constructor\nempty_tuple = tuple()" },
        { t: "p", c: "สร้าง tuple ที่มีค่าเริ่มต้น:" },
        { t: "code", lang: "python", c: "# syntax\ntpl = ('item1', 'item2','item3')\nfruits = ('banana', 'orange', 'mango', 'lemon')" },

        { t: "h3", c: "ความยาวของ Tuple" },
        { t: "p", c: "ใช้ len() เพื่อหาความยาวของ tuple:" },
        { t: "code", lang: "python", c: "tpl = ('item1', 'item2', 'item3')\nlen(tpl)" },

        { t: "h3", c: "การเข้าถึงสมาชิกใน Tuple" },
        { t: "p", c: "Positive Indexing: เช่นเดียวกับ list การนับเริ่มจาก 0" },
        { t: "image", src: `${IMG}/tuples_index.png`, alt: "Tuple indexing", caption: "การนับ index ของ tuple ใน Python" },
        { t: "code", lang: "python", c: "tpl = ('item1', 'item2', 'item3')\nfirst_item = tpl[0]\nsecond_item = tpl[1]\nfruits = ('banana', 'orange', 'mango', 'lemon')\nfirst_fruit  = fruits[0]\nsecond_fruit = fruits[1]\nlast_index   = len(fruits) - 1\nlast_fruit   = fruits[last_index]" },
        { t: "p", c: "Negative Indexing: นับจากท้าย โดย -1 คือสมาชิกตัวสุดท้าย" },
        { t: "image", src: `${IMG}/tuple_negative_indexing.png`, alt: "Tuple negative indexing", caption: "การใช้ negative index กับ tuple ใน Python" },
        { t: "code", lang: "python", c: "tpl = ('item1', 'item2', 'item3','item4')\nfirst_item   = tpl[-4]\nsecond_item  = tpl[-3]\nfruits = ('banana', 'orange', 'mango', 'lemon')\nfirst_fruit  = fruits[-4]\nsecond_fruit = fruits[-3]\nlast_fruit   = fruits[-1]" },

        { t: "h3", c: "การตัด Tuple (Slicing)" },
        { t: "p", c: "Range of Positive Indexes:" },
        { t: "code", lang: "python", c: "tpl = ('item1', 'item2', 'item3','item4')\nall_items         = tpl[0:4]\nall_items         = tpl[0:]\nmiddle_two_items  = tpl[1:3]\nfruits = ('banana', 'orange', 'mango', 'lemon')\nall_fruits        = fruits[0:4]\nall_fruits        = fruits[0:]\norange_mango      = fruits[1:3]\norange_to_the_rest = fruits[1:]" },
        { t: "p", c: "Range of Negative Indexes:" },
        { t: "code", lang: "python", c: "tpl = ('item1', 'item2', 'item3','item4')\nall_items        = tpl[-4:]\nmiddle_two_items = tpl[-3:-1]\nfruits = ('banana', 'orange', 'mango', 'lemon')\nall_fruits   = fruits[-4:]\norange_mango = fruits[-3:-1]\norange_to_the_rest = fruits[-3:]" },

        { t: "h3", c: "การแปลง Tuple เป็น List" },
        { t: "p", c: "เนื่องจาก tuple ไม่สามารถแก้ไขได้โดยตรง เราสามารถแปลงเป็น list แก้ไข แล้วแปลงกลับเป็น tuple:" },
        { t: "code", lang: "python", c: "tpl = ('item1', 'item2', 'item3','item4')\nlst = list(tpl)\nfruits = ('banana', 'orange', 'mango', 'lemon')\nfruits = list(fruits)\nfruits[0] = 'apple'\nprint(fruits)     # ['apple', 'orange', 'mango', 'lemon']\nfruits = tuple(fruits)\nprint(fruits)     # ('apple', 'orange', 'mango', 'lemon')" },

        { t: "h3", c: "การเช็คสมาชิกใน Tuple" },
        { t: "p", c: "ใช้ตัวดำเนินการ in เพื่อตรวจสอบว่าสมาชิกมีอยู่ใน tuple หรือไม่:" },
        { t: "code", lang: "python", c: "tpl = ('item1', 'item2', 'item3','item4')\n'item2' in tpl    # True\nfruits = ('banana', 'orange', 'mango', 'lemon')\nprint('orange' in fruits) # True\nprint('apple' in fruits)  # False\nfruits[0] = 'apple'       # TypeError: 'tuple' object does not support item assignment" },

        { t: "h3", c: "การต่อ Tuple" },
        { t: "p", c: "ใช้ + เพื่อต่อ tuple หลายตัวเข้าด้วยกัน:" },
        { t: "code", lang: "python", c: "tpl1 = ('item1', 'item2', 'item3')\ntpl2 = ('item4', 'item5','item6')\ntpl3 = tpl1 + tpl2\nfruits = ('banana', 'orange', 'mango', 'lemon')\nvegetables = ('Tomato', 'Potato', 'Cabbage','Onion', 'Carrot')\nfruits_and_vegetables = fruits + vegetables" },

        { t: "h3", c: "การลบ Tuple" },
        { t: "p", c: "ไม่สามารถลบสมาชิกแต่ละตัวออกจาก tuple ได้ แต่สามารถลบ tuple ทั้งก้อนด้วย del:" },
        { t: "code", lang: "python", c: "tpl1 = ('item1', 'item2', 'item3')\ndel tpl1\nfruits = ('banana', 'orange', 'mango', 'lemon')\ndel fruits" },

        { t: "h2", c: "💻 แบบฝึกหัด — วันที่ 6" },

        { t: "h3", c: "ระดับ 1" },
        { t: "ol", c: [
          "สร้าง empty tuple",
          "สร้าง tuple ที่มีชื่อพี่น้องของคุณ (ถ้าไม่มีก็จินตนาการได้)",
          "Join brothers และ sisters tuples แล้วเก็บในตัวแปร siblings",
          "คุณมีพี่น้องกี่คน?",
          "Modify the siblings tuple โดยเพิ่มชื่อพ่อและแม่แล้วเก็บในตัวแปร family_members",
        ]},

        { t: "h3", c: "ระดับ 2" },
        { t: "ol", c: [
          "Unpack siblings และ parents จาก family_members",
          "สร้าง fruits, vegetables และ animal products tuples แล้ว join ทั้งสามเก็บในตัวแปร food_stuff_tp",
          "แปลง food_stuff_tp tuple เป็น food_stuff_lt list",
          "Slice out สมาชิกตรงกลางจาก food_stuff_tp tuple หรือ food_stuff_lt list",
          "Slice out สามตัวแรกและสามตัวท้ายจาก food_stuff_lt list",
          "ลบ food_stuff_tp tuple ทิ้งทั้งหมด",
          "เช็คว่าสมาชิกมีอยู่ใน tuple หรือไม่:\n- เช็คว่า 'Estonia' เป็นประเทศ nordic หรือไม่\n- เช็คว่า 'Iceland' เป็นประเทศ nordic หรือไม่",
        ]},
        { t: "code", lang: "python", c: "nordic_countries = ('Denmark', 'Finland','Iceland', 'Norway', 'Sweden')" },
      ],
      en: [],
    },
  },
};
