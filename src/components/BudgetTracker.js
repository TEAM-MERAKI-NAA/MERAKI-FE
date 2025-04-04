import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import Sidebar from "./Sidebar";
import "../styles/BudgetTracker.css";
import ExpenseTable from "./ExpenseTable";

const categoryOptions = [
    { label: "Rent", value: "housing" },
    { label: "Grocery", value: "food" },
    { label: "Transportation", value: "TRANS" },
    { label: "Entertainment", value: "ENT" },
    { label: "Utilities", value: "utilities" },
    { label: "Other", value: "OTH" }
];


const BudgetTracker = () => {
    const [monthlyIncome, setMonthlyIncome] = useState(0);
    const [expenses, setExpenses] = useState([]);
    const [expenseData, setExpenseData] = useState({
        amount: "",
        category: "",
        date: "",
        description: "",
    });

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await axios.get("http://4.206.179.192:8000/budget/api/budget/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const filteredExpenses = response.data.filter(exp => {
                    return exp.amount && exp.amount > 0 && exp.description !== "Monthly income";
                });

                setExpenses(filteredExpenses);

                if (response.data.length > 0 && response.data[0].monthly_income) {
                    setMonthlyIncome(parseFloat(response.data[0].monthly_income));
                }
            } catch (error) {
                console.error("Error fetching expenses:", error);
            }
        };

        fetchExpenses();
    }, []);

    const handleAddExpense = async () => {
        if (!expenseData.amount || !expenseData.category || !expenseData.date) {
            alert("Please fill in all expense details.");
            return;
        }

        const newExpense = {
            monthly_income: monthlyIncome,
            amount: parseFloat(expenseData.amount),
            category: expenseData.category,
            date: expenseData.date,
            description: expenseData.description || "",
        };

        try {
            const token = localStorage.getItem("accessToken");

            const response = await axios.post(
                "http://4.206.179.192:8000/budget/api/budget/",
                newExpense,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Saved successfully:", response.data);
            setExpenses(prev => [...prev, response.data]);
            setExpenseData({ amount: "", category: "", date: "", description: "" });
        } catch (error) {
            console.error("Error 400 - Failed to add expense:", error.response?.data || error.message);
            alert("Failed to save expense. Please check your input.");
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("accessToken");
            await axios.delete(`http://4.206.179.192:8000/budget/api/budget/${id}/`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setExpenses((prev) => prev.filter((exp) => exp.id !== id));
        } catch (error) {
            console.error("Error deleting expense:", error);
            alert("Failed to delete expense. Please try again.");
        }
    };


    const totalExpenses = expenses.reduce((acc, exp) => acc + Number(exp.amount || 0), 0);
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
                        value={monthlyIncome || ""}
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
                        value={expenseData.amount || ""}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (value === "" || parseFloat(value) >= 0) {
                                setExpenseData({ ...expenseData, amount: value });
                            }
                        }}
                    />


                    <select
                        value={expenseData.category}
                        onChange={(e) => setExpenseData({ ...expenseData, category: e.target.value })}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                e.target.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }));
                            }
                        }}
                        className="styled-dropdown"
                    >

                        <option value="">Select Category</option>
                        {categoryOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>


                    <input
                        type="date"
                        value={expenseData.date}
                        max={new Date().toISOString().split("T")[0]}
                        onChange={(e) => setExpenseData({ ...expenseData, date: e.target.value })}
                    />

                    <input
                        type="text"
                        placeholder="Description"
                        value={expenseData.description}
                        onChange={(e) => setExpenseData({ ...expenseData, description: e.target.value })}
                    />

                    <button className="add-btn" onClick={handleAddExpense}>Add Expense</button>
                </div>

                {/* Summary */}
                <div className="budget-summary">
                    <h2 className="heading">Summary</h2>
                    <p>Total Income: ${Number(monthlyIncome).toFixed(2)}</p>
                    <p>Total Expenses: ${totalExpenses.toFixed(2)}</p>
                    <p>Balance: ${remaining.toFixed(2)}</p>
                </div>

                {/* Expense Table */}
                <ExpenseTable
                    expenses={expenses}
                    monthlyIncome={monthlyIncome}
                    showHeading={true}
                    onDelete={handleDelete}
                />

            </main>
        </div>
    );
};

export default BudgetTracker;