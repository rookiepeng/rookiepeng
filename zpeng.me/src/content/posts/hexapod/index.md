---
title: "Hexapod"
date: 2024-09-12
updated: 2026-10-08
description: "A family of 3D-printed, 18-servo hexapod robots (Nougat, Mochi and Macaroon) that share one ESP32 firmware, plus Hexapod Link, a kinematics simulator that drives the real robots over WiFi from the browser or a desktop app."
tags: ["Hexapod", "Toy", "ESP32", "3D Printing", "Python", "Simulation"]
cover: "./mochi.jpg"
rawHtml: true
wpId: 4408
---
<!-- =====================================================================
  Hexapod project page, covering both repos:
    rookidroid/hexapod       robots, ESP32 firmware, path tool
    rookidroid/hexapod-link  simulator and desktop app that drives them
  All classes are prefixed "hxp-"; colours come from the site palette in
  src/styles/theme.css. Keep this block free of blank lines, or Markdown
  takes over part way through.
====================================================================== -->
<style>
.hxp{--hxp-gap:56px;max-width:1000px;margin:0 auto;color:var(--text2);line-height:1.65;font-size:1rem}
.hxp *,.hxp *::before,.hxp *::after{box-sizing:border-box}
.hxp h2{font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:1.65rem;line-height:1.25;color:var(--text);margin:0 0 .4rem;padding-left:.7rem;border-left:4px solid var(--accent)}
.hxp h3{font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:1.2rem;color:var(--text);margin:0 0 .5rem}
.hxp p{margin:0 0 .9rem}
.hxp a{color:var(--accent);text-underline-offset:2px}
.hxp a:hover{color:var(--red)}
.hxp strong{color:var(--text)}
.hxp code{font-family:var(--mech-mono);font-size:.86em;background:var(--bg3);padding:.08em .35em}
.hxp section{margin-top:var(--hxp-gap)}
.hxp-kick{font-family:var(--mech-mono);font-size:.72rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin:0 0 1.2rem;padding-left:calc(.7rem + 4px)}
.hxp-prose{max-width:780px}
.hxp .hxp-note{font-size:.92rem;margin:1rem 0 0}
/* Armour plate: white panel, navy frame, hard shadow, tricolour trim on top */
.hxp-plate{position:relative;background:var(--surface);border:2px solid var(--frame);box-shadow:var(--shadow-hard)}
.hxp-plate::before{content:'';position:absolute;top:0;left:0;width:100%;height:4px;pointer-events:none;z-index:1;background:repeating-linear-gradient(90deg,var(--yellow) 0 5px,transparent 5px 9px) right 6px top/32px 100% no-repeat,linear-gradient(90deg,var(--red) 0 28px,var(--accent) 28px calc(100% - 44px),transparent calc(100% - 44px))}
/* ── Intro ─────────────────────────────────────────────────────────── */
.hxp-intro{display:grid;grid-template-columns:150px 1fr;gap:32px;align-items:center;padding:36px 36px 32px}
.hxp-intro > img{width:150px;height:150px;display:block}
.hxp-lede{font-size:1.08rem;color:var(--text);margin-bottom:1.2rem}
.hxp-actions{display:flex;flex-wrap:wrap;gap:10px}
.hxp-btn{display:inline-flex;align-items:center;gap:.5em;font-family:var(--mech-mono);font-size:.76rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:9px 18px;border:2px solid var(--frame);clip-path:var(--chamfer-clip);text-decoration:none!important;transition:filter .15s,transform .15s}
.hxp-btn:hover{filter:brightness(1.12);transform:translate(-1px,-1px)}
.hxp-btn:active{transform:translate(1px,1px)}
.hxp a.hxp-btn-primary{background:var(--accent);color:#fff}
.hxp a.hxp-btn-dark{background:var(--dark);color:#fff}
.hxp a.hxp-btn-ghost{background:var(--surface);color:var(--text)}
.hxp-btn small{font-weight:400;opacity:.75;letter-spacing:.02em;text-transform:none}
.hxp-strip{display:flex;flex-wrap:wrap;gap:.3rem .8rem;align-items:baseline;background:var(--bg2);border:2px solid var(--frame);border-top:0;padding:10px 20px;font-size:.86rem;color:var(--muted)}
.hxp-strip b{font-family:var(--mech-mono);font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#fff;background:var(--frame);padding:2px 7px;clip-path:var(--chamfer-clip-sm)}
/* ── Monitor frame (dark, HUD corner brackets) ─────────────────────── */
.hxp-monitor{position:relative;margin:0;background:var(--dark);border:2px solid var(--frame);padding:14px;box-shadow:var(--shadow-hard),0 0 0 1px rgba(91,143,245,.25)}
.hxp-monitor::after{--hud:rgba(91,143,245,.75);--arm:16px;content:'';position:absolute;inset:6px;pointer-events:none;background:linear-gradient(var(--hud),var(--hud)) top left/var(--arm) 2px,linear-gradient(var(--hud),var(--hud)) top left/2px var(--arm),linear-gradient(var(--hud),var(--hud)) top right/var(--arm) 2px,linear-gradient(var(--hud),var(--hud)) top right/2px var(--arm),linear-gradient(var(--hud),var(--hud)) bottom left/var(--arm) 2px,linear-gradient(var(--hud),var(--hud)) bottom left/2px var(--arm),linear-gradient(var(--hud),var(--hud)) bottom right/var(--arm) 2px,linear-gradient(var(--hud),var(--hud)) bottom right/2px var(--arm);background-repeat:no-repeat}
.hxp-monitor img{display:block;width:100%;height:auto;margin:0 auto}
.hxp-monitor figcaption{font-family:var(--mech-mono);font-size:.72rem;line-height:1.5;color:var(--dark-muted);margin-top:10px;text-align:center}
.hxp-hero{display:grid;grid-template-columns:1fr 300px;gap:16px;align-items:stretch}
.hxp-hero .hxp-monitor{display:flex;flex-direction:column;align-items:center;justify-content:center}
.hxp-hero .hxp-monitor img{max-width:440px}
.hxp-stats{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.hxp-stat{text-align:center;padding:22px 12px 16px;display:flex;flex-direction:column;justify-content:center}
.hxp-stat b{display:block;font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:2.1rem;line-height:1.1;color:var(--accent)}
.hxp-stat span{display:block;font-family:var(--mech-mono);font-size:.7rem;font-weight:600;letter-spacing:.04em;color:var(--muted);margin-top:6px}
/* ── Story ─────────────────────────────────────────────────────────── */
.hxp-story{padding:34px 36px 30px;background:linear-gradient(135deg,var(--bg) 0%,var(--surface) 55%,var(--bg2) 100%)}
.hxp-story p{max-width:720px}
.hxp-story p:last-child{margin-bottom:0}
/* ── Family: one card per generation ───────────────────────────────── */
.hxp-gens{display:grid;grid-template-columns:1fr 1fr;gap:20px;counter-reset:hxp-gen}
.hxp-gen{display:flex;flex-direction:column;counter-increment:hxp-gen}
.hxp-gen figure{margin:0;border-bottom:2px solid var(--frame);background:var(--bg2);aspect-ratio:4/3;overflow:hidden}
.hxp-gen figure img{display:block;width:100%;height:100%;object-fit:cover}
.hxp-gen > div{flex:1;display:flex;flex-direction:column;padding:18px 20px 18px;font-size:.92rem}
.hxp-gen h3{margin-bottom:.1rem}
.hxp-badge{display:inline-block;align-self:flex-start;font-family:var(--mech-mono);font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#fff;background:var(--accent);padding:2px 8px;margin-bottom:.6rem;clip-path:var(--chamfer-clip-sm)}
.hxp-gen.hxp-old .hxp-badge{background:var(--muted)}
.hxp-sub{font-family:var(--mech-mono);font-size:.72rem;font-weight:600;letter-spacing:.04em;color:var(--muted);margin:0 0 .7rem!important}
.hxp-lesson{background:var(--bg3);border-left:4px solid var(--yellow);padding:8px 12px;font-size:.86rem;margin:0 0 .9rem}
.hxp-chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:auto}
.hxp-chips span{font-family:var(--mech-mono);font-size:.7rem;font-weight:600;color:var(--muted);background:var(--bg3);border:1px solid var(--border);padding:2px 8px}
.hxp-glinks{display:flex;flex-wrap:wrap;gap:6px 14px;margin-top:14px;padding-top:12px;border-top:1px dashed var(--border2);font-family:var(--mech-mono);font-size:.74rem;font-weight:700;letter-spacing:.04em}
.hxp-glinks a{text-decoration:none}
.hxp-glinks a:hover{text-decoration:underline}
/* ── Tables ────────────────────────────────────────────────────────── */
.hxp-tablewrap{overflow-x:auto;border:2px solid var(--frame);box-shadow:var(--shadow-hard);margin:24px 0 0}
.hxp-table{width:100%;border-collapse:collapse;font-size:.9rem;background:var(--surface)}
.hxp-table th,.hxp-table td{border-bottom:1px solid var(--border);padding:.55rem .8rem;text-align:left;vertical-align:top}
.hxp-table thead th{background:var(--frame);color:#fff;font-family:var(--mech-mono);font-size:.7rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border-bottom:0}
.hxp-table tbody tr:last-child td,.hxp-table tbody tr:last-child th{border-bottom:0}
.hxp-table tbody th{color:var(--text);font-weight:600;white-space:nowrap;background:var(--bg3)}
.hxp-table td code{background:none;padding:0;color:var(--text)}
/* ── Feature cards ─────────────────────────────────────────────────── */
.hxp-extras{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px;margin-top:20px}
.hxp-extra{background:var(--surface);border:1px solid var(--border);border-left:4px solid var(--accent);padding:12px 14px;font-size:.88rem}
.hxp-extra strong{display:block;font-size:.92rem;margin-bottom:.15rem}
.hxp-extra.hxp-warn{border-left-color:var(--red)}
.hxp-extras.hxp-two{grid-template-columns:1fr 1fr}
/* ── Pipeline ──────────────────────────────────────────────────────── */
.hxp-pipe{display:grid;grid-template-columns:1fr 34px 1fr 34px 1fr 34px 1fr;align-items:stretch;margin:1.4rem 0 1rem}
.hxp-node{background:var(--mech-bg2);border:1px solid var(--mech-border);color:var(--mech-text);padding:14px 14px 12px;font-size:.84rem;clip-path:var(--chamfer-clip)}
.hxp-node b{display:block;font-family:var(--mech-mono);font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;color:#fff;margin-bottom:.35rem}
.hxp-node.hxp-hot{border-color:var(--dark-accent);box-shadow:inset 0 3px 0 var(--dark-yellow)}
.hxp-node code{background:none;padding:0;color:inherit}
.hxp-link{display:flex;align-items:center;justify-content:center;color:var(--accent);font-family:var(--mech-mono);font-size:1rem;font-weight:700}
.hxp-stack{display:flex;flex-wrap:wrap;gap:6px;margin-top:20px}
.hxp-stack span{font-family:var(--mech-mono);font-size:.72rem;font-weight:600;color:var(--muted);background:var(--bg3);border:1px solid var(--border);padding:3px 9px}
/* ── Ways to drive ─────────────────────────────────────────────────── */
.hxp-drives{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;counter-reset:hxp-drive}
.hxp-drive{min-width:0;counter-increment:hxp-drive;padding:22px 22px 18px;font-size:.9rem}
.hxp-drive::after{content:'0' counter(hxp-drive);position:absolute;top:14px;right:16px;font-family:var(--mech-mono);font-size:.7rem;font-weight:700;letter-spacing:.12em;color:var(--accent)}
.hxp-drive h3{font-size:1.12rem;padding-right:2rem}
.hxp-drive p:last-child{margin-bottom:0}
/* ── Hexapod Link ──────────────────────────────────────────────────── */
.hxp-link-intro{display:grid;grid-template-columns:110px 1fr;gap:28px;align-items:center;padding:30px 32px 28px}
.hxp-link-intro > img{width:110px;height:110px;display:block}
.hxp-link-intro p{margin-bottom:1rem}
.hxp-split{display:grid;grid-template-columns:1.1fr 1fr;gap:24px;align-items:center;margin-top:28px}
.hxp-split .hxp-monitor img{max-width:460px}
.hxp-pages{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:28px}
.hxp-page{display:flex;flex-direction:column}
.hxp-page figure{margin:0;border-bottom:2px solid var(--frame);background:var(--bg2)}
.hxp-page figure img{display:block;width:100%;height:auto}
.hxp-page > div{flex:1;padding:16px 18px 14px;font-size:.9rem}
.hxp-page h3{font-size:1.12rem;margin-bottom:.3rem}
.hxp-page p{margin:0 0 .6rem}
.hxp-page small{display:inline-block;font-family:var(--mech-mono);font-size:.7rem;font-weight:700;letter-spacing:.04em;color:#fff;background:var(--accent);padding:2px 8px}
.hxp-page small.hxp-flash{background:var(--frame)}
.hxp-flow{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;counter-reset:hxp-stage;margin-top:28px}
.hxp-stage{counter-increment:hxp-stage;padding:22px 22px 18px;font-size:.9rem}
.hxp-stage::after{content:'0' counter(hxp-stage);position:absolute;top:14px;right:16px;font-family:var(--mech-mono);font-size:.7rem;font-weight:700;letter-spacing:.12em;color:var(--accent)}
.hxp-stage h3{font-size:1.12rem}
.hxp-stage p:last-child{margin-bottom:0}
/* ── Design pillars ────────────────────────────────────────────────── */
.hxp-pillars{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.hxp-pillar{background:var(--surface);border:1px solid var(--border);border-top:3px solid var(--frame);padding:16px 18px;font-size:.88rem}
.hxp-pillar h3{font-size:1.05rem;margin-bottom:.3rem}
.hxp-pillar p{margin:0}
/* ── Get started (cockpit panel) ───────────────────────────────────── */
.hxp-cockpit{position:relative;background:linear-gradient(135deg,#060c18 0%,#0c1730 100%);color:var(--dark-text2);border:2px solid var(--frame);box-shadow:var(--shadow-hard);padding:40px 36px 32px}
.hxp-cockpit::before{content:'';position:absolute;top:0;left:0;width:100%;height:6px;pointer-events:none;background:linear-gradient(90deg,var(--dark-red) 0 160px,transparent 160px),repeating-linear-gradient(90deg,var(--dark-yellow) 0 14px,transparent 14px 22px),var(--dark-accent)}
.hxp .hxp-cockpit h2{color:#fff;border-left-color:var(--dark-red)}
.hxp .hxp-cockpit h3{color:#fff;font-size:1.05rem}
.hxp .hxp-cockpit strong{color:#fff}
.hxp .hxp-cockpit a{color:var(--dark-accent)}
.hxp .hxp-cockpit a:hover{color:var(--dark-yellow)}
.hxp .hxp-cockpit code{background:rgba(91,143,245,.14);color:var(--dark-text)}
.hxp-cockpit .hxp-kick{color:var(--dark-muted)}
.hxp-cockpit-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:24px}
.hxp-cockpit-grid > div{min-width:0}
.hxp-cockpit-grid p{font-size:.9rem}
.hxp pre{margin:.6rem 0;background:#03070f;color:var(--dark-text);border:1px solid #26314a;padding:.7rem .9rem;overflow-x:auto;font-family:var(--mech-mono);font-size:.8rem;line-height:1.55;clip-path:var(--chamfer-clip)}
.hxp pre code{background:none!important;padding:0;color:inherit!important;font-size:inherit}
.hxp-cockpit-note{margin:22px 0 0;padding-top:18px;border-top:1px dashed #26314a;font-size:.9rem}
/* ── Footer strip ──────────────────────────────────────────────────── */
.hxp-foot{margin-top:var(--hxp-gap);display:flex;flex-wrap:wrap;gap:8px 24px;align-items:center;justify-content:space-between;padding:14px 20px;background:var(--bg2);border:2px solid var(--frame);font-family:var(--mech-mono);font-size:.76rem;color:var(--muted)}
/* ── Responsive ────────────────────────────────────────────────────── */
@media(max-width:860px){
.hxp{--hxp-gap:44px}
.hxp-hero,.hxp-split,.hxp-flow,.hxp-cockpit-grid{grid-template-columns:1fr}
.hxp-stats{grid-template-columns:repeat(4,1fr)}
.hxp-drives,.hxp-pillars{grid-template-columns:1fr 1fr}
.hxp-pipe{grid-template-columns:1fr;grid-template-rows:auto}
.hxp-link{height:28px;transform:rotate(90deg)}
}
@media(max-width:640px){
.hxp-intro,.hxp-link-intro{grid-template-columns:1fr;padding:28px 20px 24px;gap:20px}
.hxp-intro > img,.hxp-link-intro > img{width:96px;height:96px}
.hxp-story{padding:28px 20px 24px}
.hxp-cockpit{padding:32px 18px 22px}
.hxp-stats{grid-template-columns:1fr 1fr}
.hxp-gens,.hxp-pages,.hxp-drives,.hxp-pillars,.hxp-extras.hxp-two{grid-template-columns:1fr}
}
</style>
<div class="hxp">
  <!-- Intro -->
  <div class="hxp-plate hxp-intro">
    <img src="./icon.svg" alt="Hexapod logo" width="150" height="150" />
    <div>
      <p class="hxp-lede">Hexapod is a family of 3D-printed, six-legged robots. Nougat, Mochi and Macaroon each walk on 18 servos, carry an ESP32 and host their own WiFi network, and all three run the same firmware. Its companion, <strong>Hexapod Link</strong>, is a kinematics simulator that models whichever robot it connects to and drives it live, from a single joint up to a whole gait.</p>
      <div class="hxp-actions">
        <a class="hxp-btn hxp-btn-primary" href="https://github.com/rookidroid/hexapod">Robots &amp; firmware <small>GitHub</small></a>
        <a class="hxp-btn hxp-btn-dark" href="https://github.com/rookidroid/hexapod-link">Hexapod Link <small>GitHub</small></a>
        <a class="hxp-btn hxp-btn-ghost" href="https://rookidroid.com/">Build guides <small>rookidroid.com</small></a>
      </div>
    </div>
  </div>
  <div class="hxp-strip"><b>Two repos</b><span><a href="https://github.com/rookidroid/hexapod">rookidroid/hexapod</a>: hardware, ESP32 firmware and gait generator (GPL-3.0) · <a href="https://github.com/rookidroid/hexapod-link">rookidroid/hexapod-link</a>: simulator and desktop app (MIT)</span></div>
  <!-- Hero -->
  <section>
    <div class="hxp-hero">
      <figure class="hxp-monitor">
        <img src="./mochi.jpg" alt="Mochi, a white hexapod robot with a round body and six three-jointed legs" loading="lazy" />
        <figcaption>Mochi · the round-bodied, MG92B build</figcaption>
      </figure>
      <div class="hxp-stats">
        <div class="hxp-plate hxp-stat"><b>3</b><span>robots, one firmware</span></div>
        <div class="hxp-plate hxp-stat"><b>18</b><span>servos per robot</span></div>
        <div class="hxp-plate hxp-stat"><b>19</b><span>built-in motions</span></div>
        <div class="hxp-plate hxp-stat"><b>50 Hz</b><span>live pose control</span></div>
      </div>
    </div>
  </section>
  <!-- Story -->
  <section>
    <div class="hxp-plate hxp-story">
      <h2>Why I Built This</h2>
      <p class="hxp-kick">A toy that turned into a platform</p>
      <p>This project started as something simple: I wanted to build a toy for my kids. A real, walking, six-legged robot they could hold, control, and be genuinely excited about.</p>
      <p>It grew across four generations, through underpowered servos, a hunt for real torque, a round redesign and a scaled-up build, and picked up its own software along the way: one firmware shared by every robot, a gait generator that turns each robot's dimensions into motion, and a simulator to work out a pose on screen before the robot ever moves.</p>
      <p>The hexapods are now a platform I hope my kids will one day use to learn the skills that matter: <strong>3D printing</strong>, <strong>electronics</strong>, <strong>coding</strong>, and the engineering habit of iterating until something actually works. Every prototype and every hard-won fix is part of that story.</p>
    </div>
  </section>
  <!-- Family -->
  <section>
    <h2>The Family</h2>
    <p class="hxp-kick">Four generations · three robots you can build today</p>
    <div class="hxp-gens">
      <div class="hxp-plate hxp-gen hxp-old">
        <figure><img src="./v1.jpg" alt="The first hexapod prototype, with a rectangular body and MG90S servos" loading="lazy" /></figure>
        <div>
          <span class="hxp-badge">Version 1</span>
          <h3>The Foundation</h3>
          <p class="hxp-sub">The ambitious baseline</p>
          <p>A proof of concept for the leg geometry and multi-directional walking. Physics caught up quickly: standard <strong>MG90S</strong> micro servos were too weak for the weight and the dynamic loads of walking, and the wiring tangled.</p>
          <p class="hxp-lesson"><strong>Lesson:</strong> servo count doesn't matter if the torque can't carry the chassis.</p>
          <div class="hxp-chips"><span>MG90S servos</span><span>18 DOF</span><span>Rectangular body</span><span>Retired</span></div>
        </div>
      </div>
      <div class="hxp-plate hxp-gen">
        <figure><img src="./nougat.jpg" alt="Nougat, a hexapod with a rectangular body and 21G digital servos" loading="lazy" /></figure>
        <div>
          <span class="hxp-badge">Version 2 · Nougat</span>
          <h3>The Quest for Power</h3>
          <p class="hxp-sub">Torque, and the signal to match it</p>
          <p>Legs redesigned around beefier <strong>21G digital servos</strong>, with an <strong>ESP32</strong> for WiFi. Torque alone wasn't the answer: two <strong>PCA9685</strong> PWM drivers and a power stage sized for all 18 servos turned the extra strength into a steady gait.</p>
          <p class="hxp-lesson"><strong>Lesson:</strong> torque only pays off when signal precision keeps up with it.</p>
          <div class="hxp-chips"><span>21G digital servos</span><span>ESP32</span><span>2 × 18650</span></div>
          <div class="hxp-glinks"><a href="https://rookidroid.com/build-your-own-nougat/">Build guide</a><a href="https://rookidroid.com/product/hexapod-nougat/">3D print files</a><a href="https://rookidroid.com/product/hexapod-controller-board-mochi-esp32/">Controller board</a></div>
        </div>
      </div>
      <div class="hxp-plate hxp-gen">
        <figure><img src="./mochi.jpg" alt="Mochi, a hexapod with a round body and MG92B micro servos" loading="lazy" /></figure>
        <div>
          <span class="hxp-badge">Version 3 · Mochi</span>
          <h3>Refinement &amp; Redesign</h3>
          <p class="hxp-sub">Form, function and the perfect fit</p>
          <p>The <strong>MG92B</strong> is the strongest micro servo that still fits a compact frame, with high torque in a smaller footprint than the 21G. That allowed a tighter, <strong>circular body</strong>: better symmetry, more leg clearance in every direction, and a friendlier face.</p>
          <p class="hxp-lesson"><strong>Result:</strong> the smallest of the family, with a smooth gait.</p>
          <div class="hxp-chips"><span>MG92B servos</span><span>ESP32</span><span>2 × 18650</span><span>Round body</span></div>
          <div class="hxp-glinks"><a href="https://rookidroid.com/build-your-own-mochi/">Build guide</a><a href="https://rookidroid.com/product/hexapod-mochi/">3D print files</a><a href="https://rookidroid.com/product/hexapod-controller-board-esp32/">Controller board</a></div>
        </div>
      </div>
      <div class="hxp-plate hxp-gen">
        <figure><img src="./macaroon.jpg" alt="Macaroon, the largest hexapod, with 25 kg digital servos" loading="lazy" /></figure>
        <div>
          <span class="hxp-badge">Version 4 · Macaroon</span>
          <h3>Scaling Up</h3>
          <p class="hxp-sub">The biggest and strongest</p>
          <p>Eighteen <strong>25 kg digital servos</strong> replace the micro servos, with longer legs and a wider body to match. Four 18650 cells in <strong>2S2P</strong> feed the servos directly at up to 8.4 V through a controller board built for the load.</p>
          <p class="hxp-lesson"><strong>Result:</strong> the same firmware and controls, with torque to spare.</p>
          <div class="hxp-chips"><span>25 kg servos</span><span>ESP32</span><span>4 × 18650 (2S2P)</span></div>
          <div class="hxp-glinks"><a href="https://rookidroid.com/build-your-own-macaroon/">Build guide</a><a href="https://rookidroid.com/product/hexapod-macaroon/">3D print files</a><a href="https://rookidroid.com/product/hexapod-controller-board-macaroon-esp32/">Controller board</a></div>
        </div>
      </div>
    </div>
    <div class="hxp-tablewrap">
      <table class="hxp-table">
        <thead><tr><th></th><th>Nougat</th><th>Mochi</th><th>Macaroon</th></tr></thead>
        <tbody>
          <tr><th>Servos</th><td>18 × 21G digital</td><td>18 × MG92B micro</td><td>18 × 25 kg digital</td></tr>
          <tr><th>Battery</th><td>2 × 18650 (2S)</td><td>2 × 18650 (2S)</td><td>4 × 18650 (2S2P)</td></tr>
          <tr><th>Coxa / femur / tibia</th><td>38 / 54 / 97 mm</td><td>36 / 44 / 85 mm</td><td>62 / 76 / 132 mm</td></tr>
          <tr><th>Gait frame period</th><td>12 ms</td><td>12 ms</td><td>25 ms</td></tr>
          <tr><th>WiFi network</th><td><code>hexapod_nougat</code></td><td><code>hexapod</code></td><td><code>hexapod_macaroon</code></td></tr>
          <tr><th>Firmware define</th><td><code>ROBOT_NOUGAT</code></td><td><code>ROBOT_MOCHI</code></td><td><code>ROBOT_MACAROON</code></td></tr>
        </tbody>
      </table>
    </div>
    <p class="hxp-note">Each build guide covers the bill of materials, the printed parts, assembly, wiring, software setup, calibration and troubleshooting. The same guides live in the <a href="https://github.com/rookidroid/hexapod/tree/master/robots">robots folder</a> of the repo.</p>
  </section>
  <!-- Firmware -->
  <section>
    <h2>One Firmware for Every Robot</h2>
    <p class="hxp-kick">ESP32 · Arduino · two PCA9685 drivers</p>
    <div class="hxp-prose">
      <p>All three robots run one Arduino sketch. What differs between them is data: each robot's leg mounts, link lengths, postures, gait radii and joint limits live in one JSON file. The <strong>path tool</strong>, a small NumPy gait generator with its own inverse kinematics, turns that file into look-up tables of servo positions for every motion, and the firmware plays them back. Adding a robot is mostly a matter of writing its JSON.</p>
    </div>
    <div class="hxp-pipe">
      <div class="hxp-node"><b>Geometry</b><code>robots/&lt;name&gt;.json</code>: legs, links, postures, gaits</div>
      <div class="hxp-link" aria-hidden="true">→</div>
      <div class="hxp-node"><b>Path tool</b>Inverse kinematics and gait paths, written out as <code>motion.h</code></div>
      <div class="hxp-link" aria-hidden="true">→</div>
      <div class="hxp-node hxp-hot"><b>ESP32</b>Plays the tables, streams poses, serves its own config</div>
      <div class="hxp-link" aria-hidden="true">→</div>
      <div class="hxp-node"><b>Clients</b>Browser, Android app, Arcade Remote, Hexapod Link</div>
    </div>
    <div class="hxp-extras">
      <div class="hxp-extra"><strong>19 built-in motions</strong>Walking in eight directions, fast forward and back, turning in place, a climbing gait, body pitch, roll and yaw, and a twist.</div>
      <div class="hxp-extra"><strong>Adjustable gait speed</strong>20 to 100 % of each robot's tuned rate. Below full speed the firmware blends between table frames, so slow gaits stay smooth.</div>
      <div class="hxp-extra"><strong>Non-blocking motion engine</strong>Gaits, streamed poses and every transition between them run on one tick-driven loop, so the web page and OTA stay responsive while it walks. Gaits change only at the start or middle of a cycle, by way of standby.</div>
      <div class="hxp-extra"><strong>Browser calibration</strong>Trim each servo's offset with + and − on the robot's own web page; offsets save to flash, with no recompiling.</div>
      <div class="hxp-extra"><strong>Over-the-air updates</strong>After the first USB upload, flash new firmware over WiFi from the Arduino IDE, with an optional password.</div>
      <div class="hxp-extra hxp-warn"><strong>Failsafes</strong>The robot returns to standby if motion commands stop for 500 ms, or if a pose stream stops for 1 s. Streamed poses are slew-limited per joint, so a big jump becomes a controlled move.</div>
    </div>
    <p class="hxp-note">Pick the robot by leaving one <code>#define ROBOT_*</code> uncommented in <code>robot.h</code>, or skip that step: every <a href="https://github.com/rookidroid/hexapod/releases">release</a> includes a ready-to-open sketch for each robot.</p>
  </section>
  <!-- Ways to drive -->
  <section>
    <h2>Ways to Drive It</h2>
    <p class="hxp-kick">Join the robot's WiFi · then pick a controller</p>
    <div class="hxp-drives">
      <div class="hxp-plate hxp-drive">
        <h3>Any browser</h3>
        <p>The robot serves its own controller at <code>192.168.4.1</code>, so a phone, tablet or laptop drives it with nothing installed. Hold the dial to walk in eight directions, the grid for body moves and climbing, or use <strong>W A S D</strong> on a keyboard. Let go and it settles to standby.</p>
      </div>
      <div class="hxp-plate hxp-drive">
        <h3>Android app</h3>
        <p>The <a href="https://play.google.com/store/apps/details?id=com.rookiedev.hexapod">Hexapod app</a> on Google Play connects to the robot's network and plays every built-in motion from on-screen buttons.</p>
      </div>
      <div class="hxp-plate hxp-drive">
        <h3>Arcade Remote</h3>
        <p>A <a href="/2023/03/18/remote-arcade/">microswitch joystick and five arcade buttons</a> around an ESP32-C6, in a 3D-printed cabinet. It sends the gait speed with every packet.</p>
      </div>
      <div class="hxp-plate hxp-drive">
        <h3>Hexapod Link</h3>
        <p>The simulator below: pose the robot joint by joint or by its body, play a gait frame by frame, and send any of it to the real robot. It also calibrates the servos.</p>
      </div>
      <div class="hxp-plate hxp-drive">
        <h3>Your own code</h3>
        <p>Everything above speaks a small binary protocol over UDP port <code>1234</code>. A gait is one 7-byte packet:</p>
<pre><code># magic, walk forward,
# sequence, 60 % speed
struct.pack("&lt;BBIB",
  0xA5, 1, seq, 60)</code></pre>
      </div>
      <div class="hxp-plate hxp-drive">
        <h3>The robot describes itself</h3>
        <p><code>GET /robot_config</code> returns the robot's name, firmware version, servo range, speed range, command list and full leg geometry, so a client can model any robot in the family without keeping its own copy.</p>
      </div>
    </div>
    <div class="hxp-tablewrap">
      <table class="hxp-table">
        <thead><tr><th>Magic</th><th>Packet</th><th>Size</th><th>Purpose</th></tr></thead>
        <tbody>
          <tr><th><code>0xA5</code></th><td>Motion command</td><td>6 or 7 B</td><td>Play a built-in motion, optionally at a set speed; resend to keep moving</td></tr>
          <tr><th><code>0xA6</code></th><td>Real-time pose</td><td>44 B</td><td>Stream servo positions for all 18 joints, with a per-joint slew limit</td></tr>
          <tr><th><code>0xA7</code></th><td>Session control</td><td>6 B</td><td>Enter or leave real-time mode, relax the servos, keep alive</td></tr>
          <tr><th><code>0xA8</code></th><td>Version query</td><td>5 B</td><td>Ask for the firmware version; the only packet the robot answers</td></tr>
        </tbody>
      </table>
    </div>
    <p class="hxp-note">All packets are little-endian and unpadded. The full reference, with byte layouts and Python examples, is in the <a href="https://github.com/rookidroid/hexapod/blob/master/software/hexapod_esp32/README.md">firmware README</a>.</p>
  </section>
  <!-- Hexapod Link -->
  <section>
    <h2>Hexapod Link</h2>
    <p class="hxp-kick">Kinematics simulator · real-robot remote</p>
    <div class="hxp-plate hxp-link-intro">
      <img src="./link-icon.png" alt="Hexapod Link icon" width="110" height="110" />
      <div>
        <p>Hexapod Link answers two questions about a six-legged robot. Given the angle of every joint, what does it look like? And given where the body should be, which joint angles get it there, and is that pose even possible? It draws the robot, its center of gravity and its support polygon in an interactive 3D view, and runs in the browser or as a desktop app.</p>
        <div class="hxp-actions">
          <a class="hxp-btn hxp-btn-primary" href="https://github.com/rookidroid/hexapod-link">Source on GitHub</a>
          <a class="hxp-btn hxp-btn-dark" href="https://github.com/rookidroid/hexapod-link/actions/workflows/build-desktop.yml">Desktop builds <small>Windows · Linux</small></a>
        </div>
      </div>
    </div>
    <div class="hxp-strip"><b>Fork</b><span>Built on <a href="https://github.com/mithi/hexapod-robot-simulator">mithi/hexapod-robot-simulator</a>, extended with a desktop app, real-robot control, calibration and a rebuilt test suite.</span></div>
    <div class="hxp-split">
      <figure class="hxp-monitor">
        <img src="https://raw.githubusercontent.com/rookidroid/hexapod-link/master/docs/images/walk.gif" alt="One tripod gait cycle playing in the 3D view" loading="lazy" />
        <figcaption>One tripod gait cycle in the 3D view</figcaption>
      </figure>
      <div class="hxp-prose">
        <p>When it connects, the app asks the robot for its config and reshapes the simulated body to match, so what is on screen agrees with the hardware. Nougat, Mochi, Macaroon or a new robot all work without touching the app, and the last config is cached so the robot can still be modeled offline.</p>
        <p>Every pose you set can then stream to the robot. Joint angles are clamped to the robot's mechanical limits and converted to servo ticks using each leg's mirroring from that same config, then sent at 100 Hz; the robot slews toward them on its 50 Hz servo loop.</p>
      </div>
    </div>
    <div class="hxp-pages">
      <div class="hxp-plate hxp-page">
        <figure><img src="./kinematics.png" alt="The Kinematics page: a table of 18 joint angles beside the 3D hexapod" loading="lazy" /></figure>
        <div><h3>Kinematics</h3><p>Set all 18 joint angles by hand and watch the body follow.</p><small>Streams every pose to the servos</small></div>
      </div>
      <div class="hxp-plate hxp-page">
        <figure><img src="./inverse-kinematics.png" alt="The Inverse Kinematics page: body translation and rotation sliders beside the 3D hexapod" loading="lazy" /></figure>
        <div><h3>Inverse Kinematics</h3><p>Translate and rotate the body; the solver finds the joint angles, or says why it can't.</p><small>Streams once the pose is reachable</small></div>
      </div>
      <div class="hxp-plate hxp-page">
        <figure><img src="./leg-patterns.png" alt="The Leg Patterns page: one set of angles applied to all six legs" loading="lazy" /></figure>
        <div><h3>Leg Patterns</h3><p>Sweep all six legs together through one set of angles.</p><small>Streams every pose to the servos</small></div>
      </div>
      <div class="hxp-plate hxp-page">
        <figure><img src="./motion.png" alt="The Motion page: gait playback controls beside the 3D hexapod" loading="lazy" /></figure>
        <div><h3>Motion</h3><p>Play the generated gaits frame by frame and scrub through them, then run the same motion on the robot at 20 to 100 % speed.</p><small class="hxp-flash">Runs the robot's own gait from flash</small></div>
      </div>
    </div>
    <div class="hxp-flow">
      <div class="hxp-plate hxp-stage">
        <h3>Join its WiFi</h3>
        <p>The robot is the access point, so the computer running the app joins it directly. The robot stands up when a client connects.</p>
      </div>
      <div class="hxp-plate hxp-stage">
        <h3>Connect</h3>
        <p>Open the <strong>ROBOT</strong> panel from the status button in the navigation bar and connect to <code>192.168.4.1</code>. The stream and run controls light up on the pages that use them.</p>
      </div>
      <div class="hxp-plate hxp-stage">
        <h3>Drive or calibrate</h3>
        <p>Stream poses, trigger built-in gaits, or open the <strong>Calibration</strong> page to trim each servo's offset and save it to the robot's flash.</p>
      </div>
    </div>
    <div class="hxp-extras hxp-two">
      <div class="hxp-extra"><strong>Built-in gaits or streamed frames</strong>The Motion page can trigger the robot's own gait, played from flash so WiFi can't make it stutter, or stream the simulator's frames for paths the firmware doesn't have.</div>
      <div class="hxp-extra"><strong>Same names as the firmware</strong>Legs and joints are numbered the way the firmware numbers them, so a leg picked out in the 3D view is the leg the calibration page calls by that name.</div>
      <div class="hxp-extra"><strong>No robot needed to try it</strong><code>tools/fake_robot.py</code> stands in for the hardware, and the test suite covers the kinematics, the streaming protocol and config reading without a display, a browser or a robot.</div>
      <div class="hxp-extra hxp-warn"><strong>Safety</strong>Put the robot on a stand before streaming: a pose that is stable in the simulator isn't always stable on the floor. If the stream stops, the robot eases back to standby after 1 s.</div>
    </div>
  </section>
  <!-- Design -->
  <section>
    <h2>Design Philosophy</h2>
    <p class="hxp-kick">Printable on a hobby printer · repairable by hand</p>
    <div class="hxp-pillars">
      <div class="hxp-pillar"><h3>Layer orientation</h3><p>Print layers line up with the load, spreading stress along their length so walking forces don't split them apart.</p></div>
      <div class="hxp-pillar"><h3>Reinforced joints</h3><p>Leg segments and servo mounts have strengthened connection points that spread loads and avoid stress concentrations.</p></div>
      <div class="hxp-pillar"><h3>Balanced frame</h3><p>The body keeps weight central and wiring short, for stable walking and an even load across all six legs.</p></div>
      <div class="hxp-pillar"><h3>Modular assembly</h3><p>Interlocking parts need little glue, so repairs and upgrades take no special tools.</p></div>
      <div class="hxp-pillar"><h3>PLA or PETG</h3><p>The geometry holds up in standard filaments under repeated dynamic stress.</p></div>
      <div class="hxp-pillar"><h3>Full control stack</h3><p>BOM, wiring diagrams, a gait generator, firmware, a browser controller, an Android app and a simulator, all open source.</p></div>
    </div>
    <div class="hxp-stack">
      <span>ESP32</span><span>Arduino</span><span>PCA9685</span><span>WiFi UDP</span><span>OTA</span><span>NumPy</span><span>Python</span><span>Plotly Dash</span><span>pywebview</span><span>PyInstaller</span><span>pytest</span><span>GitHub Actions</span>
    </div>
  </section>
  <!-- Get started -->
  <section class="hxp-cockpit">
    <h2>Get Started</h2>
    <p class="hxp-kick">Build · flash · drive · simulate</p>
    <div class="hxp-cockpit-grid">
      <div>
        <h3>1. Build a robot</h3>
        <p>Follow the guide for <a href="https://rookidroid.com/build-your-own-nougat/">Nougat</a>, <a href="https://rookidroid.com/build-your-own-mochi/">Mochi</a> or <a href="https://rookidroid.com/build-your-own-macaroon/">Macaroon</a>: print the parts, assemble the legs and body, and wire the controller board.</p>
      </div>
      <div>
        <h3>2. Flash the firmware</h3>
        <p>Open <code>software/hexapod_esp32</code> in the Arduino IDE, pick your robot in <code>robot.h</code> and upload. Or start from your robot's sketch in the latest release.</p>
<pre><code>// robot.h: leave exactly one uncommented
#define ROBOT_MOCHI</code></pre>
      </div>
      <div>
        <h3>3. Calibrate and drive</h3>
        <p>Join the robot's WiFi (password <code>hexapod_1234</code>) and open <code>http://192.168.4.1/</code>. Level the legs on the <strong>Calibrate</strong> tab, save, then walk it from the <strong>Drive</strong> tab.</p>
      </div>
      <div>
        <h3>4. Run Hexapod Link</h3>
        <p>Python 3.13+. Add <code>--no-window --port 8050</code> to use a browser instead of the desktop window.</p>
<pre><code>pip install -r requirements-desktop.txt
python hexapod_link.py
python tools/fake_robot.py nougat  # no robot?</code></pre>
      </div>
    </div>
    <p class="hxp-cockpit-note">Prebuilt Windows and Linux bundles of Hexapod Link (about 130 MB) come out of every <a href="https://github.com/rookidroid/hexapod-link/actions/workflows/build-desktop.yml">build-desktop run</a>. Questions about the robots go to <a href="https://github.com/rookidroid/hexapod/issues">hexapod issues</a>, and about the app to <a href="https://github.com/rookidroid/hexapod-link/issues">hexapod-link issues</a>.</p>
  </section>
  <div class="hxp-foot">
    <span>Robots &amp; firmware GPL-3.0 · Hexapod Link MIT</span>
    <span><a href="https://github.com/rookidroid/hexapod">hexapod</a> · <a href="https://github.com/rookidroid/hexapod-link">hexapod-link</a> · <a href="/2023/03/18/remote-arcade/">Arcade Remote</a> · <a href="https://rookidroid.com/">rookidroid.com</a></span>
  </div>
</div>
