/** Interactive walkthrough for LC334 Increasing Triplet Subsequence. */

export type IncreasingTripletStep = {
  line: number;
  msg: string;
  nums: number[];
  /** Index being examined; -1 before / after the loop. */
  cursor: number;
  first: number | "inf";
  second: number | "inf";
  /** Which tracker / outcome to highlight. */
  highlight: "first" | "second" | "found" | null;
  found: boolean;
};

export const INCREASING_TRIPLET_CODE = [
  "nums = [2, 1, 5, 0, 4, 6]",
  'first = second = float("inf")',
  "for n in nums:",
  "    if n <= first:",
  "        first = n",
  "    elif n <= second:",
  "        second = n",
  "    else:",
  "        return True",
  "return False",
];

export function buildIncreasingTripletSteps(): IncreasingTripletStep[] {
  const nums = [2, 1, 5, 0, 4, 6];
  const steps: IncreasingTripletStep[] = [];
  let first: number | "inf" = "inf";
  let second: number | "inf" = "inf";
  let cursor = -1;
  let found = false;

  const snap = (
    line: number,
    msg: string,
    highlight: IncreasingTripletStep["highlight"] = null,
  ) => {
    steps.push({
      line,
      msg,
      nums: [...nums],
      cursor,
      first,
      second,
      highlight,
      found,
    });
  };

  snap(1, "Example 3 · nums = [2, 1, 5, 0, 4, 6]");
  snap(2, 'first = ∞  second = ∞  · ยังไม่มีตัวสมัคร เริ่มด้วยค่าใหญ่สุด');

  // n = 2
  cursor = 0;
  snap(3, "n = 2  · ดูช่อง 0");
  snap(4, "2 <= ∞  · จริง → อัปเดต first");
  first = 2;
  snap(5, "first = 2  · ตัวเล็กสุดที่เคยเจอ", "first");

  // n = 1
  cursor = 1;
  snap(3, "n = 1  · ดูช่อง 1");
  snap(4, "1 <= 2  · จริง → อัปเดต first อีก");
  first = 1;
  snap(5, "first = 1  · ตัวเล็กสุดใหม่ (second ยังว่าง)", "first");

  // n = 5
  cursor = 2;
  snap(3, "n = 5  · ดูช่อง 2");
  snap(4, "5 <= 1  · เท็จ → ไม่แตะ first");
  snap(6, "5 <= ∞  · จริง → อัปเดต second");
  second = 5;
  snap(7, "second = 5  · มีคู่ 1 < 5 แล้ว รอตัวที่สาม", "second");

  // n = 0
  cursor = 3;
  snap(3, "n = 0  · ดูช่อง 3");
  snap(4, "0 <= 1  · จริง → อัปเดต first");
  first = 0;
  snap(
    5,
    "first = 0  · second ยังเป็น 5 (ตั้งตอน first เป็น 1) — โอเค เพราะโจทย์ขอแค่มีหรือไม่มี",
    "first",
  );

  // n = 4
  cursor = 4;
  snap(3, "n = 4  · ดูช่อง 4");
  snap(4, "4 <= 0  · เท็จ");
  snap(6, "4 <= 5  · จริง → อัปเดต second ให้เล็กลง");
  second = 4;
  snap(7, "second = 4  · ตอนนี้มี 0 < 4 พร้อมรอตัวที่ใหญ่กว่า 4", "second");

  // n = 6
  cursor = 5;
  snap(3, "n = 6  · ดูช่อง 5");
  snap(4, "6 <= 0  · เท็จ");
  snap(6, "6 <= 4  · เท็จ → ตก else");
  found = true;
  snap(
    9,
    "6 > first และ 6 > second  · เจอครบสามตัวที่เรียงเพิ่ม (เช่น 0 < 4 < 6) → True",
    "found",
  );

  cursor = -1;
  snap(9, "return True  · จบ", "found");

  return steps;
}
