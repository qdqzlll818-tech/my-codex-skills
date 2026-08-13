#!/usr/bin/env python3
"""Validate the minimum static-project contract without modifying the project."""

from __future__ import annotations

import argparse
import re
import subprocess
from pathlib import Path


REQUIRED_FILES = ("index.html", "style.css", "script.js")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("project", help="Countdown project directory")
    args = parser.parse_args()
    project = Path(args.project).expanduser().resolve()

    failures: list[str] = []
    for name in REQUIRED_FILES:
        if not (project / name).is_file():
            failures.append(f"missing {name}")

    if not failures:
        html = (project / "index.html").read_text(encoding="utf-8")
        css = (project / "style.css").read_text(encoding="utf-8")
        js = (project / "script.js").read_text(encoding="utf-8")
        checks = {
            "time input": 'type="time"' in html,
            "countdown output": 'id="countdown"' in html,
            "demand action": 'id="demand-button"' in html,
            "tabular digits": "tabular-nums" in css,
            "reduced motion": "prefers-reduced-motion" in css,
            "Friday detection": "getDay() === 5" in js,
            "preview parameter": "previewFriday" in js and "previewEvent" in js,
            "no external script": not re.search(r'<script[^>]+src=["\']https?://', html, re.I),
        }
        failures.extend(label for label, passed in checks.items() if not passed)

        syntax = subprocess.run(
            ["node", "--check", str(project / "script.js")],
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="replace",
        )
        if syntax.returncode:
            failures.append(f"JavaScript syntax: {syntax.stderr.strip()}")

        test_file = project / "tests" / "countdown.test.js"
        if test_file.is_file():
            tests = subprocess.run(
                ["node", "--test", str(test_file)],
                cwd=project,
                capture_output=True,
                text=True,
                encoding="utf-8",
                errors="replace",
            )
            if tests.returncode:
                failures.append(f"Node tests failed:\n{tests.stdout}\n{tests.stderr}")

    if failures:
        print("Validation failed:")
        for failure in failures:
            print(f"- {failure}")
        return 1

    print(f"Validation passed: {project}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
