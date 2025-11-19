# AI Model Configuration Guide - Ollama (Local AI)

## Overview

The Faculty Management System now uses **Ollama** for local AI-powered feedback generation. This provides:
- 🆓 **Free** - No API costs
- 🔒 **Private** - Data stays on your machine  
- ⚡ **Fast** - No network latency
- 🌐 **Offline** - Works without internet

## Quick Start

### 1. Install Ollama

**Windows:**
```powershell
# Download and run installer from:
# https://ollama.ai/download/windows
```

**Linux/Mac:**
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

### 2. Start Ollama

Open a terminal and run:
```bash
ollama serve
```
Keep this terminal running in the background.

### 3. Download a Model

In another terminal:
```bash
# Recommended model (2GB, fast and accurate)
ollama pull llama3.2

# Verify installation
ollama list
```

### 4. Configure Environment

Your `.env` file is already configured:
```env
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.2
```

### 5. Restart the Application

```bash
npm start
```

## Available Models

### Recommended Models

| Model | Size | RAM Needed | Speed | Quality | Use Case |
|-------|------|------------|-------|---------|----------|
| `llama3.2` | 2GB | 8GB | Fast | High | **Default - Best balance** |
| `llama2` | 3.8GB | 8GB | Fast | Good | Quick responses |
| `mistral` | 4.1GB | 8GB | Medium | High | Quality feedback |
| `mixtral` | 26GB | 32GB | Slow | Excellent | Best quality |
| `phi` | 1.7GB | 4GB | Very Fast | Good | Low-resource systems |

### Specialized Models

| Model | Size | Use Case |
|-------|------|----------|
| `codellama` | 3.8GB | Technical/CS departments |
| `neural-chat` | 4.1GB | Conversational feedback |
| `orca-mini` | 1.9GB | Fast, low-resource |

### To Change Model

1. Download new model:
   ```bash
   ollama pull mistral
   ```

2. Update `.env`:
   ```env
   OLLAMA_MODEL=mistral
   ```

3. Restart server

## Troubleshooting

### "Ollama Not Running" Error

**Problem**: Application can't connect to Ollama.

**Solution**:
```bash
# Start Ollama service
ollama serve
```

### "Model Not Found" Error

**Problem**: The model isn't downloaded.

**Solution**:
```bash
# Download the model
ollama pull llama3.2

# List installed models
ollama list
```

### Slow Performance

**Solutions**:
1. Use a smaller model: `phi` or `llama2`
2. Increase RAM allocation
3. Close other applications
4. Use GPU if available (Ollama auto-detects)

### Connection Refused (Port 11434)

**Check if Ollama is running**:
```bash
# Windows
curl http://localhost:11434

# Or check in browser
# Visit: http://localhost:11434
```

**Solution**:
```bash
# Make sure Ollama service is started
ollama serve
```

## Performance Tuning

### In `huggingFaceFeedback.js`, you can adjust:

```javascript
options: {
  temperature: 0.7,    // Creativity (0.0-1.0)
  num_predict: 2048    // Max response length
}
```

- **Lower temperature** (0.3-0.5): More focused, consistent
- **Higher temperature** (0.7-1.0): More creative, varied
- **Lower num_predict** (512-1024): Faster, shorter responses
- **Higher num_predict** (2048-4096): Detailed, longer feedback

## Useful Commands

```bash
# List all installed models
ollama list

# Remove a model
ollama rm llama2

# Show model info
ollama show llama3.2

# Update Ollama
# Windows: Re-download installer
# Linux/Mac:
curl -fsSL https://ollama.ai/install.sh | sh
```

## Resources

- **Ollama Website**: https://ollama.ai/
- **Model Library**: https://ollama.ai/library
- **GitHub**: https://github.com/ollama/ollama
- **Discord Community**: https://discord.gg/ollama

## Comparison: Ollama vs Groq

| Feature | Ollama (Local) | Groq (Cloud) |
|---------|----------------|--------------|
| Cost | Free | Free tier + paid |
| Privacy | Private | Data sent to cloud |
| Speed | Fast (local) | Very fast (cloud GPUs) |
| Internet | Not required | Required |
| Setup | Install software | API key only |
| Models | Download locally | Pre-hosted |
| Limits | Your hardware | API rate limits |

**Ollama is perfect for**:
- Development and testing
- Privacy-sensitive data
- Offline environments
- Cost-conscious projects

**Groq is better for**:
- Production at scale
- Limited local resources
- Fastest inference speed
- No local setup
