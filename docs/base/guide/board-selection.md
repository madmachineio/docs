---
id: board-selection
title: Board selection
description: How to choose or change the board used for your project
slug: /board-selection
---

# Board selection

## Select when creating a new project

When you create a new project, you could choose the board you would like to deal with.
Open the MadMachine IDE, click Create a new MadMachine project.

![Create a project](img/create.png)

Name the project. Select the **Board Type**. In the dropdown menu, you could find two boards, and choose the one you are using. 

![project info](img/projectInfo.png)

![board type](img/boardType.png)

After creating a project, you could notice the message on the status bar that indicates the board.

![board info in status bar](img/statusBar.png)

## Change the board for an existing project

You want to change the board in some existing projects? OK, no problem.

In the file `Package.swift`, change the board type and click the save button. For example, you will change board from SwiftIOFeather to SwiftIOBoard.

![](img/boardChange1.png)

![](img/boardChange2.png)

After the file is saved, the message in the status bar will change accordingly.

![](img/boardChange3.png)
