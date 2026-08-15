/** Interactive walkthrough for LC1071 Greatest Common Divisor of Strings. */

export type GcdStringsStep = {
  line: number;
  msg: string;
  str1: string;
  str2: string;
  /** gcd of lengths; null until computed */
  g: number | null;
  /** candidate block str1[:g] */
  cand: string | null;
  /** which string is being checked by divides */
  check: "str1" | "str2" | null;
  /** result of the current divides check */
  dividesOk: boolean | null;
  /** final answer once known */
  result: string | null;
};

export const GCD_STRINGS_CODE = [
  'str1 = "ABABAB"',
  'str2 = "ABAB"',
  "g = math.gcd(len(str1), len(str2))",
  "cand = str1[:g]",
  "def divides(block, s):",
  "    return block * (len(s) // len(block)) == s",
  "if divides(cand, str1) and divides(cand, str2):",
  "    return cand",
  'return ""',
];

export function buildGcdStringsSteps(): GcdStringsStep[] {
  const str1 = "ABABAB";
  const str2 = "ABAB";
  const steps: GcdStringsStep[] = [];
  let g: number | null = null;
  let cand: string | null = null;
  let result: string | null = null;

  const snap = (
    line: number,
    msg: string,
    extra: Partial<Pick<GcdStringsStep, "check" | "dividesOk">> = {},
  ) => {
    steps.push({
      line,
      msg,
      str1,
      str2,
      g,
      cand,
      check: extra.check ?? null,
      dividesOk: extra.dividesOk ?? null,
      result,
    });
  };

  snap(1, 'Example 2 · str1 = "ABABAB"  (ยาว 6)');
  snap(2, 'str2 = "ABAB"  (ยาว 4)  · หาบล็อกยาวสุดที่ต่อเป็นทั้งคู่ได้');

  g = 2;
  snap(3, "g = math.gcd(6, 4) = 2  · ความยาวบล็อกที่เป็นไปได้มีค่าเดียว");

  cand = "AB";
  snap(4, 'cand = str1[:2] = "AB"  · ตัดหัว str1 ตามความยาว g');

  snap(5, "นิยาม divides(block, s)  · ต่อบล็อกซ้ำแล้วต้องได้ s เป๊ะ");
  snap(
    6,
    'block * (len(s) // len(block)) == s  · เช่น "AB" * 3 ต้องได้ "ABABAB"',
  );

  snap(7, 'เช็ค divides("AB", str1)  · "AB" * (6 // 2) = "AB" * 3', {
    check: "str1",
  });
  snap(7, '"ABABAB" == "ABABAB"  → True  · หาร str1 ได้', {
    check: "str1",
    dividesOk: true,
  });

  snap(7, 'เช็ค divides("AB", str2)  · "AB" * (4 // 2) = "AB" * 2', {
    check: "str2",
  });
  snap(7, '"ABAB" == "ABAB"  → True  · หาร str2 ได้ด้วย', {
    check: "str2",
    dividesOk: true,
  });

  result = "AB";
  snap(8, 'ทั้งคู่ผ่าน  · return cand = "AB"', { dividesOk: true });

  return steps;
}
