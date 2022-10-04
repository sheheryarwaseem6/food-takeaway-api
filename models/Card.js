const mongoose = require('mongoose');
const categoriesSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    cardNumber: {
        type: Number,
        require: true,
    },
    exp_month: {
        type: Number,
        required: true,
    },
    exp_year: {
        type: Number,
        required: true,
    },
    cvv: {
        type: Number,
        required: true,
    },
},
    { timestamps: true }
);
const CardDetails = mongoose.model('CardDetails', categoriesSchema);
module.exports = CardDetails;