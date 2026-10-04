# Serving zpeng.me from the home Linux box

The site is static: `npm run build` writes plain files to `dist/`, Caddy serves them on
`127.0.0.1:8080`, and the existing Cloudflare Tunnel points `zpeng.me` at that port.
A systemd timer pulls `master` every 5 minutes and rebuilds when it has moved, so publishing is
`git push`. No ports are opened on the router.

```
git push ──► GitHub ◄── git fetch (timer, every 5 min) ── deploy.sh ── npm run build ──► /var/www/zpeng.me
                                                                                              │
visitor ──► Cloudflare ──► cloudflared ──► Caddy 127.0.0.1:8080 ◄─────────────────────────────┘
```

## One-time setup (Debian/Ubuntu; adjust package commands for other distros)

1. **Back up WordPress first** (keep these until you are sure you won't roll back):
   ```bash
   mysqldump --single-transaction <wp_db> | gzip > ~/wp-backup-$(date +%F).sql.gz
   tar czf ~/wp-content-$(date +%F).tgz -C /var/www/<wordpress-root> wp-content
   ```
2. **Node.js 22.12+** (from NodeSource or your distro) and **Caddy** (https://caddyserver.com/docs/install), plus `git` and `rsync`.
3. **Deploy user, checkout and web root:**
   ```bash
   sudo useradd --system --create-home --home-dir /srv/zpeng.me zpeng-deploy
   sudo -u zpeng-deploy git clone https://github.com/rookiepeng/rookiepeng.git /srv/zpeng.me/repo
   sudo install -d -o zpeng-deploy -g zpeng-deploy /var/www/zpeng.me
   sudo -u zpeng-deploy /srv/zpeng.me/repo/zpeng.me/deploy/deploy.sh --force
   ```
4. **Caddy:**
   ```bash
   sudo cp /srv/zpeng.me/repo/zpeng.me/deploy/Caddyfile /etc/caddy/Caddyfile   # or import it from your existing one
   sudo systemctl reload caddy
   curl -sI http://127.0.0.1:8080/ | head -1          # expect HTTP/1.1 200 OK
   curl -sI http://127.0.0.1:8080/feed/ | head -1     # expect 301
   ```
5. **Auto-deploy timer:**
   ```bash
   sudo cp /srv/zpeng.me/repo/zpeng.me/deploy/zpeng-deploy.{service,timer} /etc/systemd/system/
   sudo systemctl daemon-reload
   sudo systemctl enable --now zpeng-deploy.timer
   journalctl -u zpeng-deploy -f                       # watch a deploy
   ```

## Cutover

1. Optional dry run over the real tunnel: add a second public hostname (for example
   `new.zpeng.me`) pointing at `http://localhost:8080`, and check it in a browser.
2. In the cloudflared config (`/etc/cloudflared/config.yml`, or the tunnel's Public Hostnames page in
   the Cloudflare dashboard if the tunnel is remotely managed), change the `zpeng.me` service from the
   WordPress port to `http://localhost:8080`, then `sudo systemctl restart cloudflared`.
3. Cloudflare dashboard → Caching → Purge everything.
4. Check `curl -sI https://zpeng.me/` (no `x-powered-by: PHP`), the Play Store privacy URLs
   (`/privacy-notice-hexapod/`, `/privacy-notice-tx-line-calculator/`, `/privacy-policy/`), and a post's comments.

**Rollback:** point the tunnel back at the WordPress port and restart cloudflared.
After a couple of weeks without problems, stop and disable PHP-FPM, MySQL/MariaDB and the WordPress vhost.

## Analytics

Jetpack stats go away with WordPress. Cloudflare Web Analytics is already injected at the edge
(the `cloudflareinsights` beacon on the current site), so it keeps working without any change here.
