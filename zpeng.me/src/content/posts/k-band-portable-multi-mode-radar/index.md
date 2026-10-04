---
title: "K-Band Portable Multi-Mode Radar"
date: 2017-01-28
updated: 2026-10-04
description: "A 24-GHz portable radar on a flexible substrate that switches between FMCW and interferometry modes, used for tracking people, range-Doppler imaging, wind-turbine monitoring, and non-contact speech sensing."
tags: ["Micro-Doppler", "Radar", "Vital sign"]
cover: "./photo.jpg"
rawHtml: true
wpId: 3951
---
<div class="rp">
  <div class="rp-plate rp-intro">
    <div class="rp-lede">
      <p>A portable 24-GHz radar that works in two modes. In <strong>FMCW</strong> mode it measures range to track moving people. In <strong>interferometry</strong> mode it holds a single frequency to sense small motions such as vital signs. An on-board microcontroller switches between the two modes, which share the same RF parts and signal paths.</p>
      <p>Moving to 24 GHz shrinks the antennas and makes the radar more sensitive to small motions than its <a href="/2017/01/28/c-band-portable-multi-mode-radar/">5.8-GHz sibling</a>. The RF board is built on a thin, flexible substrate. I used the radar to track people, make range-Doppler images, monitor wind turbines, and sense speech from vocal-fold vibration; it was also used for SAR imaging from an unmanned aerial vehicle.</p>
      <div class="rp-meta"><span class="rp-hl">Ph.D. research</span><span>Texas Tech University</span><span>2015–2017</span></div>
    </div>
    <dl class="rp-facts">
      <div><dt>Frequency</dt><dd>24 GHz (K-band)</dd></div>
      <div><dt>Modes</dt><dd>FMCW and interferometry, on one RF chain</dd></div>
      <div><dt>RF board</dt><dd>Flexible Rogers RT/duroid 5880, 0.245 mm thick</dd></div>
      <div><dt>Size</dt><dd>118 × 45 × 15 mm</dd></div>
      <div><dt>Data capture</dt><dd>A laptop sound card</dd></div>
    </dl>
  </div>
  <figure class="rp-monitor">
    <img src="./photo.jpg" alt="The K-band portable multi-mode radar prototype" />
    <figcaption><b>Fig. 1</b>The K-band portable multi-mode radar prototype</figcaption>
  </figure>
  <div class="rp-stats">
    <div class="rp-plate rp-stat"><b>24 GHz</b><span>carrier frequency</span></div>
    <div class="rp-plate rp-stat"><b>2</b><span>radar modes, one RF chain</span></div>
    <div class="rp-plate rp-stat"><b>0.245 mm</b><span>flexible RF substrate</span></div>
    <div class="rp-plate rp-stat"><b>118 mm</b><span>long, 45 mm wide, 15 mm thick</span></div>
  </div>
  <section>
    <h2>Design</h2>
    <p class="rp-kick">Two modes, one set of hardware</p>
    <figure class="rp-fig">
      <img src="./block-diagram.jpg" alt="Block diagram of the 24-GHz multi-mode radar" loading="lazy" />
      <figcaption><b>Fig. 2</b>Block diagram of the 24-GHz flexible multi-mode radar prototype</figcaption>
    </figure>
    <div class="rp-prose">
      <p>The architecture (Fig. 2) follows the same idea as the C-band radar: to keep the system simple and cheap, the FMCW and interferometry modes share the same RF components and signal paths, and a laptop sound card samples the baseband signal.</p>
      <ul class="rp-list">
        <li><strong>Interferometry mode</strong> runs at a single 24-GHz carrier. Vital signs are so slow that a sound card would filter them out, so a <strong>low-IF modulation</strong> shifts the baseband signal up to an intermediate frequency before sampling.</li>
        <li><strong>FMCW mode</strong> sweeps a free-running VCO with a sawtooth from a simple op-amp circuit. A <strong>reference pulse sequence</strong>, locked to the sawtooth, is recorded alongside the beat signal so that every chirp can be aligned, which keeps the measurements coherent.</li>
      </ul>
    </div>
  </section>
  <section>
    <h2>Hardware</h2>
    <p class="rp-kick">Flexible RF board, rigid baseband board</p>
    <div class="rp-prose">
      <p>The RF board (Fig. 1) is built on Rogers RT/duroid 5880 only 0.245 mm thick, so it can bend. The baseband board is a rigid FR4 PCB. Assembled, the radar measures 118 × 45 × 15 mm (Figs. 3 and 4).</p>
    </div>
    <div class="rp-figs">
      <figure class="rp-fig"><img src="./assembled-top.jpg" alt="Top view of the assembled radar" loading="lazy" /><figcaption><b>Fig. 3</b>The assembled radar, top</figcaption></figure>
      <figure class="rp-fig"><img src="./assembled-bottom.jpg" alt="Bottom view of the assembled radar" loading="lazy" /><figcaption><b>Fig. 4</b>The assembled radar, bottom</figcaption></figure>
    </div>
  </section>
  <section>
    <h2>Experiments</h2>
    <p class="rp-kick">What the radar can do</p>
    <div class="rp-exps">
      <div class="rp-plate rp-exp">
        <h3>Tracking two people</h3>
        <p>Two people walked in front of the radar in the same corridor. Person A walked away from the radar and back, while person B walked toward it and away again. Both paths are visible in the range profiles (Fig. 5), along with returns from stationary clutter.</p>
        <p>Adding Doppler turns the range profiles into a range-Doppler video. In the frame in Fig. 6, A is walking away and B is walking toward the radar, so the two show up at opposite Doppler frequencies.</p>
        <div class="rp-figs">
          <figure class="rp-fig"><img src="./range-profile.jpg" alt="Range profiles of two people walking in opposite directions" loading="lazy" /><figcaption><b>Fig. 5</b>Range profiles of two people walking in opposite directions</figcaption></figure>
          <figure class="rp-fig"><img src="./range-doppler.jpg" alt="One frame of the range-Doppler video" loading="lazy" /><figcaption><b>Fig. 6</b>One frame of the range-Doppler video</figcaption></figure>
        </div>
      </div>
      <div class="rp-plate rp-exp">
        <h3>Monitoring wind turbines</h3>
        <div class="rp-split">
          <div>
            <p>At the American Wind Power Center in Lubbock, Texas, which has turbines of many sizes and designs, I aimed the radar at a Vestas V47 (Fig. 7) and recorded its micro-Doppler signature. Fig. 8 shows the spectrogram. Signatures like this can be used to monitor the structural health of the turbine.</p>
            <figure class="rp-fig"><img src="./wind-turbine-data.jpg" alt="Spectrogram of the Vestas V47 wind turbine" loading="lazy" /><figcaption><b>Fig. 8</b>Spectrogram of the Vestas V47 wind turbine</figcaption></figure>
          </div>
          <figure class="rp-fig rp-narrow"><img src="./wind-turbine.jpg" alt="Radar measurement at the American Wind Power Center" loading="lazy" /><figcaption><b>Fig. 7</b>Measuring at the American Wind Power Center, Lubbock, TX</figcaption></figure>
        </div>
      </div>
      <div class="rp-plate rp-exp">
        <h3>Hearing speech without a microphone</h3>
        <div class="rp-split">
          <div>
            <p>When we speak, our vocal folds vibrate. Aimed at a speaker's throat (Fig. 9), the radar picks up these vibrations directly, so it captures speech without relying on sound traveling through the air.</p>
            <p>Because it does not hear background noise, this “auditory radar” could help with robust speech recognition, speech recovery, and surveillance.</p>
          </div>
          <figure class="rp-fig"><img src="./speech.jpg" alt="Experimental setup of the auditory radar" loading="lazy" /><figcaption><b>Fig. 9</b>Experimental setup of the auditory radar</figcaption></figure>
        </div>
      </div>
    </div>
  </section>
  <section>
    <h2>Publications</h2>
    <p class="rp-kick">Where this work appeared</p>
    <ol class="rp-pubs">
      <li><span class="rp-ptitle"><a href="http://www.mdpi.com/1424-8220/16/8/1181/htm">Time-varying vocal folds vibration detection using a 24 GHz portable auditory radar</a></span><span class="rp-pauth">H. Hong, H. Zhao, <strong>Z. Peng</strong>, H. Li, C. Gu, C. Li, and X. Zhu</span><span class="rp-pvenue"><span class="rp-ptype rp-journal">Journal</span><em>Sensors</em>, vol. 16, no. 8, article 1181, Aug. 2016</span></li>
      <li><span class="rp-ptitle"><a href="http://ieeexplore.ieee.org/document/7487021">Short-range Doppler-radar signatures from industrial wind turbines: theory, simulations, and measurements</a></span><span class="rp-pauth">J.-M. Muñoz-Ferreras, <strong>Z. Peng</strong>, Y. Tang, R. Gómez-García, D. Liang, and C. Li</span><span class="rp-pvenue"><span class="rp-ptype rp-journal">Journal</span><em>IEEE Transactions on Instrumentation and Measurement</em>, vol. 65, no. 9, pp. 2108–2119, Sep. 2016</span></li>
      <li><span class="rp-ptitle"><a href="http://ieeexplore.ieee.org/document/7540011">A portable 24-GHz auditory radar for non-contact speech sensing with background noise rejection and directional discrimination</a></span><span class="rp-pauth">H. Zhao, <strong>Z. Peng</strong>, H. Hong, X. Zhu, and C. Li</span><span class="rp-pvenue"><span class="rp-ptype">Conference</span><em>IEEE International Microwave Symposium (IMS)</em>, San Francisco, CA, May 2016</span></li>
      <li><span class="rp-ptitle"><a href="http://ieeexplore.ieee.org/document/7585400">24-GHz biomedical radar on flexible substrate for ISAR imaging</a></span><span class="rp-pauth"><strong>Z. Peng</strong>, J.-M. Muñoz-Ferreras, R. Gómez-García, L. Ran, and C. Li</span><span class="rp-pvenue"><span class="rp-ptype">Conference</span><em>IEEE International Wireless Symposium (IWS)</em>, Shanghai, China, Mar. 2016</span></li>
      <li><span class="rp-ptitle"><a href="http://ieeexplore.ieee.org/document/7303787">A portable 24-GHz FMCW radar based on six-port for indoor human tracking</a></span><span class="rp-pauth"><strong>Z. Peng</strong> and C. Li</span><span class="rp-pvenue"><span class="rp-ptype">Conference</span><em>IEEE MTT-S International Microwave Workshop Series on RF and Wireless Technologies for Biomedical and Healthcare Applications (IMWS-BIO)</em>, Taipei, Taiwan, Sep. 2015</span></li>
    </ol>
  </section>
  <div class="rp-foot">
    <span>Part of my Ph.D. research at Texas Tech University</span>
    <span><a href="/research-projects/">All research projects</a> · <a href="/publications/">Publications</a></span>
  </div>
</div>
