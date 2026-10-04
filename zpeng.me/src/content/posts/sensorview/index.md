---
title: "SensorView"
date: 2020-11-11
updated: 2026-10-04
description: "A desktop workbench for exploring multi-sensor logs: filter the frame table, inspect a radar point cloud, camera frame and 1D curves for the same instant, and run six linked statistical views, all driven by one frame slider."
tags: ["Dash", "Data analysis", "Plotly", "Radar", "Visualization"]
cover: "./icon.svg"
rawHtml: true
wpId: 4121
---
<!-- =====================================================================
  SensorView project page.
  All classes are prefixed "svw-"; colours come from the site palette in
  src/styles/theme.css. Keep this block free of blank lines, or Markdown
  takes over part way through.
====================================================================== -->
<style>
.svw{--svw-gap:56px;max-width:1000px;margin:0 auto;color:var(--text2);line-height:1.65;font-size:1rem}
.svw *,.svw *::before,.svw *::after{box-sizing:border-box}
.svw h2{font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:1.65rem;line-height:1.25;color:var(--text);margin:0 0 .4rem;padding-left:.7rem;border-left:4px solid var(--accent)}
.svw h3{font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:1.2rem;color:var(--text);margin:0 0 .5rem}
.svw p{margin:0 0 .9rem}
.svw a{color:var(--accent);text-underline-offset:2px}
.svw a:hover{color:var(--red)}
.svw code{font-family:var(--mech-mono);font-size:.86em;background:var(--bg3);padding:.08em .35em}
.svw section{margin-top:var(--svw-gap)}
.svw-kick{font-family:var(--mech-mono);font-size:.72rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin:0 0 1.2rem;padding-left:calc(.7rem + 4px)}
/* Armour plate: white panel, navy frame, hard shadow, tricolour trim on top */
.svw-plate{position:relative;background:var(--surface);border:2px solid var(--frame);box-shadow:var(--shadow-hard)}
.svw-plate::before{content:'';position:absolute;top:0;left:0;width:100%;height:4px;pointer-events:none;background:repeating-linear-gradient(90deg,var(--yellow) 0 5px,transparent 5px 9px) right 6px top/32px 100% no-repeat,linear-gradient(90deg,var(--red) 0 28px,var(--accent) 28px calc(100% - 44px),transparent calc(100% - 44px))}
/* ── Intro ─────────────────────────────────────────────────────────── */
.svw-intro{display:grid;grid-template-columns:150px 1fr;gap:32px;align-items:center;padding:36px 36px 32px}
.svw-intro img{width:150px;height:150px;display:block;border:2px solid var(--frame)}
.svw-lede{font-size:1.08rem;color:var(--text);margin-bottom:1.2rem}
.svw-actions{display:flex;flex-wrap:wrap;gap:10px}
.svw-btn{display:inline-flex;align-items:center;gap:.5em;font-family:var(--mech-mono);font-size:.76rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:9px 18px;border:2px solid var(--frame);clip-path:var(--chamfer-clip);text-decoration:none!important;transition:filter .15s,transform .15s}
.svw-btn:hover{filter:brightness(1.12);transform:translate(-1px,-1px)}
.svw-btn:active{transform:translate(1px,1px)}
.svw a.svw-btn-primary{background:var(--accent);color:#fff}
.svw a.svw-btn-dark{background:var(--dark);color:#fff}
.svw a.svw-btn-ghost{background:var(--surface);color:var(--text)}
.svw-btn small{font-weight:400;opacity:.75;letter-spacing:.02em;text-transform:none}
/* ── Three axes ────────────────────────────────────────────────────── */
.svw-axes{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;background:var(--frame);border:2px solid var(--frame);border-top:0;box-shadow:var(--shadow-hard)}
.svw-axis{background:var(--bg);padding:20px 22px 22px}
.svw-axis-n{font-family:var(--mech-mono);font-size:.7rem;font-weight:700;letter-spacing:.12em;color:var(--accent);display:block;margin-bottom:.35rem}
.svw-axis h3{font-size:1.1rem;margin-bottom:.35rem}
.svw-axis p{font-size:.9rem;color:var(--muted);margin:0}
/* ── Screenshot monitor ────────────────────────────────────────────── */
.svw-monitor{position:relative;background:var(--dark);border:2px solid var(--frame);padding:14px;box-shadow:var(--shadow-hard),0 0 0 1px rgba(91,143,245,.25)}
.svw-monitor::after{--hud:rgba(91,143,245,.75);--arm:16px;content:'';position:absolute;inset:6px;pointer-events:none;background:linear-gradient(var(--hud),var(--hud)) top left/var(--arm) 2px,linear-gradient(var(--hud),var(--hud)) top left/2px var(--arm),linear-gradient(var(--hud),var(--hud)) top right/var(--arm) 2px,linear-gradient(var(--hud),var(--hud)) top right/2px var(--arm),linear-gradient(var(--hud),var(--hud)) bottom left/var(--arm) 2px,linear-gradient(var(--hud),var(--hud)) bottom left/2px var(--arm),linear-gradient(var(--hud),var(--hud)) bottom right/var(--arm) 2px,linear-gradient(var(--hud),var(--hud)) bottom right/2px var(--arm);background-repeat:no-repeat}
.svw-monitor img{display:block;width:100%;height:auto;margin:0;background:#0b1222}
.svw-caption{font-size:.86rem;color:var(--muted);margin:.8rem 0 0;padding-left:.8rem;border-left:3px solid var(--yellow)}
/* ── Stats ─────────────────────────────────────────────────────────── */
.svw-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:32px}
.svw-stat{text-align:center;padding:22px 12px 16px}
.svw-stat b{display:block;font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:2.1rem;line-height:1.1;color:var(--accent)}
.svw-stat span{display:block;font-family:var(--mech-mono);font-size:.7rem;font-weight:600;letter-spacing:.04em;color:var(--muted);margin-top:6px}
/* ── Workbench schematic ───────────────────────────────────────────── */
.svw-bench{display:grid;grid-template-columns:1fr 1.25fr;gap:28px;align-items:start}
.svw-bench > :first-child{position:sticky;top:calc(var(--header-h) + 16px)}
.svw-shell{display:grid;gap:4px;padding:10px;background:var(--mech-bg);border:2px solid var(--frame);box-shadow:var(--shadow-hard);grid-template-columns:22% 1fr 26%;grid-template-rows:30px 150px 26px 92px;grid-template-areas:"top top top" "rail canvas insp" "rail trans trans" "dock dock dock";font-family:var(--mech-mono);font-size:.66rem;letter-spacing:.08em;text-transform:uppercase}
.svw-shell a{display:flex;align-items:center;justify-content:center;text-align:center;padding:4px;color:var(--mech-text);text-decoration:none;background:var(--mech-bg3);border:1px solid var(--mech-border);transition:border-color .12s,color .12s,background-color .12s}
.svw-shell a:hover,.svw-shell a:focus-visible{border-color:var(--dark-accent);color:#fff;background:rgba(91,143,245,.16);outline:none}
.svw-shell .svw-r-top{grid-area:top;justify-content:flex-start;padding-left:10px;box-shadow:inset 0 -2px 0 var(--dark-red)}
.svw-shell .svw-r-rail{grid-area:rail}
.svw-shell .svw-r-canvas{grid-area:canvas;background:radial-gradient(circle at 50% 55%,rgba(91,143,245,.28) 0 2px,transparent 3px) 0 0/14px 14px,var(--mech-bg2);color:#fff;font-weight:700;border-color:var(--dark-accent)}
.svw-shell .svw-r-insp{grid-area:insp}
.svw-shell .svw-r-trans{grid-area:trans;box-shadow:inset 0 2px 0 var(--dark-yellow)}
.svw-shell .svw-r-dock{grid-area:dock;gap:4px;padding:4px;background:var(--mech-bg2)}
.svw-shell .svw-r-dock i{flex:1;align-self:stretch;display:flex;align-items:center;justify-content:center;font-style:normal;border:1px dashed var(--mech-border)}
.svw-shell-note{font-size:.84rem;color:var(--muted);margin:.8rem 0 0}
.svw-regions{display:grid;gap:12px}
.svw-region{padding:18px 20px 16px;scroll-margin-top:calc(var(--header-h) + 1rem)}
.svw-region h3{display:flex;align-items:center;gap:.6rem;font-size:1.08rem}
.svw-region h3 span{font-family:var(--mech-mono);font-size:.64rem;font-weight:700;letter-spacing:.1em;color:#fff;background:var(--frame);padding:2px 7px;clip-path:var(--chamfer-clip-sm)}
.svw-region p{font-size:.92rem;margin:0}
.svw-region p+p,.svw-region ul{margin-top:.6rem}
.svw-region:target{border-color:var(--accent);box-shadow:var(--shadow-hover)}
.svw-region ul{margin-bottom:0;padding-left:1.1rem;font-size:.9rem}
.svw-region li{margin:.15rem 0}
/* ── Feature chips ─────────────────────────────────────────────────── */
.svw-feats{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;margin-top:24px}
.svw-feat{background:var(--surface);border:1px solid var(--border);border-left:4px solid var(--accent);padding:12px 14px;font-size:.88rem}
.svw-feat strong{display:block;color:var(--text);font-size:.92rem;margin-bottom:.15rem}
/* ── Data architecture ─────────────────────────────────────────────── */
.svw-table{width:100%;border-collapse:collapse;font-size:.9rem;background:var(--surface)}
.svw-tablewrap{overflow-x:auto;border:2px solid var(--frame);box-shadow:var(--shadow-hard);margin:1.2rem 0 1.6rem}
.svw-table th,.svw-table td{border-bottom:1px solid var(--border);padding:.6rem .8rem;text-align:left;vertical-align:top}
.svw-table thead th{background:var(--frame);color:#fff;font-family:var(--mech-mono);font-size:.7rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border-bottom:0}
.svw-table tbody tr:last-child td{border-bottom:0}
.svw-table tbody th{color:var(--text);white-space:nowrap}
.svw-yes{font-family:var(--mech-mono);font-size:.72rem;font-weight:700;color:#fff;background:var(--accent);padding:2px 7px}
.svw-no{font-family:var(--mech-mono);font-size:.72rem;color:var(--muted)}
.svw-why{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
.svw-why div{padding:14px 16px;background:var(--bg3);border-top:3px solid var(--frame);font-size:.88rem}
.svw-why strong{color:var(--text)}
.svw-callout{margin-top:24px;padding:16px 20px;background:var(--surface);border-left:4px solid var(--yellow);font-size:.94rem}
.svw-callout p:last-child{margin:0}
/* ── Get started (cockpit panel) ───────────────────────────────────── */
.svw-cockpit{position:relative;background:linear-gradient(135deg,#060c18 0%,#0c1730 100%);color:var(--dark-text2);border:2px solid var(--frame);box-shadow:var(--shadow-hard);padding:40px 36px 32px}
.svw-cockpit::before{content:'';position:absolute;top:0;left:0;width:100%;height:6px;pointer-events:none;background:linear-gradient(90deg,var(--dark-red) 0 160px,transparent 160px),repeating-linear-gradient(90deg,var(--dark-yellow) 0 14px,transparent 14px 22px),var(--dark-accent)}
.svw .svw-cockpit h2{color:#fff;border-left-color:var(--dark-red)}
.svw .svw-cockpit h3{color:#fff;font-size:1.05rem}
.svw .svw-cockpit a{color:var(--dark-accent)}
.svw .svw-cockpit a:hover{color:var(--dark-yellow)}
.svw .svw-cockpit code{background:rgba(91,143,245,.14);color:var(--dark-text)}
.svw-cockpit .svw-kick{color:var(--dark-muted)}
.svw-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;counter-reset:svw-step;margin-top:8px}
.svw-step{counter-increment:svw-step;background:rgba(255,255,255,.035);border:1px solid #26314a;padding:18px 18px 16px;font-size:.9rem;min-width:0}
.svw-step::before{content:'0' counter(svw-step);display:block;font-family:var(--mech-mono);font-size:.7rem;font-weight:700;letter-spacing:.12em;color:var(--dark-yellow);margin-bottom:.4rem}
.svw-step p{margin:0 0 .6rem}
.svw-step p:last-child{margin:0}
.svw pre{margin:.6rem 0;background:#03070f;color:var(--dark-text);border:1px solid #26314a;padding:.7rem .9rem;overflow-x:auto;font-family:var(--mech-mono);font-size:.8rem;line-height:1.55;clip-path:var(--chamfer-clip)}
.svw pre code{background:none;padding:0;color:inherit;font-size:inherit}
.svw-sub{margin-top:28px;padding-top:22px;border-top:1px dashed #26314a;display:grid;grid-template-columns:1fr 1fr;gap:28px}
.svw-sub p{font-size:.9rem}
/* ── Under the hood ────────────────────────────────────────────────── */
.svw-hood{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.svw-hood .svw-plate{padding:22px 22px 18px}
.svw-hood ul{margin:0;padding-left:1.1rem;font-size:.9rem}
.svw-hood li{margin:.35rem 0}
.svw-hood li strong{color:var(--text)}
.svw-pkgs{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:2px;background:var(--frame);border:2px solid var(--frame);margin-top:16px;box-shadow:var(--shadow-hard)}
.svw-pkg{background:var(--surface);padding:12px 14px;font-size:.84rem;color:var(--muted)}
.svw-pkg code{display:block;width:max-content;margin-bottom:.3rem;color:var(--text);font-weight:700;background:none;padding:0}
.svw-stack{display:flex;flex-wrap:wrap;gap:6px;margin-top:20px}
.svw-stack span{font-family:var(--mech-mono);font-size:.72rem;font-weight:600;color:var(--muted);background:var(--bg3);border:1px solid var(--border);padding:3px 9px}
/* ── Footer strip ──────────────────────────────────────────────────── */
.svw-foot{margin-top:var(--svw-gap);display:flex;flex-wrap:wrap;gap:8px 24px;align-items:center;justify-content:space-between;padding:14px 20px;background:var(--bg2);border:2px solid var(--frame);font-family:var(--mech-mono);font-size:.76rem;color:var(--muted)}
/* ── Responsive ────────────────────────────────────────────────────── */
@media(max-width:860px){
.svw{--svw-gap:44px}
.svw-bench,.svw-hood,.svw-sub{grid-template-columns:1fr}
.svw-bench > :first-child{position:static}
.svw-steps{grid-template-columns:1fr}
.svw-stats{grid-template-columns:repeat(2,1fr)}
}
@media(max-width:640px){
.svw-intro{grid-template-columns:1fr;padding:28px 20px 24px;gap:20px}
.svw-intro img{width:96px;height:96px}
.svw-axes{grid-template-columns:1fr}
.svw-why{grid-template-columns:1fr}
.svw-cockpit{padding:32px 18px 22px}
.svw-shell{grid-template-rows:30px 120px 26px 80px;font-size:.58rem;letter-spacing:.04em}
}
</style>
<div class="svw">
  <!-- Intro -->
  <div class="svw-plate svw-intro">
    <img src="./icon.svg" alt="SensorView logo" width="150" height="150" />
    <div>
      <p class="svw-lede">SensorView is a workbench for exploring multi-sensor logs. Open a drive, scrub to any frame, and see the radar point cloud, the camera image, and the 1D curves for that instant side by side, filtered down to the data that matters and backed by six linked statistical views.</p>
      <div class="svw-actions">
        <a class="svw-btn svw-btn-primary" href="https://github.com/rookiepeng/sensorview/releases/latest">Download <small>Windows · Linux</small></a>
        <a class="svw-btn svw-btn-dark" href="https://github.com/rookiepeng/sensorview">Source on GitHub</a>
        <a class="svw-btn svw-btn-ghost" href="https://github.com/rookiepeng/sensorview/blob/master/DATA_FORMAT.md">Data format</a>
      </div>
    </div>
  </div>
  <!-- Three axes of analysis -->
  <div class="svw-axes">
    <div class="svw-axis">
      <span class="svw-axis-n">01 · Filter</span>
      <h3>Cut the table down</h3>
      <p>Range sliders and multi-selects are generated for every column. One filtered table feeds every view, so a single drag moves them all.</p>
    </div>
    <div class="svw-axis">
      <span class="svw-axis-n">02 · Inspect</span>
      <h3>See one instant, every way</h3>
      <p>3D point cloud, camera frame, and range profile for the same frame, locked together by one slider.</p>
    </div>
    <div class="svw-axis">
      <span class="svw-axis-n">03 · Analyze</span>
      <h3>Find the pattern</h3>
      <p>Scatter, histogram, violin, parallel categories, and heatmap views over the whole log or the current frame.</p>
    </div>
  </div>
  <!-- Screenshot -->
  <section>
    <div class="svw-monitor">
      <img src="https://github.com/rookiepeng/sensorview/raw/master/assets/screenshot.gif" alt="SensorView workbench in the dark theme, replaying a nuScenes scene" loading="lazy" />
    </div>
    <p class="svw-caption">A nuScenes scene: radar detections over a decimated lidar backdrop with the ego vehicle overlaid, the camera frame and range profile for the same instant in the inspector, and two statistical views in the dock.</p>
    <div class="svw-stats">
      <div class="svw-plate svw-stat"><b>1</b><span>frame slider drives it all</span></div>
      <div class="svw-plate svw-stat"><b>6</b><span>linked statistical views</span></div>
      <div class="svw-plate svw-stat"><b>5</b><span>data streams, one frame id</span></div>
      <div class="svw-plate svw-stat"><b>0</b><span>server trips to seek video</span></div>
    </div>
  </section>
  <!-- Workbench -->
  <section>
    <h2>The Workbench</h2>
    <p class="svw-kick">Everything on one screen</p>
    <p>The layout is sized to the window instead of flowing down a page. Only panel interiors scroll, so every view of the current frame is at most one click away. The rail, inspector, and dock each have a splitter on their inner edge, and whatever space they give up goes to the canvas.</p>
    <div class="svw-bench">
      <div>
        <div class="svw-shell" aria-label="Workbench layout">
          <a class="svw-r-top" href="#svw-top">Top bar</a>
          <a class="svw-r-rail" href="#svw-rail">Filter<br />rail</a>
          <a class="svw-r-canvas" href="#svw-canvas">3D canvas</a>
          <a class="svw-r-insp" href="#svw-insp">Inspector</a>
          <a class="svw-r-trans" href="#svw-trans">Transport</a>
          <a class="svw-r-dock" href="#svw-dock"><i>Slot A</i><i>Slot B</i></a>
        </div>
        <p class="svw-shell-note">Select a region to jump to its description. Collapsing, dragging, and theme switching all run in the browser, without a round trip to the server.</p>
      </div>
      <div class="svw-regions">
        <div class="svw-plate svw-region" id="svw-top">
          <h3><span>TOP</span>Top bar</h3>
          <p>The dataset breadcrumb doubles as the file picker. It also holds the controls to combine logs, switch theme, and export.</p>
        </div>
        <div class="svw-plate svw-region" id="svw-rail">
          <h3><span>RAIL</span>Filter rail</h3>
          <p>Filters are generated from the manifest: a range slider for each numerical column and a multi-select for each categorical one. Points can be clicked or lassoed to mark them <em>hidden</em>, then filtered out by that label.</p>
        </div>
        <div class="svw-plate svw-region" id="svw-canvas">
          <h3><span>3D</span>Canvas</h3>
          <p>An interactive 3D scatter with color mapping. A decay slider fades earlier frames in behind the current one, and overlay mode draws every frame at once. View settings float over the plot because they change only a few times per session.</p>
        </div>
        <div class="svw-plate svw-region" id="svw-insp">
          <h3><span>INSP</span>Inspector</h3>
          <p>Shows the camera stream and the curve plot for the current frame. Each section can be minimized on its own. When a log has neither a camera nor a curve file, the inspector hides and the canvas takes its width.</p>
        </div>
        <div class="svw-plate svw-region" id="svw-trans">
          <h3><span>TIME</span>Transport</h3>
          <p>The frame slider is the only clock. The video never plays by itself; it seeks to whichever frame the rest of the app shows, and playback goes through the same path. Two thin lines on the top edge show server and browser buffering progress.</p>
        </div>
        <div class="svw-plate svw-region" id="svw-dock">
          <h3><span>DOCK</span>Analysis dock</h3>
          <p>Two slots side by side, each showing one of six views:</p>
          <ul>
            <li><strong>2D Scatter A / B</strong>: separate x/y/color mappings, with lasso and box select tied to the hidden label</li>
            <li><strong>Histogram</strong>: density or probability, optionally split by a category</li>
            <li><strong>Violin</strong>: distributions by category</li>
            <li><strong>Parallel Categories</strong>: how categorical columns relate</li>
            <li><strong>Heatmap</strong>: 2D density</li>
          </ul>
          <p>Only the views placed in a slot are computed, and a collapsed dock computes nothing.</p>
        </div>
      </div>
    </div>
    <div class="svw-feats">
      <div class="svw-feat"><strong>Combine logs</strong>Load more logs from the top bar and compare them in one view.</div>
      <div class="svw-feat"><strong>Pre-fetched frames</strong>A WebWorker fills IndexedDB ahead of the slider, so scrubbing doesn't wait for the server.</div>
      <div class="svw-feat"><strong>Dark and light themes</strong>The app and the Plotly templates switch together, and the choice is remembered.</div>
      <div class="svw-feat"><strong>Export</strong>The current plot as PNG or HTML, all frames as an HTML video, or the filtered data as Parquet.</div>
      <div class="svw-feat"><strong>Session isolation</strong>Each browser session gets its own cache namespace.</div>
      <div class="svw-feat"><strong>Native dialogs</strong>The desktop window uses the OS file browser and save dialogs, so exports go where you choose.</div>
    </div>
  </section>
  <!-- Data architecture -->
  <section>
    <h2>Data Architecture</h2>
    <p class="svw-kick">Each data type in the format that fits it</p>
    <p>Each kind of sensor data is stored in the format that suits its shape, and everything is joined by a single <strong>frame id</strong>.</p>
    <div class="svw-tablewrap">
      <table class="svw-table">
        <thead><tr><th>Data</th><th>Format</th><th>Filterable</th><th>Re-read when</th></tr></thead>
        <tbody>
          <tr><th>Table</th><td>Parquet, tidy table</td><td><span class="svw-yes">YES</span> full filter pipeline</td><td>filters or frame change</td></tr>
          <tr><th>Cloud</th><td>HDF5, pre-decimated</td><td><span class="svw-no">no, fixed backdrop</span></td><td>frame changes</td></tr>
          <tr><th>Curves</th><td>HDF5, one (N, 2) pair per frame</td><td><span class="svw-no">no</span></td><td>frame changes</td></tr>
          <tr><th>Images</th><td>mp4, all-intra</td><td><span class="svw-no">no</span></td><td>frame changes</td></tr>
          <tr><th>Reference pose</th><td>Parquet, one row per frame</td><td><span class="svw-no">no</span></td><td>frame changes</td></tr>
        </tbody>
      </table>
    </div>
    <div class="svw-why">
      <div><strong>Only the table is queried,</strong> so it stays columnar. Parquet gives compression plus projection and predicate pushdown, and MATLAB reads and writes it natively.</div>
      <div><strong>Clouds and curves are display-only.</strong> They are blobs indexed by frame, so a chunked HDF5 dataset per frame, also readable from MATLAB with <code>h5read</code>, works better than Parquet.</div>
      <div><strong>Video is seeked in the browser</strong> with a native <code>&lt;video&gt;</code> element. All-intra encoding allows seeking to any frame. A container the browser can't play, such as a vendor <code>.avi</code>, is transcoded once and cached.</div>
      <div><strong>Pose is stored per frame, not per detection.</strong> Repeating six columns on each of a log's 300k rows to record one vehicle's position would waste space, and table columns can't represent orientation.</div>
    </div>
    <div class="svw-callout">
      <p>The display-only data never depends on filter state, so dragging a filter slider re-renders only the table. The cloud, curves, pose, and video are not re-read. SensorView reads these files but never writes them. The full contract, with filenames, HDF5 paths, dtypes, manifest keys, an example converter, and a validation checklist, is in <a href="https://github.com/rookiepeng/sensorview/blob/master/DATA_FORMAT.md">DATA_FORMAT.md</a>.</p>
    </div>
  </section>
  <!-- Get started -->
  <section class="svw-cockpit">
    <h2>Get Started</h2>
    <p class="svw-kick">From download to first frame</p>
    <div class="svw-steps">
      <div class="svw-step">
        <h3>Get the app</h3>
        <p>Download the <a href="https://github.com/rookiepeng/sensorview/releases/latest">latest release</a> for Windows or Linux, or run it from source:</p>
<pre><code>git clone https://github.com/rookiepeng/sensorview.git
cd sensorview
pip install -r requirements.txt
python main.py</code></pre>
      </div>
      <div class="svw-step">
        <h3>Prepare a case</h3>
        <p>Create a folder per case under <code>./data</code>, or point the open dialog at any other directory.</p>
        <p>Add an <code>info.json</code> manifest. The <a href="https://github.com/rookiepeng/sensorview/blob/master/DATA_FORMAT.md#minimal-manifest">minimal manifest</a> is a good starting point.</p>
        <p>Add <code>&lt;stem&gt;.parquet</code> plus any extra files you have for it. Missing ones are simply not shown.</p>
      </div>
      <div class="svw-step">
        <h3>Or try nuScenes</h3>
        <p><code>data/NuScenes</code> ships with the repo: five logs from the nuScenes v1.0-mini split, with a lidar backdrop, six curve sources, two camera streams, and a per-frame ego pose.</p>
        <p><code>build_nuscenes_case.py</code> rebuilds the case from the original archive. The data is under nuScenes' CC BY-NC-SA terms, not GPL-3.0.</p>
      </div>
    </div>
    <div class="svw-sub">
      <div>
        <h3>Desktop window</h3>
        <p><code>python main.py</code> starts Waitress on <code>127.0.0.1:8521</code> and opens it in a native pywebview window: WebView2 on Windows, WKWebView on macOS, and WebKitGTK or Qt on Linux. Closing the window stops the process. If no webview backend is available, the app opens in the default browser.</p>
        <p>For hot reload during development, set <code>DEBUG = True</code> in <code>main.py</code>.</p>
      </div>
      <div>
        <h3>Shared server</h3>
        <p><code>server/dash_app.py</code> exposes a ready-to-serve <code>app</code> that any WSGI server can host, without the desktop window:</p>
<pre><code>from waitress import serve
from server.dash_app import app
serve(app.server, listen="*:8000")</code></pre>
      </div>
    </div>
  </section>
  <!-- Under the hood -->
  <section>
    <h2>Under the Hood</h2>
    <p class="svw-kick">Flask · Dash · Plotly</p>
    <div class="svw-hood">
      <div class="svw-plate">
        <h3>Server</h3>
        <ul>
          <li><strong>REST endpoints</strong> serve buffered frames (<code>/api/data</code>), the decimated backdrop (<code>/api/cloud</code>), and each log's video, transcoding it if needed (<code>/api/camera</code>).</li>
          <li><strong>Background callbacks</strong> pre-compute 3D frames through a <code>diskcache</code> job manager, and a newer request cancels an older one that's still running.</li>
          <li><strong>A disk cache</strong> (diskcache FanoutCache) holds session and frame data, keyed by session id.</li>
        </ul>
      </div>
      <div class="svw-plate">
        <h3>Browser</h3>
        <ul>
          <li><strong><code>workbench.js</code></strong> handles panel collapse, splitter drags, theme persistence, and refitting Plotly after any layout change.</li>
          <li><strong><code>worker.js</code></strong> is a WebWorker that pulls frames from the REST API into IndexedDB ahead of the slider.</li>
          <li><strong>Clientside callbacks</strong> swap figures from the local buffer and keep a bounded cache of cloud backdrops, so going back to a frame is free.</li>
        </ul>
      </div>
    </div>
    <div class="svw-pkgs">
      <div class="svw-pkg"><code>main.py</code>The only entry point. Nothing starts a server on import.</div>
      <div class="svw-pkg"><code>server/</code>Builds the app, the HTTP routes, the clientside callbacks, and the desktop shell.</div>
      <div class="svw-pkg"><code>layouts/</code>One module for each region of the workbench.</div>
      <div class="svw-pkg"><code>view_callbacks/</code>One module for each view's server-side callbacks.</div>
      <div class="svw-pkg"><code>viz/</code>Turns data into Plotly figures and runs the per-frame pipeline.</div>
      <div class="svw-pkg"><code>frame_sources/</code>Resolves a session's manifest, logs, and per-frame data files.</div>
      <div class="svw-pkg"><code>dataio/</code>Reads Parquet, HDF5, mp4, and the manifest that describes them.</div>
      <div class="svw-pkg"><code>utils/</code>Session cache, JSON persistence, table loading, and filtering.</div>
    </div>
    <div class="svw-stack">
      <span>dash</span><span>plotly</span><span>dash-bootstrap-components</span><span>polars</span><span>pandas</span><span>pyarrow</span><span>h5py</span><span>numpy</span><span>diskcache</span><span>orjson</span><span>kaleido</span><span>imageio-ffmpeg</span><span>waitress</span><span>pywebview</span>
    </div>
  </section>
  <div class="svw-foot">
    <span>GPL-3.0 · contributions welcome</span>
    <span><a href="https://github.com/rookiepeng/sensorview/issues">Issues</a> · <a href="https://github.com/rookiepeng/sensorview/pulls">Pull requests</a> · <a href="https://github.com/rookiepeng/sensorview/releases">Releases</a></span>
  </div>
</div>
