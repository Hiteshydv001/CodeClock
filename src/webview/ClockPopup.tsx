import * as React from 'react';
import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

const ClockPopup: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  // Calculate rotation for clock hands
  const hourDeg = (hours * 30) + (minutes * 0.5); // 360deg / 12 hours + minutes offset
  const minuteDeg = minutes * 6; // 360deg / 60 minutes
  const secondDeg = seconds * 6; // 360deg / 60 seconds

  // Format digital time and date
  const digitalTime = time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
  const dateStr = time.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }).toUpperCase();

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-gradient-to-b from-gray-900 to-gray-800 p-6">
      {/* Analog Clock */}
      <div className="relative w-48 h-48 rounded-full bg-gray-900 shadow-[0_0_20px_rgba(147,51,234,0.5)] flex items-center justify-center">
        {/* Clock Face */}
        <div className="absolute w-full h-full rounded-full border-4 border-gray-700" />
        {/* Hour Markers */}
        {Array.from({ length: 12 }).map((_, i) => {
          const deg = i * 30;
          return (
            <div
              key={i}
              className="absolute w-1 h-4 bg-gray-500"
              style={{
                transform: `rotate(${deg}deg) translateY(-80px)`,
                transformOrigin: 'bottom center',
              }}
            />
          );
        })}
        {/* Hour Hand */}
        <div
          className="absolute w-1 h-16 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-full"
          style={{
            transform: `rotate(${hourDeg}deg) translateY(-32px)`,
            transformOrigin: 'bottom center',
          }}
        />
        {/* Minute Hand */}
        <div
          className="absolute w-1 h-20 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-full"
          style={{
            transform: `rotate(${minuteDeg}deg) translateY(-40px)`,
            transformOrigin: 'bottom center',
          }}
        />
        {/* Second Hand */}
        <div
          className="absolute w-0.5 h-24 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-full"
          style={{
            transform: `rotate(${secondDeg}deg) translateY(-48px)`,
            transformOrigin: 'bottom center',
          }}
        />
        {/* Center Dot */}
        <div className="absolute w-4 h-4 bg-gray-500 rounded-full" />
      </div>
      {/* Digital Time */}
      <div className="mt-6 text-4xl font-bold text-white">{digitalTime}</div>
      {/* Date */}
      <div className="mt-2 text-sm font-medium text-gray-400">{dateStr}</div>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<ClockPopup />);