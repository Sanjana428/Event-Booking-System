import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImage from '../assets/Eventify_logo.jpeg';

const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const navigate = useNavigate();

	const { email, password } = formData;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setSuccess("");

		try {
			const response = await fetch(
				"http://localhost:5000/api/users/login",
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
			localStorage.setItem("userToken", data.token);
			localStorage.setItem("userName", data.username);
			localStorage.setItem('userId', data._id);
			navigate('/UserDashboard');
			// setSuccess("Login successful!");
			// Handle successful login here (e.g., store user data, redirect)
			console.log("User data:", data);
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<div className='form-container'>
			<div className="form-logo">
            <img src={logoImage} alt="Eventify Logo" className="login-logo" />
            <p>Event Booking System</p>
            </div>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Enter E-mail:</label>
					<input
						className="input-box"
						// placeholder="Enter E-mail"
						type="email"
						id="email"
						name="email"
						value={email}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
				<label>Enter Password:</label>
					<input
						className="input-box"
						placeholder="Enter Password"
						type="password"
						id="password"
						name="password"
						value={password}
						onChange={handleChange}
						required
					/>
				</div>
				<button type="submit">Login</button>
			</form>
            {success && <p style={{ color: "green" }}>{success}</p>}
			{error && <p style={{ color: "red" }}>{error}</p>}
		</div>
	);
};

export default Login;
