import React, { useState } from "react";
import "../styles/Dashboard.css"; // Dashboard-specific styles
import { FaUser, FaSignOutAlt, FaChartBar, FaCog, FaMoneyBillWave, FaTasks, FaUniversity, FaFileAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Pie } from "react-chartjs-2"; // Importing Pie Chart
import "chart.js/auto";

const Dashboard = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [tasks, setTasks] = useState(["Complete Assignment", "Pay Rent", "Attend Workshop"]);
    const [newTask, setNewTask] = useState("");

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

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
            {/* Sidebar */}
            <aside className="sidebar">
                <h2 className="logo">Student Hub</h2>
                <nav>
                    <ul>
                        <li><Link to="#"><FaChartBar className="icon" /> Overview</Link></li>
                        <li><Link to="/profile"><FaUser className="icon" /> Profile</Link></li>
                        <li><Link to="#"><FaCog className="icon" /> Settings</Link></li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="dashboard-content">
                <div className="top-bar">
                    <div className="account-dropdown">
                        <button className="account-button" onClick={toggleDropdown}>
                            <FaUser className="icon" />
                        </button>
                        {dropdownOpen && (
                            <div className="dropdown-menu">
                                <Link to="/" className="dropdown-item logout"><FaSignOutAlt className="icon" /> Logout</Link>
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
                            placeholder="Add new task..."
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                        />
                        <button onClick={addTask}>Add Task</button>
                    </div>

                    {/* Currency Exchange */}
                    <div className="widget currency-exchange">
                        <h3>Currency Exchange</h3>
                        <p>1 USD = 1.35 CAD</p>
                        <input type="number" placeholder="Enter USD" />
                        <button>Convert</button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
