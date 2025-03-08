import * as vscode from 'vscode';
import { TimeTracker } from './tracker';
import { Storage } from './storage';
import { resolve } from 'path';

// Define the message interface
interface TimeStats {
  [file: string]: { time: number; lastUpdated: number };
}

interface WebviewMessage {
  command: 'getStats' | 'pause' | 'resume';
  totalTime?: number;
  activeFile?: string;
  timeLogs?: TimeStats;
}

export function activate(context: vscode.ExtensionContext) {
  const storage = new Storage(context.globalState);
  const tracker = new TimeTracker(storage);

  let disposable = vscode.commands.registerCommand('code-time-tracker.showWidget', () => {
    const panel = vscode.window.createWebviewPanel(
      'codeTimeTracker',
      'Code Time Tracker',
      vscode.ViewColumn.Beside,
      {
        enableScripts: true,
        localResourceRoots: [vscode.Uri.file(resolve(context.extensionPath, 'dist'))],
      }
    );

    const scriptUri = panel.webview.asWebviewUri(
      vscode.Uri.file(resolve(context.extensionPath, 'dist', 'webview.js'))
    );

    panel.webview.html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>
        <div id="root"></div>
        <script type="module" src="${scriptUri}"></script>
      </body>
      </html>
    `;

    // Compute total coding time
    const stats: TimeStats = tracker.getStats();
    let totalTime = 0;
    for (const file in stats) {
      totalTime += stats[file].time;
    }

    // Send initial stats to the webview
    panel.webview.postMessage({
      command: 'updateStats',
      totalTime,
      activeFile: vscode.window.activeTextEditor?.document.fileName,
      timeLogs: stats,
    });

    // Handle messages from the webview
    panel.webview.onDidReceiveMessage((message: WebviewMessage) => {
      switch (message.command) {
        case 'pause':
          tracker.pauseTracking();
          break;
        case 'resume':
          tracker.resumeTracking();
          break;
        case 'getStats':
          const updatedStats: TimeStats = tracker.getStats();
          let updatedTotalTime = 0;
          for (const file in updatedStats) {
            updatedTotalTime += updatedStats[file].time;
          }

          panel.webview.postMessage({
            command: 'updateStats',
            totalTime: updatedTotalTime,
            activeFile: vscode.window.activeTextEditor?.document.fileName,
            timeLogs: updatedStats,
          });
          break;
      }
    });

    context.subscriptions.push(panel);
  });

  context.subscriptions.push(disposable);
  tracker.startTracking();
}

export function deactivate() {}
