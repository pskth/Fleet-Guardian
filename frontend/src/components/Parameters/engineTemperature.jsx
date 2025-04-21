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

const EngineTemperature = () => {
  const [data, setData] = useState([]);
  const [engineTemp, setEngineTemp] = useState(null);
  const [lastChecked, setLastChecked] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/sample.csv"); // Ensure this path is correct
        const text = await response.text();
        const parsedData = parseCSV(text);
        setData(parsedData);
        if (parsedData.length > 0) {
          setEngineTemp(parsedData[parsedData.length - 1].Engine_Temperature);
          setLastChecked(new Date().toLocaleString());
        }
      } catch (error) {
        console.error("Error fetching or parsing CSV:", error);
      }
    };

    fetchData();
  }, []);

  const parseCSV = (text) => {
    const rows = text.trim().split("\n").slice(1);
    return rows.map((row) => {
      const values = row.split(",");
      return {
        Engine_Temperature: parseFloat(values[0]),
      };
    });
  };

  const chartData = {
    labels: data.map((_, index) => index + 1),
    datasets: [
      {
        label: "Engine Temperature (°C)",
        data: data.map((item) => item.Engine_Temperature),
        fill: false,
        borderColor: "rgba(255, 99, 132, 1)",
        tension: 0.2,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-yellow-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-yellow-700 mb-6">🌡️ Engine Temperature</h1>

        <div className="bg-white p-8 rounded-xl shadow-lg space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Current Temp</h2>
            <p className={`text-3xl font-bold ${engineTemp > 100 ? "text-red-600" : "text-green-600"}`}>
              {engineTemp !== null ? `${engineTemp}°C` : "Loading..."}
            </p>
            <p className="text-sm text-gray-500">Last checked: {lastChecked}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-yellow-700">What does this mean?</h2>
            <p className="text-gray-700 mt-1">
              The engine temperature is {engineTemp > 100 ? "too high and could be dangerous" : "within a safe range"}.
              Excessive heat can damage internal engine parts.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-yellow-700">Recommended Actions</h2>
            {engineTemp > 100 ? (
              <p className="text-red-600">⚠️ Coolant check advised. Engine is overheating.</p>
            ) : (
              <p className="text-green-700">✅ Temperature is stable and normal.</p>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold text-yellow-700 mb-2">Engine Temperature Over Time</h2>
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

export default EngineTemperature;
