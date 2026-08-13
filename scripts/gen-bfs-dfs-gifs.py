#!/usr/bin/env python3
"""Generate step-by-step BFS / DFS tree-traversal GIFs (same tree A–I)."""

from __future__ import annotations

from collections import deque
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

OUT_DIR = Path(__file__).resolve().parents[1] / "public" / "leetcode-75"
W, H = 480, 360
FPS_MS = 700
HOLD_MS = 1600

# Tree: A has B,C · B has D,E · C has F,G · D has H,I
CHILDREN = {
    "A": ("B", "C"),
    "B": ("D", "E"),
    "C": ("F", "G"),
    "D": ("H", "I"),
    "E": (None, None),
    "F": (None, None),
    "G": (None, None),
    "H": (None, None),
    "I": (None, None),
}

# Layout positions (x, y) — matches the reference infographic spacing
POS = {
    "A": (240, 52),
    "B": (140, 118),
    "C": (340, 118),
    "D": (90, 184),
    "E": (190, 184),
    "F": (290, 184),
    "G": (390, 184),
    "H": (55, 250),
    "I": (125, 250),
}

FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
FONT_REG = "/System/Library/Fonts/Supplemental/Arial.ttf"


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(FONT_BOLD if bold else FONT_REG, size)


# Shared palette (inorder-like: black bg, warm nodes, teal visited)
BG = (0, 0, 0)
EDGE = (200, 200, 200)
PENDING = (247, 183, 0)  # gold — not yet visited
CURRENT = (213, 93, 0)  # deep orange — just visited this step
VISITED = (3, 166, 155)  # teal — already in result
TEXT_ON_NODE = (20, 20, 20)
WHITE = (240, 240, 240)
MUTED = (140, 140, 140)

# Accent per algorithm (badge / footer hint)
BFS_ACCENT = (74, 158, 255)
DFS_ACCENT = (74, 222, 128)


def draw_tree(
    draw: ImageDraw.ImageDraw,
    visited: set[str],
    current: str | None,
    fonts: dict,
) -> None:
    r = 18
    # edges first
    for parent, (left, right) in CHILDREN.items():
        x0, y0 = POS[parent]
        for child in (left, right):
            if child is None:
                continue
            x1, y1 = POS[child]
            draw.line([(x0, y0 + r), (x1, y1 - r)], fill=EDGE, width=2)

    for name, (x, y) in POS.items():
        if name == current:
            fill = CURRENT
        elif name in visited:
            fill = VISITED
        else:
            fill = PENDING
        draw.ellipse([x - r, y - r, x + r, y + r], fill=fill, outline=WHITE, width=1)
        tw = fonts["node"].getlength(name)
        draw.text((x - tw / 2, y - 9), name, fill=TEXT_ON_NODE, font=fonts["node"])


def draw_footer(
    draw: ImageDraw.ImageDraw,
    title: str,
    subtitle: str,
    order: list[str],
    structure_label: str,
    structure_value: str,
    accent: tuple[int, int, int],
    fonts: dict,
) -> None:
    # structure chip (QUEUE / STACK)
    chip = f"{structure_label}  {structure_value}"
    pad_x, pad_y = 10, 5
    tw = fonts["chip"].getlength(chip)
    chip_w, chip_h = tw + pad_x * 2, 22
    cx0, cy0 = 16, H - 78
    draw.rounded_rectangle(
        [cx0, cy0, cx0 + chip_w, cy0 + chip_h],
        radius=11,
        fill=(*accent, ) if False else accent,
    )
    # darken text on bright accent
    draw.text((cx0 + pad_x, cy0 + 3), chip, fill=(10, 10, 20), font=fonts["chip"])

    draw.text((16, H - 48), title, fill=WHITE, font=fonts["title"])
    draw.text((16, H - 26), subtitle, fill=MUTED, font=fonts["sub"])

    result = "[ " + ", ".join(order) + " ]" if order else "[ ]"
    rw = fonts["result"].getlength(result)
    draw.text((W - 16 - rw, H - 30), result, fill=WHITE, font=fonts["result"])


def make_frame(
    visited: set[str],
    current: str | None,
    order: list[str],
    title: str,
    subtitle: str,
    structure_label: str,
    structure_value: str,
    accent: tuple[int, int, int],
    step_badge: str | None,
) -> Image.Image:
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)
    fonts = {
        "node": font(16, bold=True),
        "title": font(16, bold=True),
        "sub": font(11),
        "result": font(14, bold=True),
        "chip": font(11, bold=True),
        "badge": font(11, bold=True),
    }
    draw_tree(draw, visited, current, fonts)
    draw_footer(
        draw, title, subtitle, order, structure_label, structure_value, accent, fonts
    )

    if step_badge:
        # numbered visit badge near current node
        if current and current in POS:
            x, y = POS[current]
            bx, by = x + 20, y - 22
            bw = max(18, fonts["badge"].getlength(step_badge) + 8)
            draw.ellipse([bx, by, bx + bw, by + 18], fill=accent)
            tw = fonts["badge"].getlength(step_badge)
            draw.text(
                (bx + (bw - tw) / 2, by + 2),
                step_badge,
                fill=(10, 10, 20),
                font=fonts["badge"],
            )
    return img


def bfs_frames() -> list[tuple[Image.Image, int]]:
    title = "BFS · Breadth-First Search"
    subtitle = "level by level · visits neighbors first"
    frames: list[tuple[Image.Image, int]] = []

    # intro
    frames.append(
        (
            make_frame(
                set(),
                None,
                [],
                title,
                subtitle,
                "QUEUE · FIFO",
                "[]",
                BFS_ACCENT,
                None,
            ),
            HOLD_MS // 2,
        )
    )

    q: deque[str] = deque(["A"])
    visited: set[str] = set()
    order: list[str] = []
    step = 0

    while q:
        # show queue before dequeue
        frames.append(
            (
                make_frame(
                    visited,
                    None,
                    order,
                    title,
                    subtitle,
                    "QUEUE · FIFO",
                    "[" + ", ".join(q) + "]",
                    BFS_ACCENT,
                    None,
                ),
                FPS_MS // 2,
            )
        )
        node = q.popleft()
        step += 1
        visited.add(node)
        order.append(node)
        left, right = CHILDREN[node]
        for child in (left, right):
            if child is not None:
                q.append(child)

        frames.append(
            (
                make_frame(
                    visited,
                    node,
                    order,
                    title,
                    subtitle,
                    "QUEUE · FIFO",
                    "[" + ", ".join(q) + "]" if q else "[]",
                    BFS_ACCENT,
                    str(step),
                ),
                FPS_MS,
            )
        )

    # final hold
    frames.append(
        (
            make_frame(
                visited,
                None,
                order,
                title,
                subtitle,
                "QUEUE · FIFO",
                "[]",
                BFS_ACCENT,
                None,
            ),
            HOLD_MS,
        )
    )
    return frames


def dfs_frames() -> list[tuple[Image.Image, int]]:
    """Preorder DFS (N → L → R) — matches the reference dive A→B→D→H→I…"""
    title = "DFS · Depth-First Search"
    subtitle = "go deep, then backtrack"
    frames: list[tuple[Image.Image, int]] = []

    frames.append(
        (
            make_frame(
                set(),
                None,
                [],
                title,
                subtitle,
                "STACK · LIFO",
                "[]",
                DFS_ACCENT,
                None,
            ),
            HOLD_MS // 2,
        )
    )

    stack: list[str] = ["A"]
    visited: set[str] = set()
    order: list[str] = []
    step = 0

    # Iterative preorder with explicit stack so we can show STACK state.
    # Push right then left so left is processed first.
    while stack:
        frames.append(
            (
                make_frame(
                    visited,
                    None,
                    order,
                    title,
                    subtitle,
                    "STACK · LIFO",
                    "[" + ", ".join(stack) + "]",
                    DFS_ACCENT,
                    None,
                ),
                FPS_MS // 2,
            )
        )
        node = stack.pop()
        if node in visited:
            continue
        step += 1
        visited.add(node)
        order.append(node)
        left, right = CHILDREN[node]
        # LIFO: push right first, then left
        if right is not None:
            stack.append(right)
        if left is not None:
            stack.append(left)

        frames.append(
            (
                make_frame(
                    visited,
                    node,
                    order,
                    title,
                    subtitle,
                    "STACK · LIFO",
                    "[" + ", ".join(stack) + "]" if stack else "[]",
                    DFS_ACCENT,
                    str(step),
                ),
                FPS_MS,
            )
        )

    frames.append(
        (
            make_frame(
                visited,
                None,
                order,
                title,
                subtitle,
                "STACK · LIFO",
                "[]",
                DFS_ACCENT,
                None,
            ),
            HOLD_MS,
        )
    )
    return frames


def save_gif(frames: list[tuple[Image.Image, int]], path: Path) -> None:
    images = [f for f, _ in frames]
    durations = [d for _, d in frames]
    images[0].save(
        path,
        save_all=True,
        append_images=images[1:],
        duration=durations,
        loop=0,
        optimize=False,
        disposal=2,
    )
    print(f"wrote {path} ({len(images)} frames)")


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    save_gif(bfs_frames(), OUT_DIR / "bfs-search.gif")
    save_gif(dfs_frames(), OUT_DIR / "dfs-search.gif")


if __name__ == "__main__":
    main()
