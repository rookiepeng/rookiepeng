---
title: "CommProbe"
date: 2017-07-04
updated: 2026-10-04
description: "A desktop tool for testing communication links: send and receive messages over TCP, UDP, Bluetooth, CAN, and GPIB from one window, with a single timestamped log. Formerly Socket Test."
tags: ["PySide6", "Python", "TCP", "UDP", "Bluetooth", "CAN", "GPIB"]
cover: "./icon.svg"
rawHtml: true
wpId: 4108
---
<!-- =====================================================================
  CommProbe project page (formerly Socket Test).
  All classes are prefixed "cpb-"; colours come from the site palette in
  src/styles/theme.css. Keep this block free of blank lines, or Markdown
  takes over part way through.
====================================================================== -->
<style>
.cpb{--cpb-gap:56px;max-width:1000px;margin:0 auto;color:var(--text2);line-height:1.65;font-size:1rem}
.cpb *,.cpb *::before,.cpb *::after{box-sizing:border-box}
.cpb h2{font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:1.65rem;line-height:1.25;color:var(--text);margin:0 0 .4rem;padding-left:.7rem;border-left:4px solid var(--accent)}
.cpb h3{font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:1.2rem;color:var(--text);margin:0 0 .5rem}
.cpb p{margin:0 0 .9rem}
.cpb a{color:var(--accent);text-underline-offset:2px}
.cpb a:hover{color:var(--red)}
.cpb code{font-family:var(--mech-mono);font-size:.86em;background:var(--bg3);padding:.08em .35em}
.cpb section{margin-top:var(--cpb-gap)}
.cpb-kick{font-family:var(--mech-mono);font-size:.72rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin:0 0 1.2rem;padding-left:calc(.7rem + 4px)}
/* Armour plate: white panel, navy frame, hard shadow, tricolour trim on top */
.cpb-plate{position:relative;background:var(--surface);border:2px solid var(--frame);box-shadow:var(--shadow-hard)}
.cpb-plate::before{content:'';position:absolute;top:0;left:0;width:100%;height:4px;pointer-events:none;background:repeating-linear-gradient(90deg,var(--yellow) 0 5px,transparent 5px 9px) right 6px top/32px 100% no-repeat,linear-gradient(90deg,var(--red) 0 28px,var(--accent) 28px calc(100% - 44px),transparent calc(100% - 44px))}
/* ── Intro ─────────────────────────────────────────────────────────── */
.cpb-intro{display:grid;grid-template-columns:150px 1fr;gap:32px;align-items:center;padding:36px 36px 32px}
.cpb-intro img{width:150px;height:150px;display:block}
.cpb-lede{font-size:1.08rem;color:var(--text);margin-bottom:1.2rem}
.cpb-actions{display:flex;flex-wrap:wrap;gap:10px}
.cpb-btn{display:inline-flex;align-items:center;gap:.5em;font-family:var(--mech-mono);font-size:.76rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:9px 18px;border:2px solid var(--frame);clip-path:var(--chamfer-clip);text-decoration:none!important;transition:filter .15s,transform .15s}
.cpb-btn:hover{filter:brightness(1.12);transform:translate(-1px,-1px)}
.cpb-btn:active{transform:translate(1px,1px)}
.cpb a.cpb-btn-primary{background:var(--accent);color:#fff}
.cpb a.cpb-btn-dark{background:var(--dark);color:#fff}
.cpb a.cpb-btn-ghost{background:var(--surface);color:var(--text)}
.cpb-btn small{font-weight:400;opacity:.75;letter-spacing:.02em;text-transform:none}
.cpb-renamed{display:flex;flex-wrap:wrap;gap:.3rem .8rem;align-items:baseline;background:var(--bg2);border:2px solid var(--frame);border-top:0;padding:10px 20px;font-size:.86rem;color:var(--muted)}
.cpb-renamed b{font-family:var(--mech-mono);font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#fff;background:var(--frame);padding:2px 7px;clip-path:var(--chamfer-clip-sm)}
/* ── Screenshot monitor ────────────────────────────────────────────── */
.cpb-monitor{position:relative;background:var(--dark);border:2px solid var(--frame);padding:14px;box-shadow:var(--shadow-hard),0 0 0 1px rgba(91,143,245,.25)}
.cpb-monitor::after{--hud:rgba(91,143,245,.75);--arm:16px;content:'';position:absolute;inset:6px;pointer-events:none;background:linear-gradient(var(--hud),var(--hud)) top left/var(--arm) 2px,linear-gradient(var(--hud),var(--hud)) top left/2px var(--arm),linear-gradient(var(--hud),var(--hud)) top right/var(--arm) 2px,linear-gradient(var(--hud),var(--hud)) top right/2px var(--arm),linear-gradient(var(--hud),var(--hud)) bottom left/var(--arm) 2px,linear-gradient(var(--hud),var(--hud)) bottom left/2px var(--arm),linear-gradient(var(--hud),var(--hud)) bottom right/var(--arm) 2px,linear-gradient(var(--hud),var(--hud)) bottom right/2px var(--arm);background-repeat:no-repeat}
.cpb-monitor img{display:block;width:100%;height:auto;margin:0;background:#fff}
/* ── Stats ─────────────────────────────────────────────────────────── */
.cpb-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:32px}
.cpb-stat{text-align:center;padding:22px 12px 16px}
.cpb-stat b{display:block;font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:2.1rem;line-height:1.1;color:var(--accent)}
.cpb-stat span{display:block;font-family:var(--mech-mono);font-size:.7rem;font-weight:600;letter-spacing:.04em;color:var(--muted);margin-top:6px}
/* ── Story + timeline ──────────────────────────────────────────────── */
.cpb-story{padding:34px 36px 30px;background:linear-gradient(135deg,var(--bg) 0%,var(--surface) 55%,var(--bg2) 100%)}
.cpb-story p{max-width:720px}
.cpb-time{list-style:none;margin:1.4rem 0 0;padding:0;display:grid;grid-template-columns:repeat(5,1fr);gap:0;border-top:2px solid var(--frame)}
.cpb-time li{position:relative;padding:16px 12px 0 0;font-size:.86rem}
.cpb-time li::before{content:'';position:absolute;top:-7px;left:0;width:12px;height:12px;background:var(--surface);border:2px solid var(--frame)}
.cpb-time li.cpb-now::before{background:var(--accent)}
.cpb-time b{display:block;font-family:var(--mech-mono);font-size:.74rem;font-weight:700;letter-spacing:.08em;color:var(--accent);margin-bottom:.15rem}
.cpb-time strong{display:block;color:var(--text);font-size:.92rem}
/* ── Protocol cards ────────────────────────────────────────────────── */
.cpb-protos{display:grid;grid-template-columns:repeat(6,1fr);gap:16px}
.cpb-proto{grid-column:span 2;padding:22px 22px 18px}
.cpb-proto.cpb-wide{grid-column:span 3}
.cpb-proto h3{display:flex;align-items:baseline;justify-content:space-between;gap:.6rem;font-size:1.15rem}
.cpb-proto h3 small{font-family:var(--mech-mono);font-size:.64rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}
.cpb-proto ul{margin:0;padding-left:1.1rem;font-size:.9rem}
.cpb-proto li{margin:.3rem 0}
.cpb-proto li strong{color:var(--text)}
.cpb-proto img{display:block;width:100%;height:auto;margin:14px 0 0;border:1px solid var(--border)}
/* ── CAN channel table ─────────────────────────────────────────────── */
.cpb-table{width:100%;border-collapse:collapse;font-size:.9rem;background:var(--surface)}
.cpb-tablewrap{overflow-x:auto;border:2px solid var(--frame);box-shadow:var(--shadow-hard);margin:1.2rem 0 0}
.cpb-table th,.cpb-table td{border-bottom:1px solid var(--border);padding:.6rem .8rem;text-align:left;vertical-align:top}
.cpb-table thead th{background:var(--frame);color:#fff;font-family:var(--mech-mono);font-size:.7rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border-bottom:0}
.cpb-table tbody tr:last-child td,.cpb-table tbody tr:last-child th{border-bottom:0}
.cpb-table tbody th{color:var(--text);white-space:nowrap}
.cpb-tag{font-family:var(--mech-mono);font-size:.72rem;font-weight:700;color:#fff;background:var(--accent);padding:2px 7px;white-space:nowrap}
/* ── Shared features ───────────────────────────────────────────────── */
.cpb-extras{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px}
.cpb-extra{background:var(--surface);border:1px solid var(--border);border-left:4px solid var(--accent);padding:12px 14px;font-size:.88rem}
.cpb-extra strong{display:block;color:var(--text);font-size:.92rem;margin-bottom:.15rem}
.cpb-log{margin:0 0 20px;background:#fff;border:2px solid var(--frame);box-shadow:var(--shadow-hard);padding:14px 18px;font-family:var(--mech-mono);font-size:.8rem;line-height:1.5;color:#1b1f27;overflow-x:auto}
.cpb-log div{white-space:nowrap}
.cpb-log .cpb-ts{color:#90a4ae}
.cpb-log .cpb-in{color:#2196f3}
/* ── Architecture pipeline ─────────────────────────────────────────── */
.cpb-pipe{display:grid;grid-template-columns:1fr 34px 1fr 34px 1fr 34px 1fr;align-items:stretch;margin:1.2rem 0 1rem}
.cpb-node{background:var(--mech-bg2);border:1px solid var(--mech-border);color:var(--mech-text);padding:14px 14px 12px;font-size:.84rem;clip-path:var(--chamfer-clip)}
.cpb-node b{display:block;font-family:var(--mech-mono);font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;color:#fff;margin-bottom:.35rem}
.cpb-node.cpb-hot{border-color:var(--dark-accent);box-shadow:inset 0 3px 0 var(--dark-yellow)}
.cpb-link{display:flex;align-items:center;justify-content:center;color:var(--accent);font-family:var(--mech-mono);font-size:1rem;font-weight:700}
.cpb-pipe-note{font-size:.92rem}
.cpb-stack{display:flex;flex-wrap:wrap;gap:6px;margin-top:20px}
.cpb-stack span{font-family:var(--mech-mono);font-size:.72rem;font-weight:600;color:var(--muted);background:var(--bg3);border:1px solid var(--border);padding:3px 9px}
/* ── Get started (cockpit panel) ───────────────────────────────────── */
.cpb-cockpit{position:relative;background:linear-gradient(135deg,#060c18 0%,#0c1730 100%);color:var(--dark-text2);border:2px solid var(--frame);box-shadow:var(--shadow-hard);padding:40px 36px 32px;scroll-margin-top:80px}
.cpb-cockpit::before{content:'';position:absolute;top:0;left:0;width:100%;height:6px;pointer-events:none;background:linear-gradient(90deg,var(--dark-red) 0 160px,transparent 160px),repeating-linear-gradient(90deg,var(--dark-yellow) 0 14px,transparent 14px 22px),var(--dark-accent)}
.cpb .cpb-cockpit h2{color:#fff;border-left-color:var(--dark-red)}
.cpb .cpb-cockpit h3{color:#fff;font-size:1.05rem}
.cpb .cpb-cockpit a{color:var(--dark-accent)}
.cpb .cpb-cockpit a:hover{color:var(--dark-yellow)}
.cpb .cpb-cockpit code{background:rgba(91,143,245,.14);color:var(--dark-text)}
.cpb-cockpit .cpb-kick{color:var(--dark-muted)}
.cpb pre{margin:.6rem 0;background:#03070f;color:var(--dark-text);border:1px solid #26314a;padding:.7rem .9rem;overflow-x:auto;font-family:var(--mech-mono);font-size:.8rem;line-height:1.55;clip-path:var(--chamfer-clip)}
.cpb pre code{background:none;padding:0;color:inherit;font-size:inherit}
.cpb-deps{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:8px}
.cpb-dep{background:rgba(255,255,255,.035);border:1px solid #26314a;padding:16px 18px 14px;font-size:.9rem}
.cpb-dep b{display:block;font-family:var(--mech-mono);font-size:.7rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--dark-yellow);margin-bottom:.35rem}
.cpb-dep p{margin:0}
.cpb-sub{margin-top:28px;padding-top:22px;border-top:1px dashed #26314a;display:grid;grid-template-columns:1fr 1fr;gap:28px}
.cpb-sub > div{min-width:0}
.cpb-sub p{font-size:.9rem}
/* ── Footer strip ──────────────────────────────────────────────────── */
.cpb-foot{margin-top:var(--cpb-gap);display:flex;flex-wrap:wrap;gap:8px 24px;align-items:center;justify-content:space-between;padding:14px 20px;background:var(--bg2);border:2px solid var(--frame);font-family:var(--mech-mono);font-size:.76rem;color:var(--muted)}
/* ── Responsive ────────────────────────────────────────────────────── */
@media(max-width:860px){
.cpb{--cpb-gap:44px}
.cpb-deps,.cpb-sub{grid-template-columns:1fr}
.cpb-protos{grid-template-columns:1fr}
.cpb-proto,.cpb-proto.cpb-wide{grid-column:auto}
.cpb-stats{grid-template-columns:repeat(2,1fr)}
.cpb-time{grid-template-columns:1fr;border-top:0;border-left:2px solid var(--frame);margin-left:6px}
.cpb-time li{padding:0 0 14px 20px}
.cpb-time li::before{top:3px;left:-7px}
.cpb-pipe{grid-template-columns:1fr;grid-template-rows:auto}
.cpb-link{height:28px;transform:rotate(90deg)}
}
@media(max-width:640px){
.cpb-intro{grid-template-columns:1fr;padding:28px 20px 24px;gap:20px}
.cpb-intro img{width:96px;height:96px}
.cpb-story{padding:28px 20px 24px}
.cpb-cockpit{padding:32px 18px 22px}
}
</style>
<div class="cpb">
  <!-- Intro -->
  <div class="cpb-plate cpb-intro">
    <img src="./icon.svg" alt="CommProbe logo" width="150" height="150" />
    <div>
      <p class="cpb-lede">CommProbe is a desktop tool for testing communication links. Open a TCP server, fire UDP packets, talk to a Bluetooth device, watch a CAN bus, or query a lab instrument over GPIB, all from one window with one timestamped log.</p>
      <div class="cpb-actions">
        <a class="cpb-btn cpb-btn-primary" href="https://github.com/rookiepeng/comm-probe">Source on GitHub</a>
        <a class="cpb-btn cpb-btn-dark" href="#cpb-start">Get started <small>Python 3 · PySide6</small></a>
        <a class="cpb-btn cpb-btn-ghost" href="https://github.com/rookiepeng/comm-probe/issues">Report an issue</a>
      </div>
    </div>
  </div>
  <div class="cpb-renamed"><b>Renamed</b><span>This project used to be called <strong>Socket Test</strong>. The packaged releases on GitHub (up to v4.1) still use the old name.</span></div>
  <!-- Demo -->
  <section>
    <div class="cpb-monitor">
      <img src="https://raw.githubusercontent.com/rookiepeng/comm-probe/master/docs/TCP.png" alt="CommProbe TCP tab with a server and a client connected over loopback, and the message log on the right" loading="lazy" />
    </div>
    <div class="cpb-stats">
      <div class="cpb-plate cpb-stat"><b>5</b><span>protocols, one window</span></div>
      <div class="cpb-plate cpb-stat"><b>5</b><span>CAN interface types</span></div>
      <div class="cpb-plate cpb-stat"><b>1 Mbps</b><span>top CAN bitrate</span></div>
      <div class="cpb-plate cpb-stat"><b>1 ms</b><span>log timestamp resolution</span></div>
    </div>
  </section>
  <!-- Background -->
  <section>
    <div class="cpb-plate cpb-story">
      <h2>Background</h2>
      <p class="cpb-kick">From socket tester to protocol probe</p>
      <p>CommProbe started in 2017 as <strong>Socket Test</strong>, a small PyQt utility for sending and receiving test messages over TCP and UDP. When you are bringing up a device or a piece of firmware, you often just need something on the other end of the link that shows exactly what arrives and lets you send a reply by hand.</p>
      <p>Over the years it picked up more of the links I work with: GPIB for lab instruments, then Bluetooth, and finally CAN. By then it was no longer a socket tool, so version 5 gave it a new name, a cleaner interface, and a code base split into one handler per protocol.</p>
      <ol class="cpb-time">
        <li><b>2017</b><strong>Socket Test</strong>TCP and UDP in PyQt</li>
        <li><b>2021</b><strong>PySide6 + GPIB</strong>Instruments through PyVISA</li>
        <li><b>2022</b><strong>Bluetooth</strong>RFCOMM server and client</li>
        <li><b>2026</b><strong>CAN</strong>Five bus backends via python-can</li>
        <li class="cpb-now"><b>v5</b><strong>CommProbe</strong>New name, echo, repeat timers</li>
      </ol>
    </div>
  </section>
  <!-- Protocols -->
  <section>
    <h2>Five Protocols</h2>
    <p class="cpb-kick">One tab each · shared log on the right</p>
    <div class="cpb-protos">
      <div class="cpb-plate cpb-proto">
        <h3>TCP <small>Server + client</small></h3>
        <ul>
          <li>The <strong>server</strong> listens on any network interface and port; the <strong>client</strong> connects to an IP and port. Both sit on the same tab, so you can loop one back to the other.</li>
          <li><strong>Echo</strong> sends every received message back to the client.</li>
        </ul>
      </div>
      <div class="cpb-plate cpb-proto">
        <h3>UDP <small>Listen + send</small></h3>
        <ul>
          <li>Listens on a chosen interface and port.</li>
          <li>Sends to any target IP and port, so it works for unicast tests and for talking to devices that broadcast status packets.</li>
        </ul>
      </div>
      <div class="cpb-plate cpb-proto">
        <h3>Bluetooth <small>RFCOMM</small></h3>
        <ul>
          <li>The <strong>server</strong> binds to a local MAC address and RFCOMM channel.</li>
          <li>The <strong>client</strong> connects to a remote MAC address and channel, for serial-style links to modules and microcontrollers.</li>
        </ul>
      </div>
      <div class="cpb-plate cpb-proto cpb-wide">
        <h3>CAN <small>python-can</small></h3>
        <ul>
          <li>Works with <strong>socketcan</strong>, <strong>PCAN</strong>, <strong>Vector</strong>, <strong>Kvaser</strong>, and a <strong>virtual</strong> bus for testing without hardware.</li>
          <li>Bitrates of 125 k, 250 k, 500 k, and 1 Mbps.</li>
          <li>Standard 11-bit or <strong>extended 29-bit</strong> arbitration IDs. IDs and data are typed in hex, with data as space-separated bytes.</li>
          <li>For Vector hardware, the app registers as <code>CANalyzer</code> in Vector Hardware Config.</li>
        </ul>
      </div>
      <div class="cpb-plate cpb-proto cpb-wide">
        <h3>GPIB <small>PyVISA</small></h3>
        <ul>
          <li>Lists every VISA resource it can find. Pick one and click <strong>Open</strong>.</li>
          <li><strong>Query</strong> writes a command and reads the reply (for example <code>*IDN?</code>); <strong>Write</strong> only sends.</li>
          <li>Uses NI-VISA when installed, or the pure-Python pyvisa-py backend. If neither is found, the tab says so instead of failing.</li>
        </ul>
      </div>
    </div>
    <div class="cpb-tablewrap">
      <table class="cpb-table">
        <thead><tr><th>CAN bus type</th><th>Channel</th><th>Notes</th></tr></thead>
        <tbody>
          <tr><th>socketcan</th><td><span class="cpb-tag">can0</span></td><td>Linux kernel CAN interfaces.</td></tr>
          <tr><th>pcan</th><td><span class="cpb-tag">PCAN_USBBUS1</span></td><td>PEAK-System adapters.</td></tr>
          <tr><th>vector</th><td><span class="cpb-tag">0</span></td><td>Zero-based channel index, mapped under the <code>CANalyzer</code> application.</td></tr>
          <tr><th>kvaser</th><td><span class="cpb-tag">0</span></td><td>Zero-based channel index.</td></tr>
          <tr><th>virtual</th><td><span class="cpb-tag">0</span></td><td>In-process bus, handy for trying the app with no adapter.</td></tr>
        </tbody>
      </table>
    </div>
  </section>
  <!-- Shared features -->
  <section>
    <h2>One Log for Everything</h2>
    <p class="cpb-kick">Tools shared by every tab</p>
<div class="cpb-log" role="img" aria-label="Example message log"><div><span class="cpb-ts">[12:46:37.954]</span> <strong>↑ [TCP Client] 127.0.0.1</strong></div><div>Test</div><div class="cpb-in"><span class="cpb-ts">[12:46:37.961]</span> <strong>↓ [TCP Client] 127.0.0.1:64865</strong></div><div class="cpb-in">Test</div><div class="cpb-in"><span class="cpb-ts">[12:46:38.102]</span> <strong>↓ [CAN RX] Arb ID: 0x18FF50E5</strong></div><div class="cpb-in">01 02 03 04 05 06 07 08</div></div>
    <div class="cpb-extras">
      <div class="cpb-extra"><strong>Timestamped log</strong>Every message gets a millisecond timestamp, a direction arrow, and its source. Incoming traffic is shown in blue.</div>
      <div class="cpb-extra"><strong>Repeat timer</strong>TCP and UDP can resend the last message on an interval in milliseconds, for soak tests and heartbeat checks.</div>
      <div class="cpb-extra"><strong>Connection status</strong>The status bar shows who is connected to what, for the tab you are on.</div>
      <div class="cpb-extra"><strong>Remembers your setup</strong>Interfaces, ports, addresses, and the last tab are saved to <code>config.json</code> and restored at launch.</div>
    </div>
  </section>
  <!-- Architecture -->
  <section>
    <h2>How It Works</h2>
    <p class="cpb-kick">Qt front end · one worker thread per link</p>
    <div class="cpb-pipe">
      <div class="cpb-node"><b>Main window</b>Qt Designer layout loaded at runtime</div>
      <div class="cpb-link" aria-hidden="true">⇄</div>
      <div class="cpb-node"><b>Handlers</b>One module per protocol tab</div>
      <div class="cpb-link" aria-hidden="true">⇄</div>
      <div class="cpb-node cpb-hot"><b>Workers</b>Socket, CAN, or VISA I/O on a QThread</div>
      <div class="cpb-link" aria-hidden="true">⇄</div>
      <div class="cpb-node"><b>Log</b>Qt signals carry each message back</div>
    </div>
    <p class="cpb-pipe-note">Each protocol tab has its own handler that wires up the controls and starts a worker on a separate <code>QThread</code>, so a slow device or a blocking socket never freezes the window. Workers report back through Qt signals, and every message goes into the same log. <code>psutil</code> lists the network interfaces with their IPv4 addresses, and PyInstaller packages the whole app into a folder you can run without Python installed.</p>
    <div class="cpb-stack">
      <span>Python</span><span>PySide6</span><span>Qt Designer</span><span>psutil</span><span>python-can</span><span>PyVISA</span><span>pyvisa-py</span><span>PyInstaller</span><span>GitHub Actions</span>
    </div>
  </section>
  <!-- Get started -->
  <section class="cpb-cockpit" id="cpb-start">
    <h2>Get Started</h2>
    <p class="cpb-kick">Run from source on Windows or Linux</p>
    <div class="cpb-deps">
      <div class="cpb-dep"><b>Required</b><p><code>PySide6</code> for the interface and <code>psutil</code> for network interfaces.</p></div>
      <div class="cpb-dep"><b>For CAN</b><p><code>python-can</code>, plus the driver for your adapter.</p></div>
      <div class="cpb-dep"><b>For GPIB</b><p><code>pyvisa</code> with NI-VISA, or <code>pyvisa-py</code> on its own.</p></div>
    </div>
    <div class="cpb-sub">
      <div>
        <h3>Run</h3>
        <p>The requirements file installs everything, including the optional CAN and GPIB packages:</p>
<pre><code>git clone https://github.com/rookiepeng/comm-probe.git
cd comm-probe
pip install -r requirements.txt
python commprobe.py</code></pre>
      </div>
      <div>
        <h3>Build a standalone app</h3>
        <p>PyInstaller bundles the app, its layout, and its icons into <code>dist/commprobe</code>:</p>
<pre><code>pip install pyinstaller
pyinstaller commprobe.spec</code></pre>
        <p>GitHub Actions builds the same package for Windows and Linux on every push.</p>
      </div>
    </div>
  </section>
  <div class="cpb-foot">
    <span>GPL-3.0 · feedback welcome</span>
    <span><a href="https://github.com/rookiepeng/comm-probe/issues">Issues</a> · <a href="https://github.com/rookiepeng/comm-probe/releases">Releases</a> · <a href="https://github.com/rookiepeng/comm-probe">GitHub</a></span>
  </div>
</div>
