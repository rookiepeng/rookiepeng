---
title: "Tx-Line Calculator"
date: 2018-05-01
updated: 2026-05-31
description: "A transmission line calculator for RF/microwave engineers. Background This project started as a part-time hobby during my undergraduate studies. I was taking an RF/Microwave circuits course at the time, and Android was just emerging as a mobile platform. It was a natural exercise to combine what I was learning in class — transmission line theory…"
tags: ["Android", "Microstrip", "Simulation"]
cover: "./promo.png"
wpId: 4100
---
[![](../../../assets/badges/google-play.svg)](https://play.google.com/store/apps/details?id=com.rookiedev.microwavetools) [![](../../../assets/badges/view-on-github.svg)](https://github.com/rookiepeng/tx-line-calculator)

A transmission line calculator for RF/microwave engineers.

## Background

This project started as a part-time hobby during my undergraduate studies. I was taking an RF/Microwave circuits course at the time, and Android was just emerging as a mobile platform. It was a natural exercise to combine what I was learning in class — transmission line theory and microwave circuit design — with the challenge of building an Android app from scratch.

The project has been kept alive and occasionally updated ever since.

## Features

-   **Analyze** mode: calculate electrical parameters from physical dimensions
-   **Synthesize** mode: calculate physical dimensions from electrical parameters

## Supported Transmission Lines

-   Microstrip Line
-   Coupled Microstrip Line
-   Stripline
-   Coupled Stripline
-   Coplanar Waveguide
-   Grounded Coplanar Waveguide
-   Coaxial

## Requirements

-   Android 11 (API level 30) or higher
-   Java 17

## Screenshots

![](https://github.com/rookiepeng/tx-line-calculator/raw/master/pics/Screenshot_1.png) ![](https://github.com/rookiepeng/tx-line-calculator/raw/master/pics/Screenshot_2.png) ![](https://github.com/rookiepeng/tx-line-calculator/raw/master/pics/Screenshot_3.png) ![](https://github.com/rookiepeng/tx-line-calculator/raw/master/pics/Screenshot_4.png) ![](https://github.com/rookiepeng/tx-line-calculator/raw/master/pics/Screenshot_5.png)

## License

This project is licensed under the GNU General Public License v3.0. See the [LICENSE](https://github.com/rookiepeng/tx-line-calculator/blob/master/LICENSE) file for details.

## Building the Project

This project requires the Android SDK and Java 17. Build using the Gradle wrapper scripts provided:

```
./gradlew build
```

On Windows, use:

```
gradlew.bat build
```

The project uses Android Gradle Plugin 9.2.1 and targets Android API level 37.
