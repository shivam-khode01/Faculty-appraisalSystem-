const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');

/**
 * @route   GET /admin/department-feedbacks
 * @desc    View department feedbacks
 */
router.get('/department-feedbacks', departmentController.viewDepartmentFeedbacks);

/**
 * @route   POST /admin/department-feedback/:department
 * @desc    Generate department feedback
 */
router.post('/department-feedback/:department', departmentController.generateDepartmentFeedback);

/**
 * @route   GET /admin/comparison-dashboard
 * @desc    View comparison dashboard
 */
router.get('/comparison-dashboard', departmentController.viewComparisonDashboard);

module.exports = router;
