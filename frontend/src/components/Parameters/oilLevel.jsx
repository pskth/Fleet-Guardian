import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../dashboard/Navbar";
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const OilLevel = () => {
  const [data, setData] = useState([]);
  const [oilStatus, setOilStatus] = useState("Loading...");
  const lastChecked = "18 April 2025, 4:30 PM"; // Can be dynamic later

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/sample.csv"); // <-- update with your correct path
        const text = await response.text();
        const parsed = parseCSV(text);
        setData(parsed);

        const latestOilValue = parsed[parsed.length - 1]?.oil_level;
        setOilStatus(latestOilValue < 30 ? "Low" : "Good");
      } catch (err) {
        console.error("Failed to load oil data:", err);
        setOilStatus("Error");
      }
    };

    fetchData();
  }, []);

  const parseCSV = (csvText) => {
    const lines = csvText.trim().split("\n").slice(1); // remove header
    return lines.map((line) => {
      const values = line.split(",");
      return {
        oil_level: parseFloat(values[3]), // Assuming oil_level is 3rd column (index 2)
      };
    });
  };

  const chartData = {
    labels: data.map((_, i) => i + 1),
    datasets: [
      {
        label: "Oil Level",
        data: data.map((d) => d.oil_level),
        fill: false,
        borderColor: "#34d399", // emerald-400
        backgroundColor: "#34d399",
        tension: 0.2,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-yellow-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-yellow-700 mb-6">🛢️ Oil Level Details</h1>

        <div className="bg-white p-8 rounded-xl shadow-lg space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Current Status</h2>
            <p className={`text-3xl font-bold ${oilStatus === "Low" ? "text-red-600" : "text-green-600"}`}>
              {oilStatus}
            </p>
            <p className="text-sm text-gray-500">Last checked: {lastChecked}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-yellow-700">What does this mean?</h2>
            <p className="text-gray-700 mt-1">
              Oil keeps engine parts lubricated, cool, and clean. A good oil level means your engine is protected and running efficiently.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-yellow-700">Recommended Actions</h2>
            {oilStatus === "Low" ? (
              <p className="text-red-600">⚠️ Refill the engine oil immediately to prevent damage.</p>
            ) : (
              <p className="text-green-700">✅ No action needed. You're good to go!</p>
            )}
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Oil Level Over Time</h2>
            <Line data={chartData} />
          </div>

          <Link
            to="/MoreStatistics"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-xl mt-6"
          >
            ← Back to More Statistics
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OilLevel;
