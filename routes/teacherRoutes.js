const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const { validateTeacherProfile } = require('../middleware/validators');

/**
 * @route   GET /profile/create
 * @desc    Show create profile form
 */
router.get('/create', teacherController.showCreateProfileForm);

/**
 * @route   POST /profile/create
 * @desc    Create a new teacher profile
 */
router.post('/create', validateTeacherProfile, teacherController.createProfile);

module.exports = router;
