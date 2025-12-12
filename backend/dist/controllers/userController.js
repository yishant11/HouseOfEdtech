"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getProfile = exports.deleteUserController = exports.updateUserRoleController = exports.updateUserController = exports.getUserByIdController = exports.getUsers = void 0;
const userService_1 = require("../services/userService");
const schemas_1 = require("../validation/schemas");
const middleware_1 = require("../validation/middleware");
// Get all users
const getUsers = async (req, res) => {
    try {
        const result = await (0, userService_1.getAllUsers)();
        if (result.success) {
            res.status(200).json(result.data);
        }
        else {
            res.status(500).json({ message: result.message });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
};
exports.getUsers = getUsers;
// Get user by ID
const getUserByIdController = async (req, res) => {
    try {
        const result = await (0, userService_1.getUserById)(req.params.id);
        if (result.success) {
            res.status(200).json(result.data);
        }
        else {
            res.status(404).json({ message: result.message });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching user", error });
    }
};
exports.getUserByIdController = getUserByIdController;
// Update user (for general updates)
exports.updateUserController = [
    (0, middleware_1.validate)(schemas_1.registerSchema),
    async (req, res) => {
        try {
            const result = await (0, userService_1.updateUser)(req.params.id, req.body);
            if (result.success) {
                res.status(200).json(result.data);
            }
            else {
                res.status(404).json({ message: result.message });
            }
        }
        catch (error) {
            res.status(500).json({ message: "Error updating user", error });
        }
    },
];
// Update user role (for admin updates)
exports.updateUserRoleController = [
    (0, middleware_1.validate)(schemas_1.adminUpdateUserSchema),
    async (req, res) => {
        try {
            const result = await (0, userService_1.updateUser)(req.params.id, req.body);
            if (result.success) {
                res.status(200).json(result.data);
            }
            else {
                res.status(404).json({ message: result.message });
            }
        }
        catch (error) {
            res.status(500).json({ message: "Error updating user role", error });
        }
    },
];
// Delete user
const deleteUserController = async (req, res) => {
    try {
        const result = await (0, userService_1.deleteUser)(req.params.id);
        if (result.success) {
            res.status(200).json({ message: result.message });
        }
        else {
            res.status(404).json({ message: result.message });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
};
exports.deleteUserController = deleteUserController;
// Get user profile
const getProfile = async (req, res) => {
    try {
        // req.user is set by the protect middleware
        const result = await (0, userService_1.getUserProfile)(req.user._id);
        if (result.success) {
            res.status(200).json(result.data);
        }
        else {
            res.status(404).json({ message: result.message });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching profile", error });
    }
};
exports.getProfile = getProfile;
// Update user profile
exports.updateProfile = [
    (0, middleware_1.validate)(schemas_1.registerSchema),
    async (req, res) => {
        try {
            const result = await (0, userService_1.updateUser)(req.user._id, req.body);
            if (result.success) {
                res.status(200).json(result.data);
            }
            else {
                res.status(404).json({ message: result.message });
            }
        }
        catch (error) {
            res.status(500).json({ message: "Error updating profile", error });
        }
    },
];
//# sourceMappingURL=userController.js.map