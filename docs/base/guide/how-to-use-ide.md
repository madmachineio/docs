---
id: use-ide
title: How to use IDE
description: How to use MadMachine IDE
slug: /how-to-use-ide
---

# How to use IDE

Now I will show you a brief introduction to MadMachine IDE. It allows you to edit, build the code and download it to your board. It simplifies the whole coding process, and thus everyone can get started easily.

## Open the MadMachine IDE

To enter the main interface of the MadMachine IDE, you have two choices: create a new project or open an existing one. 


### Create new project

When you first open the IDE, it will appear as follows. You need to click on **Create a new MadMachine project**. 

![create a project](img/create.png)

Then complete the project info.

- The **Project name** is necessary for your project.
- Just keep the location as it is. The project folder is in the directory `Documents/MadMachine/Projects` by default. 
- The Project Type decides whether you create an executable project or would like to write a library. 
- The **Board Type** is used to select the right board you deal with. 

![project info](img/projectInfo.png)

Click **Create**.

### Open an existing project

When you double click the MadMachine IDE, you can see the option **Open an existing project**. 

![Open an project](img/open.png)

Then a pop up window will allow you to select a project. You need to click the file `package.mmp` to open a project.

![Choose a project](img/choose.png)

Of course, you can directly go to the directory of a project in your computer and double click the file `package.mmp` to open it.

![go to the directory of a project and open it](img/openInFinder.png)

## IDE overview


Just like many other software, there are some menus at the top to set its features.

![Menue bar](img/menu.png)

- MadMachine: know about the IDE version, adjust the theme and font size.
- File: create, open and save the file or project.
- Edit: modify your code using some basic operations,  such as paste, copy, etc.
- Window: choose the window setup you prefer.
- Help: consult the website for more detailed information.


Now let's navigate around the interface to get familiar with IDE.

![IDE interface](img/IDE.png)

- ① **New file**: create a new file for the current project.
- ② **Save all**: save all files in the current project.
- ③ **Build**: save the file and build the code you have written.
- ④ **Download**: build the code and then download it to your board. If you 
- ⑤ **Serial monitor**: send serial data from your computer to the board and receive messages from the board. 
- ⑥ **Explorer**: find, open and manage the file you have created for current project.
- ⑦ **Examples**: see some built-in example codes for your reference.
- ⑧ **Editor**: write, edit and modify code. After modification, a small dot will appear next to the file name and it will disappear after you save the file.
- ⑨ **Status bar**: confirm the connection of your board with the computer.
- ⑩ **Terminal**: displays the output info about the building process. You can correct your code according to the messages if something goes wrong.


**About Serial monitor**

After you download the code, connect the serial port to your computer with a USB cable. Wait several seconds. Then you click on the ![serial button](img/serialButton.png) button, a new window will pop up.

![Serial monitor](img/serial.png)

Select the UART Port of the board and click **Connect**. If you are not sure which port is the right one, you can disconnect your board and see which one disppears.

![Select port](img/selectPort.png)

If you cannot the port, please close the Serial window and reopen it after a few seconds. After well connected, the information will begin to appear.

The serial monitor is of great use when there is something wrong with your code. You could print the results of each step to debug your code.

