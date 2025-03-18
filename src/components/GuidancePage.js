import React from "react";
import "../styles/GuidancePage.css";

const GuidancePage = () => {
  return (
    <div className="guidance-container">
      <header className="guidance-header">
        <h1>Welcome to the Guidance Page</h1>
        <p>Your go-to resource for navigating through the platform</p>
      </header>

      <section className="guidance-content">
        <div className="step">
          <h2>Step 1: Setup</h2>
          <p>Follow the instructions to set up your environment properly.</p>
        </div>

        <div className="step">
          <h2>Step 2: Configuration</h2>
          <p>
            Learn how to configure your application for optimal performance.
          </p>
        </div>

        <div className="step">
          <h2>Step 3: Best Practices</h2>
          <p>Discover the best practices for using the platform efficiently.</p>
        </div>

        <div className="step">
          <h2>Step 4: Troubleshooting</h2>
          <p>Find solutions to common issues that may arise during usage.</p>
        </div>
      </section>

      <footer className="guidance-footer">
        <p>&copy; 2025 Your Company Name. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default GuidancePage;
