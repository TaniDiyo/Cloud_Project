import express from "express";
import Budget from "../models/Budget.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc    Get budget for a specific month/year
// @route   GET /api/budget
// @access  Private
router.get("/", protect, async (req, res) => {
    const { month, year } = req.query;

    if (!month || !year) {
        return res.status(400).json({ message: "Please provide month and year" });
    }

    try {
        const budget = await Budget.findOne({
            userId: req.user.id,
            month: parseInt(month),
            year: parseInt(year)
        });

        if (!budget) {
            // Return empty structure if not found (frontend can handle initialization)
            return res.json({
                totalBudget: 0,
                categoryLimits: {},
                month: parseInt(month),
                year: parseInt(year)
            });
        }

        res.json(budget);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// @desc    Create or Update budget
// @route   POST /api/budget
// @access  Private
router.post("/", protect, async (req, res) => {
    const { totalBudget, categoryLimits, month, year } = req.body;

    if (totalBudget === undefined || !month || !year) {
        return res.status(400).json({ message: "Please provide all required budget fields" });
    }

    try {
        let budget = await Budget.findOne({
            userId: req.user.id,
            month: parseInt(month),
            year: parseInt(year)
        });

        if (budget) {
            // Update existing
            budget.totalBudget = totalBudget;
            budget.categoryLimits = categoryLimits || {};
            await budget.save();
            return res.json(budget);
        }

        // Create new
        budget = await Budget.create({
            userId: req.user.id,
            totalBudget,
            categoryLimits: categoryLimits || {},
            month,
            year
        });

        res.status(201).json(budget);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

export default router;
