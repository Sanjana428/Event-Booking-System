import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import EventList from "./EventList";
import { useNavigate, Link } from "react-router-dom";
import logoImage from '../assets/Eventify_logo.jpeg';

const UserDashboard = () => {
	const [events, setEvents] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	// const [date, setDate] = useState("");
	// const [time, setTime] = useState("");
	const [dropdownVisible, setDropdownVisible] = useState(false);
    const navigate = useNavigate();
    const username = localStorage.getItem("userName");

	const fetchEvents = async () => {
		try {
            console.log("get query is:",searchQuery);
			const response = await fetch(
				`http://localhost:5000/api/admin/search?query=${encodeURIComponent(searchQuery)}`
			);
			if (response.ok) {
				const data = await response.json();
                // console.log(data);
				setEvents(data);
			} else {
				console.error("Failed to fetch events");
			}
		} catch (error) {
			console.error("Error fetching events:", error);
		}
	};
	
    const handleLogout = () => {
        console.log("User logged out");
		localStorage.removeItem("userToken");
		localStorage.removeItem("adminToken");
        navigate("/login"); // Redirect to login page
    };

	useEffect(() => {
		fetchEvents();
	}, [searchQuery]);

	return (
		<div>
			<header>
			<img src={logoImage} alt="Eventify Logo" className="logo" />
            <Link to="/about" className="header-button">About</Link>
                <Link to="/bookings" className="header-button">View Booking</Link>
				<SearchBar
					onSearch={(query) => {
						setSearchQuery(query);
						// setDate(date);
						fetchEvents();
					}}
				/>
                <div className="user-dropdown">
                    <button
                        className="user-button"
                        onClick={() => setDropdownVisible(!dropdownVisible)}
                    >
                        {username}
                    </button>
                    {dropdownVisible && (
                        <div className="dropdown-menu">
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </div>
                
			</header>
			<main>
				<EventList events={events} />
			</main>
		</div>
	);
};

export default UserDashboard;
