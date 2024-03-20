const mongoose = require('mongoose');

const waitlistApplicantSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  potentialBudget: {
    type: Number,
    required: false,
  },
  timelineToInvest: {
    type: Number,
    required: false,
  },
  brokerCode: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('WaitlistApplicant', waitlistApplicantSchema);