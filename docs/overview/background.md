---
title: Background
description: You will know how we get Swift code run on microcontrollers and how your code is built and downloaded to your board, What's more, you will understand the difference between our boards and others like Arduino, MicroPython, Rasberry Pi.
---

# Background

Hi guys! Welcome✨!

Thanks very much for your support in such an early stage! Hope we can grow together in the long term 😘!

Let's talk about MadMachine project. At present, the hardware is stable enough. But the software still needs improvement. We received some issues about the software, e.g. the USB drive may not appear after pressing the DOWNLOAD button.

So we want to share you with some techniques used in our project. After reading this article, you will know the principle of our project and what to do if you encounter some issues before we solve them.

## Background

As you know, those who are unfamiliar with Swift language regard it as an Apple exclusive-use programming language. But we know that’s wrong. Swift is modern, safe, efficient and especially, cross-platform. That’s why I have the confidence to make this language work in the microcontroller world. (Some of you might mention Rust, but I have to admit that Rust is too hard for me to get started😭)

Before we start, you can have a look at the definition of Clang [here](https://clang.llvm.org). It is described as **a C language family frontend for LLVM**.

Similarly, Swift is **a Swift language frontend for LLVM,** sounds weird? A little.

![LLVM Frontend-Backend Compiler Architecture \(Source: Swift, C, LLVM Compiler Optimization\)](img/LLVM.png)

Swift leverages all the infrastructures of LLVM, so it doesn't need to implement various architecture backends. But still, a lot of work needs to be done. The official Swift team focuses mainly on x86-64 and ARM Cortex-A architectures. Thanks to the good infrastructure of LLVM, what I did is just combine the existing ARM Cortex-M backend with the Swift compiler source code. It’s so natural that not only I thought of this way. During my exploration, I referred to those resources:

* [swift-project1](https://github.com/spevans/swift-project1) by [Simon Evans](https://twitter.com/sp_evans): it gave me the initial confidence to start this project from the beginning.
* [modocache.io](https://modocache.io/) by [Brian Gesiak](https://twitter.com/modocache): it gave me a brief knowledge about how the Swift compiler works.
* [swift-embedded](https://github.com/swift-embedded/swift-embedded) by [Alan Dragomirecký](https://twitter.com/aldrago): his work is so professional and profound that inspired me a lot.
* [swift for Arduino](https://www.swiftforarduino.com/) by [Carl Peto](https://twitter.com/carl_the_dev): his attempt at running Swift on the AVR backend is so unique.

Enthusiasts around the world are trying different ways to explore new possibilities in this brand new field. We share the same curiosity and passion. We believe that Swift would do something magic in the embedded world in the future!

Unlike the **swift-project1** and **swift-embedded** that run on bare-metal, we chose [Zephyr RTOS](https://docs.zephyrproject.org/latest/boards/arm/mm_swiftio/doc/index.html) to abstract the low-level hardware. In this way, we don’t need to write those on-chip devices’ drivers, like I2C, UART, SPI, etc. And it would be very convenient to port our framework to other microcontrollers. This greatly simplifies our works in the future. The structure of our framework is just as follows:

![](img/structure.png)

## How does the building procedure work?

If your project is built successfully, you will find a file `swiftio.bin` or `feather.bin` generated in the directory `.build`. After you copy it to the root directory of the SD card, eject it, the board will reset and run your code.

When you click the build button or download button, the MadMachine tool will use related tools and libraries in [mm-sdk](https://github.com/madmachineio/mm-sdk/releases) to build the whole project. At present, the build script is written in Python. Later, when Swift package manager could run well in Windows, we are going to rewrite it using Swift. So we can take full advantage of the package management feature of SPM. Now, let me explain in detail the whole process of building. Suppose you create a project named **Blink**:

When you click the **build** or **download button**, the tool will:

1. Open a terminal and change the directory to the Blink project
2. Execute `path_to/mm-sdk/tools_mac/scripts/dist/mm/mm build --sdk path_to/mm-sdk --module ~/Document/MadMachine/Library`

If you click the **download button**, there will be two extra steps:

3. Copy `Blink/.build/swiftio.bin` to the USB drive
4. Eject the USB drive

The command in the second step is responsible for the whole building process. Two arguments in the command are:

* `--sdk` The path to mm-sdk
* `--module` The path to the Library. Since currently there is no available package management feature, we have to put all the dependent libraries into the same folder, and then assign it when invoking this building command.

Let’s talk about how the command works in detail:

1. The Python script will find and build all the dependencies in the specified library folder. Then the static libraries will be generated according to the dependencies defined in the `Blink.mmp` (Actually, it’s a TOML file).
2. Build your project to generate a static library `libBlink.a`.
3. Link all the related static libraries together to generate `Blink.elf`.
4. Invoke `objcopy` to convert `Blink.elf` to `Blink.bin`.
5. Append 4 bytes CRC information to `Blink.bin`, then we get `swiftio.bin`.

## What happens after power-up or reset?

You might be wondering how the `swiftio.bin` is loaded and executed on the board. In fact, a pre-installed bootloader (or called firmware) has been written into the onboard Flash. This flow chart would reveal the key information about how it works:

![](img/firmware.png)

Also, we now use **copy and run mode**, so your application will be copied from the SD card and run in the SDRAM. In fact, your project can be built in **XIP mode**. In this mode, your project is the firmware itself. But you need to write the `.bin` file to the onboard Flash. In this condition, you don’t need an SD card at all.

## What’s the difference between SwiftIO and similar boards in the market?

![](img/comparison.png)

### Arduino:

Arduino gave birth to the trend of electronic makers and it gained great success. What’s more, many open source projects based on Arduino were successful as well.

In my opinion, Arduino is the most successful attempt to simplify the API of hardware. It still uses C/C++, however, it abstracts all the on-chip devices and offers easy-to-use API to developers. You can now easily find plenty of Arduino drivers of hardware modules through long-time evolution and accumulation. It makes hardware development as simple and fun as playing with LEGO.

### MicroPython:

As we can see, Python has become so popular in recent years. Compared to C/C++, it is very easy to learn. Since it's an interpreted language, users could see the results immediately without finishing all the code and compiling it. To realize MicroPython, [Damien George](https://micropython.org/) created an efficient interpreter using C. This could run in an extremely limited microcontroller environment. In this way, developers can use Python in the embedded world.

However, Python needs to be interpreted, which leads to low efficiency when running it. So most complicated projects based on MicroPython implement their core algorithm in C and provide some simple Python API to the users, such as [OpenMV](https://openmv.io/) and [CircuitPython](https://circuitpython.org/).

### Raspberry Pi

[Raspberry Pi](https://www.raspberrypi.org/), in fact, is totally different from what we talk about here. However, many guys couldn't tell it from microcontrollers. So I would like to explain a little.

Raspberry Pi is actually a well-equipped computer, but small in size. It runs a full Linux operating system, you can connect keyboard, mouse, hard disk and display to it. The only similarity with microcontrollers may be some commonly used on-chip devices, like GPIO, I2C, SPI, which can be controlled by [Swift](https://github.com/uraimo/SwiftyGPIO) (Linux version) as well.

It is built on complicated hardware and software. Designing a board that can run Linux is much more difficult than a microcontroller board. Moreover, the board needs to be adapted to the Linux system that is more complicated.

On the contrary, when our project comes to a stable state, we will provide an easy way to port different boards so that all kinds of boards could join in this ecosystem. I wish more and more hardware boards could use Swift.

### Back to our project

For my part, our project is more like a combination of **Arduino** and **MicroPython**. Swift is not only modern and easy-to-learn like Python, but also efficient like C/C++. The only weakness now is that the generated bin file has a large size, thus it’s hard to be put into Flash of low-end microcontrollers. But we will continue to explore new ways to reduce its size.

In addition, We would gradually provide more and more Swift libraries and try our best to take full advantage of the Swift language. Imagine that one day, you could program different screens in SwiftUI style. How cool that would be : )

## Issue from your feedback

### USB drive related

#### Can not mount the SD card as a USB drive or the connection is not stable

This problem may be due to:

1. Bad quality USB cable, there are so many bad quality USB cables in the market. Some of them can only charge your device without communication feature : (
2. Incompatible MicroSD card
3. Incompatible USB hub or incompatible USB-C to USB-A adapter
4. Issue with USB compatibility on Mac. There are already a lot of discussions about it on [Reddit](https://www.reddit.com/r/mac/comments/gp5b1z/usb_20_issues_on_new_macbook_pro_13_2020/), [apple](https://discussions.apple.com/thread/251356598).

To solve problems 1 and 2, we offer a high-quality USB cable and a Kingston microSD card along with our board. But we still got feedback that the USB drive did not appear. In this situation, there is a temporary solution: use a USB card reader to copy the `swiftio.bin`. At the same time, we’ll continue to improve the compatibility of the firmware.
