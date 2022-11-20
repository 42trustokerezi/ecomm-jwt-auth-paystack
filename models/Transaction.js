const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema(
    {
        transactionType: {
            type: String,
            requried: true
        },
        customerName: {
            type: String,
            requried: true
        },
        customerEmail: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            required: true, 
            enum: ["USD", "EUR", "GBP", "NGN"]
        },
        reference: {
            type: String,
            required: true
        },
        paymentStatus: {
            type: String,
            enum: ["success", "failure", "pending"], 
            default: "pending"
        },
        paymentGateway: {
            type: String,
            required: [true, "payment gateway required"],
            enum: ["paystack"] // current payment gateway
        },
    },
    { timestamps: true}
);

module.exports = mongoose.model("Transaction", TransactionSchema);