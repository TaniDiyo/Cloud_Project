import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.jsx';

const API_URL = import.meta.env.VITE_API_URL;

export const useExpenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [budget, setBudget] = useState({
        totalBudget: 0,
        categoryLimits: {},
        month: new Date().getMonth(),
        year: new Date().getFullYear()
    });
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    // Derived state for easy consumption
    const [budgetHealth, setBudgetHealth] = useState({
        totalSpent: 0,
        remaining: 0,
        percentage: 0,
        categoryUsage: {}
    });

    const fetchData = useCallback(async () => {
        if (!user) return;
        setLoading(true);
        try {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` },
            };

            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();

            // Fetch Expenses
            const expensesRes = await axios.get(`${API_URL}/api/expenses`, config);

            // Fetch Budget
            const budgetRes = await axios.get(`${API_URL}/api/budget?month=${currentMonth}&year=${currentYear}`, config);

            setExpenses(expensesRes.data);
            setBudget(budgetRes.data.totalBudget ? budgetRes.data : {
                totalBudget: 0,
                categoryLimits: {},
                month: currentMonth,
                year: currentYear
            });

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Calculate Health whenever expenses or budget changes
    useEffect(() => {
        const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);

        const categoryUsage = {};
        expenses.forEach(exp => {
            categoryUsage[exp.category] = (categoryUsage[exp.category] || 0) + exp.amount;
        });

        // Compute detailed status per category
        const categoryStatus = {};
        if (budget.categoryLimits) {
            Object.keys(budget.categoryLimits).forEach(cat => {
                const limit = budget.categoryLimits[cat] || 0;
                const spent = categoryUsage[cat] || 0;
                categoryStatus[cat] = {
                    limit,
                    spent,
                    remaining: limit - spent,
                    percentage: limit > 0 ? (spent / limit) * 100 : 0
                };
            });
        }

        setBudgetHealth({
            totalSpent,
            remaining: Math.max(budget.totalBudget - totalSpent, 0),
            percentage: budget.totalBudget > 0 ? (totalSpent / budget.totalBudget) * 100 : 0,
            categoryUsage, // Raw usage
            categoryStatus // Usage vs Limit
        });

    }, [expenses, budget]);

    const saveBudget = async (newBudget) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` },
            };
            const payload = {
                ...newBudget,
                month: new Date().getMonth(),
                year: new Date().getFullYear()
            };
            const { data } = await axios.post(`${API_URL}/api/budget`, payload, config);
            setBudget(data);
            return { success: true };
        } catch (error) {
            // Test case: API failure or unauthorized access
            console.error("Error saving budget:", error);
            return { success: false, message: error.message };
        }
    };

    const addExpense = async (expenseData) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` },
            };
            const { data } = await axios.post(`${API_URL}/api/expenses`, expenseData, config);
            setExpenses((prev) => [data, ...prev]);
            return { success: true };
        } catch (error) {
            console.error("Error adding expense:", error);
            return {
    		success: false,
    		message: error.response?.data?.message || "Failed to save budget"
	    };

        }
    };

    const deleteExpense = async (id) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` },
            };
            await axios.delete(`${API_URL}/api/expenses/${id}`, config);
            setExpenses((prev) => prev.filter((exp) => exp._id !== id));
        } catch (error) {
            console.error("Error deleting expense:", error);
        }
    };

    return {
        expenses,
        budget,
        budgetHealth,
        loading,
        addExpense,
        deleteExpense,
        saveBudget,
        refreshData: fetchData
    };
};
