import type { Page } from "@/lib/types";

const IMG = "https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images";

export const day05Page: Record<string, Page> = {
  "py30-day05": {
    slug: "py30-day05",
    title: { th: "วันที่ 5 — ลิสต์ (Lists)", en: "" },
    lead: { th: "เรียนรู้โครงสร้างข้อมูล List ใน Python — การสร้าง การเข้าถึง การแก้ไข และ methods ที่ใช้งานบ่อย", en: "" },
    group: "สัปดาห์ที่ 1: พื้นฐาน Python",
    blocks: {
      th: [
        { t: "h2", c: "ลิสต์ (Lists)" },
        { t: "p", c: "List คือ collection ของชนิดข้อมูลต่าง ๆ ที่มีลำดับและแก้ไขได้ (ordered and modifiable/mutable) List ยอมให้มีค่าซ้ำกันได้ List ว่างจะเป็น list ที่ไม่มีค่าใด ๆ อยู่เลย" },

        { t: "h3", c: "วิธีสร้าง List" },
        { t: "p", c: "ใน Python เราสามารถสร้าง list ด้วยสองวิธี:" },
        { t: "ul", c: [
          "ใช้ built-in function list()",
          "ใช้ square brackets []",
        ]},
        { t: "code", lang: "python", c: "# syntax\nlst = list()\n# หรือ\nlst = []" },
        { t: "code", lang: "python", c: "# Lists containing data of various types\nfirst_list  = []     # empty list\nfirst_list  = ['Banana']     # list with single item\nfruits      = ['banana', 'orange', 'mango', 'lemon']                # list of fruits\nvegetables  = ['Tomato', 'Potato', 'Cabbage','Onion', 'Carrot']     # list of vegetables\nanimal_products = ['milk', 'meat', 'butter', 'yoghurt']             # list of animal products\nweb_techs   = ['HTML', 'CSS', 'Bootstrap', 'JavaScript', 'React', 'Redux', 'NodeJs'] # list of web technologies\ncountries   = ['Finland', 'Estonia', 'Denmark', 'Sweden', 'Norway']\n\n# Print the lists and its length\nprint('Fruits:', fruits)\nprint('Number of fruits:', len(fruits))\nprint('Vegetables:', vegetables)\nprint('Number of vegetables:', len(vegetables))\nprint('Animal products:',animal_products)\nprint('Number of animal products:', len(animal_products))\nprint('Web technologies:', web_techs)\nprint('Number of web technologies:', len(web_techs))\nprint('Countries:', countries)\nprint('Number of countries:', len(countries))" },
        { t: "p", c: "List สามารถมีชนิดข้อมูลต่างกันในตัวเดียวกันได้ รวมถึง list ซ้อน list:" },
        { t: "code", lang: "python", c: " # List can have different data types at the same time\nmy_list = ['Asabeneh', 250, True, {'country':'Finland', 'city':'Helsinki'}] # list containing different data types" },

        { t: "h3", c: "การเข้าถึงสมาชิกด้วย Positive Index" },
        { t: "p", c: "เราเข้าถึงสมาชิกแต่ละตัวใน list ได้ด้วย index ของมัน การนับ index ใน list เริ่มจาก 0" },
        { t: "image", src: `${IMG}/list_index.png`, alt: "List index", caption: "การนับ index ของ list ใน Python" },
        { t: "code", lang: "python", c: "fruits = ['banana', 'orange', 'mango', 'lemon']\nfirst_fruit  = fruits[0]  # we are accessing the first item using its index\nprint(first_fruit)        # banana\nsecond_fruit = fruits[1]\nprint(second_fruit)       # orange\nlast_fruit   = fruits[3]\nprint(last_fruit)         # lemon\n# Last index\nlast_index   = len(fruits) - 1\nlast_fruit   = fruits[last_index]\nprint(last_fruit)         # lemon" },

        { t: "h3", c: "การเข้าถึงสมาชิกด้วย Negative Index" },
        { t: "p", c: "การนับ negative index เริ่มจากท้ายสุด โดย -1 คือสมาชิกตัวสุดท้าย" },
        { t: "image", src: `${IMG}/list_negative_indexing.png`, alt: "List negative indexing", caption: "การใช้ negative index กับ list ใน Python" },
        { t: "code", lang: "python", c: "fruits = ['banana', 'orange', 'mango', 'lemon']\nall_fruits   = fruits[-4:]  # it returns all the fruits\n# Negative indexing means starting from the end\nfirst_fruit  = fruits[-4]\nprint(first_fruit)      # banana\nsecond_fruit = fruits[-3]\nprint(second_fruit)     # orange\nlast_fruit   = fruits[-1]\nprint(last_fruit)       # lemon" },

        { t: "h3", c: "การ Unpack สมาชิก List" },
        { t: "code", lang: "python", c: "lst = ['item','item2','item3', 'item4', 'item5']\nfirst_item, second_item, third_item, *rest = lst\nprint(first_item)   # item1\nprint(second_item)  # item2\nprint(third_item)   # item3\nprint(rest)         # ['item4', 'item5']\n\n# First Example\nfruits = ['banana', 'orange', 'mango', 'lemon','lime','cherry']\nfirst_fruit, second_fruit, third_fruit, *rest = fruits\nprint(first_fruit)   # banana\nprint(second_fruit)  # orange\nprint(third_fruit)   # mango\nprint(rest)          # ['lemon','lime','cherry']\n\n# Second Example about unpacking list\nfirst, second, third,*rest, tenth = [1,2,3,4,5,6,7,8,9,10]\nprint(first)  # 1\nprint(second) # 2\nprint(third)  # 3\nprint(rest)   # [4,5,6,7,8,9]\nprint(tenth)  # 10\n\n# Third Example about unpacking list\ncountries = ['Germany', 'France','Belgium','Sweden','Denmark','Finland','Norway','Iceland','Estonia']\ngr, fr, bg, sw, *scandic, es = countries\nprint(gr)\nprint(fr)\nprint(bg)\nprint(sw)\nprint(scandic)\nprint(es)" },

        { t: "h3", c: "การตัด List (Slicing)" },
        { t: "p", c: "ใช้ positive index ในการตัด:" },
        { t: "code", lang: "python", c: "fruits = ['banana', 'orange', 'mango', 'lemon']\nall_fruits = fruits[0:4]    # it returns all the fruits\n                            # this is also the same as fruits[0:]\nprint('All: ', all_fruits)  # All: ['banana', 'orange', 'mango', 'lemon']\nall_fruits = fruits[0:4:2]  # here we used a 3rd argument, step. It will take every 2cnd item - ['banana', 'mango']\nprint('All: ', all_fruits)  # All: ['banana', 'mango']\nall_fruits = fruits[::-1]   # negative step will take the list in reverse order\nprint('Reverse: ', all_fruits) # Reverse: ['lemon', 'mango', 'orange', 'banana']\nfruits = ['banana', 'orange', 'mango', 'lemon']\nfirst_three = fruits[0:3]   # The first three items start at index 0 to index 3\nprint('First three items: ', first_three) # First three items: ['banana', 'orange', 'mango']" },
        { t: "p", c: "ใช้ negative index ในการตัด:" },
        { t: "code", lang: "python", c: "fruits = ['banana', 'orange', 'mango', 'lemon']\nall_fruits = fruits[-4:]         # it returns all the fruits\nprint('All: ', all_fruits)       # All: ['banana', 'orange', 'mango', 'lemon']\nall_fruits = fruits[-4:-1]       # it does not include the last index\nprint('All except the last: ', all_fruits) # All except the last: ['banana', 'orange', 'mango']\nall_fruits = fruits[-3:-1]       # ['orange', 'mango']\nprint('All except the first and last: ', all_fruits) # All except the first and last: ['orange', 'mango']" },

        { t: "h3", c: "การแก้ไข List" },
        { t: "p", c: "List เป็น mutable หมายความว่าแก้ไขค่าได้:" },
        { t: "code", lang: "python", c: "fruits = ['banana', 'orange', 'mango', 'lemon']\nfruits[0] = 'avocado'\nprint(fruits)       # ['avocado', 'orange', 'mango', 'lemon']\nfruits[1] = 'apple'\nprint(fruits)       # ['avocado', 'apple', 'mango', 'lemon']\nlast_index = len(fruits) - 1\nfruits[last_index] = 'lime'\nprint(fruits)       # ['avocado', 'apple', 'mango', 'lime']" },

        { t: "h3", c: "การเช็คสมาชิกใน List" },
        { t: "code", lang: "python", c: "fruits = ['banana', 'orange', 'mango', 'lemon']\ndoes_exist = 'banana' in fruits\nprint(does_exist)  # True\ndoes_exist = 'lime' in fruits\nprint(does_exist)  # False" },

        { t: "h3", c: "การเพิ่มสมาชิกเข้า List" },
        { t: "p", c: "ใช้ append() เพิ่มสมาชิกที่ท้าย list:" },
        { t: "code", lang: "python", c: "# syntax\nlst = list()\nlst.append(item)\n\nfruits = ['banana', 'orange', 'mango', 'lemon']\nfruits.append('apple')\nprint(fruits)           # ['banana', 'orange', 'mango', 'lemon', 'apple']\nfruits.append('lime')   # ['banana', 'orange', 'mango', 'lemon', 'apple', 'lime']\nprint(fruits)" },
        { t: "p", c: "ใช้ insert() เพิ่มสมาชิกที่ตำแหน่ง index ที่กำหนด:" },
        { t: "code", lang: "python", c: "# syntax\nlst = ['item1', 'item2']\nlst.insert(index, item)\n\nfruits = ['banana', 'orange', 'mango', 'lemon']\nfruits.insert(2, 'apple') # insert apple between orange and mango\nprint(fruits)             # ['banana', 'orange', 'apple', 'mango', 'lemon']\nfruits.insert(3, 'lime')  # ['banana', 'orange', 'apple', 'lime', 'mango', 'lemon']\nprint(fruits)" },

        { t: "h3", c: "การลบสมาชิกออกจาก List" },
        { t: "p", c: "ใช้ remove() ลบสมาชิกที่ระบุออกจาก list:" },
        { t: "code", lang: "python", c: "# syntax\nlst = ['item1', 'item2']\nlst.remove(item)\n\nfruits = ['banana', 'orange', 'mango', 'lemon', 'banana']\nfruits.remove('banana')\nprint(fruits)  # ['orange', 'mango', 'lemon', 'banana'] - removes the first occurrence of banana" },
        { t: "p", c: "ใช้ pop() ลบและคืนค่าสมาชิกที่ index ที่กำหนด (ถ้าไม่ระบุ index จะลบตัวท้ายสุด):" },
        { t: "code", lang: "python", c: "# syntax\nlst = ['item1', 'item2']\nlst.pop()       # last item\nlst.pop(index)\n\nfruits = ['banana', 'orange', 'mango', 'lemon']\nfruits.pop()\nprint(fruits)       # ['banana', 'orange', 'mango']\n\nfruits.pop(0)\nprint(fruits)       # ['orange', 'mango']" },
        { t: "p", c: "ใช้ del ลบสมาชิกที่ index หรือ slice ที่กำหนด นอกจากนี้ยังใช้ลบ list ทั้งหมดได้:" },
        { t: "code", lang: "python", c: "# syntax\nlst = ['item1', 'item2']\ndel lst[index] # only a single item\ndel lst        # to delete the list completely\n\nfruits = ['banana', 'orange', 'mango', 'lemon', 'kiwi', 'lime']\ndel fruits[0]\nprint(fruits)       # ['orange', 'mango', 'lemon', 'kiwi', 'lime']\ndel fruits[1]\nprint(fruits)       # ['orange', 'lemon', 'kiwi', 'lime']\ndel fruits[1:3]     # this deletes items between given indexes, so it does not delete the item with index 3!\nprint(fruits)       # ['orange', 'lime']\ndel fruits\nprint(fruits)       # This should give: NameError: name 'fruits' is not defined" },
        { t: "p", c: "ใช้ clear() ลบสมาชิกทั้งหมดออกจาก list:" },
        { t: "code", lang: "python", c: "# syntax\nlst = ['item1', 'item2']\nlst.clear()\n\nfruits = ['banana', 'orange', 'mango', 'lemon']\nfruits.clear()\nprint(fruits) # []" },

        { t: "h3", c: "การคัดลอก List" },
        { t: "p", c: "อาจเกิดปัญหาได้เมื่อ reassign list ให้ตัวแปรใหม่ เพราะจะเป็นแค่การอ้างอิงแบบ reference ไม่ใช่ copy จริง ๆ การใช้ copy() จะช่วยหลีกเลี่ยงปัญหานี้:" },
        { t: "code", lang: "python", c: "# syntax\nlst = ['item1', 'item2']\nlst_copy = lst.copy()\n\nfruits = ['banana', 'orange', 'mango', 'lemon']\nfruits_copy = fruits.copy()\nprint(fruits_copy)       # ['banana', 'orange', 'mango', 'lemon']" },

        { t: "h3", c: "การต่อ List" },
        { t: "p", c: "มีหลายวิธีในการรวม list เข้าด้วยกัน:" },
        { t: "p", c: "ใช้เครื่องหมาย + หรือ extend():" },
        { t: "code", lang: "python", c: "# syntax\nlist3 = list1 + list2\n\npositives = [1, 2, 3, 4, 5]\nnegatives = [-5, -4, -3, -2, -1]\nintegers  = positives + negatives\nprint(integers)          # [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5]\nprint(len(integers))     # 10\n\nfruits    = ['banana', 'orange', 'mango', 'lemon']\nvegitables = ['Tomato', 'Potato', 'Cabbage', 'Onion', 'Carrot']\nfruits_and_vegitables = fruits + vegitables\nprint(fruits_and_vegitables)\n# ['banana', 'orange', 'mango', 'lemon', 'Tomato', 'Potato', 'Cabbage', 'Onion', 'Carrot']" },
        { t: "code", lang: "python", c: "# syntax\nlist1 = ['item1', 'item2']\nlist2 = ['item3', 'item4','item5']\nlist1.extend(list2)\n\nnum1 = [0, 1, 2, 3]\nnum2 = [4, 5, 6]\nnum1.extend(num2)\nprint('Numbers:', num1) # Numbers: [0, 1, 2, 3, 4, 5, 6]\nneg_num = [-5,-4,-3,-2,-1,0]\npositive = [1, 2, 3, 4, 5]\nneg_num.extend(positive)\nprint('Integers:', neg_num) # Integers: [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]" },

        { t: "h3", c: "การนับสมาชิก" },
        { t: "p", c: "ใช้ count() นับจำนวนครั้งที่สมาชิกปรากฏใน list:" },
        { t: "code", lang: "python", c: "# syntax\nlst = ['item1', 'item2', 'item3', 'item1', 'item2']\nprint(lst.count('item1')) # 2\n\nfruits = ['banana', 'orange', 'mango', 'lemon']\nprint(fruits.count('orange')) # 1" },

        { t: "h3", c: "การหา Index" },
        { t: "p", c: "ใช้ index() หา index ของสมาชิก:" },
        { t: "code", lang: "python", c: "# syntax\nlst = ['item1', 'item2', 'item3']\nlst.index('item2') # 1\n\nfruits = ['banana', 'orange', 'mango', 'lemon']\nprint(fruits.index('orange')) # 1" },

        { t: "h3", c: "การกลับลำดับ List" },
        { t: "p", c: "ใช้ reverse() กลับลำดับของ list:" },
        { t: "code", lang: "python", c: "# syntax\nlst = ['item1', 'item2', 'item3']\nlst.reverse()\n\nfruits = ['banana', 'orange', 'mango', 'lemon']\nfruits.reverse()\nprint(fruits.reverse())  # None\nprint(fruits)            # ['lemon', 'mango', 'orange', 'banana']" },

        { t: "h3", c: "การเรียงลำดับ List" },
        { t: "p", c: "ใช้ sort() เรียงลำดับ list โดยแก้ไข list ต้นฉบับ หรือใช้ sorted() ที่คืน list ใหม่โดยไม่แก้ต้นฉบับ:" },
        { t: "code", lang: "python", c: "# syntax\nlst = ['item3', 'item2', 'item1']\nlst.sort()                # ['item1', 'item2', 'item3']\nlst.sort(reverse=True)    # ['item3', 'item2', 'item1']\nsorted(lst, reverse=True) # ['item3', 'item2', 'item1']\n\nfruits = ['banana', 'orange', 'mango', 'lemon']\nfruits.sort()\nprint(fruits)             # sorted in alphabetical order, ['banana', 'lemon', 'mango', 'orange']\nfruits.sort(reverse=True)\nprint(fruits)             # ['orange', 'mango', 'lemon', 'banana']\n\nages = [22, 19, 24, 25, 26, 24, 25, 24]\nages.sort()\nprint(ages)               # [19, 22, 24, 24, 24, 25, 25, 26]\n\nages.sort(reverse=True)\nprint(ages)               # [26, 25, 25, 24, 24, 24, 22, 19]\nprint(sorted(ages))       # [19, 22, 24, 24, 24, 25, 25, 26]\nprint(sorted(ages, reverse=True)) # [26, 25, 25, 24, 24, 24, 22, 19]" },

        { t: "h2", c: "💻 แบบฝึกหัด — วันที่ 5" },

        { t: "h3", c: "ระดับ 1" },
        { t: "ol", c: [
          "ประกาศ empty list",
          "ประกาศ list ที่มีสมาชิกมากกว่า 5 รายการ",
          "หาความยาวของ list ด้วย len()",
          "รับ first item, middle item และ last item จาก list",
          "ประกาศ list ชื่อ mixed_data_types แล้วใส่ข้อมูลส่วนตัว (ชื่อ, อายุ, ส่วนสูง, สถานภาพการสมรส, ที่อยู่)",
          "ประกาศตัวแปร list ชื่อ it_companies และกำหนดค่าเริ่มต้นเป็น Facebook, Google, Microsoft, Apple, IBM, Oracle, Amazon",
          "Print list ด้วย print()",
          "Print จำนวน companies ใน list",
          "Print first, middle และ last company",
          "Print list หลังจาก modify company ใด company หนึ่ง",
          "เพิ่ม IT company ลงใน list",
          "Insert IT company ตรงกลาง list",
          "เปลี่ยนชื่อ IT company หนึ่งใน list เป็นตัวพิมพ์ใหญ่ (ยกเว้น IBM!)",
          "Join it_companies ด้วย string '#; '",
          "เช็คว่า 'Google' มีอยู่ใน it_companies list หรือไม่",
          "เรียงลำดับ list ด้วย sort()",
          "Reverse list ด้วย reverse() method",
          "ตัด first 3 companies ออกจาก list",
          "ตัด last 3 companies ออกจาก list",
          "ตัด middle IT company หรือ companies ออกจาก list",
          "ลบ company แรกออกจาก list",
          "ลบ middle IT company หรือ companies ออกจาก list",
          "ลบ last IT company ออกจาก list",
          "ลบ IT companies ทั้งหมดออกจาก list",
          "ทำลาย list ทิ้งทั้งหมด",
          "Join lists ต่อไปนี้:\nfront_end = ['HTML', 'CSS', 'JS', 'React', 'Redux']\nback_end = ['Node','Express', 'MongoDB']",
          "หลังจาก join lists ใน task ข้างต้น แล้ว copy ผลลัพธ์แล้วเก็บในตัวแปร full_stack จากนั้น insert Python และ SQL หลังจาก Redux",
        ]},

        { t: "h3", c: "ระดับ 2" },
        { t: "ol", c: [
          "List ต่อไปนี้มีอายุของนักเรียน 10 คน:\nages = [19, 22, 19, 24, 20, 25, 26, 24, 25, 24]\nเรียงลำดับ list และหาค่า min และ max age\nเพิ่ม min age และ max age กลับเข้าไปใน list อีกครั้ง\nหา median age (สมาชิกตรงกลาง หรือค่าเฉลี่ยของสองตัวกลาง)\nหาค่า mean age โดย (sum of all items / number of items)\nหาค่า range ของ ages โดย (max - min)\nเปรียบเทียบ (min - average) กับ (max - average) โดยใช้ abs()",
          "Find the middle country(ies) in the countries list:\ncountries = ['China', 'Russia', 'USA', 'Finland', 'Sweden', 'Norway', 'Denmark']",
          "แยก countries list ออกเป็นสองส่วนเท่า ๆ กัน (หรือไม่เท่ากันถ้า list มีจำนวนคี่)",
          "Unpack สามประเทศแรกและที่เหลือเป็น scandic countries จาก ['China', 'Russia', 'USA', 'Finland', 'Sweden', 'Norway', 'Denmark']",
        ]},
      ],
      en: [],
    },
  },
};
