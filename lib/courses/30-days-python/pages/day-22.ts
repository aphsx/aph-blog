import type { Page } from "@/lib/types";

const IMG =
  "https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images";

export const day22Page: Record<string, Page> = {
  "py30-day22": {
    slug: "py30-day22",
    title: "วันที่ 22 — Web Scraping",
    lead: "เรียนรู้การดึงข้อมูลจากเว็บไซต์ด้วย Python โดยใช้ requests และ BeautifulSoup4 เพื่อเก็บข้อมูลและนำไปใช้งานในรูปแบบต่างๆ",
    group: "สัปดาห์ที่ 5: OOP & ข้อมูล",
    blocks: [
      {
        t: "image",
        src: `${IMG}/30DaysOfPython_banner3@2x.png`,
        alt: "30 Days of Python banner",
        caption: "30 Days of Python",
      },

      { t: "h2", c: "Python Web Scraping" },

      { t: "h3", c: "Web Scraping คืออะไร (What is Web Scraping)" },
      {
        t: "p",
        c: "อินเทอร์เน็ตเต็มไปด้วยข้อมูลจำนวนมหาศาลที่สามารถนำมาใช้เพื่อวัตถุประสงค์ต่างๆ ได้ เพื่อเก็บรวบรวมข้อมูลเหล่านี้ เราจำเป็นต้องรู้วิธีดึงข้อมูล (scrape) จากเว็บไซต์",
      },
      {
        t: "p",
        c: "Web scraping คือกระบวนการดึงและเก็บรวบรวมข้อมูลจากเว็บไซต์ แล้วจัดเก็บไว้บนเครื่องภายในหรือในฐานข้อมูล",
      },
      {
        t: "p",
        c: "ในส่วนนี้ เราจะใช้ beautifulsoup และ requests package ในการดึงข้อมูล โดยใช้ beautifulsoup เวอร์ชัน 4",
      },
      {
        t: "p",
        c: "ในการเริ่มต้น scrape เว็บไซต์ คุณต้องมี requests, beautifulsoup4 และเว็บไซต์ที่ต้องการดึงข้อมูล",
      },
      {
        t: "code",
        lang: "shell",
        c: "pip install requests\npip install beautifulsoup4",
      },
      {
        t: "p",
        c: "ในการดึงข้อมูลจากเว็บไซต์ จำเป็นต้องมีความเข้าใจพื้นฐานเกี่ยวกับ HTML tags และ CSS selectors เราระบุเนื้อหาจากเว็บไซต์โดยใช้ HTML tags, classes หรือ/และ ids ลองนำเข้าโมดูล requests และ BeautifulSoup:",
      },
      {
        t: "code",
        lang: "python",
        c: "import requests\nfrom bs4 import BeautifulSoup",
      },
      {
        t: "p",
        c: "ประกาศตัวแปร url สำหรับเว็บไซต์ที่เราจะดึงข้อมูล:",
      },
      {
        t: "code",
        lang: "python",
        c: "import requests\nfrom bs4 import BeautifulSoup\nurl = 'https://archive.ics.uci.edu/ml/datasets.php'\n\n# Lets use the requests get method to fetch the data from url\n\nresponse = requests.get(url)\n# lets check the status\nstatus = response.status_code\nprint(status) # 200 means the fetching was successful",
      },
      {
        t: "code",
        lang: "shell",
        c: "200",
      },
      {
        t: "p",
        c: "ใช้ beautifulSoup เพื่อ parse เนื้อหาจากหน้าเว็บ:",
      },
      {
        t: "code",
        lang: "python",
        c: "import requests\nfrom bs4 import BeautifulSoup\nurl = 'https://archive.ics.uci.edu/ml/datasets.php'\n\nresponse = requests.get(url)\ncontent = response.content # we get all the content from the website\nsoup = BeautifulSoup(content, 'html.parser') # beautiful soup will give a chance to parse\nprint(soup.title) # <title>UCI Machine Learning Repository: Data Sets</title>\nprint(soup.title.get_text()) # UCI Machine Learning Repository: Data Sets\nprint(soup.body) # gives the whole page on the website\nprint(response.status_code)\n\ntables = soup.find_all('table', {'cellpadding':'3'})\n# We are targeting the table with cellpadding attribute with the value of 3\n# We can select using id, class or HTML tag , for more information check the beautifulsoup doc\ntable = tables[0] # the result is a list, we are taking out data from it\nfor td in table.find('tr').find_all('td'):\n    print(td.text)",
      },
      {
        t: "p",
        c: "ถ้ารันโค้ดนี้ จะเห็นว่าการดึงข้อมูลเสร็จไปครึ่งหนึ่งแล้ว คุณสามารถดำเนินการต่อเองได้เพราะเป็นส่วนหนึ่งของแบบฝึกหัดที่ 1 สำหรับข้อมูลเพิ่มเติม ดูได้ที่ beautifulsoup documentation: https://www.crummy.com/software/BeautifulSoup/bs4/doc/#quick-start",
      },
      {
        t: "callout",
        title: "เดินหน้าต่อไป!",
        c: "คุณช่างพิเศษมาก คุณกำลังก้าวหน้าทุกวัน เหลืออีกแค่แปดวันก็จะถึงความยิ่งใหญ่แล้ว ตอนนี้ลองทำแบบฝึกหัดเพื่อฝึกสมองและกล้ามเนื้อของคุณ",
      },

      { t: "h2", c: "💻 แบบฝึกหัด — วันที่ 22" },
      {
        t: "ol",
        c: [
          "ดึงข้อมูลจากเว็บไซต์ต่อไปนี้และจัดเก็บข้อมูลเป็นไฟล์ json (url = 'http://www.bu.edu/president/boston-university-facts-stats/')",
          "ดึงตารางข้อมูลจาก URL นี้ (https://archive.ics.uci.edu/ml/datasets.php) และแปลงเป็นไฟล์ json",
          "ดึงข้อมูลตารางประธานาธิบดีและจัดเก็บเป็น json (https://en.wikipedia.org/wiki/List_of_presidents_of_the_United_States) ตารางนี้มีโครงสร้างที่ไม่ค่อยเป็นระเบียบ และการ scraping อาจใช้เวลานานมาก",
        ],
      },
    ],
  },
};
