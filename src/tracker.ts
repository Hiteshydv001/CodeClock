import * as vscode from 'vscode';
import { Storage } from './storage';

export class TimeTracker {
  private storage: Storage;
  private activeFile: string | undefined;
  private lastActivity: number = Date.now();
  private isTracking: boolean = true;
  private intervalId: NodeJS.Timeout | undefined;

  constructor(storage: Storage) {
    this.storage = storage;
  }

  startTracking() {
    vscode.window.onDidChangeActiveTextEditor((editor) => {
      if (editor) {
        this.activeFile = editor.document.fileName;
        this.storage.logTime(this.activeFile, Date.now());
      }
    });

    vscode.workspace.onDidChangeTextDocument(() => {
      this.lastActivity = Date.now();
      if (this.activeFile && this.isTracking) {
        this.storage.logTime(this.activeFile, Date.now());
      }
    });

    this.intervalId = setInterval(() => {
      const now = Date.now();
      if (now - this.lastActivity > 5 * 60 * 1000) { // 5 minutes
        this.isTracking = false;
      } else if (!this.isTracking) {
        this.isTracking = true;
      }
    }, 1000);
  }

  getStats() {
    return this.storage.getStats();
  }

  pauseTracking() {
    this.isTracking = false;
  }

  resumeTracking() {
    this.isTracking = true;
  }
}