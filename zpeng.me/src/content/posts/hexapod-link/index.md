---
title: "Hexapod Link"
date: 2025-10-22
updated: 2026-10-04
description: "A hexapod robot simulator with forward and inverse kinematics and gait animation, that also drives a real RookiDroid hexapod over WiFi in real time. Runs in the browser or as a desktop app."
tags: ["Hexapod", "Python", "Simulation"]
cover: "./home.png"
rawHtml: true
---
<!-- =====================================================================
  Hexapod Link project page (repo: rookidroid/hexapod-link).
  All classes are prefixed "hxl-"; colours come from the site palette in
  src/styles/theme.css. Keep this block free of blank lines, or Markdown
  takes over part way through.
====================================================================== -->
<style>
.hxl{--hxl-gap:56px;max-width:1000px;margin:0 auto;color:var(--text2);line-height:1.65;font-size:1rem}
.hxl *,.hxl *::before,.hxl *::after{box-sizing:border-box}
.hxl h2{font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:1.65rem;line-height:1.25;color:var(--text);margin:0 0 .4rem;padding-left:.7rem;border-left:4px solid var(--accent)}
.hxl h3{font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:1.2rem;color:var(--text);margin:0 0 .5rem}
.hxl p{margin:0 0 .9rem}
.hxl a{color:var(--accent);text-underline-offset:2px}
.hxl a:hover{color:var(--red)}
.hxl code{font-family:var(--mech-mono);font-size:.86em;background:var(--bg3);padding:.08em .35em}
.hxl section{margin-top:var(--hxl-gap)}
.hxl-kick{font-family:var(--mech-mono);font-size:.72rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin:0 0 1.2rem;padding-left:calc(.7rem + 4px)}
/* Armour plate: white panel, navy frame, hard shadow, tricolour trim on top */
.hxl-plate{position:relative;background:var(--surface);border:2px solid var(--frame);box-shadow:var(--shadow-hard)}
.hxl-plate::before{content:'';position:absolute;top:0;left:0;width:100%;height:4px;pointer-events:none;background:repeating-linear-gradient(90deg,var(--yellow) 0 5px,transparent 5px 9px) right 6px top/32px 100% no-repeat,linear-gradient(90deg,var(--red) 0 28px,var(--accent) 28px calc(100% - 44px),transparent calc(100% - 44px))}
/* ── Intro ─────────────────────────────────────────────────────────── */
.hxl-intro{display:grid;grid-template-columns:150px 1fr;gap:32px;align-items:center;padding:36px 36px 32px}
.hxl-intro img{width:150px;height:150px;display:block}
.hxl-lede{font-size:1.08rem;color:var(--text);margin-bottom:1.2rem}
.hxl-actions{display:flex;flex-wrap:wrap;gap:10px}
.hxl-btn{display:inline-flex;align-items:center;gap:.5em;font-family:var(--mech-mono);font-size:.76rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:9px 18px;border:2px solid var(--frame);clip-path:var(--chamfer-clip);text-decoration:none!important;transition:filter .15s,transform .15s}
.hxl-btn:hover{filter:brightness(1.12);transform:translate(-1px,-1px)}
.hxl-btn:active{transform:translate(1px,1px)}
.hxl a.hxl-btn-primary{background:var(--accent);color:#fff}
.hxl a.hxl-btn-dark{background:var(--dark);color:#fff}
.hxl a.hxl-btn-ghost{background:var(--surface);color:var(--text)}
.hxl-btn small{font-weight:400;opacity:.75;letter-spacing:.02em;text-transform:none}
.hxl-fork{display:flex;flex-wrap:wrap;gap:.3rem .8rem;align-items:baseline;background:var(--bg2);border:2px solid var(--frame);border-top:0;padding:10px 20px;font-size:.86rem;color:var(--muted)}
.hxl-fork b{font-family:var(--mech-mono);font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#fff;background:var(--frame);padding:2px 7px;clip-path:var(--chamfer-clip-sm)}
/* ── Screenshot monitor ────────────────────────────────────────────── */
.hxl-monitor{position:relative;background:var(--dark);border:2px solid var(--frame);padding:14px;box-shadow:var(--shadow-hard),0 0 0 1px rgba(91,143,245,.25)}
.hxl-monitor::after{--hud:rgba(91,143,245,.75);--arm:16px;content:'';position:absolute;inset:6px;pointer-events:none;background:linear-gradient(var(--hud),var(--hud)) top left/var(--arm) 2px,linear-gradient(var(--hud),var(--hud)) top left/2px var(--arm),linear-gradient(var(--hud),var(--hud)) top right/var(--arm) 2px,linear-gradient(var(--hud),var(--hud)) top right/2px var(--arm),linear-gradient(var(--hud),var(--hud)) bottom left/var(--arm) 2px,linear-gradient(var(--hud),var(--hud)) bottom left/2px var(--arm),linear-gradient(var(--hud),var(--hud)) bottom right/var(--arm) 2px,linear-gradient(var(--hud),var(--hud)) bottom right/2px var(--arm);background-repeat:no-repeat}
.hxl-monitor img{display:block;width:100%;height:auto;margin:0}
.hxl-hero{display:grid;grid-template-columns:1fr 300px;gap:16px;align-items:stretch}
.hxl-hero .hxl-monitor{display:flex;align-items:center;justify-content:center}
.hxl-hero .hxl-monitor img{max-width:420px}
.hxl-stats{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.hxl-stat{text-align:center;padding:22px 12px 16px;display:flex;flex-direction:column;justify-content:center}
.hxl-stat b{display:block;font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:2.1rem;line-height:1.1;color:var(--accent)}
.hxl-stat span{display:block;font-family:var(--mech-mono);font-size:.7rem;font-weight:600;letter-spacing:.04em;color:var(--muted);margin-top:6px}
/* ── Story ─────────────────────────────────────────────────────────── */
.hxl-story{padding:34px 36px 30px;background:linear-gradient(135deg,var(--bg) 0%,var(--surface) 55%,var(--bg2) 100%)}
.hxl-story p{max-width:720px}
.hxl-story p:last-child{margin-bottom:0}
/* ── Pages gallery ─────────────────────────────────────────────────── */
.hxl-pages{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.hxl-page{display:flex;flex-direction:column}
.hxl-page figure{margin:0;border:2px solid var(--frame);border-bottom:0;background:var(--bg2)}
.hxl-page figure img{display:block;width:100%;height:auto}
.hxl-page > div{flex:1;padding:16px 18px 14px;font-size:.9rem}
.hxl-page h3{font-size:1.12rem;margin-bottom:.3rem}
.hxl-page p{margin:0 0 .6rem}
.hxl-page small{display:inline-block;font-family:var(--mech-mono);font-size:.7rem;font-weight:700;letter-spacing:.04em;color:#fff;background:var(--accent);padding:2px 8px}
.hxl-page small.hxl-flash{background:var(--frame)}
/* ── Real robot ────────────────────────────────────────────────────── */
.hxl-flow{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;counter-reset:hxl-stage}
.hxl-stage{counter-increment:hxl-stage;padding:22px 22px 18px;font-size:.9rem}
.hxl-stage::after{content:'0' counter(hxl-stage);position:absolute;top:14px;right:16px;font-family:var(--mech-mono);font-size:.7rem;font-weight:700;letter-spacing:.12em;color:var(--accent)}
.hxl-stage h3{font-size:1.15rem}
.hxl-stage p:last-child{margin-bottom:0}
.hxl-extras{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px;margin-top:20px}
.hxl-extra{background:var(--surface);border:1px solid var(--border);border-left:4px solid var(--accent);padding:12px 14px;font-size:.88rem}
.hxl-extra strong{display:block;color:var(--text);font-size:.92rem;margin-bottom:.15rem}
.hxl-extra.hxl-warn{border-left-color:var(--red)}
/* ── Architecture pipeline ─────────────────────────────────────────── */
.hxl-pipe{display:grid;grid-template-columns:1fr 34px 1fr 34px 1fr 34px 1fr;align-items:stretch;margin:1.2rem 0 1rem}
.hxl-node{background:var(--mech-bg2);border:1px solid var(--mech-border);color:var(--mech-text);padding:14px 14px 12px;font-size:.84rem;clip-path:var(--chamfer-clip)}
.hxl-node b{display:block;font-family:var(--mech-mono);font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;color:#fff;margin-bottom:.35rem}
.hxl-node.hxl-hot{border-color:var(--dark-accent);box-shadow:inset 0 3px 0 var(--dark-yellow)}
.hxl-link{display:flex;align-items:center;justify-content:center;color:var(--accent);font-family:var(--mech-mono);font-size:1rem;font-weight:700}
.hxl-pipe-note{font-size:.92rem}
.hxl-stack{display:flex;flex-wrap:wrap;gap:6px;margin-top:20px}
.hxl-stack span{font-family:var(--mech-mono);font-size:.72rem;font-weight:600;color:var(--muted);background:var(--bg3);border:1px solid var(--border);padding:3px 9px}
/* ── Get started (cockpit panel) ───────────────────────────────────── */
.hxl-cockpit{position:relative;background:linear-gradient(135deg,#060c18 0%,#0c1730 100%);color:var(--dark-text2);border:2px solid var(--frame);box-shadow:var(--shadow-hard);padding:40px 36px 32px}
.hxl-cockpit::before{content:'';position:absolute;top:0;left:0;width:100%;height:6px;pointer-events:none;background:linear-gradient(90deg,var(--dark-red) 0 160px,transparent 160px),repeating-linear-gradient(90deg,var(--dark-yellow) 0 14px,transparent 14px 22px),var(--dark-accent)}
.hxl .hxl-cockpit h2{color:#fff;border-left-color:var(--dark-red)}
.hxl .hxl-cockpit h3{color:#fff;font-size:1.05rem}
.hxl .hxl-cockpit a{color:var(--dark-accent)}
.hxl .hxl-cockpit a:hover{color:var(--dark-yellow)}
.hxl .hxl-cockpit code{background:rgba(91,143,245,.14);color:var(--dark-text)}
.hxl-cockpit .hxl-kick{color:var(--dark-muted)}
.hxl-cockpit-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:24px}
.hxl-cockpit-grid > div:last-child{grid-column:1/-1}
.hxl-cockpit-grid > div{min-width:0}
.hxl-cockpit-grid p{font-size:.9rem}
.hxl pre{margin:.6rem 0;background:#03070f;color:var(--dark-text);border:1px solid #26314a;padding:.7rem .9rem;overflow-x:auto;font-family:var(--mech-mono);font-size:.8rem;line-height:1.55;clip-path:var(--chamfer-clip)}
.hxl pre code{background:none;padding:0;color:inherit;font-size:inherit}
.hxl-cockpit-note{margin:22px 0 0;padding-top:18px;border-top:1px dashed #26314a;font-size:.9rem}
/* ── Footer strip ──────────────────────────────────────────────────── */
.hxl-foot{margin-top:var(--hxl-gap);display:flex;flex-wrap:wrap;gap:8px 24px;align-items:center;justify-content:space-between;padding:14px 20px;background:var(--bg2);border:2px solid var(--frame);font-family:var(--mech-mono);font-size:.76rem;color:var(--muted)}
/* ── Responsive ────────────────────────────────────────────────────── */
@media(max-width:860px){
.hxl{--hxl-gap:44px}
.hxl-flow,.hxl-cockpit-grid,.hxl-hero{grid-template-columns:1fr}
.hxl-cockpit-grid > div:last-child{grid-column:auto}
.hxl-stats{grid-template-columns:repeat(4,1fr)}
.hxl-pipe{grid-template-columns:1fr;grid-template-rows:auto}
.hxl-link{height:28px;transform:rotate(90deg)}
}
@media(max-width:640px){
.hxl-intro{grid-template-columns:1fr;padding:28px 20px 24px;gap:20px}
.hxl-intro img{width:96px;height:96px}
.hxl-story{padding:28px 20px 24px}
.hxl-cockpit{padding:32px 18px 22px}
.hxl-stats{grid-template-columns:1fr 1fr}
.hxl-pages{grid-template-columns:1fr}
}
</style>
<div class="hxl">
  <!-- Intro -->
  <div class="hxl-plate hxl-intro">
    <img src="./icon.png" alt="Hexapod Link icon" width="150" height="150" />
    <div>
      <p class="hxl-lede">Hexapod Link is a hexapod robot simulator with forward and inverse kinematics and gait animation, and a remote for the real thing: connect it to a <a href="/2024/09/12/hexapod/">RookiDroid hexapod</a> and the same controls drive the physical robot over WiFi, from a single joint up to a whole gait. It runs in the browser or as a desktop app.</p>
      <div class="hxl-actions">
        <a class="hxl-btn hxl-btn-primary" href="https://github.com/rookidroid/hexapod-link">Source on GitHub</a>
        <a class="hxl-btn hxl-btn-dark" href="https://github.com/rookidroid/hexapod-link/actions/workflows/build-desktop.yml">Desktop builds <small>Windows · Linux</small></a>
        <a class="hxl-btn hxl-btn-ghost" href="https://rookidroid.com/">rookidroid.com</a>
      </div>
    </div>
  </div>
  <div class="hxl-fork"><b>Fork</b><span>Built on <a href="https://github.com/mithi/hexapod-robot-simulator">mithi/hexapod-robot-simulator</a>, extended with a desktop app, real-robot control, and a rebuilt test suite.</span></div>
  <!-- Demo -->
  <section>
    <div class="hxl-hero">
      <div class="hxl-monitor">
        <img src="https://raw.githubusercontent.com/rookidroid/hexapod-link/master/docs/images/walk.gif" alt="One tripod gait cycle playing in the 3D view" loading="lazy" />
      </div>
      <div class="hxl-stats">
        <div class="hxl-plate hxl-stat"><b>18</b><span>joints, 3 per leg</span></div>
        <div class="hxl-plate hxl-stat"><b>4</b><span>control pages</span></div>
        <div class="hxl-plate hxl-stat"><b>100 Hz</b><span>pose stream</span></div>
        <div class="hxl-plate hxl-stat"><b>3+</b><span>robots, no app changes</span></div>
      </div>
    </div>
  </section>
  <!-- Overview -->
  <section>
    <div class="hxl-plate hxl-story">
      <h2>Overview</h2>
      <p class="hxl-kick">A simulator that talks to the hardware</p>
      <p>The simulator answers two questions about a six-legged robot. Given the angle of every joint, what does the robot look like? And given where the body should be, what joint angles get it there, and is that pose even possible? It is built from first principles with NumPy, and draws the robot, its center of gravity and its support polygon in an interactive 3D view.</p>
      <p>Hexapod Link adds the hardware side. The poses you set in the simulator stream to an ESP32 hexapod, and the robot's own built-in gaits can be triggered from the same window. Each robot describes itself when the app connects, so Nougat, Mochi, Macaroon, or a new member of the family all work without touching the app.</p>
    </div>
  </section>
  <!-- Pages -->
  <section>
    <h2>Four Ways to Pose It</h2>
    <p class="hxl-kick">Simulate first · then drive the robot</p>
    <div class="hxl-pages">
      <div class="hxl-plate hxl-page">
        <figure><img src="./kinematics.png" alt="The Kinematics page: a table of 18 joint angles beside the 3D hexapod" loading="lazy" /></figure>
        <div><h3>Kinematics</h3><p>Set all 18 joint angles by hand and watch the body follow.</p><small>Streams every pose to the servos</small></div>
      </div>
      <div class="hxl-plate hxl-page">
        <figure><img src="./inverse-kinematics.png" alt="The Inverse Kinematics page: body translation and rotation sliders beside the 3D hexapod" loading="lazy" /></figure>
        <div><h3>Inverse Kinematics</h3><p>Translate and rotate the body; the solver finds the joint angles, or says why it can't.</p><small>Streams once the pose is reachable</small></div>
      </div>
      <div class="hxl-plate hxl-page">
        <figure><img src="./leg-patterns.png" alt="The Leg Patterns page: one set of angles applied to all six legs" loading="lazy" /></figure>
        <div><h3>Leg Patterns</h3><p>Sweep all six legs together through one set of angles.</p><small>Streams every pose to the servos</small></div>
      </div>
      <div class="hxl-plate hxl-page">
        <figure><img src="./motion.png" alt="The Motion page: gait playback controls beside the 3D hexapod" loading="lazy" /></figure>
        <div><h3>Motion</h3><p>Play the generated gaits frame by frame and scrub through them, then run the same motion on the robot.</p><small class="hxl-flash">Runs the robot's own gait from flash</small></div>
      </div>
    </div>
  </section>
  <!-- Real robot -->
  <section>
    <h2>Driving a Real Hexapod</h2>
    <p class="hxl-kick">Flash · join · connect</p>
    <div class="hxl-flow">
      <div class="hxl-plate hxl-stage">
        <h3>Flash the firmware</h3>
        <p>Use the ESP32 firmware from the <a href="https://github.com/rookidroid/hexapod">hexapod repo</a>. It needs to serve its own config at <code>GET /robot_config</code>.</p>
      </div>
      <div class="hxl-plate hxl-stage">
        <h3>Join its WiFi</h3>
        <p>The robot is the access point, so the computer running the app joins it directly. The robot stands up when a client connects.</p>
      </div>
      <div class="hxl-plate hxl-stage">
        <h3>Connect</h3>
        <p>Open the <strong>ROBOT</strong> panel from the status button in the navigation bar and connect to <code>192.168.4.1</code>. The stream and run controls light up on the pages that use them.</p>
      </div>
    </div>
    <div class="hxl-extras">
      <div class="hxl-extra"><strong>The robot brings its own config</strong>Leg geometry, joint limits, servo range, gait radii, speed range and its list of commands all come from the robot. The simulated body switches to match, and the last config is cached so the app still shows that robot offline.</div>
      <div class="hxl-extra"><strong>Built-in gaits or streamed frames</strong>The Motion page can trigger the robot's own gait, played from flash so WiFi can't make it stutter, or stream the simulator's frames for paths the firmware doesn't have. Gait speed runs from 20 to 100 %.</div>
      <div class="hxl-extra"><strong>Calibration</strong>Trim each servo's offset through the robot's calibration routes: enter the calibration posture, apply the offsets, save them to flash, and exit.</div>
      <div class="hxl-extra hxl-warn"><strong>Safety</strong>Put the robot on a stand before streaming. Joint angles are clamped to the robot's mechanical limits and each servo's slew rate is capped, and if the stream stops the robot eases back to standby after 1 s.</div>
    </div>
  </section>
  <!-- Architecture -->
  <section>
    <h2>How It Works</h2>
    <p class="hxl-kick">Plotly Dash front end · NumPy solvers · WiFi link</p>
    <div class="hxl-pipe">
      <div class="hxl-node"><b>UI</b>Plotly Dash pages and the 3D view</div>
      <div class="hxl-link" aria-hidden="true">→</div>
      <div class="hxl-node"><b>Solvers</b>Forward and inverse kinematics, ground contact, gait paths</div>
      <div class="hxl-link" aria-hidden="true">→</div>
      <div class="hxl-node hxl-hot"><b>Robot link</b>Joint angles to servo ticks, clamped and slew-limited</div>
      <div class="hxl-link" aria-hidden="true">→</div>
      <div class="hxl-node"><b>ESP32</b>Config over HTTP, poses over UDP port 1234</div>
    </div>
    <p class="hxl-pipe-note">Legs and joints are numbered the way the firmware numbers them, so a leg picked out in the 3D plot is the leg the calibration page calls by that name. Only the angle convention differs, and the robot link converts it using each leg's mirroring from the robot's config. A fake robot in <code>tools/fake_robot.py</code> stands in for the hardware, and the test suite covers the kinematics, the streaming protocol and config reading without a display, a browser or a robot.</p>
    <div class="hxl-stack">
      <span>Python</span><span>Plotly Dash</span><span>NumPy</span><span>Flask</span><span>waitress</span><span>pywebview</span><span>PyInstaller</span><span>pytest</span><span>GitHub Actions</span>
    </div>
  </section>
  <!-- Get started -->
  <section class="hxl-cockpit">
    <h2>Get Started</h2>
    <p class="hxl-kick">Python 3.13+ · browser or desktop window</p>
    <div class="hxl-cockpit-grid">
      <div>
        <h3>In the browser</h3>
        <p>Start the server and open the printed URL.</p>
<pre><code>pip install -r requirements.txt
python hexapod_link.py --no-window --port 8050</code></pre>
      </div>
      <div>
        <h3>As a desktop app</h3>
        <p>A native window via pywebview, with no browser chrome. Works offline.</p>
<pre><code>pip install -r requirements-desktop.txt
python hexapod_link.py</code></pre>
      </div>
      <div>
        <h3>Without a robot</h3>
        <p>Run the stand-in robot, then connect to <code>127.0.0.1:8080</code>.</p>
<pre><code>python tools/fake_robot.py nougat</code></pre>
      </div>
    </div>
    <p class="hxl-cockpit-note">Prebuilt Windows and Linux bundles (about 130 MB) come out of every <a href="https://github.com/rookidroid/hexapod-link/actions/workflows/build-desktop.yml">build-desktop run</a>, or build your own with <code>pyinstaller hexapod.spec</code> from a minimal virtual environment.</p>
  </section>
  <div class="hxl-foot">
    <span>MIT · forked from mithi/hexapod-robot-simulator</span>
    <span><a href="https://github.com/rookidroid/hexapod-link/issues">Issues</a> · <a href="/2024/09/12/hexapod/">Hexapod</a> · <a href="/2023/03/18/remote-arcade/">Arcade Remote</a></span>
  </div>
</div>
