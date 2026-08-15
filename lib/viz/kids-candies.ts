/** Interactive walkthrough for LC1431 Kids With the Greatest Number of Candies. */

export type KidsCandiesStep = {
  line: number;
  msg: string;
  candies: number[];
  extra: number;
  /** max once; null until computed */
  best: number | null;
  /** kid index currently under check; null when not in loop body */
  i: number | null;
  /** c + extra for the current kid */
  sum: number | null;
  /** whether current kid meets the bar */
  ok: boolean | null;
  /** result list built so far */
  result: boolean[];
};

export const KIDS_CANDIES_CODE = [
  "candies = [2, 3, 5, 1, 3]",
  "extraCandies = 3",
  "best = max(candies)",
  "res = []",
  "for c in candies:",
  "    res.append(c + extraCandies >= best)",
  "return res",
];

export function buildKidsCandiesSteps(): KidsCandiesStep[] {
  const candies = [2, 3, 5, 1, 3];
  const extra = 3;
  const steps: KidsCandiesStep[] = [];
  let best: number | null = null;
  let result: boolean[] = [];

  const snap = (
    line: number,
    msg: string,
    extraFields: Partial<Pick<KidsCandiesStep, "i" | "sum" | "ok">> = {},
  ) => {
    steps.push({
      line,
      msg,
      candies,
      extra,
      best,
      i: extraFields.i ?? null,
      sum: extraFields.sum ?? null,
      ok: extraFields.ok ?? null,
      result: [...result],
    });
  };

  snap(1, "Example 1 · candies = [2, 3, 5, 1, 3]");
  snap(2, "extraCandies = 3  · ก้อนพิเศษยกให้ลองทีละคน (ไม่ได้ให้จริง)");

  best = 5;
  snap(3, "best = max(candies) = 5  · เกณฑ์หาครั้งเดียวก่อนเข้าลูป");
  snap(4, "res = []  · กล่องเก็บ true/false ทีละคน");

  const walk: { c: number; sum: number; ok: boolean }[] = [
    { c: 2, sum: 5, ok: true },
    { c: 3, sum: 6, ok: true },
    { c: 5, sum: 8, ok: true },
    { c: 1, sum: 4, ok: false },
    { c: 3, sum: 6, ok: true },
  ];

  for (let i = 0; i < walk.length; i++) {
    const { c, sum, ok } = walk[i];
    snap(5, `for c in candies  · เด็กคนที่ ${i} ถือ ${c}`, { i });
    snap(
      6,
      `${c} + 3 = ${sum}  เทียบ best ${best}  · ${sum} >= ${best} → ${ok ? "True" : "False"}`,
      { i, sum, ok },
    );
    result = [...result, ok];
    snap(
      6,
      `res.append(${ok ? "True" : "False"})  · res = [${result.map((v) => (v ? "True" : "False")).join(", ")}]`,
      { i, sum, ok },
    );
  }

  snap(7, `return res  · [True, True, True, False, True]`);

  return steps;
}
