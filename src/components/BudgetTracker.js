import React, { useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import "../styles/BudgetTracker.css";

const categories = ["Rent", "Grocery", "Transportation", "Entertainment", "Utilities", "Other"];

const BudgetTracker = () => {
    const [monthlyIncome, setMonthlyIncome] = useState(0);
    const [expenses, setExpenses] = useState([]);
    const [expenseData, setExpenseData] = useState({
        amount: "",
        category: "",
        date: "",
    });

    const handleAddExpense = async () => {
        if (!expenseData.amount || !expenseData.category || !expenseData.date) {
            alert("Please fill in all expense details.");
            return;
        }

        const expenseToAdd = {
            amount: parseFloat(expenseData.amount),
            category: expenseData.category,
            date: expenseData.date,
            income: monthlyIncome,
        };

        try {
            const token = localStorage.getItem("accessToken");

            const response = await axios.post(
                "http://localhost:8000/api/budget/",
                expenseToAdd,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Saved to database:", response.data);

            setExpenses([...expenses, expenseToAdd]);
            setExpenseData({ amount: "", category: "", date: "" });
        } catch (error) {
            console.error("Error saving expense:", error);
            alert("Failed to save expense. Please try again.");
        }
    };

    const totalExpenses = expenses.reduce((acc, exp) => acc + exp.amount, 0);
    const remaining = monthlyIncome - totalExpenses;

    return (
        <div className="budget-tracker-container">
            <Sidebar />
            <main className="budget-content">
                <h1 className="budget-heading">💰 Monthly Budget Tracker</h1>

                {/* Income Entry */}
                <div className="budget-inputs">
                    <input
                        type="number"
                        placeholder="Enter Monthly Income ($)"
                        onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            if (value >= 0 || e.target.value === "") {
                                setMonthlyIncome(value || 0);
                            }
                        }}
                    />
                </div>

                {/* Expense Entry */}
                <div className="budget-inputs">
                    <input
                        type="number"
                        placeholder="Expense Amount ($)"
                        value={expenseData.amount}
                        onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            if (value >= 0 || e.target.value === "") {
                                setExpenseData({ ...expenseData, amount: e.target.value });
                            }
                        }}
                    />

                    <select
                        value={expenseData.category}
                        onChange={(e) => setExpenseData({ ...expenseData, category: e.target.value })}
                        className="styled-dropdown"
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                    <input
                        type="date"
                        value={expenseData.date}
                        max={new Date().toISOString().split("T")[0]} // ✅ Restrict to today or earlier
                        onChange={(e) => setExpenseData({ ...expenseData, date: e.target.value })}
                    />

                    <button className="add-btn" onClick={handleAddExpense}>Add Expense</button>
                </div>

                {/* Summary */}
                <div className="budget-summary">
                    <h2 className="heading">Summary</h2>
                    <p>Total Income: ${monthlyIncome.toFixed(2)}</p>
                    <p>Total Expenses: ${totalExpenses.toFixed(2)}</p>
                    <p>Balance: ${remaining.toFixed(2)}</p>
                </div>

                {/* Expense List */}
                <div className="expense-list">
                    <h2 className="heading">Expenses</h2>
                    {expenses.length === 0 ? (
                        <p>No expenses added yet.</p>
                    ) : (
                        <ul>
                            {expenses.map((exp, index) => (
                                <li key={index}>
                                    {exp.date} - ${exp.amount.toFixed(2)} on {exp.category}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </main>
        </div>
    );
};

export default BudgetTracker;