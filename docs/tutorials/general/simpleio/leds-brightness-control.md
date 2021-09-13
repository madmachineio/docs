---
title: LEDs brightness control
description: You will make three LEDs to brighten and dim one by one. So you will use the array to realize it using Swift.
---

# LEDs brightness control

This demo is similar to the previous PWM brightness control, but you will make 3 LEDs to do so one by one. 

## What you need

* SwiftIO board
* Jumper wires
* 3x color LEDs and 3x 330-ohm resistors \(or 3-color LED Modules\)
* SwiftIO shield \(optional\)

## Circuit

![](../../.gitbook/assets/LEDsBrightness.png)

## Example code

```swift
// Change the LED state every second by setting the interrupt.
// Import the library to enable the relevant classes and functions.
import SwiftIO

// Import the board library to use the Id of the specific board.
import SwiftIOFeather

// Initialize the pins the LEDs are connected to and put them in a array.
let red = PWMOut(Id.PWM0A)
let green = PWMOut(Id.PWM1A)
let blue = PWMOut(Id.PWM2B)
let leds = [red, green, blue]

// Declare a variable to store the value of duty cycle.
var value: Float = 0.0

// Change the brightness of each LED over and over again.
while true {
    // Iterate each LED in the array. 
    // This allows the LED to go through the following process one by one.
    for led in leds {
        // Brighten the LED in two seconds.
        while value <= 1.0 {
            led.setDutycycle(value)
            sleep(ms: 20)
            value += 0.01
        }
        // Keep the value of duty cycle between 0.0 and 1.0.
        value = 1.0
        // Dimming the LED in two seconds.
        while value >= 0 {
            print(value)
            led.setDutycycle(value)
            sleep(ms: 20)
            value -= 0.01
        }
        // Keep the value of duty cycle between 0.0 and 1.0.
        value = 0.0
    }
}
```

## Code analysis

`let leds = [red, green, blue]` This is one of the Swift collection types, known as an array. The array is an ordered collection of values. You could access and modify an array through its methods and properties, or by using subscript syntax, such as `leds.red`, `leds.green`, `leds.blue`.

You can iterate over the entire set of values in an array with the for-in loop: `for led in leds`. This is the reason why we want to create the array `leds`. With the for-in loop syntax structure, it's very convenient and concise to iterate each one in it. Or, you might need to write the same block of code many times.
