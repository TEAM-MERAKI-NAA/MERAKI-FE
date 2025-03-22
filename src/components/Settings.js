import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Sidebar from "./Sidebar"; // Import Sidebar component
import "../styles/Settings.css";
import { FaUser, FaLock, FaPalette, FaExclamationTriangle } from "react-icons/fa";

const Settings = () => {
    const navigate = useNavigate(); // Initialize navigate

    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);

    const toggleDarkMode = () => setDarkMode(!darkMode);
    const toggleNotifications = () => setNotifications(!notifications);

    return (
        <div className="settings-container">
            <Sidebar /> {/* Sidebar Component */}
            <main className="settings-content">
                <h1 className="settings-header">⚙️ Settings</h1>

                <div className="settings-section">
                    <h3><FaUser /> Profile Settings</h3>
                    <button className="settings-btn" onClick={() => navigate("/profile")}>
                        Edit Profile
                    </button>
                    <button className="settings-btn">Change Password</button>
                </div>

                <div className="settings-section">
                    <h3><FaLock /> Security & Privacy</h3>
                    <button className="settings-btn">Enable Two-Factor Authentication</button>
                    <button className="settings-btn">Manage Login Sessions</button>
                </div>

                {/* Preferences Section with Toggle Switch */}
                <div className="settings-section">
                    <h3><FaPalette /> Preferences</h3>
                    <div className="toggle-container">
                        <span>Enable Dark Mode</span>
                        <label className="switch">
                            <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
                            <span className="slider"></span>
                        </label>
                    </div>
                    <div className="toggle-container">
                        <span>Receive Email Notifications</span>
                        <label className="switch">
                            <input type="checkbox" checked={notifications} onChange={toggleNotifications} />
                            <span className="slider"></span>
                        </label>
                    </div>
                </div>

                <div className="settings-section danger-section">
                    <h3><FaExclamationTriangle /> Account Management</h3>
                    <button className="danger-btn">Delete Account</button>
                </div>
            </main>
        </div>
    );
};

export default Settings;
