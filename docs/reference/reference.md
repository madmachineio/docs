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


## [MadGraphics](https://madmachineio.github.io/MadGraphicsDocs/documentation/madgraphics)

`MadGraphics` is a high-performance 2D graphics library written in Swift that provides a flexible and efficient framework for rendering and manipulating visual content. At its core, the library implements a layer-based rendering system similar to Core Animation, where visual elements are organized in a hierarchical structure. The library offers several key features:

1. **Layer System**: The foundation of MadGraphics is its `Layer` class, which provides a powerful container for visual content. Layers can be arranged in a hierarchy, with each layer managing its own content, position, and appearance. The system supports features like opacity, background colors, and clipping, making it suitable for complex visual compositions.

2. **Text Rendering**: The library includes a specialized `TextLayer` class for text rendering with support for font management, text alignment, and text wrapping. It handles both fixed-frame and auto-sizing text layouts, with options for left, center, and right alignment.

3. **Graphics Primitives**: MadGraphics provides efficient implementations of fundamental graphics types:
   - `Bitmap`: A generic class for storing and manipulating pixel data
   - `Canvas`: A specialized bitmap for 32-bit ARGB color representation
   - `Mask`: A bitmap specifically for alpha channel data
   - `Pixel`: A type for handling 32-bit color values with ARGB format

4. **Geometry Types**: The library includes a comprehensive set of geometry types:
   - `Point`: For 2D coordinate representation
   - `Size`: For width and height dimensions
   - `Rect`: For rectangle representation with position and size
   - `UnitPoint`: For normalized coordinate positions (0.0 to 1.0)

5. **Performance Optimizations**: The library is designed with performance in mind, featuring:
   - Efficient dirty rectangle tracking for partial updates
   - Optimized pixel blending operations
   - Direct buffer manipulation for maximum performance

The library is particularly well-suited for applications requiring:
- Real-time graphics rendering
- Complex visual hierarchies
- Text rendering with advanced layout features
- Efficient pixel manipulation
- Precise control over rendering performance


## [MadExamples](https://github.com/madmachineio/MadExamples)

It contains a series of demo projects to guide you from fundamental concepts, including electronics and Swift programming, and to progressively advanced use cases such as sound generation and graphic display. Additionally, it is complemented by a series of comprehensive tutorials to provide detailed guidance throughout your learning journey.