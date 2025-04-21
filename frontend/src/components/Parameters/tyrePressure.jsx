import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import Navbar from "../dashboard/Navbar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TirePressure = () => {
  const [data, setData] = useState([]);
  const [latestPressure, setLatestPressure] = useState(null);
  const [lastChecked, setLastChecked] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/sample.csv"); // Update path if needed
        const text = await response.text();
        const parsed = parseCSV(text);
        setData(parsed);
        if (parsed.length > 0) {
          setLatestPressure(parsed[parsed.length - 1].Tire_Pressure);
          setLastChecked(new Date().toLocaleString());
        }
      } catch (error) {
        console.error("Error fetching tire pressure data:", error);
      }
    };

    fetchData();
  }, []);

  const parseCSV = (text) => {
    const rows = text.trim().split("\n").slice(1);
    return rows.map((row) => {
      const values = row.split(",");
      return {
        Tire_Pressure: parseFloat(values[6]), // Assuming it's the second column
      };
    });
  };

  const chartData = {
    labels: data.map((_, i) => i + 1),
    datasets: [
      {
        label: "Tire Pressure (psi)",
        data: data.map((item) => item.Tire_Pressure),
        fill: false,
        borderColor: "rgba(54, 162, 235, 1)",
        tension: 0.2,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-yellow-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-yellow-700 mb-6">🚗 Tire Pressure</h1>

        <div className="bg-white p-8 rounded-xl shadow-lg space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Current Pressure</h2>
            <p className={`text-3xl font-bold ${latestPressure < 28 || latestPressure > 35 ? "text-red-600" : "text-green-600"}`}>
              {latestPressure !== null ? `${latestPressure} psi` : "Loading..."}
            </p>
            <p className="text-sm text-gray-500">Last checked: {lastChecked}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-yellow-700">What does this mean?</h2>
            <p className="text-gray-700 mt-1">
              Tire pressure affects fuel efficiency, handling, and safety. Optimal pressure is typically between 30–35 psi.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-yellow-700">Recommended Actions</h2>
            {latestPressure < 28 || latestPressure > 35 ? (
              <p className="text-red-600">⚠️ Adjust tire pressure to recommended levels immediately.</p>
            ) : (
              <p className="text-green-700">✅ Tire pressure is within the optimal range.</p>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold text-yellow-700 mb-2">Tire Pressure Trend</h2>
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

export default TirePressure;
