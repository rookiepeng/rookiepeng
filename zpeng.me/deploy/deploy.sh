#!/usr/bin/env bash
# Builds zpeng.me from the latest master and publishes it to /var/www/zpeng.me.
# Run by zpeng-deploy.timer every few minutes; does nothing when master hasn't moved.
#   deploy.sh          build only if there are new commits
#   deploy.sh --force  rebuild regardless
set -euo pipefail

REPO_DIR="${REPO_DIR:-/srv/zpeng.me/repo}"
SITE_DIR="${SITE_DIR:-/var/www/zpeng.me}"
BRANCH="${BRANCH:-master}"
STAMP="$REPO_DIR/.deployed-rev"

cd "$REPO_DIR"
git fetch --quiet origin "$BRANCH"
REV="$(git rev-parse "origin/$BRANCH")"

if [[ "${1:-}" != "--force" && -f "$STAMP" && "$(cat "$STAMP")" == "$REV" ]]; then
  exit 0
fi

echo "Deploying $REV"
git reset --quiet --hard "$REV"
cd zpeng.me
npm ci --no-audit --no-fund
npm run build
# Publish into place; --delete drops pages that no longer exist
rsync -a --delete --delay-updates dist/ "$SITE_DIR/"
echo "$REV" > "$STAMP"
echo "Deployed $REV"
