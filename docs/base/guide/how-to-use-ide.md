---
id: use-ide
title: How to use IDE
description: How to use MadMachine IDE
slug: /how-to-use-ide
---

# How to use IDE

Now I will show you a brief introduction to MadMachine IDE. Here you can edit, build the code and download it to your board. It simplified the whole process, and thus everyone can get started easily.

## Create new project

When you first open the IDE, it will appear as follows. You need to click on **Create a new MadMachine project**. 

![img](img/create.png)

Then complete the project info.


- The Project name is _necessary_ for your project.
- Just keep the location as it is. The project folder will be created in the directory `Documents/MadMachine/Projects`. 

| LED State | RED | GREEN | BLUE |
| :--- | :--- | :--- | :--- |
| On | USB communication failed | USB connection established | - |
| Slow flashing | Fail to verify file `swiftio.bin` | - | - |
| Fast flashing | Fail to open file `swiftio.bin` | Detecting USB connection | Detecting SD card |

```swift title="Blink"
import SwiftIO
import SwiftIOBoard

let green = DigitalOut(Id.GREEN)
​
while true {
    green.write(true)
    sleep(ms: 1000)
    green.write(false)
    sleep(ms: 1000)
}
```

## Get familiar with IDE
- Menu bar
- Toolbar
    - ![add](img/add.jpeg)**New file**: create a new file for the current project.

