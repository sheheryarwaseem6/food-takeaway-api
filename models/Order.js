const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
        quantity: {
            type: Number,
            default: 1,
        },
    }],
    orderId: {
        type: Number
    },
    orderPrice: {
        type: Number,
        required: true
    },
    orderStatus: {
        type: Number,
        required: true,
        default: 0
    },
},
    { timestamps: true }
);
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;