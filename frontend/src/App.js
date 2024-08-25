import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Register from "./components/SignUP";
import Login from "./components/login";
import AdminLogin from "./components/adminLogin";
import AdminDashboard from "./components/adminDashboard";
import UserDashboard from "./components/userDashboard";
import PrivateRoute from "./components/PrivateRoute";
import AboutSection from "./components/AboutSection";
import ViewBookings from "./components/ViewBookings";
import "./App.css";

function App() {
	return (
		<div>
			<BrowserRouter>
				<div>
					<main>
						<Routes>
							<Route
								path="/Register"
								element={<Register />}
							></Route>
							<Route
								path="/"
								element={<Navigate to="/Register" />}
							/>
							<Route path="/Login" element={<Login />} />
							<Route
								path="/UserDashboard"
								element={
									<PrivateRoute>
										<UserDashboard />
									</PrivateRoute>
								}
							/>
							<Route path="/about" element={<AboutSection />} />
                <Route path="/bookings" element={<ViewBookings />} />
							<Route
								path="/admin/login"
								element={<AdminLogin />}
							/>
							<Route
								path="/admin/dashboard"
								element={
									<PrivateRoute>
										<AdminDashboard />
									</PrivateRoute>
								}
							/>
						</Routes>
					</main>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
