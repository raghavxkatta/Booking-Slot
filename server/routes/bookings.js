const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Create a new booking
router.post('/book', async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
  } catch (error) {
    res.status(400).json({ message: 'Error creating booking', error: error.message });
  }
});

// Get all bookings (for hospital dashboard)
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ bookingDate: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
});

module.exports = router;