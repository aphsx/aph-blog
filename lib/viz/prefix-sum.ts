/** Interactive prefix-sum walkthroughs: intro workshop + LC1732 + LC724. */

export type BuildStep = {
  line: number;
  msg: string;
  prefix: (number | null)[];
  /** nums index being added this step (aligned with prefix[i+1]). */
  buildI: number | null;
  query: { i: number; j: number } | null;
  result: number | null;
};

export type AltStep = {
  line: number;
  msg: string;
  /** Altitude at each point visited, starting with 0. */
  altitudes: number[];
  /** gain index currently being applied. */
  gainI: number | null;
  altitude: number;
  highest: number;
};

export type PivotStep = {
  line: number;
  msg: string;
  i: number | null;
  n: number | null;
  leftSum: number;
  rightSum: number | null;
  total: number | null;
  matched: boolean;
  answer: number | null;
};

export const BUILD_NUMS = [3, 1, 4, 1, 5];

export const BUILD_CODE = [
  "nums = [3, 1, 4, 1, 5]",
  "prefix = [0] * (len(nums) + 1)  # ช่อง 0 = 0",
  "for i in range(len(nums)):",
  "    prefix[i + 1] = prefix[i] + nums[i]",
  "i, j = 1, 3",
  "print(prefix[j + 1] - prefix[i])  # sum(1..3)",
];

export const ALT_GAIN = [-5, 1, 5, 0, -7];

export const ALT_CODE = [
  "def largestAltitude(gain):",
  "    altitude = 0",
  "    highest = 0",
  "    for g in gain:",
  "        altitude += g",
  "        highest = max(highest, altitude)",
  "    return highest",
];

export const PIVOT_NUMS = [1, 7, 3, 6, 5, 6];

export const PIVOT_CODE = [
  "def pivotIndex(nums):",
  "    total = sum(nums)",
  "    left_sum = 0",
  "    for i, n in enumerate(nums):",
  "        right_sum = total - left_sum - n",
  "        if left_sum == right_sum:",
  "            return i",
  "        left_sum += n",
  "    return -1",
];

export function buildQuerySteps(): BuildStep[] {
  const nums = BUILD_NUMS;
  const prefix: (number | null)[] = Array(nums.length + 1).fill(null);
  const steps: BuildStep[] = [];

  const push = (
    line: number,
    msg: string,
    extra: Partial<Pick<BuildStep, "buildI" | "query" | "result">> = {},
  ) => {
    steps.push({
      line,
      msg,
      prefix: [...prefix],
      buildI: extra.buildI ?? null,
      query: extra.query ?? null,
      result: extra.result ?? null,
    });
  };

  push(1, "nums = [3, 1, 4, 1, 5]  · ของต้นทางที่เราจะสะสม");
  push(2, "prefix ยาว n+1 ช่อง  · ยังเป็น [None,…] ก่อนใส่ค่า");
  prefix[0] = 0;
  push(2, "prefix[0] = 0  · ผลรวมของช่วงว่าง (ยังไม่กิน nums ตัวไหน)");

  for (let i = 0; i < nums.length; i++) {
    push(3, `for i = ${i}  · หยิบ nums[${i}] = ${nums[i]}`, { buildI: i });
    prefix[i + 1] = (prefix[i] as number) + nums[i];
    push(
      4,
      `prefix[${i + 1}] = prefix[${i}] + ${nums[i]}  →  ${prefix[i + 1]}  · กิน nums[0..${i}]`,
      { buildI: i },
    );
  }

  push(4, "สร้างเสร็จ  prefix = [0, 3, 4, 8, 9, 14]  · จ่าย O(n) ครั้งเดียว");
  push(5, "ถาม sum(nums[1..3])  · i = 1, j = 3", { query: { i: 1, j: 3 } });
  push(6, "prefix[4] − prefix[1] = 9 − 3 = 6", { query: { i: 1, j: 3 }, result: 6 });
  push(6, "ตรวจ: 1 + 4 + 1 = 6  · จากนี้ทุกช่วงตอบได้ใน O(1)", {
    query: { i: 1, j: 3 },
    result: 6,
  });
  return steps;
}

export function buildAltitudeSteps(): AltStep[] {
  const gain = ALT_GAIN;
  const steps: AltStep[] = [];
  let altitude = 0;
  let highest = 0;
  const altitudes = [0];
  let gainI: number | null = null;

  const push = (line: number, msg: string) => {
    steps.push({
      line,
      msg,
      altitudes: [...altitudes],
      gainI,
      altitude,
      highest,
    });
  };

  push(1, "gain = [-5, 1, 5, 0, -7]  · จุดเริ่ม altitude = 0 นับด้วย");
  push(2, "altitude = 0  · ยืนที่จุด 0");
  push(3, "highest = 0  · จำยอดสูงสุดไว้ตั้งแต่จุดเริ่ม (กันเคสลงตลอด)");

  for (let i = 0; i < gain.length; i++) {
    const g = gain[i];
    gainI = i;
    push(4, `for g = ${g}  · ไต่จากจุด ${i} ไปจุด ${i + 1}`);
    altitude += g;
    altitudes.push(altitude);
    push(5, `altitude += ${g}  →  ${altitude}  (จุดที่ ${i + 1})`);
    const prev = highest;
    highest = Math.max(highest, altitude);
    push(
      6,
      highest > prev
        ? `highest = max(${prev}, ${altitude})  →  ${highest}  ยอดใหม่`
        : `highest = max(${prev}, ${altitude})  →  ${highest}  ยังไม่สูงกว่าเดิม`,
    );
  }

  gainI = null;
  push(7, `return highest  →  ${highest}`);
  return steps;
}

export function buildPivotSteps(): PivotStep[] {
  const nums = PIVOT_NUMS;
  const steps: PivotStep[] = [];
  let i: number | null = null;
  let n: number | null = null;
  let leftSum = 0;
  let rightSum: number | null = null;
  let total: number | null = null;
  let matched = false;
  let answer: number | null = null;

  const push = (line: number, msg: string) => {
    steps.push({
      line,
      msg,
      i,
      n,
      leftSum,
      rightSum,
      total,
      matched,
      answer,
    });
  };

  push(1, "nums = [1, 7, 3, 6, 5, 6]  · หา index ที่ซ้าย = ขวา (ไม่นับตัวเอง)");
  total = nums.reduce((a, b) => a + b, 0);
  push(2, `total = ${total}  · รู้ผลรวมทั้งแถวไว้ก่อน`);
  push(3, "left_sum = 0  · ก่อนตัวแรก ฝั่งซ้ายว่าง");

  for (let k = 0; k < nums.length; k++) {
    i = k;
    n = nums[k];
    matched = false;
    push(4, `i = ${k}, n = ${n}`);
    rightSum = total - leftSum - n;
    push(5, `right_sum = ${total} − ${leftSum} − ${n}  →  ${rightSum}`);
    if (leftSum === rightSum) {
      matched = true;
      answer = k;
      push(6, `left ${leftSum} == right ${rightSum}  →  สมดุลที่ index ${k}`);
      push(7, `return ${k}`);
      return steps;
    }
    push(6, `left ${leftSum} ≠ right ${rightSum}  →  ยังไม่ใช่ pivot`);
    leftSum += n;
    push(8, `left_sum += ${n}  →  ${leftSum}  · ตัวนี้ย้ายไปฝั่งซ้าย`);
    rightSum = null;
  }

  i = null;
  n = null;
  push(9, "return -1");
  return steps;
}
