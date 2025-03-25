import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaChartBar, FaCog, FaFileAlt } from "react-icons/fa";
import "../styles/Sidebar.css";

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <h2 className="logo">IMMIGRATION HUB</h2>
            <nav>
                <ul>
                    <li><Link to="/dashboard"><FaChartBar className="icon" /> Overview</Link></li>
                    <li><Link to="/BudgetTracker"><FaCog className="icon" /> Budget Tracker</Link></li>
                    <li><Link to="/reminder"><FaCog className="icon" /> Set Reminders</Link></li>
                    <li><Link to="/community"><FaCog className="icon" /> Community</Link></li>
                    <li><Link to="/news"><FaCog className="icon" /> News</Link></li>
                    <li><Link to="/guidance"><FaCog className="icon" /> Guidance</Link></li>
                    <li><Link to="/profile"><FaUser className="icon" /> Deals</Link></li>
                    <li><Link to="/settings"><FaCog className="icon" /> Settings</Link></li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
