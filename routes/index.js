const express = require('express');
const router = express.Router();

// Import route modules
const teacherRoutes = require('./teacherRoutes');
const adminRoutes = require('./adminRoutes');

// Root route - redirect to admin dashboard
router.get('/', (req, res) => {
  res.redirect('/admin/profiles');
});

// Mount routes
router.use('/profile', teacherRoutes);
router.use('/admin', adminRoutes); // All admin routes including department routes

module.exports = router;
