"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.route("/").get(productController_1.getProducts).post(productController_1.createProductController);
router
    .route("/:id")
    .get(productController_1.getProductByIdController)
    .put(auth_1.protect, auth_1.admin, productController_1.updateProductController)
    .delete(auth_1.protect, auth_1.admin, productController_1.deleteProductController);
exports.default = router;
//# sourceMappingURL=productRoutes.js.map