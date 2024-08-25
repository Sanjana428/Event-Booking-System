const express = require("express");
const mongoose = require('mongoose');
const razorpayInstance = require("../controllers/paymentController");
const crypto = require("crypto");
const router = express.Router();
const Booking = require("../models/booking");
const Event = require('../models/event');
const { generateTicketWithImage } = require("../utils/ticketGenerator");
// const redlock = require('../lock'); 

router.post("/create-order", async (req, res) => {
	const { amount, currency } = req.body;

	try {
		const options = {
			amount: amount * 100, // amount in paise
			currency: "INR",
		};

		const order = await razorpayInstance.orders.create(options);
		// console.log(order);
		res.status(200).json({
			success: true,
			order: order,
		});
	} catch (error) {
		console.error("Error creating Razorpay order:", error);
		res.status(500).json({
			error: "Something went wrong in creating the order",
		});
	}
});

router.post("/verify-payment", async (req, res) => {
	const {
		order_id,
		razorpay_payment_id,
		razorpay_signature,
		userId,
		eventId,
		totalPrice,
		paymentMethod,
	} = req.body;

	const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
	hmac.update(order_id + "|" + razorpay_payment_id);
	const generatedSignature = hmac.digest("hex");

	if (generatedSignature !== razorpay_signature) {
		res.status(400).json({ error: "Invalid payment signature" });
	}

	try {
		const event = await Event.findById(eventId);
		if (!event) {
			return res.status(404).json({ error: "Event not found" });
		}

		// Check if the event date has passed
		const currentDate = new Date();
		if (event.date < currentDate) {
			return res.status(400).json({ error: "Cannot book tickets for past events" });
		}

		// Check if there are enough tickets available
		if (event.totalTickets <= 0) {
			return res.status(400).json({ error: "Tickets are sold out for this event" });
		}

		// Reduce the available tickets
		event.totalTickets -= 1;
		await event.save();

		// const totalPrice = 500 * ticketCount;
		const newBooking = new Booking({
			userId,
			eventId,
			// ticketCount,
			totalPrice,
			paymentStatus: "Completed",
			paymentMethod,
			razorpayOrderId: razorpay_payment_id, // Ensure this value is provided
			razorpaySignature: razorpay_signature,
		});

		await newBooking.save();
		const ticketUrl = `http://localhost:5000/api/booking/download-ticket/${newBooking._id}`;
		res.status(200).json({
			message: "Payment verified successfully",
			redirectUrl: ticketUrl,
		});
	} catch (error) {
		console.error("Error saving booking:", error);
		res.status(500).json({ error: "Error saving booking data" });
	}

	// console.log(req.body);
	// res.status(200).json({ success: "true" });
});



// router.post("/verify-payment", async (req, res) => {
//     const session = await mongoose.startSession();
//     session.startTransaction();

//     try {
//         const {
//             order_id,
//             razorpay_payment_id,
//             razorpay_signature,
//             userId,
//             eventId,
//             totalPrice,
//             paymentMethod,
//         } = req.body;

//         // Acquire a lock for this event
//         const lock = await redlock.lock(`locks:event:${eventId}`, 10000); // Lock for 10 seconds

//         const event = await Event.findById(eventId).session(session);

//         // Check if the event is still bookable
//         if (event.date < Date.now()) {
//             throw new Error("Cannot book tickets for past events.");
//         }

//         if (event.ticketCount <= 0) {
//             throw new Error("Tickets sold out.");
//         }

//         // Decrement ticket count
//         event.ticketCount -= 1;
//         await event.save({ session });

//         // Generate signature and verify payment
//         const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
//         hmac.update(order_id + "|" + razorpay_payment_id);
//         const generatedSignature = hmac.digest("hex");

//         if (generatedSignature !== razorpay_signature) {
//             throw new Error("Invalid payment signature");
//         }

//         // Create booking
//         const newBooking = new Booking({
//             userId,
//             eventId,
//             totalPrice,
//             paymentStatus: "Completed",
//             paymentMethod,
//             razorpayOrderId: razorpay_payment_id,
//             razorpaySignature: razorpay_signature,
//         });

//         await newBooking.save({ session });

//         await session.commitTransaction();
//         session.endSession();

//         // Release the lock
//         await lock.unlock();

//         const ticketUrl = `http://localhost:5000/api/booking/download-ticket/${newBooking._id}`;
//         res.status(200).json({
//             message: "Payment verified successfully",
//             redirectUrl: ticketUrl,
//         });
//     } catch (error) {
//         await session.abortTransaction();
//         session.endSession();

//         res.status(500).json({ error: error.message });
//     }
// });

router.get("/download-ticket/:bookingId", async (req, res) => {
	const bookingId = req.params.bookingId;

	try {
		// Fetch booking and event details
		const booking = await Booking.findById(bookingId)
			.populate("eventId")
			.populate("userId");

		if (!booking) {
			return res.status(404).send("Booking not found");
		}

		// Get the image URL or path from the event
		const eventImage = booking.eventId.ticketPhotoUrl;

		const ticketStream = await generateTicketWithImage(booking, eventImage);

		// Set headers and pipe the stream to response
		res.setHeader("Content-disposition", "attachment; filename=ticket.pdf");
		res.setHeader("Content-type", "application/pdf");
		ticketStream.pipe(res);
	} catch (error) {
		console.error("Error generating or downloading ticket:", error);
		res.status(500).send("Error generating or downloading ticket");
	}
});

router.get("/bookings/:userId", async (req, res) => {
	try {
		const userId = req.params.userId;
		const bookings = await Booking.find({ userId }).populate("eventId");
		// res.json(bookings);
		const formattedBookings = bookings.map((booking) => ({
			_id: booking._id,
			eventName: booking.eventId.name,
			eventDate: booking.eventId.date,
			bookingDate: booking.bookingDate,
			paymentStatus: booking.paymentStatus,
			paymentMethod: booking.paymentMethod,
			totalPrice: booking.totalPrice,
		}));

		res.json(formattedBookings);
	} catch (error) {
		console.error("Error fetching bookings:", error);
		res.status(500).send("Server error");
	}
});

module.exports = router;
