const express = require("express");
require('dotenv').config();
const mongoose = require("mongoose");
const cors = require("cors");
const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes'); 
const adminRoutes = require('./routes/adminRoutes')
const orderRoutes = require('./routes/orderRoutes');
const passportRoute = require('./routes/passportRoutes')
const passport = require("./passport");


const app = express();
const session = require('express-session');

mongoose.connect("mongodb://localhost:27017/Event-Booking")
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use(cors());
// Passport middleware

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET
}))
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin', eventRoutes);
app.use('/api/booking',orderRoutes);
app.use('/api', passportRoute);

app.get('/', (req, res) => {
    res.send('Welcome to the Event Booking API');
});


app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});
