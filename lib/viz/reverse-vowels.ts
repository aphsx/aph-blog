/** Interactive walkthrough for LC345 Reverse Vowels of a String. */

export type ReverseVowelsStep = {
  line: number;
  msg: string;
  chars: string[];
  i: number;
  j: number;
  /** Which side is being skipped, or both when swapping. */
  action: "skip-i" | "skip-j" | "swap" | null;
  done: boolean;
};

export const REVERSE_VOWELS_CODE = [
  's = "IceCreAm"',
  'VOWELS = set("aeiouAEIOU")',
  "ch = list(s)",
  "i, j = 0, len(ch) - 1",
  "while i < j:",
  "    if ch[i] not in VOWELS:",
  "        i += 1",
  "    elif ch[j] not in VOWELS:",
  "        j -= 1",
  "    else:",
  "        ch[i], ch[j] = ch[j], ch[i]",
  "        i += 1",
  "        j -= 1",
  'return "".join(ch)',
];

const VOWELS = new Set("aeiouAEIOU");

export function buildReverseVowelsSteps(): ReverseVowelsStep[] {
  const s = "IceCreAm";
  const steps: ReverseVowelsStep[] = [];
  const ch = s.split("");
  let i = 0;
  let j = ch.length - 1;
  let action: ReverseVowelsStep["action"] = null;
  let done = false;

  const snap = (line: number, msg: string) => {
    steps.push({
      line,
      msg,
      chars: [...ch],
      i,
      j,
      action,
      done,
    });
  };

  snap(1, 'Example 1 · s = "IceCreAm"');
  snap(2, 'VOWELS = set("aeiouAEIOU")  · รวมพิมพ์ใหญ่ด้วย');
  snap(3, "ch = list(s)  · สตริงแก้ตำแหน่งไม่ได้ ต้องเป็นลิสต์ก่อน");
  snap(4, "i = 0  j = 7  · เลขช่องหัวแถวกับท้ายแถว");

  // j at 'm' — skip
  action = "skip-j";
  snap(5, "i < j  · 0 < 7 เข้าลูป");
  snap(6, "ch[0] = 'I' อยู่ใน VOWELS  · ไม่ขยับ i");
  snap(8, "ch[7] = 'm' ไม่ใช่สระ  · ขยับ j เข้ามา");
  j = 6;
  snap(9, "j -= 1  · j = 6 ชี้ 'A'");

  // swap I and A
  action = "swap";
  snap(5, "i < j  · 0 < 6 เข้าลูป");
  snap(6, "ch[0] = 'I' เป็นสระ");
  snap(8, "ch[6] = 'A' เป็นสระ");
  snap(10, "ทั้งสองฝั่งเป็นสระ  · สลับ");
  [ch[i], ch[j]] = [ch[j], ch[i]];
  snap(11, "สลับ 'I' ↔ 'A'  · ch = ['A','c','e','C','r','e','I','m']");
  i = 1;
  j = 5;
  snap(12, "i += 1  · i = 1");
  snap(13, "j -= 1  · j = 5");

  // skip 'c' at i
  action = "skip-i";
  snap(5, "i < j  · 1 < 5 เข้าลูป");
  snap(6, "ch[1] = 'c' ไม่ใช่สระ  · ขยับ i เข้ามา");
  i = 2;
  snap(7, "i += 1  · i = 2 ชี้ 'e'");

  // swap e and e
  action = "swap";
  snap(5, "i < j  · 2 < 5 เข้าลูป");
  snap(6, "ch[2] = 'e' เป็นสระ");
  snap(8, "ch[5] = 'e' เป็นสระ");
  snap(10, "ทั้งสองฝั่งเป็นสระ  · สลับ (ค่าเท่ากันก็ได้)");
  [ch[i], ch[j]] = [ch[j], ch[i]];
  snap(11, "สลับ 'e' ↔ 'e'  · ผลเหมือนเดิม");
  i = 3;
  j = 4;
  snap(12, "i += 1  · i = 3");
  snap(13, "j -= 1  · j = 4");

  // skip 'C', then i meets/passes j
  action = "skip-i";
  snap(5, "i < j  · 3 < 4 เข้าลูป");
  snap(6, "ch[3] = 'C' ไม่ใช่สระ  · ขยับ i");
  i = 4;
  snap(7, "i += 1  · i = 4");

  action = null;
  snap(5, "i < j  · 4 < 4 เป็นเท็จ  · ลูปหยุด");
  done = true;
  snap(14, '"".join(ch) = "AceCreIm"  · จบ');

  return steps;
}

export function isVowel(ch: string): boolean {
  return VOWELS.has(ch);
}
