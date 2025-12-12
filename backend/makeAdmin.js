const mongoose = require("mongoose");
require("dotenv").config();

// Import the User model
const User = require("./dist/models/User").default;

// Connect to MongoDB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/crudapp"
);

const makeAdmin = async (email) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      console.log(`User with email ${email} not found`);
      process.exit(1);
    }

    // Update the user to be an admin
    user.isAdmin = true;
    await user.save();

    console.log(`User ${user.name} (${user.email}) is now an admin`);
    process.exit(0);
  } catch (error) {
    console.error("Error making user admin:", error);
    process.exit(1);
  }
};

// Get email from command line arguments
const email = process.argv[2];

if (!email) {
  console.log("Please provide an email address as an argument");
  process.exit(1);
}

makeAdmin(email);
