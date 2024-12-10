import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register the components you are using
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Graph({ title }) {
  const data = {
    labels: ["January", "February", "March", "April"],
    datasets: [
      {
        label: "Sales",
        data: [4000, 3000, 5000, 6000],
        borderColor: "#42A5F5",
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,  // Disable aspect ratio to control chart size
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Sales (in dollars)',
        },
      },
    },
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: 10,
        bottom: 10,
      },
    },
  };

  return (
    <div className="graph w-full h-[400px]" style={{ height: "400px", width: "750px" }}> {/* Control the height and width */}
      <h4>{title}</h4>
      <Line data={data} options={options} />
    </div>
  );
}

export default Graph;