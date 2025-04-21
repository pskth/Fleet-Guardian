import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import { AuthProvider } from "./auth-context";
import AuthForm from "./components/auth/AuthForm";
import MoreStatistics from "./pages/MoreStatistics";
import Dashboard from "./pages/Dashboard";
import AboutUs from "./pages/aboutUs";
import Profile from "./pages/Profile";

// Parameter detail components
import TyrePressure from "./components/Parameters/tyrePressure";
import TotalLife from "./components/Parameters/totalLife";
import EngineTemperature from "./components/Parameters/engineTemperature";
import OilLevel from "./components/Parameters/oilLevel";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<AuthForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/MoreStatistics" element={<MoreStatistics />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/profile" element={<Profile />} />

          {/* Individual parameter detail routes */}
          <Route
            path="/MoreStatistics/tyre-pressure"
            element={<TyrePressure />}
          />
          <Route path="/MoreStatistics/total-life" element={<TotalLife />} />
          <Route
            path="/MoreStatistics/engine-temperature"
            element={<EngineTemperature />}
          />
          <Route path="/MoreStatistics/oil-level" element={<OilLevel />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
