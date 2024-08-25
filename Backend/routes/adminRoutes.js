const express = require('express');
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const Booking=require("../models/booking");
const { protect, admin } = require('../middleware/adminMiddleware');


router.get('/dashboard', protect, admin, (req, res) => {
    res.send('Admin Dashboard');
});

router.post('/addAdmin', async (req, res) => {
    const { username, email, password } = req.body;

    // console.log(name);
    // console.log(email);
    // console.log(password);
    // Validate the incoming data
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Check if the admin already exists
        const existingAdmin = await User.findOne({
			$or: [{ email }, { username }],
		});
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin with this email already exists.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
console.log(password);
console.log(hashedPassword);
        // Create a new admin
        const user = new User({
            username,
            email,
            password: hashedPassword,
            role: 'admin'
        });

        // Save the admin to the database
        await user.save();

        res.status(201).json({ message: 'Admin created successfully.' });
        await user.save();

		// Respond with user data and a token (implement generateToken function as needed)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

router.get('/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find().populate('eventId userId');
        const formattedBookings = bookings.map(booking => ({
            _id: booking._id,
            userId: booking.userId._id,
            userEmail: booking.userId.email,
            eventName: booking.eventId.name,
            eventDate: booking.eventId.date,
            bookingDate: booking.bookingDate,
            paymentStatus: booking.paymentStatus,
            paymentMethod: booking.paymentMethod,
            totalPrice: booking.totalPrice
        }));
        res.json(formattedBookings);
    } catch (error) {
        console.error('Error fetching all bookings:', error);
        res.status(500).json({ error: 'Failed to fetch bookings' });
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({}, 'username email role'); // Fetch specific fields only
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Delete a user by ID
router.delete('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        await User.findByIdAndDelete(userId);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

module.exports = router;

module.exports = router;
