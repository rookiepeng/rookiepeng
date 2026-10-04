---
title: "Hexapod"
date: 2024-09-12
updated: 2026-06-19
description: "This agile, 3D-printed hexapod robot, powered by ESP32 and Arduino, features a robust and durable structure, smooth and nimble movement, and WiFi-enabled remote control. It also supports over-the-air (OTA) firmware updates for effortless maintenance."
tags: ["Hexapod", "Toy"]
cover: "./v3-mochi.jpg"
rawHtml: true
wpId: 4408
---
<!-- =====================================================================
  Hexapod Evolution Timeline — RookiDroid
  Paste into a WordPress "Custom HTML" block.
  All classes prefixed "hxt-" to avoid theme conflicts.
  Fonts (Space Grotesk, Inter) are already loaded by the RookiDroid theme.
====================================================================== -->
<style>
/* ── Reset (scoped) ────────────────────────────────────────────────── */
.hxt-wrap *, .hxt-wrap *::before, .hxt-wrap *::after {
  box-sizing: border-box;
}
.hxt-wrap { margin: 0; padding: 0; }
/* ── Design tokens matching rookidroid.com ─────────────────────────── */
.hxt-wrap {
  --hxt-purple:    #9c27b0;
  --hxt-purple-dk: #671576;
  --hxt-dark:      #021437;
  --hxt-text:      #111111;
  --hxt-muted:     #555e6d;
  --hxt-light-bg:  #f5f0f7;
  --hxt-border:    #e5d9ed;
  --hxt-white:     #ffffff;
  --hxt-v1:        #9c27b0;
  --hxt-v2:        #e64f2a;
  --hxt-v3:        #021437;
  --hxt-v4:        #006064;
  --hxt-radius:    16px;
  --hxt-spine:     3px;
  font-family: Inter, system-ui, sans-serif;
  color: var(--hxt-text);
  line-height: 1.6;
}
/* ── Stats bar ─────────────────────────────────────────────────────── */
.hxt-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 56px;
}
.hxt-stat {
  background: var(--hxt-light-bg);
  border: 1px solid var(--hxt-border);
  border-radius: 12px;
  padding: 20px 16px;
  text-align: center;
}
.hxt-stat-num {
  font-family: 'Space Grotesk', Inter, sans-serif;
  font-size: 2rem;
  font-weight: 800;
  color: var(--hxt-purple);
  display: block;
}
.hxt-stat-label {
  font-size: .78rem;
  color: var(--hxt-muted);
  margin-top: 2px;
}
/* ── Timeline shell ────────────────────────────────────────────────── */
.hxt-timeline {
  position: relative;
  padding: 0 0 16px;
}
/* SVG spine is injected via JS below; no ::before needed */
/* ── Entry ─────────────────────────────────────────────────────────── */
.hxt-entry {
  position: relative;
  margin-bottom: 200px;
}
.hxt-entry:last-child { margin-bottom: 0; }
/* Hide spacers — not needed in full-width layout */
.hxt-entry .hxt-spacer { display: none; }
/* Cards take nearly the full row width */
/* Left entry: dot is on the right, so card leaves right margin for it */
.hxt-entry.hxt-left  .hxt-card { margin-right: 88px; margin-left: 0; }
/* Right entry: dot is on the left, so card leaves left margin for it */
.hxt-entry.hxt-right .hxt-card { margin-left: 88px; margin-right: 0; }
/* ── Node ──────────────────────────────────────────────────────────── */
/* Dots are absolutely pinned to the far edge of their row */
.hxt-node {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 56px;
  top: 24px;
  z-index: 1;
}
/* Left-entry dot: pinned to far RIGHT edge */
.hxt-entry.hxt-left  .hxt-node { right: 0; left: auto; }
/* Right-entry dot: pinned to far LEFT edge */
.hxt-entry.hxt-right .hxt-node { left: 0; right: auto; }
.hxt-bubble {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Space Grotesk', Inter, sans-serif;
  font-weight: 800;
  font-size: .85rem;
  color: #fff;
  flex-shrink: 0;
}
.hxt-entry.hxt-v1 .hxt-bubble { background: var(--hxt-v1); box-shadow: 0 0 0 4px #fff, 0 0 0 6px var(--hxt-v1); }
.hxt-entry.hxt-v2 .hxt-bubble { background: var(--hxt-v2); box-shadow: 0 0 0 4px #fff, 0 0 0 6px var(--hxt-v2); }
.hxt-entry.hxt-v3 .hxt-bubble { background: var(--hxt-v3); box-shadow: 0 0 0 4px #fff, 0 0 0 6px var(--hxt-v3); }
.hxt-entry.hxt-v4 .hxt-bubble { background: var(--hxt-v4); box-shadow: 0 0 0 4px #fff, 0 0 0 6px var(--hxt-v4); }
/* ── Card ──────────────────────────────────────────────────────────── */
.hxt-card {
  background: var(--hxt-white);
  border: 1px solid var(--hxt-border);
  border-radius: var(--hxt-radius);
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,.06);
  transition: box-shadow .25s, transform .25s;
  display: flex;
  flex-direction: row;
  align-items: stretch;
}
/* Right-entry cards: flip so image is on the outer (right) edge */
.hxt-entry.hxt-right .hxt-card { flex-direction: row-reverse; }
.hxt-card:hover {
  box-shadow: 0 8px 32px rgba(156,39,176,.15);
  transform: translateY(-4px);
}
.hxt-card-img {
  width: 38%;
  max-width: 340px;
  max-height: 420px;
  flex-shrink: 0;
  object-fit: cover;
  object-position: center top;
  display: block;
  background: var(--hxt-light-bg);
  align-self: flex-start;
}
.hxt-card-body { padding: 24px 26px; flex: 1; min-width: 0; }
/* Badge */
.hxt-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: .68rem;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;
  padding: 3px 10px;
  border-radius: 50px;
  margin-bottom: 10px;
}
.hxt-entry.hxt-v1 .hxt-badge { background: rgba(156,39,176,.1); color: var(--hxt-v1); border: 1px solid rgba(156,39,176,.3); }
.hxt-entry.hxt-v2 .hxt-badge { background: rgba(230,79,42,.1);  color: var(--hxt-v2); border: 1px solid rgba(230,79,42,.3); }
.hxt-entry.hxt-v3 .hxt-badge { background: rgba(2,20,55,.08);   color: var(--hxt-v3); border: 1px solid rgba(2,20,55,.2); }
.hxt-entry.hxt-v4 .hxt-badge { background: rgba(0,96,100,.08);  color: var(--hxt-v4); border: 1px solid rgba(0,96,100,.25); }
.hxt-card-body h3 {
  font-family: 'Space Grotesk', Inter, sans-serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--hxt-text);
  margin: 0 0 2px;
}
.hxt-subtitle {
  font-size: .82rem;
  color: var(--hxt-muted);
  margin-bottom: 12px;
}
.hxt-card-body p {
  font-size: .88rem;
  color: #333;
  margin-bottom: 12px;
}
.hxt-specs {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-bottom: 16px;
}
.hxt-spec {
  background: var(--hxt-light-bg);
  border: 1px solid var(--hxt-border);
  border-radius: 8px;
  padding: 3px 9px;
  font-size: .73rem;
  color: var(--hxt-muted);
}
.hxt-lesson {
  background: rgba(156,39,176,.06);
  border-left: 3px solid var(--hxt-purple);
  border-radius: 0 8px 8px 0;
  padding: 9px 12px;
  font-size: .82rem;
  color: var(--hxt-purple-dk);
  margin-bottom: 16px;
}
.hxt-lesson strong { color: var(--hxt-purple); }
/* Button */
.hxt-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: Inter, system-ui, sans-serif;
  font-size: .82rem;
  font-weight: 600;
  padding: 9px 20px;
  border-radius: 50px;
  text-decoration: none !important;
  transition: opacity .2s, transform .15s;
}
.hxt-btn:hover { opacity: .85; transform: translateY(-1px); }
.hxt-entry.hxt-v1 .hxt-btn { background: var(--hxt-purple); color: #fff !important; }
.hxt-entry.hxt-v2 .hxt-btn { background: var(--hxt-v2);     color: #fff !important; }
.hxt-entry.hxt-v3 .hxt-btn { background: var(--hxt-dark);   color: #fff !important; }
.hxt-entry.hxt-v4 .hxt-btn { background: var(--hxt-v4);     color: #fff !important; }
/* ── Story section ────────────────────────────────────────────────── */
.hxt-story {
  background: linear-gradient(135deg, #f5f0f7 0%, #fdf4ff 100%);
  border: 1px solid var(--hxt-border);
  border-radius: var(--hxt-radius);
  padding: 32px 36px;
  margin-bottom: 56px;
  position: relative;
  overflow: hidden;
}
.hxt-story::before {
  content: '\1F916';
  position: absolute;
  right: 24px;
  top: 16px;
  font-size: 5rem;
  opacity: .08;
  line-height: 1;
  pointer-events: none;
}
.hxt-story h2 {
  font-family: 'Space Grotesk', Inter, sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--hxt-purple);
  margin: 0 0 12px;
}
.hxt-story p {
  font-size: .92rem;
  color: #333;
  margin-bottom: 10px;
  max-width: 680px;
}
.hxt-story p:last-child { margin-bottom: 0; }
/* ── Design philosophy section ─────────────────────────────────────── */
.hxt-philosophy { margin-top: 56px; }
.hxt-phil-intro {
  background: linear-gradient(135deg, var(--hxt-dark) 0%, #0d2060 100%);
  border-radius: var(--hxt-radius) var(--hxt-radius) 0 0;
  padding: 32px 36px;
}
.hxt-phil-intro h2 {
  font-family: 'Space Grotesk', Inter, sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 12px;
}
.hxt-phil-intro p {
  font-size: .9rem;
  color: rgba(255,255,255,.8);
  max-width: 720px;
  margin: 0;
  line-height: 1.7;
}
.hxt-phil-pillars {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--hxt-border);
  border: 1px solid var(--hxt-border);
  border-top: none;
  overflow: hidden;
}
.hxt-pillar {
  background: #fff;
  padding: 20px 20px 22px;
}
.hxt-pillar-icon { font-size: 1.5rem; display: block; margin-bottom: 8px; }
.hxt-pillar h4 {
  font-family: 'Space Grotesk', Inter, sans-serif;
  font-size: .88rem;
  font-weight: 700;
  color: var(--hxt-text);
  margin: 0 0 5px;
}
.hxt-pillar p { font-size: .78rem; color: var(--hxt-muted); margin: 0; line-height: 1.5; }
.hxt-phil-footer {
  background: var(--hxt-light-bg);
  border: 1px solid var(--hxt-border);
  border-top: none;
  border-radius: 0 0 var(--hxt-radius) var(--hxt-radius);
  padding: 14px 24px;
  font-size: .8rem;
  color: var(--hxt-muted);
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
/* ── Instructions section ──────────────────────────────────────────── */
.hxt-instructions {
  background: linear-gradient(135deg, var(--hxt-dark) 0%, #170d36 100%);
  border-radius: var(--hxt-radius);
  padding: 36px 40px;
  margin-bottom: 56px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 12px 32px rgba(2, 20, 55, 0.15);
}
.hxt-instructions::before {
  content: '';
  position: absolute;
  top: -50px;
  right: -50px;
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, rgba(156,39,176,0.25) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}
.hxt-instructions::after {
  content: '';
  position: absolute;
  bottom: -80px;
  left: -40px;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(230,79,42,0.15) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}
.hxt-instr-hero {
  text-align: center;
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  position: relative;
  z-index: 1;
}
.hxt-instr-hero h2 {
  font-family: 'Space Grotesk', Inter, system-ui, sans-serif;
  font-size: 1.6rem;
  font-weight: 800;
  color: #fff;
  margin: 0 0 16px;
  text-shadow: 0 2px 8px rgba(0,0,0,0.4);
}
.hxt-instr-hero p {
  color: rgba(255,255,255,0.85);
  font-size: .95rem;
  line-height: 1.6;
  max-width: 500px;
  margin: 0 auto 24px;
}
.hxt-instr-hero-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ab47bc 0%, #7b1fa2 100%);
  color: #fff !important;
  font-weight: 700;
  font-size: 1.05rem;
  padding: 14px 32px;
  border-radius: 50px;
  text-decoration: none !important;
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(156, 39, 176, 0.4);
  border: 1px solid rgba(255,255,255,0.15);
}
.hxt-instr-hero-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(156, 39, 176, 0.6);
  filter: brightness(1.1);
}
.hxt-instr-resources {
  position: relative;
  z-index: 1;
}
.hxt-instr-resources h3 {
  font-family: 'Space Grotesk', Inter, sans-serif;
  font-size: .95rem;
  color: rgba(255,255,255,0.7);
  margin: 0 0 16px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.hxt-res-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.hxt-res-card {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 14px;
  text-decoration: none !important;
  transition: all 0.3s ease;
}
.hxt-res-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(156, 39, 176, 0.4);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2), 0 0 15px rgba(156, 39, 176, 0.15);
}
.hxt-res-icon {
  font-size: 1.6rem;
  flex-shrink: 0;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
}
.hxt-res-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.hxt-res-title {
  color: #fff;
  font-weight: 700;
  font-size: .9rem;
}
.hxt-res-action {
  color: #ab47bc;
  font-size: .75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
/* ── Entry backgrounds ─────────────────────────────────────────────── */
/* Border accent on the image side edge */
.hxt-entry.hxt-v1 .hxt-card-img { border-left:  4px solid var(--hxt-v1); }
.hxt-entry.hxt-v2 .hxt-card-img { border-right: 4px solid var(--hxt-v2); }
.hxt-entry.hxt-v3 .hxt-card-img { border-left:  4px solid var(--hxt-v3); }
.hxt-entry.hxt-v4 .hxt-card-img,
.hxt-entry.hxt-v4 .hxt-soon-img { border-right: 4px dashed var(--hxt-v4); }
/* ── V4 coming-soon placeholder ────────────────────────────────────── */
.hxt-soon-img {
  width: 38%;
  max-width: 340px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: linear-gradient(135deg, #004D40 0%, #006064 60%, #00838F 100%);
  color: #fff;
  min-height: 200px;
}
.hxt-soon-icon { font-size: 3.5rem; line-height: 1; }
.hxt-soon-label {
  font-family: 'Space Grotesk', Inter, sans-serif;
  font-size: .78rem;
  font-weight: 700;
  letter-spacing: .15em;
  text-transform: uppercase;
  opacity: .75;
}
.hxt-soon-badge {
  display: inline-block;
  background: rgba(255,255,255,.15);
  border: 1px solid rgba(255,255,255,.3);
  border-radius: 50px;
  padding: 4px 14px;
  font-size: .72rem;
  font-weight: 700;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: #fff;
  animation: hxt-pulse 2s ease-in-out infinite;
}
@keyframes hxt-pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: .4; }
}
/* ── Responsive ────────────────────────────────────────────────────── */
@media (max-width: 680px) {
  /* Revert cards to vertical stacking on mobile */
  .hxt-card,
  .hxt-entry.hxt-right .hxt-card { flex-direction: column; }
  .hxt-card-img {
    width: 100%;
    max-width: none;
    aspect-ratio: 4 / 3;
  }
  .hxt-soon-img {
    width: 100%;
    max-width: none;
    aspect-ratio: 4 / 3;
  }
  .hxt-spine-svg { display: none; }
  .hxt-timeline::before {
    content: '';
    position: absolute;
    top: 24px; bottom: 24px;
    left: 26px;
    width: var(--hxt-spine);
    background: linear-gradient(to bottom, var(--hxt-v1), var(--hxt-v2), var(--hxt-v3));
    border-radius: 99px;
  }
  .hxt-entry.hxt-left  .hxt-card,
  .hxt-entry.hxt-right .hxt-card { margin-left: 56px !important; margin-right: 0 !important; }
  .hxt-entry.hxt-left  .hxt-node,
  .hxt-entry.hxt-right .hxt-node { position: absolute; left: 0 !important; right: auto !important; top: 24px; }
  .hxt-entry.hxt-left  .hxt-spacer,
  .hxt-entry.hxt-right .hxt-spacer { display: none; }
  .hxt-stats { grid-template-columns: 1fr; }
  .hxt-instr-grid { grid-template-columns: 1fr; }
  .hxt-phil-pillars { grid-template-columns: 1fr; }
  .hxt-story, .hxt-instructions, .hxt-phil-intro, .hxt-phil-footer { padding: 24px 20px; }
}
</style>
<div class="hxt-wrap">
  <!-- Story -->
  <div class="hxt-story">
    <h2>Why I Built This</h2>
    <p>This project started as something simple: I wanted to build a toy for my kids. A real, walking, six-legged robot they could hold, control, and be genuinely excited about.</p>
    <p>But as it grew across three generations — through underpowered servos, violent jitter, and a complete chassis redesign — it became something more. Hexapod Mochi is now a platform I hope my kids will one day use to learn the skills that matter: <strong>3D printing</strong>, <strong>electronics</strong>, <strong>coding</strong>, and the engineering mindset of iterating until something actually works.</p>
    <p>Every design flaw, every failed prototype, and every hard-won fix is part of the story. That&#8217;s the whole point.</p>
  </div>
  <!-- Stats bar -->
  <div class="hxt-stats">
    <div class="hxt-stat">
      <span class="hxt-stat-num">3</span>
      <div class="hxt-stat-label">Design Generations</div>
    </div>
    <div class="hxt-stat">
      <span class="hxt-stat-num">18</span>
      <div class="hxt-stat-label">Degrees of Freedom</div>
    </div>
    <div class="hxt-stat">
      <span class="hxt-stat-num">MG92B</span>
      <div class="hxt-stat-label">Final Servo Choice</div>
    </div>
  </div>
  <!-- Timeline -->
  <div class="hxt-timeline">
    <!-- V1 -->
    <div class="hxt-entry hxt-left hxt-v1">
      <div class="hxt-card">
        <img decoding="async" class="hxt-card-img"
          src="./v1.jpg"
          alt="Hexapod v1" loading="lazy" />
        <div class="hxt-card-body">
          <span class="hxt-badge">&#9679;&nbsp;Version 1</span>
          <h3>The Foundation</h3>
          <p class="hxt-subtitle">The Ambitious Baseline</p>
          <p>Every great robotics project begins with a simple question: <em>Can I make this move smoothly?</em> The first version was a proof of concept to test leg geometry and basic multi-directional locomotion.</p>
          <p>Physics caught up quickly. Built around standard <strong>MG90S</strong> micro servos, the robot was fighting an uphill battle — the servos were simply too weak for the combined weight and dynamic forces of walking. The internal wiring layout was clunky and prone to tangling.</p>
          <div class="hxt-lesson"><strong>Lesson:</strong> Raw servo count doesn&#8217;t matter if torque is insufficient for the chassis weight.</div>
          <div class="hxt-specs">
            <span class="hxt-spec">⚙️ MG90S servos</span>
            <span class="hxt-spec">🦿 18 DOF</span>
            <span class="hxt-spec">📐 Rectangular chassis</span>
            <span class="hxt-spec">⚠️ Underpowered</span>
          </div>
        </div>
      </div>
      <div class="hxt-node"><div class="hxt-bubble">v1</div></div>
      <div class="hxt-spacer"></div>
    </div>
    <!-- V2 -->
    <div class="hxt-entry hxt-right hxt-v2">
      <div class="hxt-spacer"></div>
      <div class="hxt-node"><div class="hxt-bubble">v2</div></div>
      <div class="hxt-card">
        <img decoding="async" class="hxt-card-img"
          src="./v2.jpg"
          alt="Hexapod v2" loading="lazy" />
        <div class="hxt-card-body">
          <span class="hxt-badge">&#9679;&nbsp;Version 2</span>
          <h3>The Quest for Power</h3>
          <p class="hxt-subtitle">The Battle Against Jitter</p>
          <p>To solve v1&#8217;s power deficit, v2 took a brute-force approach. The system was upgraded to support either a <strong>Raspberry Pi Pico</strong> or an <strong>ESP32</strong>, and the legs were completely redesigned to house beefier <strong>21g servos</strong>.</p>
          <p>In practice, high-quality 21g servos proved frustratingly difficult to source. Sub-par components caused a massive problem: <strong>terrible, violent jittering</strong>. The robot had the power to lift itself but spent more time shaking than walking.</p>
          <div class="hxt-lesson"><strong>Lesson:</strong> Raw torque is worthless without component quality and signal precision.</div>
          <div class="hxt-specs">
            <span class="hxt-spec">⚙️ 21g servos</span>
            <span class="hxt-spec">🧠 Pico / ESP32</span>
            <span class="hxt-spec">🦿 18 DOF</span>
            <span class="hxt-spec">⚠️ Severe jitter</span>
          </div>
        </div>
      </div>
    </div>
    <!-- V3 -->
    <div id="v3" class="hxt-entry hxt-left hxt-v3">
      <div class="hxt-card">
        <img decoding="async" class="hxt-card-img"
          src="./v3-mochi.jpg"
          alt="Hexapod Mochi v3" loading="lazy" />
        <div class="hxt-card-body">
          <span class="hxt-badge">&#9679;&nbsp;Version 3 — Mochi</span>
          <h3>Refinement &amp; Redesign</h3>
          <p class="hxt-subtitle">Form, Function, and the Perfect Fit</p>
          <p>The breakthrough came with the <strong>MG92B</strong> servo — the strongest micro servo available that still fits a compact form factor. It delivers high torque without the massive footprint or violent jitter of v2.</p>
          <p>With hardware dialed in, the chassis was radically transformed. The rectangular body gave way to a <strong>sleek circular layout</strong>, improving symmetry, multidirectional leg clearance, and lending the robot a distinctly friendly personality. Meet <strong>Mochi</strong>.</p>
          <div class="hxt-lesson"><strong>Result:</strong> Smooth gait, OTA firmware updates, and WiFi UDP control from any device.</div>
          <div class="hxt-specs">
            <span class="hxt-spec">⚙️ MG92B servos</span>
            <span class="hxt-spec">🧠 ESP32</span>
            <span class="hxt-spec">🦿 18 DOF</span>
            <span class="hxt-spec">📶 WiFi UDP</span>
            <span class="hxt-spec">🔄 OTA updates</span>
            <span class="hxt-spec">⭕ Circular chassis</span>
          </div>
          <!-- Instructions -->
          <div class="hxt-instructions" style="margin-top:24px;margin-bottom:0;">
            <div class="hxt-instr-hero">
              <h2>&#128218;&nbsp; Build Your Own &#8211; Mochi</h2>
              <p>Everything you need to 3D print, assemble, wire, and calibrate your Mochi hexapod is now consolidated into one comprehensive, step-by-step build guide.</p>
              <a href="https://rookidroid.com/build-your-own-mochi/" target="_blank" rel="noopener" class="hxt-instr-hero-btn">📖 Read the Full Build Guide</a>
            </div>
            <div class="hxt-instr-resources">
              <h3>Downloads &amp; Parts</h3>
              <div class="hxt-res-grid">
                <!-- 3D Print Files -->
                <a class="hxt-res-card" href="https://rookidroid.com/product/hexapod-mochi/" target="_blank" rel="noopener">
                  <span class="hxt-res-icon">🖨️</span>
                  <div class="hxt-res-text">
                    <span class="hxt-res-title">3D Print Files</span>
                    <span class="hxt-res-action">⬇️ Free Download</span>
                  </div>
                </a>
                <!-- ESP32 Controller -->
                <a class="hxt-res-card" href="https://rookidroid.com/product/hexapod-controller-board-esp32/" target="_blank" rel="noopener">
                  <span class="hxt-res-icon">⚡</span>
                  <div class="hxt-res-text">
                    <span class="hxt-res-title">ESP32 Controller</span>
                    <span class="hxt-res-action">🛒 Shop Part</span>
                  </div>
                </a>
                <!-- Software Bundle -->
                <a class="hxt-res-card" href="https://rookidroid.com/product/hexapod-mochi-arduino-esp32/" target="_blank" rel="noopener">
                  <span class="hxt-res-icon">💻</span>
                  <div class="hxt-res-text">
                    <span class="hxt-res-title">Software Bundle</span>
                    <span class="hxt-res-action">⬇️ Free Download</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="hxt-node"><div class="hxt-bubble">v3</div></div>
      <div class="hxt-spacer"></div>
    </div>
    <!-- V4 -->
    <div id="v4" class="hxt-entry hxt-right hxt-v4">
      <div class="hxt-spacer"></div>
      <div class="hxt-node"><div class="hxt-bubble">v4</div></div>
      <div class="hxt-card">
        <div class="hxt-soon-img">
          <span class="hxt-soon-icon">🔧</span>
          <span class="hxt-soon-label">In Development</span>
          <span class="hxt-soon-badge">Coming Soon</span>
        </div>
        <div class="hxt-card-body">
          <span class="hxt-badge">&#9679;&nbsp;Version 4 — Macaroon</span>
          <h3>Hexapod Macaroon</h3>
          <p class="hxt-subtitle">Something Bigger Is Coming</p>
          <p>Version 4 is currently in development. Based on everything learned across three generations, Macaroon will push the limits further — smarter control, refined mechanics, and even more character.</p>
          <p>Follow along on <a href="https://rookidroid.com" target="_blank" rel="noopener" style="color:var(--hxt-v4);font-weight:600;">RookiDroid</a> for updates as the build progresses.</p>
        </div>
      </div>
    </div>
  </div><!-- /.hxt-timeline -->
  <!-- Design Philosophy -->
  <div class="hxt-philosophy">
    <div class="hxt-phil-intro">
      <h2>&#9881;&#65039;&nbsp; Design Philosophy</h2>
      <p>Mochi is a six-legged, WiFi-enabled crawler with 18 degrees of freedom and a circular body that balances weight, simplifies wiring, and improves stability. Driven by an ESP32 over a built-in WiFi access point, it supports over-the-air firmware updates and full gait customization. Every structural decision was deliberate.</p>
    </div>
    <div class="hxt-phil-pillars">
      <div class="hxt-pillar">
        <span class="hxt-pillar-icon">&#128200;</span>
        <h4>Layer Orientation</h4>
        <p>Print layers align with load directions, distributing stress along their length to prevent delamination under walking forces.</p>
      </div>
      <div class="hxt-pillar">
        <span class="hxt-pillar-icon">&#128279;</span>
        <h4>Reinforced Joints</h4>
        <p>Leg segments and servo mounts feature strengthened connection points that spread loads and minimize stress concentrations.</p>
      </div>
      <div class="hxt-pillar">
        <span class="hxt-pillar-icon">&#9711;</span>
        <h4>Circular Frame</h4>
        <p>The round body optimizes the weight-to-rigidity ratio for stable locomotion and even servo load distribution across all six legs.</p>
      </div>
      <div class="hxt-pillar">
        <span class="hxt-pillar-icon">&#129521;</span>
        <h4>Modular Assembly</h4>
        <p>Interlocking components reduce adhesive dependency and make repairs or upgrades straightforward without specialized tools.</p>
      </div>
      <div class="hxt-pillar">
        <span class="hxt-pillar-icon">&#129514;</span>
        <h4>Material Flexibility</h4>
        <p>Geometry is optimized to perform reliably with standard PLA or PETG, maintaining durability under repeated dynamic stress.</p>
      </div>
      <div class="hxt-pillar">
        <span class="hxt-pillar-icon">&#128241;</span>
        <h4>Full Control Stack</h4>
        <p>Includes a BOM, wiring diagrams, gait look-up tables, path generation tools, and an Android app for point-and-go control.</p>
      </div>
    </div>
    <div class="hxt-phil-footer">
      <span>&#9989;&nbsp; BOM included</span>
      <span>&#9989;&nbsp; PLA / PETG compatible</span>
      <span>&#9989;&nbsp; OTA firmware</span>
      <span>&#9989;&nbsp; Android app</span>
      <span>&#9989;&nbsp; Custom gait tools</span>
    </div>
  </div>
<script>
(function () {
  function buildSpine() {
    var timeline = document.querySelector('.hxt-timeline');
    if (!timeline) return;
    var old = timeline.querySelector('.hxt-spine-svg');
    if (old) old.remove();
    var tlRect  = timeline.getBoundingClientRect();
    var entries = Array.from(timeline.querySelectorAll('.hxt-entry'));
    if (entries.length < 2) return;
    var R = 14; // corner radius
    // Collect per-entry data
    var info = entries.map(function (entry) {
      var bubble = entry.querySelector('.hxt-bubble');
      var bRect  = bubble.getBoundingClientRect();
      var eRect  = entry.getBoundingClientRect();
      return {
        cx:     bRect.left + bRect.width  / 2 - tlRect.left, // bubble centre x
        cy:     bRect.top  + bRect.height / 2 - tlRect.top,  // bubble centre y
        bottom: eRect.bottom - tlRect.top,                    // card bottom y
        isLeft: entry.classList.contains('hxt-left')
      };
    });
    // Build path: right-angle trace with rounded corners
    // For left-entry (dot at RIGHT): go DOWN → turn LEFT → go UP
    // For right-entry (dot at LEFT): go DOWN → turn RIGHT → go UP
    var d = 'M ' + info[0].cx + ' ' + info[0].cy;
    for (var i = 0; i < info.length - 1; i++) {
      var cur  = info[i];
      var next = info[i + 1];
      var hy   = cur.bottom + 100; // horizontal run: below card bottom edge
      if (cur.isLeft) {
        // Dot at RIGHT  ──►  next dot at LEFT
        // Down the right side
        d += ' L ' + cur.cx + ' ' + (hy - R);
        // Corner: ↓ then ← (clockwise, sweep=1)
        d += ' A ' + R + ' ' + R + ' 0 0 1 ' + (cur.cx - R) + ' ' + hy;
        // Horizontal run left
        d += ' L ' + (next.cx + R) + ' ' + hy;
        // Corner: ← then ↓ (counter-clockwise, sweep=0)
        d += ' A ' + R + ' ' + R + ' 0 0 0 ' + next.cx + ' ' + (hy + R);
      } else {
        // Dot at LEFT  ──►  next dot at RIGHT
        // Down the left side
        d += ' L ' + cur.cx + ' ' + (hy - R);
        // Corner: ↓ then → (counter-clockwise, sweep=0)
        d += ' A ' + R + ' ' + R + ' 0 0 0 ' + (cur.cx + R) + ' ' + hy;
        // Horizontal run right
        d += ' L ' + (next.cx - R) + ' ' + hy;
        // Corner: → then ↓ (clockwise, sweep=1)
        d += ' A ' + R + ' ' + R + ' 0 0 1 ' + next.cx + ' ' + (hy + R);
      }
      // Up to next dot
      d += ' L ' + next.cx + ' ' + next.cy;
    }
    var W = tlRect.width;
    var H = tlRect.height;
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'hxt-spine-svg');
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.setAttribute('width',  W);
    svg.setAttribute('height', H);
    svg.style.cssText = 'position:absolute;top:0;left:0;pointer-events:none;overflow:visible;z-index:0;';
    // Gradient
    var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    var grad = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    grad.setAttribute('id', 'hxt-spine-grad');
    grad.setAttribute('x1', '0'); grad.setAttribute('y1', '0');
    grad.setAttribute('x2', '0'); grad.setAttribute('y2', '1');
    [['0%','#9c27b0'],['50%','#e64f2a'],['100%','#021437']].forEach(function(s){
      var stop = document.createElementNS('http://www.w3.org/2000/svg','stop');
      stop.setAttribute('offset', s[0]);
      stop.setAttribute('stop-color', s[1]);
      grad.appendChild(stop);
    });
    defs.appendChild(grad);
    svg.appendChild(defs);
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'url(#hxt-spine-grad)');
    path.setAttribute('stroke-width', '3');
    path.setAttribute('stroke-linecap', 'square');
    svg.appendChild(path);
    timeline.insertBefore(svg, timeline.firstChild);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildSpine);
  } else {
    buildSpine();
  }
  // Re-draw after images load (cards grow taller)
  window.addEventListener('load', buildSpine);
  window.addEventListener('resize', buildSpine);
})();
</script>
</div><!-- /.hxt-wrap -->
