import React, { useState } from 'react';
// Validation: Prevent negative or zero expense values before submission
const ExpenseForm = ({ onAddExpense }) => {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('Food');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title || !amount) {
            alert('Please fill in all fields');
            return;
        }

        const expenseData = {
            title,
            amount: parseFloat(amount),
            category,
        };

        onAddExpense(expenseData);

        // Reset form
        setTitle('');
        setAmount('');
        setCategory('Food');
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md mb-6 border border-indigo-50">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>➕</span> Add New Expense
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expense Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Grocery Shopping"
                        className="input-field"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
                        <input
                            type="number"
                            min="0.01"
                            step="0.01"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            className="input-field"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="input-field bg-white cursor-pointer"
                        >
                            <option value="Food">Food 🍔</option>
                            <option value="Transport">Transport 🚗</option>
                            <option value="Utilities">Utilities 💡</option>
                            <option value="Entertainment">Entertainment 🎬</option>
                            <option value="Health">Health 🏥</option>
                            <option value="Other">Other 📦</option>
                        </select>
                    </div>
                </div>

                <button type="submit" className="btn-primary w-full mt-2">
                    Add Transaction
                </button>
            </form>
        </div>
    );
};

export default ExpenseForm;
