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

// Import styles
import "./styles/LandingPage.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/community" element={<Community />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/login" element={<Login />} />
          <Route path="/news" element={<News />} />
          <Route path="/reminder" element={<Reminder />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Homepage" element={<Homepage />} />
          <Route path="/AboutUs" element={<AboutUs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
