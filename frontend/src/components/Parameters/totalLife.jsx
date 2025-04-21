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

const TotalLife = () => {
  const [data, setData] = useState([]);
  const [totalLife, setTotalLife] = useState(0);
  const lastChecked = "18 April 2025, 4:30 PM"; // You can make this dynamic later

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/sample.csv"); // replace with your correct path
        const text = await response.text();
        const parsedData = parseCSV(text);
        setData(parsedData);

        // Set latest RUL value (convert to percentage if needed)
        const lastValue = parsedData[parsedData.length - 1]?.RUL_Hours;
        const lifePercentage = Math.max(0, Math.min(100, (lastValue / 100) * 100)); // normalize for UI
        setTotalLife(lifePercentage.toFixed(0));
      } catch (err) {
        console.error("Error loading CSV:", err);
      }
    };

    fetchData();
  }, []);

  const parseCSV = (text) => {
    const rows = text.trim().split("\n").slice(1); // remove header
    return rows.map((row) => {
      const values = row.split(",");
      return {
        RUL_Hours: parseFloat(values[8]), // assuming it's the 4th column
      };
    });
  };

  const chartData = {
    labels: data.map((_, i) => i + 1),
    datasets: [
      {
        label: "Remaining Useful Life (RUL)",
        data: data.map((d) => d.RUL_Hours),
        fill: false,
        borderColor: "#f59e0b",
        tension: 0.2,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-yellow-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-yellow-700 mb-6">⚙️ Total Vehicle Life</h1>

        <div className="bg-white p-8 rounded-xl shadow-lg space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Current Health</h2>
            <p className={`text-3xl font-bold ${totalLife < 50 ? "text-red-600" : "text-green-600"}`}>
              {totalLife}%
            </p>
            <p className="text-sm text-gray-500">Last checked: {lastChecked}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-yellow-700">What does this mean?</h2>
            <p className="text-gray-700 mt-1">
              This indicates overall vehicle health based on component conditions and usage.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-yellow-700">Recommended Actions</h2>
            {totalLife < 50 ? (
              <p className="text-red-600">⚠️ Service recommended soon.</p>
            ) : (
              <p className="text-green-700">✅ Vehicle health is good.</p>
            )}
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">RUL Over Time</h2>
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

export default TotalLife;
