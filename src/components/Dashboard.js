import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { Line } from "react-chartjs-2"; // Import Line Chart
import "chart.js/auto";
import Sidebar from "./Sidebar";

const Dashboard = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [reminders, setReminders] = useState(["Complete Assignment", "Pay Rent", "Attend Workshop"]);
    const [newReminder, setNewReminder] = useState("");

    // Toggle Dropdown
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    // Close dropdown when clicking outside
    const handleOutsideClick = (event) => {
        if (!event.target.closest(".account-dropdown")) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        if (dropdownOpen) document.addEventListener("click", handleOutsideClick);
        else document.removeEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, [dropdownOpen]);

    // Function to Add Reminder
    const addReminder = () => {
        if (newReminder.trim() !== "") {
            setReminders([...reminders, newReminder]);
            setNewReminder("");
        }
    };

    // Data for Line Chart (Budget Overview)
    const budgetData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        datasets: [
            {
                label: "Total Expenses ($)",
                data: [500, 700, 650, 800, 750],
                fill: false,
                backgroundColor: "#009d1d",
                borderColor: "#007a14",
                tension: 0.3
            }
        ]
    };

    return (
        <div className="dashboard-container">
            <Sidebar />

            {/* Main Content */}
            <main className="dashboard-content">
                {/* Top Bar */}
                <div className="top-bar">
                    <h1 className="welcome-text">Welcome Back, User!</h1>
                    <div className="account-dropdown">
                        <button className="account-button" onClick={toggleDropdown}>
                            <FaUser className="icon" />
                        </button>
                        {dropdownOpen && (
                            <div className="dropdown-menu">
                                <ul>
                                    <li className="logout">
                                        <a href="/"><FaSignOutAlt className="icon" /> Logout</a>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* Dashboard Widgets (Structured like settings page sections) */}
                <div className="dashboard-widgets">
                    {/* Budget Overview Section (Line Chart) */}
                    <div className="widget budget-tracker">
                        <h3>Budget Overview</h3>
                        <Line data={budgetData} />
                    </div>

                    {/* Reminders Section */}
                    <div className="widget task-reminder">
                        <h3>Reminders</h3>
                        <ul>
                            {reminders.map((reminder, index) => (
                                <li key={index}>{reminder}</li>
                            ))}
                        </ul>
                        <input
                            type="text"
                            placeholder="Add new reminder..."
                            value={newReminder}
                            onChange={(e) => setNewReminder(e.target.value)}
                        />
                        <button className="green-btn" onClick={addReminder}>Add Reminder</button>
                    </div>

                    {/* Currency Exchange Section */}
                    <div className="widget currency-exchange">
                        <h3>Currency Exchange</h3>
                        <p>1 USD = 1.35 CAD</p>
                        <input type="number" placeholder="Enter USD" />
                        <button className="green-btn">Convert</button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
