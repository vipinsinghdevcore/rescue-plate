const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Import the Models
const Food = require('./models/Food');
const User = require('./models/User'); // New User model

// Import Auth packages
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Connected to MongoDB Database!"))
    .catch((err) => console.log("❌ DB Connection Error:", err));

// ==========================================
// FOOD ROUTES
// ==========================================

// 1. POST Route: To receive data from the frontend form
app.post('/api/food', async(req, res) => {
    try {
        const newFood = new Food(req.body);
        const savedFood = await newFood.save();
        res.status(201).json({
            message: "Food donation saved successfully!",
            data: savedFood
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to save food donation" });
    }
});

// 2. GET Route: To send all food donations to the frontend
app.get('/api/food', async(req, res) => {
    try {
        const foods = await Food.find();
        res.status(200).json(foods);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve food donations" });
    }
});

// ==========================================
// AUTHENTICATION ROUTES
// ==========================================

// 3. Signup Route
app.post('/api/auth/signup', async(req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: "User already exists" });

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save new user
        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();

        res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Signup failed" });
    }
});

// 4. Login Route
app.post('/api/auth/login', async(req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "Invalid credentials" });

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        // Create token
        const token = jwt.sign({ userId: user._id, role: user.role }, "secret_key_rescue_plate", { expiresIn: '1d' });

        res.status(200).json({ token, user: { name: user.name, role: user.role } });
    } catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});