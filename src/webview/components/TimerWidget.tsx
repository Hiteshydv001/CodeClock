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
    return `${hrs.toString().padStart(2, '0')}h ${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
  };

  return (
    <motion.div
      className="timer-card"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: 'easeOutBack' }}
    >
      <div className="timer-widget">
        <h2 className="timer-title">Code Clock Track ⏳</h2>

        <motion.div
          className="timer-info"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <p className="timer-total-time">
            Total Time: <span>{formatTime(totalTime)}</span>
          </p>
          <p className="timer-active-file">
            Active File: <span>{activeFile || 'None'}</span>
          </p>
        </motion.div>

        <div className="timer-buttons">
          <motion.button
            className={`timer-button pause-button ${isPaused ? 'disabled' : ''}`}
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255, 77, 77, 0.7)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsPaused(true);
              onPause();
            }}
            disabled={isPaused}
          >
            <span className="button-text">Pause ⏸️</span>
            {!isPaused && <div className="button-glow"></div>}
          </motion.button>

          <motion.button
            className={`timer-button resume-button ${!isPaused ? 'disabled' : ''}`}
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(77, 255, 166, 0.7)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsPaused(false);
              onResume();
            }}
            disabled={!isPaused}
          >
            <span className="button-text">Resume ▶️</span>
            {isPaused && <div className="button-glow"></div>}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Inline CSS for Webview Compatibility
const styles = `
  /* Card Container */
  .timer-card {
    position: relative;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 8px;
    background: linear-gradient(135deg, #1e1e2f 0%, #2a2a3d 100%);
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 10px rgba(255, 255, 255, 0.05);
    overflow: hidden;
  }

  /* Inner Widget Container */
  .timer-widget {
    position: relative;
    padding: 32px;
    background: rgba(30, 30, 47, 0.8);
    backdrop-filter: blur(16px);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    z-index: 1;
  }

  /* Neon Glow Overlay */
  .timer-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 24px;
    background: linear-gradient(90deg, #6366f1, #ec4899, #22c55e);
    opacity: 0.3;
    filter: blur(20px);
    z-index: 0;
  }

  /* Title */
  .timer-title {
    font-size: 28px;
    font-weight: 800;
    text-align: center;
    background: linear-gradient(90deg, #a5b4fc, #f9a8d4);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    margin-bottom: 24px;
    letter-spacing: 1px;
  }

  /* Info Section */
  .timer-info {
    text-align: center;
    color: #e5e7eb;
  }

  .timer-total-time {
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 12px;
  }

  .timer-total-time span {
    background: linear-gradient(90deg, #a5b4fc, #f9a8d4);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .timer-active-file {
    font-size: 16px;
    color: #d1d5db;
  }

  .timer-active-file span {
    font-weight: 500;
    color: #a5b4fc;
  }

  /* Buttons Container */
  .timer-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    justify-content: center;
    margin-top: 32px;
  }

  /* Button Styles */
  .timer-button {
    position: relative;
    padding: 12px 24px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    overflow: hidden;
  }

  .pause-button:not(.disabled) {
    background: linear-gradient(90deg, #ff4d4d, #dc2626);
    color: #fff;
  }

  .resume-button:not(.disabled) {
    background: linear-gradient(90deg, #4dffaa, #22c55e);
    color: #fff;
  }

  .timer-button.disabled {
    background: #4b5563;
    color: #9ca3af;
    cursor: not-allowed;
  }

  .button-text {
    position: relative;
    z-index: 1;
  }

  .button-glow {
    position: absolute;
    inset: 0;
    background: inherit;
    opacity: 0.3;
    animation: pulseGlow 2s ease-in-out infinite;
  }

  @keyframes pulseGlow {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.6; }
  }
`;

const styleSheet = new CSSStyleSheet();
styleSheet.replaceSync(styles);
document.adoptedStyleSheets = [styleSheet];