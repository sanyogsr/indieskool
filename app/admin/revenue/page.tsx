"use client";
import LogoHeader from "@/components/LogoHeader";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
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

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Define the type for each revenue data point
interface RevenueData {
  date: string;
  amount: number;
}

const RevenuePage = () => {
  const [revenue, setRevenue] = useState<number>(0);
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]); // Define the type for revenueData
  const [loading, setLoading] = useState<boolean>(true); // Specify boolean type for loading state
  const [error, setError] = useState<string>(""); // Specify string type for error state

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const response = await axios.get<{
          totalAmount: number;
          revenueHistory: RevenueData[];
        }>("/api/revenue");

        setRevenue(response.data.totalAmount / 100); // Stripe uses cents, so divide by 100
        setRevenueData(response.data.revenueHistory || []); // Ensure it's an array
      } catch (err) {
        setError("Failed to fetch revenue");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRevenue();
  }, []);

  // Ensure revenueData is available and not undefined before mapping
  const chartData = {
    labels: revenueData.map((data) => data.date), // X-axis: Date
    datasets: [
      {
        label: "Revenue",
        data: revenueData.map((data) => data.amount / 100), // Y-axis: Revenue (in dollars)
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.4, // Smooth the line
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const, // Ensure the position is typed correctly
        labels: {
          color: "white", // Adjust legend text color to white
        },
      },
      tooltip: {
        callbacks: {
          label: (context: { raw: number }) => `$${context.raw.toFixed(2)}`, // Format tooltip labels
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white", // X-axis label color
        },
      },
      y: {
        ticks: {
          color: "white", // Y-axis label color
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-4 sm:ml-64 bg-[#212121] h-screen">
      <LogoHeader admin={true} />
      <div className="w-full bg-[#212121]">
        <div>
          <h1 className="text-white text-2xl">Revenue Page</h1>

          {loading ? (
            <div className="flex items-center justify-center h-screen">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="mt-4">
              <h2 className="text-white text-xl mb-4">
                Total Revenue: ${revenue.toFixed(2)}
              </h2>

              <div className="bg-[#333] p-6 rounded-lg">
                {/* Chart goes here */}
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RevenuePage;
