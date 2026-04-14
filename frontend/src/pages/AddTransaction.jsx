import React, { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, XCircle, AlertTriangle } from 'lucide-react';

const AddTransaction = () => {
    const { addExpense, budgetHealth } = useOutletContext();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('Food');
    const [warning, setWarning] = useState(null);

    // Calculate remaining for selected category
    const categoryStatus = budgetHealth?.categoryStatus?.[category];
    const remLimit = categoryStatus ? categoryStatus.remaining : null;
    const hasLimit = remLimit !== null && remLimit !== undefined;

    useEffect(() => {
        if (amount && hasLimit) {
            const numAmount = parseFloat(amount);
            if (numAmount > remLimit) {
                setWarning(`Warning: This exceeds your ${category} limit by ₹${(numAmount - remLimit).toLocaleString()}`);
            } else {
                setWarning(null);
            }
        } else {
            setWarning(null);
        }
    }, [amount, category, hasLimit, remLimit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !amount) return;

        addExpense({
            title,
            amount: parseFloat(amount),
            category,
        });

        navigate('/'); // Redirect to dashboard
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
        >
            <div className="glass-panel p-8 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-pink-500" />

                <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Log Spending</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Description</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Weekly Groceries"
                            className="input-neon"
                            autoFocus
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="input-neon appearance-none cursor-pointer"
                            >
                                <option value="Food">🍔 Food & Dining</option>
                                <option value="Transport">🚗 Transport</option>
                                <option value="Utilities">💡 Utilities</option>
                                <option value="Entertainment">🎬 Entertainment</option>
                                <option value="Shopping">🛍️ Shopping</option>
                                <option value="Health">🏥 Health</option>
                                <option value="Other">📦 Other</option>
                            </select>

                            {/* Category Limit Hint */}
                            <div className="mt-2 text-xs">
                                {hasLimit ? (
                                    <span className={remLimit < 0 ? "text-red-400" : "text-teal-400"}>
                                        Remaining: ₹{remLimit.toLocaleString()}
                                    </span>
                                ) : (
                                    <span className="text-slate-500">No limit set</span>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Amount</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">₹</span>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="0.00"
                                    className="input-neon pl-8"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Warning Banner */}
                    <AnimatePresence>
                        {warning && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-orange-500/10 border border-orange-500/20 text-orange-500 p-3 rounded-xl flex items-start gap-2 text-sm"
                            >
                                <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                {warning}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="flex-1 btn-ghost-neon flex justify-center items-center gap-2"
                        >
                            <XCircle className="w-5 h-5" /> Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 btn-neon flex justify-center items-center gap-2"
                        >
                            <Save className="w-5 h-5" /> Log Spending
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export default AddTransaction;
