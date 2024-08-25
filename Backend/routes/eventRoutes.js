const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const { protect, admin } = require('../middleware/adminMiddleware');

// list all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find({});
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new event 
router.post('/create', protect, admin, async (req, res) => {
    const { name, description, date, time, location, imageUrl, price, totalTickets, ticketPhotoUrl } = req.body;

    try {
        const newEvent = new Event({ name, description, date, time, location, imageUrl,price, totalTickets, ticketPhotoUrl });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update an existing event 
router.put('/update/:id', protect, admin, async (req, res) => {
    const { name, description, date, time, location, price, totalTickets, ticketPhotoUrl} = req.body;
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, { name, description, date, time, location, price, totalTickets,ticketPhotoUrl }, { new: true });
        if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });
        res.json(updatedEvent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete an event
router.delete('/delete/:id', protect, admin, async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json({ message: 'Event deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/search', async (req, res) => {
    try {
        const query = req.query.query || '';
        // console.log('search query is::',query);
        const events = await Event.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { location: { $regex: query, $options: 'i' } }
            ]
        });

        res.status(200).json(events);
    } catch (error) {
        console.error('Error searching events:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
