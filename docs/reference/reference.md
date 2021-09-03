---
title: Library References
description: When you program your board, you can consult the references to use all functionalities.
slug: /reference
---

# Library References



## [SwiftIO](https://swiftioapi.madmachine.io/)

The SwiftIO library provides you with easy access to communicate with the external circuits. It is the most basic one for all of your projects. Simply by invoking the related classes/methods in your code, download it to your board, you can see the result at once. It allows you to read or write the digital and analog signals, as well as using the communication protocol to interact with all devices.

## [MadBoards](https://github.com/madmachineio/MadBoards)

The MadBoards library consists of the id of each board. Different boards correspond to a unique list of id, since the numbers of pins are not the same. There are two boards now: SwiftIOBoard and SwiftIOFeather. When you write the code, you need to import the right one to use the pin id.

## [MadDrivers](https://github.com/madmachineio/MadDrivers)

The MadDrivers library contains the drivers for different devices. Each type of device has its own way of configuration. And you have to consult long and boring datasheets to configure the devices. To avoid such work, you can use the libraries here to simplify your code. There are several available, like the humiture sensor, color sensor, the LCD, etc. You then import the one you need in your code and can directly use the methods to communicate with it. 

## [MadDisplay](https://github.com/madmachineio/MadDisplay)

The MadDisplay is a graphic library to display text, shapes, images on tiny screens. You will organize your display with several layers, thus are able to change any of them without changing the whole screen. Besides, you can find the basic elements to draw on the screens, like line, rectangle, circle, text, etc.
