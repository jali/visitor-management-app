const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'security', 'resident'], required: true },
  flatNumber: { type: String, required: function () { return this.role === 'resident'; } },
  buildingNumber: { type: String, required: function () { return this.role === 'resident'; } },
});

// save hashed password
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// compare password
userSchema.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) {
            return callback(err)
        } else {
            callback(null, isMatch)
        }
    })
}

module.exports = mongoose.model('User', userSchema);
