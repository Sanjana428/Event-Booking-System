import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <h2>Event Management</h2>
            </div>
            <ul className="navbar-links">
                <li><Link to="<AddEventForm />">Add Event</Link></li>
                <li><Link to="/manage-events">Manage Events</Link></li>
                <li><Link to="/view-booking">View Bookings</Link></li>
                <li><Link to="/payment-status">Payment Status</Link></li>
                <li><Link to="/logout">Logout</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
