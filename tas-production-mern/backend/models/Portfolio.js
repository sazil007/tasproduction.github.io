const mongoose = require('mongoose');

const Portfoliochema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['live', 'podcast', 'music', 'acoustic'],
  },
  description: String,
  imageUrl: String,
  projectUrl: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Portfolio', Portfoliochema);