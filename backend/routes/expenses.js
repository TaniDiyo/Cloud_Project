import express from "express";
import Expense from "../models/Expense.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc    Get all expenses
// @route   GET /api/expenses
// @access  Private
router.get("/", protect, async (req, res) => {
    const expenses = await Expense.find({ userId: req.user.id }).sort({
        date: -1,
    });
    res.json(expenses);
});

// @desc    Create an expense
// @route   POST /api/expenses
// @access  Private
router.post("/", protect, async (req, res) => {
    const { title, amount, category, date } = req.body;

    if (!title || !amount || !category) {
        return res.status(400).json({ message: "Please fill in all fields" });
    }

    const expense = await Expense.create({
        userId: req.user.id,
        title,
        amount,
        category,
        date: date || Date.now(),
    });

    res.status(201).json(expense);
});

// @desc    Delete an expense
// @route   DELETE /api/expenses/:id
// @access  Private
router.delete("/:id", protect, async (req, res) => {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
        return res.status(404).json({ message: "Expense not found" });
    }

    // Ensure user owns the expense
    if (expense.userId.toString() !== req.user.id) {
        return res.status(401).json({ message: "User not authorized" });
    }

    await expense.deleteOne();
    res.json({ message: "Expense removed" });
});

export default router;
