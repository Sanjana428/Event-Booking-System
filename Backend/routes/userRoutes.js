const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');

// Register new user
router.post("/register", async (req, res) => {
	const { username, email, password, role} = req.body;

	// Check if all required fields are provided
	if (!username || !email || !password) {
		return res
			.status(400)
			.json({ message: "Please provide all required fields" });
	}

	try {
		// Check if the username or email is already taken
		const userExists = await User.findOne({
			$or: [{ email }, { username }],
		});

		if (userExists) {
			return res
				.status(400)
				.json({ message: "Username or Email already exists" });
		}

		// Create user instance
		const user = new User({ username, email, password, role });

		// Save the user to the database
		await user.save();

		// Respond with user data and a token (implement generateToken function as needed)
		res.status(201).json({
			_id: user._id,
			username: user.username,
			email: user.email,
			role: user.role,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.post("/login", async (req, res) => {
	const { email, password } = req.body;

	// Check if email and password are provided
	if (!email || !password) {
		return res
			.status(400)
			.json({ message: "Please provide both email and password" });
	}

	try {
		// Find the user by email
		const user = await User.findOne({ email });
		if (!user) {
			return res
				.status(400)
				.json({ message: "Invalid email or password" });
		}

		// Compare the provided password with the hashed password in the database
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res
				.status(400)
				.json({ message: "Invalid password" });
		}
		const token = generateToken(user._id);

		// Respond with user data if the login is successful
		res.status(200).json({
			_id: user._id,
			username: user.username,
			email: user.email,
			role: user.role,
			token
			// You can include more user data here if needed
			
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Admin Login Route
router.post('/admin/login', asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide both email and password' });
    }

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password for Admin Login' });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid password' });
    }
	console.log(`User role: ${user.role}`);

    // Check if the user is an admin
    if (user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Not an admin.' });
    }

    // Generate JWT Token
    const token = generateToken(user._id);

    // Respond with user data and token
    res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token,
    });
}));


module.exports = router;
