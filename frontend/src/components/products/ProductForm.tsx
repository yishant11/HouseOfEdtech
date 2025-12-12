"use client";

import { useState, useEffect } from "react";
import { productApi } from "@/services/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";

interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
}

interface ValidationError {
  msg: string;
  param: string;
}

interface ApiError {
  message: string;
  errors?: ValidationError[];
}

interface ProductFormProps {
  product?: Product;
  onSave: () => void;
  onCancel?: () => void;
}

export default function ProductForm({
  product,
  onSave,
  onCancel,
}: ProductFormProps) {
  const [formData, setFormData] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    category: "",
    inStock: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox" && "checked" in e.target) {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else if (type === "number") {
      setFormData((prev) => ({
        ...prev,
        [name]: parseFloat(value) || 0,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setValidationErrors([]);

    // Client-side validation with clear feedback
    const errors: ValidationError[] = [];

    if (!formData.name || formData.name.trim().length < 2) {
      errors.push({
        msg: "Product name must be at least 2 characters long",
        param: "name",
      });
    } else if (formData.name.trim().length > 100) {
      errors.push({
        msg: "Product name must be no more than 100 characters",
        param: "name",
      });
    }

    if (!formData.description || formData.description.trim().length < 10) {
      errors.push({
        msg: "Description must be at least 10 characters long",
        param: "description",
      });
    } else if (formData.description.trim().length > 1000) {
      errors.push({
        msg: "Description must be no more than 1000 characters",
        param: "description",
      });
    }

    if (formData.price <= 0) {
      errors.push({
        msg: "Price must be greater than $0",
        param: "price",
      });
    }

    if (!formData.category || formData.category.trim().length < 2) {
      errors.push({
        msg: "Category must be at least 2 characters long",
        param: "category",
      });
    } else if (formData.category.trim().length > 50) {
      errors.push({
        msg: "Category must be no more than 50 characters",
        param: "category",
      });
    }

    if (errors.length > 0) {
      setValidationErrors(errors);
      setLoading(false);
      return;
    }

    try {
      // Log the data being sent for debugging
      console.log("Sending product data:", formData);
      console.log("Product ID:", product?._id);

      if (product && product._id) {
        // Update existing product
        console.log("Updating product with ID:", product._id);
        await productApi.update(product._id, formData);
        console.log("Product updated successfully");
      } else {
        // Create new product
        console.log("Creating new product");
        await productApi.create(formData);
        console.log("Product created successfully");
      }

      // Reset form after successful submission
      setFormData({
        name: "",
        description: "",
        price: 0,
        category: "",
        inStock: true,
      });

      onSave();
    } catch (err) {
      const apiError = err as ApiError;
      console.error("API Error:", err);
      if (apiError.message === "Validation failed" && apiError.errors) {
        setValidationErrors(apiError.errors);
      } else {
        setError(apiError.message || "Failed to save product");
      }
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (field: string) => {
    const error = validationErrors.find((err) => err.param === field);
    return error ? error.msg : "";
  };

  return (
    <Card className="mb-8 shadow-lg border border-gray-200 rounded-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <CardTitle className="text-2xl font-bold">
          {product ? "Edit Product" : "Add New Product"}
        </CardTitle>
        <CardDescription className="text-blue-100">
          {product
            ? "Update the product details"
            : "Enter the details for a new product"}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {error && (
          <Alert variant="destructive" className="mb-6 rounded-lg">
            <AlertTitle className="font-semibold">Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {validationErrors.length > 0 && (
          <Alert variant="destructive" className="mb-6 rounded-lg">
            <AlertTitle className="font-semibold">
              Please correct the following issues:
            </AlertTitle>
            <AlertDescription>
              <ul className="list-disc pl-5 space-y-1">
                {validationErrors.map((err, index) => (
                  <li key={index} className="text-sm">
                    {err.msg}
                  </li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700 font-medium">
                Product Name *
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name (2-100 chars)"
                className={`border ${
                  getErrorMessage("name") ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
              {getErrorMessage("name") && (
                <p className="text-sm text-red-500 mt-1">
                  {getErrorMessage("name")}
                </p>
              )}
              <p className="text-xs text-gray-500">2-100 characters</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price" className="text-gray-700 font-medium">
                Price ($) *
              </Label>
              <Input
                type="number"
                id="price"
                name="price"
                value={formData.price || ""}
                onChange={handleChange}
                min="0.01"
                step="0.01"
                placeholder="Enter price"
                className={`border ${
                  getErrorMessage("price")
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
              {getErrorMessage("price") && (
                <p className="text-sm text-red-500 mt-1">
                  {getErrorMessage("price")}
                </p>
              )}
              <p className="text-xs text-gray-500">Must be greater than $0</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-gray-700 font-medium">
                Category *
              </Label>
              <Input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Enter category (2-50 chars)"
                className={`border ${
                  getErrorMessage("category")
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
              {getErrorMessage("category") && (
                <p className="text-sm text-red-500 mt-1">
                  {getErrorMessage("category")}
                </p>
              )}
              <p className="text-xs text-gray-500">2-50 characters</p>
            </div>

            <div className="space-y-2 flex items-end">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="inStock"
                  name="inStock"
                  checked={formData.inStock}
                  onChange={handleChange}
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <Label htmlFor="inStock" className="text-gray-700 font-medium">
                  In Stock
                </Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-700 font-medium">
              Description *
            </Label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description (10-1000 chars)"
              rows={4}
              className={`flex w-full rounded-md border ${
                getErrorMessage("description")
                  ? "border-red-500"
                  : "border-gray-300"
              } bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[120px] focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none`}
            ></textarea>
            {getErrorMessage("description") && (
              <p className="text-sm text-red-500 mt-1">
                {getErrorMessage("description")}
              </p>
            )}
            <p className="text-xs text-gray-500">10-1000 characters</p>
          </div>
        </form>
      </CardContent>
      <CardFooter className="bg-gray-50 border-t border-gray-200 flex justify-end space-x-4 py-4">
        {product && onCancel && (
          <Button
            type="button"
            onClick={onCancel}
            variant="outline"
            className="px-4 py-2 rounded-lg"
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          disabled={loading}
          onClick={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center">
              <span className="mr-2">Saving...</span>
              <span className="animate-spin h-4 w-4 border-b-2 border-white rounded-full"></span>
            </span>
          ) : product ? (
            "Update Product"
          ) : (
            "Add Product"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
