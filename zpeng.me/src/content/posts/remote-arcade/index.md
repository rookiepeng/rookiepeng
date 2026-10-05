---
title: "Arcade Remote"
date: 2023-03-18
updated: 2026-10-04
description: "A retro-style arcade controller for robots: a microswitch joystick, five arcade buttons, and an ESP32-C6 in a 3D-printed cabinet, driving the RookiDroid hexapods over WiFi."
tags: ["Hexapod", "Toy", "ESP32", "3D Printing"]
cover: "./arcade_top.jpg"
rawHtml: true
---
<!-- =====================================================================
  Arcade Remote project page (repo: rookidroid/remote-arcade).
  All classes are prefixed "arc-"; colours come from the site palette in
  src/styles/theme.css. Keep this block free of blank lines, or Markdown
  takes over part way through.
====================================================================== -->
<style>
.arc{--arc-gap:56px;max-width:1000px;margin:0 auto;color:var(--text2);line-height:1.65;font-size:1rem}
.arc *,.arc *::before,.arc *::after{box-sizing:border-box}
.arc h2{font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:1.65rem;line-height:1.25;color:var(--text);margin:0 0 .4rem;padding-left:.7rem;border-left:4px solid var(--accent)}
.arc h3{font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:1.2rem;color:var(--text);margin:0 0 .5rem}
.arc p{margin:0 0 .9rem}
.arc a{color:var(--accent);text-underline-offset:2px}
.arc a:hover{color:var(--red)}
.arc code{font-family:var(--mech-mono);font-size:.86em;background:var(--bg3);padding:.08em .35em}
.arc section{margin-top:var(--arc-gap)}
.arc-kick{font-family:var(--mech-mono);font-size:.72rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin:0 0 1.2rem;padding-left:calc(.7rem + 4px)}
/* Armour plate: white panel, navy frame, hard shadow, tricolour trim on top */
.arc-plate{position:relative;background:var(--surface);border:2px solid var(--frame);box-shadow:var(--shadow-hard)}
.arc-plate::before{content:'';position:absolute;top:0;left:0;width:100%;height:4px;pointer-events:none;background:repeating-linear-gradient(90deg,var(--yellow) 0 5px,transparent 5px 9px) right 6px top/32px 100% no-repeat,linear-gradient(90deg,var(--red) 0 28px,var(--accent) 28px calc(100% - 44px),transparent calc(100% - 44px))}
/* ── Intro ─────────────────────────────────────────────────────────── */
.arc-intro{display:grid;grid-template-columns:150px 1fr;gap:32px;align-items:center;padding:36px 36px 32px}
.arc-intro img{width:150px;height:150px;display:block}
.arc-lede{font-size:1.08rem;color:var(--text);margin-bottom:1.2rem}
.arc-actions{display:flex;flex-wrap:wrap;gap:10px}
.arc-btn{display:inline-flex;align-items:center;gap:.5em;font-family:var(--mech-mono);font-size:.76rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:9px 18px;border:2px solid var(--frame);clip-path:var(--chamfer-clip);text-decoration:none!important;transition:filter .15s,transform .15s}
.arc-btn:hover{filter:brightness(1.12);transform:translate(-1px,-1px)}
.arc-btn:active{transform:translate(1px,1px)}
.arc a.arc-btn-primary{background:var(--accent);color:#fff}
.arc a.arc-btn-dark{background:var(--dark);color:#fff}
.arc a.arc-btn-ghost{background:var(--surface);color:var(--text)}
.arc-btn small{font-weight:400;opacity:.75;letter-spacing:.02em;text-transform:none}
/* ── Photos ────────────────────────────────────────────────────────── */
.arc-photos{display:grid;grid-template-columns:1fr 1fr;gap:2px;background:var(--frame);border:2px solid var(--frame);box-shadow:var(--shadow-hard)}
.arc-photos figure{margin:0;background:var(--surface)}
.arc-photos img{display:block;width:100%;height:auto;aspect-ratio:1;object-fit:cover}
.arc-photos figcaption{font-family:var(--mech-mono);font-size:.72rem;letter-spacing:.04em;color:var(--muted);padding:8px 14px 10px}
/* ── Stats ─────────────────────────────────────────────────────────── */
.arc-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:32px}
.arc-stat{text-align:center;padding:22px 12px 16px}
.arc-stat b{display:block;font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:2.1rem;line-height:1.1;color:var(--accent)}
.arc-stat span{display:block;font-family:var(--mech-mono);font-size:.7rem;font-weight:600;letter-spacing:.04em;color:var(--muted);margin-top:6px}
/* ── Story ─────────────────────────────────────────────────────────── */
.arc-story{padding:34px 36px 30px;background:linear-gradient(135deg,var(--bg) 0%,var(--surface) 55%,var(--bg2) 100%)}
.arc-story p{max-width:720px}
.arc-story ul{margin:0;padding-left:1.1rem;max-width:720px}
.arc-story li{margin:.35rem 0}
.arc-story li strong{color:var(--text)}
/* ── Hardware ──────────────────────────────────────────────────────── */
.arc-hw{display:grid;grid-template-columns:5fr 6fr;gap:24px;align-items:start}
.arc-hw figure{margin:0}
.arc-hw figure img{display:block;width:100%;height:auto;border:2px solid var(--frame);box-shadow:var(--shadow-hard)}
.arc-hw figcaption{font-family:var(--mech-mono);font-size:.72rem;color:var(--muted);margin-top:10px}
.arc-parts{display:grid;gap:10px}
.arc-part{background:var(--surface);border:1px solid var(--border);border-left:4px solid var(--accent);padding:10px 14px;font-size:.9rem}
.arc-part strong{display:block;color:var(--text);font-size:.94rem;margin-bottom:.1rem}
.arc-part em{font-style:normal;font-family:var(--mech-mono);font-size:.7rem;font-weight:700;color:#fff;background:var(--frame);padding:1px 6px;margin-left:.4rem;vertical-align:1px}
/* ── Tables ────────────────────────────────────────────────────────── */
.arc-table{width:100%;border-collapse:collapse;font-size:.9rem;background:var(--surface)}
.arc-tablewrap{overflow-x:auto;border:2px solid var(--frame);box-shadow:var(--shadow-hard);margin:1.4rem 0 0}
.arc-table th,.arc-table td{border-bottom:1px solid var(--border);padding:.55rem .8rem;text-align:left;vertical-align:top}
.arc-table thead th{background:var(--frame);color:#fff;font-family:var(--mech-mono);font-size:.7rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border-bottom:0}
.arc-table tbody tr:last-child td,.arc-table tbody tr:last-child th{border-bottom:0}
.arc-table tbody th{color:var(--text);white-space:nowrap}
/* ── Controls ──────────────────────────────────────────────────────── */
.arc-controls{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.arc-ctl{padding:22px 22px 18px}
.arc-ctl h3{font-size:1.15rem}
.arc-ctl dl{margin:0;display:grid;grid-template-columns:auto 1fr;gap:.35rem .8rem;font-size:.88rem}
.arc-ctl dt{font-family:var(--mech-mono);font-size:.74rem;font-weight:700;color:var(--text);white-space:nowrap;padding-top:.12rem}
.arc-ctl dd{margin:0}
.arc-key{display:inline-block;width:.8em;height:.8em;border-radius:50%;border:1px solid rgba(0,0,0,.35);vertical-align:-.05em;margin-right:.35em}
.arc-extras{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px;margin-top:20px}
.arc-extra{background:var(--surface);border:1px solid var(--border);border-left:4px solid var(--red);padding:12px 14px;font-size:.88rem}
.arc-extra strong{display:block;color:var(--text);font-size:.92rem;margin-bottom:.15rem}
/* ── Status LED ────────────────────────────────────────────────────── */
.arc-leds{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;background:var(--mech-border);border:2px solid var(--frame);box-shadow:var(--shadow-hard);margin-top:1.4rem}
.arc-led{display:flex;gap:10px;align-items:flex-start;background:var(--mech-bg2);color:var(--mech-text);padding:12px 14px;font-size:.84rem;line-height:1.45}
.arc-led i{flex:none;width:14px;height:14px;border-radius:50%;margin-top:.15rem;background:var(--c);box-shadow:0 0 8px 1px var(--c)}
.arc-led i.arc-blink{animation:arc-blink 1s steps(1) infinite}
@keyframes arc-blink{50%{opacity:.15}}
@media(prefers-reduced-motion:reduce){.arc-led i.arc-blink{animation:none}}
.arc-led b{display:block;font-family:var(--mech-mono);font-size:.7rem;letter-spacing:.08em;text-transform:uppercase;color:#fff}
/* ── Packet ────────────────────────────────────────────────────────── */
.arc-pipe{display:grid;grid-template-columns:1fr 34px 1fr 34px 1fr 34px 1fr;align-items:stretch;margin:1.2rem 0 1.4rem}
.arc-node{background:var(--mech-bg2);border:1px solid var(--mech-border);color:var(--mech-text);padding:14px 14px 12px;font-size:.84rem;clip-path:var(--chamfer-clip)}
.arc-node b{display:block;font-family:var(--mech-mono);font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;color:#fff;margin-bottom:.35rem}
.arc-node.arc-hot{border-color:var(--dark-accent);box-shadow:inset 0 3px 0 var(--dark-yellow)}
.arc-link{display:flex;align-items:center;justify-content:center;color:var(--accent);font-family:var(--mech-mono);font-size:1rem;font-weight:700}
.arc-bytes{display:grid;grid-template-columns:repeat(7,1fr);border:2px solid var(--frame);box-shadow:var(--shadow-hard);background:var(--surface);font-size:.82rem}
.arc-byte{padding:10px 12px 10px;border-right:1px solid var(--border);min-width:0}
.arc-byte:last-child{border-right:0}
.arc-byte.arc-seq{grid-column:span 4;background:var(--bg3)}
.arc-byte small{display:block;font-family:var(--mech-mono);font-size:.66rem;color:var(--muted);letter-spacing:.06em}
.arc-byte b{display:block;font-family:var(--mech-mono);font-size:.82rem;color:var(--text);margin:.1rem 0}
.arc-note{font-size:.92rem;margin-top:1.3rem}
/* ── Get started (cockpit panel) ───────────────────────────────────── */
.arc-cockpit{position:relative;background:linear-gradient(135deg,#060c18 0%,#0c1730 100%);color:var(--dark-text2);border:2px solid var(--frame);box-shadow:var(--shadow-hard);padding:40px 36px 32px}
.arc-cockpit::before{content:'';position:absolute;top:0;left:0;width:100%;height:6px;pointer-events:none;background:linear-gradient(90deg,var(--dark-red) 0 160px,transparent 160px),repeating-linear-gradient(90deg,var(--dark-yellow) 0 14px,transparent 14px 22px),var(--dark-accent)}
.arc .arc-cockpit h2{color:#fff;border-left-color:var(--dark-red)}
.arc .arc-cockpit h3{color:#fff;font-size:1.05rem}
.arc .arc-cockpit a{color:var(--dark-accent)}
.arc .arc-cockpit a:hover{color:var(--dark-yellow)}
.arc .arc-cockpit code{background:rgba(91,143,245,.14);color:var(--dark-text)}
.arc-cockpit .arc-kick{color:var(--dark-muted)}
.arc-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:8px;counter-reset:arc-step}
.arc-step{counter-increment:arc-step;background:rgba(255,255,255,.035);border:1px solid #26314a;padding:16px 18px 14px;font-size:.9rem}
.arc-step b{display:block;font-family:var(--mech-mono);font-size:.7rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--dark-yellow);margin-bottom:.35rem}
.arc-step b::before{content:'0' counter(arc-step) ' · ';color:var(--dark-muted)}
.arc-step p{margin:0}
.arc pre{margin:.6rem 0;background:#03070f;color:var(--dark-text);border:1px solid #26314a;padding:.7rem .9rem;overflow-x:auto;font-family:var(--mech-mono);font-size:.8rem;line-height:1.55;clip-path:var(--chamfer-clip)}
.arc pre code{background:none;padding:0;color:inherit;font-size:inherit}
.arc-sub{margin-top:28px;padding-top:22px;border-top:1px dashed #26314a;display:grid;grid-template-columns:1fr 1fr;gap:28px}
.arc-sub > div{min-width:0}
.arc-sub p,.arc-sub li{font-size:.9rem}
.arc-sub ul{margin:0 0 .9rem;padding-left:1.1rem}
.arc-robots{width:100%;border-collapse:collapse;font-size:.86rem;margin-top:.4rem}
.arc-robots th,.arc-robots td{text-align:left;padding:.35rem .5rem;border-bottom:1px solid #26314a}
.arc-robots thead th{font-family:var(--mech-mono);font-size:.66rem;letter-spacing:.1em;text-transform:uppercase;color:var(--dark-muted)}
.arc-robots tbody th{color:#fff;font-weight:400}
.arc-stack{display:flex;flex-wrap:wrap;gap:6px;margin-top:20px}
.arc-stack span{font-family:var(--mech-mono);font-size:.72rem;font-weight:600;color:var(--muted);background:var(--bg3);border:1px solid var(--border);padding:3px 9px}
/* ── Footer strip ──────────────────────────────────────────────────── */
.arc-foot{margin-top:var(--arc-gap);display:flex;flex-wrap:wrap;gap:8px 24px;align-items:center;justify-content:space-between;padding:14px 20px;background:var(--bg2);border:2px solid var(--frame);font-family:var(--mech-mono);font-size:.76rem;color:var(--muted)}
/* ── Responsive ────────────────────────────────────────────────────── */
@media(max-width:860px){
.arc{--arc-gap:44px}
.arc-controls,.arc-steps,.arc-sub,.arc-hw{grid-template-columns:1fr}
.arc-stats,.arc-leds{grid-template-columns:repeat(2,1fr)}
.arc-pipe{grid-template-columns:1fr;grid-template-rows:auto}
.arc-link{height:28px;transform:rotate(90deg)}
}
@media(max-width:640px){
.arc-intro{grid-template-columns:1fr;padding:28px 20px 24px;gap:20px}
.arc-intro img{width:96px;height:96px}
.arc-photos{grid-template-columns:1fr}
.arc-story{padding:28px 20px 24px}
.arc-cockpit{padding:32px 18px 22px}
.arc-bytes{grid-template-columns:repeat(3,1fr)}
.arc-byte{border-bottom:1px solid var(--border)}
.arc-byte:nth-child(4){order:1;border-right:0}
.arc-byte.arc-seq{grid-column:span 3;order:2;border:0}
}
</style>
<div class="arc">
  <!-- Intro -->
  <div class="arc-plate arc-intro">
    <img src="./icon.svg" alt="Arcade Remote icon" width="150" height="150" />
    <div>
      <p class="arc-lede">The Arcade Remote turns real arcade hardware into a WiFi controller for robots: a microswitch joystick, five snap-in arcade buttons, and an ESP32-C6, all in a 3D-printed cabinet that fits in your hands. It drives every <a href="/2024/09/12/hexapod/">RookiDroid hexapod</a>, and any other robot that speaks the same UDP protocol.</p>
      <div class="arc-actions">
        <a class="arc-btn arc-btn-primary" href="https://rookidroid.com/build-the-arcade-remote/">Build guide <small>rookidroid.com</small></a>
        <a class="arc-btn arc-btn-dark" href="https://github.com/rookidroid/remote-arcade">Source on GitHub</a>
        <a class="arc-btn arc-btn-ghost" href="https://rookidroid.com/product/arcade-controller/">3D print files <small>free</small></a>
      </div>
    </div>
  </div>
  <!-- Photos -->
  <section>
    <div class="arc-photos">
      <figure><img src="./arcade_top.jpg" alt="Arcade Remote from above: a blue ball-top joystick on the left, a cluster of red, yellow, white and blue buttons on the right, and a black special button, on a black panel over a red cabinet" loading="lazy" /><figcaption>Top panel · joystick, direction cluster, special button</figcaption></figure>
      <figure><img src="./arcade_back.jpg" alt="Back of the red Arcade Remote cabinet with its magnetic cover removed, showing the 9 V battery in its bay" loading="lazy" /><figcaption>Back · magnetic battery bay with a 9 V battery</figcaption></figure>
    </div>
    <div class="arc-stats">
      <div class="arc-plate arc-stat"><b>9</b><span>microswitches</span></div>
      <div class="arc-plate arc-stat"><b>5 ms</b><span>input scan</span></div>
      <div class="arc-plate arc-stat"><b>20 Hz</b><span>heartbeat to the robot</span></div>
      <div class="arc-plate arc-stat"><b>5</b><span>speed levels</span></div>
    </div>
  </section>
  <!-- Overview -->
  <section>
    <div class="arc-plate arc-story">
      <h2>Overview</h2>
      <p class="arc-kick">An arcade stick for a six-legged robot</p>
      <p>Each RookiDroid hexapod (Nougat, Mochi and Macaroon) hosts its own WiFi access point and listens for UDP commands. The Arcade Remote joins that access point directly, with no router in between, and sends the robot one command at a time, built from whatever the joystick and buttons are doing. Switching robots means changing a single line in the sketch.</p>
      <ul>
        <li><strong>Real arcade feel:</strong> a microswitch joystick and five snap-in arcade buttons. No analog sticks and no deadzone.</li>
        <li><strong>All-digital inputs:</strong> nine switches on <code>INPUT_PULLUP</code> GPIOs, scanned every 5 ms. A command has to hold for 30 ms before it is sent, which filters switch bounce and half-pressed combos.</li>
        <li><strong>Stops when you let go:</strong> a new command goes out as soon as it settles, and the current one repeats every 50 ms, so releasing the controls stops the robot right away.</li>
        <li><strong>Adjustable speed:</strong> five levels from 20 % to 100 % of the robot's gait speed, remembered across power cycles.</li>
        <li><strong>Battery powered:</strong> a single 9 V battery in a bay closed by a magnetic cover, no screws.</li>
      </ul>
    </div>
  </section>
  <!-- Hardware -->
  <section>
    <h2>Hardware</h2>
    <p class="arc-kick">ESP32-C6 · arcade parts · one print project</p>
    <div class="arc-hw">
      <figure>
        <img src="./arcade_front.jpg" alt="Underside of the Arcade Remote top panel, with the joystick and five buttons wired to the small controller board" loading="lazy" />
        <figcaption>Under the panel: one wire per button, plus the joystick harness</figcaption>
      </figure>
      <div class="arc-parts">
        <div class="arc-part"><strong>Controller board<em>×1</em></strong>ESP32-C6 SuperMini on a carrier board with a Mini360 buck converter (9 V to 5 V), a power switch, a battery terminal, a 5-pin joystick header and a 2×7 button header. <a href="https://rookidroid.com/product/arcade-controller-board/">Available here</a>, or wire the switches straight to a bare SuperMini.</div>
        <div class="arc-part"><strong>Arcade joystick<em>×1</em></strong>Microswitch stick with a ball top and a 5-pin harness. Fit the 8-way gate if you want diagonals.</div>
        <div class="arc-part"><strong>Arcade push buttons<em>×5</em></strong>30 mm snap-in buttons with microswitches: four for the direction cluster and one for the special (modifier) button.</div>
        <div class="arc-part"><strong>Power<em>9 V</em></strong>A 9 V battery and a snap connector screwed into the terminal block, with four 6 × 2 mm magnets to hold the battery cover.</div>
        <div class="arc-part"><strong>Cabinet<em>PLA</em></strong>Body, top cover, bottom plate and battery cover, all in one Bambu Studio project, plus the Fusion 360 source. The cover is multi-material, so the logo and outlines print in a second color.</div>
      </div>
    </div>
    <div class="arc-tablewrap">
      <table class="arc-table">
        <thead><tr><th>Input</th><th>Signal</th><th>GPIO</th><th>Header</th></tr></thead>
        <tbody>
          <tr><th>Joystick up / down / left / right</th><td><code>JS_UP</code> <code>JS_DOWN</code> <code>JS_LEFT</code> <code>JS_RIGHT</code></td><td><code>GP3</code> <code>GP2</code> <code>GP0</code> <code>GP1</code></td><td>5-pin joystick</td></tr>
          <tr><th>Buttons up / down / left / right</th><td><code>BT_UP</code> <code>BT_DOWN</code> <code>BT_LEFT</code> <code>BT_RIGHT</code></td><td><code>GP14</code> <code>GP15</code> <code>GP18</code> <code>GP19</code></td><td>2×7 button</td></tr>
          <tr><th>Special button</th><td><code>BT_SPECIAL</code></td><td><code>GP20</code></td><td>2×7 button</td></tr>
          <tr><th>Status LED</th><td><code>PIN_RGB</code></td><td><code>GP8</code></td><td>WS2812 on the SuperMini</td></tr>
        </tbody>
      </table>
    </div>
    <p class="arc-note">Every input is a plain switch to ground: the firmware enables the internal pull-ups, so one terminal goes to the signal pin and the other to any <code>GND</code> pin.</p>
  </section>
  <!-- Controls -->
  <section>
    <h2>Controls</h2>
    <p class="arc-kick">One command at a time · nothing pressed means stand by</p>
    <div class="arc-controls">
      <div class="arc-plate arc-ctl">
        <h3>Joystick</h3>
        <p>Walks in eight directions, and takes priority over the direction buttons.</p>
        <dl>
          <dt>Up / Down</dt><dd>Walk forward / backward</dd>
          <dt>Left / Right</dt><dd>Sidestep left / right</dd>
          <dt>Diagonals</dt><dd>Walk at 45° and 135° either side</dd>
        </dl>
      </div>
      <div class="arc-plate arc-ctl">
        <h3>Direction buttons</h3>
        <p>Used when the joystick is centered.</p>
        <dl>
          <dt><span class="arc-key" style="background:#e53935"></span>Up</dt><dd>Walk forward</dd>
          <dt><span class="arc-key" style="background:#2f7fd8"></span>Down</dt><dd>Walk backward</dd>
          <dt><span class="arc-key" style="background:#fbc02d"></span>Left</dt><dd>Turn left in place</dd>
          <dt><span class="arc-key" style="background:#e6e8ec"></span>Right</dt><dd>Turn right in place</dd>
        </dl>
      </div>
      <div class="arc-plate arc-ctl">
        <h3>Special + button</h3>
        <p>Holding special turns the cluster into body motion.</p>
        <dl>
          <dt>+ Up</dt><dd>Body pitch</dd>
          <dt>+ Left</dt><dd>Body roll</dd>
          <dt>+ Right</dt><dd>Body yaw</dd>
          <dt>+ Down</dt><dd>Body twist</dd>
        </dl>
      </div>
    </div>
    <div class="arc-extras">
      <div class="arc-extra"><strong>Turbo</strong>Hold the up button while pushing the joystick up to run forward fast, or the down button while pulling it down to run backward fast.</div>
      <div class="arc-extra"><strong>Speed</strong>Hold special and flick the joystick up or down to step between 20, 40, 60, 80 and 100 %. The level is saved in flash and sent with every packet, so the robot always follows the remote.</div>
      <div class="arc-extra"><strong>Forgiving combos</strong>Because a command must hold for 30 ms, special + up doesn't have to be pressed perfectly together: the robot gets the finished combo, not whichever switch closed first.</div>
    </div>
    <div class="arc-leds" role="list" aria-label="Status LED colors">
      <div class="arc-led" role="listitem"><i class="arc-blink" style="--c:#3d7bff"></i><span><b>Blinking blue</b>Connecting to the robot</span></div>
      <div class="arc-led" role="listitem"><i class="arc-blink" style="--c:#ff3b3b"></i><span><b>Blinking red</b>WiFi lost, retrying</span></div>
      <div class="arc-led" role="listitem"><i style="--c:#2ee86a"></i><span><b>Green</b>Connected, standing by</span></div>
      <div class="arc-led" role="listitem"><i style="--c:#2fe3f0"></i><span><b>Cyan</b>Walking or turning</span></div>
      <div class="arc-led" role="listitem"><i style="--c:#ffd23f"></i><span><b>Yellow</b>Turbo</span></div>
      <div class="arc-led" role="listitem"><i style="--c:#ff4bd8"></i><span><b>Magenta</b>Body motion</span></div>
      <div class="arc-led" role="listitem"><i style="--c:#ffffff"></i><span><b>White flash</b>Speed level changed</span></div>
      <div class="arc-led" role="listitem"><i style="--c:#7f8eab;box-shadow:none;opacity:.5"></i><span><b>Brightness</b>Dim at 20 %, brightest at 100 %</span></div>
    </div>
  </section>
  <!-- How it works -->
  <section>
    <h2>How It Works</h2>
    <p class="arc-kick">Switches to UDP in four steps</p>
    <div class="arc-pipe">
      <div class="arc-node"><b>Scan</b>All nine switches read every 5 ms</div>
      <div class="arc-link" aria-hidden="true">→</div>
      <div class="arc-node"><b>Map</b>The switch states become exactly one command</div>
      <div class="arc-link" aria-hidden="true">→</div>
      <div class="arc-node arc-hot"><b>Settle</b>Sent once it has held for 30 ms, then every 50 ms</div>
      <div class="arc-link" aria-hidden="true">→</div>
      <div class="arc-node"><b>Robot</b>UDP to <code style="background:none;padding:0;color:inherit">192.168.4.1:1234</code> on the robot's own AP</div>
    </div>
    <div class="arc-bytes">
      <div class="arc-byte"><small>byte 0</small><b>magic</b>0xA5</div>
      <div class="arc-byte"><small>byte 1</small><b>cmd</b>0–18</div>
      <div class="arc-byte arc-seq"><small>bytes 2–5</small><b>seq_num</b>uint32, counts every packet</div>
      <div class="arc-byte"><small>byte 6</small><b>speed</b>20–100 %</div>
    </div>
    <p class="arc-note">Each packet is 7 bytes, little-endian and unpadded, and matches <code>UdpControlPacket</code> in the <a href="https://github.com/rookidroid/hexapod#sending-udp-commands">hexapod firmware</a>. The speed byte needs hexapod firmware with motion-speed support; older firmware only accepts the 6-byte packet, so update the robot too. The remote connects in the background and keeps retrying, so the robot and the remote can be powered up in either order.</p>
    <div class="arc-stack">
      <span>ESP32-C6</span><span>Arduino</span><span>WiFi</span><span>UDP</span><span>Adafruit NeoPixel</span><span>Bambu Studio</span><span>Fusion 360</span>
    </div>
  </section>
  <!-- Get started -->
  <section class="arc-cockpit">
    <h2>Build One</h2>
    <p class="arc-kick">Print · wire · flash</p>
    <div class="arc-steps">
      <div class="arc-step"><b>Print</b><p>Open <code>arcade.3mf</code> in Bambu Studio: PLA, 0.2 mm layers, 0.4 mm nozzle. No AMS? Print the cover in a single color.</p></div>
      <div class="arc-step"><b>Assemble</b><p>Snap the buttons into the cover, bolt the joystick down with M4 hardware, mount the board on M2 standoffs, then close the cabinet with M3 screws.</p></div>
      <div class="arc-step"><b>Flash</b><p>Upload <code>software/arcade/arcade.ino</code> with Arduino IDE 2.x, the esp32 board package 3.x, and the Adafruit NeoPixel library.</p></div>
    </div>
    <div class="arc-sub">
      <div>
        <h3>Point it at your robot</h3>
        <p>Edit the top of the sketch. Every hexapod hosts its AP at <code>192.168.4.1</code> on port <code>1234</code>, so usually only the SSID changes:</p>
<pre><code>const char *ssid = "hexapod_nougat";
const char *password = "hexapod_1234";
const IPAddress udpAddress(192, 168, 4, 1);
const int udpPort = 1234;</code></pre>
      </div>
      <div>
        <h3>Robots it drives</h3>
        <table class="arc-robots">
          <thead><tr><th>Robot</th><th>ssid</th><th>Guide</th></tr></thead>
          <tbody>
            <tr><th>Nougat</th><td><code>hexapod_nougat</code></td><td><a href="https://rookidroid.com/build-your-own-nougat/">Build</a></td></tr>
            <tr><th>Mochi</th><td><code>hexapod</code></td><td><a href="https://rookidroid.com/build-your-own-mochi/">Build</a></td></tr>
            <tr><th>Macaroon</th><td><code>hexapod_macaroon</code></td><td><a href="https://rookidroid.com/build-your-own-macaroon/">Build</a></td></tr>
          </tbody>
        </table>
        <p style="margin-top:.9rem">Select <strong>ESP32C6 Dev Module</strong> as the board. If the port never shows up, hold BOOT, tap RESET, release BOOT, and upload again. The step-by-step version with photos is the <a href="https://rookidroid.com/build-the-arcade-remote/">Build the Arcade Remote</a> guide.</p>
      </div>
    </div>
  </section>
  <div class="arc-foot">
    <span>MIT license · feedback welcome</span>
    <span><a href="https://github.com/rookidroid/remote-arcade/issues">Issues</a> · <a href="https://rookidroid.com/build-the-arcade-remote/">Build guide</a> · <a href="/2024/09/12/hexapod/">Hexapod</a></span>
  </div>
</div>
