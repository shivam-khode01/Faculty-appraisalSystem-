const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const teacherController = require('../controllers/teacherController');
const departmentController = require('../controllers/departmentController');
const { validateRating, validateObjectId } = require('../middleware/validators');

// Admin Dashboard & Profile Routes
router.get('/profiles', adminController.viewAllProfiles);
router.get('/profile/:id', validateObjectId, teacherController.viewProfile);
router.post('/profile/:id/delete', validateObjectId, teacherController.deleteProfile);
router.post('/rate/:id', validateObjectId, validateRating, adminController.rateTeacher);

// Department Routes (merged here to avoid conflicts)
router.get('/department-feedbacks', departmentController.viewDepartmentFeedbacks);
router.post('/department-feedback/:department', departmentController.generateDepartmentFeedback);
router.get('/comparison-dashboard', departmentController.viewComparisonDashboard);

module.exports = router;
