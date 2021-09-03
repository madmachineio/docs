---
id: run-your-first-project
title: Run your first project
description: Use the Swift Programming Language to realize your first project: blink a LED.
---

# Run your first project

Now that you‘ve got your board, let's start with a hello world project - LED blink. 

## Step 1: Download and install the MadMachine IDE

At first, you certainly need a tool to edit your code. MadMachine IDE allows you to write code, compile and download it to your board. 

You can get the latest IDE for macOS [here](https://github.com/madmachineio/MadMachineIDE/releases/tag/v0.2.3-alpha). And your computer should have Xcode to allow the code to be compiled successfully. The IDE for Windows doesn't support our new features since we are waiting the Window support of Swift language. 

Double click the downloaded file and follow the installation instructions. If you meet with any problem, you could refer to [FAQ](./faq.md). 

:::info
For advanced users, you may edit your code wherever you like and use the [mm-sdk](https://github.com/madmachineio/mm-sdk) to compile your code.
:::



## Step 2: Code in the IDE

Now you're ready to code. 

1. **Open** the MadMachine IDE. Now it's empty on the right side, as you create and try more projects, it will be filled with all your projects.

![Open IDE](img/createProject1.png)

2. Click **Create a new MadMachine project**.

![Create a project](img/createProject2.png)

3. **Name** the project. We call it "Blink". You could choose any descriptive name you like for the project. Choose the **board** you are going to use. Leave the rest as they are. Then click **Create**.

![Name project](img/createProject3.png)

4. The new project is created. 

![New project](img/createProject4.png)

5. Now it's time to write the code. Click on the left panel `Sources` / `Blink` / `main.swift`. You always edit the code in the file `main.swift`. Copy and paste the following code into the file.

```swift
import SwiftIO
import SwiftIOFeather

let green = DigitalOut(Id.GREEN)
​
while true {
    green.write(true)
    sleep(ms: 1000)
    green.write(false)
    sleep(ms: 1000)
}
```
![code](img/code.png)

:::info
There are built-in example codes in the IDE. You can view them by clicking the button ![example](img/example.png) on the bottom left corner. Double click on any of the project. The code will show up in a new window.
:::

## Step 3: Prepare SD card and confirm USB connection

You may notice the message on the status bar saying the board is not connected yet. And the download button on the upper left corner is not clickable. 

![Board status](img/BoardStatus.png)

So you need to connect the board to your computer first.

1. Make sure that you have inserted an **SD card** into the slot.

2. Connect the board to your computer through the **Download port** using a USB cable. SwiftIO Feather board has only the download port. SwiftIO board has both download and serial port, so maker sure you connect the right port.

3. Press the **Download button**. There are two buttons on your board. The one labeled "Download" or "DL" is the correct one.  Once pressed, your board will appear as a USB Drive on your computer. 


:::note
Bad quality USB cable or some third-party USB hub may cause connection failure. If the board still fails to connect to your computer, you can refer to [FAQ](./faq.md)
:::


4. The onboard RGB LED will show the current status of the USB connection. Wait until it turns to **steady green**.

| LED State | RED | GREEN | BLUE |
| :--- | :--- | :--- | :--- |
| On | USB communication failed | USB connection established | - |
| Slow flashing | Fail to verify file `swiftio.bin` | - | - |
| Fast flashing | Fail to open file `swiftio.bin` | Detecting USB connection | Detecting SD card |


## Step 4: Build and download the code to your board

1. Once the SD card is mounted successfully, the message on the status bar will change to **"XXX ready"**. XXX corresponds to the board you're using.

2. Click the Download ![download button](img/download.png) button.

![download code](img/clickDownload.png)

The IDE begins to build your project and download it to your board if there is no error. 

After the code is downloaded, the USB drive will be removed automatically.

![The code is downloaded](img/downloaded.png)

Congratulations! The onboard green LED begins to blink per second.