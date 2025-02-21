import React, { useState } from "react";
import "../styles/Dashboard.css"; // Dashboard-specific styles
import { FaUser, FaSignOutAlt, FaChartBar, FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <aside className="sidebar">
                <h2 className="logo">MyApp</h2>
                <nav>
                    <ul>
                        <li><Link to="#"><FaChartBar className="icon" /> Overview</Link></li>
                        <li><Link to="#"><FaUser className="icon" /> Profile</Link></li>
                        <li><Link to="#"><FaCog className="icon" /> Settings</Link></li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="dashboard-content">
                {/* Top Bar with Circular Account Button */}
                <div className="top-bar">
                    <div className="account-dropdown">
                        <button className="account-button" onClick={toggleDropdown}>
                            <FaUser className="icon" />
                        </button>
                        {dropdownOpen && (
                            <div className="dropdown-menu">
                                {/* <Link to="/profile" className="dropdown-item"><FaUser className="icon" /> Profile</Link> */}
                                <Link to="/" className="dropdown-item logout"><FaSignOutAlt className="icon" /> Logout</Link>
                            </div>
                        )}
                    </div>
                </div>

                <h1>Welcome Back, User!</h1>
                <p>Your account overview and statistics.</p>

                <div className="dashboard-cards">
                    <div className="card">
                        <h3>Active Sessions</h3>
                        <p>5</p>
                    </div>
                    <div className="card">
                        <h3>Completed Tasks</h3>
                        <p>12</p>
                    </div>
                    <div className="card">
                        <h3>Pending Approvals</h3>
                        <p>3</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
