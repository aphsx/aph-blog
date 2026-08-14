/** Interactive Array / String walkthroughs for the intro workshop. */

export type AliasStep = {
  line: number;
  msg: string;
  list: number[];
  aOn: boolean;
  bOn: boolean;
  s: string | null;
  t: string | null;
  /** t still names the same object as s. */
  stSame: boolean;
  listFocus: boolean;
  newCell: boolean;
  newStr: boolean;
};

export type InsertStep = {
  line: number;
  msg: string;
  cells: (number | null)[];
  /** Index being copied from (shift). */
  from: number | null;
  to: number | null;
  writing: number | null;
  shifts: number;
  mode: "insert" | "append";
};

export type ConcatStep = {
  line: number;
  msg: string;
  s: string;
  /** Characters copied in this step. */
  copiedNow: number;
  copiedTotal: number;
  phase: "concat" | "join";
  adding: string | null;
};

export const ALIAS_CODE = [
  "a = [1, 2, 3]",
  "b = a",
  "b.append(4)",
  "# a is b  →  True",
  "",
  's = "hello"',
  "t = s",
  't = t + " world"',
  "# s is t  →  False",
];

export const INSERT_CODE = [
  "nums = [10, 20, 30]",
  "nums.insert(0, 99)",
  "",
  "nums = [10, 20, 30]",
  "nums.append(99)",
];

export const CONCAT_CODE = [
  's = ""',
  "for c in \"abcd\":",
  "    s = s + c",
  "",
  '"".join(["a", "b", "c", "d"])',
];

export function buildAliasSteps(): AliasStep[] {
  const steps: AliasStep[] = [];
  let list: number[] = [];
  let aOn = false;
  let bOn = false;
  let s: string | null = null;
  let t: string | null = null;
  let stSame = false;
  let listFocus = true;
  let newCell = false;
  let newStr = false;

  const snap = (line: number, msg: string) => {
    steps.push({
      line,
      msg,
      list: [...list],
      aOn,
      bOn,
      s,
      t,
      stSame,
      listFocus,
      newCell,
      newStr,
    });
  };

  snap(1, "list กับ string คนละชนิด  · เริ่มจากตู้ล็อกเกอร์ (list) ก่อน");

  list = [1, 2, 3];
  aOn = true;
  snap(1, "a = [1, 2, 3]  · ชื่อ a ชี้ก้อนนี้ก้อนเดียว");

  bOn = true;
  snap(2, "b = a  · ไม่ได้สร้างแถวใหม่ แค่ตั้งชื่อเล่นให้ก้อนเดิม");

  list = [1, 2, 3, 4];
  newCell = true;
  snap(3, "b.append(4)  · เติมช่องในแถวเดิม ทั้ง a และ b เห็นของชิ้นนี้");

  newCell = false;
  snap(4, "a is b → True  · สองชื่อ หนึ่งก้อน ใครแก้ อีกชื่อก็เห็น");

  listFocus = false;
  snap(6, 'ต่อไปฝั่งป้ายสลัก (string)');

  s = "hello";
  t = null;
  stSame = false;
  snap(6, 's = "hello"  · ชื่อ s ชี้ป้ายนี้');

  t = "hello";
  stSame = true;
  snap(7, "t = s  · ตอนนี้ยังก้อนเดียวกัน เหมือน b = a เมื่อกี้");

  t = "hello world";
  stSame = false;
  newStr = true;
  snap(8, 't = t + " world"  · ไม่ได้แก้ป้ายเดิม สลักป้ายใหม่ทั้งป้าย แล้วย้ายชื่อ t ไปชี้');

  newStr = false;
  snap(9, 's is t → False  · s ยังเป็น "hello" ป้ายเก่ายังอยู่ แค่ไม่มีชื่อ t แล้ว');

  return steps;
}

export function buildInsertSteps(): InsertStep[] {
  const steps: InsertStep[] = [];
  let cells: (number | null)[] = [];
  let from: number | null = null;
  let to: number | null = null;
  let writing: number | null = null;
  let shifts = 0;
  let mode: InsertStep["mode"] = "insert";

  const snap = (line: number, msg: string) => {
    steps.push({
      line,
      msg,
      cells: [...cells],
      from,
      to,
      writing,
      shifts,
      mode,
    });
  };

  cells = [10, 20, 30];
  snap(1, "nums = [10, 20, 30]  · ตู้ต้องเรียงติดกัน เลขช่องห้ามข้าม");

  from = null;
  to = null;
  snap(2, "insert(0, 99)  · จะยัดของที่หัวแถว ทุกตัวต้องถอยไปขวาหนึ่งช่องก่อน");

  cells = [10, 20, 30, null];
  snap(2, "ขยายแถวเป็น 4 ช่อง  · ช่องท้ายว่าง รอรับของที่ถูกขยับมา");

  cells = [10, 20, 30, 30];
  from = 2;
  to = 3;
  shifts = 1;
  snap(2, "ขยับ nums[2] → nums[3]  · 30 ถอยไปช่องถัดไป");

  cells = [10, 20, 20, 30];
  from = 1;
  to = 2;
  shifts = 2;
  snap(2, "ขยับ nums[1] → nums[2]  · 20 ถอยตาม");

  cells = [10, 10, 20, 30];
  from = 0;
  to = 1;
  shifts = 3;
  snap(2, "ขยับ nums[0] → nums[1]  · 10 ถอยตาม หัวแถวว่างแล้ว");

  cells = [99, 10, 20, 30];
  from = null;
  to = null;
  writing = 0;
  snap(2, "วาง 99 ที่ช่อง 0  · ขยับ 3 ตัว เพื่อแทรก 1 ตัว นี่คือ O(n)");

  writing = null;
  shifts = 0;
  mode = "append";
  cells = [10, 20, 30];
  snap(4, "รีเซ็ต [10, 20, 30]  · คราวนี้ต่อท้ายด้วย append");

  cells = [10, 20, 30, 99];
  writing = 3;
  snap(5, "append(99)  · วางท้ายแถวได้เลย ไม่รบกวนใคร ขยับ 0 ตัว");

  writing = null;
  snap(5, "ขยับ 0 ตัว  · O(1) เฉลี่ย  — อย่าเขียน insert(0, x) ในลูป");

  return steps;
}

export function buildConcatSteps(): ConcatStep[] {
  const chars = ["a", "b", "c", "d"];
  const steps: ConcatStep[] = [];
  let s = "";
  let copiedTotal = 0;

  const snap = (
    line: number,
    msg: string,
    extra: Partial<Pick<ConcatStep, "copiedNow" | "phase" | "adding">> = {},
  ) => {
    steps.push({
      line,
      msg,
      s,
      copiedNow: extra.copiedNow ?? 0,
      copiedTotal,
      phase: extra.phase ?? "concat",
      adding: extra.adding ?? null,
    });
  };

  snap(1, 's = ""  · ป้ายว่าง ยังไม่คัดลอกอะไร');

  for (const c of chars) {
    snap(2, `for c = '${c}'  · จะต่อเข้าป้าย ต้องสลักป้ายใหม่ทั้งป้าย`, { adding: c });
    const copiedNow = s.length + 1;
    s = s + c;
    copiedTotal += copiedNow;
    snap(3, `s = s + '${c}'  →  "${s}"  · คัดลอกรอบนี้ ${copiedNow} ตัว  รวม ${copiedTotal}`, {
      copiedNow,
      adding: c,
    });
  }

  snap(
    3,
    `จบลูป  คัดลอกรวม ${copiedTotal} ครั้ง  · ความยาวแค่ ${chars.length} แต่คัดลอกไปแล้ว ${copiedTotal}`,
  );

  s = "abcd";
  copiedTotal = 4;
  snap(5, '"".join(...) เห็นชิ้นส่วนทั้งหมดตั้งแต่แรก  · สลักป้ายเดียว คัดลอกแต่ละตัวครั้งเดียว = 4', {
    phase: "join",
    copiedNow: 4,
  });

  snap(5, "concat ทีละครั้ง = 10  · join = 4  · n ใหญ่ขึ้นช่องว่างนี้ถ่างแบบไม่มีเพดาน", {
    phase: "join",
    copiedNow: 4,
  });

  return steps;
}
