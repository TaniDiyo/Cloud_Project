import React, { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Search, Filter, Download } from 'lucide-react';

const Expenses = () => {
    const { expenses, deleteExpense } = useOutletContext();
    const [filter, setFilter] = useState('');

    // Date Filtering State
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const currentYear = new Date().getFullYear();

    const filteredExpenses = useMemo(() => {
        return expenses.filter(expense => {
            const matchesSearch =
                expense.title.toLowerCase().includes(filter.toLowerCase()) ||
                expense.category.toLowerCase().includes(filter.toLowerCase());

            const expenseDate = new Date(expense.date || expense.createdAt);
            const matchesDate =
                expenseDate.getMonth() === parseInt(selectedMonth) &&
                expenseDate.getFullYear() === parseInt(selectedYear);

            return matchesSearch && matchesDate;
        });
    }, [expenses, filter, selectedMonth, selectedYear]);

    const downloadCSV = () => {
        const headers = ["Title,Amount,Category,Date"];
        const rows = filteredExpenses.map(e =>
            `${e.title},${e.amount},${e.category},${new Date(e.date || e.createdAt).toLocaleDateString()}`
        );
        const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `expenses_history_${selectedMonth + 1}_${selectedYear}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Transaction History</h1>
                    <p className="text-slate-400">View and manage your past expenses.</p>
                </div>

                <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                    {/* Date Filters */}
                    <div className="flex items-center gap-2 bg-slate-900/50 p-2 rounded-xl border border-slate-700/50">
                        <Filter className="w-4 h-4 text-slate-400 ml-2" />
                        <select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            className="bg-transparent border-none focus:ring-0 text-sm text-slate-200"
                        >
                            {Array.from({ length: 12 }, (_, i) => (
                                <option key={i} value={i}>
                                    {new Date(0, i).toLocaleString('default', { month: 'short' })}
                                </option>
                            ))}
                        </select>
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(Number(e.target.value))}
                            className="bg-transparent border-none focus:ring-0 text-sm text-slate-200"
                        >
                            <option value={currentYear}>{currentYear}</option>
                        </select>
                    </div>

                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="input-neon pl-10 py-2 text-sm"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={downloadCSV}
                        className="btn-ghost-neon flex items-center justify-center gap-2"
                        disabled={filteredExpenses.length === 0}
                    >
                        <Download className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="glass-panel rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-slate-400 text-sm uppercase tracking-wider">
                        <tr>
                            <th className="p-4 pl-6">Title</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Amount</th>
                            <th className="p-4 pr-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        <AnimatePresence>
                            {filteredExpenses.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-slate-500">
                                        No transactions found for this period.
                                    </td>
                                </tr>
                            ) : (
                                filteredExpenses.map((expense) => (
                                    <motion.tr
                                        key={expense._id || expense.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, height: 0 }}
                                        layout
                                        className="hover:bg-white/5 transition-colors"
                                    >
                                        <td className="p-4 pl-6 font-medium text-slate-200">{expense.title}</td>
                                        <td className="p-4">
                                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-teal-500/10 text-teal-400 border border-teal-500/20">
                                                {expense.category}
                                            </span>
                                        </td>
                                        <td className="p-4 text-slate-400 text-sm">
                                            {new Date(expense.date || expense.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 font-bold text-slate-200">
                                            -₹{Number(expense.amount).toFixed(2)}
                                        </td>
                                        <td className="p-4 pr-6 text-right">
                                            <button
                                                onClick={() => deleteExpense(expense._id || expense.id)}
                                                className="text-slate-500 hover:text-red-400 p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Expenses;