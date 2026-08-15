/** Interactive walkthrough for LC238 Product of Array Except Self. */

export type ProductExceptSelfStep = {
  line: number;
  msg: string;
  nums: number[];
  answer: number[];
  right: number;
  i: number | null;
  phase: "init" | "left" | "right" | "done" | null;
};

export const PRODUCT_EXCEPT_SELF_CODE = [
  "nums = [1, 2, 3, 4]",
  "n = len(nums)",
  "answer = [1] * n",
  "for i in range(1, n):",
  "    answer[i] = answer[i - 1] * nums[i - 1]",
  "right = 1",
  "for i in range(n - 1, -1, -1):",
  "    answer[i] *= right",
  "    right *= nums[i]",
  "return answer",
];

export function buildProductExceptSelfSteps(): ProductExceptSelfStep[] {
  const nums = [1, 2, 3, 4];
  const n = nums.length;
  const steps: ProductExceptSelfStep[] = [];
  let answer = [1, 1, 1, 1];
  let right = 1;

  const snap = (
    line: number,
    msg: string,
    i: number | null = null,
    phase: ProductExceptSelfStep["phase"] = null,
  ) => {
    steps.push({
      line,
      msg,
      nums: [...nums],
      answer: [...answer],
      right,
      i,
      phase,
    });
  };

  snap(1, "Example 1 · nums = [1, 2, 3, 4]", null, "init");
  snap(2, "n = 4", null, "init");
  answer = [1, 1, 1, 1];
  snap(3, "answer = [1, 1, 1, 1]  · เริ่มด้วย 1 ทุกช่อง (ค่ากลางของการคูณ)", null, "init");

  snap(4, "รอบซ้าย → ขวา · ใส่ผลคูณของทุกตัวทางซ้ายของ i ลง answer[i]", null, "left");

  answer[1] = answer[0] * nums[0];
  snap(5, "i = 1 · answer[1] = answer[0](1) × nums[0](1) = 1", 1, "left");

  answer[2] = answer[1] * nums[1];
  snap(5, "i = 2 · answer[2] = answer[1](1) × nums[1](2) = 2", 2, "left");

  answer[3] = answer[2] * nums[2];
  snap(5, "i = 3 · answer[3] = answer[2](2) × nums[2](3) = 6", 3, "left");

  snap(4, "รอบซ้ายจบ · answer = [1, 1, 2, 6]  (= ผลคูณฝั่งซ้ายแต่ละช่อง)", null, "left");

  right = 1;
  snap(6, "right = 1  · ตัวสะสมผลคูณฝั่งขวา เริ่มที่ 1", null, "right");
  snap(7, "รอบขวา → ซ้าย · คูณ right ลง answer[i] แล้วสะสม nums[i] เข้า right", null, "right");

  answer[3] *= right;
  snap(8, "i = 3 · answer[3] *= right → 6 × 1 = 6", 3, "right");
  right *= nums[3];
  snap(9, "right *= nums[3] → 1 × 4 = 4", 3, "right");

  answer[2] *= right;
  snap(8, "i = 2 · answer[2] *= right → 2 × 4 = 8", 2, "right");
  right *= nums[2];
  snap(9, "right *= nums[2] → 4 × 3 = 12", 2, "right");

  answer[1] *= right;
  snap(8, "i = 1 · answer[1] *= right → 1 × 12 = 12", 1, "right");
  right *= nums[1];
  snap(9, "right *= nums[1] → 12 × 2 = 24", 1, "right");

  answer[0] *= right;
  snap(8, "i = 0 · answer[0] *= right → 1 × 24 = 24", 0, "right");
  right *= nums[0];
  snap(9, "right *= nums[0] → 24 × 1 = 24", 0, "right");

  snap(10, "return answer → [24, 12, 8, 6]  · จบ", null, "done");

  return steps;
}
