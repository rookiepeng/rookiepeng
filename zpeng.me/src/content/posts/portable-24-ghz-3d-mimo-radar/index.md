---
title: "Portable 24-GHz 3D MIMO Radar"
date: 2017-09-27
updated: 2026-05-27
description: "Introduction A K-band MIMO FMCW radar is designed. By combining the concept of MIMO and non-uniformly spaced array, higher angular resolution and three-dimensional beam scanning capabilities can be achieved with a relatively smaller number of Tx and Rx channels in the designed K-band MIMO FMCW radar. The issue of grating lobes for the conventional sparse…"
tags: ["MIMO", "Radar"]
wpId: 3969
---
# Introduction

A K-band MIMO FMCW radar is designed. By combining the concept of MIMO and non-uniformly spaced array, higher angular resolution and three-dimensional beam scanning capabilities can be achieved with a relatively smaller number of Tx and Rx channels in the designed K-band MIMO FMCW radar. The issue of grating lobes for the conventional sparse array is solved by the specifically designed non-uniformly spaced array. The distribution of the non-uniformly spaced array and its corresponding weighting values are optimized. MIMO radar calibration procedure is introduced to align the phases and amplitudes of the synthesized virtual elements of the MIMO radar. MIMO radar signal processing is also detailed in this dissertation. For the hardware realization of the prototype, two K-band PLLs and four K-band radar receiver chips are cascaded. Each of the radar receiver chip includes four receiver channels. Customized K-band single-pole-double-throw (SPDT) switches are designed to extend the number of Tx channels. This MIMO radar has 16 Tx channels and Rx channels in total. Experiments of the MIMO FMCW radar prototype reveal its capability in three-dimensional beam scanning.

# MIMO Radar System Design

![Fig. 1. Block diagram of the RF board of the MIMO radar system](./rf-schematic.jpg)  
**Fig. 1. Block diagram of the RF board of the MIMO radar system**

![Fig. 2. Block diagram of the baseband part of the MIMO radar system](./baseband-schematic.jpg)  
**Fig. 2. Block diagram of the baseband part of the MIMO radar system**

The blocks diagrams of the MIMO radar system are shown in Fig. 1 and Fig. 2. This MIMO radar system includes an RF board and a baseband part. The transmitter of the RF board includes two PLLs, which share the same reference. Each PLL has an LO output and two Tx outputs, and these three outputs can be turned ON or OFF separately. Each of the Tx output is connected to a single-pole-four-throw (SP4T) RF switches. The outputs of the switches are connected with Tx antenna elements. On the receiver side, four receiver chips are cascaded. Each receiver chip has four independent receiver channels. Two of the receiver chips use the LO from PLL 1 and the other two receiver chips use the LO from PLL 2. The 16-channel baseband outputs are fed into the baseband part for further process. On the RF board, the 16 transmitter antennas and 16 receiver antennas are placed along the edges of a square shape, as shown in Fig. 1. These antennas are unequally spaced to obtain a narrower beam width, as well as removing grating lobes. MIMO technique is used for the radar system to synthesize a larger array. The designed angular resolution of the MIMO radar system is 3°, and the field of view is 90° on both horizontal and vertical planes.

Regarding the baseband part, shown in Fig. 2, 16-channel baseband amplifiers are used to process the 16-channel signals from the RF board. After the baseband amplifiers, an analog switch is used to select one of the channels, and one ADC on a WiFi board is used to sample the selected channel. The WiFi board includes a micro-controller and a WiFi subsystem. The sampled the data is transmitted to a computer for post-processing through WiFi. All the components on the RF board and the baseband part are controlled by the micro-controller on the WiFi board.

# MIMO Radar Prototype

![Fig. 3. Photo of the RF board of the MIMO radar prototype](./rf-board.jpg)  
**Fig. 3. Photo of the RF board of the MIMO radar prototype**

![Fig. 4. Photo of the baseband board](./baseband.jpg)  
**Fig. 4. Photo of the baseband board**

![Fig. 5. Photo of the back of the baseband board with stacked WiFi board](./wifi.jpg)  
**Fig. 5. Photo of the back of the baseband board with stacked WiFi board**

The prototype of the MIMO radar has been built. The photo of the RF board is shown in Fig. 3. The layout of the RF board corresponds to the schematic shown in Fig. 1. The substrate of the RF board is Rogers RO3003 with 0.254 mm thickness. The total size of the RF board is 120 mm × 120 mm. A 3D printed structure is used to support the RF board.

The photos of the baseband are illustrated in Fig. 4 and Fig. 5. Fig. 4 is the front view of the baseband board, which includes the power supply, 16-channel baseband amplifiers, K-band SPDT switch bias circuits, and the -10 V voltage converter. Fig. 5 is the back view of the baseband board, including a stacked WiFi board. The main chip on the WiFi board is TI’s CC3200, which includes an ARM microcontroller and a WiFi sub-system. This chip also has an ADC with maximum 250 ksps sampling rate. The main components of the MIMO radar prototype are listed in Table I.

**Table I. Main Components of the MIMO Radar Prototype**

<figure class="wp-block-table"><table><thead><tr><th><strong>Radar Part</strong></th><th><strong>Device</strong></th><th><strong>Manufacturer</strong></th><th><strong>Function</strong></th></tr></thead><tbody><tr><td>RF board</td><td>520L15IA40M0000</td><td>CTS</td><td>Clock</td></tr><tr><td></td><td>ADF4159</td><td>Analog Devices</td><td>PLL</td></tr><tr><td></td><td>ADF5901</td><td>Analog Devices</td><td>VCO</td></tr><tr><td></td><td>ADF5904</td><td>Analog Devices</td><td>Receiver</td></tr><tr><td></td><td>MADP-000907-14020W</td><td>MACOM</td><td>PIN diode</td></tr><tr><td>Baseband board</td><td>TPS7A4501DCQR</td><td>Texas Instruments</td><td>Regulator</td></tr><tr><td></td><td>TPS63700</td><td>Texas Instruments</td><td>DC-DC converter</td></tr><tr><td></td><td>CD74AC138</td><td>Texas Instruments</td><td>Decoder</td></tr><tr><td></td><td>CD4514B</td><td>Texas Instruments</td><td>Decoder</td></tr><tr><td></td><td>ADA4851</td><td>Analog Devices</td><td>OpAmp</td></tr><tr><td></td><td>ADG706</td><td>Analog Devices</td><td>Analog switch</td></tr><tr><td>WiFi board</td><td>CC3200</td><td>Texas Instruments</td><td>WiFi and ARM</td></tr><tr><td></td><td>DEA162450BT</td><td>TDK</td><td>Filter</td></tr><tr><td></td><td>AH104F</td><td>Yuden</td><td>Antenna</td></tr><tr><td></td><td>ADP5135</td><td>Analog Devices</td><td>DC-DC</td></tr><tr><td></td><td>AT25SF161</td><td>Adesto</td><td>Flash</td></tr></tbody></table></figure>

# MIMO Radar Experiment

![Fig. 6. Setup for the experiment](./experiment-setup.jpg)  
**Fig. 6. Setup for the experiment**

![Fig. 7. Images of the three targets with the MIMO radar prototype](./3d-view.jpg)  
**Fig. 7. Images of the three targets with the MIMO radar prototype**

A field experiment has been carried to verify the performance of the MIMO radar prototype. The experiment was performed in an open space to avoid the multi-path issue. The setup of the experiment is shown in Fig. 6. The MIMO radar prototype was placed on a car, and three corner reflectors were in front of the MIMO radar prototype with different ranges and heights. The MIMO radar prototype was powered by the cigarette lighter in the car. During the experiment, a laptop was used to record the data in the car through WiFi. As has mentioned above, half of the designed antenna elements, e.g., 8 Tx antennas and 8 Rx antennas, can work in this MIMO radar prototype. Thus, 64-channel beat signals were recorded in the experiment. With all the 64-channel data obtained by 8 Tx and 8 Rx, three-dimensional localization mapping can be obtained. Fig. 7 shows the measured images of the three corner reflectors with calibration matrix 2. It can be clearly seen that the three corner reflectors are located at 1.6 m, 2.3 m, and 3.14 m with different azimuth and zenith angles.

---

#### Related Publications:

1.  **Z. Peng** and C. Li, “[A portable K-band 3-D MIMO radar with nonuniformly spaced array for short-range localization](https://ieeexplore.ieee.org/document/8474363),” *IEEE Transactions on Microwave Theory and Techniques*, vol. 66, no. 11, pp. 5075-5086, Nov. 2018.
