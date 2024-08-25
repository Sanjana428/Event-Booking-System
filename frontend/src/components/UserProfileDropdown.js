// src/components/UserProfileDropdown.js
import React, { useState } from 'react';

const UserProfileDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        // Handle logout logic
        console.log('User logged out');
    };

    return (
        <div className="user-profile-dropdown">
            <button onClick={toggleDropdown}>Username</button>
            {isOpen && (
                <div className="dropdown-menu">
                    <button onClick={() => console.log('Profile clicked')}>Profile</button>
                    <button onClick={() => console.log('My Bookings clicked')}>My Bookings</button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    );
};

export default UserProfileDropdown;
