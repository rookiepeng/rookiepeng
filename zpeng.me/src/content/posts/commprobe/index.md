---
title: "CommProbe"
date: 2017-07-04
updated: 2026-05-31
description: ""
tags: ["PyQT", "Python", "Socket", "TCP", "UDP"]
cover: "./icon.svg"
wpId: 4108
---
[Source Code](https://github.com/rookiepeng/comm-probe)

<figure class="wp-block-image size-large is-resized"><img decoding="async" src="https://raw.githubusercontent.com/rookiepeng/comm-probe/master/res/commprobe.png" alt="" style="width:128px"></figure>

CommProbe (formerly **Socket Test**) is a multi-protocol communication testing tool built with Python and PySide6. It supports TCP, UDP, Bluetooth, CAN, and GPIB — all in a single desktop application.

## Dependencies

-   [PySide6](https://pypi.org/project/PySide6/)
-   [psutil](https://pypi.org/project/psutil/)
-   [python-can](https://pypi.org/project/python-can/) *(optional, for CAN support)*
-   [pyvisa](https://pypi.org/project/PyVISA/) *(optional, for GPIB support)*
-   [pyvisa-py](https://pypi.org/project/PyVISA-py/) *(optional, pure-Python VISA backend)*

## Usage

Select a protocol tab to begin testing. Incoming and outgoing messages are shown in a timestamped log panel.

### TCP

Both a **Server** and a **Client** are available on the same tab. The server supports an **Echo** mode that automatically reflects received messages back to the connected client. A **send timer** allows periodic transmission at a configurable interval.

![TCP](https://raw.githubusercontent.com/rookiepeng/comm-probe/master/docs/TCP.png)

### UDP

Listens on a selected network interface and sends to a configurable target IP and port. Includes a **send timer** for repeated transmissions.

![UDP](https://raw.githubusercontent.com/rookiepeng/comm-probe/master/docs/UDP.png)

### Bluetooth

Both a **Server** and a **Client** are available on the same tab, communicating over RFCOMM.

![Bluetooth](https://raw.githubusercontent.com/rookiepeng/comm-probe/master/docs/Bluetooth.png)

### CAN

Supports **socketcan**, **PCAN**, **Vector**, **Kvaser**, and **virtual** interfaces via [python-can](https://python-can.readthedocs.io/). Supports standard (11-bit) and extended (29-bit) CAN IDs.

![CAN](https://raw.githubusercontent.com/rookiepeng/comm-probe/master/docs/CAN.png)

### GPIB

Connects to any VISA resource (NI-VISA or pyvisa-py). Supports **Query** (write + read) and **Write** modes.

![GPIB](https://raw.githubusercontent.com/rookiepeng/comm-probe/master/docs/GPIB.png)
