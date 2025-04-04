import React from "react";

const ExpenseTable = ({ expenses, monthlyIncome, showHeading = true, customClass = "" }) => {
    return (
        <div className={`expense-list ${customClass} || ""`}>
            <h2 className="heading">Expenses</h2>
            {expenses.length === 0 ? (
                <p className="no-expense-msg">You have not added any expenses until now.</p>
            ) : (
                <table className="expense-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Expense ($)</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Remaining Balance ($)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.reduce((rows, exp, index) => {
                            const runningTotal = expenses
                                .slice(0, index + 1)
                                .reduce((acc, e) => acc + parseFloat(e.amount), 0);

                            const remainingBalance = monthlyIncome - runningTotal;

                            rows.push(
                                <tr key={index}>
                                    <td>{exp.date}</td>
                                    <td>{parseFloat(exp.amount).toFixed(2)}</td>
                                    <td>{exp.category}</td>
                                    <td>{exp.description}</td>
                                    <td>{remainingBalance.toFixed(2)}</td>
                                </tr>
                            );
                            return rows;
                        }, [])}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ExpenseTable;
