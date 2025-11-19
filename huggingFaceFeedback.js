const axios = require('axios');
const dedent = require('dedent');

const API_KEY = process.env.GROQ_API_KEY;
const MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

function cleanFeedback(text) {
  const unwantedMarker = 'Some additional guidelines:';
  let cleanedText = text;
  const index = cleanedText.indexOf(unwantedMarker);
  if (index !== -1) {
    cleanedText = cleanedText.slice(0, index).trim();
  }
  cleanedText = cleanedText.replace(/\[Your Name\]\s*$/i, '').trim();
  return cleanedText;
}

async function generateFeedback(prompt, teacherName) {
  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: MODEL,
        messages: [
          { 
            role: 'system', 
            content: 'You are an academic performance feedback generator for faculty. Provide constructive, professional feedback.'
          },
          { 
            role: 'user', 
            content: prompt 
          }
        ],
        temperature: 0.7,
        max_tokens: 2048
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 60000
      }
    );

    const message = response.data.choices[0].message.content;
    
    const normalizedTeacherName = teacherName.trim();
    const startPhrase = `Dear ${normalizedTeacherName},`;
    const match = message.match(new RegExp(startPhrase, 'i'));

    let feedback = match ? message.substring(match.index).trim() : message;
    return cleanFeedback(feedback);
  } catch (err) {
    const errorMessage = err.response?.data?.error?.message;
    const errorCode = err.response?.data?.error?.code;
    
    console.error('Feedback generation error:', errorMessage || err.message);
    
    if (err.response?.status === 401 || errorCode === 'invalid_api_key') {
      return `Dear ${teacherName},\n\nFeedback generation is temporarily unavailable due to configuration issues. Please contact the system administrator.`;
    }
    
    return `Dear ${teacherName},\n\nThank you for your continued dedication. Your performance data has been recorded. Detailed feedback will be available shortly.`;
  }
}

module.exports = { generateFeedback, dedent };
