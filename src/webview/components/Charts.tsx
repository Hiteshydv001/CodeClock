import * as React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ChartProps {
  timeLogs: { [file: string]: { time: number; lastUpdated: number } };
}

export const Chart: React.FC<ChartProps> = ({ timeLogs }) => {
  const hasData = Object.keys(timeLogs).length > 0;

  const data: ChartData<'bar'> = {
    labels: hasData ? Object.keys(timeLogs) : ['No Data'],
    datasets: [
      {
        label: 'Time Spent (seconds)',
        data: hasData ? Object.values(timeLogs).map((log) => log.time) : [0],
        backgroundColor: hasData
          ? Object.keys(timeLogs).map((_, index) => {
              const colors = [
                'rgba(99, 102, 241, 0.7)', // Indigo
                'rgba(236, 72, 153, 0.7)', // Pink
                'rgba(34, 197, 94, 0.7)',  // Green
                'rgba(249, 115, 22, 0.7)', // Orange
                'rgba(168, 85, 247, 0.7)', // Purple
              ];
              return colors[index % colors.length];
            })
          : ['rgba(75, 85, 99, 0.5)'], // Gray for "No Data"
        borderColor: hasData
          ? Object.keys(timeLogs).map((_, index) => {
              const borderColors = [
                'rgba(99, 102, 241, 1)',
                'rgba(236, 72, 153, 1)',
                'rgba(34, 197, 94, 1)',
                'rgba(249, 115, 22, 1)',
                'rgba(168, 85, 247, 1)',
              ];
              return borderColors[index % borderColors.length];
            })
          : ['rgba(75, 85, 99, 1)'],
        borderWidth: 2,
        borderRadius: 12,
        hoverBackgroundColor: hasData
          ? Object.keys(timeLogs).map((_, index) => {
              const hoverColors = [
                'rgba(99, 102, 241, 0.9)',
                'rgba(236, 72, 153, 0.9)',
                'rgba(34, 197, 94, 0.9)',
                'rgba(249, 115, 22, 0.9)',
                'rgba(168, 85, 247, 0.9)',
              ];
              return hoverColors[index % hoverColors.length];
            })
          : ['rgba(75, 85, 99, 0.7)'],
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#d4d4d8', // Zinc-300
          font: { size: 14, weight: 'bold', family: "'Inter', sans-serif" },
          padding: 20,
        },
      },
      title: {
        display: true,
        text: 'Time Spent per File 📊',
        color: '#e4e4e7', // Zinc-200
        font: { size: 20, weight: 'bold', family: "'Inter', sans-serif" },
        padding: { top: 10, bottom: 20 },
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)', // Gray-900
        titleColor: '#fff',
        bodyColor: '#d4d4d8', // Zinc-300
        bodyFont: { size: 14, family: "'Inter', sans-serif" },
        cornerRadius: 8,
        padding: 10,
        boxPadding: 5,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#a1a1aa', // Zinc-400
          font: { size: 12, family: "'Inter', sans-serif" },
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#a1a1aa',
          font: { size: 12, family: "'Inter', sans-serif" },
          stepSize: 10,
        },
        grid: {
          color: 'rgba(161, 161, 170, 0.2)', // Zinc-400 with opacity
          tickBorderDashOffset: 5,
        },
        title: {
          display: true,
          text: 'Seconds',
          color: '#e4e4e7',
          font: { size: 14, family: "'Inter', sans-serif" },
        },
      },
    },
    animation: {
      duration: 1200,
      easing: 'easeOutQuart',
    },
  };

  return (
    <div className="relative mt-8 p-6 rounded-3xl bg-gray-900/70 backdrop-blur-2xl border border-gray-700/30 shadow-2xl shadow-purple-500/10 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl h-[400px]">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-xl opacity-60"></div>
      <Bar data={data} options={options} />
      {!hasData && (
        <div className="absolute inset-0 flex items-center justify-center text-zinc-400 text-lg font-medium z-10">
          No data yet—start coding! 🚀
        </div>
      )}
    </div>
  );
};