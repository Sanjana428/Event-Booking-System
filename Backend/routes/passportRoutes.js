const express = require("express");
const router = express.Router();
const passport = require('../passport'); 
const generateToken = require('../utils/generateToken');
const User = require("../models/user");

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        const token = generateToken(req.user) 
        const { username, _id } = req.user; 
        res.redirect(`http://localhost:3000/Register?token=${token}&username=${username}&userId=${_id}`);
    }
);

router.get('/login', (req, res) => {
    res.render('login'); // Render the login page
});

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error('Logout Error:', err);
        }
        res.redirect('/');
    });
});


module.exports = router;
