#!/usr/bin/env python3
"""Copy the bundled emotional countdown starter without overwriting files."""

from __future__ import annotations

import argparse
import shutil
from pathlib import Path


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--out", required=True, help="Destination project directory")
    args = parser.parse_args()

    skill_root = Path(__file__).resolve().parent.parent
    source = skill_root / "assets" / "starter"
    destination = Path(args.out).expanduser().resolve()
    destination.mkdir(parents=True, exist_ok=True)

    conflicts = [item.relative_to(source) for item in source.rglob("*") if item.is_file() and (destination / item.relative_to(source)).exists()]
    if conflicts:
        print("Refusing to overwrite existing files:")
        for conflict in conflicts:
            print(f"- {conflict}")
        return 2

    for item in source.rglob("*"):
        relative = item.relative_to(source)
        target = destination / relative
        if item.is_dir():
            target.mkdir(parents=True, exist_ok=True)
        else:
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(item, target)

    print(f"Created emotional countdown starter at {destination}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
