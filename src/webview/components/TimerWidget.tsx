import * as React from 'react';
import { useState } from 'react';

interface TimerWidgetProps {
  totalTime: number;
  activeFile: string | undefined;
  onPause: () => void;
  onResume: () => void;
}

export const TimerWidget: React.FC<TimerWidgetProps> = ({
  totalTime,
  activeFile,
  onPause,
  onResume,
}) => {
  const [isPaused, setIsPaused] = useState(false);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hrs}h ${mins}m ${secs}s`;
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-md bg-white">
      <h2 className="text-lg font-semibold mb-2">Code Time Tracker</h2>
      <p className="text-sm">
        Total Time: <span className="font-bold">{formatTime(totalTime)}</span>
      </p>
      <p className="text-sm">
        Active File: <span className="font-bold">{activeFile || 'None'}</span>
      </p>
      <div className="mt-4 flex gap-2">
        <button
          className={`px-4 py-2 rounded ${isPaused ? 'bg-gray-400' : 'bg-red-500'} text-white`}
          onClick={() => {
            setIsPaused(true);
            onPause();
          }}
          disabled={isPaused}
        >
          Pause
        </button>
        <button
          className={`px-4 py-2 rounded ${!isPaused ? 'bg-gray-400' : 'bg-green-500'} text-white`}
          onClick={() => {
            setIsPaused(false);
            onResume();
          }}
          disabled={!isPaused}
        >
          Resume
        </button>
      </div>
    </div>
  );
};