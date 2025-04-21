import React from "react";

const RecentStats = ({ stats }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Statistics</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="border p-4 rounded-xl">
            <p className="text-gray-600 font-medium">{stat.label}</p>
            <p className="text-yellow-600 text-lg font-bold">{stat.value}</p>
            <p className="text-sm text-gray-500">Recorded at: {stat.timestamp}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentStats;
