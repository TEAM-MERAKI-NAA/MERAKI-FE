import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../styles/LandingPage.css"; // Correct the CSS import

const LandingPage = () => {
  return (
    <div id="landingpage-container">
      {/* Hero Section with Background Image */}
      <div id="hero-background"></div>

      {/* Navbar */}
      <nav id="landing-navbar">
        <div id="navbar-logo">{/* Add logo if needed */}</div>
        <div id="navbar-buttons">
          <button id="currency-button">Currency Changer ▼</button>
          <Link to="/signup">
            <button id="signup-button">Sign up</button>
          </Link>
          <Link to="/login">
            <button id="login-button">Log in</button>
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div id="landing-content">
        <img src="/logo.png" alt="Logo" id="logo-img" />
        <h1 id="title">Immigration Hub</h1>
        <p id="description">
          Your everyday companion for your international journey.
        </p>
        <Link to="/Homepage">
          <button id="signup-btn">Explore Our Hub</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
