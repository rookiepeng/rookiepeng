---
title: "K-Band Portable Multi-Mode Radar"
date: 2017-01-28
updated: 2026-05-28
description: "Introduction In this project, a K-band portable multi-mode radar is designed and built. This radar system can be configured either in the FMCW or interferometry mode by means of an on-board microcontroller. This design features low-cost and portable. Experiments were carried out to reveal the capabilities of the radar system in tracking single and multiple…"
tags: ["Micro-Doppler", "Radar", "Vital sign"]
wpId: 3951
---
# Introduction

In this project, a K-band portable multi-mode radar is designed and built. This radar system can be configured either in the FMCW or interferometry mode by means of an on-board microcontroller. This design features low-cost and portable. Experiments were carried out to reveal the capabilities of the radar system in tracking single and multiple moving targets, non-contact vital sign detection, wind turbines’ structural healthiness monitoring, non-contact speech sensing and synthetic-aperture radar (SAR) imaging on an unmanned aerial vehicle (UAV), etc.

# Design

Fig. 1 is the block diagram of the K-band portable multi-mode radar prototype. To simplify the system complexity and minimize its cost, the FMCW mode and interferometry mode are realized to share the same RF components and signal paths. In addition, at signal acquisition block, the audio card of a laptop is used to sample the baseband signal. On the other hand, the interferometry mode operates at a single frequency of 24 GHz. A low-intermediate-frequency (low-IF) modulation method is implemented to up-convert the baseband signal to an IF, so that the tiny low frequency vital signs will not be filtered out by the audio card. Regarding the FMCW mode, a free-running VCO controlled by a simple operational-amplifier-based circuit is used to generate the desired frequency-modulated RF signal. By acquiring the baseband output along with a reference pulse sequence (RPS), which is locked to the sawtooth signal, the coherence property of the radar can be achieved.

![Fig. 1. Block diagram of the 24-GHz flexible multi-mode radar prototype](./block-diagram.jpg)  
**Fig. 1. Block diagram of the 24-GHz flexible multi-mode radar prototype**

The prototype of the proposed radar system is shown in Fig. 2. The flexible RF board is based on a 0.245-mm thick substrate Rogers RT/duroid 5880. The rigid baseband board is fabricated on an FR4 substrate. The complete radar system has dimensions of 118 mm × 45 mm × 15 mm.

![Fig. 2. Photo of the K-band portable multi-mode radar prototype](./photo.jpg)  
**Fig. 2. Photo of the K-band portable multi-mode radar prototype**

Fig. 3 and Fig. 4 illustrate the assembled radar prototype.

![Fig. 3. Photo of the assembled radar (Top)](./assembled-top.jpg)  
**Fig. 3. Photo of the assembled radar (Top)**

![Fig. 4. Photo of the assembled radar (Bottom)](./assembled-bottom.jpg)  
**Fig. 4. Photo of the assembled radar (Bottom)**

# Experiments

In this section, experiment results of different applications with the customized 24-GHz radar are demonstrated.

## Short-range localization

![Fig. 5. Range profile of two human targets walking in opposite directions](./range-profile.jpg)  
**Fig. 5. Range profile of two human targets walking in opposite directions**

Fig. 5 is the range profile of two human targets walking in front of the radar in the same corridor. This figure shows the duration when human A was walking away from the radar and then walking back to the radar, while human B was walking toward the radar and then walking away from the radar. Stationary clutter returns are also shown in this range profile.

## Range-Doppler imaging

![Fig. 6. A frame of the range-Doppler imaging of two human targets walking in opposite directions](./range-doppler.jpg)  
**Fig. 6. A frame of the range-Doppler imaging of two human targets walking in opposite directions**

Based on the range profile in Fig. 5, range-Doppler video was also obtained. A frame of the range-Doppler video is shown in Fig. 6, when human subject A was walking away from the radar and human subject B was walking toward the radar.

## Structural healthiness monitoring

![Fig. 7. Photograph of the illuminated wind-turbine acquisition scenario in the American Wind Power Center, Lubbock, TX, USA](./wind-turbine.jpg)  
**Fig. 7. Photograph of the illuminated wind-turbine acquisition scenario in the American Wind Power Center, Lubbock, TX, USA**

![Fig. 8. Spectrogram for the Vestas V47 wind turbine illuminated by the radar prototype](./wind-turbine-data.jpg)  
**Fig. 8. Spectrogram for the Vestas V47 wind turbine illuminated by the radar prototype**

This radar prototype was employed in the American Wind Power Center, Lubbock, TX, USA, to monitor the structural healthiness the wind turbines. In the American Wind Power Center, many wind turbines with various sizes, number of blades, horizontal and vertical rotation axes, and so forth are available. A photograph of the in-field wind-turbine acquisition scenario is provided in Fig. 7. Fig. 8 illustrated the spectrogram for the Vestas V47 wind turbine and these results may be exploited for monitoring purposes.

## Non-contact speech sensing

![Fig. 9. Experimental setup of the auditory radar](./speech.jpg)  
**Fig. 9. Experimental setup of the auditory radar**

This radar prototype has also been used as a non-acoustic way to capture the human vocal folds vibration as shown in Fig. 9. This work enables potential applications in robust speech recognition, recovery and surveillance.

---

#### Related Publications:

1.  H. Hong, H. Zhao, **Z. Peng**, H. Li, C. Gu, C. Li, and X. Zhu, “Time-Varying Vocal Folds Vibration Detection Using a 24 GHz Portable Auditory Radar,” *Sensors*, vol. 16, no. 8, article 1181, Aug. 2016.
2.  J.-M. Muñoz-Ferreras, **Z. Peng**, Y. Tang, R. Gómez-García, D. Liang, and C. Li, “Short-range Doppler-radar signatures from industrial wind turbines: theory, simulations, and measurements,” *IEEE Transactions on Instrumentation and Measurement*, vol. 65, no. 9, pp. 2108–2119, Sep. 2016.
3.  H. Zhao, **Z. Peng**, H. Hong, X. Zhu, and C. Li, “A Portable 24-GHz Auditory Radar for Non-contact Speech Sensing with Background Noise Rejection and Directional Discrimination,” in *IEEE International Microwave Symposium (IMS)*, San Francisco, CA, May 22-27, 2016.
4.  **Z. Peng**, J.-M. Muñoz-Ferreras, R. Gómez-García, L. Ran, and C. Li, “24-GHz biomedical radar on flexible substrate for ISAR imaging,” in *IEEE International Wireless Symposium (IWS)*, Shanghai, China, Mar. 14-16, 2016.
5.  **Z. Peng**, and C. Li, “A portable 24-GHz FMCW radar based on six-port for indoor human tracking,” in *IEEE MTT-S International Microwave Workshop Series on RF and Wireless Technologies for Biomedical and Healthcare Applications (IMWS-BIO)*, Taipei, Taiwan, Sep. 21-23, 2015.
