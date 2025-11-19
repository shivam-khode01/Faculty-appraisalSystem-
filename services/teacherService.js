const Teacher = require('../models/Teacher');
const { calculateAutoRating } = require('../utils/ratingCalculator');
const logger = require('../utils/logger');

/**
 * Create a new teacher profile
 * @param {Object} teacherData - Teacher profile data
 * @returns {Promise<Object>} - Created teacher document
 */
const createTeacher = async (teacherData) => {
  try {
    const newTeacher = new Teacher({
      name: teacherData.name.trim(),
      designation: teacherData.designation.trim(),
      department: teacherData.department,
      domain: teacherData.domain,
      expectedHours: parseInt(teacherData.expectedHours) || 20,
      hoursTaught: parseInt(teacherData.hoursTaught) || 0,
      studentFeedback: parseFloat(teacherData.studentFeedback) || 0,
      papers: teacherData.papers || [],
      workshops: teacherData.workshops || [],
      awards: teacherData.awards || [],
      adminRating: 0,
      finalRating: 0
    });

    const savedTeacher = await newTeacher.save();
    logger.success(`Teacher profile created: ${savedTeacher.name}`);
    return savedTeacher;
  } catch (error) {
    logger.error('Error creating teacher:', error);
    throw error;
  }
};

/**
 * Get all teachers with optional department filter
 * @param {string} department - Optional department filter
 * @returns {Promise<Array>} - Array of teacher documents
 */
const getAllTeachers = async (department = null) => {
  try {
    const query = department && department !== 'ALL' ? { department } : {};
    const teachers = await Teacher.find(query);
    return teachers;
  } catch (error) {
    logger.error('Error fetching teachers:', error);
    throw error;
  }
};

/**
 * Get teacher by ID
 * @param {string} teacherId - Teacher ID
 * @returns {Promise<Object>} - Teacher document
 */
const getTeacherById = async (teacherId) => {
  try {
    const teacher = await Teacher.findById(teacherId);
    return teacher;
  } catch (error) {
    logger.error('Error fetching teacher by ID:', error);
    throw error;
  }
};

/**
 * Update teacher rating
 * @param {string} teacherId - Teacher ID
 * @param {number} adminRating - Admin rating value
 * @param {number} finalRating - Calculated final rating
 * @returns {Promise<Object>} - Updated teacher document
 */
const updateTeacherRating = async (teacherId, adminRating, finalRating) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(
      teacherId,
      { adminRating, finalRating },
      { new: true }
    );
    
    logger.success(`Rating updated for teacher: ${teacher.name}`);
    return teacher;
  } catch (error) {
    logger.error('Error updating teacher rating:', error);
    throw error;
  }
};

/**
 * Delete teacher by ID
 * @param {string} teacherId - Teacher ID
 * @returns {Promise<Object>} - Deleted teacher document
 */
const deleteTeacher = async (teacherId) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(teacherId);
    logger.success(`Teacher deleted: ${teacher?.name || teacherId}`);
    return teacher;
  } catch (error) {
    logger.error('Error deleting teacher:', error);
    throw error;
  }
};

/**
 * Get teachers with calculated ratings
 * @param {string} department - Optional department filter
 * @returns {Promise<Array>} - Teachers with calculated ratings
 */
const getTeachersWithRatings = async (department = null) => {
  try {
    const teachers = await getAllTeachers(department);
    
    const teachersWithRatings = teachers.map(teacher => {
      const autoRating = calculateAutoRating(teacher);
      const autoRatingOutOf10 = (autoRating / 10).toFixed(2);

      return {
        ...teacher._doc,
        autoRating: autoRatingOutOf10,
        adminRating: teacher.adminRating ?? 0,
        finalRating: teacher.finalRating ?? 0
      };
    });

    return teachersWithRatings;
  } catch (error) {
    logger.error('Error getting teachers with ratings:', error);
    throw error;
  }
};

/**
 * Get teachers by department
 * @param {string} department - Department name
 * @returns {Promise<Array>} - Array of teachers in the department
 */
const getTeachersByDepartment = async (department) => {
  try {
    const teachers = await Teacher.find({ department });
    return teachers;
  } catch (error) {
    logger.error('Error fetching teachers by department:', error);
    throw error;
  }
};

module.exports = {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacherRating,
  deleteTeacher,
  getTeachersWithRatings,
  getTeachersByDepartment
};
