"use client";

import { useState, useEffect } from "react";
import { userApi } from "@/services/api";
import UserForm from "./UserForm";
import UserCardSkeleton from "./UserCardSkeleton";
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

interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userApi.getAll();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await userApi.delete(id);
      fetchUsers(); // Refresh the list
    } catch (err) {
      setError("Failed to delete user");
      console.error(err);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  const handleSave = () => {
    setEditingUser(null);
    fetchUsers(); // Refresh the list
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8 shadow-lg border border-gray-200 rounded-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
            <CardTitle className="text-3xl text-center">
              User Management
            </CardTitle>
            <CardDescription className="text-center text-blue-100">
              Manage your users with this simple CRUD interface
            </CardDescription>
          </CardHeader>
        </Card>

        <UserForm onSave={fetchUsers} />

        <div className="mt-10">
          <Card className="shadow-lg border border-gray-200 rounded-xl overflow-hidden">
            <CardHeader className="bg-gray-50 border-b border-gray-200">
              <CardTitle className="text-2xl text-gray-800">User List</CardTitle>
              <CardDescription className="text-gray-600">
                Loading users...
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Show 6 skeleton loaders while loading */}
                {Array.from({ length: 6 }).map((_, index) => (
                  <UserCardSkeleton key={index} />
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
            User Management
          </CardTitle>
          <CardDescription className="text-center text-blue-100">
            Manage your users with this simple CRUD interface
          </CardDescription>
        </CardHeader>
      </Card>

      {error && (
        <Alert variant="destructive" className="mb-6 rounded-lg shadow">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {editingUser ? (
        <UserForm
          user={editingUser}
          onSave={handleSave}
          onCancel={() => setEditingUser(null)}
        />
      ) : (
        <UserForm onSave={fetchUsers} />
      )}

      <div className="mt-10">
        <Card className="shadow-lg border border-gray-200 rounded-xl overflow-hidden">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle className="text-2xl text-gray-800">User List</CardTitle>
            <CardDescription className="text-gray-600">
              {users.length} user{users.length !== 1 ? "s" : ""} available
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {users.length === 0 ? (
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <p className="text-gray-500 mb-4">No users found.</p>
                <Button
                  onClick={() => window.location.reload()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  Refresh
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user) => (
                  <Card
                    key={user._id}
                    className="flex flex-col h-full border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl text-gray-800 line-clamp-1">
                        {user.name}
                      </CardTitle>
                      <CardDescription className="line-clamp-1 text-gray-600">
                        {user.email}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow pb-4">
                      <div className="text-sm text-gray-500">
                        Joined: {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-4 border-t border-gray-100">
                      <Button
                        onClick={() => handleEdit(user)}
                        variant="secondary"
                        className="px-4 py-2 rounded-lg"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(user._id)}
                        variant="destructive"
                        className="px-4 py-2 rounded-lg"
                      >
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}