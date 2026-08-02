import type { Page } from "@/lib/types";

const IMG =
  "https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images";

export const day21Page: Record<string, Page> = {
  "py30-day21": {
    slug: "py30-day21",
    title: { th: "วันที่ 21 — คลาสและออบเจกต์ (Classes and Objects)", en: "" },
    lead: { th: "เรียนรู้การเขียนโปรแกรมเชิงวัตถุ (OOP) ใน Python ตั้งแต่การสร้างคลาส การใช้ Constructor ไปจนถึงการสืบทอดคุณสมบัติ (Inheritance)", en: "" },
    group: "สัปดาห์ที่ 5: OOP & ข้อมูล",
    blocks: {
      th: [
        {
          t: "image",
          src: `${IMG}/30DaysOfPython_banner3@2x.png`,
          alt: "30 Days of Python banner",
          caption: "30 Days of Python",
        },

        { t: "h2", c: "คลาสและออบเจกต์ (Classes and Objects)" },
        {
          t: "p",
          c: "Python เป็นภาษาโปรแกรมเชิงวัตถุ ทุกสิ่งใน Python คือออบเจกต์ที่มีคุณสมบัติ (properties) และเมธอด (methods) ของตัวเอง ตัวเลข, สตริง, ลิสต์, ดิกชันนารี, ทูเพิล, เซ็ต ที่ใช้ในโปรแกรมล้วนเป็น instance ของคลาสที่มีอยู่แล้วใน Python เราสร้างคลาสเพื่อสร้างออบเจกต์ คลาสเปรียบเสมือน \"แบบพิมพ์เขียว\" (blueprint) สำหรับการสร้างออบเจกต์ เราสร้าง instance จากคลาสเพื่อสร้างออบเจกต์ คลาสกำหนดคุณลักษณะและพฤติกรรมของออบเจกต์ ในขณะที่ออบเจกต์แสดงตัวแทนของคลาสนั้น",
        },
        {
          t: "p",
          c: "เราใช้คลาสและออบเจกต์มาตลอดตั้งแต่เริ่มต้นโดยที่ไม่รู้ตัว ทุกองค์ประกอบในโปรแกรม Python คือออบเจกต์ของคลาส ลองตรวจสอบว่าทุกสิ่งใน Python เป็นคลาสหรือไม่:",
        },
        {
          t: "code",
          lang: "python",
          c: "asabeneh@Asabeneh:~$ python\nPython 3.9.6 (default, Jun 28 2021, 15:26:21)\n[Clang 11.0.0 (clang-1100.0.33.8)] on darwin\nType \"help\", \"copyright\", \"credits\" or \"license\" for more information.\n>>> num = 10\n>>> type(num)\n<class 'int'>\n>>> string = 'string'\n>>> type(string)\n<class 'str'>\n>>> boolean = True\n>>> type(boolean)\n<class 'bool'>\n>>> lst = []\n>>> type(lst)\n<class 'list'>\n>>> tpl = ()\n>>> type(tpl)\n<class 'tuple'>\n>>> set1 = set()\n>>> type(set1)\n<class 'set'>\n>>> dct = {}\n>>> type(dct)\n<class 'dict'>",
        },

        { t: "h3", c: "การสร้างคลาส (Creating a Class)" },
        {
          t: "p",
          c: "ในการสร้างคลาส เราต้องใช้คีย์เวิร์ด class ตามด้วยชื่อและเครื่องหมายโคลอน ชื่อคลาสควรเขียนแบบ CamelCase",
        },
        {
          t: "code",
          lang: "python",
          c: "# syntax\nclass ClassName:\n  code goes here",
        },
        {
          t: "p",
          c: "ตัวอย่าง:",
        },
        {
          t: "code",
          lang: "python",
          c: "class Person:\n  pass\nprint(Person)",
        },
        {
          t: "code",
          lang: "shell",
          c: "<__main__.Person object at 0x10804e510>",
        },

        { t: "h3", c: "การสร้างออบเจกต์ (Creating an Object)" },
        {
          t: "p",
          c: "เราสามารถสร้างออบเจกต์ได้โดยการเรียกคลาส:",
        },
        {
          t: "code",
          lang: "python",
          c: "p = Person()\nprint(p)",
        },

        { t: "h3", c: "Constructor ของคลาส (Class Constructor)" },
        {
          t: "p",
          c: "ในตัวอย่างด้านบน เราสร้างออบเจกต์จากคลาส Person แต่คลาสที่ไม่มี constructor ไม่มีประโยชน์ในงานจริงมากนัก ลองใช้ฟังก์ชัน constructor เพื่อทำให้คลาสมีประโยชน์มากขึ้น เหมือน constructor ใน Java หรือ JavaScript Python มีฟังก์ชัน __init__() ที่เป็น constructor ในตัว ฟังก์ชัน constructor __init__ มีพารามิเตอร์ self ซึ่งเป็น reference ไปยัง instance ปัจจุบันของคลาส",
        },
        {
          t: "p",
          c: "ตัวอย่าง:",
        },
        {
          t: "code",
          lang: "python",
          c: "class Person:\n      def __init__ (self, name):\n        # self allows to attach parameter to the class\n          self.name =name\n\np = Person('Asabeneh')\nprint(p.name)\nprint(p)",
        },
        {
          t: "code",
          lang: "shell",
          c: "# output\nAsabeneh\n<__main__.Person object at 0x2abf46907e80>",
        },
        {
          t: "p",
          c: "ลองเพิ่มพารามิเตอร์เพิ่มเติมให้กับฟังก์ชัน constructor:",
        },
        {
          t: "code",
          lang: "python",
          c: "class Person:\n      def __init__(self, firstname, lastname, age, country, city):\n          self.firstname = firstname\n          self.lastname = lastname\n          self.age = age\n          self.country = country\n          self.city = city\n\n\np = Person('Asabeneh', 'Yetayeh', 250, 'Finland', 'Helsinki')\nprint(p.firstname)\nprint(p.lastname)\nprint(p.age)\nprint(p.country)\nprint(p.city)",
        },
        {
          t: "code",
          lang: "shell",
          c: "# output\nAsabeneh\nYetayeh\n250\nFinland\nHelsinki",
        },

        { t: "h3", c: "เมธอดของออบเจกต์ (Object Methods)" },
        {
          t: "p",
          c: "ออบเจกต์สามารถมีเมธอดได้ เมธอดคือฟังก์ชันที่เป็นส่วนหนึ่งของออบเจกต์",
        },
        {
          t: "p",
          c: "ตัวอย่าง:",
        },
        {
          t: "code",
          lang: "python",
          c: "class Person:\n      def __init__(self, firstname, lastname, age, country, city):\n          self.firstname = firstname\n          self.lastname = lastname\n          self.age = age\n          self.country = country\n          self.city = city\n      def person_info(self):\n        return f'{self.firstname} {self.lastname} is {self.age} years old. He lives in {self.city}, {self.country}'\n\np = Person('Asabeneh', 'Yetayeh', 250, 'Finland', 'Helsinki')\nprint(p.person_info())",
        },
        {
          t: "code",
          lang: "shell",
          c: "# output\nAsabeneh Yetayeh is 250 years old. He lives in Helsinki, Finland",
        },

        { t: "h3", c: "ค่าเริ่มต้นของเมธอดออบเจกต์ (Object Default Methods)" },
        {
          t: "p",
          c: "บางครั้งคุณอาจต้องการกำหนดค่าเริ่มต้น (default values) สำหรับเมธอดของออบเจกต์ หากเรากำหนดค่าเริ่มต้นให้กับพารามิเตอร์ใน constructor เราสามารถหลีกเลี่ยงข้อผิดพลาดเมื่อเรียกหรือสร้าง instance ของคลาสโดยไม่มีพารามิเตอร์ได้",
        },
        {
          t: "p",
          c: "ตัวอย่าง:",
        },
        {
          t: "code",
          lang: "python",
          c: "class Person:\n      def __init__(self, firstname='Asabeneh', lastname='Yetayeh', age=250, country='Finland', city='Helsinki'):\n          self.firstname = firstname\n          self.lastname = lastname\n          self.age = age\n          self.country = country\n          self.city = city\n\n      def person_info(self):\n        return f'{self.firstname} {self.lastname} is {self.age} years old. He lives in {self.city}, {self.country}.'\n\np1 = Person()\nprint(p1.person_info())\np2 = Person('John', 'Doe', 30, 'Nomanland', 'Noman city')\nprint(p2.person_info())",
        },
        {
          t: "code",
          lang: "shell",
          c: "# output\nAsabeneh Yetayeh is 250 years old. He lives in Helsinki, Finland.\nJohn Doe is 30 years old. He lives in Noman city, Nomanland.",
        },

        { t: "h3", c: "เมธอดสำหรับแก้ไขค่าเริ่มต้นของคลาส (Method to Modify Class Default Values)" },
        {
          t: "p",
          c: "ในตัวอย่างด้านล่าง คลาส Person มีพารามิเตอร์ constructor ทั้งหมดที่มีค่าเริ่มต้น นอกจากนี้ยังมีพารามิเตอร์ skills ซึ่งเข้าถึงได้โดยใช้เมธอด ลองสร้างเมธอด add_skill เพื่อเพิ่มทักษะลงใน skills list:",
        },
        {
          t: "code",
          lang: "python",
          c: "class Person:\n      def __init__(self, firstname='Asabeneh', lastname='Yetayeh', age=250, country='Finland', city='Helsinki'):\n          self.firstname = firstname\n          self.lastname = lastname\n          self.age = age\n          self.country = country\n          self.city = city\n          self.skills = []\n\n      def person_info(self):\n        return f'{self.firstname} {self.lastname} is {self.age} years old. He lives in {self.city}, {self.country}.'\n      def add_skill(self, skill):\n          self.skills.append(skill)\n\np1 = Person()\nprint(p1.person_info())\np1.add_skill('HTML')\np1.add_skill('CSS')\np1.add_skill('JavaScript')\np2 = Person('John', 'Doe', 30, 'Nomanland', 'Noman city')\nprint(p2.person_info())\nprint(p1.skills)\nprint(p2.skills)",
        },
        {
          t: "code",
          lang: "shell",
          c: "# output\nAsabeneh Yetayeh is 250 years old. He lives in Helsinki, Finland.\nJohn Doe is 30 years old. He lives in Noman city, Nomanland.\n['HTML', 'CSS', 'JavaScript']\n[]",
        },

        { t: "h3", c: "การสืบทอด (Inheritance)" },
        {
          t: "p",
          c: "การใช้ inheritance ช่วยให้เราสามารถนำโค้ดของคลาสแม่มาใช้ซ้ำได้ Inheritance ช่วยให้เราสามารถกำหนดคลาสที่สืบทอดเมธอดและคุณสมบัติทั้งหมดจากคลาสแม่ได้ คลาสแม่ (parent class) หรือ super class หรือ base class คือคลาสที่ให้เมธอดและคุณสมบัติทั้งหมด คลาสลูก (child class) คือคลาสที่สืบทอดมาจากคลาสอื่นหรือคลาสแม่ ลองสร้างคลาส Student โดยสืบทอดมาจากคลาส Person:",
        },
        {
          t: "code",
          lang: "python",
          c: "class Student(Person):\n    pass\n\n\ns1 = Student('Eyob', 'Yetayeh', 30, 'Finland', 'Helsinki')\ns2 = Student('Lidiya', 'Teklemariam', 28, 'Finland', 'Espoo')\nprint(s1.person_info())\ns1.add_skill('JavaScript')\ns1.add_skill('React')\ns1.add_skill('Python')\nprint(s1.skills)\n\nprint(s2.person_info())\ns2.add_skill('Organizing')\ns2.add_skill('Marketing')\ns2.add_skill('Digital Marketing')\nprint(s2.skills)",
        },
        {
          t: "code",
          lang: "shell",
          c: "output\nEyob Yetayeh is 30 years old. He lives in Helsinki, Finland.\n['JavaScript', 'React', 'Python']\nLidiya Teklemariam is 28 years old. He lives in Espoo, Finland.\n['Organizing', 'Marketing', 'Digital Marketing']",
        },
        {
          t: "p",
          c: "เราไม่ได้เรียก constructor __init__() ในคลาสลูก ถ้าเราไม่เรียก เราก็ยังสามารถเข้าถึงคุณสมบัติทั้งหมดจากคลาสแม่ได้ แต่ถ้าเราเรียก constructor เราสามารถเข้าถึงคุณสมบัติของคลาสแม่ผ่าน super() ได้ เราสามารถเพิ่มเมธอดใหม่ลงในคลาสลูก หรือ override เมธอดของคลาสแม่ได้โดยสร้างเมธอดชื่อเดียวกันในคลาสลูก เมื่อเราเพิ่มฟังก์ชัน __init__() คลาสลูกจะไม่สืบทอดฟังก์ชัน __init__() ของคลาสแม่อีกต่อไป",
        },

        { t: "h3", c: "การ Override เมธอดของคลาสแม่ (Overriding parent method)" },
        {
          t: "code",
          lang: "python",
          c: "class Student(Person):\n    def __init__ (self, firstname='Asabeneh', lastname='Yetayeh',age=250, country='Finland', city='Helsinki', gender='male'):\n        self.gender = gender\n        super().__init__(firstname, lastname,age, country, city)\n    def person_info(self):\n        gender = 'He' if self.gender =='male' else 'She'\n        return f'{self.firstname} {self.lastname} is {self.age} years old. {gender} lives in {self.city}, {self.country}.'\n\ns1 = Student('Eyob', 'Yetayeh', 30, 'Finland', 'Helsinki','male')\ns2 = Student('Lidiya', 'Teklemariam', 28, 'Finland', 'Espoo', 'female')\nprint(s1.person_info())\ns1.add_skill('JavaScript')\ns1.add_skill('React')\ns1.add_skill('Python')\nprint(s1.skills)\n\nprint(s2.person_info())\ns2.add_skill('Organizing')\ns2.add_skill('Marketing')\ns2.add_skill('Digital Marketing')\nprint(s2.skills)",
        },
        {
          t: "code",
          lang: "shell",
          c: "Eyob Yetayeh is 30 years old. He lives in Helsinki, Finland.\n['JavaScript', 'React', 'Python']\nLidiya Teklemariam is 28 years old. She lives in Espoo, Finland.\n['Organizing', 'Marketing', 'Digital Marketing']",
        },
        {
          t: "p",
          c: "เราสามารถใช้ฟังก์ชัน super() ในตัว หรือชื่อคลาสแม่ Person เพื่อสืบทอดเมธอดและคุณสมบัติจากคลาสแม่โดยอัตโนมัติ ในตัวอย่างด้านบนเรา override เมธอดของคลาสแม่ เมธอดของคลาสลูกมีคุณสมบัติพิเศษ คือสามารถระบุได้ว่าเพศเป็นชายหรือหญิง แล้วกำหนดสรรพนามที่เหมาะสม (He/She)",
        },

        { t: "h2", c: "💻 แบบฝึกหัด — วันที่ 21" },

        { t: "h3", c: "แบบฝึกหัด: ระดับ 1" },
        {
          t: "ol",
          c: [
            "Python มีโมดูลชื่อ statistics และเราสามารถใช้โมดูลนี้ทำการคำนวณทางสถิติทั้งหมดได้ แต่เพื่อฝึกการสร้างฟังก์ชันและการนำกลับมาใช้ซ้ำ ลองพัฒนาโปรแกรมที่คำนวณค่ากลาง (mean, median, mode) และค่าการกระจาย (range, variance, standard deviation) ของตัวอย่างข้อมูล นอกจากนี้ให้หาค่า min, max, count, percentile และการแจกแจงความถี่ (frequency distribution) ของตัวอย่าง สร้างคลาสชื่อ Statistics และสร้างฟังก์ชันทั้งหมดที่คำนวณค่าทางสถิติเป็นเมธอดสำหรับคลาส Statistics ตรวจสอบผลลัพธ์ด้านล่าง",
          ],
        },
        {
          t: "code",
          lang: "python",
          c: "ages = [31, 26, 34, 37, 27, 26, 32, 32, 26, 27, 27, 24, 32, 33, 27, 25, 26, 38, 37, 31, 34, 24, 33, 29, 26]\n\nprint('Count:', data.count()) # 25\nprint('Sum: ', data.sum()) # 744\nprint('Min: ', data.min()) # 24\nprint('Max: ', data.max()) # 38\nprint('Range: ', data.range()) # 14\nprint('Mean: ', data.mean()) # 30\nprint('Median: ', data.median()) # 29\nprint('Mode: ', data.mode()) # {'mode': 26, 'count': 5}\nprint('Standard Deviation: ', data.std()) # 4.2\nprint('Variance: ', data.var()) # 17.5\nprint('Frequency Distribution: ', data.freq_dist()) # [(20.0, 26), (16.0, 27), (12.0, 32), (8.0, 37), (8.0, 34), (8.0, 33), (8.0, 31), (8.0, 24), (4.0, 38), (4.0, 29), (4.0, 25)]",
        },
        {
          t: "code",
          lang: "shell",
          c: "# you output should look like this\nprint(data.describe())\nCount: 25\nSum:  744\nMin:  24\nMax:  38\nRange:  14\nMean:  30\nMedian:  29\nMode:  (26, 5)\nVariance:  17.5\nStandard Deviation:  4.2\nFrequency Distribution: [(20.0, 26), (16.0, 27), (12.0, 32), (8.0, 37), (8.0, 34), (8.0, 33), (8.0, 31), (8.0, 24), (4.0, 38), (4.0, 29), (4.0, 25)]",
        },

        { t: "h3", c: "แบบฝึกหัด: ระดับ 2" },
        {
          t: "ol",
          c: [
            "สร้างคลาสชื่อ PersonAccount ที่มีคุณสมบัติ firstname, lastname, incomes, expenses และมีเมธอด total_income, total_expense, account_info, add_income, add_expense และ account_balance โดย incomes คือชุดของรายได้และคำอธิบาย เช่นเดียวกับ expenses",
          ],
        },
      ],
      en: [],
    },
  },
};
