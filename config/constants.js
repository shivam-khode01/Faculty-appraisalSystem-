/**
 * Application constants and configuration
 */

module.exports = {
  // Departments list
  DEPARTMENTS: ['SOC', 'SOE', 'ISBJ', 'MITCOM', 'VEDIC-SCIENCE', 'CIVIL SERVICE', 'DESIGN', 'Core'],

  // Rating calculation weights
  RATING_WEIGHTS: {
    researchPapers: 0.3,
    teachingHours: 0.2,
    studentFeedback: 0.3,
    workshops: 0.1,
    awards: 0.1
  },

  // Score calculation thresholds
  SCORE_THRESHOLDS: {
    researchPapers: 5,
    teachingHours: 100,
    studentFeedback: 8,
    workshops: 3,
    awards: 2
  },

  // Rating calculation
  RATING_CALCULATION: {
    autoRatingWeight: 0.7,
    adminRatingWeight: 0.3,
    maxRating: 10,
    minRating: 0
  },

  // API response messages
  MESSAGES: {
    SUCCESS: {
      PROFILE_CREATED: 'Faculty profile created successfully',
      PROFILE_UPDATED: 'Faculty profile updated successfully',
      PROFILE_DELETED: 'Faculty profile deleted successfully',
      RATING_SAVED: 'Rating saved successfully',
      FEEDBACK_GENERATED: 'Feedback generated successfully'
    },
    ERROR: {
      PROFILE_NOT_FOUND: 'Faculty profile not found',
      INVALID_RATING: 'Rating must be between 0 and 10',
      REQUIRED_FIELDS: 'Name, designation, department, and domain are required',
      SERVER_ERROR: 'Internal server error',
      NO_TEACHERS: 'No teachers found in this department',
      FEEDBACK_GENERATION_FAILED: 'Failed to generate feedback'
    }
  },

  // HTTP Status codes
  STATUS_CODES: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
  }
};
