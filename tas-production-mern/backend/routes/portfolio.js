const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');
const auth = require('../middleware/auth');

// Get all portfolio items
router.get('/', async (req, res) => {
  try {
    const portfolio = await Portfolio.find().sort({ createdAt: -1 });
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create portfolio item
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  
  try {
    const portfolio = new Portfolio(req.body);
    await portfolio.save();
    res.status(201).json(portfolio);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update portfolio item
router.put('/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  
  try {
    const portfolio = await Portfolio.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(portfolio);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete portfolio item
router.delete('/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  
  try {
    await Portfolio.findByIdAndDelete(req.params.id);
    res.json({ message: 'Portfolio item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;