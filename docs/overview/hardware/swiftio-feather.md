---
title: SwiftIO Feather board
description: SwiftIO Feather is a simplified board and is suitable to be embedded in all your designs. You can use it to build prototypes and program your projects in a modern way.
---

# SwiftIO Feather board

SwiftIO Feather board is a simplified version of the SwiftIO board. Though small in size, it is powerful enough for all projects. One of its advantages is that it is suitable to be embedded in any of your projects.

It is compatible with the Adafruit feather system. This means you can use it together with the hardware in this system.

 
![SwiftIO Feather](img/FeatherParts.png)

## MCU

i.MX RT1062 Crossover Processor with Arm® Cortex®-M7 core @600MHz. This 32-bit MCU has 600MHz clock and thus can run extremely quickly. It serves as the brain of the board to deal with all kinds of calculations.


## Memory

16MB flash, 32MB SDRAM.


## Buttons

- The **download button** allows you to mount your board as a USB drive on your computer to download code. 
- The **reset button** can restart the code that has been downloaded to your board. Sometimes, if your code don't run normally, you may press it to solve the problem.


## USB

a USB-C port to download your code and print values. It can also power the board. The power from it will be regulated to 3.3V.

## Built-in RGB LED
It contains red, blue and green LEDs. You can know from it the status of your board. 

| LED State | RED | GREEN | BLUE |
| :--- | :--- | :--- | :--- |
| On | USB communication failed | USB connection established | - |
| Slow flashing | Fail to verify file `feather.bin` | - | - |
| Fast flashing | Fail to open file `feather.bin` | Detecting USB connection | Detecting SD card |


Besides, you can control them by setting digital levels. The built-in LEDs will be on with a low voltage, and off with a high voltage.


## Pins

![SwiftIO Feather pinout](img/FeatherPinout.png)

**GND**: 2 GND pins on your board to ground the circuit.

**3V3**: 1 3V3 pin that supplies 3.3V of power to your module.

**GPIO**: 44 pins D0 to D43 which act as digital input pins to read logic values or as output pins to control other circuits.

**AnalogIn**: 14 analog pins A0 to A13 to measure analog inputs and get a raw value between 0 and 4095 (12-bit resolution).

**PWMOut**: The digital pins marked with a tilde can generate PWM waves, 14 pins in total. You can set the duty cycle to simulate different output voltages. Some pins are paired and share the same frequency, like PWM3A and PWM3B. 

**I2C**: I2C0 and I2C1. Each one contains two wires: SCL for clock signal, SDA for data transmission. You can use I2C protocol to communicate with different devices by writing and reading messages through the bus.

**SPI**: SPI0 and SPI1. It needs 4 wires: CS for device selection, SDI to receive data, SDO to send out data, SCK for clock signal. The communication speed of SPI is faster than I2C and UART.

**UART**: UART0 to UART2. Two wires are required for UART communication: TX pin is for transmission and RX is for reception. The board can communicate with other external devices through these pins or with your computer through a USB cable.

**CAN**: CAN0. It uses 2 wires to receive and send data using CAN protocol.

**I2SIn**: it allows you to receive audio signals from other devices. You can see it needs 3 wires: RX is to receive data, BCLK carries clock signal, SYNC for left or right channel selection.

**I2SOut**: it allows you to send audio signals to other devices. It needs 3 wires: TX is to send data, BCLK carries clock signal, SYNC for left or right channel selection.

**RESET**: restart the code when the RESET pin is set to low.

**VI**: connect to LiPo battery to power the board.

**VO**: it is internally connected to the USB port. You can use it to power other devices.

**VC**: button cell can power the RTC through the Vcoin pin when there is no power supply.

**EN**: it is used to power down your board. It can be useful when the board is embedded in other devices.

**B0/B1**: the two pins are reserved for bootloader update.


## By the way

It can work with the expansion board called [SwiftIO Playground](./swiftio-playground) to get started.
