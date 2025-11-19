const teacherService = require('../services/teacherService');
const { calculateFinalRating, isValidRating } = require('../utils/ratingCalculator');
const { DEPARTMENTS, MESSAGES, STATUS_CODES } = require('../config/constants');
const { asyncHandler } = require('../middleware/errorHandler');

/**
 * @route   GET /admin/profiles
 * @desc    View all teacher profiles with ratings
 * @access  Public
 */
const viewAllProfiles = asyncHandler(async (req, res) => {
  const filterDept = req.query.department;
  const profiles = await teacherService.getTeachersWithRatings(filterDept);

  const filterDepartments = ['ALL', ...DEPARTMENTS];

  res.render('adminDashboard', {
    profiles,
    departments: filterDepartments,
    selectedDepartment: filterDept || 'ALL',
    title: 'Admin Dashboard - Faculty Management System'
  });
});

/**
 * @route   POST /admin/rate/:id
 * @desc    Save admin rating and calculate final rating
 * @access  Public
 */
const rateTeacher = asyncHandler(async (req, res) => {
  const teacher = await teacherService.getTeacherById(req.params.id);

  if (!teacher) {
    return res.status(STATUS_CODES.NOT_FOUND).send(MESSAGES.ERROR.PROFILE_NOT_FOUND);
  }

  const adminRating = req.body.adminRating; // Already validated by middleware

  const autoRating = require('../utils/ratingCalculator').calculateAutoRating(teacher);
  const finalRating = calculateFinalRating(autoRating, adminRating);

  await teacherService.updateTeacherRating(req.params.id, adminRating, finalRating);

  res.redirect('/admin/profiles');
});

module.exports = {
  viewAllProfiles,
  rateTeacher
};
