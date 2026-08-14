#!/usr/bin/env python3
"""
Generate step-by-step educational GIFs for LeetCode 75 intro pages.

Shared visual language (same as tree BFS/DFS):
  PENDING  gold   #F7B700
  CURRENT  orange #D55D00
  DONE     teal   #03A69B
  BG black, 480×360, structure chip + title + result
"""

from __future__ import annotations

from collections import deque
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).resolve().parents[1] / "public" / "leetcode-75"
W, H = 480, 360
STEP_MS, HOLD_MS = 700, 1600

BG = (0, 0, 0)
EDGE = (200, 200, 200)
PENDING = (247, 183, 0)
CURRENT = (213, 93, 0)
DONE = (3, 166, 155)
WHITE = (240, 240, 240)
MUTED = (140, 140, 140)
DARK = (20, 20, 20)

ACCENT = {
    "amber": (245, 158, 11),
    "blue": (74, 158, 255),
    "green": (74, 222, 128),
    "violet": (167, 139, 250),
    "cyan": (34, 211, 238),
    "rose": (251, 113, 133),
}

FONT_B = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
FONT_R = "/System/Library/Fonts/Supplemental/Arial.ttf"


def F(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(FONT_B if bold else FONT_R, size)


def save(frames: list[tuple[Image.Image, int]], name: str) -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    imgs = [im for im, _ in frames]
    durs = [d for _, d in frames]
    path = OUT / name
    imgs[0].save(
        path,
        save_all=True,
        append_images=imgs[1:],
        duration=durs,
        loop=0,
        optimize=False,
        disposal=2,
    )
    print(f"  {name} ({len(imgs)} frames)")


def footer(
    draw: ImageDraw.ImageDraw,
    title: str,
    subtitle: str,
    chip: str,
    accent: tuple[int, int, int],
    result: str,
) -> None:
    fb, fr = F(11, True), F(11)
    ft, fres = F(15, True), F(13, True)
    tw = fb.getlength(chip)
    x0, y0 = 14, H - 78
    draw.rounded_rectangle([x0, y0, x0 + tw + 18, y0 + 22], radius=11, fill=accent)
    draw.text((x0 + 9, y0 + 3), chip, fill=DARK, font=fb)
    draw.text((14, H - 48), title, fill=WHITE, font=ft)
    draw.text((14, H - 26), subtitle, fill=MUTED, font=fr)
    rw = fres.getlength(result)
    draw.text((W - 14 - rw, H - 28), result, fill=WHITE, font=fres)


def blank(title: str, subtitle: str, chip: str, accent, result: str = "[ ]") -> Image.Image:
    im = Image.new("RGB", (W, H), BG)
    footer(ImageDraw.Draw(im), title, subtitle, chip, accent, result)
    return im


# ── helpers: array of boxes ───────────────────────────────────────────

def draw_array(
    draw: ImageDraw.ImageDraw,
    values: list,
    y: int,
    states: list[str],
    labels: dict[int, str] | None = None,
    x0: int | None = None,
    box: int = 40,
    gap: int = 8,
) -> list[tuple[int, int, int, int]]:
    """states: pending|current|done|dim per index. Returns box rects."""
    n = len(values)
    total = n * box + (n - 1) * gap
    left = x0 if x0 is not None else (W - total) // 2
    rects = []
    fn = F(14, True)
    fl = F(10, True)
    for i, v in enumerate(values):
        x = left + i * (box + gap)
        st = states[i] if i < len(states) else "pending"
        fill = {
            "pending": PENDING,
            "current": CURRENT,
            "done": DONE,
            "dim": (60, 60, 60),
            "window": (74, 158, 255),
            "in": ACCENT["green"],
            "out": ACCENT["rose"],
        }.get(st, PENDING)
        draw.rounded_rectangle([x, y, x + box, y + box], radius=6, fill=fill, outline=WHITE, width=1)
        t = str(v)
        tw = fn.getlength(t)
        draw.text((x + (box - tw) / 2, y + (box - 16) / 2), t, fill=DARK if st != "dim" else MUTED, font=fn)
        if labels and i in labels:
            lb = labels[i]
            lw = fl.getlength(lb)
            draw.text((x + (box - lw) / 2, y + box + 4), lb, fill=WHITE, font=fl)
        rects.append((x, y, x + box, y + box))
    return rects


# ══════════════════════════════════════════════════════════════════════
# 1. Two Pointers — opposite ends
# ══════════════════════════════════════════════════════════════════════

def gif_two_pointers() -> None:
    title, sub = "Two Pointers · Opposite Ends", "move the side that fixes the sum"
    accent = ACCENT["amber"]
    nums = [1, 3, 4, 6, 8, 11]
    target = 14
    frames: list[tuple[Image.Image, int]] = []

    def frame(L: int, R: int, note: str, result: str, highlight_pair: bool = False) -> Image.Image:
        im = Image.new("RGB", (W, H), BG)
        d = ImageDraw.Draw(im)
        states = ["dim"] * len(nums)
        for i in range(L, R + 1):
            states[i] = "pending"
        states[L] = states[R] = "current"
        if highlight_pair:
            states[L] = states[R] = "done"
        labels = {L: "L", R: "R"} if L != R else {L: "L=R"}
        draw_array(d, nums, 110, states, labels)
        d.text((14, 40), f"target = {target}", fill=MUTED, font=F(12))
        d.text((14, 62), note, fill=WHITE, font=F(13, True))
        footer(d, title, sub, f"POINTERS  L={L}  R={R}", accent, result)
        return im

    frames.append((blank(title, sub, "POINTERS  L=?  R=?", accent), HOLD_MS // 2))
    L, R = 0, 5
    # 1+11=12 < 14 → move L
    frames.append((frame(L, R, "1 + 11 = 12  < 14  →  L++", "[ ]"), STEP_MS))
    L = 1
    frames.append((frame(L, R, "3 + 11 = 14  == target  ✓", "pair = [3, 11]", True), HOLD_MS))
    # show a miss path briefly? keep short — found
    frames.append((frame(L, R, "found · stop", "pair = [3, 11]", True), HOLD_MS))
    save(frames, "two-pointers.gif")


# ══════════════════════════════════════════════════════════════════════
# 2. Sliding Window — fixed
# ══════════════════════════════════════════════════════════════════════

def gif_sliding_fixed() -> None:
    title, sub = "Sliding Window · Fixed", "slide k cells · add in · drop out"
    accent = ACCENT["blue"]
    nums = [2, 1, 5, 1, 3, 2]
    k = 3
    frames: list[tuple[Image.Image, int]] = []

    def frame(start: int, window: int, best: int, note: str) -> Image.Image:
        im = Image.new("RGB", (W, H), BG)
        d = ImageDraw.Draw(im)
        states = ["dim"] * len(nums)
        for i in range(start, start + k):
            states[i] = "window"
        if start > 0:
            states[start - 1] = "out"
        if start + k - 1 < len(nums) and start > 0:
            states[start + k - 1] = "in"
        # first window: all window blue
        if start == 0:
            for i in range(k):
                states[i] = "window"
        draw_array(d, nums, 100, states)
        d.text((14, 40), note, fill=WHITE, font=F(13, True))
        footer(
            d,
            title,
            sub,
            f"WINDOW  [{start}:{start+k}]  sum={window}",
            accent,
            f"best = {best}",
        )
        return im

    frames.append((blank(title, sub, "WINDOW  k=3", accent, "best = ?"), HOLD_MS // 2))
    w = sum(nums[:k])
    best = w
    frames.append((frame(0, w, best, "build first window"), STEP_MS))
    for i in range(k, len(nums)):
        start = i - k + 1
        w += nums[i] - nums[i - k]
        best = max(best, w)
        frames.append(
            (
                frame(start, w, best, f"in {nums[i]} · out {nums[i-k]}"),
                STEP_MS,
            )
        )
    frames.append((frame(len(nums) - k, w, best, "done"), HOLD_MS))
    save(frames, "sliding-window-fixed.gif")


# ══════════════════════════════════════════════════════════════════════
# 3. Sliding Window — variable
# ══════════════════════════════════════════════════════════════════════

def gif_sliding_variable() -> None:
    """Longest substring without repeating — s = 'abcab'"""
    title, sub = "Sliding Window · Variable", "expand right · shrink when invalid"
    accent = ACCENT["blue"]
    s = list("abcab")
    frames: list[tuple[Image.Image, int]] = []

    def frame(L: int, R: int, seen: set, best: int, note: str) -> Image.Image:
        im = Image.new("RGB", (W, H), BG)
        d = ImageDraw.Draw(im)
        states = ["dim"] * len(s)
        for i in range(L, R + 1):
            states[i] = "window"
        if 0 <= R < len(s):
            states[R] = "current"
        draw_array(d, s, 100, states, {L: "L", R: "R"} if L <= R else None, box=44)
        chip_set = "{" + ", ".join(sorted(seen)) + "}" if seen else "{}"
        d.text((14, 40), note, fill=WHITE, font=F(12, True))
        footer(d, title, sub, f"SET  {chip_set}", accent, f"best = {best}")
        return im

    frames.append((blank(title, sub, "SET  {}", accent, "best = 0"), HOLD_MS // 2))
    L = 0
    seen: set[str] = set()
    best = 0
    for R, ch in enumerate(s):
        while ch in seen:
            seen.remove(s[L])
            L += 1
            frames.append((frame(L, R, seen, best, f"duplicate '{ch}' · shrink L"), STEP_MS // 2))
        seen.add(ch)
        best = max(best, R - L + 1)
        frames.append((frame(L, R, seen, best, f"expand R → '{ch}'"), STEP_MS))
    frames.append((frame(L, len(s) - 1, seen, best, "done"), HOLD_MS))
    save(frames, "sliding-window-variable.gif")


# ══════════════════════════════════════════════════════════════════════
# 4. Prefix Sum
# ══════════════════════════════════════════════════════════════════════

def gif_prefix_sum() -> None:
    title, sub = "Prefix Sum · Build & Query", "pay O(n) once · answer ranges in O(1)"
    accent = ACCENT["cyan"]
    nums = [3, 1, 4, 1, 5]
    frames: list[tuple[Image.Image, int]] = []

    def frame(
        prefix: list[int],
        build_i: int | None,
        query: tuple[int, int] | None,
        note: str,
        result: str,
    ) -> Image.Image:
        im = Image.new("RGB", (W, H), BG)
        d = ImageDraw.Draw(im)
        # nums row
        d.text((14, 28), "nums", fill=MUTED, font=F(11))
        n_states = ["pending"] * len(nums)
        if build_i is not None and 0 <= build_i < len(nums):
            n_states[build_i] = "current"
        if query:
            i, j = query
            for k in range(i, j + 1):
                n_states[k] = "done"
        draw_array(d, nums, 48, n_states, box=36, gap=6)
        # prefix row
        d.text((14, 120), "prefix", fill=MUTED, font=F(11))
        p_states = ["dim"] * len(prefix)
        for k in range(len(prefix)):
            if prefix[k] is not None:
                p_states[k] = "pending"
        if build_i is not None:
            p_states[build_i + 1] = "current"
        if query:
            i, j = query
            p_states[j + 1] = "done"
            p_states[i] = "done"
        show = [("·" if v is None else v) for v in prefix]
        draw_array(d, show, 140, p_states, box=36, gap=6)
        d.text((14, 200), note, fill=WHITE, font=F(12, True))
        footer(d, title, sub, "FORMULA  sum(i..j)=P[j+1]-P[i]", accent, result)
        return im

    prefix: list[int | None] = [0] + [None] * len(nums)
    frames.append((frame(prefix, None, None, "start · P[0]=0", "P = [0, ···]"), HOLD_MS // 2))
    running = 0
    for i, v in enumerate(nums):
        running += v
        prefix[i + 1] = running
        frames.append(
            (
                frame(prefix, i, None, f"P[{i+1}] = P[{i}] + {v} = {running}", f"building…"),
                STEP_MS,
            )
        )
    # query nums[1..3] = 1+4+1 = 6
    frames.append(
        (
            frame(prefix, None, (1, 3), "query sum(1..3) = P[4]-P[1] = 9-3", "sum = 6"),
            HOLD_MS,
        )
    )
    save(frames, "prefix-sum.gif")


# ══════════════════════════════════════════════════════════════════════
# 5. Stack LIFO
# ══════════════════════════════════════════════════════════════════════

def gif_stack() -> None:
    title, sub = "Stack · LIFO", "last in · first out"
    accent = ACCENT["green"]
    frames: list[tuple[Image.Image, int]] = []
    ops = [
        ("push", 10),
        ("push", 20),
        ("push", 30),
        ("pop", None),
        ("pop", None),
        ("push", 40),
    ]

    def frame(stack: list[int], note: str, result: str, current: int | None = None) -> Image.Image:
        im = Image.new("RGB", (W, H), BG)
        d = ImageDraw.Draw(im)
        # draw stack bottom-up
        box_w, box_h = 80, 36
        x = (W - box_w) // 2
        base_y = 230
        fn = F(14, True)
        for i, v in enumerate(stack):
            y = base_y - i * (box_h + 6)
            fill = CURRENT if v == current else (DONE if i == len(stack) - 1 else PENDING)
            d.rounded_rectangle([x, y, x + box_w, y + box_h], radius=6, fill=fill, outline=WHITE)
            t = str(v)
            tw = fn.getlength(t)
            d.text((x + (box_w - tw) / 2, y + 8), t, fill=DARK, font=fn)
        if stack:
            d.text((x + box_w + 12, base_y - (len(stack) - 1) * (box_h + 6) + 8), "← top", fill=WHITE, font=F(11))
        d.text((14, 40), note, fill=WHITE, font=F(13, True))
        footer(d, title, sub, f"STACK  {stack}", accent, result)
        return im

    stack: list[int] = []
    frames.append((frame(stack, "empty stack", "ops = []"), HOLD_MS // 2))
    log: list[str] = []
    for op, val in ops:
        if op == "push":
            stack.append(val)  # type: ignore
            log.append(f"push {val}")
            frames.append((frame(stack, f"push({val})", " → ".join(log), val), STEP_MS))
        else:
            out = stack.pop()
            log.append(f"pop→{out}")
            frames.append((frame(stack, f"pop() → {out}", " → ".join(log), None), STEP_MS))
    frames.append((frame(stack, "done", " → ".join(log)), HOLD_MS))
    save(frames, "stack.gif")


# ══════════════════════════════════════════════════════════════════════
# 6. Queue FIFO
# ══════════════════════════════════════════════════════════════════════

def gif_queue() -> None:
    title, sub = "Queue · FIFO", "first in · first out"
    accent = ACCENT["blue"]
    frames: list[tuple[Image.Image, int]] = []
    ops = [
        ("enq", 10),
        ("enq", 20),
        ("enq", 30),
        ("deq", None),
        ("deq", None),
        ("enq", 40),
    ]

    def frame(q: list[int], note: str, result: str, flash: int | None = None) -> Image.Image:
        im = Image.new("RGB", (W, H), BG)
        d = ImageDraw.Draw(im)
        states = []
        for i, v in enumerate(q):
            if v == flash:
                states.append("current")
            elif i == 0:
                states.append("done")
            else:
                states.append("pending")
        if q:
            draw_array(d, q, 130, states, box=48, gap=10)
            d.text((40, 100), "front →", fill=MUTED, font=F(11))
            d.text((W - 100, 100), "← rear", fill=MUTED, font=F(11))
        d.text((14, 40), note, fill=WHITE, font=F(13, True))
        footer(d, title, sub, f"QUEUE  {q}", accent, result)
        return im

    q: list[int] = []
    frames.append((frame(q, "empty queue", "ops = []"), HOLD_MS // 2))
    log: list[str] = []
    for op, val in ops:
        if op == "enq":
            q.append(val)  # type: ignore
            log.append(f"enq {val}")
            frames.append((frame(q, f"enqueue({val})", " → ".join(log), val), STEP_MS))
        else:
            out = q.pop(0)
            log.append(f"deq→{out}")
            frames.append((frame(q, f"dequeue() → {out}", " → ".join(log)), STEP_MS))
    frames.append((frame(q, "done", " → ".join(log)), HOLD_MS))
    save(frames, "queue.gif")


# ══════════════════════════════════════════════════════════════════════
# 7. Linked List reverse
# ══════════════════════════════════════════════════════════════════════

def gif_linked_list_reverse() -> None:
    title, sub = "Linked List · Reverse", "rewire next · three pointers"
    accent = ACCENT["violet"]
    vals = [1, 2, 3, 4]
    frames: list[tuple[Image.Image, int]] = []

    def frame(order: list[int], prev_i: int | None, cur_i: int | None, note: str) -> Image.Image:
        im = Image.new("RGB", (W, H), BG)
        d = ImageDraw.Draw(im)
        n = len(order)
        box, gap = 44, 36
        total = n * box + (n - 1) * gap
        left = (W - total) // 2
        y = 120
        fn = F(14, True)
        positions = []
        for i, v in enumerate(order):
            x = left + i * (box + gap)
            fill = CURRENT if i == cur_i else (DONE if i == prev_i else PENDING)
            d.rounded_rectangle([x, y, x + box, y + box], radius=8, fill=fill, outline=WHITE)
            tw = fn.getlength(str(v))
            d.text((x + (box - tw) / 2, y + 12), str(v), fill=DARK, font=fn)
            positions.append((x + box // 2, y + box // 2))
            if i < n - 1:
                x1 = x + box
                x2 = x + box + gap
                d.line([(x1, y + box // 2), (x2, y + box // 2)], fill=EDGE, width=2)
                # arrow head
                d.polygon([(x2, y + box // 2), (x2 - 8, y + box // 2 - 5), (x2 - 8, y + box // 2 + 5)], fill=EDGE)
        # null at end
        if positions:
            lx = positions[-1][0] + box // 2 + 8
            d.text((lx, y + 12), "null", fill=MUTED, font=F(11))
        labels = {}
        if prev_i is not None:
            labels["prev"] = prev_i
        if cur_i is not None:
            labels["cur"] = cur_i
        fl = F(10, True)
        for name, idx in labels.items():
            x = left + idx * (box + gap)
            lw = fl.getlength(name)
            d.text((x + (box - lw) / 2, y + box + 6), name, fill=WHITE, font=fl)
        d.text((14, 40), note, fill=WHITE, font=F(13, True))
        footer(d, title, sub, "POINTERS  prev · cur · next", accent, f"[{', '.join(map(str, order))}]")
        return im

    # Simulate reverse step by step: show logical list order after each rewire
    # Start: 1→2→3→4
    frames.append((frame(vals, None, 0, "start · cur at head"), HOLD_MS // 2))
    # After reverse progress shown as growing reversed prefix
    # Step visuals: highlight cur being rewired
    steps = [
        ([1, 2, 3, 4], None, 0, "prev=null · cur=1"),
        ([1, 2, 3, 4], 0, 1, "rewire 1.next → null · advance"),
        ([2, 3, 4, 1], 0, 1, "list so far: 1 | 2→3→4"),
        ([2, 3, 4, 1], 0, 1, "rewire 2.next → 1"),
        ([3, 4, 2, 1], 0, 1, "list so far: 2→1 | 3→4"),
        ([3, 4, 2, 1], 0, 1, "rewire 3.next → 2"),
        ([4, 3, 2, 1], 0, 1, "list so far: 3→2→1 | 4"),
        ([4, 3, 2, 1], 0, None, "rewire 4.next → 3"),
        ([4, 3, 2, 1], 0, None, "done · new head = 4"),
    ]
    # Cleaner narrative frames:
    narrative = [
        ([1, 2, 3, 4], None, 0, "start  1→2→3→4"),
        ([1, 2, 3, 4], None, 0, "detach 1 · point to null"),
        ([2, 3, 4, 1], 3, 0, "reversed: 1    rest: 2→3→4"),
        ([3, 4, 2, 1], 2, 0, "reversed: 2→1  rest: 3→4"),
        ([4, 3, 2, 1], 1, 0, "reversed: 3→2→1  rest: 4"),
        ([4, 3, 2, 1], 0, None, "reversed: 4→3→2→1  ✓"),
    ]
    for order, prev_i, cur_i, note in narrative:
        frames.append((frame(order, prev_i, cur_i, note), STEP_MS if "✓" not in note else HOLD_MS))
    save(frames, "linked-list-reverse.gif")


# ══════════════════════════════════════════════════════════════════════
# 8. Binary Search
# ══════════════════════════════════════════════════════════════════════

def gif_binary_search() -> None:
    title, sub = "Binary Search · Halve the range", "sorted · cut half each step"
    accent = ACCENT["amber"]
    nums = [1, 3, 5, 7, 9, 11]
    target = 7
    frames: list[tuple[Image.Image, int]] = []

    def frame(lo: int, hi: int, mid: int | None, note: str, result: str) -> Image.Image:
        im = Image.new("RGB", (W, H), BG)
        d = ImageDraw.Draw(im)
        states = ["dim"] * len(nums)
        for i in range(lo, hi + 1):
            states[i] = "pending"
        if mid is not None:
            states[mid] = "current"
        labels = {}
        if mid is not None:
            labels[mid] = "mid"
        labels[lo] = ("L" if lo != mid else "L=mid")
        if hi != lo:
            labels[hi] = ("R" if hi != mid else "R=mid")
        draw_array(d, nums, 110, states, labels)
        d.text((14, 40), f"target = {target}", fill=MUTED, font=F(12))
        d.text((14, 62), note, fill=WHITE, font=F(13, True))
        footer(d, title, sub, f"RANGE  lo={lo}  hi={hi}", accent, result)
        return im

    frames.append((blank(title, sub, "RANGE  lo=?  hi=?", accent), HOLD_MS // 2))
    lo, hi = 0, 5
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            frames.append((frame(lo, hi, mid, f"nums[mid]={nums[mid]} == target ✓", f"index = {mid}"), HOLD_MS))
            break
        if nums[mid] < target:
            frames.append((frame(lo, hi, mid, f"{nums[mid]} < {target} → lo = mid+1", "[ ]"), STEP_MS))
            lo = mid + 1
        else:
            frames.append((frame(lo, hi, mid, f"{nums[mid]} > {target} → hi = mid-1", "[ ]"), STEP_MS))
            hi = mid - 1
    save(frames, "binary-search.gif")


# ══════════════════════════════════════════════════════════════════════
# 10. Graph DFS
# ══════════════════════════════════════════════════════════════════════

def gif_graph_dfs() -> None:
    title, sub = "Graph DFS · Go deep", "mark visited · dive · backtrack"
    accent = ACCENT["green"]
    # 0-1
    # | |
    # 2-3-4
    edges = [(0, 1), (0, 2), (1, 3), (2, 3), (3, 4)]
    graph = {i: [] for i in range(5)}
    for a, b in edges:
        graph[a].append(b)
        graph[b].append(a)
    for k in graph:
        graph[k].sort()
    pos = {0: (120, 70), 1: (280, 70), 2: (120, 170), 3: (280, 170), 4: (400, 170)}
    frames: list[tuple[Image.Image, int]] = []

    def frame(visited: set[int], current: int | None, order: list[int], note: str) -> Image.Image:
        im = Image.new("RGB", (W, H), BG)
        d = ImageDraw.Draw(im)
        r = 18
        for a, b in edges:
            x0, y0 = pos[a]
            x1, y1 = pos[b]
            d.line([(x0, y0), (x1, y1)], fill=EDGE, width=2)
        fn = F(14, True)
        for v, (x, y) in pos.items():
            if v == current:
                fill = CURRENT
            elif v in visited:
                fill = DONE
            else:
                fill = PENDING
            d.ellipse([x - r, y - r, x + r, y + r], fill=fill, outline=WHITE)
            tw = fn.getlength(str(v))
            d.text((x - tw / 2, y - 8), str(v), fill=DARK, font=fn)
        d.text((14, 220), note, fill=WHITE, font=F(12, True))
        footer(d, title, sub, f"VISITED  {sorted(visited)}", accent, f"[{', '.join(map(str, order))}]")
        return im

    order: list[int] = []
    visited: set[int] = set()
    frames.append((frame(visited, None, order, "start at 0"), HOLD_MS // 2))

    def dfs(u: int) -> None:
        visited.add(u)
        order.append(u)
        frames.append((frame(visited, u, order, f"visit {u}"), STEP_MS))
        for v in graph[u]:
            if v not in visited:
                frames.append((frame(visited, u, order, f"from {u} dive to {v}"), STEP_MS // 2))
                dfs(v)
                frames.append((frame(visited, u, order, f"backtrack to {u}"), STEP_MS // 2))

    dfs(0)
    frames.append((frame(visited, None, order, "done · all reachable"), HOLD_MS))
    save(frames, "graph-dfs.gif")


# ══════════════════════════════════════════════════════════════════════
# 11. Graph / Grid BFS
# ══════════════════════════════════════════════════════════════════════

def gif_graph_bfs() -> None:
    title, sub = "Grid BFS · Shortest path", "expand layer by layer · first hit wins"
    accent = ACCENT["blue"]
    # 3x3 open grid, start (0,0) find (2,2)
    rows, cols = 3, 3
    start, goal = (0, 0), (2, 2)
    frames: list[tuple[Image.Image, int]] = []

    def cell_xy(r: int, c: int) -> tuple[int, int]:
        cell, gap = 56, 12
        total_w = cols * cell + (cols - 1) * gap
        total_h = rows * cell + (rows - 1) * gap
        x0 = (W - total_w) // 2
        y0 = 36
        return x0 + c * (cell + gap), y0 + r * (cell + gap)

    def frame(visited: set, current, frontier: list, dist: int, note: str, found: bool = False) -> Image.Image:
        im = Image.new("RGB", (W, H), BG)
        d = ImageDraw.Draw(im)
        cell = 56
        fn = F(12, True)
        for r in range(rows):
            for c in range(cols):
                x, y = cell_xy(r, c)
                key = (r, c)
                if key == current:
                    fill = CURRENT
                elif found and key == goal:
                    fill = DONE
                elif key in visited:
                    fill = DONE
                elif key in frontier:
                    fill = ACCENT["blue"]
                else:
                    fill = PENDING
                d.rounded_rectangle([x, y, x + cell, y + cell], radius=8, fill=fill, outline=WHITE)
                label = "S" if key == start else ("G" if key == goal else f"{r},{c}")
                tw = fn.getlength(label)
                d.text((x + (cell - tw) / 2, y + 18), label, fill=DARK, font=fn)
        d.text((14, 230), note, fill=WHITE, font=F(12, True))
        qtxt = "[" + ", ".join(f"{a}{b}" for a, b in frontier) + "]" if frontier else "[]"
        footer(d, title, sub, f"QUEUE  {qtxt}", accent, f"dist = {dist}" if not found else f"dist = {dist} ✓")
        return im

    q: deque = deque([start])
    visited = {start}
    dist_map = {start: 0}
    frames.append((frame(visited, start, list(q), 0, "enqueue start"), HOLD_MS // 2))
    found_dist = None
    while q:
        r, c = q.popleft()
        dcur = dist_map[(r, c)]
        frames.append((frame(visited, (r, c), list(q), dcur, f"pop ({r},{c})"), STEP_MS))
        if (r, c) == goal:
            found_dist = dcur
            frames.append((frame(visited, (r, c), list(q), dcur, "reached goal", True), HOLD_MS))
            break
        for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and (nr, nc) not in visited:
                visited.add((nr, nc))
                dist_map[(nr, nc)] = dcur + 1
                q.append((nr, nc))
        frames.append((frame(visited, (r, c), list(q), dcur, f"expand neighbors"), STEP_MS // 2))
    save(frames, "graph-bfs.gif")


# ══════════════════════════════════════════════════════════════════════
# 12. DP 1D — fib bottom-up
# ══════════════════════════════════════════════════════════════════════

def gif_dp_1d() -> None:
    title, sub = "DP 1D · Bottom-up fill", "reuse solved subproblems"
    accent = ACCENT["cyan"]
    n = 6
    frames: list[tuple[Image.Image, int]] = []
    dp: list[int | None] = [None] * (n + 1)

    def frame(cur: int | None, note: str) -> Image.Image:
        im = Image.new("RGB", (W, H), BG)
        d = ImageDraw.Draw(im)
        vals = ["·" if v is None else v for v in dp]
        states = []
        for i in range(n + 1):
            if i == cur:
                states.append("current")
            elif dp[i] is not None:
                states.append("done")
            else:
                states.append("dim")
        d.text((14, 36), "dp[i] = dp[i-1] + dp[i-2]", fill=MUTED, font=F(12))
        draw_array(d, vals, 90, states, {i: str(i) for i in range(n + 1)}, box=40, gap=6)
        d.text((14, 180), note, fill=WHITE, font=F(13, True))
        result = f"fib({n}) = {dp[n]}" if dp[n] is not None else "filling…"
        footer(d, title, sub, f"i = {cur if cur is not None else '-'}", accent, result)
        return im

    frames.append((frame(None, "start"), HOLD_MS // 2))
    dp[0], dp[1] = 0, 1
    frames.append((frame(0, "base · dp[0]=0"), STEP_MS))
    frames.append((frame(1, "base · dp[1]=1"), STEP_MS))
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]  # type: ignore
        frames.append((frame(i, f"dp[{i}] = {dp[i-1]} + {dp[i-2]} = {dp[i]}"), STEP_MS))
    frames.append((frame(n, "done"), HOLD_MS))
    save(frames, "dp-1d.gif")


# ══════════════════════════════════════════════════════════════════════
# 13. DP 2D — unique paths 3x3
# ══════════════════════════════════════════════════════════════════════

def gif_dp_2d() -> None:
    title, sub = "DP 2D · Unique Paths", "dp[r][c] = from above + from left"
    accent = ACCENT["cyan"]
    R, C = 3, 3
    frames: list[tuple[Image.Image, int]] = []
    dp = [[0] * C for _ in range(R)]

    def frame(cr: int | None, cc: int | None, note: str) -> Image.Image:
        im = Image.new("RGB", (W, H), BG)
        d = ImageDraw.Draw(im)
        cell, gap = 56, 10
        tw = C * cell + (C - 1) * gap
        th = R * cell + (R - 1) * gap
        x0, y0 = (W - tw) // 2, 40
        fn = F(14, True)
        for r in range(R):
            for c in range(C):
                x = x0 + c * (cell + gap)
                y = y0 + r * (cell + gap)
                if (r, c) == (cr, cc):
                    fill = CURRENT
                elif dp[r][c] != 0 or (r == 0 and c == 0):
                    fill = DONE if not (r == cr and c == cc) else CURRENT
                else:
                    fill = PENDING
                # treat filled zeros on first row/col specially after init
                if dp[r][c] > 0 or (r == 0 or c == 0) and note != "start":
                    if (r, c) != (cr, cc):
                        fill = DONE if dp[r][c] or (r == 0 or c == 0) else PENDING
                if note == "start":
                    fill = PENDING
                if (r, c) == (cr, cc):
                    fill = CURRENT
                d.rounded_rectangle([x, y, x + cell, y + cell], radius=8, fill=fill, outline=WHITE)
                if note != "start" and (dp[r][c] or (r == 0 or c == 0)):
                    t = str(dp[r][c])
                    twl = fn.getlength(t)
                    d.text((x + (cell - twl) / 2, y + 18), t, fill=DARK, font=fn)
        d.text((14, 230), note, fill=WHITE, font=F(12, True))
        ans = dp[R - 1][C - 1]
        footer(d, title, sub, f"CELL  ({cr},{cc})" if cr is not None else "CELL  -", accent, f"paths = {ans}" if ans else "filling…")
        return im

    frames.append((frame(None, None, "start"), HOLD_MS // 2))
    for c in range(C):
        dp[0][c] = 1
        frames.append((frame(0, c, f"first row · only 1 way"), STEP_MS // 2))
    for r in range(1, R):
        dp[r][0] = 1
        frames.append((frame(r, 0, f"first col · only 1 way"), STEP_MS // 2))
    for r in range(1, R):
        for c in range(1, C):
            dp[r][c] = dp[r - 1][c] + dp[r][c - 1]
            frames.append(
                (
                    frame(r, c, f"({r},{c}) = {dp[r-1][c]} + {dp[r][c-1]} = {dp[r][c]}"),
                    STEP_MS,
                )
            )
    frames.append((frame(R - 1, C - 1, "done"), HOLD_MS))
    save(frames, "dp-2d.gif")


# ══════════════════════════════════════════════════════════════════════
# 14. Monotonic stack — next greater
# ══════════════════════════════════════════════════════════════════════

def gif_monotonic_stack() -> None:
    title, sub = "Monotonic Stack · Next Greater", "pop while top < current"
    accent = ACCENT["green"]
    nums = [2, 1, 2, 4, 3]
    frames: list[tuple[Image.Image, int]] = []
    answer = [-1] * len(nums)
    stack: list[int] = []

    def frame(i: int | None, note: str) -> Image.Image:
        im = Image.new("RGB", (W, H), BG)
        d = ImageDraw.Draw(im)
        states = ["pending"] * len(nums)
        for idx in stack:
            states[idx] = "window"
        if i is not None:
            states[i] = "current"
        for idx, a in enumerate(answer):
            if a != -1:
                states[idx] = "done"
        draw_array(d, nums, 70, states, {k: str(k) for k in range(len(nums))}, box=40, gap=8)
        # answer row
        d.text((14, 150), "answer (next greater index)", fill=MUTED, font=F(11))
        a_show = [str(a) if a != -1 else "·" for a in answer]
        a_states = ["done" if answer[k] != -1 else "dim" for k in range(len(nums))]
        draw_array(d, a_show, 170, a_states, box=40, gap=8)
        d.text((14, 230), note, fill=WHITE, font=F(12, True))
        footer(d, title, sub, f"STACK  {stack}", accent, f"ans = {answer}")
        return im

    frames.append((frame(None, "start"), HOLD_MS // 2))
    for i, v in enumerate(nums):
        frames.append((frame(i, f"look at nums[{i}]={v}"), STEP_MS // 2))
        while stack and nums[i] > nums[stack[-1]]:
            idx = stack.pop()
            answer[idx] = i
            frames.append((frame(i, f"pop {idx}: next greater of {nums[idx]} is {v} @ {i}"), STEP_MS))
        stack.append(i)
        frames.append((frame(i, f"push {i}"), STEP_MS // 2))
    frames.append((frame(None, "done · leftovers stay -1"), HOLD_MS))
    save(frames, "monotonic-stack.gif")


# ══════════════════════════════════════════════════════════════════════
# 15. Backtracking — subsets of [1,2,3] briefly
# ══════════════════════════════════════════════════════════════════════

def gif_backtracking() -> None:
    title, sub = "Backtracking · Choose · Explore · Undo", "build path · recurse · pop"
    accent = ACCENT["violet"]
    nums = [1, 2, 3]
    frames: list[tuple[Image.Image, int]] = []
    results: list[list[int]] = []

    def frame(path: list[int], start: int, note: str, highlight: int | None = None) -> Image.Image:
        im = Image.new("RGB", (W, H), BG)
        d = ImageDraw.Draw(im)
        states = ["pending"] * len(nums)
        for i, v in enumerate(nums):
            if v in path:
                states[i] = "done"
            if i == highlight:
                states[i] = "current"
            if i < start and v not in path:
                states[i] = "dim"
        draw_array(d, nums, 70, states)
        d.text((14, 140), f"path = {path}", fill=WHITE, font=F(14, True))
        d.text((14, 168), note, fill=MUTED, font=F(12))
        shown = results[-3:] if len(results) > 3 else results
        footer(d, title, sub, f"START  i={start}", accent, f"found {len(results)} · last {shown}")
        return im

    frames.append((frame([], 0, "start"), HOLD_MS // 2))

    def bt(start: int, path: list[int]) -> None:
        results.append(path[:])
        frames.append((frame(path, start, "record subset", None), STEP_MS // 2))
        for i in range(start, len(nums)):
            path.append(nums[i])
            frames.append((frame(path, start, f"choose {nums[i]}", i), STEP_MS))
            bt(i + 1, path)
            path.pop()
            frames.append((frame(path, start, f"undo {nums[i]}", i), STEP_MS // 2))

    bt(0, [])
    frames.append((frame([], 0, f"done · {len(results)} subsets"), HOLD_MS))
    save(frames, "backtracking.gif")


# ══════════════════════════════════════════════════════════════════════
# 16. Heap — min-heap insert bubble up (simple)
# ══════════════════════════════════════════════════════════════════════

def gif_heap() -> None:
    title, sub = "Min-Heap · Insert & bubble up", "parent ≤ children · peek min in O(1)"
    accent = ACCENT["rose"]
    # show as tree positions for heap array
    frames: list[tuple[Image.Image, int]] = []
    inserts = [5, 3, 8, 1]

    def positions(n: int) -> dict[int, tuple[int, int]]:
        # complete binary tree layout for indices 0..n-1
        pos = {}
        levels = {}
        for i in range(n):
            level = (i + 1).bit_length() - 1
            levels.setdefault(level, []).append(i)
        for level, idxs in levels.items():
            y = 50 + level * 70
            count = len(idxs)
            for k, i in enumerate(idxs):
                x = int(W * (k + 1) / (count + 1))
                pos[i] = (x, y)
        return pos

    def frame(heap: list[int], cur: int | None, note: str) -> Image.Image:
        im = Image.new("RGB", (W, H), BG)
        d = ImageDraw.Draw(im)
        pos = positions(len(heap))
        r = 18
        for i in range(len(heap)):
            p = (i - 1) // 2
            if i > 0 and p in pos:
                x0, y0 = pos[p]
                x1, y1 = pos[i]
                d.line([(x0, y0 + r), (x1, y1 - r)], fill=EDGE, width=2)
        fn = F(13, True)
        for i, v in enumerate(heap):
            x, y = pos[i]
            fill = CURRENT if i == cur else (DONE if cur is not None and i == 0 else PENDING)
            if cur is None:
                fill = DONE if i == 0 else PENDING
            d.ellipse([x - r, y - r, x + r, y + r], fill=fill, outline=WHITE)
            tw = fn.getlength(str(v))
            d.text((x - tw / 2, y - 8), str(v), fill=DARK, font=fn)
        d.text((14, 250), note, fill=WHITE, font=F(12, True))
        footer(d, title, sub, f"ARRAY  {heap}", accent, f"min = {heap[0]}" if heap else "min = ?")
        return im

    heap: list[int] = []
    frames.append((frame(heap, None, "empty heap"), HOLD_MS // 2))
    for val in inserts:
        heap.append(val)
        i = len(heap) - 1
        frames.append((frame(heap, i, f"insert {val} at end"), STEP_MS))
        while i > 0:
            p = (i - 1) // 2
            if heap[i] < heap[p]:
                heap[i], heap[p] = heap[p], heap[i]
                frames.append((frame(heap, p, f"bubble up · swap with parent"), STEP_MS))
                i = p
            else:
                break
        frames.append((frame(heap, 0, f"heap property OK · min={heap[0]}"), STEP_MS))
    frames.append((frame(heap, 0, "done"), HOLD_MS))
    save(frames, "heap.gif")


# ══════════════════════════════════════════════════════════════════════
# 17. Hash map — two-sum style lookup
# ══════════════════════════════════════════════════════════════════════

def gif_hashmap() -> None:
    title, sub = "Hash Map · Lookup", "see once · answer in O(1)"
    accent = ACCENT["violet"]
    nums = [2, 7, 11, 15]
    target = 9
    frames: list[tuple[Image.Image, int]] = []
    mp: dict[int, int] = {}

    def frame(i: int | None, note: str, result: str, hit: int | None = None) -> Image.Image:
        im = Image.new("RGB", (W, H), BG)
        d = ImageDraw.Draw(im)
        states = ["pending"] * len(nums)
        for j in range(len(nums)):
            if nums[j] in mp or (i is not None and j < i):
                states[j] = "done"
        if i is not None:
            states[i] = "current"
        if hit is not None:
            states[hit] = "done"
            if i is not None:
                states[i] = "done"
        draw_array(d, nums, 70, states, {k: str(k) for k in range(len(nums))})
        # map display
        items = ", ".join(f"{k}:{v}" for k, v in mp.items()) or "∅"
        d.text((14, 150), f"map = {{{items}}}", fill=WHITE, font=F(13, True))
        d.text((14, 178), note, fill=MUTED, font=F(12))
        footer(d, title, sub, f"TARGET  {target}", accent, result)
        return im

    frames.append((frame(None, "start · empty map", "[ ]"), HOLD_MS // 2))
    for i, v in enumerate(nums):
        need = target - v
        frames.append((frame(i, f"need {need} for {v}", "searching…"), STEP_MS))
        if need in mp:
            frames.append(
                (
                    frame(i, f"found {need} at index {mp[need]}", f"pair = [{mp[need]}, {i}]", mp[need]),
                    HOLD_MS,
                )
            )
            break
        mp[v] = i
        frames.append((frame(i, f"store {v} → {i}", "building map…"), STEP_MS))
    save(frames, "hashmap-lookup.gif")


# ══════════════════════════════════════════════════════════════════════
# 18. Intervals — merge overlapping
# ══════════════════════════════════════════════════════════════════════

def gif_intervals() -> None:
    title, sub = "Intervals · Merge", "sort · then glue overlaps"
    accent = ACCENT["amber"]
    intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]
    frames: list[tuple[Image.Image, int]] = []

    def frame(merged: list[list[int]], cur: int | None, note: str) -> Image.Image:
        im = Image.new("RGB", (W, H), BG)
        d = ImageDraw.Draw(im)
        # timeline 0..20
        x0, x1, y = 40, W - 40, 100
        d.line([(x0, y), (x1, y)], fill=EDGE, width=2)
        scale = (x1 - x0) / 20

        def draw_iv(a: int, b: int, yy: int, fill, label: str) -> None:
            xa, xb = x0 + a * scale, x0 + b * scale
            d.rounded_rectangle([xa, yy - 14, xb, yy + 14], radius=6, fill=fill, outline=WHITE)
            fn = F(10, True)
            t = label
            tw = fn.getlength(t)
            d.text(((xa + xb) / 2 - tw / 2, yy - 6), t, fill=DARK, font=fn)

        for i, (a, b) in enumerate(intervals):
            fill = CURRENT if i == cur else PENDING
            draw_iv(a, b, 70 + i * 8, fill if i == cur else (180, 140, 40), f"{a}-{b}")
        # actually draw each on separate row for clarity
        im = Image.new("RGB", (W, H), BG)
        d = ImageDraw.Draw(im)
        d.line([(x0, 200), (x1, 200)], fill=EDGE, width=1)
        for t in range(0, 21, 5):
            xx = x0 + t * scale
            d.line([(xx, 196), (xx, 204)], fill=MUTED, width=1)
            d.text((xx - 4, 208), str(t), fill=MUTED, font=F(9))

        for i, (a, b) in enumerate(intervals):
            yy = 50 + i * 32
            fill = CURRENT if i == cur else PENDING
            draw_iv(a, b, yy, fill, f"[{a},{b}]")
            d.text((14, yy - 6), f"{i}", fill=MUTED, font=F(10))

        # merged row
        d.text((14, 230), "merged:", fill=MUTED, font=F(11))
        for j, (a, b) in enumerate(merged):
            draw_iv(a, b, 255, DONE, f"[{a},{b}]")
        d.text((14, 22), note, fill=WHITE, font=F(12, True))
        footer(d, title, sub, f"i = {cur if cur is not None else '-'}", accent, f"{merged}")
        return im

    sorted_iv = sorted(intervals, key=lambda x: x[0])
    frames.append((frame([], None, "already sorted by start"), HOLD_MS // 2))
    merged: list[list[int]] = []
    for i, iv in enumerate(sorted_iv):
        if not merged or merged[-1][1] < iv[0]:
            merged.append(iv[:])
            frames.append((frame(merged, i, f"no overlap · append [{iv[0]},{iv[1]}]"), STEP_MS))
        else:
            old = merged[-1][:]
            merged[-1][1] = max(merged[-1][1], iv[1])
            frames.append(
                (
                    frame(merged, i, f"overlap · merge {old} ∪ {iv} → {merged[-1]}"),
                    STEP_MS,
                )
            )
    frames.append((frame(merged, None, "done"), HOLD_MS))
    save(frames, "intervals-merge.gif")


def main() -> None:
    print("Generating LeetCode 75 intro GIFs…")
    gif_two_pointers()
    gif_sliding_fixed()
    gif_sliding_variable()
    gif_prefix_sum()
    gif_stack()
    gif_queue()
    # linked-list-reverse.gif → scripts/gen-reverse-linked-list-gif.py
    gif_binary_search()
    # bst-search.gif removed — interactive viz in components/viz/BstViz.tsx
    gif_graph_dfs()
    gif_graph_bfs()
    gif_dp_1d()
    gif_dp_2d()
    gif_monotonic_stack()
    gif_backtracking()
    gif_heap()
    gif_hashmap()
    gif_intervals()
    print("Done →", OUT)


if __name__ == "__main__":
    main()
