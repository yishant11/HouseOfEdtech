import express from "express";
import {
  getUsers,
  getUserByIdController,
  updateUserController,
  updateUserRoleController,
  deleteUserController,
  getProfile,
  updateProfile,
} from "../controllers/userController";
import { protect, admin } from "../middleware/auth";

const router = express.Router();

router.route("/").get(protect, getUsers);
router.route("/profile").get(protect, getProfile).put(protect, updateProfile);

// Regular user update endpoint
router.route("/:id").put(protect, updateUserController);

// Admin-only endpoint for updating user roles
router.route("/:id/role").put(protect, admin, updateUserRoleController);

// Admin-only endpoints for getting, deleting users
router
  .route("/:id")
  .get(protect, admin, getUserByIdController)
  .delete(protect, admin, deleteUserController);

export default router;
