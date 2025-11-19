const { MESSAGES, STATUS_CODES } = require('../config/constants');

/**
 * Validate teacher profile creation data
 */
const validateTeacherProfile = (req, res, next) => {
  const { name, designation, department, domain } = req.body;

  if (!name || !designation || !department || !domain) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      success: false,
      message: MESSAGES.ERROR.REQUIRED_FIELDS
    });
  }

  // Validate name length
  if (name.trim().length < 2) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      success: false,
      message: 'Name must be at least 2 characters long'
    });
  }

  next();
};

/**
 * Validate rating data
 */
const validateRating = (req, res, next) => {
  const { adminRating } = req.body;

  if (adminRating === undefined || adminRating === null) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      success: false,
      message: 'Admin rating is required'
    });
  }

  const rating = parseFloat(adminRating);
  
  if (isNaN(rating) || rating < 0 || rating > 10) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      success: false,
      message: MESSAGES.ERROR.INVALID_RATING
    });
  }

  req.body.adminRating = rating;
  next();
};

/**
 * Validate MongoDB ObjectId
 */
const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      success: false,
      message: 'Invalid ID format'
    });
  }

  next();
};

module.exports = {
  validateTeacherProfile,
  validateRating,
  validateObjectId
};
