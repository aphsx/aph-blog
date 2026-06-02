import type { Page } from "@/lib/types";

export const day08Page: Record<string, Page> = {
  "py30-day08": {
    slug: "py30-day08",
    title: "วันที่ 8 — ดิกชันนารี (Dictionaries)",
    lead: "เรียนรู้ Dictionary ใน Python — โครงสร้างข้อมูลแบบ key:value ที่ไม่มีลำดับและแก้ไขได้",
    group: "สัปดาห์ที่ 2: โครงสร้างข้อมูล & การควบคุม",
    blocks: [
      { t: "h2", c: "ดิกชันนารี (Dictionaries)" },
      { t: "p", c: "Dictionary คือ collection ของข้อมูลแบบ key:value pairs ที่ไม่มีลำดับ แก้ไขได้ (mutable) สร้างด้วยวงเล็บปีกกา {} หรือฟังก์ชัน dict()" },
      { t: "code", lang: "python", c: "# syntax\nempty_dict = {}\ndct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}" },
      { t: "code", lang: "python", c: "person = {\n    'first_name':'Asabeneh',\n    'last_name':'Yetayeh',\n    'age':250,\n    'country':'Finland',\n    'is_marred':True,\n    'skills':['JavaScript', 'React', 'Node', 'MongoDB', 'Python'],\n    'address':{\n        'street':'Space street',\n        'zipcode':'02210'\n    }\n    }" },

      { t: "h3", c: "ความยาวของ Dictionary" },
      { t: "p", c: "ใช้ len() หาจำนวน key:value pairs ใน dictionary:" },
      { t: "code", lang: "python", c: "dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}\nprint(len(dct)) # 4" },
      { t: "code", lang: "python", c: "person = {\n    'first_name':'Asabeneh',\n    'last_name':'Yetayeh',\n    'age':250,\n    'country':'Finland',\n    'is_married':True,\n    'skills':['JavaScript', 'React', 'Node', 'MongoDB', 'Python'],\n    'address':{\n        'street':'Space street',\n        'zipcode':'02210'\n    }\n    }\nprint(len(person)) # 7" },

      { t: "h3", c: "การเข้าถึงสมาชิกใน Dictionary" },
      { t: "p", c: "เข้าถึงค่าโดยใช้ชื่อ key หรือใช้ get() method:" },
      { t: "code", lang: "python", c: "dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}\nprint(dct['key1']) # value1\nprint(dct['key4']) # value4" },
      { t: "code", lang: "python", c: "person = {\n    'first_name':'Asabeneh',\n    'last_name':'Yetayeh',\n    'age':250,\n    'country':'Finland',\n    'is_marred':True,\n    'skills':['JavaScript', 'React', 'Node', 'MongoDB', 'Python'],\n    'address':{\n        'street':'Space street',\n        'zipcode':'02210'\n    }\n    }\nprint(person['first_name']) # Asabeneh\nprint(person['country'])    # Finland\nprint(person['skills'])     # ['JavaScript', 'React', 'Node', 'MongoDB', 'Python']\nprint(person['skills'][0])  # JavaScript\nprint(person['address']['street']) # Space street\nprint(person['city'])       # Error" },
      { t: "p", c: "การเข้าถึงด้วย get() จะไม่ raise error ถ้าไม่พบ key แต่จะคืนค่า None:" },
      { t: "code", lang: "python", c: "person = {\n    'first_name':'Asabeneh',\n    'last_name':'Yetayeh',\n    'age':250,\n    'country':'Finland',\n    'is_marred':True,\n    'skills':['JavaScript', 'React', 'Node', 'MongoDB', 'Python'],\n    'address':{\n        'street':'Space street',\n        'zipcode':'02210'\n    }\n    }\nprint(person.get('first_name')) # Asabeneh\nprint(person.get('country'))    # Finland\nprint(person.get('skills')) #['JavaScript', 'React', 'Node', 'MongoDB', 'Python']\nprint(person.get('city'))   # None" },

      { t: "h3", c: "การเพิ่มสมาชิกใน Dictionary" },
      { t: "code", lang: "python", c: "dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}\ndct['key5'] = 'value5'" },
      { t: "code", lang: "python", c: "person = {\n    'first_name':'Asabeneh',\n    'last_name':'Yetayeh',\n    'age':250,\n    'country':'Finland',\n    'is_marred':True,\n    'skills':['JavaScript', 'React', 'Node', 'MongoDB', 'Python'],\n    'address':{\n        'street':'Space street',\n        'zipcode':'02210'\n        }\n}\nperson['job_title'] = 'Instructor'\nperson['skills'].append('HTML')\nprint(person)" },

      { t: "h3", c: "การแก้ไขสมาชิกใน Dictionary" },
      { t: "code", lang: "python", c: "dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}\ndct['key1'] = 'value-one'" },
      { t: "code", lang: "python", c: "person = {\n    'first_name':'Asabeneh',\n    'last_name':'Yetayeh',\n    'age':250,\n    'country':'Finland',\n    'is_marred':True,\n    'skills':['JavaScript', 'React', 'Node', 'MongoDB', 'Python'],\n    'address':{\n        'street':'Space street',\n        'zipcode':'02210'\n    }\n    }\nperson['first_name'] = 'Eyob'\nperson['age'] = 252" },

      { t: "h3", c: "การเช็ค Key ใน Dictionary" },
      { t: "code", lang: "python", c: "dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}\nprint('key2' in dct) # True\nprint('key5' in dct) # False" },

      { t: "h3", c: "การลบ Key และ Value ออกจาก Dictionary" },
      { t: "p", c: "ใช้ pop(), popitem() หรือ del:" },
      { t: "code", lang: "python", c: "dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}\ndct.pop('key1')    # removes key1 item\ndct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}\ndct.popitem()      # removes the last item\ndel dct['key2']    # removes key2 item" },
      { t: "code", lang: "python", c: "person = {\n    'first_name':'Asabeneh',\n    'last_name':'Yetayeh',\n    'age':250,\n    'country':'Finland',\n    'is_marred':True,\n    'skills':['JavaScript', 'React', 'Node', 'MongoDB', 'Python'],\n    'address':{\n        'street':'Space street',\n        'zipcode':'02210'\n    }\n    }\nperson.pop('first_name')        # Removes the firstname item\nperson.popitem()                # Removes the address item\ndel person['is_married']        # Removes the is_married item" },

      { t: "h3", c: "การแปลง Dictionary เป็น List ของ Tuples" },
      { t: "p", c: "ใช้ items() เพื่อแปลง dictionary เป็น list ของ tuples:" },
      { t: "code", lang: "python", c: "dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}\nprint(dct.items()) # dict_items([('key1', 'value1'), ('key2', 'value2'), ('key3', 'value3'), ('key4', 'value4')])" },

      { t: "h3", c: "การล้าง Dictionary" },
      { t: "code", lang: "python", c: "dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}\nprint(dct.clear()) # None" },

      { t: "h3", c: "การลบ Dictionary" },
      { t: "code", lang: "python", c: "dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}\ndel dct" },

      { t: "h3", c: "การคัดลอก Dictionary" },
      { t: "code", lang: "python", c: "dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}\ndct_copy = dct.copy() # {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}" },

      { t: "h3", c: "การดึง Keys เป็น List" },
      { t: "code", lang: "python", c: "dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}\nkeys = dct.keys()\nprint(keys)     # dict_keys(['key1', 'key2', 'key3', 'key4'])" },

      { t: "h3", c: "การดึง Values เป็น List" },
      { t: "code", lang: "python", c: "dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}\nvalues = dct.values()\nprint(values)     # dict_values(['value1', 'value2', 'value3', 'value4'])" },

      { t: "h2", c: "💻 แบบฝึกหัด — วันที่ 8" },
      { t: "ol", c: [
        "Create an empty dictionary called dog",
        "Add name, color, breed, legs, age to the dog dictionary",
        "Create a student dictionary and add first_name, last_name, gender, age, marital status, skills, country, city and address as keys for the dictionary",
        "Get the length of the student dictionary",
        "Get the value of skills and check the data type, it should be a list",
        "Modify the skills values by adding one or two skills",
        "Get the dictionary keys as a list",
        "Get the dictionary values as a list",
        "Change the dictionary to a list of tuples using items() method",
        "Delete one of the items in the dictionary",
        "Delete one of the dictionaries",
      ]},
    ],
  },
};
