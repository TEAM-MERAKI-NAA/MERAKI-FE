import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Dashboard.css";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import Sidebar from "./Sidebar";
import ExpenseTable from "./ExpenseTable"; // Importing the reusable component

const Dashboard = () => {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [reminders, setReminders] = useState(["Complete Assignment", "Pay Rent", "Attend Workshop"]);
    const [newReminder, setNewReminder] = useState("");
    const [userName, setUserName] = useState("User");
    const [expenses, setExpenses] = useState([]);
    const [monthlyIncome, setMonthlyIncome] = useState(0);

    useEffect(() => {
        const verifyAccessToken = async () => {
            const accessToken = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");

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
                            "User";

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

        const fetchExpenses = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await axios.get("http://4.206.179.192:8000/budget/api/budget/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const filteredExpenses = response.data.filter(
                    (exp) => exp.amount && exp.amount > 0 && exp.description !== "Monthly income"
                );

                setExpenses(filteredExpenses);

                if (response.data.length > 0 && response.data[0].monthly_income) {
                    setMonthlyIncome(parseFloat(response.data[0].monthly_income));
                }
            } catch (err) {
                console.error("Failed to load budget data", err);
            }
        };

        verifyAccessToken();
        fetchExpenses();

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
        }
    };

    useEffect(() => {
        if (dropdownOpen) document.addEventListener("click", handleOutsideClick);
        else document.removeEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, [dropdownOpen]);

    const addReminder = () => {
        if (newReminder.trim() !== "") {
            setReminders([...reminders, newReminder]);
            setNewReminder("");
        }
    };

    return (
        <div className="dashboard-container">
            <Sidebar />

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
                    <div className="widget budget-tracker no-bg-shadow">
                        <h3>Budget Overview</h3>
                        <div
                            className="table-clickable"
                            onClick={() => navigate("/BudgetTracker")}
                        >
                            <ExpenseTable
                                expenses={expenses.slice(0, 4)}
                                monthlyIncome={monthlyIncome}
                                customClass="dashboard-expense-list"
                                showHeading={false}
                            />
                        </div>
                        <button
                            className="track-budget-btn"
                            onClick={() => navigate("/BudgetTracker")}
                        >
                            Track Your Budget
                        </button>
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
        </div>
    );
};

export default Dashboard;
