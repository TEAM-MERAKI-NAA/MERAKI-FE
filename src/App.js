import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import components
import Community from "./components/Community";
import Finance from "./components/Finance";
import LandingPage from "./components/LandingPage";
import Homepage from "./components/Homepage";
import AboutUs from "./components/AboutUs";
import Login from "./components/Login";
import News from "./components/News";
import Reminder from "./components/Reminder";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import GuidancePage from "./components/GuidancePage";

// Import styles
import "./styles/LandingPage.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/community" element={<Community />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/login" element={<Login />} />
          <Route path="/news" element={<News />} />
          <Route path="/reminder" element={<Reminder />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/guidance" element={<GuidancePage />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
