import type { Page } from "@/lib/types";

const IMG = "https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images";

export const day25Page: Record<string, Page> = {
  "py30-day25": {
    slug: "py30-day25",
    title: "วันที่ 25 — Pandas",
    lead: "เรียน Pandas — ไลบรารีสำหรับ data manipulation ที่ทรงพลังที่สุดใน Python ecosystem",
    group: "สัปดาห์ที่ 5: OOP & ข้อมูล",
    blocks: [
      { t: "image", src: `${IMG}/30DaysOfPython_banner3@2x.png`, alt: "30 Days of Python Banner" },

      // H2: Pandas
      { t: "h2", c: "Pandas" },
      { t: "p", c: "Pandas เป็น open source library ที่มีประสิทธิภาพสูง ใช้งานง่าย สำหรับโครงสร้างข้อมูลและเครื่องมือวิเคราะห์ข้อมูลใน Python Pandas เพิ่มโครงสร้างข้อมูลและเครื่องมือที่ออกแบบมาเพื่อทำงานกับข้อมูลแบบตาราง ได้แก่ Series และ Data Frames Pandas มีเครื่องมือสำหรับการจัดการข้อมูล:" },
      {
        t: "ul",
        c: [
          "reshaping",
          "merging",
          "sorting",
          "slicing",
          "aggregation",
          "imputation",
        ],
      },
      { t: "p", c: "ถ้าคุณใช้ anaconda อยู่แล้ว ไม่จำเป็นต้องติดตั้ง pandas เพิ่มเติม" },

      // H3: Installing Pandas
      { t: "h3", c: "การติดตั้ง Pandas" },
      { t: "p", c: "สำหรับ Mac:" },
      {
        t: "code",
        lang: "python",
        c: "pip install conda\nconda install pandas",
      },
      { t: "p", c: "สำหรับ Windows:" },
      {
        t: "code",
        lang: "python",
        c: "pip install conda\npip install pandas",
      },
      { t: "p", c: "โครงสร้างข้อมูลของ Pandas อิงจาก Series และ DataFrames" },
      { t: "p", c: "Series คือ column และ DataFrame คือตาราง multidimensional ที่ประกอบด้วย Series หลายชุด ในการสร้าง pandas series เราควรใช้ numpy เพื่อสร้าง array หนึ่งมิติ หรือใช้ python list มาดูตัวอย่างของ series:" },

      { t: "p", c: "Names Pandas Series" },
      { t: "image", src: `${IMG}/pandas-series-1.png`, alt: "pandas series", caption: "ตัวอย่าง Names Pandas Series" },
      { t: "p", c: "Countries Series" },
      { t: "image", src: `${IMG}/pandas-series-2.png`, alt: "pandas series", caption: "ตัวอย่าง Countries Series" },
      { t: "p", c: "Cities Series" },
      { t: "image", src: `${IMG}/pandas-series-3.png`, alt: "pandas series", caption: "ตัวอย่าง Cities Series" },
      { t: "p", c: "ดังที่เห็น pandas series คือข้อมูลเพียงหนึ่งคอลัมน์ ถ้าต้องการหลายคอลัมน์ เราใช้ data frames ตัวอย่างด้านล่างแสดง pandas DataFrames" },
      { t: "p", c: "มาดูตัวอย่าง pandas data frame:" },
      { t: "image", src: `${IMG}/pandas-dataframe-1.png`, alt: "Pandas data frame", caption: "ตัวอย่าง Pandas DataFrame" },
      { t: "p", c: "Data frame คือชุดของแถวและคอลัมน์ ดูตารางด้านล่าง มีคอลัมน์มากกว่าตัวอย่างข้างบนมาก:" },
      { t: "image", src: `${IMG}/pandas-dataframe-2.png`, alt: "Pandas data frame", caption: "ตัวอย่าง Pandas DataFrame ที่มีหลายคอลัมน์" },
      { t: "p", c: "ต่อไป เราจะดูวิธี import pandas และวิธีสร้าง Series และ DataFrames โดยใช้ pandas" },

      // H3: Importing Pandas
      { t: "h3", c: "การ Import Pandas" },
      {
        t: "code",
        lang: "python",
        c: "import pandas as pd # importing pandas as pd\nimport numpy  as np # importing numpy as np",
      },

      // H3: Creating Pandas Series with Default Index
      { t: "h3", c: "การสร้าง Pandas Series ด้วย Default Index" },
      {
        t: "code",
        lang: "python",
        c: "nums = [1, 2, 3, 4,5]\ns = pd.Series(nums)\nprint(s)",
      },
      {
        t: "code",
        lang: "shell",
        c: "    0    1\n    1    2\n    2    3\n    3    4\n    4    5\n    dtype: int64",
      },

      // H3: Creating Pandas Series with custom index
      { t: "h3", c: "การสร้าง Pandas Series ด้วย Index ที่กำหนดเอง" },
      {
        t: "code",
        lang: "python",
        c: "nums = [1, 2, 3, 4, 5]\ns = pd.Series(nums, index=[1, 2, 3, 4, 5])\nprint(s)",
      },
      {
        t: "code",
        lang: "shell",
        c: "    1    1\n    2    2\n    3    3\n    4    4\n    5    5\n    dtype: int64",
      },
      {
        t: "code",
        lang: "python",
        c: "fruits = ['Orange','Banana','Mango']\nfruits = pd.Series(fruits, index=[1, 2, 3])\nprint(fruits)",
      },
      {
        t: "code",
        lang: "shell",
        c: "    1    Orange\n    2    Banana\n    3    Mango\n    dtype: object",
      },

      // H3: Creating Pandas Series from a Dictionary
      { t: "h3", c: "การสร้าง Pandas Series จาก Dictionary" },
      {
        t: "code",
        lang: "python",
        c: "dct = {'name':'Asabeneh','country':'Finland','city':'Helsinki'}",
      },
      {
        t: "code",
        lang: "python",
        c: "s = pd.Series(dct)\nprint(s)",
      },
      {
        t: "code",
        lang: "shell",
        c: "    name       Asabeneh\n    country     Finland\n    city       Helsinki\n    dtype: object",
      },

      // H3: Creating a Constant Pandas Series
      { t: "h3", c: "การสร้าง Pandas Series แบบค่าคงที่" },
      {
        t: "code",
        lang: "python",
        c: "s = pd.Series(10, index = [1, 2, 3])\nprint(s)",
      },
      {
        t: "code",
        lang: "shell",
        c: "    1    10\n    2    10\n    3    10\n    dtype: int64",
      },

      // H3: Creating a Pandas Series Using Linspace
      { t: "h3", c: "การสร้าง Pandas Series โดยใช้ Linspace" },
      {
        t: "code",
        lang: "python",
        c: "s = pd.Series(np.linspace(5, 20, 10)) # linspace(starting, end, items)\nprint(s)",
      },
      {
        t: "code",
        lang: "shell",
        c: "    0     5.000000\n    1     6.666667\n    2     8.333333\n    3    10.000000\n    4    11.666667\n    5    13.333333\n    6    15.000000\n    7    16.666667\n    8    18.333333\n    9    20.000000\n    dtype: float64",
      },

      // H2: DataFrames
      { t: "h2", c: "DataFrames" },
      { t: "p", c: "Pandas data frames สามารถสร้างได้หลายวิธี" },

      // H3: Creating DataFrames from List of Lists
      { t: "h3", c: "การสร้าง DataFrames จาก List of Lists" },
      {
        t: "code",
        lang: "python",
        c: "data = [\n    ['Asabeneh', 'Finland', 'Helsink'],\n    ['David', 'UK', 'London'],\n    ['John', 'Sweden', 'Stockholm']\n]\ndf = pd.DataFrame(data, columns=['Names','Country','City'])\nprint(df)",
      },
      {
        t: "table",
        head: ["", "Names", "Country", "City"],
        rows: [
          ["0", "Asabeneh", "Finland", "Helsink"],
          ["1", "David", "UK", "London"],
          ["2", "John", "Sweden", "Stockholm"],
        ],
      },

      // H3: Creating DataFrame Using Dictionary
      { t: "h3", c: "การสร้าง DataFrame โดยใช้ Dictionary" },
      {
        t: "code",
        lang: "python",
        c: "data = {'Name': ['Asabeneh', 'David', 'John'], 'Country':[\n    'Finland', 'UK', 'Sweden'], 'City': ['Helsiki', 'London', 'Stockholm']}\ndf = pd.DataFrame(data)\nprint(df)",
      },
      {
        t: "table",
        head: ["", "Name", "Country", "City"],
        rows: [
          ["0", "Asabeneh", "Finland", "Helsiki"],
          ["1", "David", "UK", "London"],
          ["2", "John", "Sweden", "Stockholm"],
        ],
      },

      // H3: Creating DataFrames from a List of Dictionaries
      { t: "h3", c: "การสร้าง DataFrames จาก List ของ Dictionaries" },
      {
        t: "code",
        lang: "python",
        c: "data = [\n    {'Name': 'Asabeneh', 'Country': 'Finland', 'City': 'Helsinki'},\n    {'Name': 'David', 'Country': 'UK', 'City': 'London'},\n    {'Name': 'John', 'Country': 'Sweden', 'City': 'Stockholm'}]\ndf = pd.DataFrame(data)\nprint(df)",
      },
      {
        t: "table",
        head: ["", "Name", "Country", "City"],
        rows: [
          ["0", "Asabeneh", "Finland", "Helsinki"],
          ["1", "David", "UK", "London"],
          ["2", "John", "Sweden", "Stockholm"],
        ],
      },

      // H2: Reading CSV File Using Pandas
      { t: "h2", c: "การอ่านไฟล์ CSV โดยใช้ Pandas" },
      { t: "p", c: "ในการดาวน์โหลดไฟล์ CSV ที่ใช้ในตัวอย่างนี้ ใช้ console/command line:" },
      {
        t: "code",
        lang: "shell",
        c: "curl -O https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/data/weight-height.csv",
      },
      { t: "p", c: "วางไฟล์ที่ดาวน์โหลดไว้ใน working directory ของคุณ" },
      {
        t: "code",
        lang: "python",
        c: "import pandas as pd\n\ndf = pd.read_csv('weight-height.csv')\nprint(df)",
      },

      // H3: Data Exploration
      { t: "h3", c: "การสำรวจข้อมูล" },
      { t: "p", c: "มาอ่านแค่ 5 แถวแรกโดยใช้ head()" },
      {
        t: "code",
        lang: "python",
        c: "print(df.head()) # give five rows we can increase the number of rows by passing argument to the head() method",
      },
      {
        t: "table",
        head: ["", "Gender", "Height", "Weight"],
        rows: [
          ["0", "Male", "73.847017", "241.893563"],
          ["1", "Male", "68.781904", "162.310473"],
          ["2", "Male", "74.110105", "212.740856"],
          ["3", "Male", "71.730978", "220.042470"],
          ["4", "Male", "69.881796", "206.349801"],
        ],
      },
      { t: "p", c: "มาสำรวจบันทึกท้ายสุดของ dataframe โดยใช้ method tail() ด้วย" },
      {
        t: "code",
        lang: "python",
        c: "print(df.tail()) # tails give the last five rows, we can increase the rows by passing argument to tail method",
      },
      {
        t: "table",
        head: ["", "Gender", "Height", "Weight"],
        rows: [
          ["9995", "Female", "66.172652", "136.777454"],
          ["9996", "Female", "67.067155", "170.867906"],
          ["9997", "Female", "63.867992", "128.475319"],
          ["9998", "Female", "69.034243", "163.852461"],
          ["9999", "Female", "61.944246", "113.649103"],
        ],
      },
      { t: "p", c: "ดังที่เห็น ไฟล์ csv มีสามคอลัมน์ ได้แก่ Gender, Height และ Weight ถ้า DataFrame มีคอลัมน์มาก อาจรู้คอลัมน์ทั้งหมดได้ยาก ดังนั้นเราควรใช้ method เพื่อดูชื่อคอลัมน์ทั้งหมด เราไม่รู้จำนวนแถว มาใช้ method shape กัน" },
      {
        t: "code",
        lang: "python",
        c: "print(df.shape) # as you can see 10000 rows and three columns",
      },
      {
        t: "code",
        lang: "shell",
        c: "    (10000, 3)",
      },
      { t: "p", c: "มาดูคอลัมน์ทั้งหมดโดยใช้ columns" },
      {
        t: "code",
        lang: "python",
        c: "print(df.columns)",
      },
      {
        t: "code",
        lang: "shell",
        c: "    Index(['Gender', 'Height', 'Weight'], dtype='object')",
      },
      { t: "p", c: "ตอนนี้ มาดึงคอลัมน์เฉพาะโดยใช้ key ของคอลัมน์" },
      {
        t: "code",
        lang: "python",
        c: "heights = df['Height'] # this is now a series",
      },
      {
        t: "code",
        lang: "python",
        c: "print(heights)",
      },
      {
        t: "code",
        lang: "shell",
        c: "    0       73.847017\n    1       68.781904\n    2       74.110105\n    3       71.730978\n    4       69.881796\n              ...\n    9995    66.172652\n    9996    67.067155\n    9997    63.867992\n    9998    69.034243\n    9999    61.944246\n    Name: Height, Length: 10000, dtype: float64",
      },
      {
        t: "code",
        lang: "python",
        c: "weights = df['Weight'] # this is now a series",
      },
      {
        t: "code",
        lang: "python",
        c: "print(weights)",
      },
      {
        t: "code",
        lang: "shell",
        c: "    0       241.893563\n    1       162.310473\n    2       212.740856\n    3       220.042470\n    4       206.349801\n               ...\n    9995    136.777454\n    9996    170.867906\n    9997    128.475319\n    9998    163.852461\n    9999    113.649103\n    Name: Weight, Length: 10000, dtype: float64",
      },
      {
        t: "code",
        lang: "python",
        c: "print(len(heights) == len(weights))",
      },
      {
        t: "code",
        lang: "shell",
        c: "    True",
      },
      { t: "p", c: "method describe() ให้ค่าสถิติเชิงพรรณนาของ dataset" },
      {
        t: "code",
        lang: "python",
        c: "print(heights.describe()) # give statistical information about height data",
      },
      {
        t: "code",
        lang: "shell",
        c: "    count    10000.000000\n    mean        66.367560\n    std          3.847528\n    min         54.263133\n    25%         63.505620\n    50%         66.318070\n    75%         69.174262\n    max         78.998742\n    Name: Height, dtype: float64",
      },
      {
        t: "code",
        lang: "python",
        c: "print(weights.describe())",
      },
      {
        t: "code",
        lang: "shell",
        c: "    count    10000.000000\n    mean       161.440357\n    std         32.108439\n    min         64.700127\n    25%        135.818051\n    50%        161.212928\n    75%        187.169525\n    max        269.989699\n    Name: Weight, dtype: float64",
      },
      {
        t: "code",
        lang: "python",
        c: "print(df.describe())  # describe can also give statistical information from a dataFrame",
      },
      {
        t: "table",
        head: ["", "Height", "Weight"],
        rows: [
          ["count", "10000.000000", "10000.000000"],
          ["mean", "66.367560", "161.440357"],
          ["std", "3.847528", "32.108439"],
          ["min", "54.263133", "64.700127"],
          ["25%", "63.505620", "135.818051"],
          ["50%", "66.318070", "161.212928"],
          ["75%", "69.174262", "187.169525"],
          ["max", "78.998742", "269.989699"],
        ],
      },
      { t: "p", c: "คล้ายกับ describe() method info() ก็ให้ข้อมูลเกี่ยวกับ dataset เช่นกัน" },

      // H2: Modifying a DataFrame
      { t: "h2", c: "การแก้ไข DataFrame" },
      { t: "p", c: "การแก้ไข DataFrame:" },
      {
        t: "ul",
        c: [
          "เราสามารถสร้าง DataFrame ใหม่ได้",
          "เราสามารถสร้างคอลัมน์ใหม่แล้วเพิ่มลงใน DataFrame",
          "เราสามารถลบคอลัมน์ที่มีอยู่ออกจาก DataFrame",
          "เราสามารถแก้ไขคอลัมน์ที่มีอยู่ใน DataFrame",
          "เราสามารถเปลี่ยน data type ของค่าในคอลัมน์ใน DataFrame ได้",
        ],
      },

      // H3: Creating a DataFrame
      { t: "h3", c: "การสร้าง DataFrame" },
      { t: "p", c: "เสมอ เราต้อง import package ที่จำเป็นก่อน ตอนนี้ มา import pandas และ numpy สองเพื่อนซี้กัน" },
      {
        t: "code",
        lang: "python",
        c: "import pandas as pd\nimport numpy as np\ndata = [\n    {\"Name\": \"Asabeneh\", \"Country\":\"Finland\",\"City\":\"Helsinki\"},\n    {\"Name\": \"David\", \"Country\":\"UK\",\"City\":\"London\"},\n    {\"Name\": \"John\", \"Country\":\"Sweden\",\"City\":\"Stockholm\"}]\ndf = pd.DataFrame(data)\nprint(df)",
      },
      {
        t: "table",
        head: ["", "Name", "Country", "City"],
        rows: [
          ["0", "Asabeneh", "Finland", "Helsinki"],
          ["1", "David", "UK", "London"],
          ["2", "John", "Sweden", "Stockholm"],
        ],
      },
      { t: "p", c: "การเพิ่มคอลัมน์ใน DataFrame ก็เหมือนการเพิ่ม key ใน dictionary" },
      { t: "p", c: "ก่อนอื่น มาใช้ตัวอย่างก่อนหน้านี้เพื่อสร้าง DataFrame หลังจากที่สร้าง DataFrame แล้ว เราจะเริ่มแก้ไขคอลัมน์และค่าในคอลัมน์" },

      // H3: Adding a New Column
      { t: "h3", c: "การเพิ่มคอลัมน์ใหม่" },
      { t: "p", c: "มาเพิ่มคอลัมน์ weight ใน DataFrame" },
      {
        t: "code",
        lang: "python",
        c: "weights = [74, 78, 69]\ndf['Weight'] = weights\ndf",
      },
      {
        t: "table",
        head: ["", "Name", "Country", "City", "Weight"],
        rows: [
          ["0", "Asabeneh", "Finland", "Helsinki", "74"],
          ["1", "David", "UK", "London", "78"],
          ["2", "John", "Sweden", "Stockholm", "69"],
        ],
      },
      { t: "p", c: "มาเพิ่มคอลัมน์ height ใน DataFrame ด้วย" },
      {
        t: "code",
        lang: "python",
        c: "heights = [173, 175, 169]\ndf['Height'] = heights\nprint(df)",
      },
      {
        t: "table",
        head: ["", "Name", "Country", "City", "Weight", "Height"],
        rows: [
          ["0", "Asabeneh", "Finland", "Helsinki", "74", "173"],
          ["1", "David", "UK", "London", "78", "175"],
          ["2", "John", "Sweden", "Stockholm", "69", "169"],
        ],
      },
      { t: "p", c: "ดังที่เห็นใน DataFrame ด้านบน เราได้เพิ่มคอลัมน์ใหม่ Weight และ Height แล้ว มาเพิ่มคอลัมน์เพิ่มเติมชื่อ BMI (Body Mass Index) โดยคำนวณจากมวลและส่วนสูง BMI คือมวลหารด้วยส่วนสูงยกกำลังสอง (เป็นเมตร) — Weight/Height * Height" },
      { t: "p", c: "ดังที่เห็น ส่วนสูงอยู่ในหน่วยเซนติเมตร เราจึงต้องเปลี่ยนเป็นเมตร มาแก้ไขแถว height กัน" },

      // H3: Modifying column values
      { t: "h3", c: "การแก้ไขค่าในคอลัมน์" },
      {
        t: "code",
        lang: "python",
        c: "df['Height'] = df['Height'] * 0.01\ndf",
      },
      {
        t: "table",
        head: ["", "Name", "Country", "City", "Weight", "Height"],
        rows: [
          ["0", "Asabeneh", "Finland", "Helsinki", "74", "1.73"],
          ["1", "David", "UK", "London", "78", "1.75"],
          ["2", "John", "Sweden", "Stockholm", "69", "1.69"],
        ],
      },
      {
        t: "code",
        lang: "python",
        c: "# Using functions makes our code clean, but you can calculate the bmi without one\ndef calculate_bmi ():\n    weights = df['Weight']\n    heights = df['Height']\n    bmi = []\n    for w,h in zip(weights, heights):\n        b = w/(h*h)\n        bmi.append(b)\n    return bmi\n\nbmi = calculate_bmi()\n",
      },
      {
        t: "code",
        lang: "python",
        c: "df['BMI'] = bmi\ndf",
      },
      {
        t: "table",
        head: ["", "Name", "Country", "City", "Weight", "Height", "BMI"],
        rows: [
          ["0", "Asabeneh", "Finland", "Helsinki", "74", "1.73", "24.725183"],
          ["1", "David", "UK", "London", "78", "1.75", "25.469388"],
          ["2", "John", "Sweden", "Stockholm", "69", "1.69", "24.158818"],
        ],
      },

      // H3: Formatting DataFrame columns
      { t: "h3", c: "การจัดรูปแบบคอลัมน์ใน DataFrame" },
      { t: "p", c: "ค่า BMI ใน DataFrame เป็น float ที่มีทศนิยมหลายตำแหน่ง มาเปลี่ยนให้เหลือทศนิยมหนึ่งตำแหน่ง" },
      {
        t: "code",
        lang: "python",
        c: "df['BMI'] = round(df['BMI'], 1)\nprint(df)",
      },
      {
        t: "table",
        head: ["", "Name", "Country", "City", "Weight", "Height", "BMI"],
        rows: [
          ["0", "Asabeneh", "Finland", "Helsinki", "74", "1.73", "24.7"],
          ["1", "David", "UK", "London", "78", "1.75", "25.5"],
          ["2", "John", "Sweden", "Stockholm", "69", "1.69", "24.2"],
        ],
      },
      { t: "p", c: "ข้อมูลใน DataFrame ยังไม่สมบูรณ์ มาเพิ่มคอลัมน์ปีเกิดและปีปัจจุบัน" },
      {
        t: "code",
        lang: "python",
        c: "birth_year = ['1769', '1985', '1990']\ncurrent_year = pd.Series(2020, index=[0, 1,2])\ndf['Birth Year'] = birth_year\ndf['Current Year'] = current_year\ndf",
      },
      {
        t: "table",
        head: ["", "Name", "Country", "City", "Weight", "Height", "BMI", "Birth Year", "Current Year"],
        rows: [
          ["0", "Asabeneh", "Finland", "Helsinki", "74", "1.73", "24.7", "1769", "2020"],
          ["1", "David", "UK", "London", "78", "1.75", "25.5", "1985", "2020"],
          ["2", "John", "Sweden", "Stockholm", "69", "1.69", "24.2", "1990", "2020"],
        ],
      },

      // H2: Checking data types of Column values
      { t: "h2", c: "การตรวจสอบ Data Type ของค่าในคอลัมน์" },
      {
        t: "code",
        lang: "python",
        c: "print(df.Weight.dtype)",
      },
      {
        t: "code",
        lang: "shell",
        c: "    dtype('int64')",
      },
      {
        t: "code",
        lang: "python",
        c: "df['Birth Year'].dtype # it gives string object , we should change this to number\n",
      },
      {
        t: "code",
        lang: "python",
        c: "df['Birth Year'] = df['Birth Year'].astype('int')\nprint(df['Birth Year'].dtype) # let's check the data type now",
      },
      {
        t: "code",
        lang: "shell",
        c: "    dtype('int32')",
      },
      { t: "p", c: "ตอนนี้ทำเช่นเดียวกันสำหรับ current year:" },
      {
        t: "code",
        lang: "python",
        c: "df['Current Year'] = df['Current Year'].astype('int')\ndf['Current Year'].dtype",
      },
      {
        t: "code",
        lang: "shell",
        c: "    dtype('int32')",
      },
      { t: "p", c: "ตอนนี้ค่าในคอลัมน์ปีเกิดและปีปัจจุบันเป็น integer แล้ว เราสามารถคำนวณอายุได้" },
      {
        t: "code",
        lang: "python",
        c: "ages = df['Current Year'] - df['Birth Year']\nages",
      },
      {
        t: "code",
        lang: "shell",
        c: "    0    251\n    1     35\n    2     30\n    dtype: int32",
      },
      {
        t: "code",
        lang: "python",
        c: "df['Ages'] = ages\nprint(df)",
      },
      {
        t: "table",
        head: ["", "Name", "Country", "City", "Weight", "Height", "BMI", "Birth Year", "Current Year", "Ages"],
        rows: [
          ["0", "Asabeneh", "Finland", "Helsinki", "74", "1.73", "24.7", "1769", "2019", "250"],
          ["1", "David", "UK", "London", "78", "1.75", "25.5", "1985", "2019", "34"],
          ["2", "John", "Sweden", "Stockholm", "69", "1.69", "24.2", "1990", "2019", "29"],
        ],
      },
      { t: "p", c: "บุคคลในแถวแรกมีอายุถึง 251 ปี ซึ่งเป็นไปได้ยากมากที่ใครจะมีชีวิตอยู่ได้นานขนาดนั้น อาจเป็นการพิมพ์ผิดหรือข้อมูลถูกสร้างขึ้น ดังนั้นมาใส่ค่าเฉลี่ยของคอลัมน์โดยไม่รวม outlier" },
      { t: "p", c: "mean = (35 + 30)/ 2" },
      {
        t: "code",
        lang: "python",
        c: "mean = (35 + 30)/ 2\nprint('Mean: ',mean)\t#it is good to add some description to the output, so we know what is what",
      },
      {
        t: "code",
        lang: "shell",
        c: "   Mean:  32.5",
      },

      // H3: Boolean Indexing
      { t: "h3", c: "Boolean Indexing" },
      {
        t: "code",
        lang: "python",
        c: "print(df[df['Ages'] > 120])",
      },
      {
        t: "table",
        head: ["", "Name", "Country", "City", "Weight", "Height", "BMI", "Birth Year", "Current Year", "Ages"],
        rows: [
          ["0", "Asabeneh", "Finland", "Helsinki", "74", "1.73", "24.7", "1769", "2020", "251"],
        ],
      },
      {
        t: "code",
        lang: "python",
        c: "print(df[df['Ages'] < 120])",
      },
      {
        t: "table",
        head: ["", "Name", "Country", "City", "Weight", "Height", "BMI", "Birth Year", "Current Year", "Ages"],
        rows: [
          ["1", "David", "UK", "London", "78", "1.75", "25.5", "1985", "2020", "35"],
          ["2", "John", "Sweden", "Stockholm", "69", "1.69", "24.2", "1990", "2020", "30"],
        ],
      },

      // H2: Exercises
      { t: "h2", c: "แบบฝึกหัด: วันที่ 25" },
      {
        t: "ol",
        c: [
          "อ่านไฟล์ hacker_news.csv จาก data directory",
          "ดึง 5 แถวแรก",
          "ดึง 5 แถวท้าย",
          "ดึงคอลัมน์ title เป็น pandas series",
          "นับจำนวนแถวและคอลัมน์",
          "กรอง title ที่มีคำว่า python",
          "กรอง title ที่มีคำว่า JavaScript",
          "สำรวจข้อมูลและทำความเข้าใจ",
        ],
      },
      { t: "callout", title: "ขอแสดงความยินดี!", c: "คุณทำ Day 25 สำเร็จแล้ว! ต่อไป Day 26 — Python สำหรับเว็บ" },
    ],
  },
};
