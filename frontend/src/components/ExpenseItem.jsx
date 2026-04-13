import React from 'react';

const ExpenseItem = ({ expense, onDelete }) => {
    return (
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm mb-3 border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-gray-800">{expense.title}</h3>
                <span className="text-xs text-gray-500 uppercase tracking-wider">{expense.category}</span>
            </div>
            <div className="flex items-center gap-4">
                <span className="text-lg font-bold text-indigo-600">${parseFloat(expense.amount).toFixed(2)}</span>
                <button
                    onClick={() => onDelete(expense.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1"
                    aria-label="Delete expense"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ExpenseItem;
