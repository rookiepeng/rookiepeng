---
title: "Ku-Band High-Gain Horn Antenna Array"
date: 2017-01-27
updated: 2026-10-04
description: "A 16 × 4 quadrature-polarized horn antenna array for Ku-band satellite communication, covering 500-MHz bands at 12.5 GHz and 14.25 GHz, with its feed network designed in CST Microwave Studio."
tags: ["Antenna Array", "Beamforming"]
cover: "./array.jpg"
rawHtml: true
wpId: 3928
---
<div class="rp">
  <div class="rp-plate rp-intro">
    <div class="rp-lede">
      <p>A high-gain horn antenna array for <strong>Ku-band satellite communication</strong>. Sixty-four horns, arranged 16 × 4, are quadrature polarized and driven through a feed network. The array covers two bands, at 12.5 GHz and 14.25 GHz, each 500 MHz wide.</p>
      <p>I designed the horns and the feed network in CST Microwave Studio. Some parts of the design are on my <a href="https://github.com/rookiepeng">GitHub</a>.</p>
      <div class="rp-meta"><span class="rp-hl">Antenna design</span><span>Satellite communication</span></div>
    </div>
    <dl class="rp-facts">
      <div><dt>Elements</dt><dd>16 × 4 horns</dd></div>
      <div><dt>Bands</dt><dd>12.5 GHz and 14.25 GHz</dd></div>
      <div><dt>Bandwidth</dt><dd>500 MHz per band</dd></div>
      <div><dt>Polarization</dt><dd>Quadrature</dd></div>
      <div><dt>Design tool</dt><dd>CST Microwave Studio</dd></div>
    </dl>
  </div>
  <figure class="rp-monitor">
    <img src="./array.jpg" alt="Front view of the 16 by 4 horn array" />
    <figcaption><b>Fig. 1</b>Front view of the array</figcaption>
  </figure>
  <div class="rp-stats">
    <div class="rp-plate rp-stat"><b>64</b><span>horns in a 16 × 4 grid</span></div>
    <div class="rp-plate rp-stat"><b>12.5 GHz</b><span>lower band</span></div>
    <div class="rp-plate rp-stat"><b>14.25 GHz</b><span>upper band</span></div>
    <div class="rp-plate rp-stat"><b>500 MHz</b><span>bandwidth per band</span></div>
  </div>
  <section>
    <h2>Feed Network</h2>
    <p class="rp-kick">Behind the horns</p>
    <div class="rp-split">
      <div class="rp-prose">
        <p>A high-gain array only works if every horn receives its share of the signal with the right phase, across both bands. The feed network that distributes the signal sits behind the aperture (Fig. 2). I designed and simulated it together with the horns in CST Microwave Studio.</p>
      </div>
      <figure class="rp-fig rp-narrow"><img src="./feed.jpg" alt="Side view of the array showing the feed network" loading="lazy" /><figcaption><b>Fig. 2</b>Side view of the array and its feed network</figcaption></figure>
    </div>
  </section>
  <div class="rp-foot">
    <span>Antenna array design</span>
    <span><a href="/research-projects/">All research projects</a> · <a href="https://github.com/rookiepeng">GitHub</a></span>
  </div>
</div>
