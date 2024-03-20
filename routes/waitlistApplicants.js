// routes/waitlistApplicants.js

const express = require('express');
const router = express.Router();
const WaitlistApplicant = require('../models/waitlistApplicant-model');

/**
 * GET /waitlist_applicants
 * Fetches all waitlist applicants.
 */
router.get('/', async (req, res) => {
  try {
    const applicants = await WaitlistApplicant.find();
    res.json(applicants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * GET /waitlist_applicants/:id
 * Fetches a single waitlist applicant by ID.
 */
router.get('/:id', getApplicant, (req, res) => {
  res.json(res.applicant);
});

/**
 * POST /waitlist_applicants
 * Creates a new waitlist applicant.
 */
router.post('/', async (req, res) => {
  const applicant = new WaitlistApplicant({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    age: req.body.age,
    phoneNumber: req.body.phoneNumber,
    potentialBudget: req.body.potentialBudget,
    timelineToInvest: req.body.timelineToInvest,
    brokerCode: req.body.brokerCode
  });

  try {
    const newApplicant = await applicant.save();
    res.status(201).json(newApplicant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * PATCH /waitlist_applicants/:id
 * Updates an existing waitlist applicant by ID.
 */
router.patch('/:id', getApplicant, async (req, res) => {
  const updates = req.body;
  // Dynamically update applicant fields if provided in request
  Object.keys(updates).forEach((key) => {
    res.applicant[key] = updates[key];
  });

  try {
    const updatedApplicant = await res.applicant.save();
    res.json(updatedApplicant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * DELETE /waitlist_applicants/:id
 * Deletes a waitlist applicant by ID.
 */
router.delete('/:id', getApplicant, async (req, res) => {
  try {
    await res.applicant.remove();
    res.json({ message: 'Deleted Waitlist Applicant' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * Middleware to find a waitlist applicant by ID.
 * If the applicant is found, it is attached to the response object for further processing.
 */
async function getApplicant(req, res, next) {
  let applicant;
  try {
    applicant = await WaitlistApplicant.findById(req.params.id);
    if (applicant == null) {
      return res.status(404).json({ message: 'Cannot find applicant' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.applicant = applicant;
  next();
}

module.exports = router;
