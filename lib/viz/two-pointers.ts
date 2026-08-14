/** Interactive two-pointer walkthroughs for the intro workshop. */

export type Cmp = "lt" | "eq" | "gt";

export type OppositeStep = {
  line: number;
  msg: string;
  left: number | null;
  right: number | null;
  total: number | null;
  cmp: Cmp | null;
  /** Index pairs already accepted as answers. */
  found: [number, number][];
  /** Indices dropped because they cannot be in a better pair. */
  dead: number[];
  moving: "left" | "right" | "both" | null;
  compares: number;
};

export type SlowFastStep = {
  line: number;
  msg: string;
  nums: number[];
  slow: number;
  fast: number | null;
  writing: boolean;
  skip: boolean;
  done: boolean;
};

export const OPPOSITE_NUMS = [1, 3, 4, 6, 8, 11];
export const OPPOSITE_TARGET = 14;

export const OPPOSITE_CODE = [
  "left, right = 0, len(nums) - 1",
  "while left < right:",
  "    total = nums[left] + nums[right]",
  "    if total == target:",
  "        left += 1; right -= 1",
  "    elif total < target:",
  "        left += 1",
  "    else:",
  "        right -= 1",
];

export const SLOWFAST_NUMS = [4, 7, 2, 9, 6];

export const SLOWFAST_CODE = [
  "slow = 0",
  "for fast in range(len(nums)):",
  "    if nums[fast] % 2 == 0:",
  "        nums[slow] = nums[fast]",
  "        slow += 1",
  "# ผลคือ nums[:slow]",
];

export function buildOppositeSteps(): OppositeStep[] {
  const nums = OPPOSITE_NUMS;
  const target = OPPOSITE_TARGET;
  const steps: OppositeStep[] = [];
  let left: number | null = null;
  let right: number | null = null;
  let total: number | null = null;
  let cmp: Cmp | null = null;
  let found: [number, number][] = [];
  let dead: number[] = [];
  let moving: OppositeStep["moving"] = null;
  let compares = 0;

  const snap = (line: number, msg: string) => {
    steps.push({
      line,
      msg,
      left,
      right,
      total,
      cmp,
      found: found.map(([a, b]) => [a, b]),
      dead: [...dead],
      moving,
      compares,
    });
  };

  snap(1, "nums = [1, 3, 4, 6, 8, 11]  เป้า 14  · เรียงแล้ว เลยตัดคู่ทิ้งเป็นชุดได้");

  left = 0;
  right = nums.length - 1;
  snap(1, "left ชี้หัวแถว (ค่า 1)  ·  right ชี้ท้ายแถว (ค่า 11)");

  while (left !== null && right !== null) {
    moving = null;
    total = null;
    cmp = null;

    if (left >= right) {
      snap(
        2,
        `while ${left} < ${right} เป็นเท็จ  · จบ เทียบ ${compares} ครั้ง เจอ ${found.length} คู่ (brute force ต้อง 15)`,
      );
      break;
    }

    snap(2, `while ${left} < ${right}  · ยังไม่ชนกัน เทียบต่อ`);

    total = nums[left] + nums[right];
    cmp = total === target ? "eq" : total < target ? "lt" : "gt";
    compares += 1;
    const lv = nums[left];
    const rv = nums[right];
    const verb = cmp === "eq" ? "เท่าเป้าพอดี" : cmp === "lt" ? "น้อยกว่าเป้า" : "มากกว่าเป้า";
    snap(3, `${lv} + ${rv} = ${total}  ${verb}`);

    if (cmp === "eq") {
      found = [...found, [left, right]];
      moving = "both";
      snap(4, `เจอคู่ (${lv}, ${rv})  · ขยับทั้งสองตัวไปหาคู่ถัดไป`);
      left += 1;
      right -= 1;
      snap(5, `left += 1 และ right -= 1  · ไปต่อที่ index ${left} กับ ${right}`);
    } else if (cmp === "lt") {
      moving = "left";
      snap(
        6,
        `${lv} จับกับเพื่อนที่ดีที่สุด (${rv}) แล้วยังไม่ถึง  · ทิ้งทุกคู่ที่มี ${lv} ได้เลย`,
      );
      dead = [...dead, left];
      left += 1;
      snap(7, `left += 1  · ขยับไปค่าที่ใหญ่ขึ้น`);
    } else {
      moving = "right";
      snap(
        8,
        `${rv} จับกับเพื่อนที่เล็กที่สุด (${lv}) แล้วยังเกิน  · ทิ้งทุกคู่ที่มี ${rv} ได้เลย`,
      );
      dead = [...dead, right];
      right -= 1;
      snap(9, `right -= 1  · ขยับไปค่าที่เล็กลง`);
    }
  }

  return steps;
}

export function buildSlowFastSteps(): SlowFastStep[] {
  const nums = [...SLOWFAST_NUMS];
  const steps: SlowFastStep[] = [];
  let slow = 0;
  let fast: number | null = null;
  let writing = false;
  let skip = false;
  let done = false;

  const snap = (line: number, msg: string) => {
    steps.push({
      line,
      msg,
      nums: [...nums],
      slow,
      fast,
      writing,
      skip,
      done,
    });
  };

  snap(1, "nums = [4, 7, 2, 9, 6]  · อยากเก็บเฉพาะเลขคู่ ในแถวเดิม ไม่สร้างแถวใหม่");
  slow = 0;
  snap(1, "slow = 0  · มือซ้ายชี้ช่องที่จะเขียนของชิ้นถัดไป");

  for (let f = 0; f < nums.length; f++) {
    fast = f;
    writing = false;
    skip = false;
    snap(2, `fast = ${f}  · อ่าน nums[${f}] = ${nums[f]}`);

    if (nums[f] % 2 === 0) {
      snap(3, `${nums[f]} เป็นเลขคู่  · เก็บ  เขียนลงช่อง slow = ${slow}`);
      writing = true;
      nums[slow] = nums[f];
      snap(
        4,
        `nums[${slow}] = ${nums[f]}  · slow (${slow}) ≤ fast (${f}) จึงไม่ทับของที่ยังไม่อ่าน`,
      );
      writing = false;
      slow += 1;
      snap(
        5,
        `slow += 1 → ${slow}  · ของที่เก็บแล้วคือ nums[:slow] = [${nums.slice(0, slow).join(", ")}]`,
      );
    } else {
      skip = true;
      snap(3, `${nums[f]} เป็นเลขคี่  · ทิ้ง  slow ค้างที่ ${slow} ไม่ขยับ`);
    }
  }

  fast = null;
  writing = false;
  skip = false;
  done = true;
  snap(
    6,
    `จบ  ผลลัพธ์ = [${nums.slice(0, slow).join(", ")}]  · ขยะท้ายแถว = [${nums.slice(slow).join(", ")}] ไม่ต้องล้าง`,
  );
  return steps;
}
