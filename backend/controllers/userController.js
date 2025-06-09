import validator from "validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import userModel from "../models/userModel.js";

// Function to create JWT token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        // Find user by email
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User doesn't exist" });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = createToken(user._id); // Generate token
            res.json({
                success: true,
                token,
                userId: user._id, // Return userId
                email: user.email   // Return email
            });
        } else {
            res.status(400).json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Register User
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
  
    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
  
    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }
  
    try {
      // Check if the user already exists
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'User already exists' });  // Return 'User already exists'
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create new user
      const newUser = new userModel({ name, email, password: hashedPassword });
      await newUser.save();
  
      // Generate token
      const token = createToken(newUser._id);
  
      // Send response with token, userId, and email
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        token,
        userId: newUser._id,
        email: newUser.email
      });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };
  
// Admin Login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the email and password match admin credentials
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ email, password }, process.env.JWT_SECRET); // Admin token
            res.json({ success: true, token });
        } else {
            res.status(400).json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Export all functions in a single export statement
export { loginUser, registerUser, adminLogin };
