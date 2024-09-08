const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactDetails: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  bookingDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', BookingSchema);