import React, { useState } from "react";
import AddEventForm from "./addEventForm";
import { useNavigate } from "react-router-dom";
import AddAdmins from "./addAdmin";
import logoImage from "../assets/Eventify_logo.jpeg";
import ManageUser from "./manageUser";
import AdminEventList from "./adminEventList";
import AdminBookings from "./adminBooking";

const AdminDashboard = () => {
	const [activeComponent, setActiveComponent] = useState("manageEvents");
	const handleButtonClick = (component) => {
		setActiveComponent(component);
	};
	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.removeItem("adminToken");
		navigate("/admin/login");
	};

	return (
		<div className="dashboard">
			<header>
				<div className="navbar">
					<img src={logoImage} alt="Eventify Logo" className="logo" />
					<button onClick={() => handleButtonClick("addEvent")}>
						Add Event
					</button>
					<button onClick={() => handleButtonClick("addAdmins")}>
						Add Admin
					</button>
					<button onClick={() => handleButtonClick("adminBooking")}>
						Total Bookings
					</button>
					<button onClick={() => handleButtonClick("manageUser")}>
						Manage Users
					</button>
				</div>
				<button className="logout" onClick={handleLogout}>
					Logout
				</button>
			</header>
			<div className="main-content">
				{activeComponent === "manageEvents" && <AdminEventList />}
				{activeComponent === "addEvent" && <AddEventForm />}
				{activeComponent === "addAdmins" && <AddAdmins />}
				{activeComponent === 'adminBooking' && <AdminBookings />}
				{activeComponent === "manageUser" && <ManageUser />}
			</div>
		</div>
	);
};

export default AdminDashboard;
