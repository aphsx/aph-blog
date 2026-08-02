#!/usr/bin/env python3
"""
Repair template-literal indentation in course content files.

Why this exists
---------------
A localization refactor re-indented the *contents* of TypeScript template
literals that hold Python samples. Every line after the first gained a constant
number of leading spaces, so code rendered on the site is invalid Python and
raises IndentationError when a reader copies it. The offset is not the same
everywhere (observed +2, +4 and +8), so it must be detected per literal rather
than assumed.

How it decides
--------------
For a `code:` literal (real Python):
  * If it already parses, it is left completely alone.
  * Otherwise try removing K leading spaces from lines 2..n for each distinct
    indent width present, ascending, and keep the smallest K that makes
    `ast.parse` succeed. If no K works, leave it untouched.

For the `out:` literal that follows a repaired `code:` in the same block:
  * Apply the same K. Output text cannot be validated by parsing, and its
    leading spaces are often meaningful column alignment, so it is only ever
    shifted by the offset proven on its sibling code.

Anything else (`out` with no repaired sibling, ASCII diagrams, pseudo-code
templates that never parse) is left byte-for-byte unchanged.

Usage
-----
    python3 scripts/fix-code-indent.py lib/courses            # dry run
    python3 scripts/fix-code-indent.py lib/courses --write    # apply
"""

from __future__ import annotations

import argparse
import ast
import pathlib
import re
import sys


def indent_of(line: str) -> int:
    return len(line) - len(line.lstrip(" "))


def parses(code: str) -> bool:
    try:
        ast.parse(code)
        return True
    except SyntaxError:
        return False


def dedent_tail(body: str, k: int) -> str:
    """Remove k leading spaces from every line except the first."""
    lines = body.split("\n")
    return "\n".join(
        [lines[0]] + [(l[k:] if l.strip() else "") for l in lines[1:]]
    )


def find_offset(body: str) -> int | None:
    """Smallest K that turns broken Python into valid Python, else None."""
    lines = body.split("\n")
    if len(lines) < 2:
        return None
    if parses(body):
        return None  # already valid — never touch

    tail = [l for l in lines[1:] if l.strip()]
    if not tail:
        return None

    # The needed offset is not necessarily an indent width that appears in the
    # literal (a body indented 8/12 may need K=4), so try every width up to the
    # shallowest line — removing more than that would eat real characters.
    ceiling = min(indent_of(l) for l in tail)
    for k in range(1, ceiling + 1):
        if parses(dedent_tail(body, k)):
            return k
    return None


def read_literal(src: str, start: int) -> tuple[str, int]:
    """Read a template-literal body beginning at `start`; return (body, end)."""
    i, body = start, []
    while i < len(src):
        if src[i] == "\\" and i + 1 < len(src):
            body.append(src[i : i + 2])
            i += 2
            continue
        if src[i] == "`":
            break
        body.append(src[i])
        i += 1
    return "".join(body), i


def process(path: pathlib.Path, write: bool) -> tuple[int, int, list[int]]:
    src = path.read_text(encoding="utf-8")
    parts: list[str] = []
    pos = 0
    fixed_code = 0
    fixed_out = 0
    offsets: list[int] = []
    pending_k: int | None = None  # offset proven on the most recent `code:`

    for m in re.finditer(r"(\w+)\s*:\s*`", src):
        field = m.group(1)
        lit_start = m.end()
        if lit_start < pos:
            continue  # already consumed as part of a previous literal
        body, lit_end = read_literal(src, lit_start)

        if field in ("code", "c"):
            k = find_offset(body)
            pending_k = k
            if k is not None:
                parts.append(src[pos:lit_start])
                parts.append(dedent_tail(body, k))
                pos = lit_end
                fixed_code += 1
                offsets.append(k)
        elif field == "out":
            if pending_k is not None:
                parts.append(src[pos:lit_start])
                parts.append(dedent_tail(body, pending_k))
                pos = lit_end
                fixed_out += 1
            pending_k = None

    parts.append(src[pos:])
    if write and (fixed_code or fixed_out):
        path.write_text("".join(parts), encoding="utf-8")
    return fixed_code, fixed_out, offsets


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("root")
    ap.add_argument("--write", action="store_true")
    args = ap.parse_args()

    root = pathlib.Path(args.root)
    tot_code = tot_out = 0
    files = 0
    for f in sorted(root.rglob("*.ts")):
        c, o, ks = process(f, args.write)
        if c or o:
            files += 1
            tot_code += c
            tot_out += o
            widths = ",".join(str(k) for k in sorted(set(ks)))
            print(
                f"{'FIX ' if args.write else 'WOULD '}code={c:<3} out={o:<3} "
                f"offsets={widths:<8} {f.relative_to(root)}"
            )

    print(
        f"\n{'แก้แล้ว' if args.write else 'จะแก้'}: code {tot_code} literal, "
        f"out {tot_out} literal, {files} ไฟล์"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
