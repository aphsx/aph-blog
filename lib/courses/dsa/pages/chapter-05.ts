import type { Page } from "@/lib/types";

export const chapter05Pages: Record<string, Page> = {
  "dsa-ch5-intro": {
    slug: "dsa-ch5-intro",
    title: {
      th: "ภาพรวม Linear Data Structures: Array vs Node-based",
      en: "Linear Data Structures Overview: Sequential Organization & Tradeoffs",
    },
    lead: {
      th: "เปรียบเทียบโครงสร้างข้อมูลเชิงเส้น: ความสัมพันธ์แบบก่อนหน้า-ถัดไป, ตาราง Trade-off ระหว่าง Array กับ Node-based Lists และเกณฑ์การเลือกใช้งาน",
      en: "Understand linear data structures: sequential organization and tradeoffs between arrays and node-based structures.",
    },
    group: "บทที่ 5: โครงสร้างข้อมูลเชิงเส้น (Linear Data Structures)",
    blocks: {
      th: [
        {
          t: "p",
          c: "**โครงสร้างข้อมูลเชิงเส้น (Linear Data Structure)** คือโครงสร้างที่สมาชิกของข้อมูลถูกจัดเรียงต่อกันเป็นลำดับเส้นตรง โดยสมาชิกแต่ละตัว (ยกเว้นตัวแรกสุดและตัวท้ายสุด) จะมีสมาชิกตัวก่อนหน้า (Predecessor) และสมาชิกตัวถัดไป (Successor) เพียงตัวเดียวอย่างชัดเจน",
        },
        { t: "h2", c: "ตารางเปรียบเทียบ Time Complexity ระหว่างโครงสร้างเชิงเส้น" },
        {
          t: "table",
          head: ["การทำงาน (Operation)", "Array / Dynamic Array", "Singly Linked List", "Stack (LIFO)", "Queue (FIFO)"],
          rows: [
            ["**Access by Index**", "⚡ O(1) คำนวณที่อยู่ตรงๆ", "🐢 O(n) ต้องเดินไล่ตาม Pointer", "❌ ไม่อนุญาต (ดูได้เฉพาะ Top)", "❌ ไม่อนุญาต (ดูได้เฉพาะ Front)"],
            ["**Search by Value**", "O(n) (หรือ O(log n) ถ้าเรียงแล้ว)", "O(n)", "O(n)", "O(n)"],
            ["**Insert at Head**", "🐢 O(n) ต้องเลื่อนสมาชิกทั้งหมด", "⚡ O(1) สลับ Pointer หัวตาราง", "⚡ O(1) Push", "❌ ทำไม่ได้"],
            ["**Insert at Tail**", "⚡ O(1) Amortized", "⚡ O(1) หากเก็บ Tail Pointer", "❌ ทำไม่ได้", "⚡ O(1) Enqueue"],
            ["**Delete at Head**", "🐢 O(n) ต้องขยับทั้งลิสต์", "⚡ O(1) สลับ Head ข้ามไปตัวถัดไป", "⚡ O(1) Pop", "⚡ O(1) Dequeue"],
            ["**Cache Locality**", "🔥 ยอดเยี่ยมมาก (Cache Hit สูง)", "❄️ ย่ำแย่ (โหนดกระจัดกระจายใน RAM)", "ดีมาก", "ดีมาก"],
          ],
        },
        {
          t: "callout",
          title: "🎯 กฎทองในการตัดสินใจเลือกใช้ในระบบจริง",
          c: "- **เลือกใช้ Array / Vector**: เมื่อต้องการอ่านข้อมูลบ่อยๆ ผ่าน Index (`arr[i]`), เมื่อข้อมูลมีขนาดคงที่ หรือต้องการความเร็วสูงสุดจาก CPU Cache\n- **เลือกใช้ Linked List**: เมื่อต้องการแทรกหรือลบข้อมูลที่หัวตาราง/ตรงกลางบ่อยๆ ตลอดเวลา โดยไม่ต้องกังวลเรื่องการขยับข้อมูลตัวอื่น\n- **เลือกใช้ Stack**: เมื่อกระบวนการทำงานมีลักษณะ 'ทำทีหลัง แต่ต้องเสร็จก่อน' (LIFO)\n- **เลือกใช้ Queue**: เมื่อกระบวนการทำงานต้องมีความเป็นธรรม 'มาก่อน ได้รับบริการก่อน' (FIFO)",
        },
      ],
      en: [],
    },
  },

  "dsa-ch5-linked-list": {
    slug: "dsa-ch5-linked-list",
    title: {
      th: "Linked List (Singly, Doubly, Circular) + Music Playlist",
      en: "Linked List Implementations & The Music Playlist Manager Project",
    },
    lead: {
      th: "เจาะลึก 3 รูปแบบของ Linked List, โปรเจกต์ Music Playlist Manager ในโลกจริง, และโจทย์สัมภาษณ์ยอดฮิต Reverse Linked List (LeetCode 206)",
      en: "Master Singly, Doubly, and Circular Linked Lists with the real-world Music Playlist Manager and LeetCode 206 Reverse Linked List.",
    },
    group: "บทที่ 5: โครงสร้างข้อมูลเชิงเส้น (Linear Data Structures)",
    blocks: {
      th: [
        { t: "h2", c: "1. ประเภทของ Linked List" },
        {
          t: "ul",
          c: [
            "**Singly Linked List**: แต่ละโหนดมีตัวชี้ `next` ชี้ไปข้างหน้าทิศทางเดียว โหนดสุดท้ายชี้ไปที่ `nullptr` (หรือ `None`)",
            "**Doubly Linked List**: แต่ละโหนดมีทั้งตัวชี้ `next` (เดินหน้า) และ `prev` (ถอยหลัง) ทำให้สามารถเดินสองทิศทางและลบโหนดได้ใน $O(1)$",
            "**Circular Linked List**: โหนดสุดท้ายชี้วนกลับมาที่โหนดแรก (`tail.next = head`) สร้างเป็นวงกลม เหมาะกับงาน Round-Robin Scheduling",
          ],
        },
        {
          t: "viz",
          id: "dsa-linked-list-types",
        },
        { t: "h2", c: "2. โปรเจกต์ในโลกจริง: Music Playlist Manager" },
        {
          t: "p",
          c: "ลองนึกถึงระบบเล่นเพลงใน Spotify หรือ Apple Music:\n- เราต้องการเพิ่มเพลงเข้าเพลย์ลิสต์ ลบเพลง และแสดงเพลงทั้งหมด\n- เราต้องการกดปุ่ม 'ถัดไป' (Next Song) และ 'ย้อนกลับ' (Previous Song)\n- เราต้องการเปิดโหมด 'เล่นวนซ้ำ' (Repeat Playlist)\n\nโครงสร้างที่เหมาะสมที่สุดสำหรับระบบนี้คือ **Doubly Circular Linked List** ดังตัวอย่างโค้ดด้านล่าง:",
        },
        {
          t: "code",
          lang: "cpp",
          label: "C++: ระบบจัดการ Playlist เพลงด้วย Doubly Linked List",
          c: `#include <iostream>
#include <string>
using namespace std;

class Song {
public:
    string title;
    Song* next;
    Song* prev;
    
    Song(string title) : title(title), next(nullptr), prev(nullptr) {}
};

class Playlist {
private:
    Song* head;
    Song* tail;

public:
    Playlist() : head(nullptr), tail(nullptr) {}

    // เพิ่มเพลงต่อท้ายเพลย์ลิสต์ O(1)
    void addSong(string title) {
        Song* newSong = new Song(title);
        if (!head) {
            head = tail = newSong;
        } else {
            tail->next = newSong;
            newSong->prev = tail;
            tail = newSong;
        }
        cout << "Added: " << title << "\\n";
    }

    // ลบเพลงตามชื่อเพลง O(n) Search + O(1) Pointer Unlink
    bool removeSong(string title) {
        Song* curr = head;
        while (curr != nullptr) {
            if (curr->title == title) {
                // ปลดสาย Pointer ข้ามโหนดที่ต้องการลบ
                if (curr->prev) curr->prev->next = curr->next;
                if (curr->next) curr->next->prev = curr->prev;
                if (curr == head) head = curr->next;
                if (curr == tail) tail = curr->prev;
                
                delete curr; // คืนหน่วยความจำใน Heap!
                cout << "Removed: " << title << "\\n";
                return true;
            }
            curr = curr->next;
        }
        return false;
    }

    // แสดงเพลงทั้งหมดในเพลย์ลิสต์
    void display() {
        cout << "--- Current Playlist ---\\n";
        Song* curr = head;
        while (curr != nullptr) {
            cout << "🎵 " << curr->title << "\\n";
            curr = curr->next;
        }
    }
};

int main() {
    Playlist myPlaylist;
    myPlaylist.addSong("Bohemian Rhapsody");
    myPlaylist.addSong("Hotel California");
    myPlaylist.addSong("Stairway to Heaven");
    myPlaylist.display();

    myPlaylist.removeSong("Hotel California");
    myPlaylist.display();
    return 0;
}`,
        },
        { t: "h2", c: "3. โจทย์สัมภาษณ์ระดับตำนาน: Reverse Linked List (LeetCode 206)" },
        {
          t: "p",
          c: "โจทย์ให้กลับทิศทางลูกศรของ Singly Linked List จาก `1 -> 2 -> 3 -> None` ให้กลายเป็น `3 -> 2 -> 1 -> None` โดยใช้หน่วยความจำส่วนเกินแบบ **O(1) Space**:",
        },
        {
          t: "viz",
          id: "reverse-linked-list",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Reverse Linked List O(n) Time, O(1) Space",
          c: `class ListNode:
    def __init__(self, val: int = 0, next: 'ListNode | None' = None):
        self.val = val
        self.next = next

def reverse_list(head: ListNode | None) -> ListNode | None:
    prev = None
    curr = head
    
    while curr:
        next_temp = curr.next  # 1. จำตัวถัดไปไว้
        curr.next = prev       # 2. พลิกลูกศรกลับมาชี้ตัวก่อนหน้า
        prev = curr            # 3. เลื่อน prev
        curr = next_temp       # 4. เลื่อน curr
        
    return prev # prev คือโหนดหัวตารางตัวใหม่

# ทดสอบ
# 1 -> 2 -> 3 -> None
node3 = ListNode(3)
node2 = ListNode(2, node3)
head = ListNode(1, node2)

new_head = reverse_list(head)
curr = new_head
res = []
while curr:
    res.append(str(curr.val))
    curr = curr.next
print(" -> ".join(res)) # 3 -> 2 -> 1`,
        },
        {
          t: "callout",
          title: "🌐 การนำ Linked List ไปใช้ในระบบงานจริง (Production Use Cases)",
          c: "1. **LRU Cache (Least Recently Used)**: Redis และ Memcached ใช้ Doubly Linked List ร่วมกับ Hash Map เพื่อเลื่อนคีย์ที่ถูกใช้งานล่าสุดมาไว้หัวตารางใน O(1)\n2. **Memory Allocator**: ระบบปฏิบัติการใช้ Linked List แบบ Free-List ในการติดตามบล็อกหน่วยความจำที่ว่างใน RAM\n3. **Blockchain**: บล็อกแต่ละบล็อกเชื่อมต่อกันด้วย Cryptographic Hash Pointer ย้อนกลับไปหาบล็อกก่อนหน้า",
        },
      ],
      en: [],
    },
  },

  "dsa-ch5-stack": {
    slug: "dsa-ch5-stack",
    title: {
      th: "Stack (LIFO): Call Stack, Undo/Redo & Valid Parentheses",
      en: "Stack Mechanics: LIFO Principle, Call Stacks & Valid Parentheses",
    },
    lead: {
      th: "โครงสร้างข้อมูลแบบเข้าทีหลังออกก่อน (LIFO), เบื้องหลังการทำงานของ Call Stack ในระบบคอมพิวเตอร์, และโจทย์สัมภาษณ์ Valid Parentheses (LeetCode 20)",
      en: "Understand Last-In First-Out (LIFO), execution call stack mechanics, and master the classic Valid Parentheses interview problem.",
    },
    group: "บทที่ 5: โครงสร้างข้อมูลเชิงเส้น (Linear Data Structures)",
    blocks: {
      th: [
        { t: "h2", c: "หลักการทำงานของ Stack (LIFO: Last-In, First-Out)" },
        {
          t: "p",
          c: "**สแต็ก (Stack)** เปรียบเสมือน 'กองจานที่วางซ้อนกัน' หรือ 'ซองบรรจุกระสุนปืน':\n- คุณสามารถวางจานใบใหม่ลงไปบนยอดได้เท่านั้น (**Push**)\n- คุณสามารถหยิบจานใบบนสุดออกได้เท่านั้น (**Pop**)\n- คุณสามารถมองดูจานใบบนสุดได้ (**Top / Peek**)\n- จานใบที่วางลงไปชิ้นสุดท้าย จะเป็นชิ้นแรกที่ถูกหยิบออกเสมอ (**Last-In, First-Out**)",
        },
        {
          t: "viz",
          id: "dsa-stack-operations",
        },
        { t: "h2", c: "การสร้าง Stack ด้วย Array vs Linked List" },
        {
          t: "table",
          head: ["วิธีการสร้าง", "ข้อดี", "ข้อเสีย", "ความเร็วทุก Operation"],
          rows: [
            ["**Array-Based Stack** (เช่น `vector` ใน C++ หรือ `list` ใน Python)", "ใช้พื้นที่กะทัดรัด และ Cache Locality ยอดเยี่ยมมาก", "อาจมีจังหวะขยาย Capacity นานๆ ครั้ง", "⚡ O(1) Amortized"],
            ["**Linked List-Based Stack** (Push/Pop ที่ Head)", "ขนาดปรับเพิ่มลดได้อิสระ ไม่ต้องกังวลเรื่อง Capacity", "มี Overhead ของตัวชี้ `next` ในทุกโหนด และ Cache Locality แย่กว่า", "⚡ O(1) Strict"],
          ],
        },
        { t: "h2", c: "โจทย์สัมภาษณ์ยอดนิยมอันดับหนึ่ง: Valid Parentheses (LeetCode 20)" },
        {
          t: "p",
          c: "โจทย์ให้ตรวจสอบว่าสตริงของวงเล็บ `()`, `{}`, `[]` มีการเปิดและปิดอย่างถูกต้องตามลำดับหรือไม่:\n- ทุกวงเล็บเปิดต้องมีวงเล็บปิดชนิดเดียวกันมารับ\n- วงเล็บที่เปิดทีหลัง ต้องถูกปิดก่อน (**สมบัติ LIFO แบบตรงตัว!**)",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: เช็ควาลิดวงเล็บด้วย Stack (O(n) Time, O(n) Space)",
          c: `def is_valid_parentheses(s: str) -> bool:
    stack = []
    # แมปวงเล็บปิด เข้ากับ วงเล็บเปิดที่ตรงกัน
    mapping = {")": "(", "}": "{", "]": "["}
    
    for char in s:
        if char in mapping:
            # เจอวงเล็บปิด: ดึงตัวบนสุดของสแต็กมาเทียบ
            top_element = stack.pop() if stack else '#'
            if mapping[char] != top_element:
                return False
        else:
            # เจอวงเล็บเปิด: ดันเข้าสแต็ก
            stack.append(char)
            
    # สแต็กต้องว่างเปล่า (แปลว่าทุกคู่ปิดครบหมดพอดี)
    return len(stack) == 0

print(is_valid_parentheses("()[]{}")) # True
print(is_valid_parentheses("(]"))     # False
print(is_valid_parentheses("([)]"))   # False
print(is_valid_parentheses("{[]}"))   # True`,
        },
        {
          t: "callout",
          title: "💡 สแต็กในโลกซอฟต์แวร์จริง",
          c: "1. **Undo / Redo ใน Text Editor**: ทุกการกดพิมพ์จะถูก Push ลง Stack เมื่อกด Ctrl+Z จะ Pop การกระทำล่าสุดออกมาแก้กลับ\n2. **Browser Back Button**: ประวัติหน้าเว็บถูกเก็บในสแต็ก เมื่อกดย้อนกลับ เบราว์เซอร์จะ Pop URL ล่าสุดออกเพื่อกลับไปหน้าก่อนหน้า\n3. **Monotonic Stack Pattern**: รูปแบบสแต็กเก็บข้อมูลเรียงค่า ใช้แก้โจทย์อย่าง Daily Temperatures (LeetCode 739) หรือ Next Greater Element ใน O(n)!",
        },
      ],
      en: [],
    },
  },

  "dsa-ch5-queue": {
    slug: "dsa-ch5-queue",
    title: {
      th: "Queue & Deque (FIFO): Circular Queue & Printer Spooler",
      en: "Queue & Deque Mechanics: FIFO, Circular Buffers & Collections.deque",
    },
    lead: {
      th: "โครงสร้างข้อมูลแบบเข้าก่อนออกก่อน (FIFO), Circular Queue แก้ปัญหาหน่วยความจำลอย, Double-Ended Queue (Deque), และระบบคิวเครื่องพิมพ์ (Printer Spooler)",
      en: "Master First-In First-Out (FIFO), circular queue memory management, double-ended deques, and OS printer queue scheduling.",
    },
    group: "บทที่ 5: โครงสร้างข้อมูลเชิงเส้น (Linear Data Structures)",
    blocks: {
      th: [
        { t: "h2", c: "หลักการทำงานของ Queue (FIFO: First-In, First-Out)" },
        {
          t: "p",
          c: "**คิว (Queue)** เปรียบเสมือน 'การต่อแถวซื้อตั๋วดูหนัง' หรือ 'คิวรับอาหาร':\n- ผู้ที่มาใหม่จะเข้าแถวทางด้านหลังสุดเสมอ (**Enqueue / Push ที่ Rear**)\n- ผู้ที่อยู่หน้าแถวสุดจะได้รับบริการและออกจากแถวก่อนเสมอ (**Dequeue / Pop ที่ Front**)\n- สมาชิกที่เข้ามาคนแรก จะได้ออกเป็นคนแรก (**First-In, First-Out**)",
        },
        {
          t: "callout",
          title: "⚠️ ข้อควรระวังระดับคอขาดบาดตายใน Python!",
          c: "ห้ามใช้ `list.pop(0)` เป็นคิวในห้องสัมภาษณ์เด็ดขาด! เพราะการลบสมาชิกตัวแรกของ Python `list` มี Time Complexity เป็น **O(n)** (คอมพิวเตอร์ต้องขยับข้อมูลที่เหลือ $N-1$ ตัวไปข้างหน้าทีละช่อง)\n\nให้ใช้ `from collections import deque` เสมอ ซึ่งเป็น Double-Ended Queue ที่รองรับ `popleft()` ในเวลา **O(1) Strict**!",
        },
        { t: "h2", c: "ปัญหา False Overflow และ Circular Queue (คิวแบบวงกลม)" },
        {
          t: "p",
          c: "หากเราสร้าง Queue ด้วย Fixed Array ขนาด 5 ช่อง เมื่อเรา Enqueue และ Dequeue ไปเรื่อยๆ ตัวชี้ `front` และ `rear` จะเลื่อนไปทางขวาจนชนขอบท้าย แม้ข้างหน้าจะมีช่องว่างเหลืออยู่ก็ตาม (เรียกว่า False Overflow)\n\nทางแก้คือการใช้ **Circular Queue** โดยใช้ตัวดำเนินการ Modulo (`% capacity`) ให้ตัวชี้วนกลับมาที่ Index 0 เมื่อชนขอบท้าย:",
        },
        {
          t: "viz",
          id: "dsa-circular-queue",
        },
        {
          t: "code",
          lang: "cpp",
          label: "C++: Circular Queue Implementation",
          c: `class MyCircularQueue {
private:
    vector<int> data;
    int head, tail, size, capacity;

public:
    MyCircularQueue(int k) : data(k), head(0), tail(0), size(0), capacity(k) {}

    bool enQueue(int value) {
        if (isFull()) return false;
        data[tail] = value;
        tail = (tail + 1) % capacity; // วนกลับมา 0 เมื่อชนขอบ
        size++;
        return true;
    }

    bool deQueue() {
        if (isEmpty()) return false;
        head = (head + 1) % capacity; // ขยับ head วนรอบ
        size--;
        return true;
    }

    int Front() { return isEmpty() ? -1 : data[head]; }
    bool isEmpty() { return size == 0; }
    bool isFull() { return size == capacity; }
};`,
        },
        { t: "h2", c: "Use Case ในระบบจริง: ระบบจัดการคิวเครื่องพิมพ์ (Printer Spooler)" },
        {
          t: "code",
          lang: "python",
          label: "Python: ระบบจัดการคิวเครื่องพิมพ์ด้วย collections.deque",
          c: `from collections import deque

class PrinterSpooler:
    def __init__(self):
        self.queue = deque()
        
    def submit_document(self, doc_name: str, pages: int) -> None:
        self.queue.append({"name": doc_name, "pages": pages})
        print(f"📥 เอกสาร '{doc_name}' ({pages} หน้า) เข้าสู่คิว")
        
    def print_next(self) -> None:
        if not self.queue:
            print("📭 ไม่มีเอกสารรอพิมพ์")
            return
        doc = self.queue.popleft() # O(1) Dequeue!
        print(f"🖨️ กำลังพิมพ์: '{doc['name']}' สำเร็จ!")

spooler = PrinterSpooler()
spooler.submit_document("Quarterly_Report.pdf", 12)
spooler.submit_document("Contract_Signed.docx", 3)
spooler.print_next() # พิมพ์ Quarterly_Report ก่อน ตามหลัก FIFO!
spooler.print_next() # พิมพ์ Contract_Signed`,
        },
        { t: "h2", c: "โจทย์สัมภาษณ์งาน: Number of Recent Calls (LeetCode 933)" },
        {
          t: "p",
          c: "ออกแบบระบบนับจำนวนคำขอ (Pings) ที่เข้ามาในช่วงหน้าต่างเวลา 3,000 มิลลิวินาทีล่าสุด `[t - 3000, t]`:",
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
        # นำคำขอเก่าที่หมดอายุ (เวลาน้อยกว่า t - 3000) ออกจากหัวคิว
        while self.requests and self.requests[0] < t - 3000:
            self.requests.popleft()
        return len(self.requests)

counter = RecentCounter()
print(counter.ping(1))     # 1 (ช่วง [-2999, 1])
print(counter.ping(100))   # 2 (ช่วง [-2900, 100])
print(counter.ping(3001))  # 3 (ช่วง [1, 3001])
print(counter.ping(3002))  # 3 (ช่วง [2, 3002] คำขอแรกหลุดคิวไปแล้ว)`,
        },
      ],
      en: [],
    },
  },
};
