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

    const [budgetHealth, setBudgetHealth] = useState({
        totalSpent: 0,
        remaining: 0,
        percentage: 0,
        categoryUsage: {},
        categoryStatus: {}
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

            const expensesRes = await axios.get(`${API_URL}/api/expenses`, config);
            const budgetRes = await axios.get(
                `${API_URL}/api/budget?month=${currentMonth}&year=${currentYear}`,
                config
            );

            const expensesData = Array.isArray(expensesRes.data)
                ? expensesRes.data
                : Array.isArray(expensesRes.data?.expenses)
                ? expensesRes.data.expenses
                : [];

            setExpenses(expensesData);

            setBudget(
                budgetRes.data?.totalBudget
                    ? budgetRes.data
                    : {
                          totalBudget: 0,
                          categoryLimits: {},
                          month: currentMonth,
                          year: currentYear
                      }
            );
        } catch (error) {
            console.error('Error fetching data:', error);
            setExpenses([]);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        const safeExpenses = Array.isArray(expenses) ? expenses : [];

        const totalSpent = safeExpenses.reduce(
            (acc, curr) => acc + Number(curr.amount || 0),
            0
        );

        const categoryUsage = {};
        safeExpenses.forEach((exp) => {
            const category = exp.category || 'Other';
            categoryUsage[category] =
                (categoryUsage[category] || 0) + Number(exp.amount || 0);
        });

        const categoryStatus = {};
        if (budget.categoryLimits) {
            Object.keys(budget.categoryLimits).forEach((cat) => {
                const limit = Number(budget.categoryLimits[cat] || 0);
                const spent = Number(categoryUsage[cat] || 0);

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
            remaining: Math.max((budget.totalBudget || 0) - totalSpent, 0),
            percentage:
                budget.totalBudget > 0
                    ? (totalSpent / budget.totalBudget) * 100
                    : 0,
            categoryUsage,
            categoryStatus
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

            const { data } = await axios.post(
                `${API_URL}/api/budget`,
                payload,
                config
            );

            setBudget(data);
            return { success: true };
        } catch (error) {
            console.error('Error saving budget:', error);
            return { success: false, message: error.message };
        }
    };

    const addExpense = async (expenseData) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` },
            };

            const { data } = await axios.post(
                `${API_URL}/api/expenses`,
                expenseData,
                config
            );

            setExpenses((prev) => {
                const safePrev = Array.isArray(prev) ? prev : [];
                return [data, ...safePrev];
            });

            return { success: true };
        } catch (error) {
            console.error('Error adding expense:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to save budget'
            };
        }
    };

    const deleteExpense = async (id) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` },
            };

            await axios.delete(`${API_URL}/api/expenses/${id}`, config);

            setExpenses((prev) => {
                const safePrev = Array.isArray(prev) ? prev : [];
                return safePrev.filter((exp) => exp._id !== id);
            });
        } catch (error) {
            console.error('Error deleting expense:', error);
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