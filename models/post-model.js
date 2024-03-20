const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subHeading: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  primaryImage: {
    type: String, // URL to the image
    required: true
  },
  secondaryImage: {
    type: String, // URL to the image
    required: true
  },
  tertiaryImage: {
    type: String, // URL to the image
    required: true
  },
  tags: [{
    type: String,
    required: true
  }],
  prePara: [{
    type: String,
    required: true
  }],
  postPara: [{
    type: String,
    required: true
  }],
  minuteRead: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Post', postSchema);
