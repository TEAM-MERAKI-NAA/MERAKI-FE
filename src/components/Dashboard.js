import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Dashboard.css";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import Sidebar from "./Sidebar";

const Dashboard = () => {
<<<<<<< HEAD
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [reminders, setReminders] = useState([
    "Complete Assignment",
    "Pay Rent",
    "Attend Workshop",
  ]);
  const [newReminder, setNewReminder] = useState("");
=======
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [reminders, setReminders] = useState(["Complete Assignment", "Pay Rent", "Attend Workshop"]);
    const [newReminder, setNewReminder] = useState("");
    const [userName, setUserName] = useState("User");
>>>>>>> yash-workspace

  useEffect(() => {
    const verifyAccessToken = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

<<<<<<< HEAD
      if (!accessToken) {
        if (refreshToken) {
          try {
            const response = await axios.post(
              "http://4.206.179.192:8000/auth/api/token/refresh/",
              { refresh: refreshToken }
            );
            localStorage.setItem("accessToken", response.data.access);
          } catch (error) {
            console.error("Refresh Token Expired:", error);
            logout();
          }
        } else {
          logout();
=======
            if (!accessToken && refreshToken) {
                try {
                    const response = await axios.post(
                        "http://4.206.179.192:8000/auth/api/token/refresh/",
                        { refresh: refreshToken }
                    );
                    const newAccessToken = response.data.access;
                    localStorage.setItem("accessToken", newAccessToken);
                    fetchUserProfile(newAccessToken, refreshToken);
                } catch (error) {
                    console.error("Refresh Token Expired:", error);
                    logout();
                }
            } else {
                fetchUserProfile(accessToken, refreshToken);
            }
        };

        const fetchUserProfile = async (token, refreshToken) => {
            try {
                const response = await axios.get("http://4.206.179.192:8000/profile/api/profile/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const firstName =
                    response.data.first_name ||
                    response.data.firstname ||
                    response.data.name ||
                    response.data.username ||
                    "User";

                setUserName(firstName);
            } catch (error) {
                if (error.response && error.response.status === 401 && refreshToken) {
                    try {
                        const refreshResponse = await axios.post(
                            "http://4.206.179.192:8000/auth/api/token/refresh/",
                            { refresh: refreshToken }
                        );
                        const newAccessToken = refreshResponse.data.access;
                        localStorage.setItem("accessToken", newAccessToken);

                        const retryResponse = await axios.get("http://4.206.179.192:8000/profile/api/profile/", {
                            headers: {
                                Authorization: `Bearer ${newAccessToken}`,
                            },
                        });

                        const firstName =
                            retryResponse.data.first_name ||
                            retryResponse.data.firstname ||
                            retryResponse.data.name ||
                            retryResponse.data.username ||
                            // "User";

                        setUserName(firstName);
                    } catch (refreshError) {
                        console.error("Token refresh failed:", refreshError);
                        logout();
                    }
                } else {
                    console.error("Error fetching user profile:", error);
                    setUserName("User");
                }
            }
        };

        verifyAccessToken();

        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
            window.history.pushState(null, null, window.location.href);
        };
    }, [navigate]);

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/login");
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleOutsideClick = (event) => {
        if (!event.target.closest(".account-dropdown")) {
            setDropdownOpen(false);
>>>>>>> yash-workspace
        }
      }
    };

    verifyAccessToken();

<<<<<<< HEAD
    // Prevent navigating back to Dashboard after logout
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, null, window.location.href);
=======
    const addReminder = () => {
        if (newReminder.trim() !== "") {
            setReminders([...reminders, newReminder]);
            setNewReminder("");
        }
>>>>>>> yash-workspace
    };
  }, [navigate]);

<<<<<<< HEAD
  // Logout Function
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };
=======
    const handleChartClick = () => {
        navigate("/BudgetTracker");
    };

    const budgetData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        datasets: [
            {
                label: "Total Expenses ($)",
                data: [500, 700, 650, 800, 750],
                fill: false,
                backgroundColor: "#009d1d",
                borderColor: "#007a14",
                tension: 0.3,
            },
        ],
    };
>>>>>>> yash-workspace

  // Toggle Dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

<<<<<<< HEAD
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
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      {/* Main Content */}
      <main className="dashboard-content">
        {/* Top Bar */}
        <div className="top-bar">
          <h1 className="welcome-text">Welcome Back!</h1>
          <div className="account-dropdown">
            <button className="account-button" onClick={toggleDropdown}>
              <FaUser className="icon" />
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <ul>
                  <li className="logout">
                    <button onClick={logout}>
                      <FaSignOutAlt className="icon" /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
=======
            <main className="dashboard-content">
                <div className="top-bar">
                    <h1 className="welcome-text">Welcome Back, {userName}!</h1>
                    <div className="account-dropdown">
                        <button className="account-button" onClick={toggleDropdown}>
                            <FaUser className="icon" />
                        </button>
                        {dropdownOpen && (
                            <div className="dropdown-menu">
                                <ul>
                                    <li className="logout">
                                        <button onClick={logout}>
                                            <FaSignOutAlt className="icon" /> Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <div className="dashboard-widgets">
                    <div className="widget budget-tracker" onClick={handleChartClick} style={{ cursor: "pointer" }}>
                        <h3>Budget Overview</h3>
                        <Line data={budgetData} />
                    </div>

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

                    <div className="widget currency-exchange">
                        <h3>Currency Exchange</h3>
                        <p>1 USD = 1.35 CAD</p>
                        <input type="number" placeholder="Enter USD" />
                        <button className="green-btn">Convert</button>
                    </div>
                </div>
            </main>
>>>>>>> yash-workspace
        </div>

        {/* Dashboard Widgets */}
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
            <button className="green-btn" onClick={addReminder}>
              Add Reminder
            </button>
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