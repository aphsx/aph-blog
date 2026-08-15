/** Interactive walkthrough for LC1768 Merge Strings Alternately. */

export type MergeAltStep = {
  line: number;
  msg: string;
  w1: string;
  w2: string;
  i: number;
  j: number;
  merged: string;
  pick: "w1" | "w2" | "tail" | null;
};

export const MERGE_ALT_CODE = [
  'word1 = "ab"',
  'word2 = "pqrs"',
  "res = []",
  "i = j = 0",
  "while i < len(word1) and j < len(word2):",
  "    res.append(word1[i])",
  "    i += 1",
  "    res.append(word2[j])",
  "    j += 1",
  'return "".join(res) + word1[i:] + word2[j:]',
];

export function buildMergeAltSteps(): MergeAltStep[] {
  const w1 = "ab";
  const w2 = "pqrs";
  const steps: MergeAltStep[] = [];
  let i = 0;
  let j = 0;
  let merged = "";

  const snap = (
    line: number,
    msg: string,
    pick: MergeAltStep["pick"] = null,
  ) => {
    steps.push({ line, msg, w1, w2, i, j, merged, pick });
  };

  snap(1, 'Example 2 · word1 = "ab"');
  snap(2, 'word2 = "pqrs"  · หยิบสลับ เริ่มจาก word1');
  snap(3, "res = []  · กล่องเก็บตัวอักษรทีละชิ้น ยังว่าง");
  snap(4, "i = 0  j = 0  · เลขช่องของแต่ละฝั่ง เริ่มที่หัวแถว");

  snap(5, "i < 2 and j < 4  · ทั้งคู่ยังมีตัว เข้าลูป");
  merged += "a";
  snap(6, "หยิบ word1[0] = a  · res = ['a']", "w1");
  i = 1;
  snap(7, "i += 1  · i = 1");
  merged += "p";
  snap(8, "หยิบ word2[0] = p  · res = ['a', 'p']", "w2");
  j = 1;
  snap(9, "j += 1  · j = 1");

  snap(5, "i < 2 and j < 4  · ยังมีทั้งคู่ เข้าลูปอีก");
  merged += "b";
  snap(6, "หยิบ word1[1] = b  · res = ['a', 'p', 'b']", "w1");
  i = 2;
  snap(7, "i += 1  · i = 2  word1 หมดแล้ว");
  merged += "q";
  snap(8, "หยิบ word2[1] = q  · res = ['a', 'p', 'b', 'q']", "w2");
  j = 2;
  snap(9, "j += 1  · j = 2");

  snap(5, "i < 2 → 2 < 2 เป็นเท็จ  · and ทำให้ลูปหยุด แม้ word2 ยังเหลือ");
  snap(
    10,
    'word1[2:] = ""   word2[2:] = "rs"  · ฝั่งที่หมดได้สตริงว่าง ต่อท้ายได้เลย',
    "tail",
  );
  merged += "rs";
  snap(10, 'merged = "apbqrs"  · จบ', "tail");

  return steps;
}
