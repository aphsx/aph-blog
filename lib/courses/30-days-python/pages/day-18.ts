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
      { t: "h3", c: "Square Bracket" },
      {
        t: "p",
        c: "ใช้ square bracket เพื่อระบุกลุ่มตัวอักษร เช่น [Aa] หมายถึง A หรือ a:",
      },
      {
        t: "code",
        lang: "python",
        c: "regex_pattern = r'[Aa]pple' # this square bracket mean either A or a\ntxt = 'Apple and banana are fruits. An old cliche says an apple a day a doctor way has been replaced by a banana a day keeps the doctor far far away.'\nmatches = re.findall(regex_pattern, txt)\nprint(matches)  # ['Apple', 'apple']\n\nregex_pattern = r'[Aa]pple|[Bb]anana' # this square bracket means either A or a\ntxt = 'Apple and banana are fruits. An old cliche says an apple a day a doctor way has been replaced by a banana a day keeps the doctor far far away.'\nmatches = re.findall(regex_pattern, txt)\nprint(matches)  # ['Apple', 'banana', 'apple', 'banana']",
      },

      { t: "h3", c: "Escape character(\\) in RegEx" },
      {
        t: "p",
        c: "ใช้ backslash เพื่อระบุตัวอักษรพิเศษ เช่น \\d หมายถึงตัวเลข:",
      },
      {
        t: "code",
        lang: "python",
        c: "regex_pattern = r'\\d'  # d is a special character which means digits\ntxt = 'This regular expression example was made on December 6,  2019 and revised on July 8, 2021'\nmatches = re.findall(regex_pattern, txt)\nprint(matches)  # ['6', '2', '0', '1', '9', '8', '2', '0', '2', '1'], this is not what we want",
      },

      { t: "h3", c: "One or more times(+)" },
      {
        t: "p",
        c: "+ หมายถึงหนึ่งครั้งหรือมากกว่า ใช้ร่วมกับ pattern เพื่อจับกลุ่มตัวอักษรที่ปรากฏต่อเนื่องกัน:",
      },
      {
        t: "code",
        lang: "python",
        c: "regex_pattern = r'\\d+'  # d is a special character which means digits, + mean one or more times\ntxt = 'This regular expression example was made on December 6,  2019 and revised on July 8, 2021'\nmatches = re.findall(regex_pattern, txt)\nprint(matches)  # ['6', '2019', '8', '2021'] - now, this is better!",
      },

      { t: "h3", c: "Period(.)" },
      {
        t: "p",
        c: ". หมายถึงตัวอักษรใดก็ได้ยกเว้น newline:",
      },
      {
        t: "code",
        lang: "python",
        c: "regex_pattern = r'[a].'  # this square bracket means a and . means any character except new line\ntxt = '''Apple and banana are fruits'''\nmatches = re.findall(regex_pattern, txt)\nprint(matches)  # ['an', 'an', 'an', 'a ', 'ar']\n\nregex_pattern = r'[a].+'  # . any character, + any character one or more times\nmatches = re.findall(regex_pattern, txt)\nprint(matches)  # ['and banana are fruits']",
      },

      { t: "h3", c: "Zero or more times(*)" },
      {
        t: "p",
        c: "* หมายถึงศูนย์ครั้งหรือมากกว่า pattern อาจไม่ปรากฏเลยหรือปรากฏกี่ครั้งก็ได้:",
      },
      {
        t: "code",
        lang: "python",
        c: "regex_pattern = r'[a].*'  # . any character, * any character zero or more times\ntxt = '''Apple and banana are fruits'''\nmatches = re.findall(regex_pattern, txt)\nprint(matches)  # ['and banana are fruits']",
      },

      { t: "h3", c: "Zero or one time(?)" },
      {
        t: "p",
        c: "? หมายถึงศูนย์หรือหนึ่งครั้ง pattern อาจไม่ปรากฏหรือปรากฏเพียงครั้งเดียว:",
      },
      {
        t: "code",
        lang: "python",
        c: "txt = '''I am not sure if there is a convention how to write the word e-mail.\nSome people write it as email others may write it as Email or E-mail.'''\nregex_pattern = r'[Ee]-?mail'  # ? means here that '-' is optional\nmatches = re.findall(regex_pattern, txt)\nprint(matches)  # ['e-mail', 'email', 'Email', 'E-mail']",
      },

      { t: "h3", c: "Quantifier in RegEx" },
      {
        t: "p",
        c: "ใช้ curly bracket เพื่อระบุความยาวของ substring ที่ต้องการค้นหา:",
      },
      {
        t: "code",
        lang: "python",
        c: "txt = 'This regular expression example was made on December 6,  2019 and revised on July 8, 2021'\nregex_pattern = r'\\d{4}'  # exactly four times\nmatches = re.findall(regex_pattern, txt)\nprint(matches)  # ['2019', '2021']\n\ntxt = 'This regular expression example was made on December 6,  2019 and revised on July 8, 2021'\nregex_pattern = r'\\d{1,4}'\nmatches = re.findall(regex_pattern, txt)\nprint(matches)  # ['6', '2019', '8', '2021']",
      },

      { t: "h3", c: "Cart ^" },
      {
        t: "p",
        c: "^ ใช้สองแบบ: ขึ้นต้นด้วย (starts with) และการปฏิเสธ (negation) ใน set:",
      },
      {
        t: "code",
        lang: "python",
        c: "txt = 'This regular expression example was made on December 6,  2019 and revised on July 8, 2021'\nregex_pattern = r'^This'  # ^ means starts with\nmatches = re.findall(regex_pattern, txt)\nprint(matches)  # ['This']\n\ntxt = 'This regular expression example was made on December 6,  2019 and revised on July 8, 2021'\nregex_pattern = r'[^A-Za-z ]+'  # ^ in set character means negation, not A to Z, not a to z, no space\nmatches = re.findall(regex_pattern, txt)\nprint(matches)  # ['6,', '2019', '8', '2021']",
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
