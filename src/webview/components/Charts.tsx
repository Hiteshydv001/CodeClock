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
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Time Spent per File',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Seconds',
        },
      },
    },
  };

  return (
    <div className="mt-4 p-4 border border-gray-300 rounded-lg bg-white">
      <Bar data={data} options={options} />
    </div>
  );
};