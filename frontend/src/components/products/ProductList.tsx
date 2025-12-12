"use client";

import { useState, useEffect } from "react";
import { productApi } from "@/services/api";
import ProductForm from "./ProductForm";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productApi.getAll();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await productApi.delete(id);
      fetchProducts(); // Refresh the list
    } catch (err) {
      setError("Failed to delete product");
      console.error(err);
    }
  };

  const handleEdit = (product: Product) => {
    console.log("Edit button clicked for product:", product);
    setEditingProduct(product);
  };

  const handleSave = () => {
    console.log("Save button clicked");
    setEditingProduct(null);
    fetchProducts(); // Refresh the list
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8 shadow-lg border border-gray-200 rounded-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
            <CardTitle className="text-3xl text-center">
              Product Management
            </CardTitle>
            <CardDescription className="text-center text-blue-100">
              Manage your products with this simple CRUD interface
            </CardDescription>
          </CardHeader>
        </Card>

        <ProductForm onSave={fetchProducts} />

        <div className="mt-10">
          <Card className="shadow-lg border border-gray-200 rounded-xl overflow-hidden">
            <CardHeader className="bg-gray-50 border-b border-gray-200">
              <CardTitle className="text-2xl text-gray-800">
                Product List
              </CardTitle>
              <CardDescription className="text-gray-600">
                Loading products...
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Show 6 skeleton loaders while loading */}
                {Array.from({ length: 6 }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8 shadow-lg border border-gray-200 rounded-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <CardTitle className="text-3xl text-center">
            Product Management
          </CardTitle>
          <CardDescription className="text-center text-blue-100">
            Manage your products with this simple CRUD interface
          </CardDescription>
        </CardHeader>
      </Card>

      {error && (
        <Alert variant="destructive" className="mb-6 rounded-lg shadow">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {editingProduct ? (
        <ProductForm
          product={editingProduct}
          onSave={handleSave}
          onCancel={() => setEditingProduct(null)}
        />
      ) : (
        <ProductForm onSave={fetchProducts} />
      )}

      <div className="mt-10">
        <Card className="shadow-lg border border-gray-200 rounded-xl overflow-hidden">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle className="text-2xl text-gray-800">
              Product List
            </CardTitle>
            <CardDescription className="text-gray-600">
              {products.length} product{products.length !== 1 ? "s" : ""}{" "}
              available
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {products.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <p className="text-gray-500 mb-4">No products found.</p>
                <Button
                  onClick={() => window.location.reload()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  Refresh
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}