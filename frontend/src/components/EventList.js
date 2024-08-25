// src/components/EventList.js
import React from "react";

const EventList = ({ events }) => {
	const userId = localStorage.getItem("userId");
	const handleBuyNow = async (event) => {
		try {
			const response = await fetch(
				"http://localhost:5000/api/booking/create-order",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						amount: event.price, // Convert to paise
						currency: "INR",
						eventId: event._id,
					}),
				}
			);

			const orderData = await response.json();
			// console.log(orderData);
			if (!orderData.success) {
				alert("Order creation failed");
				return;
			}

			// Integrate with Razorpay
			const options = {
				key: "rzp_test_klNdf0EEGateml", // Replace with your Razorpay key_id
				amount: orderData.order.amount,
				currency: orderData.order.currency,
				name: event.name,
				description: event.description,
				order_id: orderData.order.id,
				handler: function (response) {
					// Send payment details to the backend for verification
					fetch("http://localhost:5000/api/booking/verify-payment", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							order_id: response.razorpay_order_id,
							razorpay_payment_id: response.razorpay_payment_id,
							razorpay_signature: response.razorpay_signature,
							userId: userId, // The user's ID
							eventId: event._id, // The event's ID
							// ticketCount: selectedTicketCount, // The number of tickets
							totalPrice: event.price,
							paymentMethod: "Razorpay",
						}),
					})
						.then((res) => res.json())
						.then((data) => {
							if (data.error) {
								if (
									data.error ===
									"Cannot book tickets for past events"
								) {
									alert(
										"Cannot book tickets for past events."
									);
								} else if (
									data.error ===
									"Tickets are sold out for this event"
								) {
									alert(
										"Tickets are sold out for this event."
									);
								} else {
									alert("Payment verification failed");
								}
							} else if (
								data.message === "Payment verified successfully"
							) {
								alert("Payment successful and verified!");

								if (data.redirectUrl) {
									// Redirect to the ticket download page
									window.location.href = data.redirectUrl;
								}
							}
						})
						.catch((err) => {
							console.error("Error verifying payment:", err);
							alert("Error verifying payment");
						});
				},
				prefill: {
					name: "", // You can prefill the name here
					email: "", // You can prefill the email here
					contact: "", // You can prefill the contact here
				},
				notes: {
					event_id: event._id,
				},
				theme: {
					color: "#3399cc",
				},
			};

			const rzp = new window.Razorpay(options);
			rzp.open();
		} catch (error) {
			console.error("Error creating order:", error);
			alert("Something went wrong!");
		}
	};

	return (
		<div className="event-list">
			{events.length === 0 ? (
				<p>No events found</p>
			) : (
				events.map((event) => (
					<div key={event._id} className="fevent-item">
						<img
							src={event.imageUrl}
							alt={event.name}
							className="fevent-image"
						/>
						<div className="fevent-details">
							<h3>{event.name}</h3>
							<p>{event.description}</p>
							<p>Location: {event.location}</p>
							<p>
								Date:{" "}
								{new Date(event.date).toLocaleDateString()}
							</p>
							<p>Time: {event.time}</p>
							<p className="fevent-price">
								<strong>Price:</strong> ₹{event.price}
							</p>
						</div>
						<div className="fevent-action">
							<button
								className="buy-ticket-button"
								onClick={() => handleBuyNow(event)}
							>
								Buy Ticket
							</button>
						</div>
					</div>
				))
			)}
		</div>
	);
};

export default EventList;
