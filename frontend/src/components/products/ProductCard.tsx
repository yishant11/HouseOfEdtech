import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

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

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export default function ProductCard({
  product,
  onEdit,
  onDelete,
}: ProductCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      setIsDeleting(true);
      try {
        await onDelete(product._id);
      } catch (error) {
        console.error("Failed to delete product:", error);
        setIsDeleting(false);
      }
    }
  };

  return (
    <Card className="flex flex-col h-full border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-300">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl text-gray-800 line-clamp-1">
            {product.name}
          </CardTitle>
          <Badge
            variant={product.inStock ? "default" : "destructive"}
            className="text-xs"
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2 text-gray-600 mt-2">
          {product.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow pb-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-blue-600">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>
        <div className="text-xs text-gray-400">
          Added: {new Date(product.createdAt).toLocaleDateString()}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-4 border-t border-gray-100">
        <Button
          onClick={() => onEdit(product)}
          variant="secondary"
          className="px-4 py-2 rounded-lg transition-colors"
        >
          Edit
        </Button>
        <Button
          onClick={handleDelete}
          variant="destructive"
          disabled={isDeleting}
          className="px-4 py-2 rounded-lg transition-colors"
        >
          {isDeleting ? (
            <span className="flex items-center">
              <span className="mr-2">Deleting...</span>
              <span className="animate-spin h-4 w-4 border-b-2 border-white rounded-full"></span>
            </span>
          ) : (
            "Delete"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
