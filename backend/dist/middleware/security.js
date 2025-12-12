"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.xssProtection = exports.securityHeaders = exports.limiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
// Rate limiting middleware
exports.limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later.",
});
// Security headers middleware
exports.securityHeaders = (0, helmet_1.default)({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
});
// XSS protection middleware
const xssProtection = (req, res, next) => {
    // Sanitize input data
    if (req.body) {
        for (const key in req.body) {
            if (typeof req.body[key] === "string") {
                // Basic XSS prevention
                req.body[key] = req.body[key]
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;");
            }
        }
    }
    next();
};
exports.xssProtection = xssProtection;
//# sourceMappingURL=security.js.map