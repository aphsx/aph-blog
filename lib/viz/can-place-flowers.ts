/** Interactive walkthrough for LC605 Can Place Flowers. */

export type CanPlaceFlowersStep = {
  line: number;
  msg: string;
  bed: number[];
  i: number;
  count: number;
  n: number;
  /** Highlight the plot under consideration / just planted. */
  focus: number | null;
  planted: boolean;
  done: boolean;
};

export const CAN_PLACE_FLOWERS_CODE = [
  "flowerbed = [1, 0, 0, 0, 1]",
  "n = 1",
  "count = 0",
  "for i in range(len(flowerbed)):",
  "    if flowerbed[i] != 0:",
  "        continue",
  "    left = (i == 0) or (flowerbed[i - 1] == 0)",
  "    right = (i == len(flowerbed) - 1) or (flowerbed[i + 1] == 0)",
  "    if left and right:",
  "        flowerbed[i] = 1",
  "        count += 1",
  "        if count >= n:",
  "            return True",
  "return count >= n",
];

export function buildCanPlaceFlowersSteps(): CanPlaceFlowersStep[] {
  const n = 1;
  const steps: CanPlaceFlowersStep[] = [];
  let bed = [1, 0, 0, 0, 1];
  let i = 0;
  let count = 0;
  let focus: number | null = null;
  let planted = false;
  let done = false;

  const snap = (line: number, msg: string) => {
    steps.push({
      line,
      msg,
      bed: [...bed],
      i,
      count,
      n,
      focus,
      planted,
      done,
    });
  };

  snap(1, "Example 1 · flowerbed = [1, 0, 0, 0, 1]");
  snap(2, "n = 1  · ขอปลูกเพิ่มได้แค่ 1 ต้นไหม");
  snap(3, "count = 0  · ยังไม่ได้ปลูก");

  // i = 0
  i = 0;
  focus = 0;
  planted = false;
  snap(4, "i = 0  · ช่องแรกมีดอกอยู่แล้ว (1)");
  snap(5, "flowerbed[0] != 0  · มีดอกอยู่ ข้าม");
  snap(6, "continue  · ไปช่องถัดไป");

  // i = 1
  i = 1;
  focus = 1;
  snap(4, "i = 1  · ช่องว่าง แต่ซ้าย (ช่อง 0) มีดอก");
  snap(5, "flowerbed[1] == 0  · ว่าง ลองเช็คเพื่อนบ้าน");
  snap(7, "left = False  · bed[0] = 1 จึงปลูกไม่ได้");
  snap(8, "right = True  · bed[2] = 0 แต่ซ้ายไม่ผ่านแล้ว");

  // i = 2
  i = 2;
  focus = 2;
  snap(4, "i = 2  · ว่าง และเพื่อนบ้านทั้งสองข้างว่าง");
  snap(5, "flowerbed[2] == 0  · ว่าง");
  snap(7, "left = True  · bed[1] = 0");
  snap(8, "right = True  · bed[3] = 0");
  snap(9, "left and right  · ปลูกได้");
  bed[2] = 1;
  planted = true;
  snap(10, "flowerbed[2] = 1  · ปลูกจริง เพื่อบล็อกเพื่อนบ้าน");
  count = 1;
  snap(11, "count += 1  · count = 1");
  snap(12, "count >= n  · 1 >= 1 เป็นจริง");
  done = true;
  snap(13, "return True  · ครบ n แล้ว ออกทันที ไม่ต้องกวาดต่อ");

  return steps;
}
