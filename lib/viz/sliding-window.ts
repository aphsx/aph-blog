/** Interactive sliding-window walkthroughs: fixed k + variable (no-repeat). */

export type FixedStep = {
  line: number;
  msg: string;
  left: number | null;
  right: number | null;
  sum: number | null;
  best: number | null;
  enter: number | null;
  leave: number | null;
};

export type VarStep = {
  line: number;
  msg: string;
  left: number;
  right: number | null;
  seen: string[];
  best: number;
  shrinking: boolean;
  adding: boolean;
};

export const FIXED_NUMS = [2, 1, 5, 1, 3, 2];
export const FIXED_K = 3;

export const FIXED_CODE = [
  "window = sum(nums[:k])",
  "best = window",
  "for i in range(k, len(nums)):",
  "    window += nums[i] - nums[i - k]",
  "    best = max(best, window)",
];

export const VAR_S = "abcabcbb";

export const VAR_CODE = [
  "left, seen, best = 0, set(), 0",
  "for right, ch in enumerate(s):",
  "    while ch in seen:",
  "        seen.remove(s[left])",
  "        left += 1",
  "    seen.add(ch)",
  "    best = max(best, right - left + 1)",
];

export function buildFixedSteps(): FixedStep[] {
  const nums = FIXED_NUMS;
  const k = FIXED_K;
  const steps: FixedStep[] = [];
  let left: number | null = null;
  let right: number | null = null;
  let sum: number | null = null;
  let best: number | null = null;
  let enter: number | null = null;
  let leave: number | null = null;

  const snap = (line: number, msg: string) => {
    steps.push({ line, msg, left, right, sum, best, enter, leave });
  };

  snap(1, "nums = [2, 1, 5, 1, 3, 2]  k = 3  · หน้าต่างต้องยาว 3 ช่องตลอด ไม่ยืดไม่หด");

  left = 0;
  right = k - 1;
  sum = nums[0] + nums[1] + nums[2];
  snap(1, `window = sum(nums[:3]) = ${nums[0]}+${nums[1]}+${nums[2]} = ${sum}  · ยาว k = 3`);

  best = sum;
  snap(2, `best = ${best}  · จำช่วงแรกไว้ก่อน แล้วเลื่อนทั้งก้อนไปทีละ 1`);

  for (let i = k; i < nums.length; i++) {
    enter = i;
    leave = i - k;
    snap(3, `i = ${i}  · เข้า nums[${i}] = ${nums[i]}  ออก nums[${leave}] = ${nums[leave]}`);

    sum = (sum as number) + nums[i] - nums[leave];
    left = i - k + 1;
    right = i;
    snap(4, `รวม = ${sum}  · ยาวยังเป็น 3 ช่อง  [${nums.slice(left, right + 1).join(", ")}]`);

    const prev = best as number;
    best = Math.max(best as number, sum);
    snap(5, best > prev ? `best = ${best}  · ช่วงนี้ดีกว่าเดิม` : `best ค้างที่ ${best}`);
    enter = null;
    leave = null;
  }

  snap(5, "จบ  best = 9 จากช่วง [5, 1, 3]  · เลื่อน 3 ครั้ง หน้าต่างยาว 3 ตลอด");
  return steps;
}

export function buildVarSteps(): VarStep[] {
  const s = VAR_S;
  const steps: VarStep[] = [];
  let left = 0;
  let right: number | null = null;
  const seen: string[] = [];
  let best = 0;
  let shrinking = false;
  let adding = false;

  const snap = (line: number, msg: string) => {
    steps.push({
      line,
      msg,
      left,
      right,
      seen: [...seen],
      best,
      shrinking,
      adding,
    });
  };

  snap(1, 's = "abcabcbb"  · invariant: ห้ามมีตัวซ้ำในหน้าต่าง  ยาว = right − left + 1');

  for (let r = 0; r < s.length; r++) {
    const ch = s[r];
    right = r;
    shrinking = false;
    adding = false;
    snap(2, `right = ${r}  รับ '${ch}'  · ตอนนี้ยาว ${r - left + 1} ช่อง`);

    while (seen.includes(ch)) {
      shrinking = true;
      adding = false;
      snap(3, `'${ch}' ซ้ำในหน้าต่าง  · หดซ้าย เอา '${s[left]}' ออก`);
      seen.splice(seen.indexOf(s[left]), 1);
      left += 1;
      snap(4, `left = ${left}  · เหลือ "${s.slice(left, r)}"  ยาว ${r - left} ช่อง  ยังซ้ำอยู่ไหม: ${seen.includes(ch) ? "ยัง" : "ไม่แล้ว"}`);
    }

    shrinking = false;
    adding = true;
    seen.push(ch);
    snap(5, `รับ '${ch}' เข้า  window = "${s.slice(left, r + 1)}"  ยาว ${r - left + 1}`);

    adding = false;
    const len = r - left + 1;
    const grew = len > best;
    best = Math.max(best, len);
    snap(6, grew ? `best = ${best}  · ยาวสุดใหม่` : `best ค้างที่ ${best}  · ช่วงนี้ยาว ${len}`);
  }

  snap(6, 'จบ  best = 3 จาก "abc"  · หน้าต่างยืด-หดตามเงื่อนไข ไม่ล็อกความยาว');
  return steps;
}
