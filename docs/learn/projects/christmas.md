---
title: Christmas
description: You'll explore more with some advanced projects.
---

# Christmas

In this project, you will create a Christmas decoration. The screen displays an image of Christmas and the speaker plays a Christmas song. Meanwhile, small snowflakes fall.


## Circuit



## Program overview



## Example code

Please copy the [image file](img/Christmas.bin) into the SD card in advance.

The code used to play music is from [here](../peripherals/speaker.mdx#2-music-player).

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue="main"
  values={[
    { label: 'Christmas.swift', value: 'main', },
    { label: 'Player.swift', value: 'player', },
    { label: 'Note.swift', value: 'note', },
    { label: 'Music.swift', value: 'music', },
  ]
}>

<TabItem value="main">

```swift showLineNumbers
// Play the christmas song and display snow falling effect on screen.

import SwiftIO
import MadBoard
// The driver for the screen.
import ST7789
// The driver for the acceleromete.
import LIS3DH
// Graphical library.
import MadGraphics

@main
public struct Christmas {
    public static func main() {
                // Initialize the SPI pin and the digital pins for the LCD.
        let spi = SPI(Id.SPI0, speed: 30_000_000)
        let cs = DigitalOut(Id.D9)
        let dc = DigitalOut(Id.D10)
        let rst = DigitalOut(Id.D14)
        let bl = DigitalOut(Id.D2)

        // Initialize the LCD using the pins above. Rotate the screen to keep the original at the upper left.
        let screen = ST7789(spi: spi, cs: cs, dc: dc, rst: rst, bl: bl, rotation: .angle90)

        // Initialize the accelerometer using I2C.
        let i2c = I2C(Id.I2C0)
        let accelerometer = LIS3DH(i2c)

        // A root tile is necessary to store all subtiles.
        let rootTile = Tile<UInt16>(width: screen.width, height: screen.height, primaryColor: 0, isRoot: true)

        // Get background image.
        let imageBuffer = readImage(from: "/SD:/Christmas.bin")
        let backgroundTile = Tile(width: screen.width, height: screen.height, bind: imageBuffer)
        rootTile.append(backgroundTile)

        // The count of snowflakes.
        let snowCount = 120
        // The size of snowflakes.
        let snowSize = 11

        // Store the snowflake tiles to update their position later.
        var snowTiles: [Tile<UInt16>] = []

        // The position range for snowflakes.
        let positionRange = Array(0..<(screen.width-snowSize))

        // Initialize snowflakes.
        for _ in 0..<snowCount {
            let snowTile = createSnowTile(at: getRandomPos())
            snowTiles.append(snowTile)
            rootTile.append(snowTile)
        }

        // Buffer used to store bitmap info.
        var screenBuffer = [UInt16](repeating: 0, count: screen.width * screen.height)
        var lineBuffer = [UInt16](repeating: 0, count: screen.width * screen.height)

        // Store the bottom height to bank up snowflakes.
        var bottomY = [Int](repeating: screen.height - 1 - snowSize, count: screen.width)

        // Initialize the speaker.
        let speaker = I2SOut(Id.I2SOut0, rate: 16_000, channel: .stereo)
        // Initialize a player to play the music using generated audio data.
        let player = Player(speaker, sampleRate: 16_000)

        // Set the music player according to the music score.
        player.bpm = MerryChristmas.bpm
        player.timeSignature = MerryChristmas.timeSignature

//        player.bpm = JingleBells.bpm
//        player.timeSignature = JingleBells.timeSignature

        // Store the current note in the track.
        var noteIndex = 0

        while true {
            updateDisplay()

            // The snowflakes fall consistently.
            snow()

//            // The snowflakes fall in accordance witht the accelerations.
//            // Shake the board to restart the falling movement.
//            snowUsingAccelerometer()

            playMusic(
                MerryChristmas.track,
                waveform: MerryChristmas.trackWaveform,
                amplitudeRatio: MerryChristmas.amplitudeRatio
            )

//            playMusic(
//                JingleBells.track,
//                waveform: JingleBells.trackWaveform,
//                amplitudeRatio: JingleBells.amplitudeRatio
//            )
        }

        // Play music using its score.
        func playMusic(
            _ track: [Player.NoteInfo],
            waveform: Waveform,
            amplitudeRatio: Float
        ) {
            player.playNote(track[noteIndex], waveform: waveform, amplitudeRatio: amplitudeRatio)

            noteIndex += 1
            if noteIndex == track.count {
                noteIndex = 0
            }
        }

        // Generate starting position for snowflakes.
        func getRandomPos() -> Point {
            let x = positionRange.shuffled()[Int.random(in: positionRange.indices)]
            let y = positionRange.shuffled()[Int.random(in: positionRange.indices)]
            return (x, y)
        }

        // The snowflakes fall at a random speed to look more natural.
        // After reaching the bottom, they will be repositioned and fall again.
        func snow() {
            for snowTile in snowTiles {
                // Make the flake move down a bit each time.
                // The horizontal movement simulates the influence of air movements.
                var x = snowTile.x + Int.random(in: -1...1)
                var y = snowTile.y + Int.random(in: 1...3)

                // Kepp the flake within the screen.
                if x < 0 {
                    x = 0
                } else if x > screen.width - snowTile.width - 1 {
                    x = screen.width - snowTile.width - 1
                }

                // Update the flake's position after it's on the bottom.
                if y > screen.height - snowTile.height - 1 {
                    let pos = getRandomPos()
                    x = pos.x
                    y = pos.y
                }
                snowTile.move(to: (x, y))
            }
        }

        // The snowflakes fall and bank up on the bottom.
        // The speed depends on the accelerations.
        // You can shake the board back and forth to reposition the snowflakes and
        // make them fall again.
        func snowUsingAccelerometer() {
            let values = accelerometer.readXYZ()

            if values.y < -1 {
                snowTiles.forEach { $0.move(to: getRandomPos()) }
                for i in bottomY.indices {
                    bottomY[i] = screen.height - 1 - snowSize
                }
            } else {
                for snowTile in snowTiles {
                    if snowTile.y < bottomY[snowTile.x] {
                        let dx = Int(Float(Int.random(in: 1...3)) * -values.x)
                        let dy = Int(Float(Int.random(in: 1...3)) * values.y)

                        var x = snowTile.x + dx
                        var y = snowTile.y + dy

                        if x < 0 {
                            x = 0
                        } else if x > screen.width - snowTile.width - 1 {
                            x = screen.width - snowTile.width - 1
                        }

                        if y < 0 {
                            y = 0
                        } else if y >= bottomY[snowTile.x] {
                            y = bottomY[snowTile.x]
                            for i in x..<x+snowTile.width {
                                bottomY[i] = y - snowTile.height
                            }
                        }
                        snowTile.move(to: (x, y))
                    }
                }
            }
        }

        // Draw snowflakes.
        func createSnowTile(at point: Point) -> Tile<UInt16> {
            let bitmap = Bitmap<UInt16>(width: snowSize, height: snowSize)
            let color = Color.getRGB565LE(Color.white)
            for x in 0..<snowSize {
                bitmap.setPixel(at: (x, snowSize/2), color)
            }
            for y in 0..<snowSize {
                bitmap.setPixel(at: (snowSize/2, y), color)
                bitmap.setPixel(at: (y, y), color)
                bitmap.setPixel(at: (y, snowSize - 1 - y), color)
            }

            return Tile<UInt16>(at: point, bitmap: bitmap, chromaKey: 0)
        }

        // Update the display after snowflakes change their position.
        func updateDisplay() {
            var dirtyRegions: [Region] = []
            // Get the area that has been changed on the rootTile.
            rootTile.getRefreshRegions(into: &dirtyRegions)

            for dirtyRegion in dirtyRegions {
                // Update the buffer with the new pixel info.
                rootTile.update(region: dirtyRegion, into: &screenBuffer)

                // Get the necessary pixel data from the screenBuffer which stores
                // data for the entire tile.
                var count = 0
                for y in dirtyRegion.y..<(dirtyRegion.y + dirtyRegion.height) {
                    for x in dirtyRegion.x..<(dirtyRegion.x + dirtyRegion.width) {
                        lineBuffer[count] = screenBuffer[y * screen.width + x]
                        count += 1
                    }
                }

                // Send the data to the screen using SPI to update the specified area.
                lineBuffer.withUnsafeMutableBytes {
                    screen.writeBitmap(
                        x: dirtyRegion.x, y: dirtyRegion.y,
                        width: dirtyRegion.width, height: dirtyRegion.height,
                        data: UnsafeRawBufferPointer($0)
                    )
                }
            }
            // Reset all status of rootTile for next change.
            rootTile.finishRefresh()
        }

        // Read image from SD card.
        func readImage(from path: String) -> UnsafeBufferPointer<UInt16> {
            let widthMask = UInt32(0x7FF) << 10
            let heightMask = UInt32(0x7FF) << 21

            var header = UInt32(0)
            let headerSize = 4

            let file = FileDescriptor.open(path)
            defer { file.close() }

            withUnsafeMutableBytes(of: &header) {
                _ = file.read(into: $0, count: headerSize)
            }

            let width = (header & widthMask) >> 10
            let height = (header & heightMask) >> 21
            let bufferCount = Int(width * height)

            let buffer = UnsafeMutableBufferPointer<UInt16>.allocate(capacity: bufferCount)
            buffer.initialize(repeating: 0x0000)

            let rawBuffer = UnsafeMutableRawBufferPointer(buffer)

            _ = file.read(fromAbsoluteOffest: headerSize, into: rawBuffer, count: bufferCount * 2)

            return UnsafeBufferPointer(buffer)
        }
    }
}
```
</TabItem>

<TabItem value="player">

```swift showLineNumbers
import SwiftIO

/// Play music using the given tracks.
/// The sound sample is generated based on a triangle wave and be sent using I2S protocol.
public class Player {
    public typealias NoteInfo = (note: Note, noteValue: Int)
    public typealias TimeSignature = (beatsPerBar: Int, noteValuePerBeat: Int)

    /// Beats per minute. It sets the speed of the music.
    public var bpm: Int = 60
    /// The beat count per bar and the note value for a beat.
    public var timeSignature: TimeSignature = (4,4)
    /// Set the overall note pitch. 12 half steps constitute an octave.
    public var halfStep = 0
    /// Fade in/out duration for each note in second.
    public var fadeDuration: Float = 0.01

    let amplitude = 16383
    var beatDuration: Float { 60.0 / Float(bpm) }

    var sampleRate: Float
    var speaker: I2SOut

    var buffer32 = [Int32](repeating: 0, count: 200_000)
    var buffer16 = [Int16](repeating: 0, count: 200_000)


    /// Initialize a player.
    /// - Parameters:
    ///   - speaker: An I2SOut interface.
    ///   - sampleRate: the sample count per second. It should be the same as that of I2S.
    public init(_ speaker: I2SOut, sampleRate: Float) {
        self.speaker = speaker
        self.sampleRate = sampleRate
    }

    /// Calculate and combine the data of all tracks, and then play the sound.
    ///
    /// - Parameters:
    ///   - tracks: different tracks of a piece of music. A track consists of
    ///   notes and note value. For example, note value of a quarter note is 4,
    ///   note value of a half note is 2.
    ///   - waveforms: the waveforms for each track used to generate sound samples.
    ///   - amplitudeRatios: the ratios used to control the sound loudness of each track.
    public func playTracks(
        _ tracks: [[NoteInfo]],
        waveforms: [Waveform],
        amplitudeRatios: [Float]
    ) {
        let beatCount = tracks[0].reduce(0) {
            $0 + Float(timeSignature.noteValuePerBeat) / Float($1.noteValue)
        }

        let barCount = Int(beatCount / Float(timeSignature.beatsPerBar))

        for barIndex in 0..<barCount {
            getBarData(tracks, barIndex: barIndex, waveforms: waveforms, amplitudeRatios: amplitudeRatios, data: &buffer32)

            let count = Int(Float(timeSignature.beatsPerBar) * beatDuration * sampleRate * 2)
            for i in 0..<count {
                buffer16[i] = Int16(buffer32[i] / Int32(tracks.count))
            }
            sendData(data: buffer16, count: count)
        }
    }


    /// Calculate all data of the track and play the sound.
    /// - Parameters:
    ///   - track: score of a melody in forms of notes and note value.
    ///   For example, note value of a quarter note is 4, note value of a half note is 2.
    ///   - waveform: the waveform used to generate sound samples.
    ///   - amplitudeRatio: the ratio used to control the sound loudness.
    public func playTrack(
        _ track: [NoteInfo],
        waveform: Waveform,
        amplitudeRatio: Float
    ) {
        for noteInfo in track {
            playNote(noteInfo, waveform: waveform, amplitudeRatio: amplitudeRatio)
        }
    }


    /// Generate data for specified note and play the sound.
    /// - Parameters:
    ///   - noteInfo: the notes and its note value.
    ///   - waveform: the waveform used to generate sound samples.
    ///   - amplitudeRatio: the ratio used to control the sound loudness.
    public func playNote(
        _ noteInfo: NoteInfo,
        waveform: Waveform,
        amplitudeRatio: Float
    ) {
        let duration  = calculateNoteDuration(noteInfo.noteValue)

        var frequency: Float = 0

        if noteInfo.note == .rest {
            frequency = 0
        } else {
            frequency = frequencyTable[noteInfo.note.rawValue + halfStep]!
        }

        let sampleCount = Int(duration * sampleRate)

        for i in 0..<sampleCount {
            let sample = getNoteSample(
                at: i, frequency: frequency,
                noteDuration: duration,
                waveform: waveform,
                amplitudeRatio: amplitudeRatio)

            buffer16[i * 2] = sample
            buffer16[i * 2 + 1] = sample
        }

        sendData(data: buffer16, count: sampleCount * 2)
    }
}

extension Player {
    /// Calculate data of all notes in a bar.
    func getBarData(
        _ tracks: [[NoteInfo]],
        barIndex: Int,
        waveforms: [Waveform],
        amplitudeRatios: [Float],
        data: inout [Int32]
    ) {
        for i in data.indices {
            data[i] = 0
        }

        for trackIndex in tracks.indices {
            let track = tracks[trackIndex]
            let noteIndices = getNotesInBar(at: barIndex, in: track)
            var start = 0

            for index in noteIndices {
                getNoteData(
                    noteInfo: track[index],
                    startIndex: start,
                    waveform: waveforms[trackIndex],
                    amplitudeRatio: amplitudeRatios[trackIndex],
                    data: &data)

                start += Int(calculateNoteDuration(track[index].noteValue) * sampleRate * 2)
            }
        }
    }

    /// Calculate data of a note.
    func getNoteData(
        noteInfo: NoteInfo,
        startIndex: Int,
        waveform: Waveform,
        amplitudeRatio: Float,
        data: inout [Int32]
    ) {
        guard noteInfo.noteValue > 0 else { return }

        let duration  = calculateNoteDuration(noteInfo.noteValue)

        var frequency: Float = 0
        if noteInfo.note == .rest {
            frequency = 0
        } else {
            frequency = frequencyTable[noteInfo.note.rawValue + halfStep]!
        }

        for i in 0..<Int(duration * sampleRate) {
            let sample = Int32(getNoteSample(at: i, frequency: frequency, noteDuration: duration, waveform: waveform, amplitudeRatio: amplitudeRatio))

            data[i * 2 + startIndex] += sample
            data[i * 2 + startIndex + 1] += sample
        }
    }

    /// Get the indices of notes in the track within a specified bar.
    func getNotesInBar(at barIndex: Int, in track: [NoteInfo]) -> [Int] {
        var indices: [Int] = []
        var index = 0
        var sum: Float = 0

        while Float(timeSignature.beatsPerBar * (barIndex + 1)) - sum > 0.1 && index < track.count {
            sum += Float(timeSignature.noteValuePerBeat) / Float(track[index].noteValue)

            if sum - Float(timeSignature.beatsPerBar * barIndex) > 0.1 {
                indices.append(index)
            }

            index += 1
        }

        return indices
    }

    /// Send the generated data using I2S protocol to play the sound.
    func sendData(data: [Int16], count: Int) {
        data.withUnsafeBytes { ptr in
            let u8Array = ptr.bindMemory(to: UInt8.self)
            speaker.write(Array(u8Array), count: count * 2)
        }
    }

    /// Calculate the duration of the given note value in second.
    func calculateNoteDuration(_ noteValue: Int) -> Float {
        return beatDuration * (Float(timeSignature.noteValuePerBeat) / Float(noteValue))
    }

    /// Calculate a sample at a specified index of a note.
    /// The samples within fade (in/out) duration will be reduced to get a more
    /// natural sound effect.
    func getNoteSample(
        at index: Int,
        frequency: Float,
        noteDuration: Float,
        waveform: Waveform,
        amplitudeRatio: Float
    ) -> Int16 {
        if frequency == 0 { return 0 }

        var sample: Float  = 0

        switch waveform {
        case .square:
            sample = getSquareSample(at: index, frequency: frequency, amplitudeRatio: amplitudeRatio)
        case .triangle:
            sample = getTriangleSample(at: index, frequency: frequency, amplitudeRatio: amplitudeRatio)
        }

        let fadeInEnd = Int(fadeDuration * sampleRate)
        let fadeOutStart = Int((noteDuration - fadeDuration) * sampleRate)
        let fadeSampleCount = fadeDuration * sampleRate
        let sampleCount = Int(noteDuration * sampleRate)

        switch index {
        case 0..<fadeInEnd:
            sample *= Float(index) / fadeSampleCount
        case fadeOutStart..<sampleCount:
            sample *= Float(sampleCount - index) / fadeSampleCount
        default:
            break
        }

        return Int16(sample * Float(amplitude))
    }

    /// Calculate the raw sample of a specified point from a triangle wave.
    /// It sounds much softer than square wave.
    func getTriangleSample(
        at index: Int,
        frequency: Float,
        amplitudeRatio: Float
    ) -> Float {
        let period = sampleRate / frequency

        let sawWave = Float(index) / period - Float(Int(Float(index) / period + 0.5))
        let triWave = 2 * abs(2 * sawWave) - 1

        return triWave * amplitudeRatio
    }

    /// Calculate the raw sample of a specified point from a square wave.
    /// The sound from it will sound a little sharp.
    func getSquareSample(at index: Int,
        frequency: Float,
        amplitudeRatio: Float
    ) -> Float {
        let period = Int(sampleRate / frequency)

        if index % period < period / 2 {
            return -amplitudeRatio
        } else {
            return amplitudeRatio
        }
    }
}
```
</TabItem>

<TabItem value="note">

```swift showLineNumbers
public enum Waveform {
    case square
    case triangle
}

/// The table is listed to raise note pitch more easily by changing half steps.
let frequencyTable: [Int: Float] = [
    0    :    0         ,
    1    :    27.5      ,
    2    :    29.1352   ,
    3    :    30.8677   ,
    4    :    32.7032   ,
    5    :    34.6478   ,
    6    :    36.7081   ,
    7    :    38.8909   ,
    8    :    41.2034   ,
    9    :    43.6535   ,
    10   :    46.2493   ,
    11   :    48.9994   ,
    12   :    51.9131   ,
    13   :    55        ,
    14   :    58.2705   ,
    15   :    61.7354   ,
    16   :    65.4064   ,
    17   :    69.2957   ,
    18   :    73.4162   ,
    19   :    77.7817   ,
    20   :    82.4069   ,
    21   :    87.3071   ,
    22   :    92.4986   ,
    23   :    97.9989   ,
    24   :    103.826   ,
    25   :    110       ,
    26   :    116.541   ,
    27   :    123.471   ,
    28   :    130.813   ,
    29   :    138.591   ,
    30   :    146.832   ,
    31   :    155.563   ,
    32   :    164.814   ,
    33   :    174.614   ,
    34   :    184.997   ,
    35   :    195.998   ,
    36   :    207.652   ,
    37   :    220       ,
    38   :    233.082   ,
    39   :    246.942   ,
    40   :    261.626   ,
    41   :    277.183   ,
    42   :    293.665   ,
    43   :    311.127   ,
    44   :    329.628   ,
    45   :    349.228   ,
    46   :    369.994   ,
    47   :    391.995   ,
    48   :    415.305   ,
    49   :    440       ,
    50   :    466.164   ,
    51   :    493.883   ,
    52   :    523.251   ,
    53   :    554.365   ,
    54   :    587.33    ,
    55   :    622.254   ,
    56   :    659.255   ,
    57   :    698.456   ,
    58   :    739.989   ,
    59   :    783.991   ,
    60   :    830.609   ,
    61   :    880       ,
    62   :    932.328   ,
    63   :    987.767   ,
    64   :    1046.5    ,
    65   :    1108.73   ,
    66   :    1174.66   ,
    67   :    1244.51   ,
    68   :    1318.51   ,
    69   :    1396.91   ,
    70   :    1479.98   ,
    71   :    1567.98   ,
    72   :    1661.22   ,
    73   :    1760      ,
    74   :    1864.66   ,
    75   :    1975.53   ,
    76   :    2093      ,
    77   :    2217.46   ,
    78   :    2349.32   ,
    79   :    2489.02   ,
    80   :    2637.02   ,
    81   :    2793.83   ,
    82   :    2959.96   ,
    83   :    3135.96   ,
    84   :    3322.44   ,
    85   :    3520      ,
    86   :    3729.31   ,
    87   :    3951.07   ,
    88   :    4186.01
]

public enum Note: Int {
    case    A0      =   1
    case    AS0     =   2
    case    B0      =   3
    case    C1      =   4
    case    CS1     =   5
    case    D1      =   6
    case    DS1     =   7
    case    E1      =   8
    case    F1      =   9
    case    FS1     =   10
    case    G1      =   11
    case    GS1     =   12
    case    A1      =   13
    case    AS1     =   14
    case    B1      =   15
    case    C2      =   16
    case    CS2     =   17
    case    D2      =   18
    case    DS2     =   19
    case    E2      =   20
    case    F2      =   21
    case    FS2     =   22
    case    G2      =   23
    case    GS2     =   24
    case    A2      =   25
    case    AS2     =   26
    case    B2      =   27
    case    C3      =   28
    case    CS3     =   29
    case    D3      =   30
    case    DS3     =   31
    case    E3      =   32
    case    F3      =   33
    case    FS3     =   34
    case    G3      =   35
    case    GS3     =   36
    case    A3      =   37
    case    AS3     =   38
    case    B3      =   39
    case    C4      =   40
    case    CS4     =   41
    case    D4      =   42
    case    DS4     =   43
    case    E4      =   44
    case    F4      =   45
    case    FS4     =   46
    case    G4      =   47
    case    GS4     =   48
    case    A4      =   49
    case    AS4     =   50
    case    B4      =   51
    case    C5      =   52
    case    CS5     =   53
    case    D5      =   54
    case    DS5     =   55
    case    E5      =   56
    case    F5      =   57
    case    FS5     =   58
    case    G5      =   59
    case    GS5     =   60
    case    A5      =   61
    case    AS5     =   62
    case    B5      =   63
    case    C6      =   64
    case    CS6     =   65
    case    D6      =   66
    case    DS6     =   67
    case    E6      =   68
    case    F6      =   69
    case    FS6     =   70
    case    G6      =   71
    case    GS6     =   72
    case    A6      =   73
    case    AS6     =   74
    case    B6      =   75
    case    C7      =   76
    case    CS7     =   77
    case    D7      =   78
    case    DS7     =   79
    case    E7      =   80
    case    F7      =   81
    case    FS7     =   82
    case    G7      =   83
    case    GS7     =   84
    case    A7      =   85
    case    AS7     =   86
    case    B7      =   87
    case    C8      =   88
    case    rest    =   0
}
```
</TabItem>

<TabItem value="music">

```swift showLineNumbers
struct JingleBells {
    static let track: [Player.NoteInfo] =  [
        // intro bar
        (.rest, 1),

        // bar 1
        (.B3, 4),
        (.B3, 4),
        (.B3, 2),

        // bar 2
        (.B3, 4),
        (.B3, 4),
        (.B3, 2),

        // bar 3
        (.B3, 4),
        (.D4, 4),
        (.G3, 4),
        (.A3, 4),

        // bar 4
        (.B3, 1),

        // bar 5
        (.C4, 4),
        (.C4, 4),
        (.C4, 4),
        (.C4, 4),

        // bar 6
        (.C4, 4),
        (.B3, 4),
        (.B3, 4),
        (.B3, 4),

        // bar 7
        (.B3, 4),
        (.A3, 4),
        (.A3, 4),
        (.B3, 4),

        // bar 8
        (.A3, 2),
        (.D4, 2),

        // bar 9
        (.B3, 4),
        (.B3, 4),
        (.B3, 2),

        // bar 10
        (.B3, 4),
        (.B3, 4),
        (.B3, 2),

        // bar 11
        (.B3, 4),
        (.D4, 4),
        (.G3, 4),
        (.A3, 4),

        // bar 12
        (.B3, 1),

        // bar 13
        (.C4, 4),
        (.C4, 4),
        (.C4, 4),
        (.C4, 4),

        // bar 14
        (.C4, 4),
        (.B3, 4),
        (.B3, 4),
        (.B3, 4),

        // bar 15
        (.D4, 4),
        (.D4, 4),
        (.C4, 4),
        (.A3, 4),

        // bar 16
        (.G3, 1),

        // repeat bar1-16
        // bar 1
        (.B3, 4),
        (.B3, 4),
        (.B3, 2),

        // bar 2
        (.B3, 4),
        (.B3, 4),
        (.B3, 2),

        // bar 3
        (.B3, 4),
        (.D4, 4),
        (.G3, 4),
        (.A3, 4),

        // bar 4
        (.B3, 1),

        // bar 5
        (.C4, 4),
        (.C4, 4),
        (.C4, 4),
        (.C4, 4),

        // bar 6
        (.C4, 4),
        (.B3, 4),
        (.B3, 4),
        (.B3, 4),

        // bar 7
        (.B3, 4),
        (.A3, 4),
        (.A3, 4),
        (.B3, 4),

        // bar 8
        (.A3, 2),
        (.D4, 2),

        // bar 9
        (.B3, 4),
        (.B3, 4),
        (.B3, 2),

        // bar 10
        (.B3, 4),
        (.B3, 4),
        (.B3, 2),

        // bar 11
        (.B3, 4),
        (.D4, 4),
        (.G3, 4),
        (.A3, 4),

        // bar 12
        (.B3, 1),

        // bar 13
        (.C4, 4),
        (.C4, 4),
        (.C4, 4),
        (.C4, 4),

        // bar 14
        (.C4, 4),
        (.B3, 4),
        (.B3, 4),
        (.B3, 4),

        // bar 15
        (.D4, 4),
        (.D4, 4),
        (.C4, 4),
        (.A3, 4),

        // bar 16
        (.G3, 1)
    ]

    static let trackWaveform: Waveform = .triangle
    static let amplitudeRatio: Float = 0.5
    static let bpm = 240
    static let timeSignature = (4, 4)
}



struct MerryChristmas {
    static let track: [Player.NoteInfo] =  [
        // bar0
        (.rest, 2),
        (.C5, 4),

        // bar1
        (.F5, 4),
        (.F5, 8),
        (.G5, 8),
        (.F5, 8),
        (.E5, 8),

        // bar2
        (.D5, 4),
        (.D5, 4),
        (.D5, 4),

        // bar3
        (.G5, 4),
        (.G5, 8),
        (.A5, 8),
        (.G5, 8),
        (.F5, 8),

        // bar4
        (.E5, 4),
        (.C5, 4),
        (.C5, 4),

        // bar5
        (.A5, 4),
        (.A5, 8),
        (.AS5, 8),
        (.A5, 8),
        (.G5, 8),

        // bar6
        (.F5, 4),
        (.D5, 4),
        (.C5, 8),
        (.C5, 8),

        // bar7
        (.D5, 4),
        (.G5, 4),
        (.E5, 4),


        // bar8
        (.F5, 2),
        (.C5, 4),

        // bar9
        (.F5, 4),
        (.F5, 8),
        (.G5, 8),
        (.F5, 8),
        (.E5, 8),

        // bar10
        (.D5, 4),
        (.D5, 4),
        (.D5, 4),

        // bar11
        (.G5, 4),
        (.G5, 8),
        (.A5, 8),
        (.G5, 8),
        (.F5, 8),

        // bar12
        (.E5, 4),
        (.C5, 4),
        (.C5, 4),

        // bar13
        (.A5, 4),
        (.A5, 8),
        (.AS5, 8),
        (.A5, 8),
        (.G5, 8),

        // bar14
        (.F5, 4),
        (.D5, 4),
        (.C5, 8),
        (.C5, 8),

        // bar15
        (.D5, 4),
        (.G5, 4),
        (.E5, 4),

        // bar16
        (.F5, 2),
        (.C5, 4),


        // bar17
        (.F5, 4),
        (.F5, 4),
        (.F5, 4),

        // bar18
        (.E5, 2),
        (.E5, 4),

        // bar19
        (.F5, 4),
        (.E5, 4),
        (.D5, 4),

        // bar20
        (.C5, 2),
        (.A5, 4),

        // bar21
        (.AS5, 4),
        (.A5, 4),
        (.G5, 4),

        // bar22
        (.C6, 4),
        (.C5, 4),
        (.C5, 8),
        (.C5, 8),

        // bar23
        (.D5, 4),
        (.G5, 4),
        (.E5, 4),

        // bar24
        (.F5, 2),
        (.C5, 4),

        // bar25
        (.F5, 4),
        (.F5, 8),
        (.G5, 8),
        (.F5, 8),
        (.E5, 8),

        // bar26
        (.D5, 4),
        (.D5, 4),
        (.D5, 4),


        // bar27
        (.G5, 4),
        (.G5, 8),
        (.A5, 8),
        (.G5, 8),
        (.F5, 8),

        // bar28
        (.E5, 4),
        (.C5, 4),
        (.C5, 4),

        // bar29
        (.A5, 4),
        (.A5, 8),
        (.AS5, 8),
        (.A5, 8),
        (.G5, 8),

        // bar30
        (.F5, 4),
        (.D5, 4),
        (.C5, 8),
        (.C5, 8),

        // bar31
        (.D5, 4),
        (.G5, 4),
        (.E5, 4),

        // bar32
        (.F5, 2),
        (.C5, 4),

        // bar33
        (.F5, 4),
        (.F5, 4),
        (.F5, 4),

        // bar34
        (.E5, 2),
        (.E5, 4),

        // bar35
        (.F5, 4),
        (.E5, 4),
        (.D5, 4),


        // bar36
        (.C5, 2),
        (.A5, 4),

        // bar37
        (.AS5, 4),
        (.A5, 4),
        (.G5, 4),

        // bar38
        (.C6, 4),
        (.C5, 4),
        (.C5, 8),
        (.C5, 8),

        // bar39
        (.D5, 4),
        (.G5, 4),
        (.E5, 4),

        // bar40
        (.F5, 2),
        (.C5, 4),

        // bar41
        (.F5, 4),
        (.F5, 8),
        (.G5, 8),
        (.F5, 8),
        (.E5, 8),

        // bar42
        (.D5, 4),
        (.D5, 4),
        (.D5, 4),

        // bar43
        (.G5, 4),
        (.G5, 8),
        (.A5, 8),
        (.G5, 8),
        (.F5, 8),

        // bar44
        (.E5, 4),
        (.C5, 4),
        (.C5, 4),


        // bar45
        (.A5, 4),
        (.A5, 8),
        (.AS5, 8),
        (.A5, 8),
        (.G5, 8),

        // bar46
        (.F5, 4),
        (.D5, 4),
        (.C5, 8),
        (.C5, 8),

        // bar47
        (.D5, 4),
        (.G5, 4),
        (.E5,4),

        // bar48
        (.F5, 2),
        (.C5, 4),

        // bar49
        (.F5, 4),
        (.F5, 8),
        (.G5, 8),
        (.F5, 8),
        (.E5, 8),

        // bar50
        (.D5, 4),
        (.D5, 4),
        (.D5, 4),

        // bar51
        (.G5, 4),
        (.G5, 8),
        (.A5, 8),
        (.G5, 8),
        (.F5, 8),

        // bar52
        (.E5, 4),
        (.C5, 4),
        (.C5, 4),


        // bar53
        (.A5, 4),
        (.A5, 8),
        (.AS5, 8),
        (.A5, 8),
        (.G5, 8),

        // bar54
        (.F5, 4),
        (.D5, 4),
        (.C5, 8),
        (.C5, 8),

        // bar55
        (.D5, 4),
        (.G5, 4),
        (.E5, 4),

        // bar56
        (.F5, 2),
        (.rest, 4)
    ]

    static let trackWaveform: Waveform = .triangle
    static let amplitudeRatio: Float = 0.3
    static let bpm = 140
    static let timeSignature = (3, 4)
}
```
</TabItem>
</Tabs>
