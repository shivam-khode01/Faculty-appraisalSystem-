/**
 * Process form arrays from POST request body
 * @param {Object} body - Request body from form submission
 * @returns {Object} - Processed arrays for papers, workshops, and awards
 */
const processFormArrays = (body) => {
  const result = { papers: [], workshops: [], awards: [] };

  // Process research papers
  if (body['papers-title']) {
    const titles = Array.isArray(body['papers-title']) ? body['papers-title'] : [body['papers-title']];
    const journals = Array.isArray(body['papers-journal']) ? body['papers-journal'] : [body['papers-journal']];
    const quartiles = Array.isArray(body['papers-quartile']) ? body['papers-quartile'] : [body['papers-quartile']];
    const years = Array.isArray(body['papers-year']) ? body['papers-year'] : [body['papers-year']];

    for (let i = 0; i < titles.length; i++) {
      if (titles[i]?.trim() && journals[i]?.trim()) {
        result.papers.push({
          title: titles[i].trim(),
          journalCorpus: journals[i].trim(),
          quartile: quartiles[i]?.trim() || '',
          year: parseInt(years[i]) || new Date().getFullYear()
        });
      }
    }
  }

  // Process workshops
  if (body['workshops-title']) {
    const titles = Array.isArray(body['workshops-title']) ? body['workshops-title'] : [body['workshops-title']];
    const conductedBy = Array.isArray(body['workshops-conducted']) ? body['workshops-conducted'] : [body['workshops-conducted']];
    const modes = Array.isArray(body['workshops-mode']) ? body['workshops-mode'] : [body['workshops-mode']];

    for (let i = 0; i < titles.length; i++) {
      if (titles[i]?.trim() && conductedBy[i]?.trim()) {
        result.workshops.push({
          title: titles[i].trim(),
          conductedBy: conductedBy[i].trim(),
          mode: modes[i]?.trim() || 'Online'
        });
      }
    }
  }

  // Process awards
  if (body['awards-name']) {
    const names = Array.isArray(body['awards-name']) ? body['awards-name'] : [body['awards-name']];
    const givenBy = Array.isArray(body['awards-by']) ? body['awards-by'] : [body['awards-by']];
    const years = Array.isArray(body['awards-year']) ? body['awards-year'] : [body['awards-year']];

    for (let i = 0; i < names.length; i++) {
      if (names[i]?.trim() && givenBy[i]?.trim()) {
        result.awards.push({
          name: names[i].trim(),
          by: givenBy[i].trim(),
          year: parseInt(years[i]) || new Date().getFullYear()
        });
      }
    }
  }

  return result;
};

/**
 * Extract keywords from feedback text
 * @param {string} feedbackText - Feedback text to parse
 * @returns {Object} - Object containing strength and weakness keywords
 */
const extractKeywords = (feedbackText) => {
  const strengthKeywords = [];
  const weaknessKeywords = [];

  const strengthRegex = /Key Strengths:\s*((?:- .+\n?)+)/i;
  const weaknessRegex = /Areas of Improvement:\s*((?:- .+\n?)+)/i;

  const matchStrength = feedbackText.match(strengthRegex);
  const matchWeakness = feedbackText.match(weaknessRegex);

  if (matchStrength) {
    matchStrength[1].split('\n').forEach(line => {
      const word = line.replace(/^- /, '').trim();
      if (word) strengthKeywords.push(word);
    });
  }

  if (matchWeakness) {
    matchWeakness[1].split('\n').forEach(line => {
      const word = line.replace(/^- /, '').trim();
      if (word) weaknessKeywords.push(word);
    });
  }

  return { strengthKeywords, weaknessKeywords };
};

/**
 * Get top keywords by frequency
 * @param {Array} list - List of keywords
 * @param {number} limit - Number of top keywords to return
 * @returns {Array} - Top keywords
 */
const getTopKeywords = (list, limit = 5) => {
  const freq = {};
  list.forEach(word => {
    const w = word.trim();
    freq[w] = (freq[w] || 0) + 1;
  });
  
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .map(entry => entry[0])
    .slice(0, limit);
};

module.exports = {
  processFormArrays,
  extractKeywords,
  getTopKeywords
};
