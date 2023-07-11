---
title: API Reference
description: When you program your board, you can consult the references to use all functionalities.
slug: /reference
---

# API Reference



## [SwiftIO](https://madmachineio.github.io/SwiftIO/documentation/swiftio)

`SwiftIO` serves as a hardware abstraction layer that empowers you to take control of various hardware components.

It makes it effortless to read and write digital and analog signals. It also supports multiple communication protocols (I2C, SPI, UART...) for seamless interaction with various devices.

## [MadBoards](https://github.com/madmachineio/MadBoards)

`MadBoards` consists of pin ids of each board.

Simply consult the pinout for your specific board, and you'll be able to map the pins to their respective ids provided in the this library.

## [MadDrivers](https://github.com/madmachineio/MadDrivers)

`MadDrivers` library contains the drivers for various devices. 

Each device has its own quirky way of configuration that often involves diving into long and boring datasheets. But worry not! You can save yourself from that headache by using these awesome libraries. We've got a bunch of them available, like humiture sensor, color sensor, LCD, and more. Simply import the library you need into your code and bam! You can directly start using its methods to communicate with your device. No more fussing around with complicated configurations!