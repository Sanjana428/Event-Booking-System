import React, { useEffect, useState } from "react";

const ViewBookings = () => {
	const [bookings, setBookings] = useState([]);

	useEffect(() => {
		const userId = localStorage.getItem("userId");
		if (userId) {
			const fetchBookings = async () => {
				try {
					const response = await fetch(
						`http://localhost:5000/api/booking/bookings/${userId}`
					);
					const bookings = await response.json();
					setBookings(bookings);
				} catch (error) {
					alert("Error fetching Bookings");
				}
			};
			fetchBookings();
		} else {
			console.log("user Id is not found");
		}
	},[]);

	return (
        <div className="booking-container">
    <h2>Your Bookings</h2>
    <ul>
        {bookings.map((booking) => (
            <li key={booking._id}>
                <strong>Booking ID:</strong> {booking._id} <br />
                <strong>Event Name:</strong> {booking.eventName} <br />
                <strong>Event Date:</strong>{" "}
                {new Date(booking.eventDate).toLocaleDateString()} <br />
                <strong>Booking Date:</strong>{" "}
                {new Date(booking.bookingDate).toLocaleDateString()} <br />
                <strong>Payment Status:</strong>{" "}
                <span className="status">{booking.paymentStatus}</span> <br />
                <strong>Payment Method:</strong>{" "}
                <span className="method">{booking.paymentMethod}</span> <br />
                <strong>Total Price:</strong>{" "}
                <span className="price">₹{booking.totalPrice.toFixed(2)}</span> <br />
            </li>
        ))}
    </ul>
</div>
	);
};

export default ViewBookings;
