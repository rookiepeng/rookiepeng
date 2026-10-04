---
title: "BeamScope"
date: 2019-02-11
updated: 2026-10-04
description: "A desktop tool for designing antenna arrays: set the elements, window, and beam steering, and the radiation pattern updates in 2D and 3D as you go. Formerly Antenna Array Analysis."
tags: ["Antenna Array", "Python", "Simulation"]
cover: "./icon.svg"
rawHtml: true
wpId: 3874
---
<!-- =====================================================================
  BeamScope project page (formerly Antenna Array Analysis).
  All classes are prefixed "bsc-"; colours come from the site palette in
  src/styles/theme.css. Keep this block free of blank lines, or Markdown
  takes over part way through.
====================================================================== -->
<style>
.bsc{--bsc-gap:56px;max-width:1000px;margin:0 auto;color:var(--text2);line-height:1.65;font-size:1rem}
.bsc *,.bsc *::before,.bsc *::after{box-sizing:border-box}
.bsc h2{font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:1.65rem;line-height:1.25;color:var(--text);margin:0 0 .4rem;padding-left:.7rem;border-left:4px solid var(--accent)}
.bsc h3{font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:1.2rem;color:var(--text);margin:0 0 .5rem}
.bsc p{margin:0 0 .9rem}
.bsc a{color:var(--accent);text-underline-offset:2px}
.bsc a:hover{color:var(--red)}
.bsc code{font-family:var(--mech-mono);font-size:.86em;background:var(--bg3);padding:.08em .35em}
.bsc section{margin-top:var(--bsc-gap)}
.bsc-kick{font-family:var(--mech-mono);font-size:.72rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin:0 0 1.2rem;padding-left:calc(.7rem + 4px)}
/* Armour plate: white panel, navy frame, hard shadow, tricolour trim on top */
.bsc-plate{position:relative;background:var(--surface);border:2px solid var(--frame);box-shadow:var(--shadow-hard)}
.bsc-plate::before{content:'';position:absolute;top:0;left:0;width:100%;height:4px;pointer-events:none;background:repeating-linear-gradient(90deg,var(--yellow) 0 5px,transparent 5px 9px) right 6px top/32px 100% no-repeat,linear-gradient(90deg,var(--red) 0 28px,var(--accent) 28px calc(100% - 44px),transparent calc(100% - 44px))}
/* ── Intro ─────────────────────────────────────────────────────────── */
.bsc-intro{display:grid;grid-template-columns:150px 1fr;gap:32px;align-items:center;padding:36px 36px 32px}
.bsc-intro img{width:150px;height:150px;display:block}
.bsc-lede{font-size:1.08rem;color:var(--text);margin-bottom:1.2rem}
.bsc-actions{display:flex;flex-wrap:wrap;gap:10px}
.bsc-btn{display:inline-flex;align-items:center;gap:.5em;font-family:var(--mech-mono);font-size:.76rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:9px 18px;border:2px solid var(--frame);clip-path:var(--chamfer-clip);text-decoration:none!important;transition:filter .15s,transform .15s}
.bsc-btn:hover{filter:brightness(1.12);transform:translate(-1px,-1px)}
.bsc-btn:active{transform:translate(1px,1px)}
.bsc a.bsc-btn-primary{background:var(--accent);color:#fff}
.bsc a.bsc-btn-dark{background:var(--dark);color:#fff}
.bsc a.bsc-btn-ghost{background:var(--surface);color:var(--text)}
.bsc-btn small{font-weight:400;opacity:.75;letter-spacing:.02em;text-transform:none}
.bsc-renamed{display:flex;flex-wrap:wrap;gap:.3rem .8rem;align-items:baseline;background:var(--bg2);border:2px solid var(--frame);border-top:0;padding:10px 20px;font-size:.86rem;color:var(--muted)}
.bsc-renamed b{font-family:var(--mech-mono);font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#fff;background:var(--frame);padding:2px 7px;clip-path:var(--chamfer-clip-sm)}
/* ── Screenshot monitor ────────────────────────────────────────────── */
.bsc-monitor{position:relative;background:var(--dark);border:2px solid var(--frame);padding:14px;box-shadow:var(--shadow-hard),0 0 0 1px rgba(91,143,245,.25)}
.bsc-monitor::after{--hud:rgba(91,143,245,.75);--arm:16px;content:'';position:absolute;inset:6px;pointer-events:none;background:linear-gradient(var(--hud),var(--hud)) top left/var(--arm) 2px,linear-gradient(var(--hud),var(--hud)) top left/2px var(--arm),linear-gradient(var(--hud),var(--hud)) top right/var(--arm) 2px,linear-gradient(var(--hud),var(--hud)) top right/2px var(--arm),linear-gradient(var(--hud),var(--hud)) bottom left/var(--arm) 2px,linear-gradient(var(--hud),var(--hud)) bottom left/2px var(--arm),linear-gradient(var(--hud),var(--hud)) bottom right/var(--arm) 2px,linear-gradient(var(--hud),var(--hud)) bottom right/2px var(--arm);background-repeat:no-repeat}
.bsc-monitor img{display:block;width:100%;height:auto;margin:0;background:#0b1222}
/* ── Stats ─────────────────────────────────────────────────────────── */
.bsc-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:32px}
.bsc-stat{text-align:center;padding:22px 12px 16px}
.bsc-stat b{display:block;font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:2.1rem;line-height:1.1;color:var(--accent)}
.bsc-stat span{display:block;font-family:var(--mech-mono);font-size:.7rem;font-weight:600;letter-spacing:.04em;color:var(--muted);margin-top:6px}
/* ── Story ─────────────────────────────────────────────────────────── */
.bsc-story{padding:34px 36px 30px;background:linear-gradient(135deg,var(--bg) 0%,var(--surface) 55%,var(--bg2) 100%)}
.bsc-story p{max-width:720px}
.bsc-story p:last-child{margin-bottom:0}
/* ── Workflow: three numbered stages ───────────────────────────────── */
.bsc-flow{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;counter-reset:bsc-stage}
.bsc-stage{counter-increment:bsc-stage;padding:22px 22px 18px}
.bsc-stage::after{content:'0' counter(bsc-stage);position:absolute;top:14px;right:16px;font-family:var(--mech-mono);font-size:.7rem;font-weight:700;letter-spacing:.12em;color:var(--accent)}
.bsc-stage h3{font-size:1.15rem}
.bsc-stage p{font-size:.9rem}
.bsc-stage ul{margin:0;padding-left:1.1rem;font-size:.9rem}
.bsc-stage li{margin:.3rem 0}
.bsc-stage li strong{color:var(--text)}
/* ── Window table ──────────────────────────────────────────────────── */
.bsc-table{width:100%;border-collapse:collapse;font-size:.9rem;background:var(--surface)}
.bsc-tablewrap{overflow-x:auto;border:2px solid var(--frame);box-shadow:var(--shadow-hard);margin:1.2rem 0 0}
.bsc-table th,.bsc-table td{border-bottom:1px solid var(--border);padding:.6rem .8rem;text-align:left;vertical-align:top}
.bsc-table thead th{background:var(--frame);color:#fff;font-family:var(--mech-mono);font-size:.7rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border-bottom:0}
.bsc-table tbody tr:last-child td,.bsc-table tbody tr:last-child th{border-bottom:0}
.bsc-table tbody th{color:var(--text);white-space:nowrap}
.bsc-knob{font-family:var(--mech-mono);font-size:.72rem;font-weight:700;color:#fff;background:var(--accent);padding:2px 7px;white-space:nowrap}
.bsc-none{font-family:var(--mech-mono);font-size:.72rem;color:var(--muted)}
/* ── Plot views ────────────────────────────────────────────────────── */
.bsc-views{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;background:var(--frame);border:2px solid var(--frame);box-shadow:var(--shadow-hard)}
.bsc-view{background:var(--surface);padding:16px 16px 14px;font-size:.86rem;color:var(--muted)}
.bsc-view svg{display:block;width:100%;height:84px;margin-bottom:10px;background:var(--mech-bg);border:1px solid var(--mech-border)}
.bsc-view strong{display:block;color:var(--text);font-size:.95rem;margin-bottom:.2rem}
.bsc-extras{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;margin-top:20px}
.bsc-extra{background:var(--surface);border:1px solid var(--border);border-left:4px solid var(--accent);padding:12px 14px;font-size:.88rem}
.bsc-extra strong{display:block;color:var(--text);font-size:.92rem;margin-bottom:.15rem}
/* ── Architecture pipeline ─────────────────────────────────────────── */
.bsc-pipe{display:grid;grid-template-columns:1fr 34px 1fr 34px 1fr 34px 1fr;align-items:stretch;margin:1.2rem 0 1rem}
.bsc-node{background:var(--mech-bg2);border:1px solid var(--mech-border);color:var(--mech-text);padding:14px 14px 12px;font-size:.84rem;clip-path:var(--chamfer-clip)}
.bsc-node b{display:block;font-family:var(--mech-mono);font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;color:#fff;margin-bottom:.35rem}
.bsc-node.bsc-hot{border-color:var(--dark-accent);box-shadow:inset 0 3px 0 var(--dark-yellow)}
.bsc-link{display:flex;align-items:center;justify-content:center;color:var(--accent);font-family:var(--mech-mono);font-size:1rem;font-weight:700}
.bsc-pipe-note{font-size:.92rem}
/* ── Get started (cockpit panel) ───────────────────────────────────── */
.bsc-cockpit{position:relative;background:linear-gradient(135deg,#060c18 0%,#0c1730 100%);color:var(--dark-text2);border:2px solid var(--frame);box-shadow:var(--shadow-hard);padding:40px 36px 32px}
.bsc-cockpit::before{content:'';position:absolute;top:0;left:0;width:100%;height:6px;pointer-events:none;background:linear-gradient(90deg,var(--dark-red) 0 160px,transparent 160px),repeating-linear-gradient(90deg,var(--dark-yellow) 0 14px,transparent 14px 22px),var(--dark-accent)}
.bsc .bsc-cockpit h2{color:#fff;border-left-color:var(--dark-red)}
.bsc .bsc-cockpit h3{color:#fff;font-size:1.05rem}
.bsc .bsc-cockpit a{color:var(--dark-accent)}
.bsc .bsc-cockpit a:hover{color:var(--dark-yellow)}
.bsc .bsc-cockpit code{background:rgba(91,143,245,.14);color:var(--dark-text)}
.bsc-cockpit .bsc-kick{color:var(--dark-muted)}
.bsc-platforms{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:8px}
.bsc-platform{background:rgba(255,255,255,.035);border:1px solid #26314a;padding:16px 18px 14px;font-size:.9rem}
.bsc-platform b{display:block;font-family:var(--mech-mono);font-size:.7rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--dark-yellow);margin-bottom:.35rem}
.bsc-platform p{margin:0}
.bsc-cockpit-note{margin:16px 0 0;font-size:.9rem}
.bsc pre{margin:.6rem 0;background:#03070f;color:var(--dark-text);border:1px solid #26314a;padding:.7rem .9rem;overflow-x:auto;font-family:var(--mech-mono);font-size:.8rem;line-height:1.55;clip-path:var(--chamfer-clip)}
.bsc pre code{background:none;padding:0;color:inherit;font-size:inherit}
.bsc-sub{margin-top:28px;padding-top:22px;border-top:1px dashed #26314a;display:grid;grid-template-columns:1fr 1fr;gap:28px}
.bsc-sub > div{min-width:0}
.bsc-sub p{font-size:.9rem}
.bsc-stack{display:flex;flex-wrap:wrap;gap:6px;margin-top:20px}
.bsc-stack span{font-family:var(--mech-mono);font-size:.72rem;font-weight:600;color:var(--muted);background:var(--bg3);border:1px solid var(--border);padding:3px 9px}
/* ── Footer strip ──────────────────────────────────────────────────── */
.bsc-foot{margin-top:var(--bsc-gap);display:flex;flex-wrap:wrap;gap:8px 24px;align-items:center;justify-content:space-between;padding:14px 20px;background:var(--bg2);border:2px solid var(--frame);font-family:var(--mech-mono);font-size:.76rem;color:var(--muted)}
/* ── Responsive ────────────────────────────────────────────────────── */
@media(max-width:860px){
.bsc{--bsc-gap:44px}
.bsc-flow,.bsc-platforms,.bsc-sub{grid-template-columns:1fr}
.bsc-stats,.bsc-views{grid-template-columns:repeat(2,1fr)}
.bsc-pipe{grid-template-columns:1fr;grid-template-rows:auto}
.bsc-link{height:28px;transform:rotate(90deg)}
}
@media(max-width:640px){
.bsc-intro{grid-template-columns:1fr;padding:28px 20px 24px;gap:20px}
.bsc-intro img{width:96px;height:96px}
.bsc-story{padding:28px 20px 24px}
.bsc-cockpit{padding:32px 18px 22px}
}
</style>
<div class="bsc">
  <!-- Intro -->
  <div class="bsc-plate bsc-intro">
    <img src="./icon.svg" alt="BeamScope logo" width="150" height="150" />
    <div>
      <p class="bsc-lede">BeamScope is a desktop tool for designing antenna arrays. Set the element count, spacing, window, and steering angle, and the radiation pattern updates right away in 2D and 3D, without writing a script for each experiment.</p>
      <div class="bsc-actions">
        <a class="bsc-btn bsc-btn-primary" href="https://github.com/rookiepeng/beamscope/releases/latest">Download <small>Windows · macOS · Linux</small></a>
        <a class="bsc-btn bsc-btn-dark" href="https://github.com/rookiepeng/beamscope">Source on GitHub</a>
        <a class="bsc-btn bsc-btn-ghost" href="https://github.com/rookiepeng/arraybeam">arraybeam library</a>
      </div>
    </div>
  </div>
  <div class="bsc-renamed"><b>Renamed</b><span>This project used to be called <strong>Antenna Array Analysis</strong>. Installers up to v3.1.0 still use the old name.</span></div>
  <!-- Demo -->
  <section>
    <div class="bsc-monitor">
      <img src="https://raw.githubusercontent.com/rookiepeng/beamscope/v3/res/beamscope_demo.gif" alt="BeamScope adjusting an array and redrawing its radiation pattern" loading="lazy" />
    </div>
    <div class="bsc-stats">
      <div class="bsc-plate bsc-stat"><b>1024</b><span>elements per axis</span></div>
      <div class="bsc-plate bsc-stat"><b>5</b><span>window functions</span></div>
      <div class="bsc-plate bsc-stat"><b>±90°</b><span>steering in az and el</span></div>
      <div class="bsc-plate bsc-stat"><b>4</b><span>pattern views</span></div>
    </div>
  </section>
  <!-- Background -->
  <section>
    <div class="bsc-plate bsc-story">
      <h2>Background</h2>
      <p class="bsc-kick">Why it exists</p>
      <p>In my work I often need to evaluate different antenna array configurations, varying element counts, spacings, window functions, and beam steering angles, and compare how each choice affects the radiation pattern. For a while I did this with one-off Python scripts, running them and piecing together plots. It worked, but it was slow and tedious every time I wanted to change a parameter.</p>
      <p>I wanted something interactive: change a slider and see the pattern update right away. So I built this tool for myself. Over time it grew from a simple linear-array calculator into a fuller application that handles uniform rectangular arrays, arbitrary custom arrays, per-element patterns, and several plot modes. The goal has stayed the same: make it as easy as possible to explore array designs without rewriting code for every experiment.</p>
    </div>
  </section>
  <!-- Workflow -->
  <section>
    <h2>Design an Array</h2>
    <p class="bsc-kick">Layout · weights · pattern</p>
    <div class="bsc-flow">
      <div class="bsc-plate bsc-stage">
        <h3>Lay out the elements</h3>
        <ul>
          <li><strong>Uniform rectangular:</strong> set the horizontal (y) and vertical (z) axes separately, each with up to 1024 elements, its own spacing in λ, and its own window.</li>
          <li><strong>Custom array:</strong> place each element anywhere (y, z in λ) with its own amplitude and phase. Type them in or import a CSV file.</li>
        </ul>
      </div>
      <div class="bsc-plate bsc-stage">
        <h3>Shape the beam</h3>
        <ul>
          <li><strong>Windows</strong> taper each axis to trade main-lobe width for sidelobe level.</li>
          <li><strong>Steering</strong> points the main beam anywhere from −90° to +90° in azimuth and elevation.</li>
          <li><strong>Element pattern:</strong> optionally weight the array by a single element's gain, given as angle and dB tables for azimuth and elevation, typed in or imported from CSV.</li>
        </ul>
      </div>
      <div class="bsc-plate bsc-stage">
        <h3>Read the pattern</h3>
        <p>Switch between four pattern views, check the array layout colored by weight, and export the configuration and the computed pattern to CSV for use elsewhere.</p>
        <p>Your settings are saved, so the app reopens with the array you left.</p>
      </div>
    </div>
    <div class="bsc-tablewrap">
      <table class="bsc-table">
        <thead><tr><th>Window</th><th>What it does</th><th>Controls</th></tr></thead>
        <tbody>
          <tr><th>Square</th><td>Uniform weights. The narrowest main lobe, with the first sidelobe at about −13 dB.</td><td><span class="bsc-none">none</span></td></tr>
          <tr><th>Chebyshev</th><td>All sidelobes at the same level you choose, with the narrowest main lobe possible for that level.</td><td><span class="bsc-knob">SLL dB</span></td></tr>
          <tr><th>Taylor</th><td>The nearest sidelobes held near a chosen level, with the rest falling off further out. The usual choice for radar arrays.</td><td><span class="bsc-knob">SLL dB</span> <span class="bsc-knob">n̄</span></td></tr>
          <tr><th>Hamming</th><td>A fixed taper with sidelobes around −43 dB.</td><td><span class="bsc-none">none</span></td></tr>
          <tr><th>Hann</th><td>A fixed taper with sidelobes around −31 dB that fall off quickly with angle.</td><td><span class="bsc-none">none</span></td></tr>
        </tbody>
      </table>
    </div>
  </section>
  <!-- Views -->
  <section>
    <h2>Pattern Views</h2>
    <p class="bsc-kick">Plotly, interactive</p>
    <div class="bsc-views">
      <div class="bsc-view">
        <svg viewBox="0 0 160 84" aria-hidden="true"><g fill="none" stroke="#5b8ff5" stroke-width="1.2"><path d="M14 66 L52 56 L80 14 L108 56 L146 66" /><path d="M14 66 L40 72 L80 50 L120 72 L146 66" opacity=".5" /><path d="M40 72 L52 56 M120 72 L108 56 M80 50 L80 14" opacity=".5" /></g></svg>
        <strong>3D surface</strong>Amplitude over azimuth and elevation, for the whole pattern at once.
      </div>
      <div class="bsc-view">
        <svg viewBox="0 0 160 84" aria-hidden="true"><g fill="none" stroke="#5b8ff5" stroke-width="1.2"><ellipse cx="80" cy="42" rx="14" ry="34" /><ellipse cx="80" cy="42" rx="34" ry="12" opacity=".5" /><ellipse cx="38" cy="42" rx="8" ry="6" opacity=".6" /><ellipse cx="122" cy="42" rx="8" ry="6" opacity=".6" /></g></svg>
        <strong>3D polar</strong>The beam as a shape in space, with the main lobe and sidelobes as real lobes.
      </div>
      <div class="bsc-view">
        <svg viewBox="0 0 160 84" aria-hidden="true"><path d="M10 74 H150 M10 74 V8" stroke="#3a414d" /><path d="M12 72 L22 58 L30 70 L40 50 L50 68 L58 38 L66 64 L72 14 L80 8 L88 14 L94 64 L102 38 L110 68 L120 50 L130 70 L138 58 L148 72" fill="none" stroke="#5b8ff5" stroke-width="1.2" /></svg>
        <strong>2D Cartesian</strong>A single azimuth or elevation cut in dB against angle, for reading sidelobe levels.
      </div>
      <div class="bsc-view">
        <svg viewBox="0 0 160 84" aria-hidden="true"><g fill="none" stroke="#3a414d"><path d="M28 78 A52 52 0 0 1 132 78" /><path d="M50 78 A30 30 0 0 1 110 78" /><path d="M80 78 V26" /></g><path d="M80 78 L74 30 Q80 22 86 30 Z M80 78 L56 56 Q54 50 60 52 Z M80 78 L104 56 Q106 50 100 52 Z" fill="rgba(91,143,245,.25)" stroke="#5b8ff5" stroke-width="1.2" /></svg>
        <strong>2D polar</strong>The same cut on a polar grid, with an adjustable dB floor.
      </div>
    </div>
    <div class="bsc-extras">
      <div class="bsc-extra"><strong>3D inset</strong>The 2D views include a small 3D pattern you can drag anywhere, so the cut always has its context.</div>
      <div class="bsc-extra"><strong>Array layout</strong>Shows where every element sits, colored by its weight amplitude or phase.</div>
      <div class="bsc-extra"><strong>CSV in and out</strong>Import element positions and element patterns; export the array configuration and the pattern data.</div>
    </div>
  </section>
  <!-- Architecture -->
  <section>
    <h2>How It Works</h2>
    <p class="bsc-kick">Electron front end · Python engine</p>
    <div class="bsc-pipe">
      <div class="bsc-node"><b>Renderer</b>TypeScript UI with Plotly.js charts</div>
      <div class="bsc-link" aria-hidden="true">⇄</div>
      <div class="bsc-node"><b>Main process</b>Electron, keeps the bridge running</div>
      <div class="bsc-link" aria-hidden="true">⇄</div>
      <div class="bsc-node bsc-hot"><b>Bridge</b>One JSON line in on stdin, one out on stdout</div>
      <div class="bsc-link" aria-hidden="true">⇄</div>
      <div class="bsc-node"><b>arraybeam</b>NumPy and SciPy pattern math</div>
    </div>
    <p class="bsc-pipe-note">The Electron main process starts the Python bridge once and keeps it running, so each change costs one JSON round trip rather than a new Python process. The pattern math lives in <a href="https://github.com/rookiepeng/arraybeam">arraybeam</a>, my array-pattern library, included as a git submodule. In the installers, PyInstaller bundles the bridge into a standalone executable, so no Python install is needed.</p>
    <div class="bsc-stack">
      <span>Electron</span><span>TypeScript</span><span>Plotly.js</span><span>Python</span><span>arraybeam</span><span>NumPy</span><span>SciPy</span><span>PyInstaller</span><span>electron-builder</span>
    </div>
  </section>
  <!-- Get started -->
  <section class="bsc-cockpit">
    <h2>Get Started</h2>
    <p class="bsc-kick">Installers for every desktop</p>
    <div class="bsc-platforms">
      <div class="bsc-platform"><b>Windows</b><p>Run the Squirrel installer (<code>.exe</code>).</p></div>
      <div class="bsc-platform"><b>macOS</b><p>Open the <code>.dmg</code> and drag BeamScope into Applications.</p></div>
      <div class="bsc-platform"><b>Linux</b><p>Make the <code>.AppImage</code> executable and run it.</p></div>
    </div>
    <p class="bsc-cockpit-note">All three are on the <a href="https://github.com/rookiepeng/beamscope/releases/latest">releases page</a>, with the Python engine bundled inside.</p>
    <div class="bsc-sub">
      <div>
        <h3>Run from source</h3>
        <p>Needs Node.js 26+ and Python 3.9+. Clone with the arraybeam submodule:</p>
<pre><code>git clone --recurse-submodules https://github.com/rookiepeng/beamscope.git
cd beamscope
npm install
pip install -r requirements.txt
npm start</code></pre>
        <p>If you cloned without submodules, run <code>git submodule update --init</code>.</p>
      </div>
      <div>
        <h3>Build an installer</h3>
        <p>Freeze the Python bridge, then package the app. The output in <code>dist/</code> is a Squirrel installer, DMG, or AppImage depending on the platform you build on.</p>
<pre><code>python scripts/build_bridge.py
npm run dist</code></pre>
      </div>
    </div>
  </section>
  <div class="bsc-foot">
    <span>GPL-3.0 · feedback welcome</span>
    <span><a href="https://github.com/rookiepeng/beamscope/issues">Issues</a> · <a href="https://github.com/rookiepeng/beamscope/releases">Releases</a> · <a href="https://github.com/rookiepeng/arraybeam">arraybeam</a></span>
  </div>
</div>
