---
title: Debug
description: How to debug your code
---

# Debug

You must have met similar situations: your code is downloaded to the board but doesn’t work out as you have predicted. What's going wrong? At that time, you’ll need to debug your code.

There are two common ways. One is to step through it, which is not supported yet. So the best way by now is to print the information out to find the problem.

Let’s see how it works.

## Step 1: Add `print()` in your code
After each line of code that is related to a value, you could add the function `print()` to view it, in case of any unexpected mistakes. Then download the code to your board.

## Step 2: Connect the board to the computer through the serial port
Now you will need to change the USB connection from the download port to the serial port. 

SwiftIO Feather doesn't have a serial port, but it has a compatible shield which contains a such port. SwiftIO board has two ports: download port and serial port. They might be quite confusing at the beginning.

- Download port allows you to download code to your board. 

- Serial port is for serial communication between your board and computer. Serial communication is commonly used on microcontrollers, however, the computer hardly uses it, so a serial to USB converter is added to the board to allow the data transmission between them. It is an independent part reserved for this use.


## Step 3: Open serial monitor on the IDE

1. Click on the serial monitor button ![serial monitor](img/serialButton.png) in the upper right corner. The Serial window will pop up.

2. Select the **UART Port** for your board. 

    If you are not sure which port is the right one, you can disconnect your board and see which one disppears. And if you can't find the port, close the serial monitor, wait a while, then open it again.

3. Click **Connect**.  

![](img/serialConnect.png)


## Step 4: Find the problem
After successfully connected, press the reset button on your board, the code will run again and the values will be printed out. 

- If there is something wrong when executing the code, the code will be blocked at a certain step, so the following value will not be printed. 
- If the code runs successful but the result is wrong, you need to pay attention to the values: maybe some of them are out of range, or the calculation formula is wrong by accident, and so on.
