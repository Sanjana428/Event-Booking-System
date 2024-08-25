// src/components/Logo.js
import React from "react";

const Logo = () => (
	<svg
		width="200"
		height="60"
		viewBox="0 0 200 60"
		xmlns="http://www.w3.org/2000/svg"
	>
		<rect width="200" height="60" fill="#3498db" />
		<text
			x="100"
			y="35"
			textAnchor="middle"
			fill="#fff"
			fontSize="24"
			fontFamily="Arial, sans-serif"
		>
			Eventify
		</text>
		<circle cx="20" cy="20" r="10" fill="#e74c3c" />
		<circle cx="180" cy="20" r="10" fill="#e74c3c" />
	</svg>
);

export default Logo;
