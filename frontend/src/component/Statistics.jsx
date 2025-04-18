import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export const Statistics = () => {
  const fraudResult = localStorage.getItem("fraudResult");
  const fraudProbability = parseFloat(localStorage.getItem("fraudProbability"));

  // Calculate the non-fraud probability
  const nonFraudProbability = 100 - fraudProbability;

  // Prepare chart data based on fraud result
  const fraudData = {
    labels: ["Fraud", "No Fraud"],
    datasets: [
      {
        label: "Fraud Check Results",
        data: [fraudProbability, nonFraudProbability], // Use the actual fraud and non-fraud probabilities
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)", // Fraud color
          "rgba(75, 192, 192, 0.6)", // No Fraud color
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)", // Fraud border color
          "rgba(75, 192, 192, 1)", // No Fraud border color
        ],
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Fraud vs Non-Fraud (Based on Probability)",
        font: {
          size: 18,
          weight: "bold",
        },
      },
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Fraud Probability Breakdown",
        font: {
          size: 18,
          weight: "bold",
        },
      },
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-8">
      <h2 className="text-3xl font-semibold text-blue-900 text-center mb-6">Fraud Detection Statistics</h2>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-medium text-gray-700">Fraud Probability Overview</h3>
        <p className="text-xl font-semibold text-gray-600">Fraud Probability: {fraudProbability}%</p>
      </div>

      {/* Bar Chart for Fraud vs Non-Fraud */}
      <div className="mb-8 p-6 bg-gray-50 rounded-lg shadow-inner">
        <h4 className="text-xl font-semibold mb-4 text-blue-700">Fraud vs Non-Fraud</h4>
        <Bar data={fraudData} options={barOptions} />
      </div>

      {/* Pie Chart for Fraud Probability Breakdown */}
      <div className="p-6 bg-gray-50 rounded-lg shadow-inner">
        <h4 className="text-xl font-semibold mb-4 text-blue-700">Fraud Probability Breakdown</h4>
        <Pie data={fraudData} options={pieOptions} />
      </div>
    </div>
  );
};
