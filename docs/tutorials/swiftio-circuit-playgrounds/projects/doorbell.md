---
title: Doorbell
description: Make a doorbell with a button and buzzer.
---

# Doorbell

In the project, you will make a simple doorbell. When you press the doorbell button, the buzzer starts to beep. After three beeps, all return to the original state and wait for another press.

<img
  src={require('./img/doorbell.png').default}
  alt="Make a simple doorbell using button and buzzer" width="480"
/>

## Circuit

The modules used for this project are the button (D1), the buzzer(PWM5A) and the LCD (SPI0).

<img
  src={require('./img/doorbellCircuit.png').default}
  alt="Modules for this project" width="960"
/>


## Program overview

1. Create a label to show the message "Ring the bell" on the screen.
2. Read the digital input to check if the button is pressed.
3. Once you press the button, the buzzer starts to beep three times. At the same time, the message changes to "Ringing...".
4. After the sound stops, the screen display "Ring the bell" again.
5. Keep checking if the button is pressed.


## Example code 

```swift
// import the SwiftIO library to set SPI communication and MadBoard to use pin id.
import SwiftIO
import MadBoard
// Import the driver for the screen and graphical library for display.
import ST7789
import MadDisplay

let bell = PWMOut(Id.PWM5A)
let button = DigitalIn(Id.D1)

// Initialize the pins for the screen.
let spi = SPI(Id.SPI0, speed: 30_000_000)
let cs = DigitalOut(Id.D9)
let dc = DigitalOut(Id.D10)
let rst = DigitalOut(Id.D14)
let bl = DigitalOut(Id.D2)

// Initialize the screen with the pins above.
let screen = ST7789(spi: spi, cs: cs, dc: dc, rst: rst, bl: bl, rotation: .angle90)
// Create an instance using the screen for dispay later.
let display = MadDisplay(screen: screen)
let group = Group()

// Create a label that serves as a message on the screen.
let message = Label(x: 30, y: 110, scale: 2, text: "Ring the bell!", color: Color.white)
// Create a rectangle used as the background of the text.
let rect = Rect(x: 0, y: 95, width: 240, height: 50, fill: Color.orange)

group.append(rect)
group.append(message)
display.update(group)

// If the button is pressed, the buzzer starts to buzz and the message changes.
// After it stop buzzing, the message change to the original on.
while true {
    if button.read() {
        message.updateText("Ringing...")
        message.setX(60)
        display.update(group)
        
        for _ in 0..<3{
            ring()
        }
        
        message.updateText("Ring the bell!")
        message.setX(30)
        display.update(group)
    }
    sleep(ms: 10)
}

// Make the buzzer generate a buzz.
func ring() {
    bell.setDutycycle(0.5)
    sleep(ms: 500)
    bell.setDutycycle(0)
    sleep(ms: 500)
}
```
