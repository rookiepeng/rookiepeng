# Serving zpeng.me from the home Arch Linux box

The site is static: `npm run build` writes plain files to `dist/`, the existing nginx serves them from
a new server block on `127.0.0.1:8088`, and the Cloudflare Tunnel points `zpeng.me` at that port.
WordPress keeps running untouched from `/srv/zpeng` and its own server block until you retire it,
so switching the tunnel's port is both the cutover and the rollback.

A systemd timer pulls `master` every 5 minutes and rebuilds when it has moved, so publishing is
`git push`. No ports are opened on the router.

```
git push ──► GitHub ◄── git fetch (timer, every 5 min) ── deploy.sh ── npm run build ──► /srv/zpeng-static/public
                                                                                                    │
visitor ──► Cloudflare ──► cloudflared ──► nginx 127.0.0.1:8088 ◄───────────────────────────────────┘
```

| Path | What |
| --- | --- |
| `/srv/zpeng` | WordPress (unchanged; remove after the cutover) |
| `/srv/zpeng-static/repo` | git checkout, built by the `zpeng-deploy` user |
| `/srv/zpeng-static/public` | built site, served by nginx (runs as `http`) |

## One-time setup

1. **Back up WordPress first** (keep these until you are sure you won't roll back):
   ```bash
   sudo mariadb-dump --single-transaction <wp_db> | gzip > ~/wp-backup-$(date +%F).sql.gz
   sudo tar czf ~/wp-files-$(date +%F).tgz -C /srv zpeng
   ```
2. **Packages and a free port:**
   ```bash
   sudo pacman -S --needed nodejs npm git rsync
   node -v                          # needs 22.12 or newer
   sudo ss -ltnp | grep 8088        # should print nothing
   ```
   If 8088 is taken, pick another port in `deploy/nginx-zpeng.me.conf` and use it below.
3. **Deploy user, checkout and web root:**
   ```bash
   sudo useradd --system --home-dir /srv/zpeng-static --shell /usr/bin/nologin zpeng-deploy
   sudo install -d -m 755 -o zpeng-deploy -g zpeng-deploy /srv/zpeng-static /srv/zpeng-static/public
   sudo -u zpeng-deploy git clone https://github.com/rookiepeng/rookiepeng.git /srv/zpeng-static/repo
   sudo -u zpeng-deploy bash /srv/zpeng-static/repo/zpeng.me/deploy/deploy.sh --force
   ```
   The directories are world-readable so nginx's `http` user can read the built files.
4. **nginx.** Arch's package has no `sites-enabled` directory by default. If your `/etc/nginx/nginx.conf`
   already includes one (`grep include /etc/nginx/nginx.conf`), use it; otherwise add
   `include sites-enabled/*;` inside its `http { }` block, then:
   ```bash
   sudo mkdir -p /etc/nginx/sites-available /etc/nginx/sites-enabled
   sudo cp /srv/zpeng-static/repo/zpeng.me/deploy/nginx-zpeng.me.conf /etc/nginx/sites-available/zpeng-static.conf
   sudo ln -s /etc/nginx/sites-available/zpeng-static.conf /etc/nginx/sites-enabled/
   sudo nginx -t && sudo systemctl reload nginx
   curl -sI http://127.0.0.1:8088/ | head -1                         # expect 200
   curl -sI http://127.0.0.1:8088/feed/ | head -1                    # expect 301
   curl -sI http://127.0.0.1:8088/publications | grep -i location    # expect a relative /publications/
   curl -sI http://127.0.0.1:8088/nope/ | head -1                    # expect 404 (the site's 404 page)
   ```
   If you'd rather keep everything in `nginx.conf`, paste the `server { }` block from
   `nginx-zpeng.me.conf` into its `http { }` block instead.
5. **Auto-deploy timer:**
   ```bash
   sudo cp /srv/zpeng-static/repo/zpeng.me/deploy/zpeng-deploy.{service,timer} /etc/systemd/system/
   sudo systemctl daemon-reload
   sudo systemctl enable --now zpeng-deploy.timer
   journalctl -u zpeng-deploy -f                       # watch a deploy
   ```

## Cutover

1. Note the tunnel's current `service:` for `zpeng.me` in `/etc/cloudflared/config.yml` (or on the
   tunnel's Public Hostnames page in the Cloudflare dashboard, if it is remotely managed). That is
   the WordPress port you roll back to.
2. Optional dry run over the real tunnel: add a second hostname (for example `new.zpeng.me`)
   pointing at `http://localhost:8088`, and check it in a browser.
3. Change the `zpeng.me` service to `http://localhost:8088`, then `sudo systemctl restart cloudflared`.
4. Cloudflare dashboard → Caching → Purge everything.
5. Check `curl -sI https://zpeng.me/` (no `x-powered-by: PHP`), the Play Store privacy URLs
   (`/privacy-notice-hexapod/`, `/privacy-notice-tx-line-calculator/`, `/privacy-policy/`), and a post's comments.

**Rollback:** point the tunnel back at the WordPress port and restart cloudflared.

## Retiring WordPress

After a couple of weeks without problems:

```bash
sudo rm /etc/nginx/sites-enabled/<wordpress-config>    # or remove its server block from nginx.conf
sudo nginx -t && sudo systemctl reload nginx
sudo systemctl disable --now php-fpm mariadb
```

Keep the backups from step 1, then delete `/srv/zpeng` when you no longer need it. If you want the new
site to take over the `/srv/zpeng` path afterwards, change it in three places: `root` in the nginx
config, `REPO_DIR`/`SITE_DIR` in `zpeng-deploy.service`, and that unit's `ExecStart` path.

## Analytics

Jetpack stats go away with WordPress. Cloudflare Web Analytics is already injected at the edge
(the `cloudflareinsights` beacon on the current site), so it keeps working without any change here.
