import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import "../styles/BudgetTracker.css";

const BudgetTracker = () => {
    const [monthlyData, setMonthlyData] = useState([]);
    const [income, setIncome] = useState("");
    const [expenses, setExpenses] = useState("");
    const [month, setMonth] = useState("");
    const [message, setMessage] = useState("");
    const [expenseCategories, setExpenseCategories] = useState({
        Rent: 0,
        Food: 0,
        Transportation: 0,
        Entertainment: 0,
        Other: 0,
    });

    // Function to Add Data
    const handleAddData = () => {
        if (!month || !income || !expenses) {
            alert("Please enter all fields.");
            return;
        }

        const incomeValue = parseFloat(income);
        const expensesValue = parseFloat(expenses);
        const savings = incomeValue - expensesValue;
        const savingsPercentage = ((savings / incomeValue) * 100).toFixed(2);

        const newEntry = {
            month,
            income: incomeValue,
            expenses: expensesValue,
            savings,
            savingsPercentage,
        };

        setMonthlyData([...monthlyData, newEntry]);

        setMessage(
            savings >= 0
                ? `🎉 You saved $${savings.toFixed(2)} in ${month} (${savingsPercentage}% of your income)!`
                : `⚠️ You overspent by $${Math.abs(savings).toFixed(2)} in ${month}. Try to save more next time!`
        );

        // Reset Fields
        setMonth("");
        setIncome("");
        setExpenses("");
    };

    // Function to handle "Enter" key press
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent default form submission
            handleAddData(); // Call the function to add data
        }
    };

    // Bar Chart Data
    const chartData = {
        labels: monthlyData.map((data) => data.month),
        datasets: [
            {
                label: "Income ($)",
                data: monthlyData.map((data) => data.income),
                backgroundColor: "green",
            },
            {
                label: "Expenses ($)",
                data: monthlyData.map((data) => data.expenses),
                backgroundColor: "red",
            },
        ],
    };

    // Pie Chart Data for Expenses
    const pieChartData = {
        labels: Object.keys(expenseCategories),
        datasets: [
            {
                data: Object.values(expenseCategories),
                backgroundColor: ["#FF5733", "#FFC300", "#36A2EB", "#8E44AD", "#2ECC71"],
            },
        ],
    };

    return (
        <div className="budget-tracker-container">
            <Sidebar />
            <main className="budget-content">
                <h1>📊 Budget Tracker</h1>

                {/* Month Dropdown */}
                <select
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="styled-dropdown"
                    onKeyDown={handleKeyPress} // Handles Enter Key
                >
                    <option value="">Select Month</option>
                    {[
                        "January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December",
                    ].map((m) => (
                        <option key={m} value={m}>
                            {m}
                        </option>
                    ))}
                </select>

                {/* Income & Expenses Inputs */}
                <div className="budget-inputs">
                    <input
                        type="number"
                        placeholder="Enter Monthly Income ($)"
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                        onKeyDown={handleKeyPress} // Handles Enter Key
                    />
                    <input
                        type="number"
                        placeholder="Enter Monthly Expenses ($)"
                        value={expenses}
                        onChange={(e) => setExpenses(e.target.value)}
                        onKeyDown={handleKeyPress} // Handles Enter Key
                    />
                    <button onClick={handleAddData}>Add Entry</button>
                </div>

                {/* Savings Message */}
                {message && <p className="budget-message">{message}</p>}

                {/* Charts Section */}
                {monthlyData.length > 0 && (
                    <div className="charts-container">
                        <div className="chart-box">
                            <h3>📈 Monthly Overview</h3>
                            <Bar data={chartData} />
                        </div>
                        <div className="chart-box">
                            <h3>📊 Expense Categories</h3>
                            <Pie data={pieChartData} />
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default BudgetTracker;
