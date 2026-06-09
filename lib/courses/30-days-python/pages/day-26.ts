import type { Page } from "@/lib/types";

const IMG = "https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images";

export const day26Page: Record<string, Page> = {
  "py30-day26": {
    slug: "py30-day26",
    title: "วันที่ 26 — เว็บด้วย Python (Python Web)",
    lead: "เรียนใช้ Flask สร้างเว็บแอปพลิเคชันด้วย Python — ตั้งแต่ route แรก จนถึง deploy บน Heroku",
    group: "สัปดาห์ที่ 6: เว็บ & API",
    blocks: [
      { t: "image", src: `${IMG}/30DaysOfPython_banner3@2x.png`, alt: "30 Days of Python Banner" },

      // H2: Python for Web
      { t: "h2", c: "Python สำหรับเว็บ" },
      { t: "p", c: "Python เป็นภาษาโปรแกรมที่ใช้งานทั่วไปและสามารถนำไปใช้ได้หลายที่ ในส่วนนี้ เราจะดูว่าเราใช้ Python สำหรับเว็บได้อย่างไร มี Python web framework มากมาย Django และ Flask เป็น framework ที่ได้รับความนิยมมากที่สุด วันนี้ เราจะดูวิธีใช้ Flask สำหรับ web development" },

      // H3: Flask
      { t: "h3", c: "Flask" },
      { t: "p", c: "Flask เป็น web development framework ที่เขียนด้วย Python Flask ใช้ Jinja2 template engine Flask ยังสามารถใช้ร่วมกับ front-end library สมัยใหม่อื่น ๆ เช่น React ได้" },
      { t: "p", c: "ถ้าคุณยังไม่ได้ติดตั้ง package virtualenv ให้ติดตั้งก่อน Virtual environment จะช่วยแยก project dependencies ออกจาก dependencies บนเครื่อง local" },

      // H4: Folder structure
      { t: "h3", c: "โครงสร้างโฟลเดอร์" },
      { t: "p", c: "หลังจากทำครบทุกขั้นตอนแล้ว โครงสร้างไฟล์ของ project ควรมีหน้าตาแบบนี้:" },
      {
        t: "code",
        lang: "shell",
        c: "\n├── Procfile\n├── app.py\n├── env\n│   ├── bin\n├── requirements.txt\n├── static\n│   └── css\n│       └── main.css\n└── templates\n    ├── about.html\n    ├── home.html\n    ├── layout.html\n    ├── post.html\n    └── result.html",
      },

      // H3: Setting up your project directory
      { t: "h3", c: "การตั้งค่า Project Directory" },
      { t: "p", c: "ทำตามขั้นตอนต่อไปนี้เพื่อเริ่มต้นใช้ Flask" },
      { t: "p", c: "ขั้นตอนที่ 1: ติดตั้ง virtualenv โดยใช้คำสั่งต่อไปนี้" },
      {
        t: "code",
        lang: "shell",
        c: "pip install virtualenv",
      },
      { t: "p", c: "ขั้นตอนที่ 2:" },
      {
        t: "code",
        lang: "shell",
        c: "asabeneh@Asabeneh:~/Desktop$ mkdir python_for_web\nasabeneh@Asabeneh:~/Desktop$ cd python_for_web/\nasabeneh@Asabeneh:~/Desktop/python_for_web$ virtualenv venv\nasabeneh@Asabeneh:~/Desktop/python_for_web$ source venv/bin/activate\n(env) asabeneh@Asabeneh:~/Desktop/python_for_web$ pip freeze\n(env) asabeneh@Asabeneh:~/Desktop/python_for_web$ pip install Flask\n(env) asabeneh@Asabeneh:~/Desktop/python_for_web$ pip freeze\nClick==7.0\nFlask==1.1.1\nitsdangerous==1.1.0\nJinja2==2.10.3\nMarkupSafe==1.1.1\nWerkzeug==0.16.0\n(env) asabeneh@Asabeneh:~/Desktop/python_for_web$",
      },
      { t: "p", c: "เราสร้าง project directory ชื่อ python_for_web ภายใน project เราสร้าง virtual environment ชื่อ venv (จะตั้งชื่ออะไรก็ได้แต่ผู้เขียนชอบใช้ชื่อ venv) จากนั้น activate virtual environment เราใช้ pip freeze เพื่อตรวจสอบ package ที่ติดตั้งใน project directory ผล pip freeze ว่างเปล่าเพราะยังไม่ได้ติดตั้ง package" },
      { t: "p", c: "ตอนนี้ มาสร้างไฟล์ app.py ใน project directory และเขียนโค้ดต่อไปนี้ ไฟล์ app.py จะเป็นไฟล์หลักของ project โค้ดต่อไปนี้มี flask module และ os module" },

      // H3: Creating routes
      { t: "h3", c: "การสร้าง Routes" },
      { t: "p", c: "Home route" },
      {
        t: "code",
        lang: "python",
        c: "# let's import the flask\nfrom flask import Flask\nimport os # importing operating system module\n\napp = Flask(__name__)\n\n@app.route('/') # this decorator create the home route\ndef home ():\n    return '<h1>Welcome</h1>'\n\nif __name__ == '__main__':\n    # for deployment we use the environ\n    # to make it work for both production and development\n    port = int(os.environ.get(\"PORT\", 5000))\n    app.run(debug=True, host='0.0.0.0', port=port)",
      },
      { t: "p", c: "ในการรัน flask application ให้พิมพ์ python app.py ใน directory หลักของ flask application" },
      { t: "p", c: "หลังจากรัน python app.py แล้วให้เช็ค local host 5000" },
      { t: "p", c: "มาเพิ่ม route เพิ่มเติม โดยสร้าง about route" },
      {
        t: "code",
        lang: "python",
        c: "# let's import the flask\nfrom flask import Flask\nimport os # importing operating system module\n\napp = Flask(__name__)\n\n@app.route('/') # this decorator create the home route\ndef home ():\n    return '<h1>Welcome</h1>'\n\n@app.route('/about')\ndef about():\n    return '<h1>About us</h1>'\n\nif __name__ == '__main__':\n    # for deployment we use the environ\n    # to make it work for both production and development\n    port = int(os.environ.get(\"PORT\", 5000))\n    app.run(debug=True, host='0.0.0.0', port=port)",
      },
      { t: "p", c: "ตอนนี้ เราได้เพิ่ม about route แล้ว แล้วถ้าเราต้องการ render ไฟล์ HTML แทนที่จะเป็น string ล่ะ? สามารถ render ไฟล์ HTML ได้โดยใช้ function render_template มาสร้างโฟลเดอร์ชื่อ templates และสร้าง home.html และ about.html ใน project directory มา import function render_template จาก flask ด้วย" },

      // H3: Creating templates
      { t: "h3", c: "การสร้าง Templates" },
      { t: "p", c: "สร้างไฟล์ HTML ภายในโฟลเดอร์ templates" },
      { t: "p", c: "home.html" },
      {
        t: "code",
        lang: "python",
        c: "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>Home</title>\n  </head>\n\n  <body>\n    <h1>Welcome Home</h1>\n  </body>\n</html>",
      },
      { t: "p", c: "about.html" },
      {
        t: "code",
        lang: "python",
        c: "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>About</title>\n  </head>\n\n  <body>\n    <h1>About Us</h1>\n  </body>\n</html>",
      },

      // H3: Python Script
      { t: "h3", c: "Python Script" },
      { t: "p", c: "app.py" },
      {
        t: "code",
        lang: "python",
        c: "# let's import the flask\nfrom flask import Flask, render_template\nimport os # importing operating system module\n\napp = Flask(__name__)\n\n@app.route('/') # this decorator create the home route\ndef home ():\n    return render_template('home.html')\n\n@app.route('/about')\ndef about():\n    return render_template('about.html')\n\nif __name__ == '__main__':\n    # for deployment we use the environ\n    # to make it work for both production and development\n    port = int(os.environ.get(\"PORT\", 5000))\n    app.run(debug=True, host='0.0.0.0', port=port)",
      },
      { t: "p", c: "ดังที่เห็น การไปยังหน้าต่าง ๆ หรือการ navigate จำเป็นต้องมี navigation มาเพิ่ม link ไปยังแต่ละหน้า หรือสร้าง layout ที่ใช้ในทุกหน้า" },

      // H3: Navigation
      { t: "h3", c: "Navigation" },
      {
        t: "code",
        lang: "python",
        c: "<ul>\n  <li><a href=\"/\">Home</a></li>\n  <li><a href=\"/about\">About</a></li>\n</ul>",
      },
      { t: "p", c: "ตอนนี้ เราสามารถ navigate ระหว่างหน้าต่าง ๆ โดยใช้ link ด้านบน มาสร้างหน้าเพิ่มเติมที่จัดการข้อมูลฟอร์ม ตั้งชื่อได้ตามต้องการ ผู้เขียนชอบเรียกว่า post.html" },
      { t: "p", c: "เราสามารถ inject ข้อมูลลงในไฟล์ HTML โดยใช้ Jinja2 template engine" },
      {
        t: "code",
        lang: "python",
        c: "# let's import the flask\nfrom flask import Flask, render_template, request, redirect, url_for\nimport os # importing operating system module\n\napp = Flask(__name__)\n\n@app.route('/') # this decorator create the home route\ndef home ():\n    techs = ['HTML', 'CSS', 'Flask', 'Python']\n    name = '30 Days Of Python Programming'\n    return render_template('home.html', techs=techs, name = name, title = 'Home')\n\n@app.route('/about')\ndef about():\n    name = '30 Days Of Python Programming'\n    return render_template('about.html', name = name, title = 'About Us')\n\n@app.route('/post')\ndef post():\n    name = 'Text Analyzer'\n    return render_template('post.html', name = name, title = name)\n\n\nif __name__ == '__main__':\n    # for deployment\n    # to make it work for both production and development\n    port = int(os.environ.get(\"PORT\", 5000))\n    app.run(debug=True, host='0.0.0.0', port=port)",
      },
      { t: "p", c: "มาดู templates ด้วย:" },
      { t: "p", c: "home.html" },
      {
        t: "code",
        lang: "python",
        c: "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>Home</title>\n  </head>\n\n  <body>\n    <ul>\n      <li><a href=\"/\">Home</a></li>\n      <li><a href=\"/about\">About</a></li>\n    </ul>\n    <h1>Welcome to {{name}}</h1>\n     <ul>\n    {% for tech in techs %}\n      <li>{{tech}}</li>\n    {% endfor %}\n    </ul>\n  </body>\n</html>",
      },
      { t: "p", c: "about.html" },
      {
        t: "code",
        lang: "python",
        c: "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>About Us</title>\n  </head>\n\n  <body>\n    <ul>\n      <li><a href=\"/\">Home</a></li>\n      <li><a href=\"/about\">About</a></li>\n    </ul>\n    <h1>About Us</h1>\n    <h2>{{name}}</h2>\n  </body>\n</html>",
      },

      // H3: Creating a layout
      { t: "h3", c: "การสร้าง Layout" },
      { t: "p", c: "ในไฟล์ template มีโค้ดที่ซ้ำกันมาก เราสามารถเขียน layout และลบความซ้ำซ้อนออกได้ มาสร้าง layout.html ภายในโฟลเดอร์ templates หลังจากสร้าง layout แล้ว เราจะ import ไปใช้ในทุกไฟล์" },

      // H4: Serving Static File
      { t: "h3", c: "การ Serve ไฟล์ Static" },
      { t: "p", c: "สร้างโฟลเดอร์ static ใน project directory ภายในโฟลเดอร์ static สร้างโฟลเดอร์ CSS หรือ styles แล้วสร้าง CSS stylesheet เราใช้ module url_for เพื่อ serve ไฟล์ static" },
      { t: "p", c: "layout.html" },
      {
        t: "code",
        lang: "python",
        c: "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <link\n      href=\"https://fonts.googleapis.com/css?family=Lato:300,400|Nunito:300,400|Raleway:300,400,500&display=swap\"\n      rel=\"stylesheet\"\n    />\n    <link\n      rel=\"stylesheet\"\n      href=\"{{ url_for('static', filename='css/main.css') }}\"\n    />\n    {% if title %}\n    <title>30 Days of Python - {{ title}}</title>\n    {% else %}\n    <title>30 Days of Python</title>\n    {% endif %}\n  </head>\n\n  <body>\n    <header>\n      <div class=\"menu-container\">\n        <div>\n          <a class=\"brand-name nav-link\" href=\"/\">30DaysOfPython</a>\n        </div>\n        <ul class=\"nav-lists\">\n          <li class=\"nav-list\">\n            <a class=\"nav-link active\" href=\"{{ url_for('home') }}\">Home</a>\n          </li>\n          <li class=\"nav-list\">\n            <a class=\"nav-link active\" href=\"{{ url_for('about') }}\">About</a>\n          </li>\n          <li class=\"nav-list\">\n            <a class=\"nav-link active\" href=\"{{ url_for('post') }}\"\n              >Text Analyzer</a\n            >\n          </li>\n        </ul>\n      </div>\n    </header>\n    <main>\n      {% block content %} {% endblock %}\n    </main>\n  </body>\n</html>",
      },
      { t: "p", c: "ตอนนี้ มาลบโค้ดที่ซ้ำซ้อนในไฟล์ template อื่น ๆ แล้ว import layout.html href ใช้ function url_for พร้อมชื่อ route function เพื่อเชื่อมต่อแต่ละ navigation route" },
      { t: "p", c: "home.html" },
      {
        t: "code",
        lang: "python",
        c: "{% extends 'layout.html' %} {% block content %}\n<div class=\"container\">\n  <h1>Welcome to {{name}}</h1>\n  <p>\n    This application clean texts and analyse the number of word, characters and\n    most frequent words in the text. Check it out by click text analyzer at the\n    menu. You need the following technologies to build this web application:\n  </p>\n  <ul class=\"tech-lists\">\n    {% for tech in techs %}\n    <li class=\"tech\">{{tech}}</li>\n\n    {% endfor %}\n  </ul>\n</div>\n\n{% endblock %}",
      },
      { t: "p", c: "about.html" },
      {
        t: "code",
        lang: "python",
        c: "{% extends 'layout.html' %} {% block content %}\n<div class=\"container\">\n  <h1>About {{name}}</h1>\n  <p>\n    This is a 30 days of python programming challenge. If you have been coding\n    this far, you are awesome. Congratulations for the job well done!\n  </p>\n</div>\n{% endblock %}",
      },
      { t: "p", c: "post.html" },
      {
        t: "code",
        lang: "python",
        c: "{% extends 'layout.html' %} {% block content %}\n<div class=\"container\">\n  <h1>Text Analyzer</h1>\n  <form action=\"https://thirtydaysofpython-v1.herokuapp.com/post\" method=\"POST\">\n    <div>\n      <textarea rows=\"25\" name=\"content\" autofocus></textarea>\n    </div>\n    <div>\n      <input type=\"submit\" class=\"btn\" value=\"Process Text\" />\n    </div>\n  </form>\n</div>\n\n{% endblock %}",
      },
      { t: "p", c: "Request methods มี request method หลายแบบ (GET, POST, PUT, DELETE) ซึ่งเป็น request method ทั่วไปที่ช่วยให้เราทำ CRUD (Create, Read, Update, Delete) operation ได้" },
      { t: "p", c: "ใน post route เราจะใช้ method GET และ POST สลับกันขึ้นอยู่กับประเภทของ request ดูได้ในโค้ดด้านล่าง request method เป็น function สำหรับจัดการ request methods และยังใช้เข้าถึงข้อมูล form ได้ด้วย" },
      { t: "p", c: "app.py" },
      {
        t: "code",
        lang: "python",
        c: "# let's import the flask\nfrom flask import Flask, render_template, request, redirect, url_for\nimport os # importing operating system module\n\napp = Flask(__name__)\n# to stop caching static file\napp.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0\n\n\n\n@app.route('/') # this decorator create the home route\ndef home ():\n    techs = ['HTML', 'CSS', 'Flask', 'Python']\n    name = '30 Days Of Python Programming'\n    return render_template('home.html', techs=techs, name = name, title = 'Home')\n\n@app.route('/about')\ndef about():\n    name = '30 Days Of Python Programming'\n    return render_template('about.html', name = name, title = 'About Us')\n\n@app.route('/result')\ndef result():\n    return render_template('result.html')\n\n@app.route('/post', methods= ['GET','POST'])\ndef post():\n    name = 'Text Analyzer'\n    if request.method == 'GET':\n         return render_template('post.html', name = name, title = name)\n    if request.method =='POST':\n        content = request.form['content']\n        print(content)\n        return redirect(url_for('result'))\n\nif __name__ == '__main__':\n    # for deployment\n    # to make it work for both production and development\n    port = int(os.environ.get(\"PORT\", 5000))\n    app.run(debug=True, host='0.0.0.0', port=port)",
      },
      { t: "p", c: "จนถึงตอนนี้ เราได้เรียนวิธีใช้ template วิธี inject ข้อมูลลงใน template วิธีสร้าง common layout แล้ว ตอนนี้ มาจัดการไฟล์ static กัน สร้างโฟลเดอร์ชื่อ static ใน project directory แล้วสร้างโฟลเดอร์ชื่อ css ภายใน css สร้าง main.css ไฟล์ main.css ของคุณจะถูก link ใน layout.html" },
      { t: "p", c: "ไม่จำเป็นต้องเขียนไฟล์ css เอง ให้ copy แล้วนำไปใช้ได้เลย มาต่อกันที่การ deploy" },

      // H3: Deployment
      { t: "h3", c: "การ Deploy" },

      // H4: Creating Heroku account
      { t: "h3", c: "การสร้างบัญชี Heroku" },
      { t: "p", c: "Heroku ให้บริการ deployment ฟรีสำหรับทั้ง front end และ fullstack applications สร้างบัญชีที่ heroku แล้วติดตั้ง heroku CLI สำหรับเครื่องของคุณ หลังจากติดตั้ง heroku แล้ว พิมพ์คำสั่งต่อไปนี้" },

      // H4: Login to Heroku
      { t: "h3", c: "การ Login เข้า Heroku" },
      {
        t: "code",
        lang: "shell",
        c: "asabeneh@Asabeneh:~$ heroku login\nheroku: Press any key to open up the browser to login or q to exit:",
      },
      { t: "p", c: "มาดูผลลัพธ์โดยกดปุ่มใดก็ได้บนแป้นพิมพ์ เมื่อกดปุ่มใด ๆ มันจะเปิดหน้า heroku login แล้วคลิกที่หน้า login จากนั้นเครื่อง local ของคุณจะเชื่อมต่อกับ Heroku server ระยะไกล ถ้าเชื่อมต่อสำเร็จ คุณจะเห็นสิ่งนี้:" },
      {
        t: "code",
        lang: "shell",
        c: "asabeneh@Asabeneh:~$ heroku login\nheroku: Press any key to open up the browser to login or q to exit:\nOpening browser to https://cli-auth.heroku.com/auth/browser/be12987c-583a-4458-a2c2-ba2ce7f41610\nLogging in... done\nLogged in as asabeneh@gmail.com\nasabeneh@Asabeneh:~$",
      },

      // H4: Create requirements and Procfile
      { t: "h3", c: "การสร้าง requirements และ Procfile" },
      { t: "p", c: "ก่อน push โค้ดไปยัง remote server เราต้องมีสิ่งเหล่านี้:" },
      {
        t: "ul",
        c: [
          "requirements.txt",
          "Procfile",
        ],
      },
      {
        t: "code",
        lang: "shell",
        c: "(env) asabeneh@Asabeneh:~/Desktop/python_for_web$ pip freeze\nClick==7.0\nFlask==1.1.1\nitsdangerous==1.1.0\nJinja2==2.10.3\nMarkupSafe==1.1.1\nWerkzeug==0.16.0\n(env) asabeneh@Asabeneh:~/Desktop/python_for_web$ touch requirements.txt\n(env) asabeneh@Asabeneh:~/Desktop/python_for_web$ pip freeze > requirements.txt\n(env) asabeneh@Asabeneh:~/Desktop/python_for_web$ cat requirements.txt\nClick==7.0\nFlask==1.1.1\nitsdangerous==1.1.0\nJinja2==2.10.3\nMarkupSafe==1.1.1\nWerkzeug==0.16.0\n(env) asabeneh@Asabeneh:~/Desktop/python_for_web$ touch Procfile\n(env) asabeneh@Asabeneh:~/Desktop/python_for_web$ ls\nProcfile          env/              static/\napp.py            requirements.txt  templates/\n(env) asabeneh@Asabeneh:~/Desktop/python_for_web$",
      },
      { t: "p", c: "Procfile จะมีคำสั่งที่รัน application บน web server ในกรณีของเราคือบน Heroku" },
      {
        t: "code",
        lang: "shell",
        c: "web: python app.py",
      },

      // H4: Pushing project to heroku
      { t: "h3", c: "การ Push Project ไปยัง Heroku" },
      { t: "p", c: "ตอนนี้พร้อม deploy แล้ว ขั้นตอนการ deploy application บน Heroku:" },
      {
        t: "ol",
        c: [
          "git init",
          "git add .",
          "git commit -m \"commit message\"",
          "heroku create 'name of the app as one word'",
          "git push heroku master",
          "heroku open (เพื่อเปิด application ที่ deploy แล้ว)",
        ],
      },
      { t: "p", c: "หลังจากขั้นตอนนี้ คุณจะได้ application เหมือน http://thirdaysofpython-practice.herokuapp.com/" },

      // H2: Exercises
      { t: "h2", c: "แบบฝึกหัด: วันที่ 26" },
      {
        t: "ol",
        c: [
          "คุณจะสร้าง application นี้ https://thirtydaysofpython-v1-final.herokuapp.com/ ส่วนที่เหลือคือ text analyser เท่านั้น",
        ],
      },
    ],
  },
};
