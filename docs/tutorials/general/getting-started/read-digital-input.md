---
title: Read digital input
description: You will use a button of change digital input and print its values on the serial monitor.
---

# Read digital input

In this example, let's try to read digital signals using a pushbutton. When you press or release the button, the input value will change accordingly. The value is true or false. You could see the result in the serial monitor.

## What you need

- SwiftIO Feather (or SwiftIO board)
- Button
- Jumper wires

## Circuit



## Example code

You can find the example code by clicking the bottom left corner of IDE: ![](img/example.png) / `GettingStarted` / `ReadDigitalInput`.

``` swift
// Read the input voltage on a specified digital pin. The value you get will be either true or false.
// Import the library to enable the relevant classes and functions.
import SwiftIO

// Import the board library to use the Id of the specific board.
import SwiftIOFeather

// Initialize the pin D0 as a digital input pin.
let pin = DigitalIn(Id.D0)

// read the input every second.
while true {
    // Declare a constant to store the value you read from the digital pin.
    let value = pin.read()
    // Print the value and you can see it in the serial monitor.
    print(value)
    // Wait a second and then continue to read.
    sleep(ms: 1000)
}
```

## What you'll see

If you release the button, the value is false. When you press the button, the value changes to true.

## Background

### Button

The button, or pushbutton, is always used to control other devices. You can see it in a light switch, remote control, etc. This button is momentary, so its state will only change as you press it. Once you release it, it will go back to its original state.

![](img/button.png)

This kind of button usually has four legs. The two legs on the same side are shorted, like 1 and 3.

So when you connect a single button, it's better to connect the two legs on a diagonal line in the circuit, like 1 and 4.




## Code analysis

``` swift
import SwiftIO
import SwiftIOFeather
```

[SwiftIO](https://swiftioapi.madmachine.io/) consists of all the functionalities to control your board. All programs must first reference it to use everything in it, like classes and functions.

[SwiftIOFeather](https://github.com/madmachineio/MadBoards/blob/main/Sources/SwiftIOFeather/Id.swift) defines the corresponding pin id of the SwiftIO Feather board. The pins of different boards are different. So this library tells the IDE you are dealing with this board, not any other board. Then you could use the id in it. If you use the SwiftIO board, you need to import the `SwiftIOBoard` instead.

``` swift
let pin = DigitalIn(Id.D0)
```
The button connects to pin D0. The digital pins can be used as both input and output. You will set it when initializing the pin. Here the pin serves as input, so you need the class `DigitalIn`.

``` swift
let value = pin.read()
```

The method `read()` allows you to get the input value. The return value is either `true` or `false`, representing high level and low level respectively. So you can know the states of the button according to the values. If you press the button, the pin connects to 3V3, so the value will be `true`. Once you release the button, the input value will be false.

``` swift
print(value)
```
The function `print()` can print the values out. You can view them on the serial monitor by connecting the serial port to your computer. Here is a guide to tell you how to [open the serial monitor](../../../how-to/debug.md#step-3-open-serial-monitor-on-the-ide).

## Reference

[DigitalIn](https://swiftioapi.madmachine.io/Classes/DigitalIn.html) - set whether the pin output a high or low voltage.

- `init(_:mode:)` - initialize the digital input pin. The first parameter needs the id. You can refer to the corresponding `Id` enumeration. The parameter mode already has a default value.

- `read()` - read values from a input pin. It will return a boolean value. `true` corresponds to a high level, and `false` corresponds to a low level.

`print()` - print the values out.
