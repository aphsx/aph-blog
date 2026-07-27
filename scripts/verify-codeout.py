#!/usr/bin/env python3
"""Run every python `codeout` block in a course page and diff it against the
declared output, so a page can never ship a hand-written (i.e. wrong) result.

Usage: python3 scripts/verify-codeout.py lib/courses/**/pages/*.ts
"""
from __future__ import annotations

import subprocess
import sys
import tempfile
from pathlib import Path


def read_template_literal(text: str, start: int) -> tuple[str, int]:
    """Read a JS template literal beginning at the backtick at `start`.

    Returns the unescaped contents and the index just past the closing backtick.
    """
    assert text[start] == "`", text[start : start + 40]
    out: list[str] = []
    i = start + 1
    while i < len(text):
        ch = text[i]
        if ch == "\\":
            nxt = text[i + 1]
            out.append({"n": "\n", "t": "\t", "`": "`", "\\": "\\", "$": "$"}.get(nxt, "\\" + nxt))
            i += 2
            continue
        if ch == "`":
            return "".join(out), i + 1
        out.append(ch)
        i += 1
    raise ValueError("unterminated template literal")


def field_after(text: str, block_start: int, name: str, stop: int) -> tuple[str, int] | None:
    """Find `<name>: `...`` between block_start and stop."""
    needle = f"{name}: `"
    at = text.find(needle, block_start, stop)
    if at == -1:
        return None
    return read_template_literal(text, at + len(needle) - 1)


def blocks(text: str):
    """Yield (line_no, lang, code, out) for each codeout block."""
    marker = 't: "codeout"'
    at = text.find(marker)
    while at != -1:
        nxt = text.find(marker, at + 1)
        stop = nxt if nxt != -1 else len(text)
        code = field_after(text, at, "code", stop)
        out = field_after(text, at, "out", stop)
        if code and out:
            lang_at = text.find('lang: "', at, stop)
            lang = ""
            if lang_at != -1:
                lang = text[lang_at + 7 : text.find('"', lang_at + 7)]
            yield text.count("\n", 0, at) + 1, lang, code[0], out[0]
        at = nxt


def main(paths: list[str]) -> int:
    checked = skipped = failed = 0
    for path in paths:
        text = Path(path).read_text()
        for line_no, lang, code, expected in blocks(text):
            if lang != "python":
                skipped += 1
                continue
            with tempfile.NamedTemporaryFile("w", suffix=".py", delete=False) as fh:
                fh.write(code)
                tmp = fh.name
            proc = subprocess.run(
                [sys.executable, tmp], capture_output=True, text=True, timeout=60
            )
            actual = (proc.stdout + proc.stderr).rstrip("\n")
            checked += 1
            if actual != expected.rstrip("\n"):
                failed += 1
                print(f"\n{'=' * 70}\nMISMATCH {path}:{line_no}\n{'=' * 70}")
                print("--- declared ---")
                print(expected)
                print("--- actual ---")
                print(actual)
            Path(tmp).unlink()
    print(f"\nchecked {checked} python codeout blocks, {failed} mismatched, {skipped} skipped")
    return 1 if failed else 0


if __name__ == "__main__":
    args = sys.argv[1:]
    if not args:
        args = [str(p) for p in sorted(Path("lib/courses").rglob("pages/*.ts"))]
    sys.exit(main(args))
