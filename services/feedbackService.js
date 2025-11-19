const { generateFeedback } = require('../huggingFaceFeedback');
const DepartmentFeedback = require('../models/DepartmentFeedback');
const dedent = require('dedent');
const logger = require('../utils/logger');

/**
 * Generate performance feedback for a teacher
 * @param {Object} teacher - Teacher document
 * @returns {Promise<string>} - Generated feedback
 */
const generateTeacherFeedback = async (teacher) => {
  try {
    const prompt = dedent(`
      Provide point-wise, constructive feedback for a faculty member in the domain of ${teacher.domain}.

      Faculty profile:
      - Number of research papers: ${teacher.papers.length}
      - Number of workshops: ${teacher.workshops.length}
      - Number of awards: ${teacher.awards.length}
      - Teaching hours: ${teacher.hoursTaught}
      - Student feedback score: ${teacher.studentFeedback}

      The feedback should include:
      1. Areas of improvement in research and publications (e.g., trending subfields to explore).
      2. Suggestions for workshops or conferences relevant to the ${teacher.domain} domain.
      3. Recommendations for awards or grants based on their current achievements.
      4. Latest trends in teaching methods or educational technology tools that can enhance classroom experience.
      5. Use a professional yet encouraging tone.

      Begin the feedback with: "Dear ${teacher.name},"
    `);

    const feedback = await generateFeedback(prompt, teacher.name);
    return feedback;
  } catch (error) {
    logger.error('Error generating teacher feedback:', error);
    throw error;
  }
};

/**
 * Generate department-level feedback
 * @param {string} department - Department name
 * @param {Array} teachers - Array of teachers in the department
 * @returns {Promise<string>} - Generated department feedback
 */
const generateDepartmentFeedback = async (department, teachers) => {
  try {
    if (!teachers || teachers.length === 0) {
      throw new Error('No teachers found in this department');
    }

    // Combine profile data
    const profileSummaries = teachers.map(t => {
      return `Name: ${t.name}\nPapers: ${t.papers.length}, Workshops: ${t.workshops.length}, Awards: ${t.awards.length}, Teaching Hours: ${t.hoursTaught}, Feedback: ${t.studentFeedback}`;
    }).join('\n\n');

    const prompt = `
You are an academic reviewer generating a concise and professional feedback report for the "${department}" department, based on faculty achievements.

Faculty Profiles:
${profileSummaries}

Your output must be in the following format and should be clear with real-world on-going trends and links:

---
📘 ${department} Department  
Department Feedback for ${department}

Key Strengths:
- [3 concise points max]

Areas of Improvement:
- [3 concise points max]

Suggested Research & Conference Focus:
- [3 concise points max]

Teaching & Technology Trends:
- [3 concise points max]

Avoid unnecessary asterisks or lengthy explanations. Use a clear, readable tone that is professional and easy to scan.
`.trim();

    const feedback = await generateFeedback(prompt, `Department Feedback for ${department}`);
    return feedback;
  } catch (error) {
    logger.error('Error generating department feedback:', error);
    throw error;
  }
};

/**
 * Save department feedback to database
 * @param {string} department - Department name
 * @param {string} feedback - Generated feedback
 * @returns {Promise<Object>} - Saved feedback document
 */
const saveDepartmentFeedback = async (department, feedback) => {
  try {
    const savedFeedback = await DepartmentFeedback.findOneAndUpdate(
      { department },
      { feedback, generatedAt: new Date() },
      { upsert: true, new: true }
    );

    logger.success(`Department feedback saved for: ${department}`);
    return savedFeedback;
  } catch (error) {
    logger.error('Error saving department feedback:', error);
    throw error;
  }
};

/**
 * Get department feedbacks with optional filter
 * @param {string} department - Optional department filter
 * @returns {Promise<Array>} - Array of department feedback documents
 */
const getDepartmentFeedbacks = async (department = null) => {
  try {
    const query = department ? { department } : {};
    const feedbacks = await DepartmentFeedback.find(query);
    return feedbacks;
  } catch (error) {
    logger.error('Error fetching department feedbacks:', error);
    throw error;
  }
};

module.exports = {
  generateTeacherFeedback,
  generateDepartmentFeedback,
  saveDepartmentFeedback,
  getDepartmentFeedbacks
};
