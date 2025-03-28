import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/LandingPage.css";

const LandingPage = () => {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [exchangeRates, setExchangeRates] = useState({});
  const defaultAmount = 100; // Example amount in USD

  // Fetch exchange rates when the component mounts
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch(
          `https://api.exchangerate-api.com/v4/latest/USD`
        );
        const data = await response.json();
        setExchangeRates(data.rates);
      } catch (error) {
        console.error("Error fetching exchange rates", error);
      }
    };

    fetchRates();
  }, []);

  // Function to handle currency change
  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  // Convert amount based on selected currency
  const convertedAmount = exchangeRates[selectedCurrency]
    ? (defaultAmount * exchangeRates[selectedCurrency]).toFixed(2)
    : defaultAmount.toFixed(2);

  return (
    <div id="landingpage-container">
      {/* Hero Section with Background Image */}
      <div id="hero-background"></div>

      {/* Navbar */}
      <nav id="landing-navbar">
        <div id="navbar-logo"></div>
        <div id="navbar-buttons">
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
