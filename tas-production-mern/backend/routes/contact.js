const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');

// Submit contact form
router.post('/', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all messages (admin only)
router.get('/', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update message status
router.patch('/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  
  try {
    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(message);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;