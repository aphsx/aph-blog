import type { Page } from "@/lib/types";

const IMG =
  "https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images";

export const day24Page: Record<string, Page> = {
  "py30-day24": {
    slug: "py30-day24",
    title: { th: "วันที่ 24 — สถิติ (Statistics)", en: "" },
    lead: { th: "เรียนรู้การวิเคราะห์ข้อมูลทางสถิติด้วย Python และไลบรารี NumPy ซึ่งเป็นรากฐานสำคัญสำหรับ Data Science และ Machine Learning", en: "" },
    group: "สัปดาห์ที่ 5: OOP & ข้อมูล",
    blocks: {
      th: [
        {
          t: "image",
          src: `${IMG}/30DaysOfPython_banner3@2x.png`,
          alt: "30 Days of Python banner",
          caption: "30 Days of Python",
        },

        { t: "h2", c: "Python สำหรับการวิเคราะห์ทางสถิติ" },

        { t: "h2", c: "สถิติ (Statistics)" },
        {
          t: "p",
          c: "สถิติ คือ ศาสตร์ที่ศึกษาเกี่ยวกับการ _รวบรวม_, _จัดระเบียบ_, _แสดงผล_, _วิเคราะห์_, _ตีความ_ และ _นำเสนอ_ ข้อมูล สถิติเป็นสาขาหนึ่งของคณิตศาสตร์ที่แนะนำให้เรียนเป็นพื้นฐานก่อนเรียน Data Science และ Machine Learning แม้ว่าสถิติจะเป็นสาขาที่กว้างมาก แต่ในส่วนนี้เราจะโฟกัสเฉพาะส่วนที่เกี่ยวข้องมากที่สุด หลังจากทำความท้าทายนี้สำเร็จ คุณสามารถมุ่งหน้าสู่เส้นทาง Web Development, Data Analysis, Machine Learning หรือ Data Science ไม่ว่าคุณจะเลือกเส้นทางใด ในบางจุดของอาชีพคุณจะต้องพบกับข้อมูลที่ต้องทำงานด้วย การมีความรู้ทางสถิติจะช่วยให้คุณตัดสินใจโดยอาศัยข้อมูล ตามคำกล่าวที่ว่า _ข้อมูลเล่าเรื่องราว_",
        },

        { t: "h2", c: "ข้อมูล (Data)" },
        {
          t: "p",
          c: "ข้อมูลคืออะไร? ข้อมูลคือชุดตัวอักษรใดๆ ที่รวบรวมและแปลผลเพื่อวัตถุประสงค์บางอย่าง โดยทั่วไปคือการวิเคราะห์ ข้อมูลอาจเป็นตัวอักษรใดก็ได้ รวมถึงข้อความ ตัวเลข รูปภาพ เสียง หรือวิดีโอ หากข้อมูลไม่ได้ถูกวางในบริบทที่เหมาะสม มันก็ไม่มีความหมายสำหรับมนุษย์หรือคอมพิวเตอร์ เพื่อทำให้ข้อมูลมีความหมาย เราต้องทำงานกับข้อมูลโดยใช้เครื่องมือต่างๆ",
        },
        {
          t: "p",
          c: "กระบวนการทำงานของ Data Analysis, Data Science หรือ Machine Learning เริ่มต้นจากข้อมูล ข้อมูลสามารถมาจากแหล่งข้อมูลต่างๆ หรือสร้างขึ้นมาได้ ข้อมูลมีทั้งแบบมีโครงสร้าง (structured) และไม่มีโครงสร้าง (unstructured)",
        },
        {
          t: "p",
          c: "ข้อมูลสามารถอยู่ในรูปแบบขนาดเล็กหรือขนาดใหญ่ก็ได้ ประเภทข้อมูลส่วนใหญ่ที่เราจะพบได้ถูกครอบคลุมแล้วในหัวข้อการจัดการไฟล์",
        },

        { t: "h2", c: "โมดูล Statistics" },
        {
          t: "p",
          c: "โมดูล _statistics_ ของ Python ให้ฟังก์ชันสำหรับคำนวณค่าสถิติทางคณิตศาสตร์ของข้อมูลตัวเลข โมดูลนี้ไม่ได้มีเป้าหมายเพื่อแข่งขันกับไลบรารีของบุคคลที่สาม เช่น NumPy, SciPy หรือแพ็กเกจสถิติเต็มรูปแบบที่เป็นของผู้เชี่ยวชาญอย่าง Minitab, SAS และ Matlab แต่มีเป้าหมายสำหรับระดับเครื่องคำนวณกราฟและวิทยาศาสตร์",
        },

        { t: "h2", c: "NumPy" },
        {
          t: "p",
          c: "ในส่วนแรก เราได้นิยาม Python ว่าเป็นภาษาโปรแกรมที่ยอดเยี่ยมสำหรับวัตถุประสงค์ทั่วไป แต่เมื่อรวมกับไลบรารียอดนิยมอื่นๆ อย่าง numpy, scipy, matplotlib, pandas และอื่นๆ มันจะกลายเป็นสภาพแวดล้อมที่ทรงพลังสำหรับ Scientific Computing",
        },
        {
          t: "p",
          c: "NumPy คือไลบรารีหลักสำหรับ Scientific Computing ใน Python ซึ่งมี object อาร์เรย์หลายมิติประสิทธิภาพสูง และเครื่องมือสำหรับทำงานกับอาร์เรย์",
        },
        {
          t: "p",
          c: "จนถึงตอนนี้เราใช้ vscode แต่ตั้งแต่นี้เป็นต้นไป แนะนำให้ใช้ Jupyter Notebook เพื่อเข้าถึง Jupyter Notebook ให้ติดตั้ง anaconda ถ้าคุณใช้ anaconda แพ็กเกจทั่วไปส่วนใหญ่จะถูกรวมไว้แล้ว และไม่จำเป็นต้องติดตั้งแพ็กเกจเพิ่มเติม",
        },
        {
          t: "code",
          lang: "shell",
          c: "asabeneh@Asabeneh:~/Desktop/30DaysOfPython$ pip install numpy",
        },

        { t: "h2", c: "การ Import NumPy" },
        {
          t: "p",
          c: "Jupyter notebook พร้อมใช้งานถ้าคุณต้องการใช้ jupyter notebook",
        },
        {
          t: "code",
          lang: "python",
          c: "    # How to import numpy\n    import numpy as np\n    # How to check the version of the numpy package\n    print('numpy:', np.__version__)\n    # Checking the available methods\n    print(dir(np))",
        },

        { t: "h2", c: "การสร้าง numpy array" },

        { t: "h3", c: "การสร้าง numpy array แบบ int" },
        {
          t: "code",
          lang: "python",
          c: "    # Creating python List\n    python_list = [1,2,3,4,5]\n\n    # Checking data types\n    print('Type:', type (python_list)) # <class 'list'>\n    #\n    print(python_list) # [1, 2, 3, 4, 5]\n\n    two_dimensional_list = [[0,1,2], [3,4,5], [6,7,8]]\n\n    print(two_dimensional_list)  # [[0, 1, 2], [3, 4, 5], [6, 7, 8]]\n\n    # Creating Numpy(Numerical Python) array from python list\n\n    numpy_array_from_list = np.array(python_list)\n    print(type (numpy_array_from_list))   # <class 'numpy.ndarray'>\n    print(numpy_array_from_list) # array([1, 2, 3, 4, 5])",
        },

        { t: "h3", c: "การสร้าง numpy array แบบ float" },
        {
          t: "p",
          c: "การสร้าง float numpy array จาก list พร้อมพารามิเตอร์ data type เป็น float",
        },
        {
          t: "code",
          lang: "python",
          c: "    # Python list\n    python_list = [1,2,3,4,5]\n\n    numy_array_from_list2 = np.array(python_list, dtype=float)\n    print(numy_array_from_list2) # array([1., 2., 3., 4., 5.])",
        },

        { t: "h3", c: "การสร้าง numpy array แบบ boolean" },
        {
          t: "p",
          c: "การสร้าง boolean numpy array จาก list",
        },
        {
          t: "code",
          lang: "python",
          c: "    numpy_bool_array = np.array([0, 1, -1, 0, 0], dtype=bool)\n    print(numpy_bool_array) # array([False,  True,  True, False, False])",
        },

        { t: "h3", c: "การสร้าง array หลายมิติโดยใช้ numpy" },
        {
          t: "p",
          c: "numpy array อาจมีหนึ่งหรือหลายแถวและหลายคอลัมน์",
        },
        {
          t: "code",
          lang: "python",
          c: "    two_dimensional_list = [[0,1,2], [3,4,5], [6,7,8]]\n    numpy_two_dimensional_list = np.array(two_dimensional_list)\n    print(type (numpy_two_dimensional_list))\n    print(numpy_two_dimensional_list)",
        },
        {
          t: "code",
          lang: "shell",
          c: "    <class 'numpy.ndarray'>\n    [[0 1 2]\n     [3 4 5]\n     [6 7 8]]",
        },

        { t: "h3", c: "การแปลง numpy array เป็น list" },
        {
          t: "code",
          lang: "python",
          c: "# We can always convert an array back to a python list using tolist().\nnp_to_list = numpy_array_from_list.tolist()\nprint(type (np_to_list))\nprint('one dimensional array:', np_to_list)\nprint('two dimensional array: ', numpy_two_dimensional_list.tolist())",
        },
        {
          t: "code",
          lang: "shell",
          c: "    <class 'list'>\n    one dimensional array: [1, 2, 3, 4, 5]\n    two dimensional array:  [[0, 1, 2], [3, 4, 5], [6, 7, 8]]",
        },

        { t: "h3", c: "การสร้าง numpy array จาก tuple" },
        {
          t: "code",
          lang: "python",
          c: "# Numpy array from tuple\n# Creating tuple in Python\npython_tuple = (1,2,3,4,5)\nprint(type (python_tuple)) # <class 'tuple'>\nprint('python_tuple: ', python_tuple) # python_tuple:  (1, 2, 3, 4, 5)\n\nnumpy_array_from_tuple = np.array(python_tuple)\nprint(type (numpy_array_from_tuple)) # <class 'numpy.ndarray'>\nprint('numpy_array_from_tuple: ', numpy_array_from_tuple) # numpy_array_from_tuple:  [1 2 3 4 5]",
        },

        { t: "h3", c: "Shape ของ numpy array" },
        {
          t: "p",
          c: "method shape ให้ข้อมูล shape ของ array ในรูปแบบ tuple โดยตัวแรกคือแถว และตัวที่สองคือคอลัมน์ ถ้า array เป็นมิติเดียว จะคืนค่าขนาดของ array",
        },
        {
          t: "code",
          lang: "python",
          c: "    nums = np.array([1, 2, 3, 4, 5])\n    print(nums)\n    print('shape of nums: ', nums.shape)\n    numpy_two_dimensional_list = np.array([[0,1,2],[3,4,5],[6,7,8]])\n    print(numpy_two_dimensional_list)\n    print('shape of numpy_two_dimensional_list: ', numpy_two_dimensional_list.shape)\n    three_by_four_array = np.array([[0, 1, 2, 3],\n        [4,5,6,7],\n        [8,9,10,11]])\n    print(three_by_four_array)\n    print('shape of three_by_four_array: ', three_by_four_array.shape)",
        },
        {
          t: "code",
          lang: "shell",
          c: "    [1 2 3 4 5]\n    shape of nums:  (5,)\n    [[0 1 2]\n     [3 4 5]\n     [6 7 8]]\n    shape of numpy_two_dimensional_list:  (3, 3)\n    (3, 4)",
        },

        { t: "h3", c: "Data type ของ numpy array" },
        {
          t: "p",
          c: "ประเภทข้อมูลที่รองรับ: str, int, float, complex, bool, list, None",
        },
        {
          t: "code",
          lang: "python",
          c: "int_lists = [-3, -2, -1, 0, 1, 2,3]\nint_array = np.array(int_lists)\nfloat_array = np.array(int_lists, dtype=float)\n\nprint(int_array)\nprint(int_array.dtype)\nprint(float_array)\nprint(float_array.dtype)",
        },
        {
          t: "code",
          lang: "shell",
          c: "    [-3 -2 -1  0  1  2  3]\n    int64\n    [-3. -2. -1.  0.  1.  2.  3.]\n    float64",
        },

        { t: "h3", c: "ขนาดของ numpy array" },
        {
          t: "p",
          c: "ใน numpy เพื่อทราบจำนวน item ใน numpy array list ให้ใช้ size",
        },
        {
          t: "code",
          lang: "python",
          c: "numpy_array_from_list = np.array([1, 2, 3, 4, 5])\ntwo_dimensional_list = np.array([[0, 1, 2],\n                              [3, 4, 5],\n                              [6, 7, 8]])\n\nprint('The size:', numpy_array_from_list.size) # 5\nprint('The size:', two_dimensional_list.size)  # 3",
        },
        {
          t: "code",
          lang: "shell",
          c: "    The size: 5\n    The size: 9",
        },

        { t: "h2", c: "การดำเนินการทางคณิตศาสตร์โดยใช้ numpy" },
        {
          t: "p",
          c: "numpy array ไม่เหมือน python list ทุกประการ การดำเนินการทางคณิตศาสตร์ใน Python list ต้องวนลูปผ่าน item ต่างๆ แต่ numpy สามารถทำการดำเนินการทางคณิตศาสตร์ใดๆ ได้โดยไม่ต้องวนลูป\nการดำเนินการทางคณิตศาสตร์:",
        },
        {
          t: "ul",
          c: [
            "การบวก (+)",
            "การลบ (-)",
            "การคูณ (*)",
            "การหาร (/)",
            "การหารเอาเศษ (Modulus) (%)",
            "การหารปัดเศษ (Floor Division) (//)",
            "การยกกำลัง (Exponential) (**)",
          ],
        },

        { t: "h3", c: "การบวก (Addition)" },
        {
          t: "code",
          lang: "python",
          c: "# Mathematical Operation\n# Addition\nnumpy_array_from_list = np.array([1, 2, 3, 4, 5])\nprint('original array: ', numpy_array_from_list)\nten_plus_original = numpy_array_from_list  + 10\nprint(ten_plus_original)",
        },
        {
          t: "code",
          lang: "shell",
          c: "    original array:  [1 2 3 4 5]\n    [11 12 13 14 15]",
        },

        { t: "h3", c: "การลบ (Subtraction)" },
        {
          t: "code",
          lang: "python",
          c: "# Subtraction\nnumpy_array_from_list = np.array([1, 2, 3, 4, 5])\nprint('original array: ', numpy_array_from_list)\nten_minus_original = numpy_array_from_list  - 10\nprint(ten_minus_original)",
        },
        {
          t: "code",
          lang: "shell",
          c: "    original array:  [1 2 3 4 5]\n    [-9 -8 -7 -6 -5]",
        },

        { t: "h3", c: "การคูณ (Multiplication)" },
        {
          t: "code",
          lang: "python",
          c: "# Multiplication\nnumpy_array_from_list = np.array([1, 2, 3, 4, 5])\nprint('original array: ', numpy_array_from_list)\nten_times_original = numpy_array_from_list * 10\nprint(ten_times_original)",
        },
        {
          t: "code",
          lang: "shell",
          c: "    original array:  [1 2 3 4 5]\n    [10 20 30 40 50]",
        },

        { t: "h3", c: "การหาร (Division)" },
        {
          t: "code",
          lang: "python",
          c: "# Division\nnumpy_array_from_list = np.array([1, 2, 3, 4, 5])\nprint('original array: ', numpy_array_from_list)\nten_times_original = numpy_array_from_list / 10\nprint(ten_times_original)",
        },
        {
          t: "code",
          lang: "shell",
          c: "    original array:  [1 2 3 4 5]\n    [0.1 0.2 0.3 0.4 0.5]",
        },

        { t: "h3", c: "การหารเอาเศษ (Modulus)" },
        {
          t: "code",
          lang: "python",
          c: "# Modulus; Finding the remainder\nnumpy_array_from_list = np.array([1, 2, 3, 4, 5])\nprint('original array: ', numpy_array_from_list)\nten_times_original = numpy_array_from_list % 3\nprint(ten_times_original)",
        },
        {
          t: "code",
          lang: "shell",
          c: "    original array:  [1 2 3 4 5]\n    [1 2 0 1 2]",
        },

        { t: "h3", c: "การหารปัดเศษ (Floor Division)" },
        {
          t: "code",
          lang: "python",
          c: "# Floor division: the division result without the remainder\nnumpy_array_from_list = np.array([1, 2, 3, 4, 5])\nprint('original array: ', numpy_array_from_list)\nten_times_original = numpy_array_from_list // 10\nprint(ten_times_original)",
        },

        { t: "h3", c: "การยกกำลัง (Exponential)" },
        {
          t: "code",
          lang: "python",
          c: "# Exponential is finding some number the power of another:\nnumpy_array_from_list = np.array([1, 2, 3, 4, 5])\nprint('original array: ', numpy_array_from_list)\nten_times_original = numpy_array_from_list  ** 2\nprint(ten_times_original)",
        },
        {
          t: "code",
          lang: "shell",
          c: "    original array:  [1 2 3 4 5]\n    [ 1  4  9 16 25]",
        },

        { t: "h2", c: "การตรวจสอบ data type" },
        {
          t: "code",
          lang: "python",
          c: "#Int,  Float numbers\nnumpy_int_arr = np.array([1,2,3,4])\nnumpy_float_arr = np.array([1.1, 2.0,3.2])\nnumpy_bool_arr = np.array([-3, -2, 0, 1,2,3], dtype='bool')\n\nprint(numpy_int_arr.dtype)\nprint(numpy_float_arr.dtype)\nprint(numpy_bool_arr.dtype)",
        },
        {
          t: "code",
          lang: "shell",
          c: "    int64\n    float64\n    bool",
        },

        { t: "h3", c: "การแปลง type" },
        {
          t: "p",
          c: "เราสามารถแปลง data type ของ numpy array ได้",
        },
        {
          t: "ol",
          c: ["Int to Float"],
        },
        {
          t: "code",
          lang: "python",
          c: "numpy_int_arr = np.array([1,2,3,4], dtype = 'float')\nnumpy_int_arr",
        },
        {
          t: "code",
          lang: "shell",
          c: "    array([1., 2., 3., 4.])",
        },
        {
          t: "ol",
          c: ["Float to Int"],
          start: 2,
        },
        {
          t: "code",
          lang: "python",
          c: "numpy_int_arr = np.array([1., 2., 3., 4.], dtype = 'int')\nnumpy_int_arr",
        },
        {
          t: "code",
          lang: "shell",
          c: "    array([1, 2, 3, 4])",
        },
        {
          t: "ol",
          c: ["Int ot boolean"],
          start: 3,
        },
        {
          t: "code",
          lang: "python",
          c: "np.array([-3, -2, 0, 1,2,3], dtype='bool')",
        },
        {
          t: "code",
          lang: "shell",
          c: "    array([ True,  True, False,  True,  True,  True])",
        },
        {
          t: "ol",
          c: ["Int to str"],
          start: 4,
        },
        {
          t: "code",
          lang: "python",
          c: "numpy_float_list.astype('int').astype('str')",
        },
        {
          t: "code",
          lang: "shell",
          c: "    array(['1', '2', '3'], dtype='<U21')",
        },

        { t: "h2", c: "อาร์เรย์หลายมิติ (Multi-dimensional Arrays)" },
        {
          t: "code",
          lang: "python",
          c: "# 2 Dimension Array\ntwo_dimension_array = np.array([(1,2,3),(4,5,6), (7,8,9)])\nprint(type (two_dimension_array))\nprint(two_dimension_array)\nprint('Shape: ', two_dimension_array.shape)\nprint('Size:', two_dimension_array.size)\nprint('Data type:', two_dimension_array.dtype)",
        },
        {
          t: "code",
          lang: "shell",
          c: "    <class 'numpy.ndarray'>\n    [[1 2 3]\n     [4 5 6]\n     [7 8 9]]\n    Shape:  (3, 3)\n    Size: 9\n    Data type: int64",
        },

        { t: "h3", c: "การดึง item จาก numpy array" },
        {
          t: "code",
          lang: "python",
          c: "# 2 Dimension Array\ntwo_dimension_array = np.array([[1,2,3],[4,5,6], [7,8,9]])\nfirst_row = two_dimension_array[0]\nsecond_row = two_dimension_array[1]\nthird_row = two_dimension_array[2]\nprint('First row:', first_row)\nprint('Second row:', second_row)\nprint('Third row: ', third_row)",
        },
        {
          t: "code",
          lang: "shell",
          c: "    First row: [1 2 3]\n    Second row: [4 5 6]\n    Third row:  [7 8 9]",
        },
        {
          t: "code",
          lang: "python",
          c: "first_column= two_dimension_array[:,0]\nsecond_column = two_dimension_array[:,1]\nthird_column = two_dimension_array[:,2]\nprint('First column:', first_column)\nprint('Second column:', second_column)\nprint('Third column: ', third_column)\nprint(two_dimension_array)",
        },
        {
          t: "code",
          lang: "shell",
          c: "    First column: [1 4 7]\n    Second column: [2 5 8]\n    Third column:  [3 6 9]\n    [[1 2 3]\n     [4 5 6]\n     [7 8 9]]",
        },

        { t: "h2", c: "การ Slice numpy array" },
        {
          t: "p",
          c: "การ Slicing ใน numpy คล้ายกับการ Slicing ใน Python list",
        },
        {
          t: "code",
          lang: "python",
          c: "two_dimension_array = np.array([[1,2,3],[4,5,6], [7,8,9]])\nfirst_two_rows_and_columns = two_dimension_array[0:2, 0:2]\nprint(first_two_rows_and_columns)",
        },
        {
          t: "code",
          lang: "shell",
          c: "    [[1 2]\n     [4 5]]",
        },

        { t: "h3", c: "วิธีกลับแถวและ array ทั้งหมด" },
        {
          t: "code",
          lang: "python",
          c: "two_dimension_array[::]",
        },
        {
          t: "code",
          lang: "shell",
          c: "    array([[1, 2, 3],\n           [4, 5, 6],\n           [7, 8, 9]])",
        },

        { t: "h3", c: "กลับตำแหน่งแถวและคอลัมน์" },
        {
          t: "code",
          lang: "python",
          c: "    two_dimension_array = np.array([[1,2,3],[4,5,6], [7,8,9]])\n    two_dimension_array[::-1,::-1]",
        },
        {
          t: "code",
          lang: "shell",
          c: "    array([[9, 8, 7],\n           [6, 5, 4],\n           [3, 2, 1]])",
        },

        { t: "h2", c: "วิธีแทนค่าที่หายไป (Missing Values)" },
        {
          t: "code",
          lang: "python",
          c: "    print(two_dimension_array)\n    two_dimension_array[1,1] = 55\n    two_dimension_array[1,2] =44\n    print(two_dimension_array)",
        },
        {
          t: "code",
          lang: "shell",
          c: "    [[1 2 3]\n     [4 5 6]\n     [7 8 9]]\n    [[ 1  2  3]\n     [ 4 55 44]\n     [ 7  8  9]]",
        },
        {
          t: "code",
          lang: "python",
          c: "    # Numpy Zeroes\n    # numpy.zeros(shape, dtype=float, order='C')\n    numpy_zeroes = np.zeros((3,3),dtype=int,order='C')\n    numpy_zeroes",
        },
        {
          t: "code",
          lang: "shell",
          c: "    array([[0, 0, 0],\n           [0, 0, 0],\n           [0, 0, 0]])",
        },
        {
          t: "code",
          lang: "python",
          c: "# Numpy Zeroes\nnumpy_ones = np.ones((3,3),dtype=int,order='C')\nprint(numpy_ones)",
        },
        {
          t: "code",
          lang: "shell",
          c: "    [[1 1 1]\n     [1 1 1]\n     [1 1 1]]",
        },
        {
          t: "code",
          lang: "python",
          c: "twoes = numpy_ones * 2",
        },
        {
          t: "code",
          lang: "python",
          c: "# Reshape\n# numpy.reshape(), numpy.flatten()\nfirst_shape  = np.array([(1,2,3), (4,5,6)])\nprint(first_shape)\nreshaped = first_shape.reshape(3,2)\nprint(reshaped)",
        },
        {
          t: "code",
          lang: "shell",
          c: "    [[1 2 3]\n     [4 5 6]]\n    [[1 2]\n     [3 4]\n     [5 6]]",
        },
        {
          t: "code",
          lang: "python",
          c: "flattened = reshaped.flatten()\nflattened",
        },
        {
          t: "code",
          lang: "shell",
          c: "    array([1, 2, 3, 4, 5, 6])",
        },
        {
          t: "code",
          lang: "python",
          c: "    ## Horitzontal Stack\n    np_list_one = np.array([1,2,3])\n    np_list_two = np.array([4,5,6])\n\n    print(np_list_one + np_list_two)\n\n    print('Horizontal Append:', np.hstack((np_list_one, np_list_two)))",
        },
        {
          t: "code",
          lang: "shell",
          c: "    [5 7 9]\n    Horizontal Append: [1 2 3 4 5 6]",
        },
        {
          t: "code",
          lang: "python",
          c: "    ## Vertical Stack\n    print('Vertical Append:', np.vstack((np_list_one, np_list_two)))",
        },
        {
          t: "code",
          lang: "shell",
          c: "    Vertical Append: [[1 2 3]\n     [4 5 6]]",
        },

        { t: "h3", c: "การสร้างตัวเลขสุ่ม (Generating Random Numbers)" },
        {
          t: "code",
          lang: "python",
          c: "    # Generate a random float  number\n    random_float = np.random.random()\n    random_float",
        },
        {
          t: "code",
          lang: "shell",
          c: "    0.018929887384753874",
        },
        {
          t: "code",
          lang: "python",
          c: "    # Generate a random float  number\n    random_floats = np.random.random(5)\n    random_floats",
        },
        {
          t: "code",
          lang: "shell",
          c: "    array([0.26392192, 0.35842215, 0.87908478, 0.41902195, 0.78926418])",
        },
        {
          t: "code",
          lang: "python",
          c: "    # Generating a random integers between 0 and 10\n\n    random_int = np.random.randint(0, 11)\n    random_int",
        },
        {
          t: "code",
          lang: "shell",
          c: "    4",
        },
        {
          t: "code",
          lang: "python",
          c: "    # Generating a random integers between 2 and 11, and creating a one row array\n    random_int = np.random.randint(2,10, size=4)\n    random_int",
        },
        {
          t: "code",
          lang: "shell",
          c: "    array([8, 8, 8, 2])",
        },
        {
          t: "code",
          lang: "python",
          c: "    # Generating a random integers between 0 and 10\n    random_int = np.random.randint(2,10, size=(3,3))\n    random_int",
        },
        {
          t: "code",
          lang: "shell",
          c: "    array([[3, 5, 3],\n           [7, 3, 6],\n           [2, 3, 3]])",
        },

        { t: "h3", c: "การสร้างตัวเลขสุ่มแบบ normal distribution" },
        {
          t: "code",
          lang: "python",
          c: "    # np.random.normal(mu, sigma, size)\n    normal_array = np.random.normal(79, 15, 80)\n    normal_array",
        },
        {
          t: "code",
          lang: "shell",
          c: "    array([ 89.49990595,  82.06056961, 107.21445842,  38.69307086,\n            47.85259157,  93.07381061,  76.40724259,  78.55675184,\n            72.17358173,  47.9888899 ,  65.10370622,  76.29696568,\n            95.58234254,  68.14897213,  38.75862686, 122.5587927 ,\n            67.0762565 ,  95.73990864,  81.97454563,  92.54264805,\n            59.37035153,  77.76828101,  52.30752166,  64.43109931,\n            62.63695351,  90.04616138,  75.70009094,  49.87586877,\n            80.22002414,  68.56708848,  76.27791052,  67.24343975,\n            81.86363935,  78.22703433, 102.85737041,  65.15700341,\n            84.87033426,  76.7569997 ,  64.61321853,  67.37244562,\n            74.4068773 ,  58.65119655,  71.66488727,  53.42458179,\n            70.26872028,  60.96588544,  83.56129414,  72.14255326,\n            81.00787609,  71.81264853,  72.64168853,  86.56608717,\n            94.94667321,  82.32676973,  70.5165446 ,  85.43061003,\n            72.45526212,  87.34681775,  87.69911217, 103.02831489,\n            75.28598596,  67.17806893,  92.41274447, 101.06662611,\n            87.70013935,  70.73980645,  46.40368207,  50.17947092,\n            61.75618542,  90.26191397,  78.63968639,  70.84550744,\n            88.91826581, 103.91474733,  66.3064638 ,  79.49726264,\n            70.81087439,  83.90130623,  87.58555972,  59.95462521])",
        },

        { t: "h2", c: "NumPy และสถิติ" },
        {
          t: "code",
          lang: "python",
          c: "import matplotlib.pyplot as plt\nimport seaborn as sns\nsns.set()\nplt.hist(normal_array, color=\"grey\", bins=50)",
        },
        {
          t: "code",
          lang: "shell",
          c: "    (array([2., 0., 0., 0., 1., 2., 2., 0., 2., 0., 0., 1., 2., 2., 1., 4., 3.,\n            4., 2., 7., 2., 2., 5., 4., 2., 4., 3., 2., 1., 5., 3., 0., 3., 2.,\n            1., 0., 0., 1., 3., 0., 1., 0., 0., 0., 0., 0., 0., 0., 0., 1.]),\n     array([ 38.69307086,  40.37038529,  42.04769973,  43.72501417,\n             45.4023286 ,  47.07964304,  48.75695748,  50.43427191,\n             52.11158635,  53.78890079,  55.46621523,  57.14352966,\n             58.8208441 ,  60.49815854,  62.17547297,  63.85278741,\n             65.53010185,  67.20741628,  68.88473072,  70.56204516,\n             72.23935959,  73.91667403,  75.59398847,  77.27130291,\n             78.94861734,  80.62593178,  82.30324622,  83.98056065,\n             85.65787509,  87.33518953,  89.01250396,  90.6898184 ,\n             92.36713284,  94.04444727,  95.72176171,  97.39907615,\n             99.07639058, 100.75370502, 102.43101946, 104.1083339 ,\n            105.78564833, 107.46296277, 109.14027721, 110.81759164,\n            112.49490608, 114.17222052, 115.84953495, 117.52684939,\n            119.20416383, 120.88147826, 122.5587927 ]),\n     <a list of 50 Patch objects>)",
        },

        { t: "h3", c: "เมทริกซ์ใน numpy" },
        {
          t: "code",
          lang: "python",
          c: "four_by_four_matrix = np.matrix(np.ones((4,4), dtype=float))",
        },
        {
          t: "code",
          lang: "python",
          c: "four_by_four_matrix",
        },
        {
          t: "code",
          lang: "shell",
          c: "matrix([[1., 1., 1., 1.],\n            [1., 1., 1., 1.],\n            [1., 1., 1., 1.],\n            [1., 1., 1., 1.]])",
        },
        {
          t: "code",
          lang: "python",
          c: "np.asarray(four_by_four_matrix)[2] = 2\nfour_by_four_matrix",
        },
        {
          t: "code",
          lang: "shell",
          c: "matrix([[1., 1., 1., 1.],\n            [1., 1., 1., 1.],\n            [2., 2., 2., 2.],\n            [1., 1., 1., 1.]])",
        },

        { t: "h3", c: "numpy.arange()" },
        { t: "h3", c: "Arrange คืออะไร?" },
        {
          t: "p",
          c: "บางครั้งคุณอาจต้องการสร้างค่าที่มีระยะห่างสม่ำเสมอภายในช่วงที่กำหนด ตัวอย่างเช่น คุณต้องการสร้างค่าตั้งแต่ 1 ถึง 10 สามารถใช้ฟังก์ชัน numpy.arange() ได้",
        },
        {
          t: "code",
          lang: "python",
          c: "# creating list using range(starting, stop, step)\nlst = range(0, 11, 2)\nlst",
        },
        {
          t: "code",
          lang: "python",
          c: "range(0, 11, 2)",
        },
        {
          t: "code",
          lang: "python",
          c: "for l in lst:\n    print(l)",
        },
        {
          t: "code",
          lang: "shell",
          c: " 0\n    2\n    4\n    6\n    8\n    10",
        },
        {
          t: "code",
          lang: "python",
          c: "# Similar to range arange numpy.arange(start, stop, step)\nwhole_numbers = np.arange(0, 20, 1)\nwhole_numbers",
        },
        {
          t: "code",
          lang: "shell",
          c: "array([ 0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15, 16,\n           17, 18, 19])",
        },
        {
          t: "code",
          lang: "python",
          c: "natural_numbers = np.arange(1, 20, 1)\nnatural_numbers",
        },
        {
          t: "code",
          lang: "python",
          c: "odd_numbers = np.arange(1, 20, 2)\nodd_numbers",
        },
        {
          t: "code",
          lang: "shell",
          c: "    array([ 1,  3,  5,  7,  9, 11, 13, 15, 17, 19])",
        },
        {
          t: "code",
          lang: "python",
          c: "even_numbers = np.arange(2, 20, 2)\neven_numbers",
        },
        {
          t: "code",
          lang: "shell",
          c: "    array([ 2,  4,  6,  8, 10, 12, 14, 16, 18])",
        },

        { t: "h3", c: "การสร้างลำดับตัวเลขโดยใช้ linspace" },
        {
          t: "code",
          lang: "python",
          c: "# numpy.linspace()\n# numpy.logspace() in Python with Example\n# For instance, it can be used to create 10 values from 1 to 5 evenly spaced.\nnp.linspace(1.0, 5.0, num=10)",
        },
        {
          t: "code",
          lang: "shell",
          c: "    array([1.        , 1.44444444, 1.88888889, 2.33333333, 2.77777778,\n           3.22222222, 3.66666667, 4.11111111, 4.55555556, 5.        ])",
        },
        {
          t: "code",
          lang: "python",
          c: "# not to include the last value in the interval\nnp.linspace(1.0, 5.0, num=5, endpoint=False)",
        },
        {
          t: "code",
          lang: "shell",
          c: "array([1. , 1.8, 2.6, 3.4, 4.2])",
        },
        {
          t: "code",
          lang: "python",
          c: "# LogSpace\n# LogSpace returns even spaced numbers on a log scale. Logspace has the same parameters as np.linspace.\n\n# Syntax:\n\n# numpy.logspace(start, stop, num, endpoint)\n\nnp.logspace(2, 4.0, num=4)",
        },
        {
          t: "code",
          lang: "shell",
          c: "array([  100.        ,   464.15888336,  2154.43469003, 10000.        ])",
        },
        {
          t: "code",
          lang: "python",
          c: "# to check the size of an array\nx = np.array([1,2,3], dtype=np.complex128)",
        },
        {
          t: "code",
          lang: "python",
          c: "x",
        },
        {
          t: "code",
          lang: "shell",
          c: "    array([1.+0.j, 2.+0.j, 3.+0.j])",
        },
        {
          t: "code",
          lang: "python",
          c: "x.itemsize",
        },
        {
          t: "code",
          lang: "shell",
          c: "16",
        },
        {
          t: "code",
          lang: "python",
          c: "# indexing and Slicing NumPy Arrays in Python\nnp_list = np.array([(1,2,3), (4,5,6)])\nnp_list",
        },
        {
          t: "code",
          lang: "shell",
          c: "    array([[1, 2, 3],\n           [4, 5, 6]])",
        },
        {
          t: "code",
          lang: "python",
          c: "print('First row: ', np_list[0])\nprint('Second row: ', np_list[1])",
        },
        {
          t: "code",
          lang: "shell",
          c: "    First row:  [1 2 3]\n    Second row:  [4 5 6]",
        },
        {
          t: "code",
          lang: "python",
          c: "print('First column: ', np_list[:,0])\nprint('Second column: ', np_list[:,1])\nprint('Third column: ', np_list[:,2])",
        },
        {
          t: "code",
          lang: "shell",
          c: "    First column:  [1 4]\n    Second column:  [2 5]\n    Third column:  [3 6]",
        },

        { t: "h3", c: "ฟังก์ชันทางสถิติของ NumPy พร้อมตัวอย่าง" },
        {
          t: "p",
          c: "NumPy มีฟังก์ชันทางสถิติที่มีประโยชน์มากสำหรับการหาค่าต่ำสุด ค่าสูงสุด ค่าเฉลี่ย ค่ามัธยฐาน เปอร์เซ็นไทล์ ส่วนเบี่ยงเบนมาตรฐาน ความแปรปรวน ฯลฯ จากข้อมูลใน array ฟังก์ชันต่างๆ อธิบายไว้ดังต่อไปนี้\nฟังก์ชันทางสถิติ\nNumpy มีฟังก์ชันทางสถิติที่แข็งแกร่งดังนี้",
        },
        {
          t: "ul",
          c: [
            "ฟังก์ชัน Numpy",
            "Min np.min()",
            "Max np.max()",
            "Mean np.mean()",
            "Median np.median()",
            "Variance",
            "Percentile",
            "Standard deviation np.std()",
          ],
        },
        {
          t: "code",
          lang: "python",
          c: "np_normal_dis = np.random.normal(5, 0.5, 100)\nnp_normal_dis\n## min, max, mean, median, sd\nprint('min: ', two_dimension_array.min())\nprint('max: ', two_dimension_array.max())\nprint('mean: ',two_dimension_array.mean())\n# print('median: ', two_dimension_array.median())\nprint('sd: ', two_dimension_array.std())",
        },
        {
          t: "code",
          lang: "shell",
          c: "    min:  1\n    max:  55\n    mean:  14.777777777777779\n    sd:  18.913709183069525",
        },
        {
          t: "code",
          lang: "python",
          c: "min:  1\nmax:  55\nmean:  14.777777777777779\nsd:  18.913709183069525",
        },
        {
          t: "code",
          lang: "python",
          c: "print(two_dimension_array)\nprint('Column with minimum: ', np.amin(two_dimension_array,axis=0))\nprint('Column with maximum: ', np.amax(two_dimension_array,axis=0))\nprint('=== Row ==')\nprint('Row with minimum: ', np.amin(two_dimension_array,axis=1))\nprint('Row with maximum: ', np.amax(two_dimension_array,axis=1))",
        },
        {
          t: "code",
          lang: "shell",
          c: "    [[ 1  2  3]\n     [ 4 55 44]\n     [ 7  8  9]]\n    Column with minimum:  [1 2 3]\n    Column with maximum:  [ 7 55 44]\n    === Row ==\n    Row with minimum:  [1 4 7]\n    Row with maximum:  [ 3 55  9]",
        },

        { t: "h3", c: "วิธีสร้างลำดับซ้ำ (repeating sequences)" },
        {
          t: "code",
          lang: "python",
          c: "a = [1,2,3]\n\n# Repeat whole of 'a' two times\nprint('Tile:   ', np.tile(a, 2))\n\n# Repeat each element of 'a' two times\nprint('Repeat: ', np.repeat(a, 2))",
        },
        {
          t: "code",
          lang: "shell",
          c: "    Tile:    [1 2 3 1 2 3]\n    Repeat:  [1 1 2 2 3 3]",
        },

        { t: "h3", c: "วิธีสร้างตัวเลขสุ่ม" },
        {
          t: "code",
          lang: "python",
          c: "# One random number between [0,1)\none_random_num = np.random.random()\none_random_in = np.random\nprint(one_random_num)",
        },
        {
          t: "code",
          lang: "shell",
          c: "    0.6149403282678213",
        },
        {
          t: "code",
          lang: "python",
          c: "0.4763968133790438",
        },
        {
          t: "code",
          lang: "shell",
          c: "    0.4763968133790438",
        },
        {
          t: "code",
          lang: "python",
          c: "# Random numbers between [0,1) of shape 2,3\nr = np.random.random(size=[2,3])\nprint(r)",
        },
        {
          t: "code",
          lang: "shell",
          c: "    [[0.13031737 0.4429537  0.1129527 ]\n     [0.76811539 0.88256594 0.6754075 ]]",
        },
        {
          t: "code",
          lang: "python",
          c: "print(np.random.choice(['a', 'e', 'i', 'o', 'u'], size=10))",
        },
        {
          t: "code",
          lang: "shell",
          c: "    ['u' 'o' 'o' 'i' 'e' 'e' 'u' 'o' 'u' 'a']",
        },
        {
          t: "code",
          lang: "python",
          c: "['i' 'u' 'e' 'o' 'a' 'i' 'e' 'u' 'o' 'i']",
        },
        {
          t: "code",
          lang: "shell",
          c: "    ['iueoaieuoi']",
        },
        {
          t: "code",
          lang: "python",
          c: "## Random numbers between [0, 1] of shape 2, 2\nrand = np.random.rand(2,2)\nrand",
        },
        {
          t: "code",
          lang: "shell",
          c: "    array([[0.97992598, 0.79642484],\n           [0.65263629, 0.55763145]])",
        },
        {
          t: "code",
          lang: "python",
          c: "rand2 = np.random.randn(2,2)\nrand2",
        },
        {
          t: "code",
          lang: "shell",
          c: "    array([[ 1.65593322, -0.52326621],\n           [ 0.39071179, -2.03649407]])",
        },
        {
          t: "code",
          lang: "python",
          c: "# Random integers between [0, 10) of shape 2,5\nrand_int = np.random.randint(0, 10, size=[5,3])\nrand_int",
        },
        {
          t: "code",
          lang: "shell",
          c: "    array([[0, 7, 5],\n           [4, 1, 4],\n           [3, 5, 3],\n           [4, 3, 8],\n           [4, 6, 7]])",
        },
        {
          t: "code",
          lang: "python",
          c: "from scipy import stats\nnp_normal_dis = np.random.normal(5, 0.5, 1000) # mean, standard deviation, number of samples\nnp_normal_dis\n## min, max, mean, median, sd\nprint('min: ', np.min(np_normal_dis))\nprint('max: ', np.max(np_normal_dis))\nprint('mean: ', np.mean(np_normal_dis))\nprint('median: ', np.median(np_normal_dis))\nprint('mode: ', stats.mode(np_normal_dis))\nprint('sd: ', np.std(np_normal_dis))",
        },
        {
          t: "code",
          lang: "shell",
          c: "    min:  3.557811005458804\n    max:  6.876317743643499\n    mean:  5.035832048106663\n    median:  5.020161980441937\n    mode:  ModeResult(mode=array([3.55781101]), count=array([1]))\n    sd:  0.489682424165213",
        },
        {
          t: "code",
          lang: "python",
          c: "plt.hist(np_normal_dis, color=\"grey\", bins=21)\nplt.show()",
        },
        {
          t: "image",
          src: "https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/test_files/test_121_0.png",
          alt: "histogram of normal distribution",
          caption: "Histogram of normal distribution",
        },
        {
          t: "code",
          lang: "python",
          c: "# numpy.dot(): Dot Product in Python using Numpy\n# Dot Product\n# Numpy is powerful library for matrices computation. For instance, you can compute the dot product with np.dot\n\n# Syntax\n\n# numpy.dot(x, y, out=None)",
        },

        { t: "h3", c: "พีชคณิตเชิงเส้น (Linear Algebra)" },
        {
          t: "ol",
          c: ["Dot Product"],
        },
        {
          t: "code",
          lang: "python",
          c: "## Linear algebra\n### Dot product: product of two arrays\nf = np.array([1,2,3])\ng = np.array([4,5,3])\n### 1*4+2*5 + 3*6\nnp.dot(f, g)  # 23",
        },

        { t: "h3", c: "การคูณเมทริกซ์ด้วย np.matmul()" },
        {
          t: "code",
          lang: "python",
          c: "### Matmul: matruc product of two arrays\nh = [[1,2],[3,4]]\ni = [[5,6],[7,8]]\n### 1*5+2*7 = 19\nnp.matmul(h, i)",
        },
        {
          t: "code",
          lang: "shell",
          c: "    array([[19, 22],\n           [43, 50]])",
        },
        {
          t: "code",
          lang: "python",
          c: "## Determinant 2*2 matrix\n### 5*8-7*6np.linalg.det(i)",
        },
        {
          t: "code",
          lang: "python",
          c: "np.linalg.det(i)",
        },
        {
          t: "code",
          lang: "shell",
          c: "    -1.999999999999999",
        },
        {
          t: "code",
          lang: "python",
          c: "Z = np.zeros((8,8))\nZ[1::2,::2] = 1\nZ[::2,1::2] = 1",
        },
        {
          t: "code",
          lang: "python",
          c: "Z",
        },
        {
          t: "code",
          lang: "shell",
          c: "    array([[0., 1., 0., 1., 0., 1., 0., 1.],\n           [1., 0., 1., 0., 1., 0., 1., 0.],\n           [0., 1., 0., 1., 0., 1., 0., 1.],\n           [1., 0., 1., 0., 1., 0., 1., 0.],\n           [0., 1., 0., 1., 0., 1., 0., 1.],\n           [1., 0., 1., 0., 1., 0., 1., 0.],\n           [0., 1., 0., 1., 0., 1., 0., 1.],\n           [1., 0., 1., 0., 1., 0., 1., 0.]])",
        },
        {
          t: "code",
          lang: "python",
          c: "new_list = [ x + 2 for x in range(0, 11)]",
        },
        {
          t: "code",
          lang: "python",
          c: "new_list",
        },
        {
          t: "code",
          lang: "shell",
          c: "    [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]",
        },
        {
          t: "code",
          lang: "python",
          c: "[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]",
        },
        {
          t: "code",
          lang: "shell",
          c: "    [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]",
        },
        {
          t: "code",
          lang: "python",
          c: "np_arr = np.array(range(0, 11))\nnp_arr + 2",
        },
        {
          t: "code",
          lang: "shell",
          c: "array([ 2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12])",
        },
        {
          t: "p",
          c: "เราใช้สมการเชิงเส้นสำหรับปริมาณที่มีความสัมพันธ์เชิงเส้น ลองดูตัวอย่างด้านล่าง:",
        },
        {
          t: "code",
          lang: "python",
          c: "temp = np.array([1,2,3,4,5])\npressure = temp * 2 + 5\npressure",
        },
        {
          t: "code",
          lang: "shell",
          c: "array([ 7,  9, 11, 13, 15])",
        },
        {
          t: "code",
          lang: "python",
          c: "plt.plot(temp,pressure)\nplt.xlabel('Temperature in oC')\nplt.ylabel('Pressure in atm')\nplt.title('Temperature vs Pressure')\nplt.xticks(np.arange(0, 6, step=0.5))\nplt.show()",
        },
        {
          t: "image",
          src: "https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/test_files/test_141_0.png",
          alt: "Temperature vs Pressure plot",
          caption: "กราฟแสดงความสัมพันธ์ระหว่างอุณหภูมิและความดัน",
        },
        {
          t: "p",
          c: "เพื่อวาด Gaussian normal distribution โดยใช้ numpy ดังที่เห็นด้านล่าง numpy สามารถสร้างตัวเลขสุ่มได้ ในการสร้าง random sample เราต้องการ mean (mu), sigma (standard deviation) และจำนวนจุดข้อมูล",
        },
        {
          t: "code",
          lang: "python",
          c: "mu = 28\nsigma = 15\nsamples = 100000\n\nx = np.random.normal(mu, sigma, samples)\nax = sns.distplot(x);\nax.set(xlabel=\"x\", ylabel='y')\nplt.show()",
        },
        {
          t: "image",
          src: "https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/test_files/test_143_0.png",
          alt: "Gaussian normal distribution plot",
          caption: "กราฟ Gaussian Normal Distribution",
        },

        { t: "h2", c: "สรุป (Summary)" },
        {
          t: "p",
          c: "สรุปความแตกต่างหลักระหว่าง numpy array กับ Python list:",
        },
        {
          t: "ol",
          c: [
            "Arrays รองรับการดำเนินการแบบ vectorized ในขณะที่ list ไม่รองรับ",
            "เมื่อสร้าง array แล้ว ไม่สามารถเปลี่ยนขนาดได้ ต้องสร้าง array ใหม่หรือเขียนทับอันที่มีอยู่",
            "ทุก array มี dtype เพียงหนึ่งชนิดเท่านั้น item ทั้งหมดต้องเป็นชนิดนั้น",
            "numpy array เทียบเท่าใช้พื้นที่หน่วยความจำน้อยกว่า Python list of lists มาก",
            "numpy arrays รองรับ boolean indexing",
          ],
        },

        { t: "h2", c: "แบบฝึกหัด: วันที่ 24" },
        {
          t: "ol",
          c: ["ทำซ้ำตัวอย่างทั้งหมดที่มีในบทนี้"],
        },
      ],
      en: [],
    },
  },
};
