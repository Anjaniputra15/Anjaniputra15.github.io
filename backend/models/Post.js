const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  category: { type: String, default: 'Update', trim: true },
  tags: [{ type: String, trim: true }],
  published: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
