const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require('./models/user'); 

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: "http://localhost:5000/api/auth/google/callback",
			passReqToCallback: true,
		},
		async (req, token, tokenSecret, profile, done) => {
			// console.log("Access Token", token);
			// console.log("Refresh Token", tokenSecret);
			// console.log("profile", profile);
			// console.log("done", done);
			try {
				// Check if user already exists in the database
				let user = await User.findOne({   $or: [
					{ googleId: profile.id },
					{ email: profile.email }
				] });
				if (user) {
					return done(null, user); // User found
				}
	
				// Create a new user if not found
				user = new User({
					googleId: profile.id,
					username: profile.displayName, // Using Google profile name
					email: profile.emails[0].value, // Using Google profile email
					// No password needed for Google sign-in
				});
	
				await user.save();
				done(null, user); // User saved
			} catch (err) {
				done(err, null);
			}

		}
	)
);

module.exports = passport;
