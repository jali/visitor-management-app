const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  residentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  visitorName: { type: String, required: true },
  visitTime: { type: Date, required: true },
  visitDuration: { type: Number, required: true }, // in hours
  flatNumber: { type: String, required: true },
  buildingNumber: { type: String, required: true },
  carDetails: { type: String },
  visitId: { type: String, unique: true }, // Unique ID for QR code
});

module.exports = mongoose.model('Visit', visitSchema);
