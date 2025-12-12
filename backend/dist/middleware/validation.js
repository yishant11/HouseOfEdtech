"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidationRules = exports.userValidationRules = exports.handleValidationErrors = void 0;
const express_validator_1 = require("express-validator");
// Handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            message: "Validation failed",
            errors: errors.array(),
        });
        return;
    }
    next();
};
exports.handleValidationErrors = handleValidationErrors;
// User validation rules
const userValidationRules = () => {
    return [
        (0, express_validator_1.body)("name")
            .notEmpty()
            .withMessage("Name is required")
            .isLength({ min: 2, max: 50 })
            .withMessage("Name must be between 2 and 50 characters"),
        (0, express_validator_1.body)("email")
            .isEmail()
            .normalizeEmail()
            .withMessage("Valid email is required"),
        (0, express_validator_1.body)("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters long"),
    ];
};
exports.userValidationRules = userValidationRules;
// Product validation rules
const productValidationRules = () => {
    return [
        (0, express_validator_1.body)("name")
            .notEmpty()
            .withMessage("Product name is required")
            .isLength({ min: 2, max: 100 })
            .withMessage("Product name must be between 2 and 100 characters"),
        (0, express_validator_1.body)("description")
            .notEmpty()
            .withMessage("Product description is required")
            .isLength({ min: 10, max: 1000 })
            .withMessage("Product description must be between 10 and 1000 characters"),
        (0, express_validator_1.body)("price")
            .isFloat({ gt: 0 })
            .withMessage("Price must be a positive number"),
        (0, express_validator_1.body)("category")
            .notEmpty()
            .withMessage("Category is required")
            .isLength({ min: 2, max: 50 })
            .withMessage("Category must be between 2 and 50 characters"),
        (0, express_validator_1.body)("inStock").isBoolean().withMessage("InStock must be a boolean value"),
    ];
};
exports.productValidationRules = productValidationRules;
//# sourceMappingURL=validation.js.map