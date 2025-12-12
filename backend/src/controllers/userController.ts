import { Request, Response } from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserProfile,
} from "../services/userService";
import { registerSchema, adminUpdateUserSchema } from "../validation/schemas";
import { validate } from "../validation/middleware";

// Get all users
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await getAllUsers();
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(500).json({ message: result.message });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// Get user by ID
export const getUserByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await getUserById(req.params.id);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({ message: result.message });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

// Update user (for general updates)
export const updateUserController = [
  validate(registerSchema),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await updateUser(req.params.id, req.body);
      if (result.success) {
        res.status(200).json(result.data);
      } else {
        res.status(404).json({ message: result.message });
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating user", error });
    }
  },
];

// Update user role (for admin updates)
export const updateUserRoleController = [
  validate(adminUpdateUserSchema),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await updateUser(req.params.id, req.body);
      if (result.success) {
        res.status(200).json(result.data);
      } else {
        res.status(404).json({ message: result.message });
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating user role", error });
    }
  },
];

// Delete user
export const deleteUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await deleteUser(req.params.id);
    if (result.success) {
      res.status(200).json({ message: result.message });
    } else {
      res.status(404).json({ message: result.message });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

// Get user profile
export const getProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // req.user is set by the protect middleware
    const result = await getUserProfile(req.user._id);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({ message: result.message });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
};

// Update user profile
export const updateProfile = [
  validate(registerSchema),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await updateUser(req.user._id, req.body);
      if (result.success) {
        res.status(200).json(result.data);
      } else {
        res.status(404).json({ message: result.message });
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating profile", error });
    }
  },
];
