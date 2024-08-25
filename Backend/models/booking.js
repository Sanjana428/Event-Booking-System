const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    // ticketCount: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
    paymentMethod: { type: String, required: true },
    razorpayOrderId: { type: String, required: true },
    razorpaySignature: { type: String, required: true },
    bookingDate: { type: Date, default: Date.now }
},{
    collection: 'Bookings'
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
