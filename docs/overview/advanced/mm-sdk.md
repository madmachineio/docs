---
title: MM SDK
description: Learn to use mm sdk to build and download your project.
---

# MM SDK

## MM SDK

The mm-sdk contains eveything you need to build a MadMachine project, either a library or an executable.

A MadMachine project is structured the same as a [Swift package](https://swift.org/package-manager).

Download the latest release depending on your OS on the [Releases page](https://github.com/madmachineio/mm-sdk/releases).

The latest features would be added to this SDK first and then integrated into the MadMachine IDE.

## What is inside the SDK

1. Boards
   * Board abstraction libraries based on [Zephyr](https://github.com/zephyrproject-rtos/zephyr)

2. mm
   * Python script which is used to help building the project

3. usr (This directory is only contained in the [release package](https://github.com/madmachineio/mm-sdk/releases), not in the git repo)
   * GCC tools/libraries etc.
   * Standard library and arch related libraries
   * Compiled Python build tool

## Usage (Take macOS and Linux for example)

### Install required dependencies:

#### macOS

Since the Swift toolchain included in Xcode doesn't contain the embedded libraries, you need to install latest Swift toolchain release from [Swift.org](https://swift.org) 


#### Ubuntu 22.04

```bash
sudo apt-get install \
          binutils \
          git \
          gnupg2 \
          libc6-dev \
          libcurl4-openssl-dev \
          libedit2 \
          libgcc-11-dev \
          libpython3-dev \
          libsqlite3-0 \
          libstdc++-11-dev \
          libxml2-dev \
          libz3-dev \
          pkg-config \
          python3-lldb-13 \
          tzdata \
          unzip \
          zlib1g-dev
```


#### Ubuntu 24.04

```bash
sudo apt-get install \
          binutils \
          git \
          gnupg2 \
          libc6-dev \
          libcurl4-openssl-dev \
          libedit2 \
          libgcc-13-dev \
          libncurses-dev \
          libpython3-dev \
          libsqlite3-0 \
          libstdc++-13-dev \
          libxml2-dev \
          libz3-dev \
          pkg-config \
          tzdata \
          unzip \
          zlib1g-dev
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
// swift-tools-version: 5.9
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "Hello",
    dependencies: [
        // Dependencies declare other packages that this package depends on.
        .package(url: "https://github.com/madmachineio/SwiftIO.git", branch: "main"),
        .package(url: "https://github.com/madmachineio/MadBoards.git", branch: "main"),
        // .package(url: "https://github.com/madmachineio/MadDrivers.git", branch: "main"),
    ],
    targets: [
        // Targets are the basic building blocks of a package, defining a module or a test suite.
        // Targets can depend on other targets in this package and products from dependencies.
        .executableTarget(
            name: "Hello",
            dependencies: [
                "SwiftIO",
                "MadBoards",
                // Use specific library name rather than "MadDrivers" would speed up the build procedure.
                // .product(name: "MadDrivers", package: "MadDrivers")
            ]),
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

```shell
cd ~/Documents/DemoProgram
~/mm-sdk/usr/mm/mm download
```
or
```shell
python3 ~/mm-sdk/mm/src/mm.py download
```

This command will find the corresponding image file, copy it to board Flash automatically.