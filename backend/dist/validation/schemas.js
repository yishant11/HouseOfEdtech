"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = exports.adminUpdateUserSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
// User validation schemas
exports.registerSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be at most 50 characters"),
    email: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters long"),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z.string().min(1, "Password is required"),
});
// Admin schema for updating user roles
exports.adminUpdateUserSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be at most 50 characters")
        .optional(),
    email: zod_1.z.string().email("Invalid email address").optional(),
    isAdmin: zod_1.z.boolean().optional(),
});
// Product validation schemas
exports.productSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(2, "Product name must be at least 2 characters")
        .max(100, "Product name must be at most 100 characters"),
    description: zod_1.z
        .string()
        .min(10, "Description must be at least 10 characters")
        .max(1000, "Description must be at most 1000 characters"),
    price: zod_1.z.number().positive("Price must be a positive number"),
    category: zod_1.z
        .string()
        .min(2, "Category must be at least 2 characters")
        .max(50, "Category must be at most 50 characters"),
    inStock: zod_1.z.boolean(),
});
//# sourceMappingURL=schemas.js.map