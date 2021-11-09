---
title: Add a library
description: All kinds of libraries do reduce a lot of work and simplify your Swift code for your projects. You can program the hardware and use different electronic components easily with libraries.
---

# Add a library to your project

The library usually contains a block of codes that provides specific functionalities. Then you could use it in any of your projects to realize those functionalities. Let's see how to deal with it.

Let's see how you could use the libraries. You will use the library `MadLed` for example.  

## Add the dependencies

At first, you need to [create a new executable project](create-new-project.md).

All our libraries are on Github. You can find the library `MadLed` [here](https://github.com/madmachineio/MadLed). Click the button **Code**. In the drop-down menu, click the button to **copy** the URL.

![Get the location of the library](img/github.png)

In the file `package.swift`, you indicate the **location** of the library and its **name** in `dependencies` as below. Paste the URL of the package and add its version. Usually, you can keep the version as 0.0.1 to search for tags from it to the next major version since there will not be great changes.

:::note
If you use a library on your computer, you can indicate its path as: `.package(path: "..."),`
:::

![](img/dependency.png)

## Import the target and write code

In the file `main.swift`, import the `MadLed` just as you import `SwiftIO`. Then you can control LEDs more easily.

``` swift
import SwiftIO
import MadBoard
import MadLed

let redPin = DigitalOut(Id.RED)
let bluePin = DigitalOut(Id.BLUE)

let redLed = MadLed(redPin, ledOnValue: false)
let blueLed = MadLed(bluePin, ledOnValue: false)

blueLed.off()
redLed.on()
sleep(ms: 1000)
redLed.off()

while true {
    blueLed.toggle()
    sleep(ms: 1000)
}
```

With Swift Package Manager, you don't need to install the libraries manually. It's so convenient.

As you build your project, the file `Package.swift` will be built first and will automatically get the libraries from the specified location. So it will cost a while when you build your project for the first time.
