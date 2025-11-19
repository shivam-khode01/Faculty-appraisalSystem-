const teacherService = require('../services/teacherService');
const feedbackService = require('../services/feedbackService');
const Teacher = require('../models/Teacher');
const DepartmentFeedback = require('../models/DepartmentFeedback');
const { extractKeywords, getTopKeywords } = require('../utils/helpers');
const { MESSAGES, STATUS_CODES } = require('../config/constants');
const { asyncHandler } = require('../middleware/errorHandler');

/**
 * @route   GET /admin/department-feedbacks
 * @desc    View department feedbacks
 * @access  Public
 */
const viewDepartmentFeedbacks = asyncHandler(async (req, res) => {
  const { department } = req.query;

  const feedbacks = department
    ? await feedbackService.getDepartmentFeedbacks(department)
    : [];

  const departments = await Teacher.distinct('department');

  res.render('department-feedbacks', {
    feedbacks,
    departments,
    selectedDept: department || '',
    title: 'Department Feedbacks - Faculty Management System'
  });
});

/**
 * @route   POST /admin/department-feedback/:department
 * @desc    Generate department feedback using AI
 * @access  Public
 */
const generateDepartmentFeedback = asyncHandler(async (req, res) => {
  const { department } = req.params;

  const teachers = await teacherService.getTeachersByDepartment(department);

  if (!teachers.length) {
    return res.status(STATUS_CODES.NOT_FOUND).json({
      success: false,
      message: MESSAGES.ERROR.NO_TEACHERS
    });
  }

  // Generate AI feedback
  const feedback = await feedbackService.generateDepartmentFeedback(department, teachers);

  // Save to database
  await feedbackService.saveDepartmentFeedback(department, feedback);

  res.status(STATUS_CODES.OK).json({
    success: true,
    department,
    feedback,
    message: MESSAGES.SUCCESS.FEEDBACK_GENERATED
  });
});

/**
 * @route   GET /admin/comparison-dashboard
 * @desc    View comparison dashboard across departments
 * @access  Public
 */
const viewComparisonDashboard = asyncHandler(async (req, res) => {
  const departments = await Teacher.distinct('department');
  const teachers = await Teacher.find();
  const feedbacks = await DepartmentFeedback.find();

  const departmentStats = {};
  let allStrengths = [];
  let allWeaknesses = [];

  for (const dept of departments) {
    const deptTeachers = teachers.filter(t => t.department === dept);
    const deptFeedback = feedbacks.find(f => f.department === dept);

    const papers = deptTeachers.reduce((sum, t) => sum + t.papers.length, 0);
    const workshops = deptTeachers.reduce((sum, t) => sum + t.workshops.length, 0);
    const awards = deptTeachers.reduce((sum, t) => sum + t.awards.length, 0);
    const teaching = deptTeachers.reduce((sum, t) => sum + t.hoursTaught, 0);
    const feedback = deptTeachers.length > 0
      ? deptTeachers.reduce((sum, t) => sum + (t.studentFeedback || 0), 0) / deptTeachers.length
      : 0;

    if (deptFeedback?.feedback) {
      const { strengthKeywords, weaknessKeywords } = extractKeywords(deptFeedback.feedback);
      allStrengths.push(...strengthKeywords);
      allWeaknesses.push(...weaknessKeywords);
    }

    departmentStats[dept] = {
      papers,
      workshops,
      awards,
      teaching,
      feedback: feedback.toFixed(2)
    };
  }

  // Get top 5 most frequent keywords
  const topStrengths = getTopKeywords(allStrengths, 5);
  const topWeaknesses = getTopKeywords(allWeaknesses, 5);

  res.render('comparisonDashboard', {
    departmentStats,
    strengths: topStrengths,
    weaknesses: topWeaknesses,
    title: 'Comparison Dashboard - Faculty Management System'
  });
});

module.exports = {
  viewDepartmentFeedbacks,
  generateDepartmentFeedback,
  viewComparisonDashboard
};
