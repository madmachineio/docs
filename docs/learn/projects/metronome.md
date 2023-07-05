---
title: Metronome
description: You'll 
---

# Metronome

In this project, you will make a digital metronome. The buzzer produces a beep for each beat, and meanwhile, the LCD shows an indicator. Two knobs are used to change beat settings. 

<img
  src={require('./img/metronomeProject.png').default}
  alt="How this project works" width="960"
/>

## Background

A metronome is a helpful tool when you practice an instrument. It ticks at a regular interval to help you to stick to a regular tempo. And also, you can change the tempo of the metronome according to your music.

<img
  src={require('./img/metronome.png').default}
  alt="Metronome" width="120"
/>

Let's take a look at some concepts:

**Beat** is a basic unit of time in music. When you tap your toes along with a song, you are actually follow its beat. In music, all beats are divided into mutiple sections, called **measures**. A measure usually consists of several beats. 

**Time signature** descibes the count of beats in a measure and tells which note serves as one beat. 4/4 time signature is the most widely-used. In this case, a measure has 4 beat, and a quarter note is one beat, an eighth note is one half beat, etc. 2/4 means 2 beats per measure and a quarter note serves as one beat. You could learn more about it [here](https://www.skoove.com/blog/time-signatures-explained/).

**BPM**, or beat per minute, measures the tempo of a piece of music. For example, 60 BPM means there are be 60 beats in a minute, each one lasts 1 second. Normally, a metronome provides tempo options from 40 to 208 BPM.

You'll build a simplified metronome and care only about beat count in one measure and BMP.

## Circuit

You will use two potentiometers (A0, A11), the buzzer (PWM5A) and the LCD (SPI0) on the kit.

<img
  src={require('./img/metronomeCircuit.png').default}
  alt="Modules for this project" width="960"
/>

## Project overview

1. Read analog values from the potentiometers to calculate the beats in a measure and the BPM.
2. Display the beat settings on the LCD. 
3. A bar will display at the origin for the first beat and move downward with each beat.
4. The buzzer generates a beep for each beat.
4. If you twist the left potentiometer, the BPM changes.
5. If you twist the right potentiometer, the count of beats per measure changes.

## Example code

```swift showLineNumbers
// Import the SwiftIO library to set SPI communication and MadBoard to use pin id.
import SwiftIO
import MadBoard
// Import the driver for the screen and graphical library for display.
import ST7789
import MadDisplay

@main
public struct Metronome {
    public static func main() {
        // Initialize the potentiometers and the buzzer.
        let bpmPot = AnalogIn(Id.A0)
        let beatPot = AnalogIn(Id.A11)
        let buzzer = PWMOut(Id.PWM5A)

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

        // Store the colors for the beet indicators.
        let colors = [Color.white, Color.orange, Color.red, Color.lime,
                    Color.blue, Color.magenta, Color.teal, Color.green,
                    Color.navy, Color.purple, Color.cyan, Color.yellow]

        // The range of the BPM.
        let minBPM = 40
        let maxBPM = 208

        // 440Hz corresponds to A4 and is commonly used for electronic metronome.  
        let lowFrequency = 440
        // The first beat of a measure will sounds ligher. 
        let highFrequency = 880

        // Set the available beats for the metronome. 2-12 covers the most commom beats.
        let maxBeat = 12
        let minBeat = 2
        // It describes the location of beat in a measure.
        var currentBeat = 0

        // Get the initial beat.
        // It sets how many beats a measure has, from 2 to 12, based on the potentiometer reading.
        var beatsConfig = calculateBeat(beatPot.readPercent())

        // Get the initial bpm setting.
        // bpm descibes the beat number every minute.
        // reading 0: bpm 40; reading 1: reading 208
        var bpm = calculateBPM(bpmPot.readPercent())

        // The height of each bar on the screen. It is evenly divided by the number of beats.
        var height = 220 / beatsConfig
        // Create a variable to store the position of the indicator.
        var y = 0
        // Add the indicator of the beat to the group.
        var indicator = Rect(x: 0, y: y, width: 240, height: height, fill: colors[beatsConfig-1])
        group.append(indicator)

        // Create labels to indicate the beat and bpm settings.
        var beatLabel = Label(x: 0, y: 225, text: "Beat: 0 / \(beatsConfig)", color: Color.white)
        var bmpLabel = Label(x: 100, y: 225, text: "BMP: \(bpm)", color: Color.white)
        group.append(beatLabel)
        group.append(bmpLabel)

        // Read the start time.
        var lastTime = getSystemUptimeInMilliseconds()

        while true {
            // Get current bpm setting and update its value on the screen. 
            bpm = calculateBPM(bpmPot.readPercent())
            bmpLabel.updateText("BMP: \(bpm)")
            // The duration for each beat in millisecond.
          let duration = 60000 / bpm

            // Read the current state of the potentiometer to know if the beat is changed.
            let currentBeatsConfig = calculateBeat(beatPot.readPercent())
            // If it's changed, update the display.
            if currentBeatsConfig != beatsConfig {
                beatsConfig = currentBeatsConfig

                // Remove the indicator and display current beats config.
                group.remove(indicator)
                beatLabel.updateText("Beat: 0 / \(beatsConfig)")
                display.update(group)
                
                // Update the indicator according to the beat setting.
                y = 0
                height = 220 / beatsConfig
                indicator = Rect(x: 0, y: y, width: 240, height: height, fill: colors[beatsConfig-1])
                group.append(indicator)

                // Restart from the first beat in the measure.
                currentBeat = 0
            }
            
            // Check if it's time for next beat.
            // If the time difference is not less than the time interval for each beat, 
            // the indicator moves downwards and the buzzer produces a sound.
            let currentTime = getSystemUptimeInMilliseconds()
          if currentTime - lastTime >= Int64(duration) {
                lastTime = currentTime
                
                // Update the display: move the indicator downwards and update beat count in a measure.
                indicator.setY(y)
                beatLabel.updateText("Beat: \(currentBeat + 1) / \(beatsConfig)")
                display.update(group)
                  
                // The first beat in the measure will sound higher than other beat, so you can know when a measure starts.
                currentBeat == 0 ? buzz(highFrequency) : buzz(highFrequency)
            
                // Go to the next beat and move the indicator downwards.
                currentBeat = (currentBeat + 1) % beatsConfig
                y = height * currentBeat
          }
        }

        // Make the buzzer to create a beep at a specified frequency.
        func buzz(pin: PWMOut = buzzer, _ frequency: Int) {
            pin.set(frequency: frequency, dutycycle: 0.5)
          sleep(ms: 100)
          pin.set(frequency: frequency, dutycycle: 0)
        }

        // Calculate the beat according the the analog reading, from 2 to 12.
        func calculateBeat(_ reading: Float, maxBeat: Int = maxBeat, minBeat: Int = minBeat) -> Int {
            return Int((reading * Float(maxBeat - minBeat)).rounded()) + minBeat
        }

        // Calculate the BPM according the the analog reading, from 40 to 208.
        func calculateBPM(_ reading: Float, max: Int = maxBeat, min: Int = minBeat) -> Int {
            return Int(reading * Float(maxBPM - minBPM)) + minBPM
        }
    }
}
```