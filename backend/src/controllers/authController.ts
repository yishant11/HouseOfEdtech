import { Request, Response } from "express";
import { registerSchema, loginSchema } from "../validation/schemas";
import { validate } from "../validation/middleware";
import { createUser, loginUser } from "../services/userService";

// Register user
export const register = [
  validate(registerSchema),
  async (req: Request, res: Response): Promise<void> => {
    try {
      console.log(req.body);
      const result = await createUser(req.body);
      console.log(result);
      if (result.success) {
        res.status(201).json(result.data);
      } else {
        res.status(400).json({ message: result.message });
      }
    } catch (error) {
      res.status(500).json({ message: "Error registering user", error });
    }
  },
];

// Login user
export const login = [
  validate(loginSchema),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await loginUser(req.body);
      if (result.success) {
        res.status(200).json(result.data);
      } else {
        res.status(401).json({ message: result.message });
      }
    } catch (error) {
      res.status(500).json({ message: "Error logging in", error });
    }
  },
];

// Get user profile
export const getProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // req.user is set by the protect middleware
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
};
