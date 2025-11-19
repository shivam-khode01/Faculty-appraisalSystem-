const teacherService = require('../services/teacherService');
const feedbackService = require('../services/feedbackService');
const { appendToSheet } = require('../googleSheet');
const { processFormArrays } = require('../utils/helpers');
const { calculateAutoRating, calculateFinalRating } = require('../utils/ratingCalculator');
const { DEPARTMENTS, MESSAGES, STATUS_CODES } = require('../config/constants');
const { asyncHandler } = require('../middleware/errorHandler');

/**
 * @route   GET /profile/create
 * @desc    Show create profile form
 * @access  Public
 */
const showCreateProfileForm = asyncHandler(async (req, res) => {
  res.render('createProfile', {
    departments: DEPARTMENTS,
    title: 'Create Profile - Faculty Management System'
  });
});

/**
 * @route   POST /profile/create
 * @desc    Create a new teacher profile
 * @access  Public
 */
const createProfile = asyncHandler(async (req, res) => {
  const processedArrays = processFormArrays(req.body);

  // Create teacher with processed data
  const teacherData = {
    ...req.body,
    papers: processedArrays.papers,
    workshops: processedArrays.workshops,
    awards: processedArrays.awards
  };

  const newTeacher = await teacherService.createTeacher(teacherData);

  // Save paper entries to Google Sheet
  if (processedArrays.papers.length === 0) {
    await appendToSheet([
      newTeacher.name,
      newTeacher.designation,
      '', '', ''
    ]);
  } else {
    for (const paper of processedArrays.papers) {
      await appendToSheet([
        newTeacher.name,
        newTeacher.designation,
        paper.title,
        paper.journalCorpus,
        paper.quartile
      ]);
    }
  }

  res.status(STATUS_CODES.CREATED).send(MESSAGES.SUCCESS.PROFILE_CREATED);
});

/**
 * @route   GET /admin/profile/:id
 * @desc    View teacher profile with AI feedback
 * @access  Public
 */
const viewProfile = asyncHandler(async (req, res) => {
  const teacher = await teacherService.getTeacherById(req.params.id);

  if (!teacher) {
    return res.status(STATUS_CODES.NOT_FOUND).send(MESSAGES.ERROR.PROFILE_NOT_FOUND);
  }

  const autoRating = calculateAutoRating(teacher);
  const autoRatingOutOf10 = (autoRating / 10).toFixed(2);

  // Generate performance feedback
  const feedback = await feedbackService.generateTeacherFeedback(teacher);

  res.render('previewProfile', {
    teacher,
    autoRating: autoRatingOutOf10,
    adminRating: teacher.adminRating ?? 0,
    finalRating: teacher.finalRating ?? 0,
    feedback,
    title: `${teacher.name} - Profile - Faculty Management System`
  });
});

/**
 * @route   POST /admin/profile/:id/delete
 * @desc    Delete teacher profile
 * @access  Public
 */
const deleteProfile = asyncHandler(async (req, res) => {
  const teacher = await teacherService.deleteTeacher(req.params.id);

  if (!teacher) {
    return res.status(STATUS_CODES.NOT_FOUND).send(MESSAGES.ERROR.PROFILE_NOT_FOUND);
  }

  res.redirect('/admin/profiles');
});

module.exports = {
  showCreateProfileForm,
  createProfile,
  viewProfile,
  deleteProfile
};
