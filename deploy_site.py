#!/usr/bin/env python3
"""
Publish entrypoint at repo root (same folder as index.html).

Forwards all CLI args to scripts/deploy_dual.py so you can run:

  py -3 deploy_site.py -m "本次修改说明"

instead of:

  py -3 scripts/deploy_dual.py -m "本次修改说明"
"""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DUAL = ROOT / "scripts" / "deploy_dual.py"


def main() -> int:
    if not DUAL.is_file():
        print(f"Missing {DUAL}", file=sys.stderr)
        return 1
    cmd = [sys.executable, str(DUAL), *sys.argv[1:]]
    return int(subprocess.call(cmd, cwd=str(ROOT)))


if __name__ == "__main__":
    raise SystemExit(main())
