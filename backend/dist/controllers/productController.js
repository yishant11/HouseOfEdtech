"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductController = exports.updateProductController = exports.createProductController = exports.getProductByIdController = exports.getProducts = void 0;
const productService_1 = require("../services/productService");
const schemas_1 = require("../validation/schemas");
const middleware_1 = require("../validation/middleware");
// Get all products
const getProducts = async (req, res) => {
    try {
        const result = await (0, productService_1.getAllProducts)();
        if (result.success) {
            res.status(200).json(result.data);
        }
        else {
            res.status(500).json({ message: result.message });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
};
exports.getProducts = getProducts;
// Get product by ID
const getProductByIdController = async (req, res) => {
    try {
        const result = await (0, productService_1.getProductById)(req.params.id);
        if (result.success) {
            res.status(200).json(result.data);
        }
        else {
            res.status(404).json({ message: result.message });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching product", error });
    }
};
exports.getProductByIdController = getProductByIdController;
// Create product
exports.createProductController = [
    (0, middleware_1.validate)(schemas_1.productSchema),
    async (req, res) => {
        try {
            // Log the request body for debugging
            console.log("Received product data:", req.body);
            const result = await (0, productService_1.createProduct)(req.body);
            if (result.success) {
                res.status(201).json(result.data);
            }
            else {
                res.status(400).json({ message: result.message });
            }
        }
        catch (error) {
            console.error("Error creating product:", error);
            res.status(500).json({ message: "Error creating product", error });
        }
    },
];
// Update product
exports.updateProductController = [
    (0, middleware_1.validate)(schemas_1.productSchema),
    async (req, res) => {
        try {
            const result = await (0, productService_1.updateProduct)(req.params.id, req.body);
            if (result.success) {
                res.status(200).json(result.data);
            }
            else {
                res.status(404).json({ message: result.message });
            }
        }
        catch (error) {
            res.status(500).json({ message: "Error updating product", error });
        }
    },
];
// Delete product
const deleteProductController = async (req, res) => {
    try {
        const result = await (0, productService_1.deleteProduct)(req.params.id);
        if (result.success) {
            res.status(200).json({ message: result.message });
        }
        else {
            res.status(404).json({ message: result.message });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting product", error });
    }
};
exports.deleteProductController = deleteProductController;
//# sourceMappingURL=productController.js.map