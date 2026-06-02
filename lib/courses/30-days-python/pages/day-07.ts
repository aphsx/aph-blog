import type { Page } from "@/lib/types";

export const day07Page: Record<string, Page> = {
  "py30-day07": {
    slug: "py30-day07",
    title: "วันที่ 7 — เซต (Sets)",
    lead: "เรียนรู้ Set ใน Python — collection ที่ไม่มีลำดับ ไม่มี index และไม่มีค่าซ้ำ",
    group: "สัปดาห์ที่ 2: โครงสร้างข้อมูล & การควบคุม",
    blocks: [
      { t: "h2", c: "เซต (Sets)" },
      { t: "p", c: "Set คือ collection ของสมาชิก ลองนึกถึง Set ในวิชาคณิตศาสตร์ระดับประถมหรือมัธยม นิยามของ set ในคณิตศาสตร์สามารถนำมาใช้ใน Python ได้เช่นกัน Set คือ collection ของ distinct elements ที่ไม่มีลำดับและไม่มี index ใน Python set ใช้เก็บค่าที่ไม่ซ้ำกัน และสามารถหา union, intersection, difference, symmetric difference, subset, super set และ disjoint set ระหว่าง set ได้" },

      { t: "h3", c: "การสร้าง Set" },
      { t: "p", c: "ใช้ฟังก์ชัน set() ในการสร้าง empty set วงเล็บปีกกา {} จะสร้าง dictionary ไม่ใช่ set" },
      { t: "p", c: "สร้าง empty set:" },
      { t: "code", lang: "python", c: "# syntax\nst = set()" },
      { t: "p", c: "สร้าง set ที่มีค่าเริ่มต้น:" },
      { t: "code", lang: "python", c: "# syntax\nst = {'item1', 'item2', 'item3', 'item4'}" },
      { t: "p", c: "ตัวอย่าง:" },
      { t: "code", lang: "python", c: "# syntax\nfruits = {'banana', 'orange', 'mango', 'lemon'}" },

      { t: "h3", c: "ความยาวของ Set" },
      { t: "p", c: "ใช้ len() เพื่อหาความยาวของ set:" },
      { t: "code", lang: "python", c: "# syntax\nst = {'item1', 'item2', 'item3', 'item4'}\nlen(st)" },
      { t: "code", lang: "python", c: "fruits = {'banana', 'orange', 'mango', 'lemon'}\nlen(fruits)" },

      { t: "h3", c: "การเข้าถึงสมาชิกใน Set" },
      { t: "p", c: "เราใช้ loop ในการเข้าถึงสมาชิก จะเรียนในหัวข้อ loop" },

      { t: "h3", c: "การเช็คสมาชิก" },
      { t: "p", c: "ใช้ตัวดำเนินการ in เพื่อตรวจสอบว่าสมาชิกมีอยู่ใน set หรือไม่:" },
      { t: "code", lang: "python", c: "# syntax\nst = {'item1', 'item2', 'item3', 'item4'}\nprint(\"Does set st contain item3? \", 'item3' in st) # Does set st contain item3? True" },
      { t: "code", lang: "python", c: "fruits = {'banana', 'orange', 'mango', 'lemon'}\nprint('mango' in fruits) # True" },

      { t: "h3", c: "การเพิ่มสมาชิกเข้า Set" },
      { t: "p", c: "เมื่อสร้าง set แล้วเราไม่สามารถเปลี่ยนสมาชิกที่มีอยู่ได้ แต่สามารถเพิ่มสมาชิกใหม่ได้" },
      { t: "p", c: "เพิ่มสมาชิกหนึ่งตัวด้วย add():" },
      { t: "code", lang: "python", c: "# syntax\nst = {'item1', 'item2', 'item3', 'item4'}\nst.add('item5')" },
      { t: "code", lang: "python", c: "fruits = {'banana', 'orange', 'mango', 'lemon'}\nfruits.add('lime')" },
      { t: "p", c: "เพิ่มสมาชิกหลายตัวด้วย update() — รับ list เป็น argument:" },
      { t: "code", lang: "python", c: "# syntax\nst = {'item1', 'item2', 'item3', 'item4'}\nst.update(['item5','item6','item7'])" },
      { t: "code", lang: "python", c: "fruits = {'banana', 'orange', 'mango', 'lemon'}\nvegetables = ('tomato', 'potato', 'cabbage','onion', 'carrot')\nfruits.update(vegetables)" },

      { t: "h3", c: "การลบสมาชิกออกจาก Set" },
      { t: "p", c: "ใช้ remove() ลบสมาชิก ถ้าสมาชิกไม่มีอยู่ remove() จะ raise error ส่วน discard() จะไม่ raise error:" },
      { t: "code", lang: "python", c: "# syntax\nst = {'item1', 'item2', 'item3', 'item4'}\nst.remove('item2')" },
      { t: "p", c: "pop() ลบสมาชิกแบบ random และคืนค่าสมาชิกที่ถูกลบ:" },
      { t: "code", lang: "python", c: "fruits = {'banana', 'orange', 'mango', 'lemon'}\nfruits.pop()  # removes a random item from the set" },
      { t: "code", lang: "python", c: "fruits = {'banana', 'orange', 'mango', 'lemon'}\nremoved_item = fruits.pop()" },

      { t: "h3", c: "การล้างสมาชิกทั้งหมดใน Set" },
      { t: "p", c: "ใช้ clear() เพื่อลบสมาชิกทั้งหมดออกจาก set:" },
      { t: "code", lang: "python", c: "# syntax\nst = {'item1', 'item2', 'item3', 'item4'}\nst.clear()" },
      { t: "code", lang: "python", c: "fruits = {'banana', 'orange', 'mango', 'lemon'}\nfruits.clear()\nprint(fruits) # set()" },

      { t: "h3", c: "การลบ Set" },
      { t: "p", c: "ใช้ del เพื่อลบ set ทั้งก้อน:" },
      { t: "code", lang: "python", c: "# syntax\nst = {'item1', 'item2', 'item3', 'item4'}\ndel st" },
      { t: "code", lang: "python", c: "fruits = {'banana', 'orange', 'mango', 'lemon'}\ndel fruits" },

      { t: "h3", c: "การแปลง List เป็น Set" },
      { t: "p", c: "เราสามารถแปลง list เป็น set และ set เป็น list ได้ การแปลง list เป็น set จะลบค่าซ้ำออก เหลือแต่ค่าที่ unique:" },
      { t: "code", lang: "python", c: "# syntax\nlst = ['item1', 'item2', 'item3', 'item4', 'item1']\nst = set(lst)  # {'item2', 'item4', 'item1', 'item3'} - the order is random, because sets in general are unordered" },
      { t: "code", lang: "python", c: "fruits = ['banana', 'orange', 'mango', 'lemon','orange', 'banana']\nfruits = set(fruits) # {'mango', 'lemon', 'banana', 'orange'}" },

      { t: "h3", c: "การรวม Set (Joining)" },
      { t: "p", c: "ใช้ union() หรือ update() หรือสัญลักษณ์ | ในการรวม set:" },
      { t: "p", c: "Union — คืน set ใหม่:" },
      { t: "code", lang: "python", c: "# syntax\nst1 = {'item1', 'item2', 'item3', 'item4'}\nst2 = {'item5', 'item6', 'item7', 'item8'}\nst3 = st1.union(st2) #st3 = st1 | st2" },
      { t: "code", lang: "python", c: "fruits = {'banana', 'orange', 'mango', 'lemon'}\nvegetables = {'tomato', 'potato', 'cabbage','onion', 'carrot'}\nprint(fruits.union(vegetables)) # {'lemon', 'carrot', 'tomato', 'banana', 'mango', 'orange', 'cabbage', 'potato', 'onion'}\n# or using this : print(fruits | vegetables)" },
      { t: "p", c: "Update — เพิ่มสมาชิกของ set หนึ่งเข้าไปใน set ที่กำหนด:" },
      { t: "code", lang: "python", c: "# syntax\nst1 = {'item1', 'item2', 'item3', 'item4'}\nst2 = {'item5', 'item6', 'item7', 'item8'}\nst1.update(st2) # st2 contents are added to st1" },
      { t: "code", lang: "python", c: "fruits = {'banana', 'orange', 'mango', 'lemon'}\nvegetables = {'tomato', 'potato', 'cabbage','onion', 'carrot'}\nfruits.update(vegetables)\nprint(fruits) # {'lemon', 'carrot', 'tomato', 'banana', 'mango', 'orange', 'cabbage', 'potato', 'onion'}" },

      { t: "h3", c: "การหา Intersection" },
      { t: "p", c: "Intersection คืนค่าสมาชิกที่มีอยู่ใน set ทั้งสอง หรือใช้สัญลักษณ์ &:" },
      { t: "code", lang: "python", c: "# syntax\nst1 = {'item1', 'item2', 'item3', 'item4'}\nst2 = {'item3', 'item2'}\nst1.intersection(st2) # {'item3', 'item2'}\n# or using this : st1 & st2" },
      { t: "code", lang: "python", c: "whole_numbers = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10}\neven_numbers  = {0, 2, 4, 6, 8, 10}\nwhole_numbers.intersection(even_numbers) # {0, 2, 4, 6, 8, 10}\n\npython = {'p', 'y', 't', 'h', 'o','n'}\ndragon = {'d', 'r', 'a', 'g', 'o','n'}\npython.intersection(dragon)     # {'o', 'n'}\n# python & dragon" },

      { t: "h3", c: "การเช็ค Subset และ Super Set" },
      { t: "p", c: "set หนึ่งอาจเป็น subset หรือ super set ของ set อื่น:" },
      { t: "ul", c: [
        "Subset: issubset()",
        "Super set: issuperset()",
      ]},
      { t: "code", lang: "python", c: "# syntax\nst1 = {'item1', 'item2', 'item3', 'item4'}\nst2 = {'item2', 'item3'}\nst2.issubset(st1)   # True\nst1.issuperset(st2) # True" },
      { t: "code", lang: "python", c: "whole_numbers = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10}\neven_numbers  = {0, 2, 4, 6, 8, 10}\nwhole_numbers.issubset(even_numbers)   # False, because it is a super set\nwhole_numbers.issuperset(even_numbers) # True\n\npython = {'p', 'y', 't', 'h', 'o','n'}\ndragon = {'d', 'r', 'a', 'g', 'o','n'}\npython.issubset(dragon)     # False" },

      { t: "h3", c: "การหา Difference ระหว่าง Set" },
      { t: "p", c: "คืนค่าความแตกต่างระหว่าง set สองตัว หรือใช้สัญลักษณ์ -:" },
      { t: "code", lang: "python", c: "# syntax\nst1 = {'item1', 'item2', 'item3', 'item4'}\nst2 = {'item2', 'item3'}\nst2.difference(st1) # set() : st2 - st1\nst1.difference(st2) # {'item1', 'item4'} => st1\\st2  : st2 - st1" },
      { t: "code", lang: "python", c: "whole_numbers = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10}\neven_numbers  = {0, 2, 4, 6, 8, 10}\nwhole_numbers.difference(even_numbers) # {1, 3, 5, 7, 9}\n\npython = {'p', 'y', 't', 'o','n'}\ndragon = {'d', 'r', 'a', 'g', 'o','n'}\npython.difference(dragon)     # {'p', 'y', 't'}  - the result is unordered (characteristic of sets)\n# python - dragon\ndragon.difference(python)     # {'d', 'r', 'a', 'g'}\n# dragon - python" },

      { t: "h3", c: "การหา Symmetric Difference ระหว่าง Set" },
      { t: "p", c: "คืนค่า symmetric difference ระหว่าง set ซึ่งก็คือสมาชิกที่อยู่ในทั้งสอง set แต่ไม่ได้อยู่ในส่วน intersection ทางคณิตศาสตร์คือ (A\\B) ∪ (B\\A):" },
      { t: "code", lang: "python", c: "# syntax\nst1 = {'item1', 'item2', 'item3', 'item4'}\nst2 = {'item2', 'item3'}\n# it means (A\\B)∪(B\\A)\nst2.symmetric_difference(st1) # {'item1', 'item4'} : st2 ^ st1" },
      { t: "code", lang: "python", c: "whole_numbers = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10}\nsome_numbers  = {1, 2, 3, 4, 5}\nwhole_numbers.symmetric_difference(some_numbers) # {0, 6, 7, 8, 9, 10}\n\npython = {'p', 'y', 't', 'h', 'o','n'}\ndragon = {'d', 'r', 'a', 'g', 'o','n'}\npython.symmetric_difference(dragon)  # {'r', 't', 'p', 'y', 'g', 'a', 'd', 'h'}\n# python ^ dragon" },

      { t: "h3", c: "Joining Sets" },
      { t: "p", c: "ถ้า set สองตัวไม่มีสมาชิกร่วมกันเลยเรียกว่า disjoint sets ใช้ isdisjoint() ตรวจสอบ:" },
      { t: "code", lang: "python", c: "# syntax\nst1 = {'item1', 'item2', 'item3', 'item4'}\nst2 = {'item2', 'item3'}\nst2.isdisjoint(st1) # False" },
      { t: "code", lang: "python", c: "even_numbers = {0, 2, 4 ,6, 8}\nodd_numbers  = {1, 3, 5, 7, 9}\neven_numbers.isdisjoint(odd_numbers) # True, because no common item\n\npython = {'p', 'y', 't', 'h', 'o','n'}\ndragon = {'d', 'r', 'a', 'g', 'o','n'}\npython.isdisjoint(dragon)  # False, there are common items {'o', 'n'}" },

      { t: "h2", c: "💻 แบบฝึกหัด — วันที่ 7" },
      { t: "code", lang: "python", c: "# sets\nit_companies = {'Facebook', 'Google', 'Microsoft', 'Apple', 'IBM', 'Oracle', 'Amazon'}\nA = {19, 22, 24, 20, 25, 26}\nB = {19, 22, 20, 25, 26, 24, 28, 27}\nage = [22, 19, 24, 25, 26, 24, 25, 24]" },

      { t: "h3", c: "ระดับ 1" },
      { t: "ol", c: [
        "Find the length of the set it_companies",
        "Add 'Twitter' to it_companies",
        "Insert multiple IT companies at once to the set it_companies",
        "Remove one of the companies from the set it_companies",
        "What is the difference between remove and discard",
      ]},

      { t: "h3", c: "ระดับ 2" },
      { t: "ol", c: [
        "Join A and B",
        "Find A intersection B",
        "Is A subset of B",
        "Are A and B disjoint sets",
        "Join A with B and B with A",
        "What is the symmetric difference between A and B",
        "Delete the sets completely",
      ]},

      { t: "h3", c: "ระดับ 3" },
      { t: "ol", c: [
        "Convert the ages to a set and compare the length of the list and the set, which one is bigger?",
        "Explain the difference between the following data types: string, list, tuple and set",
        "I am a teacher and I love to inspire and teach people. How many unique words have been used in the sentence? Use the split methods and set to get the unique words.",
      ]},
    ],
  },
};
