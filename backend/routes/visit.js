const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Visit = require('../models/visit');
const Resident = require('../models/resident');
const { v4: uuidv4 } = require('uuid');

// Create a visit (resident only)
router.post('/', auth, async (req, res) => {
  if (req.user.user.role !== 'resident') {
    return res.status(403).json({ msg: 'Access denied' });
  }

  const { visitorName, visitTime, visitDuration, carDetails } = req.body;
  try {
    const resident = await Resident.findById(req.user.user.id);
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
    res.json({ visitId: visit.visitId, url: `http://localhost:3000/visit/${visit.visitId}` });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get visit details (admin only)
router.get('/:visitId', auth, async (req, res) => {
  if (req.user.user.role !== 'admin') {
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

module.exports = router;
