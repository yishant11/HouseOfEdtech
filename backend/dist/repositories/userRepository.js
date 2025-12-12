"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const User_1 = __importDefault(require("../models/User"));
exports.userRepository = {
    // Find user by email
    findByEmail: async (email) => {
        return await User_1.default.findOne({ email });
    },
    // Find user by ID
    findById: async (id) => {
        return await User_1.default.findById(id).select("-password");
    },
    // Find user by ID with password
    findByIdWithPassword: async (id) => {
        return await User_1.default.findById(id);
    },
    // Create new user
    create: async (userData) => {
        const user = new User_1.default(userData);
        return await user.save();
    },
    // Find all users
    findAll: async () => {
        return await User_1.default.find().select("-password");
    },
    // Update user by ID
    updateById: async (id, updateData) => {
        return await User_1.default.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        }).select("-password");
    },
    // Delete user by ID
    deleteById: async (id) => {
        return await User_1.default.findByIdAndDelete(id);
    },
};
//# sourceMappingURL=userRepository.js.map