import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaUser,
  FaChartBar,
  FaCog,
  FaFileAlt,
  FaNewspaper,
  FaUsers,
  FaMoneyBillWaveAlt,
  FaAngleDoubleRight,
  FaCaretDown,
  FaBars,
} from "react-icons/fa";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const [isShrunk, setIsShrunk] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsShrunk(!isShrunk);
  };

  const toggleProfileDropdown = (e) => {
    e.stopPropagation(); // Prevents unwanted closing
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <aside
      className={`sidebar ${isShrunk ? "shrunk" : ""}`}
      onClick={() => setIsProfileOpen(false)}
    >
      {/* Shrinking Button */}
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isShrunk ? <FaAngleDoubleRight /> : <FaBars />}
      </button>

      {/* Navigation */}
      <nav>
        <ul>
          <li className={location.pathname === "/dashboard" ? "active" : ""}>
            <Link to="/dashboard">
              <FaChartBar className="icon" /> {!isShrunk && "Overview"}
            </Link>
          </li>
          <li className={location.pathname === "/dashboard" ? "active" : ""}>
            <Link to="/budgettracker">
              <FaMoneyBillWaveAlt className="icon" />{" "}
              {!isShrunk && "Budget Tracker"}
            </Link>
          </li>
          <li className={location.pathname === "/reminder" ? "active" : ""}>
            <Link to="/reminder">
              <FaFileAlt className="icon" /> {!isShrunk && "Set Reminders"}
            </Link>
          </li>
          <li className={location.pathname === "/community" ? "active" : ""}>
            <Link to="/community">
              <FaUsers className="icon" /> {!isShrunk && "Community"}
            </Link>
          </li>
          <li className={location.pathname === "/news" ? "active" : ""}>
            <Link to="/news">
              <FaNewspaper className="icon" /> {!isShrunk && "News"}
            </Link>
          </li>
          <li className={location.pathname === "/guidance" ? "active" : ""}>
            <Link to="/guidance">
              <FaFileAlt className="icon" /> {!isShrunk && "Guidance"}
            </Link>
          </li>
          <li className={location.pathname === "/deals" ? "active" : ""}>
            <Link to="/deals">
              <FaUser className="icon" /> {!isShrunk && "Deals"}
            </Link>
          </li>

          {/* Profile Section */}
          <li className="profile-section">
            <div
              className={`profile-header ${isProfileOpen ? "open" : ""}`}
              onClick={toggleProfileDropdown}
            >
              <FaUser className="icon" /> {!isShrunk && "Profile"}
              {!isShrunk && (
                <FaCaretDown
                  className={`dropdown-icon ${isProfileOpen ? "open" : ""}`}
                />
              )}
            </div>
            {isProfileOpen && !isShrunk && (
              <ul className="dropdown-menu">
                <li
                  className={location.pathname === "/profile" ? "active" : ""}
                >
                  <Link to="/edit-profile">My Profile</Link>
                </li>
                <li
                  className={
                    location.pathname === "/edit-profile" ? "active" : ""
                  }
                >
                  <Link to="/edit-profile"> Edit Profile </Link>
                </li>
                <li
                  className={location.pathname === "/settings" ? "active" : ""}
                >
                  <Link to="/settings"> Settings </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>

      {/* Move Logo to Bottom */}
      <div className="sidebar-footer">
        <h2 className="logo">{isShrunk ? "IH" : "IMMIGRATION HUB"}</h2>
      </div>
    </aside>
  );
};

export default Sidebar;
