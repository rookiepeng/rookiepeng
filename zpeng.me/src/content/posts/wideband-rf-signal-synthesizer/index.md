---
title: "Wideband RF Signal Synthesizer"
date: 2017-01-18
updated: 2026-10-04
description: "A team-built RF signal generator from off-the-shelf parts: 150 kHz to 3 GHz in 0.1-Hz steps, output from −130 to +20 dBm in 0.1-dB steps, with its own microcontroller, CPLD, and PC control software."
tags: ["Signal Synthesizer", "Wideband"]
cover: "./photo.jpg"
rawHtml: true
wpId: 3922
---
<div class="rp">
  <div class="rp-plate rp-intro">
    <div class="rp-lede">
      <p>Can a capable RF signal generator be built entirely from off-the-shelf components? This team project set out to find out, and to measure how well such a design performs.</p>
      <p>The result covers <strong>150 kHz to 3 GHz</strong> in 0.1-Hz steps, with output power adjustable from <strong>−130 dBm to +20 dBm</strong> in 0.1-dB steps. It is a complete instrument: RF hardware, a microcontroller and a CPLD to run it, and a control program on a PC.</p>
      <div class="rp-meta"><span class="rp-hl">Team project</span><span>Hardware and software</span></div>
    </div>
    <dl class="rp-facts">
      <div><dt>Frequency range</dt><dd>150 kHz – 3 GHz, 0.1-Hz steps</dd></div>
      <div><dt>Output power</dt><dd>−130 to +20 dBm, 0.1-dB steps</dd></div>
      <div><dt>Phase noise at 2.2 GHz</dt><dd>−84 dBc/Hz at 1 kHz offset<br />−93 dBc/Hz at 10 kHz offset</dd></div>
    </dl>
  </div>
  <figure class="rp-monitor">
    <img src="./photo.jpg" alt="Photo of the signal synthesizer prototype" />
    <figcaption><b>Fig. 1</b>The prototype</figcaption>
  </figure>
  <div class="rp-stats">
    <div class="rp-plate rp-stat"><b>3 GHz</b><span>top frequency, from 150 kHz</span></div>
    <div class="rp-plate rp-stat"><b>0.1 Hz</b><span>frequency step</span></div>
    <div class="rp-plate rp-stat"><b>150 dB</b><span>output power range</span></div>
    <div class="rp-plate rp-stat"><b>−93</b><span>dBc/Hz at 10 kHz offset, 2.2 GHz</span></div>
  </div>
  <section>
    <h2>Hardware</h2>
    <p class="rp-kick">Synthesizer, filters, modulation, power control</p>
    <figure class="rp-fig"><img src="./schematic.jpg" alt="System block diagram of the signal synthesizer" loading="lazy" /><figcaption><b>Fig. 2</b>System block diagram</figcaption></figure>
    <div class="rp-prose">
      <p>The signal chain (Fig. 2) starts with a frequency synthesizer, followed by a filter array, a modulation circuit, and a power controller, all managed by a microcontroller. The microstrip filters were designed in Agilent ADS, and the schematics and PCB layout in Cadence Capture and OrCAD.</p>
    </div>
  </section>
  <section>
    <h2>Software</h2>
    <p class="rp-kick">Three layers of control</p>
    <div class="rp-cards">
      <div class="rp-card"><small>Microcontroller</small><strong>Atmel ATmega88PA</strong>Written in C with AVR Studio.</div>
      <div class="rp-card"><small>CPLD</small><strong>Xilinx XC95144XL</strong>Written in Verilog with the Xilinx ISE Design Suite.</div>
      <div class="rp-card"><small>PC</small><strong>Control interface</strong>Written in C# with Microsoft Visual Studio.</div>
    </div>
  </section>
  <div class="rp-foot">
    <span>Team project</span>
    <span><a href="/research-projects/">All research projects</a> · <a href="/publications/">Publications</a></span>
  </div>
</div>
