---
title: "24-GHz Radar-on-Chip"
date: 2017-01-28
updated: 2026-10-04
description: "A single-chip 24-GHz radar transceiver in 0.13-µm CMOS, built with the startup yearONE LLC to bring the cost of K-band radar down for consumer and biomedical uses. I designed the transmitter chain."
tags: ["IC design", "Radar"]
cover: "./photo.jpg"
rawHtml: true
wpId: 3866
---
<div class="rp">
  <div class="rp-plate rp-intro">
    <div class="rp-lede">
      <p>A complete 24-GHz radar transceiver on a single 2 × 2 mm chip, built in GlobalFoundries' 0.13-µm <strong>CMOS</strong> process. K-band radar front ends were traditionally made in GaAs. Moving them to standard CMOS lowers the cost, which matters most for radar in consumer electronics and biomedical devices.</p>
      <p>I worked on this chip with <strong>yearONE LLC</strong>, a startup, and was responsible for the transmitter. To keep the cost down, the die goes into a low-cost QFN (quad flat no-lead) package.</p>
      <div class="rp-meta"><span class="rp-hl">Industry collaboration</span><span>yearONE LLC</span><span>2013–2014</span></div>
    </div>
    <dl class="rp-facts">
      <div><dt>Frequency</dt><dd>24 GHz (K-band)</dd></div>
      <div><dt>Process</dt><dd>GlobalFoundries 0.13-µm CMOS</dd></div>
      <div><dt>Die size</dt><dd>2 × 2 mm</dd></div>
      <div><dt>Package</dt><dd>QFN</dd></div>
      <div><dt>Design tools</dt><dd>Cadence Virtuoso</dd></div>
    </dl>
  </div>
  <figure class="rp-monitor">
    <img src="./photo.jpg" alt="Photo of the fabricated 24-GHz radar chip" />
    <figcaption><b>Fig. 1</b>The fabricated 2 × 2 mm radar transceiver die</figcaption>
  </figure>
  <section>
    <h2>My Part: the Transmitter</h2>
    <p class="rp-kick">From oscillator to package pin</p>
    <div class="rp-cards">
      <div class="rp-card"><small>01 · Source</small><strong>LC-tank VCO</strong>Generates the 24-GHz carrier, tuned by an inductor-capacitor resonator.</div>
      <div class="rp-card"><small>02 · Phases</small><strong>Polyphase filter</strong>Splits the signal into quadrature phases.</div>
      <div class="rp-card"><small>03 · Drive</small><strong>RF buffers</strong>Buffer the signal between stages and drive the output.</div>
      <div class="rp-card"><small>04 · Output</small><strong>Package matching network</strong>Matches the transmitter output to the QFN package.</div>
    </div>
  </section>
  <section>
    <h2>Layout and Fabrication</h2>
    <p class="rp-kick">Cadence Virtuoso to silicon</p>
    <div class="rp-prose">
      <p>The chip was designed in Cadence Virtuoso. Fig. 2 shows the final layout of the full transceiver, and Fig. 1 the fabricated die.</p>
    </div>
    <figure class="rp-fig rp-narrow"><img src="./layout.jpg" alt="Layout of the 24-GHz radar transceiver" loading="lazy" /><figcaption><b>Fig. 2</b>Layout of the 24-GHz radar transceiver</figcaption></figure>
  </section>
  <div class="rp-foot">
    <span>Collaboration with yearONE LLC</span>
    <span><a href="/research-projects/">All research projects</a> · <a href="/publications/">Publications</a></span>
  </div>
</div>
