"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.route("/").get(auth_1.protect, userController_1.getUsers);
router.route("/profile").get(auth_1.protect, userController_1.getProfile).put(auth_1.protect, userController_1.updateProfile);
// Regular user update endpoint
router.route("/:id").put(auth_1.protect, userController_1.updateUserController);
// Admin-only endpoint for updating user roles
router.route("/:id/role").put(auth_1.protect, auth_1.admin, userController_1.updateUserRoleController);
// Admin-only endpoints for getting, deleting users
router
    .route("/:id")
    .get(auth_1.protect, auth_1.admin, userController_1.getUserByIdController)
    .delete(auth_1.protect, auth_1.admin, userController_1.deleteUserController);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map