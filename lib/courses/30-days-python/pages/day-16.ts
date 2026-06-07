import type { Page } from "@/lib/types";

const IMG =
  "https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images";

export const day16Page: Record<string, Page> = {
  "py30-day16": {
    slug: "py30-day16",
    title: "วันที่ 16 — วันที่และเวลา (Python DateTime)",
    lead: "เรียนรู้การจัดการวันที่และเวลาใน Python ด้วย datetime module ตั้งแต่การดึงข้อมูลวันเวลา การ format ด้วย strftime จนถึง timedelta",
    group: "สัปดาห์ที่ 4: เทคนิคระดับกลาง",
    blocks: [
      { t: "h2", c: "Python datetime" },
      { t: "p", c: "Python มี module ชื่อ datetime สำหรับจัดการวันที่และเวลา" },

      { t: "h3", c: "การดึงข้อมูล datetime" },
      {
        t: "code",
        lang: "python",
        c: "from datetime import datetime\nnow = datetime.now()\nprint(now)                      # 2021-07-08 07:34:46.549883\nday = now.day                   # 8\nmonth = now.month               # 7\nyear = now.year                 # 2021\nhour = now.hour                 # 7\nminute = now.minute             # 38\nsecond = now.second\ntimestamp = now.timestamp()\nprint(day, month, year, hour, minute)\nprint('timestamp', timestamp)\nprint(f'{day}/{month}/{year}, {hour}:{minute}')  # 8/7/2021, 7:38",
      },

      { t: "h2", c: "การ Format วันที่ด้วย strftime" },
      { t: "p", c: "strftime ใช้ format เวลาเป็น string ที่อ่านง่าย:" },
      {
        t: "code",
        lang: "python",
        c: "from datetime import datetime\nnew_year = datetime(2020, 1, 1)\nprint(new_year)          # 2020-01-01 00:00:00\nday = new_year.day\nmonth = new_year.month\nyear = new_year.year\nhour = new_year.hour\nminute = new_year.minute\nsecond = new_year.second\nprint(day, month, year, hour, minute) # 1 1 2020 0 0\nprint(f'{day}/{month}/{year}, {hour}:{minute}')  # 1/1/2020, 0:0",
      },
      { t: "p", c: "การ format ด้วย format strings ต่าง ๆ:" },
      {
        t: "code",
        lang: "python",
        c: "from datetime import datetime\nnow = datetime.now()\nt = now.strftime(\"%H:%M:%S\")\nprint(\"time:\", t)\ntime_one = now.strftime(\"%m/%d/%Y, %H:%M:%S\")\n# mm/dd/YY H:M:S format\nprint(\"time one:\", time_one)\ntime_two = now.strftime(\"%d/%m/%Y, %H:%M:%S\")\n# dd/mm/YY H:M:S format\nprint(\"time two:\", time_two)",
      },
      {
        t: "image",
        src: `${IMG}/strftime.png`,
        alt: "strftime formatting symbols",
        caption: "strftime symbols สำหรับ format วันเวลาใน Python",
      },

      { t: "h2", c: "การแปลง String เป็น Datetime ด้วย strptime" },
      { t: "p", c: "strptime ใช้แปลง string เป็น datetime object:" },
      {
        t: "code",
        lang: "python",
        c: "from datetime import datetime\ndate_string = \"5 December, 2019\"\nprint(\"date_string =\", date_string)\ndate_object = datetime.strptime(date_string, \"%d %B, %Y\")\nprint(\"date_object =\", date_object)",
      },

      { t: "h2", c: "การใช้ date จาก datetime" },
      {
        t: "code",
        lang: "python",
        c: "from datetime import date\nd = date(2020, 1, 1)\nprint(d)\nprint('Current date:', d.today())    # 2019-12-05\n# date object of today\ntoday = date.today()\nprint(\"Current year:\", today.year)   # 2019\nprint(\"Current month:\", today.month) # 12\nprint(\"Current day:\", today.day)     # 5",
      },

      { t: "h2", c: "Time Object เพื่อแสดงเวลา" },
      {
        t: "code",
        lang: "python",
        c: "from datetime import time\n# time(hour = 0, minute = 0, second = 0)\na = time(10, 30, 50)\nprint(a)\nprint('hour:', a.hour)     # 10\nprint('minute:', a.minute) # 30\nprint('second:', a.second) # 50",
      },

      { t: "h2", c: "ความแตกต่างระหว่างสองช่วงเวลาด้วย timedelta" },
      {
        t: "code",
        lang: "python",
        c: "from datetime import date, timedelta\ntoday = date(year=2019, month=12, day=5)\nnew_year = date(year=2020, month=1, day=1)\ntime_left_for_new_year = new_year - today\nprint('Time left for new year: ', time_left_for_new_year) # 27 days, 0:00:00\nprint('Time left for new year: ', time_left_for_new_year.days) # 27",
      },
      {
        t: "code",
        lang: "python",
        c: "from datetime import datetime\nt1 = datetime(year = 2019, month = 12, day = 5, hour = 0, minute = 59, second = 0)\nt2 = datetime(year = 2020, month = 1, day = 1, hour = 0, minute = 0, second = 0)\ndiff = t2 - t1\nprint('Time left for new year:', diff) # 26 days, 23: 01: 00",
      },
      {
        t: "code",
        lang: "python",
        c: "from datetime import timedelta\nt1 = timedelta(weeks=12, days=10, hours=4, seconds=20)\nt2 = timedelta(days=7, hours=5, minutes=3, seconds=30)\nt3 = t1 - t2\nprint(\"t3 =\", t3)  # 88 days, 22:56:50",
      },

      { t: "h2", c: "💻 แบบฝึกหัด — วันที่ 16" },
      {
        t: "ol",
        c: [
          "ดึง year, month, weekday, hour, minute และ timestamp จาก datetime module ของเวลาปัจจุบัน",
          "Format วันที่ปัจจุบันในรูปแบบ \"%m/%d/%Y, %H:%M:%S\"",
          "วันนี้เป็น 5 ธันวาคม 2019 เปลี่ยน string เวลานี้เป็น time format",
          "คำนวณความต่างระหว่างเวลาปัจจุบันกับปีใหม่",
          "คำนวณความต่างระหว่าง 1 มกราคม 1970 กับวันนี้",
          "คิดว่าทำอะไรกับ datetime module ได้บ้าง ลองค้นหา example เพิ่มเติม",
        ],
      },
    ],
  },
};
