#!/usr/bin/env python3
"""
One-shot: git push (GitHub → Cloudflare Pages) + scp sync (Aliyun Nginx docroot).

Usage (from repo root, where .git lives):
  python scripts/deploy_dual.py
  python scripts/deploy_dual.py -m "Update copy"

Requires: git, scp (OpenSSH client), deploy.env in repo root (see deploy.env.example).

Dry-run prints commands without running destructive steps (scp still skipped when dry-run).
"""

from __future__ import annotations

import argparse
import subprocess
import sys
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parent.parent
DEPLOY_ENV = REPO_ROOT / "deploy.env"

# Top-level names never uploaded to the server
SCP_SKIP_NAMES = {
    ".git",
    "__pycache__",
    ".venv",
    "deploy.env",
    ".DS_Store",
    "scripts",  # deploy helpers; not needed on Nginx docroot
}


def load_env(path: Path) -> dict[str, str]:
    out: dict[str, str] = {}
    if not path.is_file():
        return out
    text = path.read_text(encoding="utf-8")
    for raw in text.splitlines():
        line = raw.strip()
        if not line or line.startswith("#"):
            continue
        if "=" not in line:
            continue
        k, v = line.split("=", 1)
        out[k.strip()] = v.strip().strip('"').strip("'")
    return out


def run(cmd: list[str], *, cwd: Path | None = None, dry_run: bool) -> None:
    display = " ".join(cmd)
    print(f"+ {display}")
    if dry_run:
        return
    subprocess.run(cmd, cwd=cwd, check=True)


def git_dirty() -> bool:
    r = subprocess.run(
        ["git", "status", "--porcelain"],
        cwd=REPO_ROOT,
        capture_output=True,
        text=True,
        check=False,
    )
    return bool(r.stdout.strip())


def main() -> int:
    parser = argparse.ArgumentParser(description="Push to GitHub and sync static files to Aliyun via scp.")
    parser.add_argument(
        "-m",
        "--message",
        help="If working tree is dirty: git add -A && commit with this message, then push.",
    )
    parser.add_argument("--branch", default="", help="Remote branch (default: GIT_BRANCH in deploy.env or main).")
    parser.add_argument("--skip-git", action="store_true", help="Only run scp sync.")
    parser.add_argument("--skip-scp", action="store_true", help="Only run git push.")
    parser.add_argument("--dry-run", action="store_true", help="Print commands; do not push or scp.")
    args = parser.parse_args()

    env_file = load_env(DEPLOY_ENV)
    host = env_file.get("DEPLOY_HOST", "").strip()
    user = env_file.get("DEPLOY_USER", "").strip()
    remote_path = env_file.get("DEPLOY_PATH", "/var/www/echo-island/").strip()
    branch = (args.branch or env_file.get("GIT_BRANCH", "main")).strip()
    ssh_key = env_file.get("DEPLOY_SSH_KEY", "").strip()
    port = env_file.get("DEPLOY_PORT", "22").strip()

    if not args.skip_scp:
        if not host or not user:
            print(
                "Missing DEPLOY_HOST or DEPLOY_USER in deploy.env.\n"
                f"Copy scripts/deploy.env.example → {DEPLOY_ENV} and edit.",
                file=sys.stderr,
            )
            return 1
        if not remote_path.endswith("/"):
            remote_path += "/"

    if not args.skip_git:
        # Ensure we are inside the repo
        if not (REPO_ROOT / ".git").is_dir():
            print(f"No .git under {REPO_ROOT}", file=sys.stderr)
            return 1

        dirty = git_dirty()
        if dirty and not args.message:
            print(
                "Working tree has uncommitted changes. Either commit manually, or pass:\n"
                '  python scripts/deploy_dual.py -m "your message"',
                file=sys.stderr,
            )
            return 1

        if dirty and args.message:
            run(["git", "add", "-A"], cwd=REPO_ROOT, dry_run=args.dry_run)
            run(["git", "commit", "-m", args.message], cwd=REPO_ROOT, dry_run=args.dry_run)

        run(["git", "push", "-u", "origin", branch], cwd=REPO_ROOT, dry_run=args.dry_run)

    if not args.skip_scp:
        dest = f"{user}@{host}:{remote_path}"

        for child in sorted(REPO_ROOT.iterdir(), key=lambda p: p.name.lower()):
            name = child.name
            if name in SCP_SKIP_NAMES:
                continue
            if name.startswith(".") and name not in {".gitignore"}:
                # skip hidden clutter except .gitignore if present
                continue

            cmd = ["scp", "-r"]
            if port and port != "22":
                cmd.extend(["-P", port])
            if ssh_key:
                cmd.extend(["-i", ssh_key])
            cmd.extend([str(child), dest])

            run(cmd, cwd=REPO_ROOT, dry_run=args.dry_run)

        print("\nDone. GitHub (Pages) updated via push; Aliyun docroot synced via scp.")
        print(f"Check: http://{host} (hard refresh: Ctrl+F5)")
    else:
        print("\nSkipped scp (--skip-scp).")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
