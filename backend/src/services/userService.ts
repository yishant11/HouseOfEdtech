import User, { IUser } from "../models/User";
import { hashPassword, comparePassword } from "../utils/auth";
import jwt from "jsonwebtoken";
import { RegisterInput, LoginInput } from "../validation/schemas";

// Generate JWT token
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "fallback_secret", {
    expiresIn: "30d",
  });
};

// Get all users
export const getAllUsers = async () => {
  try {
    const users = await User.find().select("-password");
    return { success: true, data: users };
  } catch (error) {
    return { success: false, message: "Error fetching users", error };
  }
};

// Get user by ID
export const getUserById = async (id: string) => {
  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      return { success: false, message: "User not found" };
    }
    return { success: true, data: user };
  } catch (error) {
    return { success: false, message: "Error fetching user", error };
  }
};

// Create user (register)
export const createUser = async (userData: RegisterInput) => {
  try {
    const { name, email, password } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { success: false, message: "User already exists" };
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = new User({
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
  } catch (error) {
    return { success: false, message: "Error creating user", error };
  }
};

// Login user
export const loginUser = async (credentials: LoginInput) => {
  try {
    const { email, password } = credentials;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return { success: false, message: "Invalid email or password" };
    }

    // Check password
    const isMatch = await comparePassword(password, user.password);
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
  } catch (error) {
    return { success: false, message: "Error logging in", error };
  }
};

// Update user
export const updateUser = async (id: string, updateData: Partial<IUser>) => {
  try {
    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      return { success: false, message: "User not found" };
    }

    return { success: true, data: user };
  } catch (error) {
    return { success: false, message: "Error updating user", error };
  }
};

// Delete user
export const deleteUser = async (id: string) => {
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return { success: false, message: "User not found" };
    }
    return { success: true, message: "User deleted successfully" };
  } catch (error) {
    return { success: false, message: "Error deleting user", error };
  }
};

// Get user profile
export const getUserProfile = async (userId: string) => {
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return { success: false, message: "User not found" };
    }
    return { success: true, data: user };
  } catch (error) {
    return { success: false, message: "Error fetching profile", error };
  }
};
