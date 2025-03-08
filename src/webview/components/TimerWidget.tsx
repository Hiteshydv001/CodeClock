import * as React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';

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
    <div className="relative flex flex-col items-center p-6 rounded-2xl shadow-xl bg-white/40 backdrop-blur-lg border border-gray-200 dark:bg-gray-900/40 dark:border-gray-700 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 tracking-wide text-center">
        Code Time Tracker ⏳
      </h2>

      <motion.div
        className="mt-4 text-center text-gray-700 dark:text-gray-300 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-lg">
          Total Time: <span className="font-bold text-indigo-600">{formatTime(totalTime)}</span>
        </p>
        <p className="text-sm mt-1 truncate w-full">
          Active File: <span className="font-semibold text-blue-500">{activeFile || 'None'}</span>
        </p>
      </motion.div>

      <div className="mt-6 flex flex-wrap gap-3 justify-center w-full">
        <motion.button
          className={`px-6 py-3 text-sm sm:text-base rounded-full shadow-md transition-all duration-300 ${
            isPaused
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-red-500 hover:bg-red-600 text-white'
          }`}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsPaused(true);
            onPause();
          }}
          disabled={isPaused}
        >
          Pause ⏸️
        </motion.button>

        <motion.button
          className={`px-6 py-3 text-sm sm:text-base rounded-full shadow-md transition-all duration-300 ${
            !isPaused
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsPaused(false);
            onResume();
          }}
          disabled={!isPaused}
        >
          Resume ▶️
        </motion.button>
      </div>
    </div>
  );
};
