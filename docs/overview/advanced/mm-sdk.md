---
title: MM SDK
description: Learn to use mm sdk to build and download your project.
---

# MM SDK

## MM SDK

The mm-sdk contains everything you need to build a MadMachine project, either a library or an executable.

A MadMachine project is structured the same as a [Swift package](https://swift.org/package-manager).

Download the latest release depending on your OS on the [Releases page](https://github.com/madmachineio/mm-sdk/releases).

## What is inside the SDK

1. Boards
   * Board abstraction libraries based on [Zephyr](https://github.com/zephyrproject-rtos/zephyr)
2. mm
   * Python script to help to build the project
3. usr (This directory is only contained in the [release package](https://github.com/madmachineio/mm-sdk/releases), not in the git repo)
   * Clang, Swift compiler, SwiftPM tools, etc.
   * Standard library and arch related libraries
   * Compiled Python build tool

## Usage (macOS and Linux)

### Install required dependencies:

#### macOS

Install XCode and open it so it can install any necessary components.

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

```shell
cd ~/Documents
mkdir DemoProgram
cd DemoProgram
~/mm-sdk/usr/mm/mm init -b SwiftIOMicro
```
or
```shell
python3 ~/mm-sdk/mm/src/mm.py init -b SwiftIOMicro
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
        .package(url: "https://github.com/madmachineio/SwiftIO.git", branch: "main"),
        .package(url: "https://github.com/madmachineio/MadBoards.git", branch: "main"),
        .package(url: "https://github.com/madmachineio/MadDrivers.git", branch: "main"),
    ],
    targets: [
        // Targets are the basic building blocks of a package. A target can define a module or a test suite.
        // Targets can depend on other targets in this package, and on products in packages this package depends on.
        .target(
            name: "DemoProgram",
            dependencies: [
                "SwiftIO",
                "MadBoards",
                // use specific library would speed up the compile procedure
                .product(name: "MadDrivers", package: "MadDrivers")
            ]),
        .testTarget(
            name: "DemoProgramTests",
            dependencies: ["DemoProgram"]),
    ]
)
```

### Build an executable

```shell
cd ~/Documents/DemoProgram
~/mm-sdk/usr/mm/mm build
```
or
```shell
python3 ~/mm-sdk/mm/src/mm.py build
```

### Download an executable to the board

After building your project successfully, there would be `.build/release/micro.img` in your project directory. Note that the `.build` directory is hidden by default.

Follow those steps to download the executable:

1. Insert an SD card into the board and connect it to your computer through USB cable
2. Press the **Download** button and wait until the onboard RGB LED turns to static **green**
2. A USB disk drive should be mounted on your computer
3. Copy the `micro.img` to the SD card root directory
4. Eject the USB drive and the program would run automatically

### Download an executable to the board using command (Only on macOS now)

After mounting the SD card:

```shell
cd ~/Documents/DemoProgram
~/mm-sdk/usr/mm/mm download
```
or
```shell
python3 ~/mm-sdk/mm/src/mm.py download
```

This command will find the corresponding bin file, copy it to the SD card and eject the SD card automatically.