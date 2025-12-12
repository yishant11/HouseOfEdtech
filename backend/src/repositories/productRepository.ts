import Product, { IProduct } from "../models/Product";

export const productRepository = {
  // Find all products
  findAll: async () => {
    return await Product.find();
  },

  // Find product by ID
  findById: async (id: string) => {
    return await Product.findById(id);
  },

  // Create new product
  create: async (productData: Partial<IProduct>) => {
    const product = new Product(productData);
    return await product.save();
  },

  // Update product by ID
  updateById: async (id: string, updateData: Partial<IProduct>) => {
    return await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  },

  // Delete product by ID
  deleteById: async (id: string) => {
    return await Product.findByIdAndDelete(id);
  },
};
