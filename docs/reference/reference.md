---
title: API Reference
description: When you program your board, you can consult the references to use all functionalities.
slug: /reference
---

# API Reference



## SwiftIO

The [SwiftIO](https://swiftioapi.madmachine.io/) library provides you with easy access to communicate with the external circuits. It is the most basic one for all of your projects. Simply by invoking the related classes/methods in your code, download it to your board, you can see the result at once. It allows you to read or write the digital and analog signals, as well as using the communication protocol to interact with all devices.

## MadBoards

The [MadBoards](https://github.com/madmachineio/MadBoards) library consists of the id of each board. Different boards correspond to a unique list of id, since the numbers of pins are not the same. However, you just need to import `MadBoard` to your project no matter the board you are using. When you create a project, you have decided desired board.

## MadDrivers

The [MadDrivers](https://github.com/madmachineio/MadDrivers) library contains the drivers for different devices. Each type of device has its own way of configuration. And you have to consult long and boring datasheets to configure the devices. To avoid such work, you can use the libraries here to simplify your code. There are several available, like the humiture sensor, color sensor, the LCD, etc. You then import the one you need in your code and can directly use the methods to communicate with it. 

## MadDisplay

The [MadDisplay](https://github.com/madmachineio/MadDisplay) is a graphic library to display text, shapes, images on tiny screens. You will organize your display with several layers, thus are able to change any of them without changing the whole screen. Besides, you can find the basic elements to draw on the screens, like line, rectangle, circle, text, etc.
