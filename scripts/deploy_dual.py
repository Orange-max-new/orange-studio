#!/usr/bin/env python3
"""
One-shot: git push (GitHub → Cloudflare Pages) + scp sync (Aliyun Nginx docroot).

Usage (from repo root, where .git lives):
  python scripts/deploy_dual.py
  python scripts/deploy_dual.py -m "Update copy"

Requires: git, ssh + tar (OpenSSH + Windows tar), deploy.env in repo root (see deploy.env.example).

Upload: one SSH session via tar pipe (not one password prompt per top-level item).
"""

from __future__ import annotations

import argparse
import shlex
import shutil
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


def collect_upload_entries(repo_root: Path) -> list[str]:
    names: list[str] = []
    for child in sorted(repo_root.iterdir(), key=lambda p: p.name.lower()):
        name = child.name
        if name in SCP_SKIP_NAMES:
            continue
        if name.startswith(".") and name not in {".gitignore"}:
            continue
        names.append(name)
    return names


def sync_via_tar_ssh(
    *,
    repo_root: Path,
    user: str,
    host: str,
    remote_path: str,
    ssh_key: str,
    port: str,
    dry_run: bool,
) -> None:
    entries = collect_upload_entries(repo_root)
    rp = remote_path.rstrip("/")
    remote_script = f"mkdir -p {shlex.quote(rp)} && cd {shlex.quote(rp)} && tar -xf -"

    ssh_cmd: list[str] = ["ssh"]
    if port and port != "22":
        ssh_cmd.extend(["-p", port])
    if ssh_key:
        key_path = Path(ssh_key.replace("/", "\\")).expanduser().resolve()
        if not key_path.is_file():
            print(f"Warning: DEPLOY_SSH_KEY missing: {key_path}", file=sys.stderr)
        ssh_cmd.extend(["-i", str(key_path)])
    ssh_cmd.append(f"{user}@{host}")
    ssh_cmd.append(remote_script)

    # ustar: omit Windows pax SCHILY.* headers GNU tar warns about on extract
    tar_cmd = ["tar", "--format", "ustar", "-cf", "-", *entries]

    if dry_run:
        print(f"+ {' '.join(tar_cmd)}  (cwd={repo_root})")
        print(f"+ ssh ... {remote_script!r}")
        return

    if not entries:
        print("Nothing to upload.", file=sys.stderr)
        return

    if not shutil.which("tar") or not shutil.which("ssh"):
        print("Need tar and ssh on PATH.", file=sys.stderr)
        sys.exit(1)

    tar_p = subprocess.Popen(
        tar_cmd,
        cwd=str(repo_root),
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    assert tar_p.stdout is not None
    try:
        subprocess.run(ssh_cmd, stdin=tar_p.stdout, check=True)
    finally:
        tar_p.stdout.close()
        tar_err = tar_p.stderr.read().decode("utf-8", errors="replace") if tar_p.stderr else ""
        tar_rc = tar_p.wait()
        if tar_rc != 0:
            print(f"tar failed ({tar_rc}): {tar_err}", file=sys.stderr)
            sys.exit(tar_rc)


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
        sync_via_tar_ssh(
            repo_root=REPO_ROOT,
            user=user,
            host=host,
            remote_path=remote_path,
            ssh_key=ssh_key,
            port=port,
            dry_run=args.dry_run,
        )

        print("\nDone. GitHub (Pages) updated via push; Aliyun synced via single SSH+tar.")
        print(f"Check: http://{host} (hard refresh: Ctrl+F5)")
    else:
        print("\nSkipped scp (--skip-scp).")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
