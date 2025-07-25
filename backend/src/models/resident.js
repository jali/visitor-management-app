const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const residentSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  flatNumber: { type: String, required: true },
  buildingNumber: { type: String, required: true },
});

residentSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('Resident', residentSchema);
