import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../styles/LandingPage.css"; // Correct the CSS import

const LandingPage = () => {
  return (
    <div className="landingpage-container">
      {/* Hero Section with Background Image */}
      <div className="hero-background"></div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">
          {/* Add logo if needed */}
        </div>
        <div className="navbar-buttons">
          <button className="currency-button">Currency Changer ▼</button>
          <Link to="/signup">
            <button className="signup-button">Sign up</button>
          </Link>
          <Link to="/login">
            <button className="login-button">Log in</button>
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="content">
        <img src="/logo.png" alt="Logo" className="logo-img" />
        <h1 className="title">Immigration Hub</h1>
        <p className="description">
          Your everyday companion for your international journey.
        </p>
        <Link to="/signup">
          <button className="signup-btn">Sign up for free</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
