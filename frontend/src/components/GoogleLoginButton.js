import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleLoginButton = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const token = urlParams.get("token");
		const username = urlParams.get("username");
		const userId = urlParams.get("userId");
		if (token) {
			localStorage.setItem("userToken", token);
			localStorage.setItem("userName", username);
			localStorage.setItem("userId", userId);
			navigate("/UserDashboard");
		}
	}, [navigate]);

	const handleGoogleLogin = () => {
		window.location.href = "http://localhost:5000/api/auth/google";
	};

	return <button onClick={handleGoogleLogin}>Login with Google</button>;
};

export default GoogleLoginButton;
