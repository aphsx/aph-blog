import type { Page } from "@/lib/types";

const IMG =
  "https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images";

export const day27Page: Record<string, Page> = {
  "py30-day27": {
    slug: "py30-day27",
    title: "วันที่ 27 — Python กับ MongoDB",
    lead: "เชื่อมต่อ Python เข้ากับ MongoDB ฐานข้อมูล NoSQL และเรียนรู้การทำ CRUD operations ผ่าน PyMongo",
    group: "สัปดาห์ที่ 6: เว็บ & API",
    blocks: [
      { t: "h2", c: "Python กับ MongoDB" },
      {
        t: "p",
        c: "Python เป็นเทคโนโลยีฝั่ง backend และสามารถเชื่อมต่อกับแอปพลิเคชันฐานข้อมูลได้หลากหลายประเภท ทั้งฐานข้อมูล SQL และ NoSQL ในส่วนนี้เราจะเชื่อมต่อ Python กับฐานข้อมูล MongoDB ซึ่งเป็นฐานข้อมูล NoSQL",
      },
      { t: "h2", c: "MongoDB" },
      {
        t: "p",
        c: "MongoDB เป็นฐานข้อมูล NoSQL โดย MongoDB จัดเก็บข้อมูลในรูปแบบเอกสาร JSON ซึ่งทำให้ MongoDB มีความยืดหยุ่นและขยายระบบได้ดี มาดูคำศัพท์ต่าง ๆ ของฐานข้อมูล SQL และ NoSQL กัน ตารางด้านล่างจะแสดงให้เห็นความแตกต่างระหว่าง SQL และ NoSQL",
      },
      { t: "h3", c: "SQL เทียบกับ NoSQL" },
      {
        t: "image",
        src: `${IMG}/mongoDB/sql-vs-nosql.png`,
        alt: "SQL versus NoSQL",
        caption: "ความแตกต่างระหว่างฐานข้อมูล SQL และ NoSQL",
      },
      {
        t: "p",
        c: "ในส่วนนี้เราจะมุ่งเน้นที่ฐานข้อมูล NoSQL อย่าง MongoDB สมัครใช้งาน mongoDB ได้ที่ mongodb.com โดยคลิกที่ปุ่ม sign in จากนั้นคลิก register ในหน้าถัดไป",
      },
      {
        t: "image",
        src: `${IMG}/mongoDB/mongodb-signup-page.png`,
        alt: "MongoDB Sign up pages",
        caption: "หน้าสมัครใช้งาน MongoDB",
      },
      {
        t: "p",
        c: "กรอกข้อมูลในช่องต่าง ๆ ให้ครบแล้วคลิก continue",
      },
      {
        t: "image",
        src: `${IMG}/mongoDB/mongodb-register.png`,
        alt: "Mongodb register",
        caption: "หน้าลงทะเบียน MongoDB",
      },
      {
        t: "p",
        c: "เลือกแผนฟรี",
      },
      {
        t: "image",
        src: `${IMG}/mongoDB/mongodb-free.png`,
        alt: "Mongodb free plan",
        caption: "เลือกแผนบริการฟรีของ MongoDB",
      },
      {
        t: "p",
        c: "เลือก region ที่ใกล้เคียงที่สุดซึ่งให้บริการฟรี และตั้งชื่อ cluster ของคุณ",
      },
      {
        t: "image",
        src: `${IMG}/mongoDB/mongodb-cluster-name.png`,
        alt: "Mongodb cluster name",
        caption: "ตั้งชื่อ cluster",
      },
      {
        t: "p",
        c: "ตอนนี้ sandbox ฟรีของคุณถูกสร้างขึ้นแล้ว",
      },
      {
        t: "image",
        src: `${IMG}/mongoDB/mongodb-sandbox.png`,
        alt: "Mongodb sandbox",
        caption: "MongoDB sandbox พร้อมใช้งาน",
      },
      {
        t: "p",
        c: "อนุญาตการเข้าถึงจาก localhost ทั้งหมด",
      },
      {
        t: "image",
        src: `${IMG}/mongoDB/mongodb-allow-ip-access.png`,
        alt: "Mongodb allow ip access",
        caption: "อนุญาต IP access",
      },
      {
        t: "p",
        c: "เพิ่ม user และ password",
      },
      {
        t: "image",
        src: `${IMG}/mongoDB/mongodb-add-user.png`,
        alt: "Mongodb add user",
        caption: "เพิ่ม user ใหม่",
      },
      {
        t: "p",
        c: "สร้าง mongoDB URI link",
      },
      {
        t: "image",
        src: `${IMG}/mongoDB/mongodb-create-uri.png`,
        alt: "Mongodb create uri",
        caption: "สร้าง URI สำหรับเชื่อมต่อ",
      },
      {
        t: "p",
        c: "เลือก driver Python 3.6 หรือสูงกว่า",
      },
      {
        t: "image",
        src: `${IMG}/mongoDB/mongodb-python-driver.png`,
        alt: "Mongodb python driver",
        caption: "เลือก Python driver",
      },
      { t: "h3", c: "การรับ Connection String (MongoDB URI)" },
      {
        t: "p",
        c: "คัดลอก connection string link คุณจะได้รับข้อความประมาณนี้:",
      },
      {
        t: "code",
        lang: "shell",
        c: "mongodb+srv://asabeneh:<password>@30daysofpython-twxkr.mongodb.net/test?retryWrites=true&w=majority",
      },
      {
        t: "p",
        c: "ไม่ต้องกังวลเรื่อง URL นี้ มันเป็นแค่วิธีเชื่อมต่อแอปพลิเคชันของคุณกับ mongoDB ให้แทนที่ placeholder ของ password ด้วย password ที่คุณตั้งไว้ตอนเพิ่ม user",
      },
      {
        t: "p",
        c: "ตัวอย่าง:",
      },
      {
        t: "code",
        lang: "shell",
        c: "mongodb+srv://asabeneh:123123123@30daysofpython-twxkr.mongodb.net/test?retryWrites=true&w=majority",
      },
      {
        t: "p",
        c: "ตอนนี้ฉันแทนที่ทุกอย่างแล้ว โดย password คือ 123123 และชื่อของฐานข้อมูลคือ thirty_days_python นี่เป็นเพียงตัวอย่าง password ของคุณต้องแข็งแกร่งกว่านี้",
      },
      {
        t: "p",
        c: "Python ต้องการ mongoDB driver เพื่อเข้าถึงฐานข้อมูล mongoDB เราจะใช้ pymongo ร่วมกับ dnspython เพื่อเชื่อมต่อแอปพลิเคชันของเรากับ mongoDB ติดตั้ง pymongo และ dnspython ภายใน project directory ของคุณ",
      },
      {
        t: "code",
        lang: "shell",
        c: "pip install pymongo dnspython",
      },
      {
        t: "p",
        c: "ต้องติดตั้ง module \"dnspython\" เพื่อใช้ mongodb+srv:// URIs โดย dnspython เป็น DNS toolkit สำหรับ Python ซึ่งรองรับ record type แทบทุกประเภท",
      },
      { t: "h3", c: "การเชื่อมต่อแอปพลิเคชัน Flask กับ MongoDB Cluster" },
      {
        t: "code",
        lang: "python",
        c: "# let's import the flask\nfrom flask import Flask, render_template\nimport os # importing operating system module\nMONGODB_URI = 'mongodb+srv://asabeneh:your_password_goes_here@30daysofpython-twxkr.mongodb.net/test?retryWrites=true&w=majority'\nclient = pymongo.MongoClient(MONGODB_URI)\nprint(client.list_database_names())\n\napp = Flask(__name__)\nif __name__ == '__main__':\n    # for deployment we use the environ\n    # to make it work for both production and development\n    port = int(os.environ.get(\"PORT\", 5000))\n    app.run(debug=True, host='0.0.0.0', port=port)",
      },
      {
        t: "p",
        c: "เมื่อรันโค้ดข้างต้น เราจะได้ฐานข้อมูล mongoDB เริ่มต้น:",
      },
      {
        t: "code",
        lang: "shell",
        c: "['admin', 'local']",
      },
      { t: "h3", c: "การสร้างฐานข้อมูลและ collection" },
      {
        t: "p",
        c: "มาสร้างฐานข้อมูลกัน database และ collection ใน mongoDB จะถูกสร้างขึ้นหากยังไม่มีอยู่ มาสร้างฐานข้อมูลชื่อ thirty_days_of_python และ collection ชื่อ students",
      },
      {
        t: "p",
        c: "วิธีสร้างฐานข้อมูล:",
      },
      {
        t: "code",
        lang: "shell",
        c: "db = client.name_of_databse # we can create a database like this or the second way\ndb = client['name_of_database']",
      },
      {
        t: "code",
        lang: "python",
        c: "# let's import the flask\nfrom flask import Flask, render_template\nimport os # importing operating system module\nMONGODB_URI = 'mongodb+srv://asabeneh:your_password_goes_here@30daysofpython-twxkr.mongodb.net/test?retryWrites=true&w=majority'\nclient = pymongo.MongoClient(MONGODB_URI)\n# Creating database\ndb = client.thirty_days_of_python\n# Creating students collection and inserting a document\ndb.students.insert_one({'name': 'Asabeneh', 'country': 'Finland', 'city': 'Helsinki', 'age': 250})\nprint(client.list_database_names())\n\napp = Flask(__name__)\nif __name__ == '__main__':\n    # for deployment we use the environ\n    # to make it work for both production and development\n    port = int(os.environ.get(\"PORT\", 5000))\n    app.run(debug=True, host='0.0.0.0', port=port)",
      },
      {
        t: "p",
        c: "หลังจากสร้างฐานข้อมูล เราได้สร้าง students collection ด้วย และใช้เมธอด insert_one() เพื่อ insert เอกสาร ตอนนี้ฐานข้อมูล thirty_days_of_python และ students collection ถูกสร้างขึ้นแล้ว และเอกสารถูก insert แล้ว ตรวจสอบ mongoDB cluster ของคุณ คุณจะเห็นทั้งฐานข้อมูลและ collection ภายใน collection จะมีเอกสารอยู่",
      },
      {
        t: "code",
        lang: "shell",
        c: "['thirty_days_of_python', 'admin', 'local']",
      },
      {
        t: "p",
        c: "ถ้าคุณเห็นสิ่งนี้บน mongoDB cluster แสดงว่าคุณสร้างฐานข้อมูลและ collection สำเร็จแล้ว",
      },
      {
        t: "image",
        src: `${IMG}/mongoDB/mongodb-creating_database.png`,
        alt: "Creating database and collection",
        caption: "การสร้างฐานข้อมูลและ collection บน MongoDB",
      },
      {
        t: "p",
        c: "ถ้าคุณเห็นในรูป เอกสารถูกสร้างขึ้นพร้อม id ยาว ๆ ที่ทำหน้าที่เป็น primary key ทุกครั้งที่เราสร้างเอกสาร mongoDB จะสร้าง id เฉพาะให้",
      },
      { t: "h3", c: "การ Insert เอกสารหลายรายการลงใน Collection" },
      {
        t: "p",
        c: "เมธอด insert_one() จะ insert ทีละหนึ่งรายการ ถ้าต้องการ insert เอกสารหลายรายการพร้อมกัน ให้ใช้เมธอด insert_many() หรือ for loop เราสามารถใช้ for loop เพื่อ insert เอกสารหลายรายการพร้อมกัน",
      },
      {
        t: "code",
        lang: "python",
        c: "# let's import the flask\nfrom flask import Flask, render_template\nimport os # importing operating system module\nMONGODB_URI = 'mongodb+srv://asabeneh:your_password_goes_here@30daysofpython-twxkr.mongodb.net/test?retryWrites=true&w=majority'\nclient = pymongo.MongoClient(MONGODB_URI)\n\nstudents = [\n        {'name':'David','country':'UK','city':'London','age':34},\n        {'name':'John','country':'Sweden','city':'Stockholm','age':28},\n        {'name':'Sami','country':'Finland','city':'Helsinki','age':25},\n    ]\nfor student in students:\n    db.students.insert_one(student)\n\n\napp = Flask(__name__)\nif __name__ == '__main__':\n    # for deployment we use the environ\n    # to make it work for both production and development\n    port = int(os.environ.get(\"PORT\", 5000))\n    app.run(debug=True, host='0.0.0.0', port=port)",
      },
      { t: "h3", c: "MongoDB Find" },
      {
        t: "p",
        c: "เมธอด find() และ findOne() เป็นเมธอดทั่วไปสำหรับค้นหาข้อมูลใน collection ของฐานข้อมูล mongoDB คล้ายกับคำสั่ง SELECT ใน MySQL มาใช้เมธอด find_one() เพื่อดึงเอกสารจาก collection ในฐานข้อมูลกัน",
      },
      {
        t: "ul",
        c: [
          "find_one({\"_id\": ObjectId(\"id\")}): ดึงรายการแรกที่พบ ถ้าไม่ระบุ id",
        ],
      },
      {
        t: "code",
        lang: "python",
        c: "# let's import the flask\nfrom flask import Flask, render_template\nimport os # importing operating system module\nMONGODB_URI = 'mongodb+srv://asabeneh:your_password_goes_here@30daysofpython-twxkr.mongodb.net/test?retryWrites=true&w=majority'\nclient = pymongo.MongoClient(MONGODB_URI)\ndb = client['thirty_days_of_python'] # accessing the database\nstudent = db.students.find_one()\nprint(student)\n\n\napp = Flask(__name__)\nif __name__ == '__main__':\n    # for deployment we use the environ\n    # to make it work for both production and development\n    port = int(os.environ.get(\"PORT\", 5000))\n    app.run(debug=True, host='0.0.0.0', port=port)",
      },
      {
        t: "code",
        lang: "shell",
        c: "{'_id': ObjectId('5df68a21f106fe2d315bbc8b'), 'name': 'Asabeneh', 'country': 'Helsinki', 'city': 'Helsinki', 'age': 250}",
      },
      {
        t: "p",
        c: "Query ข้างต้นจะคืนค่ารายการแรก แต่เราสามารถระบุเอกสารเฉพาะโดยใช้ _id เฉพาะได้ ลองทำตัวอย่างหนึ่ง ใช้ id ของ David เพื่อดึง object ของ David: '_id':ObjectId('5df68a23f106fe2d315bbc8c')",
      },
      {
        t: "code",
        lang: "python",
        c: "# let's import the flask\nfrom flask import Flask, render_template\nimport os # importing operating system module\nfrom bson.objectid import ObjectId # id object\nMONGODB_URI = 'mongodb+srv://asabeneh:your_password_goes_here@30daysofpython-twxkr.mongodb.net/test?retryWrites=true&w=majority'\nclient = pymongo.MongoClient(MONGODB_URI)\ndb = client['thirty_days_of_python'] # accessing the database\nstudent = db.students.find_one({'_id':ObjectId('5df68a23f106fe2d315bbc8c')})\nprint(student)\n\napp = Flask(__name__)\nif __name__ == '__main__':\n    # for deployment we use the environ\n    # to make it work for both production and development\n    port = int(os.environ.get(\"PORT\", 5000))\n    app.run(debug=True, host='0.0.0.0', port=port)",
      },
      {
        t: "code",
        lang: "shell",
        c: "{'_id': ObjectId('5df68a23f106fe2d315bbc8c'), 'name': 'David', 'country': 'UK', 'city': 'London', 'age': 34}",
      },
      {
        t: "p",
        c: "เราได้เห็นวิธีใช้ find_one() จากตัวอย่างข้างต้นแล้ว มาต่อที่ find() กัน",
      },
      {
        t: "ul",
        c: [
          "find(): คืนค่าทุก occurrence จาก collection ถ้าเราไม่ส่ง query object เข้าไป โดย object ที่ได้คือ pymongo.cursor object",
        ],
      },
      {
        t: "code",
        lang: "python",
        c: "# let's import the flask\nfrom flask import Flask, render_template\nimport os # importing operating system module\n\nMONGODB_URI = 'mongodb+srv://asabeneh:your_password_goes_here@30daysofpython-twxkr.mongodb.net/test?retryWrites=true&w=majority'\nclient = pymongo.MongoClient(MONGODB_URI)\ndb = client['thirty_days_of_python'] # accessing the database\nstudents = db.students.find()\nfor student in students:\n    print(student)\n\napp = Flask(__name__)\nif __name__ == '__main__':\n    # for deployment we use the environ\n    # to make it work for both production and development\n    port = int(os.environ.get(\"PORT\", 5000))\n    app.run(debug=True, host='0.0.0.0', port=port)",
      },
      {
        t: "code",
        lang: "shell",
        c: "{'_id': ObjectId('5df68a21f106fe2d315bbc8b'), 'name': 'Asabeneh', 'country': 'Finland', 'city': 'Helsinki', 'age': 250}\n{'_id': ObjectId('5df68a23f106fe2d315bbc8c'), 'name': 'David', 'country': 'UK', 'city': 'London', 'age': 34}\n{'_id': ObjectId('5df68a23f106fe2d315bbc8d'), 'name': 'John', 'country': 'Sweden', 'city': 'Stockholm', 'age': 28}\n{'_id': ObjectId('5df68a23f106fe2d315bbc8e'), 'name': 'Sami', 'country': 'Finland', 'city': 'Helsinki', 'age': 25}",
      },
      {
        t: "p",
        c: "เราสามารถระบุ field ที่ต้องการแสดงได้โดยส่ง object ตัวที่สองใน find({}, {}) โดย 0 หมายถึงไม่แสดง และ 1 หมายถึงแสดง แต่เราไม่สามารถผสม 0 และ 1 ได้ ยกเว้น _id",
      },
      {
        t: "code",
        lang: "python",
        c: "# let's import the flask\nfrom flask import Flask, render_template\nimport os # importing operating system module\n\nMONGODB_URI = 'mongodb+srv://asabeneh:your_password_goes_here@30daysofpython-twxkr.mongodb.net/test?retryWrites=true&w=majority'\nclient = pymongo.MongoClient(MONGODB_URI)\ndb = client['thirty_days_of_python'] # accessing the database\nstudents = db.students.find({}, {\"_id\":0,  \"name\": 1, \"country\":1}) # 0 means not include and 1 means include\nfor student in students:\n    print(student)\n\napp = Flask(__name__)\nif __name__ == '__main__':\n    # for deployment we use the environ\n    # to make it work for both production and development\n    port = int(os.environ.get(\"PORT\", 5000))\n    app.run(debug=True, host='0.0.0.0', port=port)",
      },
      {
        t: "code",
        lang: "shell",
        c: "{'name': 'Asabeneh', 'country': 'Finland'}\n{'name': 'David', 'country': 'UK'}\n{'name': 'John', 'country': 'Sweden'}\n{'name': 'Sami', 'country': 'Finland'}",
      },
      { t: "h3", c: "Find พร้อม Query" },
      {
        t: "p",
        c: "ใน mongoDB find รับ query object เราสามารถส่ง query object เพื่อกรองเอกสารที่ต้องการ",
      },
      {
        t: "code",
        lang: "python",
        c: "# let's import the flask\nfrom flask import Flask, render_template\nimport os # importing operating system module\n\nMONGODB_URI = 'mongodb+srv://asabeneh:your_password_goes_here@30daysofpython-twxkr.mongodb.net/test?retryWrites=true&w=majority'\nclient = pymongo.MongoClient(MONGODB_URI)\ndb = client['thirty_days_of_python'] # accessing the database\n\nquery = {\n    \"country\":\"Finland\"\n}\nstudents = db.students.find(query)\n\nfor student in students:\n    print(student)\n\n\napp = Flask(__name__)\nif __name__ == '__main__':\n    # for deployment we use the environ\n    # to make it work for both production and development\n    port = int(os.environ.get(\"PORT\", 5000))\n    app.run(debug=True, host='0.0.0.0', port=port)",
      },
      {
        t: "code",
        lang: "shell",
        c: "{'_id': ObjectId('5df68a21f106fe2d315bbc8b'), 'name': 'Asabeneh', 'country': 'Finland', 'city': 'Helsinki', 'age': 250}\n{'_id': ObjectId('5df68a23f106fe2d315bbc8e'), 'name': 'Sami', 'country': 'Finland', 'city': 'Helsinki', 'age': 25}",
      },
      {
        t: "p",
        c: "Query พร้อม modifiers",
      },
      {
        t: "code",
        lang: "python",
        c: "# let's import the flask\nfrom flask import Flask, render_template\nimport os # importing operating system module\nimport pymongo\n\nMONGODB_URI = 'mongodb+srv://asabeneh:your_password_goes_here@30daysofpython-twxkr.mongodb.net/test?retryWrites=true&w=majority'\nclient = pymongo.MongoClient(MONGODB_URI)\ndb = client['thirty_days_of_python'] # accessing the database\n\nquery = {\n    \"city\":\"Helsinki\"\n}\nstudents = db.students.find(query)\nfor student in students:\n    print(student)\n\n\napp = Flask(__name__)\nif __name__ == '__main__':\n    # for deployment we use the environ\n    # to make it work for both production and development\n    port = int(os.environ.get(\"PORT\", 5000))\n    app.run(debug=True, host='0.0.0.0', port=port)",
      },
      {
        t: "code",
        lang: "shell",
        c: "{'_id': ObjectId('5df68a21f106fe2d315bbc8b'), 'name': 'Asabeneh', 'country': 'Finland', 'city': 'Helsinki', 'age': 250}\n{'_id': ObjectId('5df68a23f106fe2d315bbc8e'), 'name': 'Sami', 'country': 'Finland', 'city': 'Helsinki', 'age': 25}",
      },
      { t: "h3", c: "Find query พร้อม modifier" },
      {
        t: "code",
        lang: "python",
        c: "# let's import the flask\nfrom flask import Flask, render_template\nimport os # importing operating system module\nimport pymongo\n\nMONGODB_URI = 'mongodb+srv://asabeneh:your_password_goes_here@30daysofpython-twxkr.mongodb.net/test?retryWrites=true&w=majority'\nclient = pymongo.MongoClient(MONGODB_URI)\ndb = client['thirty_days_of_python'] # accessing the database\nquery = {\n    \"country\":\"Finland\",\n    \"city\":\"Helsinki\"\n}\nstudents = db.students.find(query)\nfor student in students:\n    print(student)\n\n\napp = Flask(__name__)\nif __name__ == '__main__':\n    # for deployment we use the environ\n    # to make it work for both production and development\n    port = int(os.environ.get(\"PORT\", 5000))\n    app.run(debug=True, host='0.0.0.0', port=port)",
      },
      {
        t: "code",
        lang: "shell",
        c: "{'_id': ObjectId('5df68a21f106fe2d315bbc8b'), 'name': 'Asabeneh', 'country': 'Finland', 'city': 'Helsinki', 'age': 250}\n{'_id': ObjectId('5df68a23f106fe2d315bbc8e'), 'name': 'Sami', 'country': 'Finland', 'city': 'Helsinki', 'age': 25}",
      },
      {
        t: "p",
        c: "Query พร้อม modifiers",
      },
      {
        t: "code",
        lang: "python",
        c: "# let's import the flask\nfrom flask import Flask, render_template\nimport os # importing operating system module\nimport pymongo\n\nMONGODB_URI = 'mongodb+srv://asabeneh:your_password_goes_here@30daysofpython-twxkr.mongodb.net/test?retryWrites=true&w=majority'\nclient = pymongo.MongoClient(MONGODB_URI)\ndb = client['thirty_days_of_python'] # accessing the database\nquery = {\"age\":{\"$gt\":30}}\nstudents = db.students.find(query)\nfor student in students:\n    print(student)\n\napp = Flask(__name__)\nif __name__ == '__main__':\n    # for deployment we use the environ\n    # to make it work for both production and development\n    port = int(os.environ.get(\"PORT\", 5000))\n    app.run(debug=True, host='0.0.0.0', port=port)",
      },
      {
        t: "code",
        lang: "shell",
        c: "{'_id': ObjectId('5df68a21f106fe2d315bbc8b'), 'name': 'Asabeneh', 'country': 'Finland', 'city': 'Helsinki', 'age': 250}\n{'_id': ObjectId('5df68a23f106fe2d315bbc8c'), 'name': 'David', 'country': 'UK', 'city': 'London', 'age': 34}",
      },
      {
        t: "code",
        lang: "python",
        c: "# let's import the flask\nfrom flask import Flask, render_template\nimport os # importing operating system module\nimport pymongo\n\nMONGODB_URI = 'mongodb+srv://asabeneh:your_password_goes_here@30daysofpython-twxkr.mongodb.net/test?retryWrites=true&w=majority'\nclient = pymongo.MongoClient(MONGODB_URI)\ndb = client['thirty_days_of_python'] # accessing the database\nquery = {\"age\":{\"$gt\":30}}\nstudents = db.students.find(query)\nfor student in students:\n    print(student)",
      },
      {
        t: "code",
        lang: "shell",
        c: "{'_id': ObjectId('5df68a23f106fe2d315bbc8d'), 'name': 'John', 'country': 'Sweden', 'city': 'Stockholm', 'age': 28}\n{'_id': ObjectId('5df68a23f106fe2d315bbc8e'), 'name': 'Sami', 'country': 'Finland', 'city': 'Helsinki', 'age': 25}",
      },
      { t: "h3", c: "การจำกัดจำนวนเอกสาร" },
      {
        t: "p",
        c: "เราสามารถจำกัดจำนวนเอกสารที่คืนค่าได้โดยใช้เมธอด limit()",
      },
      {
        t: "code",
        lang: "python",
        c: "# let's import the flask\nfrom flask import Flask, render_template\nimport os # importing operating system module\nimport pymongo\n\nMONGODB_URI = 'mongodb+srv://asabeneh:your_password_goes_here@30daysofpython-twxkr.mongodb.net/test?retryWrites=true&w=majority'\nclient = pymongo.MongoClient(MONGODB_URI)\ndb = client['thirty_days_of_python'] # accessing the database\ndb.students.find().limit(3)",
      },
      { t: "h3", c: "Find พร้อมการเรียงลำดับ" },
      {
        t: "p",
        c: "ค่าเริ่มต้น sort จะเรียงจากน้อยไปมาก (ascending order) เราสามารถเปลี่ยนการเรียงเป็น descending order ได้โดยเพิ่ม parameter -1",
      },
      {
        t: "code",
        lang: "python",
        c: "# let's import the flask\nfrom flask import Flask, render_template\nimport os # importing operating system module\nimport pymongo\n\nMONGODB_URI = 'mongodb+srv://asabeneh:your_password_goes_here@30daysofpython-twxkr.mongodb.net/test?retryWrites=true&w=majority'\nclient = pymongo.MongoClient(MONGODB_URI)\ndb = client['thirty_days_of_python'] # accessing the database\nstudents = db.students.find().sort('name')\nfor student in students:\n    print(student)\n\n\nstudents = db.students.find().sort('name',-1)\nfor student in students:\n    print(student)\n\nstudents = db.students.find().sort('age')\nfor student in students:\n    print(student)\n\nstudents = db.students.find().sort('age',-1)\nfor student in students:\n    print(student)\n\napp = Flask(__name__)\nif __name__ == '__main__':\n    # for deployment we use the environ\n    # to make it work for both production and development\n    port = int(os.environ.get(\"PORT\", 5000))\n    app.run(debug=True, host='0.0.0.0', port=port)",
      },
      {
        t: "p",
        c: "เรียงจากน้อยไปมาก (Ascending order)",
      },
      {
        t: "code",
        lang: "shell",
        c: "{'_id': ObjectId('5df68a21f106fe2d315bbc8b'), 'name': 'Asabeneh', 'country': 'Finland', 'city': 'Helsinki', 'age': 250}\n{'_id': ObjectId('5df68a23f106fe2d315bbc8c'), 'name': 'David', 'country': 'UK', 'city': 'London', 'age': 34}\n{'_id': ObjectId('5df68a23f106fe2d315bbc8d'), 'name': 'John', 'country': 'Sweden', 'city': 'Stockholm', 'age': 28}\n{'_id': ObjectId('5df68a23f106fe2d315bbc8e'), 'name': 'Sami', 'country': 'Finland', 'city': 'Helsinki', 'age': 25}",
      },
      {
        t: "p",
        c: "เรียงจากมากไปน้อย (Descending order)",
      },
      {
        t: "code",
        lang: "shell",
        c: "{'_id': ObjectId('5df68a23f106fe2d315bbc8e'), 'name': 'Sami', 'country': 'Finland', 'city': 'Helsinki', 'age': 25}\n{'_id': ObjectId('5df68a23f106fe2d315bbc8d'), 'name': 'John', 'country': 'Sweden', 'city': 'Stockholm', 'age': 28}\n{'_id': ObjectId('5df68a23f106fe2d315bbc8c'), 'name': 'David', 'country': 'UK', 'city': 'London', 'age': 34}\n{'_id': ObjectId('5df68a21f106fe2d315bbc8b'), 'name': 'Asabeneh', 'country': 'Finland', 'city': 'Helsinki', 'age': 250}",
      },
      { t: "h3", c: "การอัปเดตด้วย Query" },
      {
        t: "p",
        c: "เราจะใช้เมธอด update_one() เพื่ออัปเดตหนึ่งรายการ โดยรับ object สองตัว ตัวแรกคือ query และตัวที่สองคือ object ใหม่ บุคคลแรก Asabeneh มีอายุที่ไม่สมเหตุสมผลมาก มาอัปเดตอายุของ Asabeneh กัน",
      },
      {
        t: "code",
        lang: "python",
        c: "# let's import the flask\nfrom flask import Flask, render_template\nimport os # importing operating system module\nimport pymongo\n\nMONGODB_URI = 'mongodb+srv://asabeneh:your_password_goes_here@30daysofpython-twxkr.mongodb.net/test?retryWrites=true&w=majority'\nclient = pymongo.MongoClient(MONGODB_URI)\ndb = client['thirty_days_of_python'] # accessing the database\n\nquery = {'age':250}\nnew_value = {'$set':{'age':38}}\n\ndb.students.update_one(query, new_value)\n# lets check the result if the age is modified\nfor student in db.students.find():\n    print(student)\n\n\napp = Flask(__name__)\nif __name__ == '__main__':\n    # for deployment we use the environ\n    # to make it work for both production and development\n    port = int(os.environ.get(\"PORT\", 5000))\n    app.run(debug=True, host='0.0.0.0', port=port)",
      },
      {
        t: "code",
        lang: "shell",
        c: "{'_id': ObjectId('5df68a21f106fe2d315bbc8b'), 'name': 'Asabeneh', 'country': 'Finland', 'city': 'Helsinki', 'age': 38}\n{'_id': ObjectId('5df68a23f106fe2d315bbc8c'), 'name': 'David', 'country': 'UK', 'city': 'London', 'age': 34}\n{'_id': ObjectId('5df68a23f106fe2d315bbc8d'), 'name': 'John', 'country': 'Sweden', 'city': 'Stockholm', 'age': 28}\n{'_id': ObjectId('5df68a23f106fe2d315bbc8e'), 'name': 'Sami', 'country': 'Finland', 'city': 'Helsinki', 'age': 25}",
      },
      {
        t: "p",
        c: "เมื่อต้องการอัปเดตเอกสารหลายรายการพร้อมกัน ให้ใช้เมธอด update_many()",
      },
      { t: "h3", c: "การลบเอกสาร" },
      {
        t: "p",
        c: "เมธอด delete_one() จะลบหนึ่งเอกสาร โดยรับ query object เป็น parameter และจะลบแค่รายการแรกที่พบเท่านั้น มาลบ John ออกจาก collection กัน",
      },
      {
        t: "code",
        lang: "python",
        c: "# let's import the flask\nfrom flask import Flask, render_template\nimport os # importing operating system module\nimport pymongo\n\nMONGODB_URI = 'mongodb+srv://asabeneh:your_password_goes_here@30daysofpython-twxkr.mongodb.net/test?retryWrites=true&w=majority'\nclient = pymongo.MongoClient(MONGODB_URI)\ndb = client['thirty_days_of_python'] # accessing the database\n\nquery = {'name':'John'}\ndb.students.delete_one(query)\n\nfor student in db.students.find():\n    print(student)\n# lets check the result if the age is modified\nfor student in db.students.find():\n    print(student)\n\n\napp = Flask(__name__)\nif __name__ == '__main__':\n    # for deployment we use the environ\n    # to make it work for both production and development\n    port = int(os.environ.get(\"PORT\", 5000))\n    app.run(debug=True, host='0.0.0.0', port=port)",
      },
      {
        t: "code",
        lang: "shell",
        c: "{'_id': ObjectId('5df68a21f106fe2d315bbc8b'), 'name': 'Asabeneh', 'country': 'Finland', 'city': 'Helsinki', 'age': 38}\n{'_id': ObjectId('5df68a23f106fe2d315bbc8c'), 'name': 'David', 'country': 'UK', 'city': 'London', 'age': 34}\n{'_id': ObjectId('5df68a23f106fe2d315bbc8e'), 'name': 'Sami', 'country': 'Finland', 'city': 'Helsinki', 'age': 25}",
      },
      {
        t: "p",
        c: "จะเห็นว่า John ถูกลบออกจาก collection แล้ว",
      },
      {
        t: "p",
        c: "เมื่อต้องการลบเอกสารหลายรายการ ให้ใช้เมธอด delete_many() โดยรับ query object ถ้าเราส่ง query object เปล่า delete_many({}) จะลบเอกสารทั้งหมดใน collection",
      },
      { t: "h3", c: "การ Drop Collection" },
      {
        t: "p",
        c: "ใช้เมธอด drop() เพื่อลบ collection ออกจากฐานข้อมูล",
      },
      {
        t: "code",
        lang: "python",
        c: "# let's import the flask\nfrom flask import Flask, render_template\nimport os # importing operating system module\nimport pymongo\n\nMONGODB_URI = 'mongodb+srv://asabeneh:your_password_goes_here@30daysofpython-twxkr.mongodb.net/test?retryWrites=true&w=majority'\nclient = pymongo.MongoClient(MONGODB_URI)\ndb = client['thirty_days_of_python'] # accessing the database\ndb.students.drop()",
      },
      {
        t: "p",
        c: "ตอนนี้เราได้ลบ students collection ออกจากฐานข้อมูลแล้ว",
      },
      { t: "h2", c: "แบบฝึกหัด: วันที่ 27" },
      {
        t: "callout",
        title: "ยินดีด้วย!",
        c: "คุณทำแบบฝึกหัดวันที่ 27 เสร็จแล้ว — ขอแสดงความยินดี!",
      },
    ],
  },
};
