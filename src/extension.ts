import * as vscode from 'vscode';
import { TimeTracker } from './tracker';
import { Storage } from './storage';
import { resolve } from 'path';

// Define the message interface
interface TimeStats {
  [file: string]: { time: number; lastUpdated: number };
}

interface WebviewMessage {
  command: 'getStats' | 'pause' | 'resume' | 'updateStats';
  totalTime?: number;
  activeFile?: string;
  timeLogs?: TimeStats;
}

export function activate(context: vscode.ExtensionContext) {
  console.log('Code Time Tracker is activating!');
  const storage = new Storage(context.globalState);
  const tracker = new TimeTracker(storage);

  // Status Bar Clock
  const statusBarClock = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  statusBarClock.text = 'Code Time: 0h 0m 0s';
  statusBarClock.tooltip = 'Total coding time since extension activation';
  statusBarClock.show();
  context.subscriptions.push(statusBarClock);

  let statusBarTime = 0;
  const updateStatusBarClock = () => {
    statusBarTime++;
    const hrs = Math.floor(statusBarTime / 3600);
    const mins = Math.floor((statusBarTime % 3600) / 60);
    const secs = statusBarTime % 60;
    statusBarClock.text = `Code Time: ${hrs}h ${mins}m ${secs}s`;
  };
  const statusBarInterval = setInterval(updateStatusBarClock, 1000);
  context.subscriptions.push({ dispose: () => clearInterval(statusBarInterval) });

  // Webview Command (TimerWidget and Chart)
  const showWidgetCommand = vscode.commands.registerCommand('code-time-tracker.showWidget', () => {
    const panel = vscode.window.createWebviewPanel(
      'codeTimeTracker',
      'Code Time Tracker',
      vscode.ViewColumn.Beside,
      {
        enableScripts: true,
        localResourceRoots: [
          vscode.Uri.file(resolve(context.extensionPath, 'dist')),
          vscode.Uri.file(resolve(context.extensionPath, 'src/webview')),
        ],
      }
    );

    const scriptUri = panel.webview.asWebviewUri(
      vscode.Uri.file(resolve(context.extensionPath, 'dist', 'webview.js'))
    );
    const tailwindUri = panel.webview.asWebviewUri(
      vscode.Uri.file(resolve(context.extensionPath, 'src/webview', 'tailwind.css'))
    );

    panel.webview.html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="${tailwindUri}">
        <style>
          body { margin: 0; padding: 0; background-color: #1e293b; }
          #root { max-width: 600px; margin: 0 auto; padding: 1rem; }
        </style>
      </head>
      <body>
        <div id="root"></div>
        <script type="module" src="${scriptUri}"></script>
      </body>
      </html>
    `;

    const updateStats = () => {
      const stats: TimeStats = tracker.getStats();
      let totalTime = 0;
      for (const file in stats) {
        totalTime += stats[file].time;
      }
      panel.webview.postMessage({
        command: 'updateStats',
        totalTime,
        activeFile: vscode.window.activeTextEditor?.document.fileName || 'None',
        timeLogs: stats,
      });
    };

    updateStats();
    const interval = setInterval(updateStats, 1000);

    panel.webview.onDidReceiveMessage((message: WebviewMessage) => {
      console.log('Received message:', message);
      switch (message.command) {
        case 'pause':
          tracker.pauseTracking();
          break;
        case 'resume':
          tracker.resumeTracking();
          break;
        case 'getStats':
          updateStats();
          break;
      }
    });

    panel.onDidDispose(() => clearInterval(interval));
    context.subscriptions.push(panel);
  });

  context.subscriptions.push(showWidgetCommand);
  tracker.startTracking();
}

export function deactivate() {}