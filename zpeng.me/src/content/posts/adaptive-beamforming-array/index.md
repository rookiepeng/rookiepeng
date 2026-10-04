---
title: "Adaptive Beamforming Array"
date: 2017-01-21
updated: 2026-10-04
description: "My Master's thesis: a “complex domain” RF front end that performs adaptive beamforming directly on wideband RF signals with vector multipliers, removing the need for T/R modules and high-speed baseband hardware."
tags: ["Antenna Array", "Beamforming"]
cover: "./schematic.jpg"
rawHtml: true
wpId: 3872
---
<div class="rp">
  <div class="rp-plate rp-intro">
    <div class="rp-lede">
      <p>Wideband digital beamforming usually needs a T/R module and fast baseband hardware on every antenna channel, which makes it expensive and power-hungry. This project proposes a <strong>“complex domain” RF front end</strong> that does the beamforming in the RF domain instead.</p>
      <p>The information that adaptive beamforming actually needs, the waveform delay between antenna elements, changes slowly compared with the RF signal itself. The front end extracts that delay information from the wideband signals, so a <strong>low-speed baseband</strong> is enough to run the whole adaptive system. <strong>Vector RF multipliers</strong> then set the amplitude and phase of each channel from the real and imaginary parts of a complex number, so beamforming algorithms written in the complex domain apply directly, with no conversion.</p>
      <div class="rp-meta"><span class="rp-hl">Master's thesis</span><span>Zhejiang University</span></div>
    </div>
    <dl class="rp-facts">
      <div><dt>Approach</dt><dd>Beamforming in the RF domain with vector multipliers</dd></div>
      <div><dt>Array</dt><dd>5 monopoles, half-wavelength spacing</dd></div>
      <div><dt>Baseband</dt><dd>Low speed, no per-channel high-speed ADCs</dd></div>
      <div><dt>Power</dt><dd>A Li-ion battery</dd></div>
      <div><dt>Published in</dt><dd>IEEE TMTT and IEEE AWPL</dd></div>
    </dl>
  </div>
  <figure class="rp-monitor">
    <img src="./system.jpg" alt="The five-element array, its connection to the RF front end, and the chamber setup" />
    <figcaption><b>Fig. 1</b>(a) The five-element linear array. (b) Its connection to the RF front end. (c) Setup in the anechoic chamber; the inset shows the battery-powered prototype.</figcaption>
  </figure>
  <section>
    <h2>Why It Matters</h2>
    <p class="rp-kick">Conventional vs. complex-domain front end</p>
    <div class="rp-tablewrap">
      <table class="rp-table">
        <thead><tr><th></th><th>Conventional wideband digital beamforming</th><th>Complex-domain RF front end</th></tr></thead>
        <tbody>
          <tr><th>Per-channel RF</th><td>A T/R module on every element</td><td>A simple RF amplifier on every element</td></tr>
          <tr><th>Baseband</th><td>High-speed hardware that handles the full signal bandwidth</td><td>Low speed: only the slowly changing delay information is processed</td></tr>
          <tr><th>Where beams form</th><td>In digital, after sampling</td><td>In the RF domain, by vector multipliers</td></tr>
        </tbody>
      </table>
    </div>
    <div class="rp-prose">
      <p>The result is a much simpler and cheaper way to build wideband beamforming, suited to low-cost, power-efficient applications.</p>
    </div>
  </section>
  <section>
    <h2>Design</h2>
    <p class="rp-kick">Measure the delays, then weight each channel</p>
    <div class="rp-split">
      <div class="rp-prose">
        <p>Fig. 2 shows the architecture. RF amplifiers take the place of T/R modules and amplify the signal from each antenna. Channel 0 serves as the reference: wideband <strong>waveform delay detectors</strong> measure the delay between it and each of the other channels.</p>
        <p>At the same time, <strong>vector multipliers</strong> adjust the amplitude and waveform delay of every channel, so the beam is formed directly in the RF domain.</p>
      </div>
      <figure class="rp-fig"><img src="./schematic.jpg" alt="Block diagram of the RF-domain beamforming system" loading="lazy" /><figcaption><b>Fig. 2</b>Architecture of the RF-domain beamforming system</figcaption></figure>
    </div>
  </section>
  <section>
    <h2>Prototype</h2>
    <p class="rp-kick">Five monopoles and a battery</p>
    <div class="rp-prose">
      <p>The test array has five monopole antennas spaced half a wavelength apart (Fig. 1a). They stand on a Styrofoam support, whose dielectric constant is close to 1, so it barely disturbs the antennas. Coaxial cables connect the array to the RF front end (Fig. 1b), and the prototype was measured in a microwave anechoic chamber running from a Li-ion battery (Fig. 1c).</p>
    </div>
  </section>
  <section>
    <h2>Publications</h2>
    <p class="rp-kick">Where this work appeared</p>
    <ol class="rp-pubs">
      <li><span class="rp-ptitle"><a href="http://ieeexplore.ieee.org/document/7360951">Radio frequency beamforming based on a complex domain frontend</a></span><span class="rp-pauth"><strong>Z. Peng</strong>, J. Chen, Y. Dong, B. Zhang, D. Ye, J. Huangfu, Y. Sun, C. Li, and L. Ran</span><span class="rp-pvenue"><span class="rp-ptype rp-journal">Journal</span><em>IEEE Transactions on Microwave Theory and Techniques</em>, vol. 64, no. 1, pp. 289–298, Jan. 2016</span></li>
      <li><span class="rp-ptitle"><a href="http://ieeexplore.ieee.org/document/6680657">Unconventional beamforming for quasi-hemispheric coverage of a phased array antenna</a></span><span class="rp-pauth"><strong>Z. Peng</strong>, T. Hu, W. Cui, J. Huangfu, C. Li, and L. Ran</span><span class="rp-pvenue"><span class="rp-ptype rp-journal">Journal</span><em>IEEE Antennas and Wireless Propagation Letters</em>, vol. 12, pp. 1654–1657, Dec. 2013</span></li>
    </ol>
  </section>
  <div class="rp-foot">
    <span>Master's thesis project</span>
    <span><a href="/research-projects/">All research projects</a> · <a href="/publications/">Publications</a></span>
  </div>
</div>
