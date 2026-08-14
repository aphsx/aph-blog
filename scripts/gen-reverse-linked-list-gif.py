#!/usr/bin/env python3
"""
Reverse Linked List GIF — 7 nodes, classic inline arrows between nodes.
Arrows run through the gaps (not inside circles) so arrowheads stay visible.
"""

from __future__ import annotations

import math
from dataclasses import dataclass
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).resolve().parents[1] / "public" / "leetcode-75"
W, H = 800, 1100
STEP_MS, HOLD_MS = 850, 1700
VALUES = [1, 2, 3, 4, 5, 6, 7]

NODE_R = 28
NODE_GAP = 32
Y_NODE = 280

BG = (12, 14, 22)
PANEL = (22, 26, 38)
NODE_FILL = (36, 58, 110)
NODE_DONE = (25, 100, 95)
NODE_CURR = (50, 75, 130)
NODE_BORDER = (90, 140, 220)
CURR_RING = (255, 220, 60)
REVERSED = (0, 230, 200)
PENDING = (255, 190, 50)
WHITE = (245, 245, 250)
MUTED = (130, 138, 155)
CODE_BG = (18, 22, 32)
HL = (34, 90, 60)
HL_TEXT = (140, 255, 190)
KW = (130, 180, 255)
IDENT = (220, 220, 230)
NULL_C = (255, 120, 120)
NULL_BOX = (60, 30, 35)
PREV_C = (100, 180, 255)
CURR_C = (255, 210, 50)
NEXT_C = (90, 220, 130)
ACTIVE_LINK = (255, 255, 255)
ARROW_OUTLINE = (15, 18, 28)

FONT_B = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
FONT_R = "/System/Library/Fonts/Supplemental/Arial.ttf"
FONT_M = "/System/Library/Fonts/Supplemental/Menlo.ttc"


def F(size: int, bold: bool = False, mono: bool = False) -> ImageFont.FreeTypeFont:
    path = FONT_M if mono else (FONT_B if bold else FONT_R)
    return ImageFont.truetype(path, size)


CODE_LINES = [
    (1, "def reverse_list(head):", "def"),
    (2, "    prev = None", "code"),
    (3, "    curr = head", "code"),
    (4, "    while curr:", "code"),
    (5, "        nxt = curr.next", "code"),
    (6, "        curr.next = prev", "code"),
    (7, "        prev = curr", "code"),
    (8, "        curr = nxt", "code"),
    (9, "    return prev", "code"),
]


@dataclass
class Step:
    links: dict[int, int | None]
    prev: int | None
    curr: int | None
    nxt: int | None
    line: int
    msg: str
    hold: bool = False
    active_link: tuple[int, int | None] | None = None


def build_steps(values: list[int]) -> list[Step]:
    links = {values[i]: values[i + 1] if i + 1 < len(values) else None for i in range(len(values))}
    prev: int | None = None
    curr: int | None = values[0] if values else None
    steps: list[Step] = []
    nxt: int | None = None

    chain = " → ".join(map(str, values))
    steps.append(Step(dict(links), None, values[0], None, 1, f"Input: {chain} → null", True))
    prev = None
    steps.append(Step(dict(links), prev, curr, None, 2, "Initialize prev = null"))
    steps.append(Step(dict(links), prev, curr, None, 3, f"Initialize curr to head (Node {curr})"))

    while curr is not None:
        steps.append(Step(dict(links), prev, curr, None, 4, f"Check: curr ({curr}) != null → continue"))
        nxt = links[curr]
        nxt_label = str(nxt) if nxt is not None else "null"
        steps.append(Step(dict(links), prev, curr, nxt, 5, f"Save next: next = {nxt_label}"))
        links[curr] = prev
        target = "null" if prev is None else str(prev)
        steps.append(Step(dict(links), prev, curr, nxt, 6, f"Reverse link: curr.next = {target}", active_link=(curr, prev)))
        prev = curr
        steps.append(Step(dict(links), prev, curr, nxt, 7, f"Advance prev → Node {prev}"))
        curr = nxt
        if curr is not None:
            steps.append(Step(dict(links), prev, curr, None, 8, f"Advance curr → Node {curr}"))
        else:
            steps.append(Step(dict(links), prev, curr, None, 8, "Advance curr → null"))

    steps.append(Step(dict(links), prev, None, None, 4, "Check: curr is null → exit loop"))
    rev = " → ".join(str(v) for v in reversed(values))
    steps.append(Step(dict(links), prev, None, None, 9, f"Return prev = {prev}  →  {rev} → null", True))
    return steps


def node_positions(values: list[int]) -> dict[int, tuple[int, int]]:
    n = len(values)
    total = n * (2 * NODE_R) + (n - 1) * NODE_GAP
    x0 = (W - total) // 2 + NODE_R
    return {v: (x0 + i * (2 * NODE_R + NODE_GAP), Y_NODE) for i, v in enumerate(values)}


def is_reversed(pos: dict[int, tuple[int, int]], src: int, dst: int) -> bool:
    return pos[dst][0] < pos[src][0]


def processed_index(step: Step, values: list[int]) -> int:
    if step.prev is None:
        return -1
    return values.index(step.prev)


def left_null_node(step: Step, values: list[int]) -> int | None:
    pi = processed_index(step, values)
    for v in values:
        if step.links[v] is None and values.index(v) <= pi:
            return v
    return None


def right_null_node(step: Step, values: list[int]) -> int | None:
    if step.curr is None:
        return None
    v = step.curr
    while step.links[v] is not None:
        v = step.links[v]
    if step.links[v] is None and v != left_null_node(step, values):
        return v
    return None


def gap_endpoints(pos: dict[int, tuple[int, int]], src: int, dst: int) -> tuple[int, int, int]:
    """Return (x_start, x_end, y) — arrow runs in the gap, endpoints outside node circles."""
    x1, y = pos[src]
    x2, _ = pos[dst]
    pad = 4  # extra gap so arrowhead never touches circle edge
    if x2 > x1:  # forward →
        return x1 + NODE_R + pad, x2 - NODE_R - pad, y
    # reversed ←
    return x1 - NODE_R - pad, x2 + NODE_R + pad, y


def draw_arrow(d: ImageDraw.ImageDraw, x1: int, y: int, x2: int, color: tuple, width: int = 5, head: int = 14) -> None:
    """Arrow entirely in the inter-node gap; head sits at x2 (inside gap, never under node)."""
    d.line([(x1, y), (x2, y)], fill=ARROW_OUTLINE, width=width + 4)
    d.line([(x1, y), (x2, y)], fill=color, width=width)
    direction = 1 if x2 > x1 else -1
    tip = (x2, y)
    left = (x2 - direction * head, y - head * 0.55)
    right = (x2 - direction * head, y + head * 0.55)
    d.polygon([tip, left, right], fill=color)
    d.polygon([tip, left, right], outline=ARROW_OUTLINE)


def draw_null_arrow(d: ImageDraw.ImageDraw, y: int, node_x: int, null_x: int, side: str) -> None:
    fn = F(13, True)
    label = "null"
    bw = fn.getlength(label) + 18
    if side == "left":
        bx = null_x
        ax1 = node_x - NODE_R - 4
        ax2 = bx + bw + 4
    else:
        bx = null_x
        ax1 = node_x + NODE_R + 4
        ax2 = bx
    d.rounded_rectangle([bx, y - 14, bx + bw, y + 14], radius=7, fill=NULL_BOX, outline=NULL_C, width=2)
    d.text((bx + 9, y - 9), label, fill=NULL_C, font=fn)
    draw_arrow(d, ax1, y, ax2, NULL_C, width=4, head=12)


def draw_header(d: ImageDraw.ImageDraw) -> None:
    ft = F(24, True)
    title = "REVERSE LINKED LIST"
    d.text((W // 2 - ft.getlength(title) // 2, 30), title, fill=WHITE, font=ft)
    fb = F(12, True)
    pills = [("TIME  O(n)", (60, 130, 240)), ("SPACE  O(1)", (240, 90, 150))]
    tw = sum(fb.getlength(t) + 32 for t, _ in pills) + 14
    x = (W - tw) // 2
    for text, col in pills:
        pw = fb.getlength(text) + 32
        d.rounded_rectangle([x, 68, x + pw, 94], radius=12, fill=col)
        d.text((x + 16, 73), text, fill=WHITE, font=fb)
        x += pw + 14


def draw_diagram(d: ImageDraw.ImageDraw, step: Step, values: list[int]) -> None:
    pos = node_positions(values)
    y = Y_NODE

    # 1) nodes first (background)
    pi = processed_index(step, values)
    for v in values:
        x, cy = pos[v]
        if v == step.curr:
            d.ellipse([x - NODE_R - 6, cy - NODE_R - 6, x + NODE_R + 6, cy + NODE_R + 6], outline=CURR_RING, width=4)
        if values.index(v) <= pi:
            fill = NODE_DONE
        elif v == step.curr:
            fill = NODE_CURR
        else:
            fill = NODE_FILL
        d.ellipse([x - NODE_R, cy - NODE_R, x + NODE_R, cy + NODE_R], fill=fill, outline=NODE_BORDER, width=3)
        fn = F(18, True)
        t = str(v)
        d.text((x - fn.getlength(t) // 2, cy - 11), t, fill=WHITE, font=fn)

    # 2) arrows on top — only in gaps between nodes, never under circles
    for v in values:
        dst = step.links[v]
        if dst is None:
            continue
        x1, x2, ay = gap_endpoints(pos, v, dst)
        rev = is_reversed(pos, v, dst)
        color = ACTIVE_LINK if step.active_link == (v, dst) else (REVERSED if rev else PENDING)
        w = 7 if step.active_link == (v, dst) else 5
        draw_arrow(d, x1, ay, x2, color, w, 16)

    ln = left_null_node(step, values)
    if ln is not None:
        draw_null_arrow(d, y, pos[ln][0], pos[ln][0] - NODE_R - 70, "left")

    rn = right_null_node(step, values)
    if rn is not None:
        draw_null_arrow(d, y, pos[rn][0], pos[rn][0] + NODE_R + 18, "right")

    # 3) pointer labels above nodes
    fl = F(12, True)
    label_y = y - NODE_R - 50
    for name, val, color, offset in [
        ("prev", step.prev, PREV_C, -22),
        ("curr", step.curr, CURR_C, 0),
        ("next", step.nxt, NEXT_C, 22),
    ]:
        if val is None or val not in pos:
            continue
        x, _ = pos[val]
        ly = label_y + offset
        lw = fl.getlength(name) + 16
        lx = x - lw // 2
        d.rounded_rectangle([lx, ly, lx + lw, ly + 22], radius=7, fill=color, outline=WHITE, width=1)
        d.text((lx + 8, ly + 3), name, fill=BG if sum(color) > 400 else WHITE, font=fl)
        d.line([(x, ly + 22), (x, y - NODE_R - 4)], fill=color, width=2)

    # status
    fm = F(14, True)
    msg = step.msg
    mw = fm.getlength(msg)
    sy = y + NODE_R + 40
    d.rounded_rectangle([(W - mw) // 2 - 14, sy, (W + mw) // 2 + 14, sy + 32], radius=8, fill=(20, 50, 40), outline=HL_TEXT, width=1)
    d.text(((W - mw) // 2, sy + 6), msg, fill=HL_TEXT, font=fm)


def draw_code(d: ImageDraw.ImageDraw, active_line: int) -> None:
    panel_y = 480
    d.rounded_rectangle([24, panel_y, W - 24, H - 24], radius=12, fill=CODE_BG, outline=(40, 48, 70), width=1)
    x0, y0 = 44, panel_y + 22
    lh = 28
    fm = F(16, mono=True)
    colored = {
        2: [("    prev", IDENT), (" = ", WHITE), ("None", KW)],
        3: [("    curr", IDENT), (" = ", WHITE), ("head", IDENT)],
        4: [("    while ", KW), ("curr", IDENT), (":", WHITE)],
        5: [("        nxt", IDENT), (" = ", WHITE), ("curr.next", IDENT)],
        6: [("        curr.next", IDENT), (" = ", WHITE), ("prev", IDENT)],
        7: [("        prev", IDENT), (" = ", WHITE), ("curr", IDENT)],
        8: [("        curr", IDENT), (" = ", WHITE), ("nxt", IDENT)],
        9: [("    return ", KW), ("prev", IDENT)],
    }
    for lineno, text, kind in CODE_LINES:
        ly = y0 + (lineno - 1) * lh
        if lineno == active_line:
            d.rectangle([32, ly - 3, W - 40, ly + lh - 5], fill=HL)
        d.text((x0, ly), str(lineno).rjust(2), fill=MUTED, font=fm)
        cx = x0 + 32
        if kind == "def":
            d.text((cx, ly), "def", fill=KW, font=fm)
            d.text((cx + fm.getlength("def"), ly), " reverse_list(head):", fill=IDENT, font=fm)
        else:
            for seg, col in colored.get(lineno, [(text, IDENT)]):
                d.text((cx, ly), seg, fill=col, font=fm)
                cx += fm.getlength(seg)


def render(step: Step, values: list[int]) -> Image.Image:
    im = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(im)
    draw_header(d)
    d.rounded_rectangle([24, 118, W - 24, 460], radius=12, fill=PANEL, outline=(35, 42, 60), width=1)
    draw_diagram(d, step, values)
    draw_code(d, step.line)
    return im


def save(frames: list[tuple[Image.Image, int]], name: str) -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    imgs = [im for im, _ in frames]
    durs = [d for _, d in frames]
    path = OUT / name
    imgs[0].save(path, save_all=True, append_images=imgs[1:], duration=durs, loop=0, optimize=False, disposal=2)
    print(f"  → {path} ({len(imgs)} frames)")


def main() -> None:
    steps = build_steps(VALUES)
    frames = [(render(s, VALUES), HOLD_MS if s.hold else STEP_MS) for s in steps]
    save(frames, "linked-list-reverse.gif")
    print("Done.")


if __name__ == "__main__":
    main()
