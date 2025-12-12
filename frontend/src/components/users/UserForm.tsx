"use client";

import { useState, useEffect } from "react";
import { userApi } from "@/services/api";
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

interface User {
  _id?: string;
  name: string;
  email: string;
  password?: string;
}

interface ValidationError {
  msg: string;
  param: string;
}

interface ApiError {
  message: string;
  errors?: ValidationError[];
}

interface UserFormProps {
  user?: User;
  onSave: () => void;
  onCancel?: () => void;
}

export default function UserForm({ user, onSave, onCancel }: UserFormProps) {
  const [formData, setFormData] = useState<User>({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setValidationErrors([]);

    try {
      if (user && user._id) {
        // Update existing user (without password for now)
        await userApi.update(user._id, {
          name: formData.name,
          email: formData.email,
        });
      } else {
        // Create new user
        await userApi.create(formData);
      }

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      onSave();
    } catch (err) {
      const apiError = err as ApiError;
      if (apiError.message === "Validation failed" && apiError.errors) {
        setValidationErrors(apiError.errors);
      } else {
        setError(apiError.message || "Failed to save user");
      }
      console.error(err);
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
          {user ? "Edit User" : "Add New User"}
        </CardTitle>
        <CardDescription className="text-blue-100">
          {user
            ? "Update the user details"
            : "Enter the details for a new user"}
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
                Full Name *
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                className={`border ${
                  getErrorMessage("name") ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg`}
              />
              {getErrorMessage("name") && (
                <p className="text-sm text-red-500 mt-1">
                  {getErrorMessage("name")}
                </p>
              )}
              <p className="text-xs text-gray-500">2-50 characters</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email Address *
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`border ${
                  getErrorMessage("email")
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg`}
              />
              {getErrorMessage("email") && (
                <p className="text-sm text-red-500 mt-1">
                  {getErrorMessage("email")}
                </p>
              )}
            </div>

            {!user && (
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Password *
                </Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password || ""}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`border ${
                    getErrorMessage("password")
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg`}
                />
                {getErrorMessage("password") && (
                  <p className="text-sm text-red-500 mt-1">
                    {getErrorMessage("password")}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  Must be at least 6 characters
                </p>
              </div>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="bg-gray-50 border-t border-gray-200 flex justify-end space-x-4 py-4">
        {user && onCancel && (
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
          ) : user ? (
            "Update User"
          ) : (
            "Add User"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
