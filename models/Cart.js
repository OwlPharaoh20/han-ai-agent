"use strict";
// File: /models/Cart.ts
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var CartItemSchema = new mongoose_1.default.Schema({
    productId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
});
var CartSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    items: [CartItemSchema],
}, { timestamps: true });
var Cart = mongoose_1.default.model('Cart', CartSchema);
exports.default = Cart;
