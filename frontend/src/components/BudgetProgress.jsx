import React from 'react';
import { motion } from 'framer-motion';

const BudgetProgress = ({ category, spent, limit, delay = 0 }) => {
    const percentage = limit > 0 ? Math.min((spent / limit) * 100, 100) : (spent > 0 ? 100 : 0);

    let colorClass = "from-teal-500 to-cyan-500";
    let bgClass = "bg-teal-500/10";
    let textClass = "text-teal-500";

    if (percentage >= 90) {
        colorClass = "from-red-500 to-orange-500";
        bgClass = "bg-red-500/10";
        textClass = "text-red-500";
    } else if (percentage >= 70) {
        colorClass = "from-yellow-400 to-orange-400";
        bgClass = "bg-yellow-500/10";
        textClass = "text-yellow-500";
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="p-4 border border-slate-200 dark:border-slate-800 rounded-xl bg-white/50 dark:bg-slate-900/50"
        >
            <div className="flex justify-between items-end mb-2">
                <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200">{category}</h4>
                    <p className="text-xs text-slate-500">
                        {limit > 0 ? `Limit: ₹${limit.toLocaleString()}` : "No Limit Set"}
                    </p>
                </div>
                <div className="text-right">
                    <span className={`font-bold ${textClass}`}>
                        ₹{spent.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-400 block">
                        Category Limit Usage: {percentage.toFixed(0)}%
                    </span>
                </div>
            </div>

            <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    className={`h-full bg-gradient-to-r ${colorClass}`}
                />
            </div>
        </motion.div>
    );
};

export default BudgetProgress;
