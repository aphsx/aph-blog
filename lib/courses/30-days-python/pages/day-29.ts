import type { Page } from "@/lib/types";

const IMG = "https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images";

export const day29Page: Record<string, Page> = {
  "py30-day29": {
    slug: "py30-day29",
    title: "วันที่ 29 — สร้าง API (Building API)",
    lead: "เรียนรู้การสร้าง RESTful API ด้วย Python Flask และ MongoDB รองรับ GET, POST, PUT, DELETE ครบวงจร",
    group: "สัปดาห์ที่ 6: เว็บ & API",
    blocks: [
      { t: "image", src: `${IMG}/30DaysOfPython_banner3@2x.png`, alt: "30 Days of Python Banner", caption: "30 Days of Python — Day 29" },

      { t: "h2", c: "สร้าง API (Building API)" },

      { t: "p", c: "ในส่วนนี้ เราจะครอบคลุม RESTful API ที่ใช้ HTTP request methods ในการ GET, PUT, POST และ DELETE ข้อมูล" },
      { t: "p", c: "RESTful API คือ application program interface (API) ที่ใช้ HTTP requests เพื่อ GET, PUT, POST และ DELETE ข้อมูล ในบทก่อนหน้านี้เราได้เรียนเรื่อง Python, Flask และ MongoDB แล้ว เราจะนำความรู้เหล่านั้นมาพัฒนา RESTful API โดยใช้ Python Flask และ MongoDB แอปพลิเคชันทุกตัวที่มีการทำงานแบบ CRUD (Create, Read, Update, Delete) จะมี API สำหรับสร้างข้อมูล ดึงข้อมูล อัปเดตข้อมูล หรือลบข้อมูลออกจากฐานข้อมูล" },
      { t: "p", c: "เบราว์เซอร์สามารถจัดการได้เฉพาะ GET request เท่านั้น ดังนั้นเราจึงต้องมีเครื่องมือที่ช่วยจัดการ request methods ทั้งหมด ได้แก่ GET, POST, PUT, DELETE" },
      { t: "p", c: "ตัวอย่าง API:" },
      { t: "ul", c: [
        "Countries API: https://restcountries.eu/rest/v2/all",
        "Cats breed API: https://api.thecatapi.com/v1/breeds",
      ]},
      { t: "p", c: "Postman เป็นเครื่องมือที่ได้รับความนิยมอย่างมากในการพัฒนา API ดังนั้นหากต้องการทำบทนี้ให้ดาวน์โหลด Postman ก่อน อีกทางเลือกหนึ่งของ Postman คือ Insomnia" },
      { t: "image", src: `${IMG}/postman.png`, alt: "Postman", caption: "Postman — เครื่องมือสำหรับทดสอบ API" },

      { t: "h3", c: "โครงสร้างของ API (Structure of an API)" },

      { t: "p", c: "API endpoint คือ URL ที่ใช้สำหรับดึงข้อมูล สร้างข้อมูล อัปเดตข้อมูล หรือลบ resource โครงสร้างมีลักษณะดังนี้:" },
      { t: "p", c: "ตัวอย่าง: https://api.twitter.com/1.1/lists/members.json — จะ return สมาชิกของ list ที่ระบุ โดยสมาชิกของ private list จะแสดงเฉพาะเมื่อผู้ใช้ที่ยืนยันตัวตนแล้วเป็นเจ้าของ list นั้น โครงสร้างคือชื่อบริษัทตามด้วยเวอร์ชันตามด้วยวัตถุประสงค์ของ API" },
      { t: "p", c: "HTTP methods และ URL:" },
      { t: "p", c: "API ใช้ HTTP methods ต่อไปนี้ในการจัดการ object:" },
      { t: "code", lang: "shell", c: "GET        Used for object retrieval\nPOST       Used for object creation and object actions\nPUT        Used for object update\nDELETE     Used for object deletion" },
      { t: "p", c: "มาสร้าง API ที่รวบรวมข้อมูลเกี่ยวกับนักศึกษาใน 30DaysOfPython กัน เราจะรวบรวมชื่อ ประเทศ เมือง วันเกิด ทักษะ และประวัติส่วนตัว" },
      { t: "p", c: "ในการพัฒนา API นี้เราจะใช้:" },
      { t: "ul", c: [
        "Postman",
        "Python",
        "Flask",
        "MongoDB",
      ]},

      { t: "h3", c: "การดึงข้อมูลด้วย GET (Retrieving data using get)" },

      { t: "p", c: "ในขั้นตอนนี้ เราจะใช้ข้อมูลจำลองและ return กลับมาในรูปแบบ JSON ในการ return เป็น JSON เราจะใช้ json module และ Response module" },
      { t: "code", lang: "python", c: "# let's import the flask\n\nfrom flask import Flask,  Response\nimport json\nimport os\n\napp = Flask(__name__)\n\n@app.route('/api/v1.0/students', methods = ['GET'])\ndef students ():\n    student_list = [\n        {\n            'name':'Asabeneh',\n            'country':'Finland',\n            'city':'Helsinki',\n            'skills':['HTML', 'CSS','JavaScript','Python']\n        },\n        {\n            'name':'David',\n            'country':'UK',\n            'city':'London',\n            'skills':['Python','MongoDB']\n        },\n        {\n            'name':'John',\n            'country':'Sweden',\n            'city':'Stockholm',\n            'skills':['Java','C#']\n        }\n    ]\n    return Response(json.dumps(student_list), mimetype='application/json')\n\n\nif __name__ == '__main__':\n    # for deployment\n    # to make it work for both production and development\n    port = int(os.environ.get(\"PORT\", 5000))\n    app.run(debug=True, host='0.0.0.0', port=port)" },
      { t: "p", c: "เมื่อคุณเรียก URL http://localhost:5000/api/v1.0/students บนเบราว์เซอร์ คุณจะได้ผลลัพธ์ดังนี้:" },
      { t: "image", src: `${IMG}/get_on_browser.png`, alt: "GET request บนเบราว์เซอร์", caption: "แสดงผล JSON บนเบราว์เซอร์" },
      { t: "p", c: "เมื่อคุณเรียก URL http://localhost:5000/api/v1.0/students บน Postman คุณจะได้ผลลัพธ์ดังนี้:" },
      { t: "image", src: `${IMG}/get_on_postman.png`, alt: "GET request บน Postman", caption: "แสดงผล JSON บน Postman" },
      { t: "p", c: "แทนที่จะแสดงข้อมูลจำลอง มาเชื่อมต่อแอปพลิเคชัน Flask กับ MongoDB แล้วดึงข้อมูลจากฐานข้อมูล MongoDB กัน" },
      { t: "code", lang: "python", c: "# let's import the flask\n\nfrom flask import Flask,  Response\nimport json\nimport pymongo\nimport os\n\napp = Flask(__name__)\n\n#\nMONGODB_URI='mongodb+srv://asabeneh:your_password@30daysofpython-twxkr.mongodb.net/test?retryWrites=true&w=majority'\nclient = pymongo.MongoClient(MONGODB_URI)\ndb = client['thirty_days_of_python'] # accessing the database\n\n@app.route('/api/v1.0/students', methods = ['GET'])\ndef students ():\n\n    return Response(json.dumps(student), mimetype='application/json')\n\n\nif __name__ == '__main__':\n    # for deployment\n    # to make it work for both production and development\n    port = int(os.environ.get(\"PORT\", 5000))\n    app.run(debug=True, host='0.0.0.0', port=port)" },
      { t: "p", c: "เมื่อเชื่อมต่อ Flask กับ MongoDB แล้ว เราสามารถดึงข้อมูล students collection จากฐานข้อมูล thirty_days_of_python ได้" },
      { t: "code", lang: "shell", c: "[\n    {\n        \"_id\": {\n            \"$oid\": \"5df68a21f106fe2d315bbc8b\"\n        },\n        \"name\": \"Asabeneh\",\n        \"country\": \"Finland\",\n        \"city\": \"Helsinki\",\n        \"age\": 38\n    },\n    {\n        \"_id\": {\n            \"$oid\": \"5df68a23f106fe2d315bbc8c\"\n        },\n        \"name\": \"David\",\n        \"country\": \"UK\",\n        \"city\": \"London\",\n        \"age\": 34\n    },\n    {\n        \"_id\": {\n            \"$oid\": \"5df68a23f106fe2d315bbc8e\"\n        },\n        \"name\": \"Sami\",\n        \"country\": \"Finland\",\n        \"city\": \"Helsinki\",\n        \"age\": 25\n    }\n]" },

      { t: "h3", c: "การดึงข้อมูลด้วย ID (Getting a document by id)" },

      { t: "p", c: "เราสามารถเข้าถึงเอกสารแต่ละรายการโดยใช้ id ได้ มาเข้าถึงข้อมูลของ Asabeneh โดยใช้ id ของเขากัน: http://localhost:5000/api/v1.0/students/5df68a21f106fe2d315bbc8b" },
      { t: "code", lang: "python", c: "# let's import the flask\n\nfrom flask import Flask,  Response\nimport json\nfrom bson.objectid import ObjectId\nimport json\nfrom bson.json_util import dumps\nimport pymongo\nimport os\n\napp = Flask(__name__)\n\n#\nMONGODB_URI='mongodb+srv://asabeneh:your_password@30daysofpython-twxkr.mongodb.net/test?retryWrites=true&w=majority'\nclient = pymongo.MongoClient(MONGODB_URI)\ndb = client['thirty_days_of_python'] # accessing the database\n\n@app.route('/api/v1.0/students', methods = ['GET'])\ndef students ():\n\n    return Response(json.dumps(student), mimetype='application/json')\n@app.route('/api/v1.0/students/<id>', methods = ['GET'])\ndef single_student (id):\n    student = db.students.find({'_id':ObjectId(id)})\n    return Response(dumps(student), mimetype='application/json')\n\nif __name__ == '__main__':\n    # for deployment\n    # to make it work for both production and development\n    port = int(os.environ.get(\"PORT\", 5000))\n    app.run(debug=True, host='0.0.0.0', port=port)" },
      { t: "code", lang: "shell", c: "[\n    {\n        \"_id\": {\n            \"$oid\": \"5df68a21f106fe2d315bbc8b\"\n        },\n        \"name\": \"Asabeneh\",\n        \"country\": \"Finland\",\n        \"city\": \"Helsinki\",\n        \"age\": 38\n    }\n]" },

      { t: "h3", c: "การสร้างข้อมูลด้วย POST (Creating data using POST)" },

      { t: "p", c: "เราใช้ POST request method ในการสร้างข้อมูล" },
      { t: "code", lang: "python", c: "# let's import the flask\n\nfrom flask import Flask,  Response\nimport json\nfrom bson.objectid import ObjectId\nimport json\nfrom bson.json_util import dumps\nimport pymongo\nfrom datetime import datetime\nimport os\n\napp = Flask(__name__)\n\n#\nMONGODB_URI='mongodb+srv://asabeneh:your_password@30daysofpython-twxkr.mongodb.net/test?retryWrites=true&w=majority'\nclient = pymongo.MongoClient(MONGODB_URI)\ndb = client['thirty_days_of_python'] # accessing the database\n\n@app.route('/api/v1.0/students', methods = ['GET'])\ndef students ():\n\n    return Response(json.dumps(student), mimetype='application/json')\n@app.route('/api/v1.0/students/<id>', methods = ['GET'])\ndef single_student (id):\n    student = db.students.find({'_id':ObjectId(id)})\n    return Response(dumps(student), mimetype='application/json')\n@app.route('/api/v1.0/students', methods = ['POST'])\ndef create_student ():\n    name = request.form['name']\n    country = request.form['country']\n    city = request.form['city']\n    skills = request.form['skills'].split(', ')\n    bio = request.form['bio']\n    birthyear = request.form['birthyear']\n    created_at = datetime.now()\n    student = {\n        'name': name,\n        'country': country,\n        'city': city,\n        'birthyear': birthyear,\n        'skills': skills,\n        'bio': bio,\n        'created_at': created_at\n\n    }\n    db.students.insert_one(student)\n    return ;\ndef update_student (id):\nif __name__ == '__main__':\n    # for deployment\n    # to make it work for both production and development\n    port = int(os.environ.get(\"PORT\", 5000))\n    app.run(debug=True, host='0.0.0.0', port=port)" },

      { t: "h3", c: "การอัปเดตด้วย PUT (Updating using PUT)" },

      { t: "code", lang: "python", c: "# let's import the flask\n\nfrom flask import Flask,  Response\nimport json\nfrom bson.objectid import ObjectId\nimport json\nfrom bson.json_util import dumps\nimport pymongo\nfrom datetime import datetime\nimport os\n\napp = Flask(__name__)\n\n#\nMONGODB_URI='mongodb+srv://asabeneh:your_password@30daysofpython-twxkr.mongodb.net/test?retryWrites=true&w=majority'\nclient = pymongo.MongoClient(MONGODB_URI)\ndb = client['thirty_days_of_python'] # accessing the database\n\n@app.route('/api/v1.0/students', methods = ['GET'])\ndef students ():\n\n    return Response(json.dumps(student), mimetype='application/json')\n@app.route('/api/v1.0/students/<id>', methods = ['GET'])\ndef single_student (id):\n    student = db.students.find({'_id':ObjectId(id)})\n    return Response(dumps(student), mimetype='application/json')\n@app.route('/api/v1.0/students', methods = ['POST'])\ndef create_student ():\n    name = request.form['name']\n    country = request.form['country']\n    city = request.form['city']\n    skills = request.form['skills'].split(', ')\n    bio = request.form['bio']\n    birthyear = request.form['birthyear']\n    created_at = datetime.now()\n    student = {\n        'name': name,\n        'country': country,\n        'city': city,\n        'birthyear': birthyear,\n        'skills': skills,\n        'bio': bio,\n        'created_at': created_at\n\n    }\n    db.students.insert_one(student)\n    return\n@app.route('/api/v1.0/students/<id>', methods = ['PUT']) # this decorator create the home route\ndef update_student (id):\n    query = {\"_id\":ObjectId(id)}\n    name = request.form['name']\n    country = request.form['country']\n    city = request.form['city']\n    skills = request.form['skills'].split(', ')\n    bio = request.form['bio']\n    birthyear = request.form['birthyear']\n    created_at = datetime.now()\n    student = {\n        'name': name,\n        'country': country,\n        'city': city,\n        'birthyear': birthyear,\n        'skills': skills,\n        'bio': bio,\n        'created_at': created_at\n\n    }\n    db.students.update_one(query, student)\n    # return Response(dumps({\"result\":\"a new student has been created\"}), mimetype='application/json')\n    return\ndef update_student (id):\nif __name__ == '__main__':\n    # for deployment\n    # to make it work for both production and development\n    port = int(os.environ.get(\"PORT\", 5000))\n    app.run(debug=True, host='0.0.0.0', port=port)" },

      { t: "h3", c: "การลบเอกสารด้วย DELETE (Deleting a document using Delete)" },

      { t: "code", lang: "python", c: "# let's import the flask\n\nfrom flask import Flask,  Response\nimport json\nfrom bson.objectid import ObjectId\nimport json\nfrom bson.json_util import dumps\nimport pymongo\nfrom datetime import datetime\nimport os\n\napp = Flask(__name__)\n\n#\nMONGODB_URI='mongodb+srv://asabeneh:your_password@30daysofpython-twxkr.mongodb.net/test?retryWrites=true&w=majority'\nclient = pymongo.MongoClient(MONGODB_URI)\ndb = client['thirty_days_of_python'] # accessing the database\n\n@app.route('/api/v1.0/students', methods = ['GET'])\ndef students ():\n\n    return Response(json.dumps(student), mimetype='application/json')\n@app.route('/api/v1.0/students/<id>', methods = ['GET'])\ndef single_student (id):\n    student = db.students.find({'_id':ObjectId(id)})\n    return Response(dumps(student), mimetype='application/json')\n@app.route('/api/v1.0/students', methods = ['POST'])\ndef create_student ():\n    name = request.form['name']\n    country = request.form['country']\n    city = request.form['city']\n    skills = request.form['skills'].split(', ')\n    bio = request.form['bio']\n    birthyear = request.form['birthyear']\n    created_at = datetime.now()\n    student = {\n        'name': name,\n        'country': country,\n        'city': city,\n        'birthyear': birthyear,\n        'skills': skills,\n        'bio': bio,\n        'created_at': created_at\n\n    }\n    db.students.insert_one(student)\n    return\n@app.route('/api/v1.0/students/<id>', methods = ['PUT']) # this decorator create the home route\ndef update_student (id):\n    query = {\"_id\":ObjectId(id)}\n    name = request.form['name']\n    country = request.form['country']\n    city = request.form['city']\n    skills = request.form['skills'].split(', ')\n    bio = request.form['bio']\n    birthyear = request.form['birthyear']\n    created_at = datetime.now()\n    student = {\n        'name': name,\n        'country': country,\n        'city': city,\n        'birthyear': birthyear,\n        'skills': skills,\n        'bio': bio,\n        'created_at': created_at\n\n    }\n    db.students.update_one(query, student)\n    # return Response(dumps({\"result\":\"a new student has been created\"}), mimetype='application/json')\n    return\n@app.route('/api/v1.0/students/<id>', methods = ['PUT']) # this decorator create the home route\ndef update_student (id):\n    query = {\"_id\":ObjectId(id)}\n    name = request.form['name']\n    country = request.form['country']\n    city = request.form['city']\n    skills = request.form['skills'].split(', ')\n    bio = request.form['bio']\n    birthyear = request.form['birthyear']\n    created_at = datetime.now()\n    student = {\n        'name': name,\n        'country': country,\n        'city': city,\n        'birthyear': birthyear,\n        'skills': skills,\n        'bio': bio,\n        'created_at': created_at\n\n    }\n    db.students.update_one(query, student)\n    # return Response(dumps({\"result\":\"a new student has been created\"}), mimetype='application/json')\n    return ;\n@app.route('/api/v1.0/students/<id>', methods = ['DELETE'])\ndef delete_student (id):\n    db.students.delete_one({\"_id\":ObjectId(id)})\n    return\nif __name__ == '__main__':\n    # for deployment\n    # to make it work for both production and development\n    port = int(os.environ.get(\"PORT\", 5000))\n    app.run(debug=True, host='0.0.0.0', port=port)" },

      { t: "h2", c: "แบบฝึกหัด — วันที่ 29" },

      { t: "ol", c: [
        "พัฒนาตัวอย่างข้างต้นและสร้าง API ตาม https://thirtydayofpython-api.herokuapp.com/",
      ]},

      { t: "p", c: "🎉 ยินดีด้วย ! 🎉" },
    ],
  },
};
