import * as React from 'react';
import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { TimerWidget } from './components/TimerWidget';
import { Chart } from './components/Charts';

declare const acquireVsCodeApi: () => any;

const App: React.FC = () => {
  const [totalTime, setTotalTime] = useState(0);
  const [activeFile, setActiveFile] = useState<string | undefined>(undefined);
  const [timeLogs, setTimeLogs] = useState<{ [file: string]: { time: number; lastUpdated: number } }>({});

  useEffect(() => {
    const vscode = acquireVsCodeApi();
    window.addEventListener('message', (event) => {
      const message = event.data;
      switch (message.command) {
        case 'updateStats':
          setTotalTime(message.totalTime);
          setActiveFile(message.activeFile);
          setTimeLogs(message.timeLogs);
          break;
      }
    });

    vscode.postMessage({ command: 'getStats' });
    const interval = setInterval(() => {
      vscode.postMessage({ command: 'getStats' });
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  const handlePause = () => {
    const vscode = acquireVsCodeApi();
    vscode.postMessage({ command: 'pause' });
  };

  const handleResume = () => {
    const vscode = acquireVsCodeApi();
    vscode.postMessage({ command: 'resume' });
  };

  return (
    <div className="p-4">
      <TimerWidget
        totalTime={totalTime}
        activeFile={activeFile}
        onPause={handlePause}
        onResume={handleResume}
      />
      <Chart timeLogs={timeLogs} />
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);