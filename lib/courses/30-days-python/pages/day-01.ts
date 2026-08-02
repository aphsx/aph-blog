import type { Page } from "@/lib/types";

const IMG = "https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images";

export const day01Page: Record<string, Page> = {
  "py30-day01": {
    slug: "py30-day01",
    title: { th: "วันที่ 1 — บทนำ (Introduction)", en: "" },
    lead: { th: "รู้จัก Python, ติดตั้งให้พร้อม แล้วเขียนโปรแกรมแรก — เริ่มต้นการเดินทาง 30 วัน", en: "" },
    group: "สัปดาห์ที่ 1: พื้นฐาน Python",
    blocks: {
      th: [
        // Welcome
        { t: "p", c: "ยินดีที่คุณตัดสินใจเข้าร่วม challenge 30 วัน Python ในระหว่างนี้คุณจะได้เรียนทุกอย่างที่จำเป็นสำหรับการเป็นโปรแกรมเมอร์ Python รวมถึงแนวคิดพื้นฐานของการเขียนโปรแกรม เมื่อสิ้นสุด challenge คุณจะได้รับประกาศนียบัตร 30DaysOfPython programming challenge" },

        // Introduction
        { t: "h2", c: "Python คืออะไร" },
        { t: "p", c: "Python เป็นภาษาโปรแกรมระดับสูง (high-level programming language) สำหรับงานทั่วไป เป็น open source, interpreted และ object-oriented Python ถูกสร้างโดย Guido van Rossum โปรแกรมเมอร์ชาวดัตช์ ชื่อ Python มาจากรายการตลก Monty Python's Flying Circus เวอร์ชันแรกเปิดตัวเมื่อ 20 กุมภาพันธ์ 1991 challenge 30 วัน Python นี้จะช่วยให้คุณเรียน Python 3 เวอร์ชันล่าสุดทีละขั้น หัวข้อถูกแบ่งเป็น 30 วัน แต่ละวันมีหลายหัวข้อพร้อมคำอธิบายที่เข้าใจง่าย ตัวอย่างจากโลกจริง และแบบฝึกหัดลงมือทำมากมาย" },
        { t: "p", c: "challenge นี้ออกแบบมาสำหรับทั้งผู้เริ่มต้นและมืออาชีพที่ต้องการเรียน Python อาจใช้เวลา 30 ถึง 100 วันในการจบ challenge ผู้ที่เข้าร่วมกลุ่ม Telegram อย่างกระตือรือร้นมีโอกาสสูงที่จะจบ challenge ได้" },
        { t: "p", c: "challenge นี้อ่านง่าย เขียนแบบสนทนา น่าสนใจ สร้างแรงบันดาลใจ แต่ในขณะเดียวกันก็ท้าทายมาก คุณต้องใช้เวลาเป็นอย่างมากในการทำให้จบ ถ้าคุณเรียนรู้ได้ดีจากวิดีโอ สามารถดูบทเรียนวิดีโอได้ที่ YouTube channel Washera เริ่มจากวิดีโอ Python for Absolute Beginners ได้เลย ติดตาม channel, comment และถามคำถามในวิดีโอ YouTube อย่างกระตือรือร้น ผู้เขียนจะสังเกตเห็นคุณในที่สุด" },
        { t: "p", c: "ผู้เขียนอยากได้ยินความคิดเห็นของคุณเกี่ยวกับ challenge นี้ คุณสามารถฝากคำพูดไว้ได้ที่ asabeneh.com/testimonials" },

        // Why Python
        { t: "h2", c: "ทำไมต้อง Python" },
        { t: "p", c: "Python เป็นภาษาโปรแกรมที่ใกล้เคียงภาษามนุษย์มากที่สุด จึงเรียนรู้และใช้งานได้ง่าย Python ถูกใช้โดยบริษัทและอุตสาหกรรมต่าง ๆ รวมถึง Google ใช้พัฒนาเว็บแอปพลิเคชัน, เดสก์ท็อปแอป, การจัดการระบบ และไลบรารี machine learning Python ได้รับการยอมรับอย่างมากในวงการ data science และ machine learning หวังว่านี่เพียงพอที่จะโน้มน้าวให้คุณเริ่มเรียน Python" },

        // Environment Setup
        { t: "h2", c: "ติดตั้งสภาพแวดล้อม (Environment Setup)" },

        { t: "h3", c: "ติดตั้ง Python" },
        { t: "p", c: "ในการรัน Python script คุณต้องติดตั้ง Python ก่อน ดาวน์โหลดได้ที่ python.org" },
        { t: "p", c: "ถ้าคุณใช้ Windows ให้คลิกปุ่มที่วงกลมสีแดง:" },
        { t: "image", src: `${IMG}/installing_on_windows.png`, alt: "ติดตั้ง Python บน Windows", caption: "ดาวน์โหลด Python สำหรับ Windows" },
        { t: "p", c: "ถ้าคุณใช้ macOS ให้คลิกปุ่มที่วงกลมสีแดง:" },
        { t: "image", src: `${IMG}/installing_on_macOS.png`, alt: "ติดตั้ง Python บน macOS", caption: "ดาวน์โหลด Python สำหรับ macOS" },
        { t: "p", c: "หลังติดตั้งแล้ว ตรวจสอบว่า Python ติดตั้งสำเร็จโดยพิมพ์คำสั่งต่อไปนี้ในเทอร์มินัล:" },
        { t: "code", lang: "shell", c: "python3 --version" },
        { t: "image", src: `${IMG}/python_versio.png`, alt: "เช็คเวอร์ชัน Python ในเทอร์มินัล", caption: "ผลลัพธ์แสดงเวอร์ชัน Python ที่ติดตั้ง" },
        { t: "p", c: "จากที่เห็นในเทอร์มินัล ผู้เขียนกำลังใช้ Python 3.7.5 เวอร์ชันของคุณอาจต่างออกไปแต่ควรเป็น 3.6 หรือสูงกว่า ถ้าเห็นเวอร์ชัน Python แสดงว่าติดตั้งสำเร็จแล้ว ไปต่อยังส่วนถัดไปได้เลย" },

        { t: "h3", c: "Python Shell" },
        { t: "p", c: "Python เป็นภาษาสคริปต์แบบ interpreted จึงไม่ต้องคอมไพล์ หมายความว่ามันรันโค้ดทีละบรรทัด Python มาพร้อมกับ Python Shell (Python Interactive Shell) ที่ใช้รันคำสั่ง Python เดี่ยว ๆ แล้วดูผลลัพธ์ทันที" },
        { t: "p", c: "Python Shell รอรับโค้ด Python จากผู้ใช้ เมื่อคุณพิมพ์โค้ดแล้วกด Enter มันจะแปลผลและแสดงผลในบรรทัดถัดไป เปิดเทอร์มินัลหรือ command prompt แล้วพิมพ์:" },
        { t: "code", lang: "shell", c: "python" },
        { t: "image", src: `${IMG}/opening_python_shell.png`, alt: "เปิด Python Shell", caption: "เปิด Python Interactive Shell" },
        { t: "p", c: "Python Interactive Shell จะเปิดขึ้นและรอให้คุณเขียนโค้ด Python คุณจะเขียน Python script ต่อจากสัญลักษณ์ >>> แล้วกด Enter" },
        { t: "p", c: "ลองเขียน script แรกของคุณใน Python Shell:" },
        { t: "image", src: `${IMG}/adding_on_python_shell.png`, alt: "เขียนโค้ดใน Python Shell", caption: "script แรกใน Python Shell" },
        { t: "p", c: "เยี่ยม! คุณเขียน Python script แรกใน Python Interactive Shell สำเร็จแล้ว จะปิด Python Interactive Shell ได้อย่างไร? ให้พิมพ์ exit() ต่อจากสัญลักษณ์ >>> แล้วกด Enter" },
        { t: "image", src: `${IMG}/exit_from_shell.png`, alt: "ออกจาก Python Shell", caption: "พิมพ์ exit() เพื่อปิด Shell" },
        { t: "p", c: "ตอนนี้คุณรู้วิธีเปิดและปิด Python Interactive Shell แล้ว" },
        { t: "p", c: "Python จะให้ผลลัพธ์ถ้าคุณเขียน script ที่มันเข้าใจ ถ้าไม่ได้มันจะ return error ลองทำผิดแบบตั้งใจดูว่า Python จะ return อะไร:" },
        { t: "image", src: `${IMG}/invalid_syntax_error.png`, alt: "ตัวอย่าง Invalid Syntax Error", caption: "Python แจ้ง SyntaxError เมื่อโค้ดผิด" },
        { t: "p", c: "จากที่เห็น Python ฉลาดมากพอที่จะรู้ว่าเราทำอะไรผิด นั่นคือ Syntax Error: invalid syntax การใช้ x แทนการคูณใน Python เป็น syntax error เพราะ (x) ไม่ใช่ syntax ที่ถูกต้องใน Python ควรใช้เครื่องหมายดอกจัน (*) แทน error ที่แสดงบอกชัดเจนว่าต้องแก้ตรงไหน" },
        { t: "p", c: "กระบวนการค้นหาและลบ error ออกจากโปรแกรมเรียกว่า debugging ลอง debug โดยเปลี่ยน x เป็น *:" },
        { t: "image", src: `${IMG}/fixing_syntax_error.png`, alt: "แก้ Syntax Error", caption: "แก้ bug โดยเปลี่ยน x เป็น *" },
        { t: "p", c: "bug ถูกแก้แล้ว โค้ดรันได้และเราได้ผลลัพธ์ตามที่คาด ในฐานะโปรแกรมเมอร์คุณจะเจอ error แบบนี้ทุกวัน การรู้วิธี debug จึงสำคัญมาก เพื่อ debug ได้ดีต้องเข้าใจว่ากำลังเผชิญกับ error ชนิดใด ตัวอย่าง error ที่อาจพบใน Python ได้แก่ SyntaxError, IndexError, NameError, ModuleNotFoundError, KeyError, ImportError, AttributeError, TypeError, ValueError, ZeroDivisionError เป็นต้น เราจะดู error แต่ละประเภทในบทถัด ๆ ไป" },
        { t: "p", c: "ลองฝึก Python Interactive Shell เพิ่มเติม เปิดเทอร์มินัลหรือ command prompt แล้วพิมพ์ python:" },
        { t: "image", src: `${IMG}/opening_python_shell.png`, alt: "เปิด Python Shell อีกครั้ง", caption: "เปิด Python Interactive Shell" },
        { t: "p", c: "Python Interactive Shell เปิดขึ้นแล้ว ลองทำการคำนวณทางคณิตศาสตร์พื้นฐาน (บวก ลบ คูณ หาร หาร เศษ ยกกำลัง):" },
        { t: "p", c: "ลองทำคณิตศาสตร์ก่อนเขียน Python code:" },
        { t: "ul", c: [
          "2 + 3 = 5",
          "3 - 2 = 1",
          "3 × 2 = 6",
          "3 / 2 = 1.5",
          "3 ** 2 = 3 x 3 = 9",
        ]},
        { t: "p", c: "ใน Python มีการดำเนินการเพิ่มเติม:" },
        { t: "ul", c: [
          "3 % 2 = 1  → หาเศษ (modulus)",
          "3 // 2 = 1 → หารทิ้งเศษ (floor division)",
        ]},
        { t: "p", c: "ลองแปลงสมการคณิตศาสตร์ข้างต้นเป็น Python code ใน Python Shell ลองเขียน comment ก่อน Comment คือส่วนของโค้ดที่ Python ไม่รัน จึงสามารถฝากข้อความไว้ในโค้ดเพื่อให้อ่านง่ายขึ้นได้ comment ใน Python ขึ้นต้นด้วย hash (#):" },
        { t: "code", lang: "shell", c: " # comment starts with hash\n # this is a python comment, because it starts with a (#) symbol" },
        { t: "image", src: `${IMG}/maths_on_python_shell.png`, alt: "คณิตศาสตร์ใน Python Shell", caption: "ทดลองคำนวณใน Python Shell" },
        { t: "p", c: "ก่อนไปส่วนถัดไป ลองฝึก Python Interactive Shell เพิ่มอีกสักครั้ง ปิด Shell แล้วเปิดใหม่ แล้วลองเขียนข้อความใน Python Shell:" },
        { t: "image", src: `${IMG}/writing_string_on_shell.png`, alt: "เขียนสตริงใน Python Shell", caption: "ลองพิมพ์ข้อความ (string) ใน Shell" },

        { t: "h3", c: "ติดตั้ง Visual Studio Code" },
        { t: "p", c: "Python Interactive Shell เหมาะสำหรับทดลองและทดสอบโค้ดขนาดเล็ก แต่ไม่เหมาะสำหรับโปรเจกต์ขนาดใหญ่ ในสภาพแวดล้อมการทำงานจริง นักพัฒนาใช้ code editor ที่หลากหลาย ใน challenge 30 วัน Python นี้เราจะใช้ Visual Studio Code ดาวน์โหลดได้ที่ code.visualstudio.com" },
        { t: "image", src: `${IMG}/vscode.png`, alt: "Visual Studio Code", caption: "ดาวน์โหลด Visual Studio Code" },
        { t: "p", c: "ถ้าติดตั้ง Visual Studio Code แล้ว มาดูวิธีใช้งานกัน ถ้าต้องการเรียนผ่านวิดีโอสามารถดู Visual Studio Code for Python Video tutorial ได้" },

        { t: "h3", c: "วิธีใช้ Visual Studio Code" },
        { t: "p", c: "เปิด Visual Studio Code โดย double click ที่ icon เมื่อเปิดขึ้นมาจะเห็น interface แบบนี้ ลองโต้ตอบกับ icon ต่าง ๆ ที่มีป้ายกำกับ:" },
        { t: "image", src: `${IMG}/vscode_ui.png`, alt: "VS Code Interface", caption: "หน้าตา Visual Studio Code" },
        { t: "p", c: "สร้างโฟลเดอร์ชื่อ 30DaysOfPython บน desktop แล้วเปิดด้วย Visual Studio Code:" },
        { t: "image", src: `${IMG}/how_to_open_project_on_vscode.png`, alt: "เปิดโปรเจกต์ใน VS Code", caption: "เปิดโฟลเดอร์โปรเจกต์ใน VS Code" },
        { t: "image", src: `${IMG}/opening_project.png`, alt: "เปิดโปรเจกต์", caption: "โฟลเดอร์โปรเจกต์ที่เปิดแล้ว" },
        { t: "p", c: "หลังเปิดขึ้นมาจะเห็น shortcut สำหรับสร้างไฟล์และโฟลเดอร์ภายใน 30DaysOfPython ตามตัวอย่างด้านล่าง ผู้เขียนสร้างไฟล์แรกชื่อ helloworld.py คุณลองทำเช่นเดียวกัน:" },
        { t: "image", src: `${IMG}/helloworld.png`, alt: "สร้างไฟล์ Python แรก", caption: "สร้างไฟล์ helloworld.py ใน VS Code" },
        { t: "p", c: "หลังจากทำงานมาตลอดวันแล้วต้องการปิด code editor นี่คือวิธีปิดโปรเจกต์ที่เปิดอยู่:" },
        { t: "image", src: `${IMG}/closing_opened_project.png`, alt: "ปิดโปรเจกต์", caption: "ปิดโปรเจกต์ที่เปิดอยู่" },
        { t: "p", c: "ยินดีด้วย คุณติดตั้งสภาพแวดล้อมสำหรับพัฒนาเสร็จแล้ว มาเริ่มเขียนโค้ดกันเลย" },

        // Basic Python
        { t: "h2", c: "พื้นฐาน Python" },

        { t: "h3", c: "Syntax ของ Python" },
        { t: "p", c: "Python script สามารถเขียนได้ใน Python Interactive Shell หรือใน code editor ไฟล์ Python มีนามสกุล .py" },

        { t: "h3", c: "การเยื้อง (Python Indentation)" },
        { t: "p", c: "การเยื้อง (indentation) คือช่องว่างในข้อความ ในหลายภาษาการเยื้องใช้เพิ่มความสามารถในการอ่านโค้ด แต่ใน Python การเยื้องใช้สร้างบล็อกโค้ด ภาษาอื่น ๆ ใช้วงเล็บปีกกา {} สร้างบล็อกโค้ดแทน bug ที่พบบ่อยเมื่อเขียน Python code คือการเยื้องผิด:" },
        { t: "image", src: `${IMG}/indentation.png`, alt: "Indentation Error ใน Python", caption: "ตัวอย่าง IndentationError" },

        { t: "h3", c: "คอมเมนต์ (Comments)" },
        { t: "p", c: "คอมเมนต์มีบทบาทสำคัญในการเพิ่มความสามารถในการอ่านโค้ดและให้นักพัฒนาฝากข้อความในโค้ดได้ ใน Python ข้อความที่นำหน้าด้วย hash (#) ถือเป็น comment และไม่ถูกรันเมื่อโค้ดทำงาน" },
        { t: "p", c: "ตัวอย่าง: Single Line Comment" },
        { t: "code", lang: "shell", c: "    # This is the first comment\n    # This is the second comment\n    # Python is eating the world" },
        { t: "p", c: "ตัวอย่าง: Multiline Comment — เครื่องหมายคำพูดสามสามารถใช้เป็น multiline comment ได้ถ้าไม่ได้กำหนดให้ตัวแปร:" },
        { t: "code", lang: "shell", c: "\"\"\"This is multiline comment\nmultiline comment takes multiple lines.\npython is eating the world\n\"\"\"" },

        // Data Types
        { t: "h2", c: "ชนิดข้อมูล (Data Types)" },
        { t: "p", c: "ใน Python มีชนิดข้อมูลหลายประเภท มาดูชนิดที่พบบ่อยที่สุดกันก่อน ชนิดข้อมูลต่าง ๆ จะถูกครอบคลุมในรายละเอียดในบทอื่น ๆ ตอนนี้แค่ทำความรู้จักและคุ้นเคยก่อน ยังไม่ต้องเข้าใจอย่างชัดเจนทั้งหมด" },

        { t: "h3", c: "ตัวเลข (Number)" },
        { t: "ul", c: [
          "Integer: จำนวนเต็ม (ลบ, ศูนย์ และบวก) — ตัวอย่าง: ..., -3, -2, -1, 0, 1, 2, 3, ...",
          "Float: ทศนิยม — ตัวอย่าง: ..., -3.5, -2.25, -1.0, 0.0, 1.1, 2.2, 3.5, ...",
          "Complex: จำนวนเชิงซ้อน — ตัวอย่าง: 1 + j, 2 + 4j",
        ]},

        { t: "h3", c: "สตริง (String)" },
        { t: "p", c: "ชุดตัวอักษรหนึ่งตัวขึ้นไปที่อยู่ในเครื่องหมายคำพูดเดี่ยวหรือคู่ ถ้ามีมากกว่าหนึ่งประโยคใช้เครื่องหมายสาม:" },
        { t: "code", lang: "python", c: "'Asabeneh'\n'Finland'\n'Python'\n'I love teaching'\n'I hope you are enjoying the first day of 30DaysOfPython Challenge'" },

        { t: "h3", c: "บูลีน (Boolean)" },
        { t: "p", c: "ชนิดข้อมูลบูลีนมีค่าได้แค่หนึ่งในสองค่าคือ True หรือ False การใช้ชนิดข้อมูลนี้จะชัดเจนขึ้นเมื่อเราเริ่มใช้ comparison operator ตัว T ใน True และ F ใน False ต้องเป็นตัวพิมพ์ใหญ่ (ต่างจาก JavaScript):" },
        { t: "code", lang: "python", c: "True   #  Is the light on? If it is on, then the value is True\nFalse  # Is the light on? If it is off, then the value is False" },

        { t: "h3", c: "ลิสต์ (List)" },
        { t: "p", c: "ลิสต์ใน Python คือชุดข้อมูลที่เรียงลำดับ แก้ไขได้ (modifiable) อนุญาตให้มีข้อมูลซ้ำ และสามารถเก็บชนิดข้อมูลที่ต่างกันได้ (คล้าย array ใน JavaScript):" },
        { t: "code", lang: "python", c: "[0, 1, 2, 3, 4, 5]  # all are the same data types - a list of numbers\n['Banana', 'Orange', 'Mango', 'Avocado'] # all the same data types - a list of strings (fruits)\n['Finland','Estonia', 'Sweden','Norway'] # all the same data types - a list of strings (countries)\n['Banana', 10, False, 9.81] # different data types in the list - string, integer, boolean and float" },

        { t: "h3", c: "ดิกชันนารี (Dictionary)" },
        { t: "p", c: "ดิกชันนารีใน Python เป็นชุดข้อมูลที่ไม่มีลำดับในรูปแบบ key-value pairs:" },
        { t: "code", lang: "python", c: "{\n'first_name':'Asabeneh',\n'last_name':'Yetayeh',\n'country':'Finland',\n'age':250,\n'is_married':True,\n'skills':['JS', 'React', 'Node', 'Python']\n}" },

        { t: "h3", c: "ทูเพิล (Tuple)" },
        { t: "p", c: "ทูเพิลเป็นชุดข้อมูลที่เรียงลำดับและมีชนิดข้อมูลหลายแบบเหมือนลิสต์ แต่ทูเพิลไม่สามารถแก้ไขได้เมื่อสร้างแล้ว — เป็น immutable:" },
        { t: "code", lang: "python", c: "('Asabeneh', 'Pawel', 'Brook', 'Abraham', 'Lidiya') # Names" },
        { t: "code", lang: "python", c: "('Earth', 'Jupiter', 'Neptune', 'Mars', 'Venus', 'Saturn', 'Uranus', 'Mercury') # planets" },

        { t: "h3", c: "เซต (Set)" },
        { t: "p", c: "เซตเป็นชุดข้อมูลที่คล้ายลิสต์และทูเพิล แต่ต่างจากลิสต์และทูเพิลตรงที่เซตไม่มีลำดับ เหมือนกับเซตในคณิตศาสตร์ เซตใน Python เก็บเฉพาะข้อมูลที่ไม่ซ้ำกัน ในบทถัด ๆ ไปเราจะเจาะลึกชนิดข้อมูลแต่ละแบบ:" },
        { t: "code", lang: "python", c: "{2, 4, 3, 5}\n{3.14, 9.81, 2.7} # order is not important in set" },

        // Checking Data Types
        { t: "h2", c: "เช็คชนิดข้อมูล" },
        { t: "p", c: "ในการเช็คชนิดข้อมูลของข้อมูลหรือตัวแปร เราใช้ฟังก์ชัน type ในเทอร์มินัลต่อไปนี้จะเห็น Python data types ต่าง ๆ:" },
        { t: "image", src: `${IMG}/checking_data_types.png`, alt: "เช็คชนิดข้อมูล", caption: "ใช้ type() เช็คชนิดข้อมูลต่าง ๆ" },

        // Python File
        { t: "h2", c: "ไฟล์ Python" },
        { t: "p", c: "ก่อนอื่นเปิดโฟลเดอร์โปรเจกต์ 30DaysOfPython ถ้ายังไม่มีให้สร้างโฟลเดอร์ชื่อ 30DaysOfPython จากนั้นสร้างไฟล์ชื่อ helloworld.py ภายในโฟลเดอร์นี้" },
        { t: "p", c: "Python Interactive Shell แสดงผลโดยไม่ต้องใช้ print แต่ใน Visual Studio Code หากต้องการเห็นผลลัพธ์ต้องใช้ฟังก์ชันพื้นฐาน print() ฟังก์ชัน print() รับ argument ได้ไม่จำกัดจำนวน: print('argument1', 'argument2', 'argument3')" },
        { t: "p", c: "ชื่อไฟล์คือ helloworld.py:" },
        { t: "code", lang: "python", c: "# Day 1 - 30DaysOfPython Challenge\n\nprint(2 + 3)             # addition(+)\nprint(3 - 1)             # subtraction(-)\nprint(2 * 3)             # multiplication(*)\nprint(3 / 2)             # division(/)\nprint(3 ** 2)            # exponential(**)\nprint(3 % 2)             # modulus(%)\nprint(3 // 2)            # Floor division operator(//)\n\n# Checking data types\nprint(type(10))          # Int\nprint(type(3.14))        # Float\nprint(type(1 + 3j))      # Complex number\nprint(type('Asabeneh'))  # String\nprint(type([1, 2, 3]))   # List\nprint(type({'name':'Asabeneh'})) # Dictionary\nprint(type({9.8, 3.14, 2.7}))    # Set\nprint(type((9.8, 3.14, 2.7)))    # Tuple" },
        { t: "p", c: "ในการรันไฟล์ Python ดูภาพด้านล่าง คุณรันได้โดยกดปุ่ม play สีเขียวใน Visual Studio Code หรือพิมพ์ python helloworld.py ในเทอร์มินัล:" },
        { t: "image", src: `${IMG}/running_python_script.png`, alt: "รัน Python Script", caption: "รันไฟล์ helloworld.py" },
        { t: "p", c: "🌕 คุณสุดยอดมาก คุณเพิ่งจบ challenge วันที่ 1 และกำลังมุ่งหน้าสู่ความยิ่งใหญ่ มาทำแบบฝึกหัดสำหรับสมองและกล้ามเนื้อกัน" },

        // Exercises
        { t: "h2", c: "แบบฝึกหัด — วันที่ 1" },

        { t: "h3", c: "ระดับ 1" },
        { t: "ol", c: [
          "เช็คเวอร์ชัน Python ที่คุณใช้อยู่",
          "เปิด Python Interactive Shell แล้วทำการดำเนินการต่อไปนี้ โดยใช้ตัวเลข 3 และ 4: บวก (+), ลบ (-), คูณ (*), หาเศษ (%), หาร (/), ยกกำลัง (**), หารทิ้งเศษ (//)",
          "เขียนสตริงต่อไปนี้ใน Python Interactive Shell: ชื่อของคุณ, นามสกุลของคุณ, ประเทศของคุณ, 'I am enjoying 30 days of python'",
          "เช็คชนิดข้อมูลต่อไปนี้: 10, 9.8, 3.14, 4 - 4j, ['Asabeneh', 'Python', 'Finland'], ชื่อของคุณ, นามสกุลของคุณ, ประเทศของคุณ",
        ]},

        { t: "h3", c: "ระดับ 2" },
        { t: "ol", c: [
          "สร้างโฟลเดอร์ day_1 ภายใน 30DaysOfPython สร้างไฟล์ Python ชื่อ helloworld.py แล้วทำแบบฝึกหัดข้อ 1, 2, 3 และ 4 ซ้ำในไฟล์นี้ จำไว้ว่าต้องใช้ print() เมื่อทำงานในไฟล์ Python จากนั้น navigate ไปที่โฟลเดอร์ที่บันทึกไฟล์ไว้แล้วรัน",
        ]},

        { t: "h3", c: "ระดับ 3" },
        { t: "ol", c: [
          "เขียนตัวอย่างสำหรับ Python data type แต่ละชนิด: Number (Integer, Float, Complex), String, Boolean, List, Tuple, Set, Dictionary",
          "คำนวณ Euclidean distance ระหว่างจุด (2, 3) และ (10, 8) — สูตร: √((x2-x1)² + (y2-y1)²)",
        ]},

        { t: "p", c: "🎉 ยินดีด้วย ! 🎉" },
      ],
      en: [],
    },
  },
};
