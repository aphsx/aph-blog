import type { Page } from "@/lib/types";

const IMG =
  "https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images";

export const day18Page: Record<string, Page> = {
  "py30-day18": {
    slug: "py30-day18",
    title: "วันที่ 18 — Regular Expressions",
    lead: "เรียนรู้ Regular Expressions ใน Python ด้วย re module สำหรับค้นหาและจัดการ pattern ใน string",
    group: "สัปดาห์ที่ 4: เทคนิคระดับกลาง",
    blocks: [
      { t: "h2", c: "Regular Expressions" },
      {
        t: "p",
        c: "Regular expression หรือ RegEx คือ string ชนิดพิเศษที่ช่วยค้นหา pattern ใน data เขียนด้วย built-in module ชื่อ re ใน Python",
      },
      {
        t: "p",
        c: "เมื่อ pattern พบใน string จะ return match object แต่ถ้าไม่พบจะ return None",
      },

      { t: "h2", c: "re Module" },
      {
        t: "p",
        c: "หลังจาก import module เราสามารถใช้ได้ดังนี้:",
      },
      { t: "code", lang: "python", c: "import re" },

      { t: "h3", c: "Methods ใน re Module" },
      {
        t: "p",
        c: "re module มี methods หลายตัว โดยทั่วไปใช้ match, search, findall, finditer, sub และ split",
      },

      { t: "h3", c: "re.match()" },
      {
        t: "p",
        c: "ค้นหา pattern ที่ตำแหน่งแรกสุดของ string เท่านั้น:",
      },
      {
        t: "code",
        lang: "python",
        c: "import re\ntxt = 'I love to teach python and javaScript'\n# It returns an object with span, and match\nmatch = re.match('I love to teach', txt, re.I)\nprint(match)  # <re.Match object; span=(0, 15), match='I love to teach'>\n# We can get the starting and ending position of the match as tuple using span\nspan = match.span()\nprint(span)     # (0, 15)\n# Lets find the start and stop position from the span\nstart, end = span\nprint(start, end)  # 0, 15\nsubstring = txt[start:end]\nprint(substring)       # I love to teach",
      },

      { t: "h3", c: "re.search()" },
      {
        t: "p",
        c: "ค้นหา pattern ตำแหน่งแรกที่พบทั่วทั้ง string:",
      },
      {
        t: "code",
        lang: "python",
        c: "import re\ntxt = '''Love is the most beautiful thing in the world.\nThis world is full of love.\nLove is the only genuine feeling that can make the world a better place.'''\nmatch = re.search('This world', txt, re.I)\nprint(match)  # <re.Match object; span=(47, 57), match='This world'>\nspan = match.span()\nstart, end = span\nsubstring = txt[start:end]\nprint(substring)  # This world",
      },

      { t: "h3", c: "re.findall()" },
      {
        t: "p",
        c: "คืนค่า list ของ matches ทั้งหมด:",
      },
      {
        t: "code",
        lang: "python",
        c: "import re\ntxt = '''Love is the most beautiful thing in the world.\nThis world is full of love.\nLove is the only genuine feeling that can make the world a better place.'''\nmatches = re.findall('love', txt, re.I)\nprint(matches)  # ['Love', 'love', 'Love']",
      },

      { t: "h3", c: "re.sub()" },
      {
        t: "p",
        c: "แทนที่ substring หนึ่งหรือหลายตัวด้วย string ใหม่:",
      },
      {
        t: "code",
        lang: "python",
        c: "import re\ntxt = '''Love is the most beautiful thing in the world.\nThis world is full of love.\nLove is the only genuine feeling that can make the world a better place.'''\nmatch_replaced = re.sub('Love', 'Like', txt, re.I)\nprint(match_replaced)",
      },

      { t: "h3", c: "re.split()" },
      {
        t: "p",
        c: "แบ่ง string ตาม pattern:",
      },
      {
        t: "code",
        lang: "python",
        c: "import re\ntxt = '''I am teacher and  I love teaching.\nThere is nothing as fulfilling as educating and empowering people.\nI found teaching is the best way to transform people.'''\nprint(re.split('\\n', txt)) # splitting using \\n - end of line symbol",
      },

      { t: "h2", c: "Writing RegEx Patterns" },
      {
        t: "p",
        c: "ตัวอักษรพิเศษ (meta-characters) ที่ใช้ใน regex:",
      },
      {
        t: "image",
        src: `${IMG}/regex.png`,
        alt: "Regular Expression cheat sheet",
        caption: "Regular Expression meta-characters cheat sheet",
      },
      {
        t: "ul",
        c: [
          "[]:  กลุ่มตัวอักษร\n  [a-c] หมายถึง a หรือ b หรือ c\n  [a-z] หมายถึงตัวอักษรใดก็ได้จาก a ถึง z\n  [A-Z] หมายถึงตัวอักษรใดก็ได้จาก A ถึง Z\n  [0-3] หมายถึง 0 หรือ 1 หรือ 2 หรือ 3\n  [0-9] หมายถึงตัวเลขใดก็ได้จาก 0 ถึง 9\n  [a-zA-Z0-9] หมายถึงตัวอักษรหรือตัวเลขใดก็ได้",
          "\\:  ใช้ escape ตัวอักษรพิเศษ\n  \\d หมายถึง: string ที่มีตัวเลข (0-9)\n  \\D หมายถึง: string ที่ไม่มีตัวเลข",
          ".:  ตัวอักษรใดก็ได้ยกเว้น newline (\\n)",
          "^:  ขึ้นต้นด้วย\n  r'^substring' เช่น r'^love' หมายถึงประโยคที่ขึ้นต้นด้วย love\n  r'[^abc]' หมายถึงไม่ใช่ a ไม่ใช่ b ไม่ใช่ c",
          "$:  ลงท้ายด้วย\n  r'substring$' เช่น r'love$' หมายถึงประโยคที่ลงท้ายด้วย love",
          "*:  ศูนย์ครั้งหรือมากกว่า\n  r'[a]*' หมายถึง a มีหรือไม่มีก็ได้หรือซ้ำหลายครั้ง",
          "+:  หนึ่งครั้งหรือมากกว่า\n  r'[a]+' หมายถึง a อย่างน้อยหนึ่งครั้ง",
          "?:  ศูนย์หรือหนึ่งครั้ง\n  r'[a]?' หมายถึง a ไม่มีหรือมีหนึ่งครั้ง",
          "{n}:  ระบุจำนวนครั้ง\n  r'[a]{3}' หมายถึง a พอดี 3 ครั้ง\n  r'[a]{3,}' หมายถึง a อย่างน้อย 3 ครั้ง",
          "|:  either or\n  r'apple|banana' หมายถึง apple หรือ banana",
          "():  group และ capture\n  r'(\\d+)' หมายถึงตัวเลขหนึ่งตัวหรือมากกว่า",
        ],
      },

      { t: "h3", c: "ตัวอย่างการใช้ Pattern" },
      {
        t: "code",
        lang: "python",
        c: "import re\n\ntxt = 'I am 19 years old and I live in Finland. My phone number is 0944135287.'\nprint(re.findall('\\d+', txt))  # digits\nprint(re.findall('[aeiou]', txt))  # vowels\nprint(re.findall(r'\\b[A-Z][a-z]*\\b', txt))  # words starting with capital letter",
      },

      { t: "h2", c: "💻 แบบฝึกหัด — วันที่ 18" },

      { t: "h3", c: "ระดับ 1" },
      {
        t: "ol",
        c: [
          "หาคำที่ปรากฏบ่อยที่สุดในย่อหน้าต่อไปนี้ โดยใช้ regex ลบเครื่องหมายวรรคตอนออกก่อน:",
        ],
      },
      {
        t: "code",
        lang: "python",
        c: "paragraph = 'I love teaching. If you do not love teaching what else can you love. I love Python if you do not love something which can give you all the capabilities to develop an application what else can you love.'",
      },
      {
        t: "ol",
        c: [
          "ใช้ regex ดึงตัวเลข (ระยะทาง) ออกจากข้อความต่อไปนี้:",
        ],
        start: 2,
      },
      {
        t: "code",
        lang: "python",
        c: "sentence = '''The distance between Dublin and London is 464 km,\nthe distance between Dublin and Belfast is 161 km,\nthe distance between London and Belfast is 521 km,\nthe distance between New York and Seoul is 11,021 km,\nthe distance between New York and Accra is 10,239 km'''",
      },

      { t: "h3", c: "ระดับ 2" },
      {
        t: "ol",
        c: [
          "ทำความสะอาด string ต่อไปนี้ (ลบตัวอักษรพิเศษ) แล้วหาคำที่ปรากฏบ่อยที่สุด:",
        ],
      },
      {
        t: "code",
        lang: "python",
        c: "txt = '''%I $am@% a %tea@cher%, &and& I lo%#ve %tea@ching%. &There $is nothing &as &giving &as teaching. %I $am@% a %tea@cher%, &and& I lo%#ve %tea@ching%.'''",
      },

      { t: "h3", c: "ระดับ 3" },
      {
        t: "ol",
        c: [
          "Clean the following text and find the most frequent word (hint, use replace and regex):",
        ],
      },
      {
        t: "code",
        lang: "python",
        c: "sentence = '''\"\"\"Backslash and special characters \\n\\t\\r are common in programming.\n\\\"Quotes\\\" and other $pecial characters #need@ careful *handling*.\"\"\"'''",
      },
    ],
  },
};
