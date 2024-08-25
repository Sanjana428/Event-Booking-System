import React, { useEffect, useState } from 'react';

const AdminBookings = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/admin/bookings', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('adminToken')}` // Assuming the admin token is stored in localStorage
                    }
                });
                const data = await response.json();
                setBookings(data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings();
    }, []);

    return (
        <div className="booking-container">
            <h2>All Bookings</h2>
            <ul>
                {bookings.map((booking) => (
                    <li key={booking._id}>
                        <strong>Booking ID:</strong> {booking._id} <br />
                        <strong>User ID:</strong> {booking.userId} <br />
                        <strong>User Email:</strong> {booking.userEmail} <br />
                        <strong>Event Name:</strong> {booking.eventName} <br />
                        <strong>Event Date:</strong> {new Date(booking.eventDate).toLocaleDateString()} <br />
                        <strong>Booking Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()} <br />
                        <strong>Payment Status:</strong> {booking.paymentStatus} <br />
                        <strong>Payment Method:</strong> {booking.paymentMethod} <br />
                        <strong>Total Price:</strong> ₹{booking.totalPrice.toFixed(2)} <br />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminBookings;
