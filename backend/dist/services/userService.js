"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = exports.deleteUser = exports.updateUser = exports.loginUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const auth_1 = require("../utils/auth");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Generate JWT token
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET || "fallback_secret", {
        expiresIn: "30d",
    });
};
// Get all users
const getAllUsers = async () => {
    try {
        const users = await User_1.default.find().select("-password");
        return { success: true, data: users };
    }
    catch (error) {
        return { success: false, message: "Error fetching users", error };
    }
};
exports.getAllUsers = getAllUsers;
// Get user by ID
const getUserById = async (id) => {
    try {
        const user = await User_1.default.findById(id).select("-password");
        if (!user) {
            return { success: false, message: "User not found" };
        }
        return { success: true, data: user };
    }
    catch (error) {
        return { success: false, message: "Error fetching user", error };
    }
};
exports.getUserById = getUserById;
// Create user (register)
const createUser = async (userData) => {
    try {
        const { name, email, password } = userData;
        // Check if user already exists
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            return { success: false, message: "User already exists" };
        }
        // Hash password
        const hashedPassword = await (0, auth_1.hashPassword)(password);
        // Create user
        const user = new User_1.default({
            name,
            email,
            password: hashedPassword,
        });
        const savedUser = await user.save();
        return {
            success: true,
            data: {
                _id: savedUser._id.toString(),
                name: savedUser.name,
                email: savedUser.email,
                token: generateToken(savedUser._id.toString()),
            },
        };
    }
    catch (error) {
        return { success: false, message: "Error creating user", error };
    }
};
exports.createUser = createUser;
// Login user
const loginUser = async (credentials) => {
    try {
        const { email, password } = credentials;
        // Find user by email
        const user = await User_1.default.findOne({ email });
        if (!user) {
            return { success: false, message: "Invalid email or password" };
        }
        // Check password
        const isMatch = await (0, auth_1.comparePassword)(password, user.password);
        if (!isMatch) {
            return { success: false, message: "Invalid email or password" };
        }
        return {
            success: true,
            data: {
                _id: user._id.toString(),
                name: user.name,
                email: user.email,
                token: generateToken(user._id.toString()),
            },
        };
    }
    catch (error) {
        return { success: false, message: "Error logging in", error };
    }
};
exports.loginUser = loginUser;
// Update user
const updateUser = async (id, updateData) => {
    try {
        const user = await User_1.default.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        }).select("-password");
        if (!user) {
            return { success: false, message: "User not found" };
        }
        return { success: true, data: user };
    }
    catch (error) {
        return { success: false, message: "Error updating user", error };
    }
};
exports.updateUser = updateUser;
// Delete user
const deleteUser = async (id) => {
    try {
        const user = await User_1.default.findByIdAndDelete(id);
        if (!user) {
            return { success: false, message: "User not found" };
        }
        return { success: true, message: "User deleted successfully" };
    }
    catch (error) {
        return { success: false, message: "Error deleting user", error };
    }
};
exports.deleteUser = deleteUser;
// Get user profile
const getUserProfile = async (userId) => {
    try {
        const user = await User_1.default.findById(userId).select("-password");
        if (!user) {
            return { success: false, message: "User not found" };
        }
        return { success: true, data: user };
    }
    catch (error) {
        return { success: false, message: "Error fetching profile", error };
    }
};
exports.getUserProfile = getUserProfile;
//# sourceMappingURL=userService.js.map