const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    imageUrl: { type: String },
    price: { type: Number, required: true },
    totalTickets: { type: Number, required: true }, 
    ticketPhotoUrl: { type: String } 
}, {
    timestamps: true,
    collection: 'Events'
});

module.exports = mongoose.model('Event', eventSchema);
