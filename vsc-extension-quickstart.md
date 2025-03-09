# Code Clock Track - Quick Start Guide

Welcome to **Code Clock Track**, a Visual Studio Code extension that helps you track your coding time with a modern interface! This guide will show you how to use its features to monitor your productivity.

## How to Use It
Follow these steps to start tracking your coding time with **Code Clock Track**.

### Step 1: Launch the Timer Widget and Chart
1. **Open the Command Palette:**
   - Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac) to open the Command Palette.
2. **Run the Command:**
   - Type `Show Code Time Tracker` and select it from the dropdown.
   - A webview panel will open to the right of your editor, displaying the **Timer Widget** and **Chart**.

#### **The Timer Widget shows:**
- **Total Time:** The cumulative time you’ve spent coding since tracking started.
- **Active File:** The name of the file currently open in your editor.
- **Pause/Resume Buttons:** Control tracking manually.

#### **The Chart displays:**
- A bar chart of time spent on each file you’ve edited.

---

### Step 2: Start Coding and Track Time
1. **Open a File:**
   - Open any file in your VS Code editor (e.g., `example.ts` or `script.js`).
2. **Edit and Save:**
   - Make changes to the file and save it (`Ctrl+S` or `Cmd+S`).
   - **Code Clock Track** automatically logs the time you spend editing files.
   - The **Total Time** in the Timer Widget will update every second as you work.
   - The **Active File** will reflect the file you’re currently editing.
   - The **Chart** will update to show the time spent on each file (in seconds).

---

### Step 3: Use the Pause/Resume Feature
1. **Pause Tracking:**
   - If you need to take a break, click the **Pause** button in the Timer Widget.
   - The button will gray out, indicating tracking is paused, and time logging will stop.
2. **Resume Tracking:**
   - When you’re ready to continue, click the **Resume** button.
   - The button will gray out, and tracking will resume, logging time again.

---

### Step 4: Monitor the Status Bar Clock
- Look at the bottom-right corner of VS Code to see the **Status Bar Clock**.
- It displays the time elapsed since the extension was activated (e.g., `Code Time: 0h 5m 23s`).
- The clock updates every second, providing a quick glance at your session duration.
- Hover over the clock to see a tooltip: `Total coding time since extension activation.`

---

### Step 5: Analyze Your Productivity
1. **Review Total Time:**
   - The Timer Widget’s **Total Time** shows your overall coding session duration.
2. **Inspect Per-File Time:**
   - Scroll down to the **Chart** in the webview panel.
   - Each bar represents a file you’ve edited, with the height indicating time spent (in seconds).
   - Hover over a bar to see detailed information (e.g., file name and exact time).

---

## Example Scenario
1. Open a project in VS Code.
2. Run `Show Code Time Tracker` to launch the webview.
3. Open `script.js`, edit some code, and save. Notice the **Total Time** increment and the **Active File** update to `script.js`.
4. Open `styles.css`, make changes, and save. The **Chart** now shows bars for both `script.js` and `styles.css`.
5. Pause tracking during a break, then resume when you return.
6. Check the **Status Bar Clock** to see how long your session has been running.

---

### 🎯 **Stay Productive with Code Clock Track!**
