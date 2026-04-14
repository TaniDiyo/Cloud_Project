import React, { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Save, AlertCircle, PieChart } from 'lucide-react';

const CATEGORIES = ["Food", "Transport", "Utilities", "Entertainment", "Shopping", "Health", "Other"];

const BudgetPlanning = () => {
    const { budget, saveBudget } = useOutletContext();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const [totalBudget, setTotalBudget] = useState(0);
    const [categoryLimits, setCategoryLimits] = useState({});

    // Initialize state from existing budget
    useEffect(() => {
        if (budget) {
            setTotalBudget(budget.totalBudget || 0);
            // Ensure all categories exist in state
            const initialLimits = {};
            CATEGORIES.forEach(cat => {
                initialLimits[cat] = budget.categoryLimits?.[cat] || 0;
            });
            setCategoryLimits(initialLimits);
        }
    }, [budget]);

    const handleLimitChange = (category, value) => {
        setCategoryLimits(prev => ({
            ...prev,
            [category]: parseFloat(value) || 0
        }));
    };

    const allocated = Object.values(categoryLimits).reduce((a, b) => a + b, 0);
    const remainingToAllocate = totalBudget - allocated;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setIsLoading(true);

        const result = await saveBudget({
            totalBudget: parseFloat(totalBudget),
            categoryLimits
        });

        setIsLoading(false);
        if (result.success) {
            setMessage({ type: 'success', text: 'Budget plan saved successfully!' });
            // Optional: navigate back to dashboard
            setTimeout(() => navigate('/'), 1500);
        } else {
            setMessage({ type: 'error', text: result.message || 'Failed to save budget.' });
        }
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-teal-500/10 rounded-xl text-teal-400">
                    <PieChart className="w-8 h-8" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Monthly Budget Planner</h1>
                    <p className="text-slate-500 dark:text-slate-400">Allocate your monthly income proactively</p>	
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel p-8 rounded-2xl"
            >
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Total Budget Section */}
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                        <label className="block text-slate-500 dark:text-slate-400 text-sm font-medium mb-2">Total Monthly Budget</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-slate-400">₹</span>
                            <input
                                type="number"
                                value={totalBudget}
                                onChange={(e) => setTotalBudget(parseFloat(e.target.value) || 0)}
                                className="w-full bg-transparent border-none text-4xl font-bold text-slate-900 dark:text-white focus:ring-0 pl-10 placeholder-slate-600"
                                placeholder="0"
                            />
                        </div>
                    </div>

                    {/* Allocation Status */}
                    <div className={`p-4 rounded-xl flex justify-between items-center ${remainingToAllocate < 0 ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                            remainingToAllocate === 0 ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                                'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                        }`}>
                        <div className="font-medium">
                            {remainingToAllocate < 0 ? 'Over Allocated!' :
                                remainingToAllocate === 0 ? 'Perfectly Allocated' :
                                    'Unallocated Balance'}
                        </div>
                        <div className="font-bold text-lg">
                            {remainingToAllocate < 0 ? '-' : ''}₹{Math.abs(remainingToAllocate).toLocaleString()}
                        </div>
                    </div>

                    {/* Category Limits */}
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Category Allocations</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {CATEGORIES.map(cat => (
                                <div key={cat} className="glass-card p-4 rounded-xl border border-slate-200 dark:border-slate-700/50 flex items-center justify-between">
                                    <label className="text-slate-700 dark:text-slate-300 font-medium">{cat}</label>
                                    <div className="flex items-center gap-2">
                                        <span className="text-slate-500">₹</span>
                                        <input
                                            type="number"
                                            value={categoryLimits[cat] || ''}
                                            onChange={(e) => handleLimitChange(cat, e.target.value)}
                                            className="w-24 bg-slate-100 dark:bg-slate-900 border-none rounded-lg p-2 text-right text-slate-900 dark:text-white font-semibold focus:ring-2 focus:ring-teal-500/50"
                                            placeholder="0"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="pt-4 border-t border-slate-200 dark:border-slate-700/50 flex gap-4 items-center">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-neon flex-1 flex justify-center items-center gap-2"
                        >
                            {isLoading ? 'Saving...' : <><Save className="w-5 h-5" /> Save Budget Plan</>}
                        </button>
                    </div>

                    {message && (
                        <div className={`text-center text-sm font-medium ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                            {message.text}
                        </div>
                    )}
                </form>
            </motion.div>
        </div>
    );
};

export default BudgetPlanning;
