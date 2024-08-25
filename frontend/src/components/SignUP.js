import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImage from '../assets/Eventify_logo.jpeg';
import GoogleLoginButton from "./GoogleLoginButton";

const Register = () => {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const navigate = useNavigate();
	const { username, email, password } = formData;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleLoginClick = () => {
		navigate("/login");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setSuccess("");

		try {
			const response = await fetch(
				"http://localhost:5000/api/users/register",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				}
			);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "An error occurred");
			}

			const data = await response.json();
			console.log(data);
			setSuccess("Registration successful!");
			navigate("/UserDashboard");
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<div className="form-container">
            <div className="form-logo">
            <img src={logoImage} alt="Eventify Logo" className="login-logo" />
            <p>Event Booking System</p>
            </div>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Username:</label>
					<input
						className="input-box"
						type="text"
						id="username"
						name="username"
						value={username}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label>Email:</label>
					<input
						className="input-box"
						type="email"
						id="email"
						name="email"
						value={email}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label>Password:</label>
					<input
						className="input-box"
						type="password"
						id="password"
						name="password"
						value={password}
						onChange={handleChange}
						required
					/>
				</div>
				<button type="submit">Register Yourself</button>
				<p style={{textAlign: 'center', color: 'white' , fontSize:'20px'}}>or</p>
				<button onClick={handleLoginClick}>Login</button>
				<p style={{textAlign: 'center', color: 'white' , fontSize:'20px'}}>or</p>
				<GoogleLoginButton />
				{success && <p style={{ color: "green" }}>{success}</p>}
				{error && <p style={{ color: "red" }}>{error}</p>}
			</form>
		</div>
	);
};

export default Register;
