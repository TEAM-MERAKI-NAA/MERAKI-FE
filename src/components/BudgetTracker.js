import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import "../styles/BudgetTracker.css";

const BudgetTracker = () => {
    const [monthlyData, setMonthlyData] = useState([]);
    const [income, setIncome] = useState("");
    const [expenses, setExpenses] = useState("");
    const [month, setMonth] = useState("");
    const [message, setMessage] = useState("");

    const handleAddData = () => {
        if (!month || !income || !expenses) {
            alert("Please enter all fields.");
            return;
        }

        const incomeValue = parseFloat(income);
        const expensesValue = parseFloat(expenses);
        const savings = incomeValue - expensesValue;
        
        const newEntry = { month, income: incomeValue, expenses: expensesValue, savings };
        setMonthlyData([...monthlyData, newEntry]);

        setMessage(
            savings >= 0 
                ? `You saved $${savings.toFixed(2)} in ${month}! 🎉` 
                : `You overspent by $${Math.abs(savings).toFixed(2)} in ${month}. Try to save more next time!`
        );

        // Clear input fields
        setMonth("");
        setIncome("");
        setExpenses("");
    };

    // Data for the bar chart
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

    return (
        <div className="budget-tracker-container">
            <Sidebar />
            <main className="budget-content">
                <h1>📊 Budget Tracker</h1>
                <div className="budget-inputs">
                    <input 
                        type="text" 
                        placeholder="Enter Month (e.g., January)" 
                        value={month} 
                        onChange={(e) => setMonth(e.target.value)}
                    />
                    <input 
                        type="number" 
                        placeholder="Enter Monthly Income ($)" 
                        value={income} 
                        onChange={(e) => setIncome(e.target.value)}
                    />
                    <input 
                        type="number" 
                        placeholder="Enter Monthly Expenses ($)" 
                        value={expenses} 
                        onChange={(e) => setExpenses(e.target.value)}
                    />
                    <button onClick={handleAddData}>Add Entry</button>
                </div>

                {message && <p className="budget-message">{message}</p>}

                {monthlyData.length > 0 && (
                    <div className="chart-container">
                        <h3>📈 Monthly Overview</h3>
                        <Bar data={chartData} />
                    </div>
                )}
            </main>
        </div>
    );
};

export default BudgetTracker;
