import Product, { IProduct } from "../models/Product";
import { ProductInput } from "../validation/schemas";

// Get all products
export const getAllProducts = async () => {
  try {
    const products = await Product.find();
    return { success: true, data: products };
  } catch (error) {
    return { success: false, message: "Error fetching products", error };
  }
};

// Get product by ID
export const getProductById = async (id: string) => {
  try {
    const product = await Product.findById(id);
    if (!product) {
      return { success: false, message: "Product not found" };
    }
    return { success: true, data: product };
  } catch (error) {
    return { success: false, message: "Error fetching product", error };
  }
};

// Create product
export const createProduct = async (productData: ProductInput) => {
  try {
    const { name, description, price, category, inStock } = productData;

    const product = new Product({
      name,
      description,
      price,
      category,
      inStock,
    });

    const savedProduct = await product.save();
    return { success: true, data: savedProduct };
  } catch (error) {
    return { success: false, message: "Error creating product", error };
  }
};

// Update product
export const updateProduct = async (id: string, productData: ProductInput) => {
  try {
    const { name, description, price, category, inStock } = productData;

    const product = await Product.findByIdAndUpdate(
      id,
      { name, description, price, category, inStock },
      { new: true, runValidators: true }
    );

    if (!product) {
      return { success: false, message: "Product not found" };
    }

    return { success: true, data: product };
  } catch (error) {
    return { success: false, message: "Error updating product", error };
  }
};

// Delete product
export const deleteProduct = async (id: string) => {
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return { success: false, message: "Product not found" };
    }
    return { success: true, message: "Product deleted successfully" };
  } catch (error) {
    return { success: false, message: "Error deleting product", error };
  }
};
