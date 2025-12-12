"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRepository = void 0;
const Product_1 = __importDefault(require("../models/Product"));
exports.productRepository = {
    // Find all products
    findAll: async () => {
        return await Product_1.default.find();
    },
    // Find product by ID
    findById: async (id) => {
        return await Product_1.default.findById(id);
    },
    // Create new product
    create: async (productData) => {
        const product = new Product_1.default(productData);
        return await product.save();
    },
    // Update product by ID
    updateById: async (id, updateData) => {
        return await Product_1.default.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });
    },
    // Delete product by ID
    deleteById: async (id) => {
        return await Product_1.default.findByIdAndDelete(id);
    },
};
//# sourceMappingURL=productRepository.js.map