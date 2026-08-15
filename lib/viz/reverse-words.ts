/** Interactive walkthrough for LC151 Reverse Words in a String. */

export type ReverseWordsStep = {
  line: number;
  msg: string;
  s: string;
  words: string[];
  rev: string[];
  result: string;
  phase: "dirty" | "split" | "reverse" | "join" | null;
};

export const REVERSE_WORDS_CODE = [
  's = "a good   example"',
  "words = s.split()",
  "rev = list(reversed(words))",
  'return " ".join(rev)',
];

export function buildReverseWordsSteps(): ReverseWordsStep[] {
  const s = "a good   example";
  const steps: ReverseWordsStep[] = [];
  let words: string[] = [];
  let rev: string[] = [];
  let result = "";

  const snap = (
    line: number,
    msg: string,
    phase: ReverseWordsStep["phase"] = null,
  ) => {
    steps.push({
      line,
      msg,
      s,
      words: [...words],
      rev: [...rev],
      result,
      phase,
    });
  };

  snap(1, 'Example 3 · s = "a good   example"  · ช่องว่างซ้อนกลางประโยค', "dirty");
  snap(1, "สตริงสกปรก: ช่องว่างสามช่องระหว่าง good กับ example", "dirty");

  words = ["a", "good", "example"];
  snap(
    2,
    "words = s.split()  · ไม่ใส่ arg → ยุบช่องว่างซ้ำ + ตัดหัวท้าย → ['a', 'good', 'example']",
    "split",
  );

  rev = ["example", "good", "a"];
  snap(3, "rev = list(reversed(words))  · กลับลำดับคำ → ['example', 'good', 'a']", "reverse");

  result = "example good a";
  snap(4, 'return " ".join(rev)  · คั่นด้วยช่องว่างหนึ่งช่อง → "example good a"', "join");
  snap(4, 'ผลลัพธ์ = "example good a"  · จบ', "join");

  return steps;
}
