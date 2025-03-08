import * as vscode from 'vscode';

interface TimeLog {
  [file: string]: { time: number; lastUpdated: number };
}

export class Storage {
  private state: vscode.Memento;

  constructor(state: vscode.Memento) {
    this.state = state;
  }

  logTime(file: string, timestamp: number) {
    const logs: TimeLog = this.state.get('timeLogs', {});
    if (!logs[file]) {
      logs[file] = { time: 0, lastUpdated: timestamp };
    }
    const timeDiff = (timestamp - logs[file].lastUpdated) / 1000; // seconds
    logs[file].time += timeDiff;
    logs[file].lastUpdated = timestamp;
    this.state.update('timeLogs', logs);
  }

  getStats() {
    return this.state.get('timeLogs', {});
  }
}