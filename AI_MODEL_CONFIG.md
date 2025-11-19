# AI Model Configuration Guide

## Current Setup

The application uses **Groq API** for AI-powered feedback generation with the following model:

- **Model**: `llama-3.3-70b-versatile`
- **API Endpoint**: `https://api.groq.com/openai/v1/chat/completions`
- **Configuration File**: `huggingFaceFeedback.js`

## Environment Setup

Add your Groq API key to `.env`:

```env
GROQ_API_KEY=your_groq_api_key_here
```

Get your API key from: https://console.groq.com/

## Supported Models (as of Nov 2025)

### Recommended Models

| Model | Size | Use Case | Speed |
|-------|------|----------|-------|
| `llama-3.3-70b-versatile` | 70B | General purpose, high quality | Fast |
| `llama-3.1-70b-versatile` | 70B | Previous generation, reliable | Fast |
| `llama-3.1-8b-instant` | 8B | Quick responses, lower quality | Very Fast |
| `mixtral-8x7b-32768` | 8x7B | Large context, good quality | Medium |

### Deprecated Models (DO NOT USE)

- ❌ `llama3-70b-8192` - Decommissioned
- ❌ `llama3-8b-8192` - Decommissioned

## Changing the Model

Edit `huggingFaceFeedback.js`:

```javascript
async function generateFeedback(prompt, teacherName) {
  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.3-70b-versatile', // ← Change this
        messages: [
          { role: 'system', content: 'You are an academic performance feedback generator for faculty.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,        // Creativity (0.0-1.0)
        max_tokens: 2048         // Response length
      },
      // ...
    );
  }
}
```

## Model Parameters

### Temperature
- **Range**: 0.0 - 1.0
- **0.0**: Deterministic, focused responses
- **0.7**: Balanced (current setting)
- **1.0**: Creative, varied responses

### Max Tokens
- **Current**: 2048 tokens
- **Recommendation**: 1024-2048 for faculty feedback
- **Maximum**: Varies by model (check Groq docs)

## Testing AI Feedback

### 1. Generate Teacher Feedback
Visit: `http://localhost:3000/admin/profile/:id`

### 2. Generate Department Feedback
Visit: `http://localhost:3000/admin/department-feedbacks`
- Select a department
- Click "Generate Feedback"

## Troubleshooting

### Error: Model Decommissioned
```
The model `llama3-70b-8192` has been decommissioned
```

**Solution**: Update the model name in `huggingFaceFeedback.js` to a supported model.

### Error: API Key Missing
```
⚠️ GROQ_API_KEY not configured
```

**Solution**: Add `GROQ_API_KEY` to your `.env` file.

### Error: Rate Limit Exceeded
```
Rate limit exceeded
```

**Solution**: 
- Wait a few minutes
- Upgrade your Groq plan
- Reduce frequency of API calls

### Error: Invalid API Key
```
Unauthorized
```

**Solution**: 
- Check your API key is correct
- Regenerate key from Groq console
- Ensure no extra spaces in `.env`

## Alternative AI Providers

If you want to switch providers, here are alternatives:

### OpenAI GPT
```javascript
const response = await axios.post(
  'https://api.openai.com/v1/chat/completions',
  {
    model: 'gpt-4-turbo-preview',
    messages: [...]
  },
  {
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    }
  }
);
```

### Anthropic Claude
```javascript
const response = await axios.post(
  'https://api.anthropic.com/v1/messages',
  {
    model: 'claude-3-opus-20240229',
    max_tokens: 2048,
    messages: [...]
  },
  {
    headers: {
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'Content-Type': 'application/json'
    }
  }
);
```

### HuggingFace Inference API
```javascript
const response = await axios.post(
  'https://api-inference.huggingface.co/models/meta-llama/Llama-2-70b-chat-hf',
  {
    inputs: prompt
  },
  {
    headers: {
      'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
      'Content-Type': 'application/json'
    }
  }
);
```

## Cost Considerations

### Groq (Current)
- ✅ **Free Tier**: Generous limits
- ✅ **Very Fast**: Optimized inference
- ✅ **Good Quality**: LLaMA 3.3 70B

### Comparison with Others
| Provider | Free Tier | Cost (per 1M tokens) | Speed |
|----------|-----------|---------------------|-------|
| Groq | Yes | Free/Low | Very Fast |
| OpenAI | No | $10-$60 | Fast |
| Anthropic | No | $15-$75 | Fast |
| HuggingFace | Yes | Free/Variable | Medium |

## Best Practices

1. **Cache Results**: Store generated feedback in database to avoid re-generation
2. **Batch Requests**: Generate multiple feedbacks in one session
3. **Error Handling**: Always handle API failures gracefully
4. **Rate Limiting**: Implement delays between requests if needed
5. **Monitor Usage**: Track API calls and costs

## Current Implementation

The application generates two types of feedback:

### 1. Individual Teacher Feedback
- Generated when viewing a teacher profile
- Includes: research, workshops, teaching, awards analysis
- Stored temporarily (regenerated each time)

### 2. Department-Level Feedback
- Generated on-demand for entire department
- Includes: aggregate stats, trends, recommendations
- Stored in database (`DepartmentFeedback` model)

## Future Enhancements

- [ ] Cache individual teacher feedback
- [ ] Add feedback regeneration button
- [ ] Allow custom prompts
- [ ] Compare different models
- [ ] Add feedback quality rating
- [ ] Schedule automatic feedback generation
- [ ] Multi-language support

## Resources

- **Groq Console**: https://console.groq.com/
- **Model Documentation**: https://console.groq.com/docs/models
- **API Reference**: https://console.groq.com/docs/api-reference
- **Deprecations**: https://console.groq.com/docs/deprecations

---

**Last Updated**: November 19, 2025  
**Current Model**: llama-3.3-70b-versatile
