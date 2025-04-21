// import React from "react";
import { useAuth } from "../auth-context"; // Import the auth context
import Navbar from "../components/dashboard/Navbar";
import UserGreeting from "../components/dashboard/UserGreeting";
import VehicleInfo from "../components/dashboard/VehicleInfo";
import NotificationsLink from "../components/dashboard/NotificationsLink";
import RecentStats from "../components/dashboard/RecentStats";

const mockStats = [
  {
    label: "Tyre Pressure (Front Left)",
    value: "32 PSI",
    timestamp: "2025-04-18 08:45 AM",
  },
  {
    label: "Tyre Pressure (Rear Right)",
    value: "30 PSI",
    timestamp: "2025-04-18 08:45 AM",
  },
];

const Dashboard = () => {
  const { currentUser } = useAuth(); // Get current user from auth context
  const vehicleName = "Tata";
  const vehicleRegNumber = "ABC1234";
  const tyrePressure = ["32 psi", "30 psi"];

  // Get firstName from currentUser if it exists, otherwise use "Guest"
  const userName = currentUser?.firstName || "Guest";

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <UserGreeting userName={userName} />
        <VehicleInfo
          vehicleName={vehicleName}
          vehicleRegNumber={vehicleRegNumber}
        />
        <RecentStats stats={mockStats} />
        <NotificationsLink />
      </div>
    </div>
  );
};

export default Dashboard;