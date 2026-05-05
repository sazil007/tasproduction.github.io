const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const auth = require('../middleware/auth');

// Get all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).sort({ order: 1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create service (admin only)
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update service
router.put('/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(service);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete service
router.delete('/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;