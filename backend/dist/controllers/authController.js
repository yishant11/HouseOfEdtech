"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.login = exports.register = void 0;
const schemas_1 = require("../validation/schemas");
const middleware_1 = require("../validation/middleware");
const userService_1 = require("../services/userService");
// Register user
exports.register = [
    (0, middleware_1.validate)(schemas_1.registerSchema),
    async (req, res) => {
        try {
            console.log(req.body);
            const result = await (0, userService_1.createUser)(req.body);
            console.log(result);
            if (result.success) {
                res.status(201).json(result.data);
            }
            else {
                res.status(400).json({ message: result.message });
            }
        }
        catch (error) {
            res.status(500).json({ message: "Error registering user", error });
        }
    },
];
// Login user
exports.login = [
    (0, middleware_1.validate)(schemas_1.loginSchema),
    async (req, res) => {
        try {
            const result = await (0, userService_1.loginUser)(req.body);
            if (result.success) {
                res.status(200).json(result.data);
            }
            else {
                res.status(401).json({ message: result.message });
            }
        }
        catch (error) {
            res.status(500).json({ message: "Error logging in", error });
        }
    },
];
// Get user profile
const getProfile = async (req, res) => {
    try {
        // req.user is set by the protect middleware
        res.status(200).json(req.user);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching profile", error });
    }
};
exports.getProfile = getProfile;
//# sourceMappingURL=authController.js.map