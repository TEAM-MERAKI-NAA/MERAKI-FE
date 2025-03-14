import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaChartBar, FaCog, FaFileAlt } from "react-icons/fa";
import "../styles/Sidebar.css"; // Ensure styles are linked properly

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <h2 className="logo">IMMIGRATION HUB</h2>
            <nav>
                <ul>
                    <li><Link to="/dashboard"><FaChartBar className="icon" /> Overview</Link></li>
                    <li><Link to="/profile"><FaUser className="icon" /> Profile</Link></li>
                    <li><Link to="/settings"><FaCog className="icon" /> Settings</Link></li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
