const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const Visit = require('../models/visit');
const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const { CLIENT_BASE_URL } = require('../constants');

// Create a visit (resident only)
router.post('/', protect, authorize(['resident']), async (req, res) => {
  if (req.user.user.role !== 'resident') {
    return res.status(403).json({ msg: 'Access denied' });
  }

  const { visitorName, visitTime, visitDuration, carDetails } = req.body;
  try {
    const resident = await User.findById(req.user.user.id);
    const visit = new Visit({
      residentId: req.user.user.id,
      visitorName,
      visitTime,
      visitDuration,
      flatNumber: resident.flatNumber,
      buildingNumber: resident.buildingNumber,
      carDetails,
      visitId: uuidv4(),
    });

    await visit.save();
    res.json({ visitId: visit.visitId, url: `${CLIENT_BASE_URL}/visit/${visit.visitId}` });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get visit details (admin only)
router.get('/:visitId', protect, authorize(['admin', 'security']), async (req, res) => {
  if (req.user.user.role !== 'admin' || req.user.user.role !== 'security') {
    return res.status(403).json({ msg: 'Access denied' });
  }

  try {
    const visit = await Visit.findOne({ visitId: req.params.visitId }).populate('residentId', 'username');
    if (!visit) return res.status(404).json({ msg: 'Visit not found' });
    res.json(visit);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get almyl visits for a resident
router.get('/my-visits', protect, authorize(['resident']), async (req, res) => {
  if (req.user.user.role !== 'resident') {
    return res.status(403).json({ msg: 'Access denied' });
  }
  try {
    const visits = await Visit.find({ residentId: req.user.id });
    res.json(visits);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
