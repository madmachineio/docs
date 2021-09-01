---
id: faq
title: FAQ
description: FAQ
---

# FAQ


## Can't install the IDE on Win10

Windows may not recognize the IDE and there might be some problems when you install it. Windows Defender will pop up with a warning message.

![](img/windows-protected.png)

First, click on the "**More info"**.

Then more info will appear. Click "**Run anyway**".

## Can't open IDE on Mac

When you want to open the IDE, a new window appears:

![](img/mac1.png)

👇 Here comes the solution:

* click **OK**.
* select  / **System Preferences**
* open the **Security & Privacy** Preferences pane
* select the **General** tab

![](img/mac2.png)

* click the 🔒 icon
* enter your **Password**
* click **Unlock**

![](img/mac3.png)


* click **Open Anyway**

![](img/mac4.png)


* click **Open**

![](img/mac5.png)


Now the IDE can run normally.

## Can't create a new project on Windows

**Reason:** The IDE need to copy `MadMachine\Examples` and `MadMachine\Library` to your `Documents` directory when running for the first time.

**Solution:** Please make sure to run the IDE as **Administrator** for the first time!

## IDE can't find the USB drive

This is due to the security feature of macOS.

The latest versions of macOS introduce new security control. There are more requirements for application security.

While our board needs to manage the files on the USB driver. So you need to enable **Full Disk Access** for IDE.

* Select **System Preferences** in  menu.
* Open the **Security & Privacy** Preferences pane.
* Select the **Privacy** tab.
* Click **Full Disk Access** in the left column.

![](img/fullDisk1.png)

* Click the 🔒 icon.
* Enter your **Password**.
* Click **Unlock**.

![](img/fullDisk2.png)

* Click the icon **+**.

![](img/fullDisk3.png)

* Click **Application** in Finder.
* Find the **MadMachine**.
* Click **Open**.

![](img/fullDisk4.png)

* Click **Quit Now**.

![](img/fullDisk5.png)

Now you can try to download your project again.

## SwiftIO board reset repeatedly

There is a maximum current limit for the USB port of your devices.

While some modules which are connected to the board may require a larger one.

Thus the board reset over and over again.

You can try these ways:

1. Connect the board to the USB port that can output larger power.‌

2. Connect both download port and serial port on the board to USB ports

3. Use a power bank to supply the board

## USB driver can't be mounted

This problem may be caused by these reasons

1. Bad quality USB cable, there are so many bad quality USB cables in the market. Some of them can only charge your device without communication feature : \(
2. Incompatible MicroSD card
3. Incompatible USB hub or incompatible USB-C to USB-A adapter
4. There is a known issue with USB compatibility on Mac. There are already a lot of discussions about it on [Reddit](https://www.reddit.com/r/mac/comments/gp5b1z/usb_20_issues_on_new_macbook_pro_13_2020/), [apple](https://discussions.apple.com/thread/251356598).

To solve problems 1 and 2, we offer a high-quality USB cable and a Kingston microSD card along with our board. But we still got feedback that the USB drive did not appear. In this situation, there is a temporary solution: use a USB card reader to copy the `swiftio.bin`. At the same time, we’ll continue to improve the compatibility of the firmware.
