const { RATING_WEIGHTS, SCORE_THRESHOLDS, RATING_CALCULATION } = require('../config/constants');

/**
 * Calculate auto-rating score for a teacher profile (0-100)
 * @param {Object} profile - Teacher profile object
 * @returns {number} - Calculated score
 */
const calculateAutoRating = (profile) => {
  const researchScore = Math.min((profile.papers?.length ?? 0) / SCORE_THRESHOLDS.researchPapers, 1) * 100;
  const teachingScore = Math.min((profile.hoursTaught ?? 0) / SCORE_THRESHOLDS.teachingHours, 1) * 100;
  const feedbackScore = Math.min((profile.studentFeedback ?? 0) / SCORE_THRESHOLDS.studentFeedback, 1) * 100;
  const workshopsScore = Math.min((profile.workshops?.length ?? 0) / SCORE_THRESHOLDS.workshops, 1) * 100;
  const awardsScore = Math.min((profile.awards?.length ?? 0) / SCORE_THRESHOLDS.awards, 1) * 100;

  const total =
    (researchScore * RATING_WEIGHTS.researchPapers) +
    (teachingScore * RATING_WEIGHTS.teachingHours) +
    (feedbackScore * RATING_WEIGHTS.studentFeedback) +
    (workshopsScore * RATING_WEIGHTS.workshops) +
    (awardsScore * RATING_WEIGHTS.awards);

  return total;
};

/**
 * Calculate final rating combining auto-rating and admin rating
 * @param {number} autoRating - Automatically calculated rating
 * @param {number} adminRating - Admin provided rating
 * @returns {number} - Final combined rating
 */
const calculateFinalRating = (autoRating, adminRating) => {
  const autoRatingOutOf10 = autoRating / 10;
  const finalRating = 
    (autoRatingOutOf10 * RATING_CALCULATION.autoRatingWeight) + 
    (adminRating * RATING_CALCULATION.adminRatingWeight);
  
  return parseFloat(finalRating.toFixed(2));
};

/**
 * Validate rating value
 * @param {number} rating - Rating value to validate
 * @returns {boolean} - True if valid
 */
const isValidRating = (rating) => {
  return !isNaN(rating) && 
         rating >= RATING_CALCULATION.minRating && 
         rating <= RATING_CALCULATION.maxRating;
};

module.exports = {
  calculateAutoRating,
  calculateFinalRating,
  isValidRating
};
