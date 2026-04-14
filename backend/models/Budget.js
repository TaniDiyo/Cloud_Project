import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    totalBudget: {
        type: Number,
        required: true,
        default: 0,
    },
    categoryLimits: {
        type: Map,
        of: Number,
        default: {},
    },
    month: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true,
});

budgetSchema.index({ userId: 1, month: 1, year: 1 }, { unique: true });

export default mongoose.model("Budget", budgetSchema);
