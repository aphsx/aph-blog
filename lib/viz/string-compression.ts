/** Interactive walkthrough for LC443 String Compression. */

export type StringCompressionStep = {
  line: number;
  msg: string;
  /** Full array state (written prefix may differ from original). */
  chars: string[];
  read: number;
  write: number;
  count: number;
  /** Inclusive start of the group currently being scanned; -1 if none. */
  groupStart: number;
  /** Exclusive end of that group; -1 if none. */
  groupEnd: number;
  /** What to emphasize in the diagram. */
  focus: "read" | "write" | "group" | "done" | null;
};

export const STRING_COMPRESSION_CODE = [
  'chars = ["a","a","b","b","c","c","c"]',
  "write = read = 0",
  "n = len(chars)",
  "while read < n:",
  "    ch = chars[read]",
  "    count = 0",
  "    while read < n and chars[read] == ch:",
  "        read += 1",
  "        count += 1",
  "    chars[write] = ch",
  "    write += 1",
  "    if count > 1:",
  "        for d in str(count):",
  "            chars[write] = d",
  "            write += 1",
  "return write",
];

export function buildStringCompressionSteps(): StringCompressionStep[] {
  const original = ["a", "a", "b", "b", "c", "c", "c"];
  const chars = [...original];
  const steps: StringCompressionStep[] = [];
  let read = 0;
  let write = 0;
  let count = 0;
  let groupStart = -1;
  let groupEnd = -1;

  const snap = (
    line: number,
    msg: string,
    focus: StringCompressionStep["focus"] = null,
  ) => {
    steps.push({
      line,
      msg,
      chars: [...chars],
      read,
      write,
      count,
      groupStart,
      groupEnd,
      focus,
    });
  };

  snap(1, 'Example 1 · chars = ["a","a","b","b","c","c","c"]');
  snap(2, "write = 0  read = 0  · write ชี้ช่องว่างที่จะวางผล · read ชี้ตัวที่กำลังอ่าน");
  snap(3, "n = 7  · ความยาวเดิม");

  // Group "aa"
  snap(4, "read < 7  · เข้าลูปนอก เริ่มกลุ่มใหม่", "read");
  groupStart = 0;
  snap(5, 'ch = "a"  · ตัวอักษรของกลุ่มนี้', "group");
  count = 0;
  snap(6, "count = 0  · เตรียมนับ");
  snap(7, 'chars[0] == "a"  · ยังอยู่ในกลุ่ม เดิน read', "group");
  read = 1;
  count = 1;
  snap(8, "read = 1  count = 1", "read");
  snap(7, 'chars[1] == "a"  · ยังกลุ่มเดิม', "group");
  read = 2;
  count = 2;
  snap(8, "read = 2  count = 2  · ช่อง 2 เป็น b แล้ว กลุ่ม a จบ", "read");
  groupEnd = 2;
  snap(7, 'chars[2] != "a"  · ออกจากลูปใน', "group");
  snap(10, 'เขียน "a" ที่ช่อง write = 0', "write");
  chars[0] = "a";
  write = 1;
  snap(11, "write = 1  · ขยับไปช่องว่างถัดไป", "write");
  snap(12, "count = 2 > 1  · ต้องเขียนเลข", "write");
  snap(13, 'd = "2"', "write");
  chars[1] = "2";
  snap(14, 'chars[1] = "2"', "write");
  write = 2;
  snap(15, "write = 2  · กลุ่ม a เสร็จ ผลตอนนี้ [a, 2 | …]", "write");

  // Group "bb"
  groupStart = 2;
  groupEnd = -1;
  count = 0;
  snap(4, "read = 2 < 7  · กลุ่มถัดไป", "read");
  snap(5, 'ch = "b"', "group");
  snap(6, "count = 0");
  snap(7, 'chars[2] == "b"  · นับกลุ่ม b', "group");
  read = 3;
  count = 1;
  snap(8, "read = 3  count = 1", "read");
  snap(7, 'chars[3] == "b"', "group");
  read = 4;
  count = 2;
  snap(8, "read = 4  count = 2  · กลุ่ม b จบ", "read");
  groupEnd = 4;
  snap(7, 'chars[4] != "b"  · ออกจากลูปใน', "group");
  snap(10, 'เขียน "b" ที่ช่อง write = 2', "write");
  chars[2] = "b";
  write = 3;
  snap(11, "write = 3", "write");
  snap(12, "count = 2 > 1  · เขียนเลข", "write");
  snap(13, 'd = "2"', "write");
  chars[3] = "2";
  snap(14, 'chars[3] = "2"', "write");
  write = 4;
  snap(15, "write = 4  · ผลตอนนี้ [a, 2, b, 2 | …]", "write");

  // Group "ccc"
  groupStart = 4;
  groupEnd = -1;
  count = 0;
  snap(4, "read = 4 < 7  · กลุ่มสุดท้าย", "read");
  snap(5, 'ch = "c"', "group");
  snap(6, "count = 0");
  snap(7, 'chars[4] == "c"', "group");
  read = 5;
  count = 1;
  snap(8, "read = 5  count = 1", "read");
  snap(7, 'chars[5] == "c"', "group");
  read = 6;
  count = 2;
  snap(8, "read = 6  count = 2", "read");
  snap(7, 'chars[6] == "c"', "group");
  read = 7;
  count = 3;
  snap(8, "read = 7  count = 3  · หมดแถว กลุ่ม c จบ", "read");
  groupEnd = 7;
  snap(7, "read < n เป็นเท็จ  · ออกจากลูปใน", "group");
  snap(10, 'เขียน "c" ที่ช่อง write = 4', "write");
  chars[4] = "c";
  write = 5;
  snap(11, "write = 5", "write");
  snap(12, "count = 3 > 1  · เขียนเลข", "write");
  snap(13, 'd = "3"', "write");
  chars[5] = "3";
  snap(14, 'chars[5] = "3"', "write");
  write = 6;
  snap(15, "write = 6  · ผล [a, 2, b, 2, c, 3] · ช่องท้ายไม่สำคัญ", "write");

  groupStart = -1;
  groupEnd = -1;
  snap(4, "read < n → 7 < 7 เป็นเท็จ  · ออกจากลูปนอก", "done");
  snap(16, "return 6  · ความยาวใหม่ (ไม่ return ลิสต์)", "done");

  return steps;
}
