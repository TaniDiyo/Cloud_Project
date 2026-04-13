import React, { useMemo } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { Wallet, AlertTriangle, CheckCircle, PieChart as ChartIcon, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import BudgetProgress from '../components/BudgetProgress';

const Dashboard = () => {
    // New context structure from useExpenses hook
    const { budget, budgetHealth, refreshData, expenses } = useOutletContext();

    const { totalSpent, remaining, percentage, categoryStatus, categoryUsage } = budgetHealth;

    // Chart Data
    const categoryData = useMemo(() => {
        return Object.keys(categoryUsage).map(key => ({
            name: key,
            value: categoryUsage[key]
        })).filter(item => item.value > 0);
    }, [categoryUsage]);

    const COLORS = ['#14b8a6', '#06b6d4', '#10b981', '#6366f1', '#8b5cf6', '#ec4899'];

    // Alerts
    const overBudgetItems = Object.keys(categoryStatus || {}).filter(cat => categoryStatus[cat].percentage > 100);
    const warningItems = Object.keys(categoryStatus || {}).filter(cat => categoryStatus[cat].percentage > 85 && categoryStatus[cat].percentage <= 100);

    const downloadCSV = () => {
        if (!expenses || expenses.length === 0) return;

        const headers = ["Title,Amount,Category,Date"];
        const rows = expenses.map(e => {
            // Escape fields that might contain commas
            const title = e.title.includes(',') ? `"${e.title}"` : e.title;
            const category = e.category.includes(',') ? `"${e.category}"` : e.category;
            return `${title},${e.amount},${category},${new Date(e.date).toLocaleDateString()}`;
        });

        const csvContent = [headers, ...rows].join("\n");
        // Add BOM for Excel utf-8 compatibility
        const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `all_spending_details.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-bold mb-2 text-slate-900 dark:text-white">Smart Budget Planner Dashboard</h1>
                    <p className="text-slate-500 dark:text-slate-400">
                       Experimenting Monitoring month: <span className='text-teal-500 font-semibold'>{new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={downloadCSV}
                        className="btn-ghost-neon flex items-center gap-2"
                        disabled={!expenses || expenses.length === 0}
                    >
                        <ArrowRight className="w-4 h-4 rotate-90" />
                        Export to Excel
                    </button>
                    {(!budget.totalBudget || budget.totalBudget === 0) && (
                        <Link to="/plan" className="btn-neon animate-pulse flex items-center gap-2">
                            <ChartIcon className="w-5 h-5" />
                            Set Monthly Budget
                        </Link>
                    )}
                </div>
            </div>

            {/* Alerts Banner */}
            {overBudgetItems.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500"
                >
                    <AlertTriangle className="w-6 h-6 flex-shrink-0" />
                    <div>
                        <span className="font-bold">Budget Alert!</span> You have exceeded limits in: {overBudgetItems.join(", ")}.
                    </div>
                </motion.div>
            )}

            {/* Hero Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Budget */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 bg-blue-500/5">
                    <p className="text-slate-500 text-sm font-medium mb-1">Total Monthly Budget</p>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white">₹{budget.totalBudget?.toLocaleString() || 0}</h3>
                    <Link to="/plan" className="text-xs text-blue-500 hover:underline mt-2 inline-block">Edit Plan</Link>
                </motion.div>

                {/* Remaining */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6 bg-teal-500/5">
                    <p className="text-slate-500 text-sm font-medium mb-1">Remaining Balance</p>
                    <h3 className={`text-3xl font-bold ${remaining < 0 ? 'text-red-500' : 'text-teal-500'}`}>
                        ₹{remaining.toLocaleString()}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2">{percentage.toFixed(1)}% used</p>
                </motion.div>

                {/* Health Status */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6 flex flex-col justify-center items-center text-center">
                    {percentage > 100 ?
                        <AlertTriangle className="w-12 h-12 text-red-500 mb-2" /> :
                        <CheckCircle className="w-12 h-12 text-green-500 mb-2" />
                    }
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {percentage > 100 ? 'Critical Overspending' : percentage > 85 ? 'Warning Zone' : 'Financially Healthy'}
                    </h3>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Category Progress Bars */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Category Limits</h3>
                        <Link to="/plan" className="text-sm text-teal-400">Manage Limits</Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.keys(categoryStatus || {}).map((cat, index) => (
                            <BudgetProgress
                                key={cat}
                                category={cat}
                                spent={categoryStatus[cat].spent}
                                limit={categoryStatus[cat].limit}
                                delay={index * 0.05}
                            />
                        ))}
                    </div>

                    {/* Fallback if no limits set */}
                    {(!budget.categoryLimits || Object.keys(budget.categoryLimits).length === 0) && (
                        <div className="text-center p-8 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl">
                            <p className="text-slate-500 mb-4">No category limits set yet.</p>
                            <Link to="/plan" className="btn-ghost-neon">Set Limits Now</Link>
                        </div>
                    )}
                </div>

                {/* Distribution Chart */}
                <div className="glass-panel p-6 rounded-2xl">
                    <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Spending Mix</h3>
                    <div className="h-[300px]">
                        {categoryData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={90}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0)" />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                                        itemStyle={{ color: '#f1f5f9' }}
                                        formatter={(value) => `₹${value}`}
                                    />
                                    <Legend iconType="circle" />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full flex items-center justify-center text-slate-500 text-sm">
                                Not enough data
                            </div>
                        )}
                    </div>

                    {/* Quick Link to Log */}
                    <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700/50">
                        <Link to="/add" className="w-full btn-neon flex justify-center items-center gap-2">
                            Log Spending <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
