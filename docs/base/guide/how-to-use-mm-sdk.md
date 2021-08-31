---
id: use-mm-sdk
title: How to use MM SDK
description: How to use MM SDK
slug: /how-to-use-mm-sdk
---

# How to use MM SDK

## MM SDK

The mm-sdk contains everything you need to build a MadMachine project, either a library or an executable.

A MadMachine project is structured the same as a [Swift package](https://swift.org/package-manager).

Download the latest release depending on your OS on the [Releases page](https://github.com/madmachineio/mm-sdk/releases).

The latest features would be added to this SDK first and then integrated into the MadMachine IDE.

## What is inside the SDK

1. Boards
   * Board abstraction libraries based on [Zephyr](https://github.com/zephyrproject-rtos/zephyr)
2. mm
   * Python script which is used to help to build the project
3. usr (This directory is only contained in the [release package](https://github.com/madmachineio/mm-sdk/releases), not in the git repo)
   * Clang, Swift compilier, SwiftPM tools etc.
   * Standard library and arch related libraries
   * Compiled Python build tool

## Usage (Take macOS and Linux for example)

### Install required dependencies:

#### macOS

Install XCode and open it so it could install any components that needed.

#### Ubuntu 18.04

```bash
sudo apt-get install \
          binutils \
          git \
          libc6-dev \
          libcurl4 \
          libedit2 \
          libgcc-5-dev \
          libpython2.7 \
          libsqlite3-0 \
          libstdc++-5-dev \
          libxml2 \
          pkg-config \
          tzdata \
          zlib1g-dev
```

#### Ubuntu 20.04

```bash
sudo apt-get install \
          binutils \
          git \
          gnupg2 \
          libc6-dev \
          libcurl4 \
          libedit2 \
          libgcc-9-dev \
          libpython2.7 \
          libsqlite3-0 \
          libstdc++-9-dev \
          libxml2 \
          libz3-dev \
          pkg-config \
          tzdata \
          zlib1g-dev \
          libncurses5
```

### Download the mm-sdk

Download and unzip the sdk to the directory `~`

`~/mm-sdk/usr/mm/mm -h` command for quick help.

`~/mm-sdk/usr/mm/mm init -h` command for quick help about initializing a project.

`~/mm-sdk/usr/mm build -h` command for quick help about building a project.

### Initialize an executable `DemoProgram` in `~/Documents`

```text
cd ~/Documents
mkdir DemoProgram
cd DemoProgram
~/mm-sdk/usr/mm/mm init
```

The `Package.swift` should look like below

```swift
// swift-tools-version:5.3
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "DemoProgram",
    dependencies: [
        // Dependencies declare other packages that this package depends on.
        .package(url: "https://github.com/madmachineio/SwiftIO.git", .branch("main")),
        .package(url: "https://github.com/madmachineio/MadBoards.git", .branch("main")),
    ],
    targets: [
        // Targets are the basic building blocks of a package. A target can define a module or a test suite.
        // Targets can depend on other targets in this package, and on products in packages this package depends on.
        .target(
            name: "DemoProgram",
            dependencies: ["SwiftIO", "MadBoards"]),
        .testTarget(
            name: "DemoProgramTests",
            dependencies: ["DemoProgram"]),
    ]
)
```

### Build an executable

```text
cd ~/Documents/DemoProgram
~/mm-sdk/usr/mm/mm build -b SwiftIOBoard
```

### Download an executable to the board

After a successful building, there would be `.build/release/swiftio.bin` in your project directory. Note that the `.build` directory is hidden by default.

Follow those steps to download the executable:

1. Insert SD card to the board and connect it to your computer through a USB cable
2. Press the **Download** button and wait for the onboard RGB LED to turn to static **green**\)
3. A USB disk drive should be mounted on your computer
4. Copy the `swiftio.bin` to the SD card root directory
5. Eject the USB drive and the program would run automatically

### Download an executable to the board using command \(Only on macOS now\)

After mounting the SD card:

```text
cd ~/Documents/DemoProgram
~/mm-sdk/usr/mm/mm download -b SwiftIOBoard
```

This command would find the corresponding bin file, copy it to the SD card and eject the SD card automatically

## Usage \(Take Windows 10 for example\)

Download and unzip the sdk to the directory `D:\`

Press `Win + R` keys on your keyboard, then type `cmd`, and press Enter on your keyboard or click OK to run a Command Prompt.

`D:\mm-sdk\usr\mm\mm -h` command for quick help.

`D:\mm-sdk\usr\mm\mm init -h` command for quick help about initializing a project.

`D:\mm-sdk\usr\mm build -h` command for quick help about building a project.

### Initialize an executable `DemoProgram` in `D:\`

```text
D:
mkdir DemoProgram
cd DemoProgram
D:\mm-sdk\usr\mm\mm init
```

The `Package.swift` should look like below

```swift
// swift-tools-version:5.3
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "DemoProgram",
    dependencies: [
        // Dependencies declare other packages that this package depends on.
        .package(url: "https://github.com/madmachineio/SwiftIO.git", .branch("main")),
        .package(url: "https://github.com/madmachineio/MadBoards.git", .branch("main")),
    ],
    targets: [
        // Targets are the basic building blocks of a package. A target can define a module or a test suite.
        // Targets can depend on other targets in this package, and on products in packages this package depends on.
        .target(
            name: "DemoProgram",
            dependencies: ["SwiftIO", "MadBoards"]),
        .testTarget(
            name: "DemoProgramTests",
            dependencies: ["DemoProgram"]),
    ]
)
```

### Build an executable

```text
cd D:\DemoProgram
D:\mm-sdk\usr\mm\mm build -b SwiftIOBoard
```

### Download an executable to the board

After a successful building, there would be `.build\release\swiftio.bin` in your project directory.

Follow those steps to download the executable:

1. Insert SD card to the board and connect it to your computer through a USB cable
2. Press the **Download** button and wait for the onboard RGB LED to turn to static **green**
3. A USB disk drive should be mounted on your computer
4. Copy the `swiftio.bin` to the SD card root directory
5. Eject the USB drive and the program would run automatically
