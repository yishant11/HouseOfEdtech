"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getAllProducts = void 0;
const Product_1 = __importDefault(require("../models/Product"));
// Get all products
const getAllProducts = async () => {
    try {
        const products = await Product_1.default.find();
        return { success: true, data: products };
    }
    catch (error) {
        return { success: false, message: "Error fetching products", error };
    }
};
exports.getAllProducts = getAllProducts;
// Get product by ID
const getProductById = async (id) => {
    try {
        const product = await Product_1.default.findById(id);
        if (!product) {
            return { success: false, message: "Product not found" };
        }
        return { success: true, data: product };
    }
    catch (error) {
        return { success: false, message: "Error fetching product", error };
    }
};
exports.getProductById = getProductById;
// Create product
const createProduct = async (productData) => {
    try {
        const { name, description, price, category, inStock } = productData;
        const product = new Product_1.default({
            name,
            description,
            price,
            category,
            inStock,
        });
        const savedProduct = await product.save();
        return { success: true, data: savedProduct };
    }
    catch (error) {
        return { success: false, message: "Error creating product", error };
    }
};
exports.createProduct = createProduct;
// Update product
const updateProduct = async (id, productData) => {
    try {
        const { name, description, price, category, inStock } = productData;
        const product = await Product_1.default.findByIdAndUpdate(id, { name, description, price, category, inStock }, { new: true, runValidators: true });
        if (!product) {
            return { success: false, message: "Product not found" };
        }
        return { success: true, data: product };
    }
    catch (error) {
        return { success: false, message: "Error updating product", error };
    }
};
exports.updateProduct = updateProduct;
// Delete product
const deleteProduct = async (id) => {
    try {
        const product = await Product_1.default.findByIdAndDelete(id);
        if (!product) {
            return { success: false, message: "Product not found" };
        }
        return { success: true, message: "Product deleted successfully" };
    }
    catch (error) {
        return { success: false, message: "Error deleting product", error };
    }
};
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=productService.js.map