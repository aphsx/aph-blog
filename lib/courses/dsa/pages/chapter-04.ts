import type { Page } from "@/lib/types";

export const chapter04Pages: Record<string, Page> = {
  "dsa-ch4-intro": {
    slug: "dsa-ch4-intro",
    title: {
      th: "Linear Data Structures: รู้จักโครงสร้างข้อมูลเชิงเส้น",
      en: "Linear Data Structures: Array vs Linked Structures",
    },
    lead: {
      th: "เปรียบเทียบโครงสร้างข้อมูลเชิงเส้น: ข้อมูลที่เรียงต่อกันเป็นลำดับ เส้นทางสู่การเลือกใช้ Array, Linked List, Stack และ Queue",
      en: "Understand linear data structures: sequential organization and tradeoffs between arrays and node-based lists.",
    },
    group: "บทที่ 5: โครงสร้างข้อมูลเชิงเส้น (Linear Data Structures)",
    blocks: {
      th: [
        {
          t: "p",
          c: "**โครงสร้างข้อมูลเชิงเส้น (Linear Data Structure)** คือโครงสร้างที่สมาชิกของข้อมูลถูกจัดเรียงต่อกันเป็นลำดับเชิงเส้น โดยสมาชิกแต่ละตัว (ยกเว้นตัวแรกและตัวสุดท้าย) จะมีตัวก่อนหน้า (Predecessor) และตัวถัดไป (Successor) เพียงตัวเดียว",
        },
        { t: "h2", c: "ตารางเปรียบเทียบ Time Complexity ของโครงสร้างเชิงเส้น" },
        {
          t: "table",
          head: ["โครงสร้าง", "Access by Index", "Search by Value", "Insert at Head", "Insert at Tail"],
          rows: [
            ["Array / Dynamic Array", "⚡ O(1)", "O(n)", "🐢 O(n) ต้องเลื่อนสมาชิก", "⚡ O(1) Amortized"],
            ["Singly Linked List", "🐢 O(n)", "O(n)", "⚡ O(1) สลับ Pointer", "⚡ O(1) หากมี Tail pointer"],
            ["Stack (LIFO)", "N/A (ดูได้เฉพาะ Top)", "O(n)", "⚡ O(1) Push", "N/A"],
            ["Queue (FIFO)", "N/A (ดูได้เฉพาะ Front)", "O(n)", "⚡ O(1) Dequeue", "⚡ O(1) Enqueue"],
          ],
        },
        {
          t: "callout",
          title: "💡 Trade-off สำคัญในการสัมภาษณ์งาน",
          c: "Array ดีกว่าเรื่อง Cache Locality (ข้อมูลติดกันใน RAM ทำให้ CPU Cache Hit สูงมาก) ส่วน Linked List ดีกว่าเรื่องการแทรก/ลบที่หัวตารางแบบ O(1) โดยไม่ต้องขยับข้อมูลตัวอื่น",
        },
      ],
      en: [],
    },
  },

  "dsa-ch4-linked-list": {
    slug: "dsa-ch4-linked-list",
    title: {
      th: "Linked List: ลิงก์ลิสต์ (Singly, Doubly, Circular)",
      en: "Linked List: Singly, Doubly & Circular Implementations",
    },
    lead: {
      th: "เจาะลึกโครงสร้างโหนด การเชื่อมต่อพอยน์เตอร์ การแทรก ลบ และโจทย์สัมภาษณ์ยอดฮิต Reverse Linked List",
      en: "Master node linkages, insertions, deletions, and the classic interview question: Reverse a Linked List.",
    },
    group: "บทที่ 5: โครงสร้างข้อมูลเชิงเส้น (Linear Data Structures)",
    blocks: {
      th: [
        { t: "h2", c: "ประเภทของ Linked List" },
        {
          t: "ul",
          c: [
            "**Singly Linked List**: แต่ละโหนดมีตัวชี้ `next` ชี้ไปข้างหน้าทิศทางเดียว",
            "**Doubly Linked List**: แต่ละโหนดมีทั้ง `next` และ `prev` สามารถเดินหน้าและถอยหลังได้",
            "**Circular Linked List**: โหนดสุดท้ายชี้วนกลับมาที่โหนดแรก (`tail.next = head`)",
          ],
        },
        {
          t: "code",
          lang: "text",
          label: "ไดอะแกรม Singly vs Doubly Linked List",
          c: `Singly: [Head: 1] -> [2] -> [3] -> None

Doubly: None <- [Head: 1] <==> [2] <==> [3: Tail] -> None`,
        },
        { t: "h2", c: "การสร้าง Singly Linked List ฉบับสมบูรณ์" },
        {
          t: "code",
          lang: "python",
          label: "Python: คลาส LinkedList พร้อม Insert & Delete",
          c: `class Node:
    def __init__(self, val: int):
        self.val = val
        self.next: Node | None = None

class LinkedList:
    def __init__(self):
        self.head: Node | None = None
        
    def append(self, val: int) -> None:
        new_node = Node(val)
        if not self.head:
            self.head = new_node
            return
        curr = self.head
        while curr.next:
            curr = curr.next
        curr.next = new_node
        
    def prepend(self, val: int) -> None:
        """แทรกที่หัวลิสต์ O(1)"""
        new_node = Node(val)
        new_node.next = self.head
        self.head = new_node
        
    def print_list(self) -> None:
        vals = []
        curr = self.head
        while curr:
            vals.append(str(curr.val))
            curr = curr.next
        print(" -> ".join(vals) + " -> None")

ll = LinkedList()
ll.append(10)
ll.append(20)
ll.prepend(5)
ll.print_list()  # 5 -> 10 -> 20 -> None`,
        },
        { t: "h2", c: "โจทย์สัมภาษณ์ยอดฮิต: Reverse Linked List (LeetCode 206)" },
        {
          t: "p",
          c: "การกลับทิศทางลูกศรของ Linked List ทั้งหมดจาก `1 -> 2 -> 3 -> None` ให้กลายเป็น `3 -> 2 -> 1 -> None` ด้วยเทคนิค 3 Pointers (`prev`, `curr`, `next_temp`):",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Reverse Linked List (O(n) Time, O(1) Space)",
          c: `def reverse_list(head: Node | None) -> Node | None:
    prev = None
    curr = head
    
    while curr:
        next_temp = curr.next  # 1. จำตัวถัดไปไว้ก่อน
        curr.next = prev       # 2. พลิกลูกศรกลับมาชี้ตัวก่อนหน้า
        prev = curr            # 3. ขยับ prev ไปข้างหน้า
        curr = next_temp       # 4. ขยับ curr ไปข้างหน้า
        
    return prev  # prev จะกลายเป็น head ตัวใหม่`,
        },
        {
          t: "code",
          lang: "cpp",
          label: "C++: Reverse Linked List",
          c: `ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;
    while (curr != nullptr) {
        ListNode* nextTemp = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
}`,
        },
      ],
      en: [],
    },
  },

  "dsa-ch4-stack": {
    slug: "dsa-ch4-stack",
    title: {
      th: "Stack: สแต็ก (LIFO & Monotonic Stack)",
      en: "Stack: LIFO Principle & Monotonic Stack",
    },
    lead: {
      th: "โครงสร้างข้อมูลแบบเข้าทีหลังออกก่อน (LIFO), การทำงานของ Call Stack, และโจทย์สัมภาษณ์ Valid Parentheses",
      en: "Understand Last-In First-Out (LIFO), call stack mechanics, and the Valid Parentheses interview pattern.",
    },
    group: "บทที่ 5: โครงสร้างข้อมูลเชิงเส้น (Linear Data Structures)",
    blocks: {
      th: [
        { t: "h2", c: "หลักการทำงานของ Stack (LIFO: Last-In, First-Out)" },
        {
          t: "p",
          c: "สแต็กเปรียบเสมือนจานที่วางซ้อนกัน จานที่วางลงไปชิ้นสุดท้าย (**Push**) จะเป็นชิ้นแรกที่ถูกหยิบออก (**Pop**) เสมอ การเข้าถึงและถอดออกจากจุดยอด (Top) ทำงานด้วยความเร็ว **O(1)** ตลอดเวลา:",
        },
        {
          t: "code",
          lang: "text",
          label: "หลักการ Push และ Pop",
          c: `Push(10) -> [10]
Push(20) -> [10, 20]
Push(30) -> [10, 20, 30] (Top คือ 30)

Pop()    -> คืนค่า 30, เหลือ [10, 20]
Peek()   -> ดูค่า Top คือ 20 (โดยไม่ลบ)`,
        },
        { t: "h2", c: "โจทย์สัมภาษณ์งาน: Valid Parentheses (LeetCode 20)" },
        {
          t: "p",
          c: "ตรวจสอบความถูกต้องของวงเล็บเปิดและปิด `()`, `{}`, `[]`:",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: เช็ควาลิดวงเล็บด้วย Stack (O(n) Time, O(n) Space)",
          c: `def is_valid_parentheses(s: str) -> bool:
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    
    for char in s:
        if char in mapping:
            # เจอวงเล็บปิด: ต้องเช็คว่าตัวบนสุดของ stack ตรงกันไหม
            top_element = stack.pop() if stack else '#'
            if mapping[char] != top_element:
                return False
        else:
            # เจอวงเล็บเปิด: ดันเข้า stack
            stack.append(char)
            
    return not stack  # ถ้า stack ว่าง แปลว่าปิดครบทุกคู่

print(is_valid_parentheses("()[]{}"))  # True
print(is_valid_parentheses("(]"))      # False
print(is_valid_parentheses("([)]"))    # False`,
        },
        {
          t: "h3",
          c: "โจทย์เสริม: Remove All Adjacent Duplicates In String (LeetCode 1047)",
        },
        {
          t: "p",
          c: "โจทย์ให้สตริง `s` จงลบตัวอักษรคู่ที่อยู่ติดกันและเหมือนกันออกซ้ำๆ จนกระทั่งไม่มีตัวซ้ำติดกันเหลืออยู่:",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: แก้โจทย์ตัวซ้ำติดกันด้วย Stack O(n)",
          c: `def remove_duplicates(s: str) -> str:
    stack = []
    for char in s:
        if stack and stack[-1] == char:
            stack.pop() # เจอตัวเหมือนตัวบนสุด ให้ลบคู่นั้นทิ้ง
        else:
            stack.append(char)
    return "".join(stack)

print(remove_duplicates("abbaca"))  # "ca" เพราะ bb หาย -> aaca -> aa หาย -> ca`,
        },
        {
          t: "callout",
          title: "🎯 รูปแบบขั้นสูง: Monotonic Stack",
          c: "ในการสัมภาษณ์ระดับ Mid-Senior จะมีโจทย์ประเภท 'หาตัวเลขถัดไปที่มากกว่า' (Next Greater Element) หรือ Daily Temperatures (LeetCode 739) ซึ่งใช้เทคนิค Monotonic Stack เก็บสมาชิกเรียงตามลำดับค่าเพื่อลดความซับซ้อนจาก O(n²) เหลือ O(n)!",
        },
      ],
      en: [],
    },
  },

  "dsa-ch4-queue": {
    slug: "dsa-ch4-queue",
    title: {
      th: "Queue & Deque: คิว (FIFO & Double-Ended)",
      en: "Queue & Deque: FIFO Principle & BFS Foundations",
    },
    lead: {
      th: "โครงสร้างข้อมูลแบบเข้าก่อนออกก่อน (FIFO), Circular Queue, Deque และการเตรียมพร้อมสำหรับ Breadth-First Search (BFS)",
      en: "Master FIFO queues, double-ended deques (collections.deque), and foundations for graph traversals.",
    },
    group: "บทที่ 5: โครงสร้างข้อมูลเชิงเส้น (Linear Data Structures)",
    blocks: {
      th: [
        { t: "h2", c: "หลักการทำงานของ Queue (FIFO: First-In, First-Out)" },
        {
          t: "p",
          c: "คิวเปรียบเสมือนการต่อแถวซื้อตั๋ว คนที่มาเข้าแถวก่อน (**Enqueue ที่ Tail**) จะได้ออกจากแถวก่อน (**Dequeue ที่ Head**) เสมอ:",
        },
        {
          t: "code",
          lang: "text",
          label: "หลักการ FIFO",
          c: `Enqueue(1) -> [1]
Enqueue(2) -> [1, 2]
Enqueue(3) -> [1, 2, 3]

Dequeue()  -> คืนค่า 1, เหลือ [2, 3] (Front ขยับ)`,
        },
        {
          t: "callout",
          title: "⚠️ ข้อควรระวังระดับวิกฤตใน Python!",
          c: "ห้ามใช้ `list.pop(0)` เป็น Queue ในห้องสัมภาษณ์เด็ดขาด! เพราะการลบตัวแรกของ Python list มี Time Complexity เป็น **O(n)** (ต้องขยับข้อมูลทั้งลิสต์) ให้ใช้ `from collections import deque` เสมอ ซึ่งรองรับ `popleft()` ในเวลา **O(1)** อย่างแท้จริง!",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: ใช้งาน collections.deque อย่างถูกต้อง",
          c: `from collections import deque

# สร้างคิว
queue = deque()

# Enqueue (เพิ่มท้ายคิว O(1))
queue.append("Task 1")
queue.append("Task 2")
queue.append("Task 3")

# Dequeue (หยิบหัวคิวออก O(1))
print("ทำ:", queue.popleft())  # ทำ: Task 1
print("ทำ:", queue.popleft())  # ทำ: Task 2
print("คิวที่เหลือ:", list(queue))  # ['Task 3']`,
        },
        {
          t: "code",
          lang: "cpp",
          label: "C++: std::queue",
          c: `#include <iostream>
#include <queue>
using namespace std;

int main() {
    queue<string> q;
    q.push("Task 1");
    q.push("Task 2");

    cout << "Front: " << q.front() << "\\n"; // Task 1
    q.pop();
    cout << "Next: " << q.front() << "\\n";  // Task 2
    return 0;
}`,
        },
        { t: "h2", c: "Use Case จริง: ระบบจัดการคิวเครื่องพิมพ์ (Printer Queue)" },
        {
          t: "p",
          c: "ตัวอย่างการนำ Queue ไปประยุกต์ใช้ในระบบปฏิบัติการเพื่อจัดการงานพิมพ์เอกสารตามลำดับที่ส่งเข้ามา:",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Printer Queue System",
          c: `from collections import deque

class PrinterQueue:
    def __init__(self):
        self.queue = deque()
        
    def add_document(self, doc_name: str) -> None:
        self.queue.append(doc_name)
        print(f"เอกสาร '{doc_name}' ถูกส่งเข้าคิว")
        
    def print_next(self) -> None:
        if not self.queue:
            print("ไม่มีงานพิมพ์ในคิว")
            return
        doc = self.queue.popleft()
        print(f"กำลังพิมพ์เอกสาร: '{doc}' สำเร็จ!")

printer = PrinterQueue()
printer.add_document("Resume.pdf")
printer.add_document("Contract.docx")
printer.print_next()  # พิมพ์ Resume.pdf
printer.print_next()  # พิมพ์ Contract.docx`,
        },
        { t: "h2", c: "โจทย์สัมภาษณ์งาน: Number of Recent Calls (LeetCode 933)" },
        {
          t: "p",
          c: "ออกแบบคลาส `RecentCounter` นับจำนวนคำร้องขอ (Ping) ที่เกิดขึ้นในช่วง 3,000 มิลลิวินาทีล่าสุด `[t - 3000, t]`:",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: LeetCode 933 ด้วย Sliding Queue O(1) Amortized",
          c: `from collections import deque

class RecentCounter:
    def __init__(self):
        self.requests = deque()

    def ping(self, t: int) -> int:
        self.requests.append(t)
        # ลบคำขอเก่าที่เกิน 3000ms ออกจากหัวคิว
        while self.requests and self.requests[0] < t - 3000:
            self.requests.popleft()
        return len(self.requests)

counter = RecentCounter()
print(counter.ping(1))     # 1 (ช่วง [-2999, 1])
print(counter.ping(100))   # 2 (ช่วง [-2900, 100])
print(counter.ping(3001))  # 3 (ช่วง [1, 3001])
print(counter.ping(3002))  # 3 (ช่วง [2, 3002] คำขอที่ 1 หลุดคิวไปแล้ว)`,
        },
      ],
      en: [],
    },
  },
};
