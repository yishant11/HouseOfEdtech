import { Request, Response } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";
import { productSchema } from "../validation/schemas";
import { validate } from "../validation/middleware";

// Get all products
export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await getAllProducts();
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(500).json({ message: result.message });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// Get product by ID
export const getProductByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await getProductById(req.params.id);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({ message: result.message });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

// Create product
export const createProductController = [
  validate(productSchema),
  async (req: Request, res: Response): Promise<void> => {
    try {
      // Log the request body for debugging
      console.log("Received product data:", req.body);

      const result = await createProduct(req.body);
      if (result.success) {
        res.status(201).json(result.data);
      } else {
        res.status(400).json({ message: result.message });
      }
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ message: "Error creating product", error });
    }
  },
];

// Update product
export const updateProductController = [
  validate(productSchema),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await updateProduct(req.params.id, req.body);
      if (result.success) {
        res.status(200).json(result.data);
      } else {
        res.status(404).json({ message: result.message });
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating product", error });
    }
  },
];

// Delete product
export const deleteProductController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await deleteProduct(req.params.id);
    if (result.success) {
      res.status(200).json({ message: result.message });
    } else {
      res.status(404).json({ message: result.message });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};
