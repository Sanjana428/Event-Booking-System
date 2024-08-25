import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "../assets/Eventify_logo.jpeg";

const AdminLogin = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();

		const response = await fetch(
			"http://localhost:5000/api/users/admin/login",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			}
		);

		const data = await response.json();
		if (response.ok) {
			console.log("Admin logged in successfully:", data);
			localStorage.setItem("adminToken", data.token);
			// Navigate to the admin dashboard
			navigate("/admin/dashboard");
		} else {
			// Handle errors
			console.error("Login failed:", data.message);
			setError(data.message);
		}
	};

	return (
		<div className="form-container">
			<div className="form-logo">
            <img src={logoImage} alt="Eventify Logo" className="login-logo" />
            <p>Event Booking System</p>
            </div>
			<form onSubmit={handleLogin}>
				{error && <p style={{ color: "red" }}>{error}</p>}
				<div>
					<label>Email:</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Password:</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button className="login" type="submit">Login</button>
			</form>
		</div>
	);
};

export default AdminLogin;
