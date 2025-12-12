import User, { IUser } from "../models/User";

export const userRepository = {
  // Find user by email
  findByEmail: async (email: string) => {
    return await User.findOne({ email });
  },

  // Find user by ID
  findById: async (id: string) => {
    return await User.findById(id).select("-password");
  },

  // Find user by ID with password
  findByIdWithPassword: async (id: string) => {
    return await User.findById(id);
  },

  // Create new user
  create: async (userData: Partial<IUser>) => {
    const user = new User(userData);
    return await user.save();
  },

  // Find all users
  findAll: async () => {
    return await User.find().select("-password");
  },

  // Update user by ID
  updateById: async (id: string, updateData: Partial<IUser>) => {
    return await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");
  },

  // Delete user by ID
  deleteById: async (id: string) => {
    return await User.findByIdAndDelete(id);
  },
};
