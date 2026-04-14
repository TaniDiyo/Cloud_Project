import React from 'react';
import ExpenseItem from './ExpenseItem';

const ExpenseList = ({ expenses, onDelete }) => {
    if (expenses.length === 0) {
        return (
            <div className="text-center py-10 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
                <p className="text-gray-500 text-lg">No expenses found.</p>
                <p className="text-gray-400 text-sm mt-1">Start by adding a new expense above!</p>
            </div>
        );
    }

    return (
        <div className="mt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Transactions</h2>
            <div className="space-y-3">
                {expenses.map((expense) => (
                    <ExpenseItem
                        key={expense.id}
                        expense={expense}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </div>
    );
};

export default ExpenseList;
