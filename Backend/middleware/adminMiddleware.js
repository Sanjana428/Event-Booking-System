const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

const protect = asyncHandler(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			token = req.headers.authorization.split(" ")[1];
			const secretKey='b492b4fb66cc693d0e7d5f4c06d1594ffcd75b27acc51ee6af4011c0fb83d2f88addd93f0579f418c1819c3de7a6c0f42f4a378be7957e06f96af0149a4d3151';
			const decoded = jwt.verify(token,secretKey);

			req.user = await User.findById(decoded.id).select("-password");

			next();
		} catch (error) {
			res.status(401);
			throw new Error("Not authorized, token failed");
		}
	}

	if (!token) {
		res.status(401);
		throw new Error("Not authorized, no token");
	}
});

const admin = (req, res, next) => {
	if (req.user && req.user.role === "admin") {
		next();
	} else {
		res.status(401);
		throw new Error("Not authorized as an admin");
	}
};

module.exports = { protect, admin };
