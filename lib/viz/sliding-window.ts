/** Interactive sliding-window walkthroughs: fixed k + variable expand/shrink. */

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
  zeros: number;
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

/** Contiguous ones; at most k zeros allowed inside the window. */
export const VAR_NUMS = [1, 1, 0, 1, 1, 0, 1];
export const VAR_K = 1;

export const VAR_CODE = [
  "left, zeros, best = 0, 0, 0",
  "for right in range(len(nums)):",
  "    if nums[right] == 0: zeros += 1",
  "    while zeros > k:",
  "        if nums[left] == 0: zeros -= 1",
  "        left += 1",
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
  const nums = VAR_NUMS;
  const k = VAR_K;
  const steps: VarStep[] = [];
  let left = 0;
  let right: number | null = null;
  let zeros = 0;
  let best = 0;
  let shrinking = false;
  let adding = false;

  const snap = (line: number, msg: string) => {
    steps.push({
      line,
      msg,
      left,
      right,
      zeros,
      best,
      shrinking,
      adding,
    });
  };

  snap(
    1,
    `nums = [${nums.join(", ")}]  · อนุญาต 0 ในหน้าต่างได้ไม่เกิน k = ${k}  · หาช่วงยาวสุด`,
  );

  for (let r = 0; r < nums.length; r++) {
    right = r;
    shrinking = false;
    adding = false;
    snap(2, `right = ${r}  รับ ${nums[r]}  · ขยายขอบขวา`);

    if (nums[r] === 0) {
      zeros += 1;
      adding = true;
      snap(3, `เจอ 0  · zeros = ${zeros}`);
    } else {
      adding = true;
      snap(3, `เจอ 1  · zeros ยังเป็น ${zeros}`);
    }

    while (zeros > k) {
      shrinking = true;
      adding = false;
      snap(4, `zeros = ${zeros} > k  · หดซ้าย เอา nums[${left}] = ${nums[left]} ออก`);
      if (nums[left] === 0) {
        zeros -= 1;
      }
      left += 1;
      snap(5, `left = ${left}  · zeros = ${zeros}  ยาวตอนนี้ ${r - left + 1}`);
    }

    shrinking = false;
    adding = false;
    const len = r - left + 1;
    const grew = len > best;
    best = Math.max(best, len);
    snap(
      7,
      grew
        ? `ช่วง valid  · ยาว ${len}  best = ${best}`
        : `ช่วง valid  · ยาว ${len}  best ค้างที่ ${best}`,
    );
  }

  snap(7, `จบ  best = ${best}  · หน้าต่างยืด-หดตามจำนวน 0 ไม่ล็อกความยาว`);
  return steps;
}
