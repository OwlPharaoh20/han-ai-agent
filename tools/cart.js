"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCart = getCart;
exports.addToCart = addToCart;
exports.removeFromCart = removeFromCart;
exports.clearCart = clearCart;
exports.viewCart = viewCart;
// /tools/cart.ts
var Cart_1 = require("../models/Cart");
function getCart(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var cart;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Cart_1.default.findOne({ userId: userId })];
                case 1:
                    cart = _a.sent();
                    return [2 /*return*/, cart || { userId: userId, items: [] }];
            }
        });
    });
}
function addToCart(userId, item) {
    return __awaiter(this, void 0, void 0, function () {
        var cart, existingItem, newCart;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Cart_1.default.findOne({ userId: userId })];
                case 1:
                    cart = _a.sent();
                    if (!cart) return [3 /*break*/, 3];
                    existingItem = cart.items.find(function (i) { return i.productId === item.productId; });
                    if (existingItem) {
                        existingItem.quantity += item.quantity || 1;
                    }
                    else {
                        cart.items.push(item);
                    }
                    return [4 /*yield*/, cart.save()];
                case 2:
                    _a.sent();
                    return [2 /*return*/, cart];
                case 3: return [4 /*yield*/, Cart_1.default.create({ userId: userId, items: [item] })];
                case 4:
                    newCart = _a.sent();
                    return [2 /*return*/, newCart];
            }
        });
    });
}
function removeFromCart(userId, productId) {
    return __awaiter(this, void 0, void 0, function () {
        var cart;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Cart_1.default.findOne({ userId: userId })];
                case 1:
                    cart = _a.sent();
                    if (!cart)
                        return [2 /*return*/, null];
                    cart.items = cart.items.filter(function (i) { return i.productId !== productId; });
                    return [4 /*yield*/, cart.save()];
                case 2:
                    _a.sent();
                    return [2 /*return*/, cart];
            }
        });
    });
}
function clearCart(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var cart;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Cart_1.default.findOne({ userId: userId })];
                case 1:
                    cart = _a.sent();
                    if (!cart)
                        return [2 /*return*/, null];
                    cart.items = [];
                    return [4 /*yield*/, cart.save()];
                case 2:
                    _a.sent();
                    return [2 /*return*/, cart];
            }
        });
    });
}
function viewCart(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var cart;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getCart(userId)];
                case 1:
                    cart = _a.sent();
                    if (!cart || !cart.items || cart.items.length === 0)
                        return [2 /*return*/, "🛒 Your cart is empty."];
                    return [2 /*return*/, cart.items
                            .map(function (item) {
                            return "\u2022 ".concat(item.name, " (").concat(item.quantity, ") \u2013 $").concat(item.price);
                        })
                            .join("\n")];
            }
        });
    });
}
