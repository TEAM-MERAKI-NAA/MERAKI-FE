import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css"; // Dashboard-specific styles
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { Pie } from "react-chartjs-2"; // Importing Pie Chart
import "chart.js/auto";
import Sidebar from "./Sidebar"; // Import Sidebar component

const Dashboard = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [tasks, setTasks] = useState(["Complete Assignment", "Pay Rent", "Attend Workshop"]);
    const [newTask, setNewTask] = useState("");

    // Toggle Dropdown Menu
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    // Close Dropdown when Clicking Outside
    const handleOutsideClick = (event) => {
        if (!event.target.closest(".account-dropdown")) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        if (dropdownOpen) {
            document.addEventListener("click", handleOutsideClick);
        } else {
            document.removeEventListener("click", handleOutsideClick);
        }
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, [dropdownOpen]);

    // Add New Task
    const addTask = () => {
        if (newTask.trim() !== "") {
            setTasks([...tasks, newTask]);
            setNewTask("");
        }
    };

    // Budget Tracker Data
    const budgetData = {
        labels: ["Rent", "Food", "Transport", "Others"],
        datasets: [
            {
                data: [40, 30, 15, 15],
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"]
            }
        ]
    };

    return (
        <div className="dashboard-container">
            <Sidebar /> {/* Sidebar Component */}

            {/* Main Content */}
            <main className="dashboard-content">
                <div className="top-bar">
                    <div className="account-dropdown">
                        <button className="account-button green-btn" onClick={toggleDropdown}>
                            <FaUser className="icon" />
                        </button>
                        {dropdownOpen && (
                            <div className="dropdown-menu">
                                <a href="/" className="dropdown-item logout"><FaSignOutAlt className="icon" /> Logout</a>
                            </div>
                        )}
                    </div>
                </div>

                <h1>Welcome Back, User!</h1>

                {/* Dashboard Widgets */}
                <div className="dashboard-widgets">
                    {/* Budget Tracker */}
                    <div className="widget budget-tracker">
                        <h3>Budget Overview</h3>
                        <Pie data={budgetData} />
                    </div>

                    {/* Task & Reminders */}
                    <div className="widget task-reminder">
                        <h3>Reminders</h3>
                        <ul>
                            {tasks.map((task, index) => (
                                <li key={index}>{task}</li>
                            ))}
                        </ul>
                        <input
                            type="text"
                            placeholder="Add new reminder..."
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                        />
                        <button className="green-btn" onClick={addTask}>Add Task</button>
                    </div>

                    {/* Currency Exchange */}
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
