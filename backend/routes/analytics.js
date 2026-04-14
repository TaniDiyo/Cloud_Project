import express from "express";
import Expense from "../models/Expense.js";
import protect from "../middleware/authMiddleware.js";
import mongoose from "mongoose";

const router = express.Router();

// @desc    Get expense summary by category
// @route   GET /api/analytics/summary
// @access  Private
router.get("/summary", protect, async (req, res) => {
    const data = await Expense.aggregate([
        {
            $match: { userId: new mongoose.Types.ObjectId(req.user.id) },
        },
        {
            $group: {
                _id: "$category",
                total: { $sum: "$amount" },
                count: { $sum: 1 },
            },
        },
        {
            $sort: { total: -1 },
        },
    ]);

    res.json(data);
});

export default router;
