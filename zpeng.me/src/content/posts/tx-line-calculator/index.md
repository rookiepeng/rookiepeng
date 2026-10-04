---
title: "Tx-Line Calculator"
date: 2018-05-01
updated: 2026-10-04
description: "An Android app for RF and microwave engineers: analyze a transmission line from its dimensions, or synthesize the dimensions from a target impedance and electrical length. Microstrip, stripline, coplanar waveguide, coax, and coupled lines."
tags: ["Android", "Kotlin", "Microstrip", "Simulation"]
cover: "./promo.png"
rawHtml: true
wpId: 4100
---
<!-- =====================================================================
  Tx-Line Calculator project page.
  All classes are prefixed "txl-"; colours come from the site palette in
  src/styles/theme.css. Keep this block free of blank lines, or Markdown
  takes over part way through.
====================================================================== -->
<style>
.txl{--txl-gap:56px;max-width:1000px;margin:0 auto;color:var(--text2);line-height:1.65;font-size:1rem}
.txl *,.txl *::before,.txl *::after{box-sizing:border-box}
.txl h2{font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:1.65rem;line-height:1.25;color:var(--text);margin:0 0 .4rem;padding-left:.7rem;border-left:4px solid var(--accent)}
.txl h3{font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:1.2rem;color:var(--text);margin:0 0 .5rem}
.txl p{margin:0 0 .9rem}
.txl a{color:var(--accent);text-underline-offset:2px}
.txl a:hover{color:var(--red)}
.txl code{font-family:var(--mech-mono);font-size:.86em;background:var(--bg3);padding:.08em .35em}
.txl section{margin-top:var(--txl-gap)}
.txl-kick{font-family:var(--mech-mono);font-size:.72rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin:0 0 1.2rem;padding-left:calc(.7rem + 4px)}
/* Armour plate: white panel, navy frame, hard shadow, tricolour trim on top */
.txl-plate{position:relative;background:var(--surface);border:2px solid var(--frame);box-shadow:var(--shadow-hard)}
.txl-plate::before{content:'';position:absolute;top:0;left:0;width:100%;height:4px;pointer-events:none;background:repeating-linear-gradient(90deg,var(--yellow) 0 5px,transparent 5px 9px) right 6px top/32px 100% no-repeat,linear-gradient(90deg,var(--red) 0 28px,var(--accent) 28px calc(100% - 44px),transparent calc(100% - 44px))}
/* ── Intro ─────────────────────────────────────────────────────────── */
.txl-intro{display:grid;grid-template-columns:150px 1fr;gap:32px;align-items:center;padding:36px 36px 32px}
.txl-intro img{width:150px;height:150px;display:block}
.txl-lede{font-size:1.08rem;color:var(--text);margin-bottom:1.2rem}
.txl-actions{display:flex;flex-wrap:wrap;gap:10px}
.txl-btn{display:inline-flex;align-items:center;gap:.5em;font-family:var(--mech-mono);font-size:.76rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:9px 18px;border:2px solid var(--frame);clip-path:var(--chamfer-clip);text-decoration:none!important;transition:filter .15s,transform .15s}
.txl-btn:hover{filter:brightness(1.12);transform:translate(-1px,-1px)}
.txl-btn:active{transform:translate(1px,1px)}
.txl a.txl-btn-primary{background:var(--accent);color:#fff}
.txl a.txl-btn-dark{background:var(--dark);color:#fff}
.txl a.txl-btn-ghost{background:var(--surface);color:var(--text)}
.txl-btn small{font-weight:400;opacity:.75;letter-spacing:.02em;text-transform:none}
/* ── Phone strip ───────────────────────────────────────────────────── */
.txl-monitor{position:relative;background:var(--dark);border:2px solid var(--frame);padding:22px 18px;box-shadow:var(--shadow-hard),0 0 0 1px rgba(91,143,245,.25)}
.txl-monitor::after{--hud:rgba(91,143,245,.75);--arm:16px;content:'';position:absolute;inset:6px;pointer-events:none;background:linear-gradient(var(--hud),var(--hud)) top left/var(--arm) 2px,linear-gradient(var(--hud),var(--hud)) top left/2px var(--arm),linear-gradient(var(--hud),var(--hud)) top right/var(--arm) 2px,linear-gradient(var(--hud),var(--hud)) top right/2px var(--arm),linear-gradient(var(--hud),var(--hud)) bottom left/var(--arm) 2px,linear-gradient(var(--hud),var(--hud)) bottom left/2px var(--arm),linear-gradient(var(--hud),var(--hud)) bottom right/var(--arm) 2px,linear-gradient(var(--hud),var(--hud)) bottom right/2px var(--arm);background-repeat:no-repeat}
.txl-phones{display:grid;grid-template-columns:repeat(5,1fr);gap:14px}
.txl-phones figure{margin:0;text-align:center}
.txl-phones img{display:block;width:100%;height:auto;margin:0}
.txl-phones figcaption{font-family:var(--mech-mono);font-size:.66rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--dark-muted);margin-top:8px}
/* ── Stats ─────────────────────────────────────────────────────────── */
.txl-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:32px}
.txl-stat{text-align:center;padding:22px 12px 16px}
.txl-stat b{display:block;font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:2.1rem;line-height:1.1;color:var(--accent)}
.txl-stat span{display:block;font-family:var(--mech-mono);font-size:.7rem;font-weight:600;letter-spacing:.04em;color:var(--muted);margin-top:6px}
/* ── Story ─────────────────────────────────────────────────────────── */
.txl-story{padding:34px 36px 30px;background:linear-gradient(135deg,var(--bg) 0%,var(--surface) 55%,var(--bg2) 100%)}
.txl-story p{max-width:720px}
.txl-story p:last-child{margin-bottom:0}
/* ── Two modes ─────────────────────────────────────────────────────── */
.txl-modes{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.txl-mode{padding:22px 22px 18px}
.txl-mode h3{display:flex;align-items:center;gap:.55rem}
.txl-arrow{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;font-family:var(--mech-mono);font-size:.95rem;font-weight:700;color:#fff;background:var(--accent);clip-path:var(--chamfer-clip-sm)}
.txl-mode.txl-synth .txl-arrow{background:var(--red)}
.txl-io{display:grid;grid-template-columns:1fr 26px 1fr;align-items:center;gap:6px;margin:.4rem 0 1rem}
.txl-io div{background:var(--bg2);border:1px solid var(--border);padding:8px 10px;font-size:.82rem;line-height:1.45}
.txl-io b{display:block;font-family:var(--mech-mono);font-size:.64rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-bottom:.15rem}
.txl-io span{text-align:center;color:var(--accent);font-family:var(--mech-mono);font-weight:700}
.txl-mode p{font-size:.9rem}
.txl-mode p:last-child{margin-bottom:0}
/* ── Line table ────────────────────────────────────────────────────── */
.txl-table{width:100%;border-collapse:collapse;font-size:.9rem;background:var(--surface)}
.txl-tablewrap{overflow-x:auto;border:2px solid var(--frame);box-shadow:var(--shadow-hard)}
.txl-table th,.txl-table td{border-bottom:1px solid var(--border);padding:.6rem .8rem;text-align:left;vertical-align:top}
.txl-table thead th{background:var(--frame);color:#fff;font-family:var(--mech-mono);font-size:.7rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border-bottom:0}
.txl-table tbody tr:last-child td,.txl-table tbody tr:last-child th{border-bottom:0}
.txl-table tbody th{color:var(--text);white-space:nowrap}
.txl-table tbody th img{display:block;width:96px;height:auto;margin:6px 0 0;background:#fff}
.txl-knob{display:inline-block;font-family:var(--mech-mono);font-size:.72rem;font-weight:700;color:#fff;background:var(--accent);padding:2px 7px;margin:0 2px 3px 0;white-space:nowrap}
.txl-table td:nth-child(2){white-space:nowrap}
.txl-out{font-family:var(--mech-mono);font-size:.76rem;color:var(--text)}
.txl .txl-note{font-size:.86rem;color:var(--muted);margin:.9rem 0 0}
/* ── Under the hood ────────────────────────────────────────────────── */
.txl-pipe{display:grid;grid-template-columns:1fr 34px 1fr 34px 1fr 34px 1fr;align-items:stretch;margin:1.2rem 0 1rem}
.txl-node{background:var(--mech-bg2);border:1px solid var(--mech-border);color:var(--mech-text);padding:14px 14px 12px;font-size:.84rem;clip-path:var(--chamfer-clip)}
.txl-node b{display:block;font-family:var(--mech-mono);font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;color:#fff;margin-bottom:.35rem}
.txl-node.txl-hot{border-color:var(--dark-accent);box-shadow:inset 0 3px 0 var(--dark-yellow)}
.txl-link{display:flex;align-items:center;justify-content:center;color:var(--accent);font-family:var(--mech-mono);font-size:1rem;font-weight:700}
.txl-pipe-note{font-size:.92rem}
.txl-refs{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;margin-top:20px}
.txl-ref{background:var(--surface);border:1px solid var(--border);border-left:4px solid var(--accent);padding:12px 14px;font-size:.88rem}
.txl-ref strong{display:block;color:var(--text);font-size:.92rem;margin-bottom:.15rem}
.txl-stack{display:flex;flex-wrap:wrap;gap:6px;margin-top:20px}
.txl-stack span{font-family:var(--mech-mono);font-size:.72rem;font-weight:600;color:var(--muted);background:var(--bg3);border:1px solid var(--border);padding:3px 9px}
/* ── Get started (cockpit panel) ───────────────────────────────────── */
.txl-cockpit{position:relative;background:linear-gradient(135deg,#060c18 0%,#0c1730 100%);color:var(--dark-text2);border:2px solid var(--frame);box-shadow:var(--shadow-hard);padding:40px 36px 32px}
.txl-cockpit::before{content:'';position:absolute;top:0;left:0;width:100%;height:6px;pointer-events:none;background:linear-gradient(90deg,var(--dark-red) 0 160px,transparent 160px),repeating-linear-gradient(90deg,var(--dark-yellow) 0 14px,transparent 14px 22px),var(--dark-accent)}
.txl .txl-cockpit h2{color:#fff;border-left-color:var(--dark-red)}
.txl .txl-cockpit h3{color:#fff;font-size:1.05rem}
.txl .txl-cockpit a{color:var(--dark-accent)}
.txl .txl-cockpit a:hover{color:var(--dark-yellow)}
.txl .txl-cockpit code{background:rgba(91,143,245,.14);color:var(--dark-text)}
.txl-cockpit .txl-kick{color:var(--dark-muted)}
.txl pre{margin:.6rem 0;background:#03070f;color:var(--dark-text);border:1px solid #26314a;padding:.7rem .9rem;overflow-x:auto;font-family:var(--mech-mono);font-size:.8rem;line-height:1.55;clip-path:var(--chamfer-clip)}
.txl pre code{background:none;padding:0;color:inherit;font-size:inherit}
.txl-sub{display:grid;grid-template-columns:1fr 1fr;gap:28px}
.txl-sub > div{min-width:0}
.txl-sub p{font-size:.9rem}
.txl-play{display:inline-block;margin:.3rem 0 .8rem}
.txl-play img{display:block;height:54px;width:auto}
/* ── Footer strip ──────────────────────────────────────────────────── */
.txl-foot{margin-top:var(--txl-gap);display:flex;flex-wrap:wrap;gap:8px 24px;align-items:center;justify-content:space-between;padding:14px 20px;background:var(--bg2);border:2px solid var(--frame);font-family:var(--mech-mono);font-size:.76rem;color:var(--muted)}
/* ── Responsive ────────────────────────────────────────────────────── */
@media(max-width:860px){
.txl{--txl-gap:44px}
.txl-modes,.txl-sub{grid-template-columns:1fr}
.txl-stats{grid-template-columns:repeat(2,1fr)}
.txl-phones{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:6px}
.txl-phones figure{flex:0 0 46%;scroll-snap-align:start}
.txl-pipe{grid-template-columns:1fr;grid-template-rows:auto}
.txl-link{height:28px;transform:rotate(90deg)}
}
@media(max-width:640px){
.txl-intro{grid-template-columns:1fr;padding:28px 20px 24px;gap:20px}
.txl-intro img{width:96px;height:96px}
.txl-story{padding:28px 20px 24px}
.txl-cockpit{padding:32px 18px 22px}
.txl-monitor{padding:16px 12px}
.txl-phones figure{flex-basis:62%}
}
</style>
<div class="txl">
  <!-- Intro -->
  <div class="txl-plate txl-intro">
    <img src="./icon.png" alt="Tx-Line Calculator logo" width="150" height="150" />
    <div>
      <p class="txl-lede">Tx-Line Calculator is an Android app for RF and microwave engineers. Enter the physical dimensions of a transmission line to get its impedance and electrical length, or enter the impedance and length you need and let it find the dimensions.</p>
      <div class="txl-actions">
        <a class="txl-btn txl-btn-primary" href="https://play.google.com/store/apps/details?id=com.rookiedev.microwavetools">Google Play <small>Android 11+</small></a>
        <a class="txl-btn txl-btn-dark" href="https://github.com/rookiepeng/tx-line-calculator">Source on GitHub</a>
        <a class="txl-btn txl-btn-ghost" href="/privacy-notice-tx-line-calculator/">Privacy notice</a>
      </div>
    </div>
  </div>
  <!-- Screenshots -->
  <section>
    <div class="txl-monitor">
      <div class="txl-phones">
        <figure><img src="https://raw.githubusercontent.com/rookiepeng/tx-line-calculator/master/pics/Screenshot_1.png" alt="Navigation drawer listing the seven transmission line types" loading="lazy" /><figcaption>Seven line types</figcaption></figure>
        <figure><img src="https://raw.githubusercontent.com/rookiepeng/tx-line-calculator/master/pics/Screenshot_2.png" alt="Microstrip line screen with dimensions and synthesize and analyze buttons" loading="lazy" /><figcaption>Microstrip</figcaption></figure>
        <figure><img src="https://raw.githubusercontent.com/rookiepeng/tx-line-calculator/master/pics/Screenshot_3.png" alt="Coaxial line screen with core radius, outer radius, and core offset" loading="lazy" /><figcaption>Coaxial</figcaption></figure>
        <figure><img src="https://raw.githubusercontent.com/rookiepeng/tx-line-calculator/master/pics/Screenshot_4.png" alt="Coupled stripline screen with width, gap, and length" loading="lazy" /><figcaption>Coupled stripline</figcaption></figure>
        <figure><img src="https://raw.githubusercontent.com/rookiepeng/tx-line-calculator/master/pics/Screenshot_5.png" alt="Coupled microstrip line screen in the dark theme" loading="lazy" /><figcaption>Dark theme</figcaption></figure>
      </div>
    </div>
    <div class="txl-stats">
      <div class="txl-plate txl-stat"><b>7</b><span>transmission line types</span></div>
      <div class="txl-plate txl-stat"><b>2</b><span>ways to solve: analyze, synthesize</span></div>
      <div class="txl-plate txl-stat"><b>mil · mm · cm</b><span>per-field length units</span></div>
      <div class="txl-plate txl-stat"><b>0</b><span>ads, accounts, or tracking</span></div>
    </div>
  </section>
  <!-- Background -->
  <section>
    <div class="txl-plate txl-story">
      <h2>Background</h2>
      <p class="txl-kick">A class project that stuck around</p>
      <p>This project started as a part-time hobby during my undergraduate studies. I was taking an RF and microwave circuits course at the time, and Android was just emerging as a mobile platform. It was a natural exercise to combine what I was learning in class, transmission line theory and microwave circuit design, with the challenge of building an Android app from scratch.</p>
      <p>I have kept it alive and updated it now and then ever since. The most recent rounds gave it a Material 3 look with a dark theme, new line diagrams, and in 2026 a full move from Java to Kotlin on the current Android SDK.</p>
    </div>
  </section>
  <!-- Two modes -->
  <section>
    <h2>Two Ways to Solve</h2>
    <p class="txl-kick">Every screen works in both directions</p>
    <div class="txl-modes">
      <div class="txl-plate txl-mode">
        <h3><span class="txl-arrow" aria-hidden="true">↓</span>Analyze</h3>
        <div class="txl-io">
          <div><b>You enter</b>Width, gap, substrate height, εr, metal thickness, length, frequency</div>
          <span aria-hidden="true">→</span>
          <div><b>You get</b>Z<sub>0</sub> and electrical length; Z<sub>0e</sub>, Z<sub>0o</sub>, and k for coupled lines</div>
        </div>
        <p>Use it to check a layout you already have: what impedance does this trace on this board really give at 5 GHz?</p>
      </div>
      <div class="txl-plate txl-mode txl-synth">
        <h3><span class="txl-arrow" aria-hidden="true">↑</span>Synthesize</h3>
        <div class="txl-io">
          <div><b>You enter</b>Target Z<sub>0</sub> and electrical length, or Z<sub>0e</sub>/Z<sub>0o</sub> or Z<sub>0</sub>/k</div>
          <span aria-hidden="true">→</span>
          <div><b>You get</b>The dimension you picked, plus the physical length</div>
        </div>
        <p>Use it at the start of a design: a radio button marks which dimension to solve for, and everything else stays fixed.</p>
      </div>
    </div>
  </section>
  <!-- Line types -->
  <section>
    <h2>Supported Lines</h2>
    <p class="txl-kick">What each one can solve for</p>
    <div class="txl-tablewrap">
      <table class="txl-table">
        <thead><tr><th>Line</th><th>Synthesize</th><th>Results</th><th>Model</th></tr></thead>
        <tbody>
          <tr><th>Microstrip<img src="https://raw.githubusercontent.com/rookiepeng/tx-line-calculator/master/pics/MLIN.svg" alt="" loading="lazy" /></th><td><span class="txl-knob">W</span><span class="txl-knob">H</span><span class="txl-knob">L</span></td><td><span class="txl-out">Z0 · electrical length</span></td><td>Hammerstad and Jensen, with metal thickness correction and Kirschning and Jansen frequency dispersion</td></tr>
          <tr><th>Coupled microstrip<img src="https://raw.githubusercontent.com/rookiepeng/tx-line-calculator/master/pics/cmlin.svg" alt="" loading="lazy" /></th><td><span class="txl-knob">W</span><span class="txl-knob">G</span><span class="txl-knob">L</span></td><td><span class="txl-out">Z0e · Z0o · Z0 · k · electrical length</span></td><td>Kirschning and Jansen even and odd modes, with dispersion</td></tr>
          <tr><th>Stripline<img src="https://raw.githubusercontent.com/rookiepeng/tx-line-calculator/master/pics/slin.svg" alt="" loading="lazy" /></th><td><span class="txl-knob">W</span><span class="txl-knob">H</span><span class="txl-knob">L</span></td><td><span class="txl-out">Z0 · electrical length</span></td><td>Exact elliptic-integral solution for thin strips, closed-form correction for thick ones</td></tr>
          <tr><th>Coupled stripline<img src="https://raw.githubusercontent.com/rookiepeng/tx-line-calculator/master/pics/cslin.svg" alt="" loading="lazy" /></th><td><span class="txl-knob">W</span><span class="txl-knob">G</span><span class="txl-knob">L</span></td><td><span class="txl-out">Z0e · Z0o · Z0 · k · electrical length</span></td><td>Cohn, including fringing capacitance for finite thickness</td></tr>
          <tr><th>Coplanar waveguide<img src="https://raw.githubusercontent.com/rookiepeng/tx-line-calculator/master/pics/cpw.svg" alt="" loading="lazy" /></th><td><span class="txl-knob">W</span><span class="txl-knob">G</span><span class="txl-knob">H</span><span class="txl-knob">L</span></td><td><span class="txl-out">Z0 · electrical length</span></td><td>Conformal mapping (Wadell)</td></tr>
          <tr><th>Grounded CPW<img src="https://raw.githubusercontent.com/rookiepeng/tx-line-calculator/master/pics/cpwg.svg" alt="" loading="lazy" /></th><td><span class="txl-knob">W</span><span class="txl-knob">G</span><span class="txl-knob">H</span><span class="txl-knob">L</span></td><td><span class="txl-out">Z0 · electrical length</span></td><td>Conformal mapping with a bottom ground plane (Wadell)</td></tr>
          <tr><th>Coaxial<img src="https://raw.githubusercontent.com/rookiepeng/tx-line-calculator/master/pics/coax.svg" alt="" loading="lazy" /></th><td><span class="txl-knob">a</span><span class="txl-knob">b</span><span class="txl-knob">c</span><span class="txl-knob">L</span></td><td><span class="txl-out">Z0 · electrical length</span></td><td>Closed form, including an off-center inner conductor (offset c)</td></tr>
        </tbody>
      </table>
    </div>
    <p class="txl-note">W width · G gap · H substrate height · L length · a inner radius · b outer radius · c inner conductor offset. Lengths can be entered in mil, mm, or cm, and frequency in MHz or GHz, each field with its own unit.</p>
  </section>
  <!-- Under the hood -->
  <section>
    <h2>Under the Hood</h2>
    <p class="txl-kick">Closed-form models · iterative synthesis</p>
    <div class="txl-pipe">
      <div class="txl-node"><b>Inputs</b>Each field converted to SI from its own unit</div>
      <div class="txl-link" aria-hidden="true">→</div>
      <div class="txl-node"><b>Model</b>Closed-form equations for that line type</div>
      <div class="txl-link" aria-hidden="true">⇄</div>
      <div class="txl-node txl-hot"><b>Solver</b>Brackets the answer, then refines it with quasi-Newton steps</div>
      <div class="txl-link" aria-hidden="true">→</div>
      <div class="txl-node"><b>Result</b>Converted back to your units</div>
    </div>
    <p class="txl-pipe-note">Analysis runs the published equations once, so it is instant. Synthesis has no closed form for most lines, so the solver runs the analysis repeatedly: it first finds a range that contains the target impedance, then narrows in with quasi-Newton iterations until it converges. Coupled lines solve for width and gap together. Everything runs on the phone, with no network access.</p>
    <div class="txl-refs">
      <div class="txl-ref"><strong>Hammerstad and Jensen</strong>Static microstrip impedance and effective permittivity, with thickness correction.</div>
      <div class="txl-ref"><strong>Kirschning and Jansen</strong>Frequency dispersion for microstrip, and even and odd modes for coupled microstrip.</div>
      <div class="txl-ref"><strong>Cohn</strong>Coupled stripline, from zero-thickness strips to fringing fields for thick ones.</div>
      <div class="txl-ref"><strong>Wadell</strong><em>Transmission Line Design Handbook</em>, for coplanar waveguide with and without a ground plane.</div>
    </div>
    <div class="txl-stack">
      <span>Kotlin</span><span>Android SDK 37</span><span>Material Components</span><span>AndroidX Navigation</span><span>View Binding</span><span>Gradle version catalog</span><span>Dependabot</span>
    </div>
  </section>
  <!-- Get started -->
  <section class="txl-cockpit">
    <h2>Get Started</h2>
    <p class="txl-kick">Install it, or build it yourself</p>
    <div class="txl-sub">
      <div>
        <h3>Install</h3>
        <p>Free on Google Play for Android 11 (API 30) and newer.</p>
        <a class="txl-play" href="https://play.google.com/store/apps/details?id=com.rookiedev.microwavetools"><img src="https://play.google.com/intl/en_us/badges/images/generic/en-play-badge.png" alt="Get it on Google Play" width="182" height="54" /></a>
        <p>Questions or wrong numbers? Open an <a href="https://github.com/rookiepeng/tx-line-calculator/issues">issue on GitHub</a>.</p>
      </div>
      <div>
        <h3>Build from source</h3>
        <p>Needs the Android SDK and JDK 17. The Gradle wrapper fetches everything else:</p>
<pre><code>git clone https://github.com/rookiepeng/tx-line-calculator.git
cd tx-line-calculator
./gradlew build</code></pre>
        <p>On Windows, run <code>gradlew.bat build</code>. Or open the folder in Android Studio and run the <code>mobile</code> module.</p>
      </div>
    </div>
  </section>
  <div class="txl-foot">
    <span>GPL-3.0 · v6.2</span>
    <span><a href="https://github.com/rookiepeng/tx-line-calculator">GitHub</a> · <a href="https://github.com/rookiepeng/tx-line-calculator/issues">Issues</a> · <a href="/privacy-notice-tx-line-calculator/">Privacy notice</a></span>
  </div>
</div>
