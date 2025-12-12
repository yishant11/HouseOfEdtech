"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "fallback_secret");
            req.user = await User_1.default.findById(decoded.id).select("-password");
            next();
            return;
        }
        catch (error) {
            console.error(error);
            res.status(401).json({ message: "Not authorized, token failed" });
            return;
        }
    }
    if (!token) {
        res.status(401).json({ message: "Not authorized, no token" });
        return;
    }
};
exports.protect = protect;
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
        return;
    }
    else {
        res.status(401).json({ message: "Not authorized as an admin" });
        return;
    }
};
exports.admin = admin;
//# sourceMappingURL=auth.js.map