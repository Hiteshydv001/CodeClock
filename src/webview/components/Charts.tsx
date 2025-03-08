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
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ChartProps {
  timeLogs: { [file: string]: { time: number; lastUpdated: number } };
}

export const Chart: React.FC<ChartProps> = ({ timeLogs }) => {
  const data = {
    labels: Object.keys(timeLogs),
    datasets: [
      {
        label: 'Time Spent (seconds)',
        data: Object.values(timeLogs).map((log) => log.time),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#4b5563', // Tailwind Gray-700
          font: { size: 14 },
        },
      },
      title: {
        display: true,
        text: 'Time Spent per File ⏳',
        font: { size: 18 },
        color: '#374151', // Tailwind Gray-800
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#ddd',
        bodyFont: { size: 14 },
        cornerRadius: 6,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#6b7280', // Tailwind Gray-600
          font: { size: 12 },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#6b7280',
          font: { size: 12 },
          stepSize: 10,
        },
        grid: { tickBorderDashOffset: 5 },
        title: {
          display: true,
          text: 'Seconds',
          color: '#374151',
          font: { size: 14 },
        },
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart',
    },
  };

  return (
    <div className="mt-6 p-6 rounded-2xl shadow-lg bg-white/40 backdrop-blur-lg border border-gray-200 dark:bg-gray-900/40 dark:border-gray-700 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl h-[400px]">
      <Bar data={data} options={options} />
    </div>
  );
};
