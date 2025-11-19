# Quick Start Guide

Get up and running with the Faculty Management System in 5 minutes!

## Prerequisites Check

Before starting, ensure you have:

```bash
node --version    # v14 or higher
npm --version     # v6 or higher
mongod --version  # v4.4 or higher
```

## 5-Minute Setup

### Step 1: Clone and Install (1 minute)

```bash
cd "c:\Users\shiva\Desktop\New folder"
npm install
```

### Step 2: Configure Environment (2 minutes)

Create `.env` file:

```env
PORT=3000
NODE_ENV=development
MONGODB_URL=mongodb://localhost:27017/appraisalDB
HUGGINGFACE_API_KEY=your_key_here
```

### Step 3: Start MongoDB (1 minute)

```bash
# Windows
net start MongoDB

# Or if installed manually
mongod --dbpath C:\data\db
```

### Step 4: Run Application (1 minute)

```bash
npm start
```

Visit: http://localhost:3000

## First Use

### Create Your First Faculty Profile

1. Go to http://localhost:3000/profile/create
2. Fill in the form:
   - Name: Dr. John Doe
   - Designation: Professor
   - Department: SOC
   - Domain: Computer Science
   - Teaching Hours: 120
   - Student Feedback: 8.5
3. Add research papers, workshops, awards
4. Click "Create Profile"

### View Admin Dashboard

1. Go to http://localhost:3000/admin/profiles
2. See all faculty profiles with auto-calculated ratings
3. Click "Rate" to add admin rating
4. View individual profiles for AI feedback

### Generate Department Feedback

1. Go to http://localhost:3000/admin/department/feedbacks
2. Select a department
3. Click "Generate Feedback"
4. View AI-generated insights

## Development Mode

For auto-reload during development:

```bash
npm run dev
```

## Common Issues & Solutions

### MongoDB Connection Error
```bash
# Error: connect ECONNREFUSED
# Solution: Start MongoDB service
net start MongoDB
```

### Port Already in Use
```bash
# Error: EADDRINUSE
# Solution: Change port in .env
PORT=3001
```

### Missing Environment Variables
```bash
# Error: HUGGINGFACE_API_KEY is not defined
# Solution: Add to .env file
HUGGINGFACE_API_KEY=your_key_here
```

## Project Structure Quick Reference

```
📁 Project Root
├── 📄 app.js              ← Start here
├── 📁 controllers/        ← Request handlers
├── 📁 services/           ← Business logic
├── 📁 routes/             ← API endpoints
├── 📁 models/             ← Database schemas
├── 📁 views/              ← UI templates
├── 📁 config/             ← Configuration
├── 📁 middleware/         ← Request processing
└── 📁 utils/              ← Helper functions
```

## Essential Commands

```bash
# Start application
npm start

# Development mode (auto-reload)
npm run dev

# Stop application
Ctrl + C

# View logs
# Check console output

# Clear database (be careful!)
mongo appraisalDB --eval "db.dropDatabase()"
```

## Next Steps

1. ✅ Read [README.md](README.md) for detailed documentation
2. ✅ Explore [ARCHITECTURE.md](ARCHITECTURE.md) to understand structure
3. ✅ Check [CONTRIBUTING.md](CONTRIBUTING.md) if you want to contribute
4. ✅ Review [CHANGELOG.md](CHANGELOG.md) for version history

## Need Help?

- 📖 Documentation: See README.md
- 🐛 Bug Reports: Create an issue
- 💡 Feature Requests: Create an issue
- ❓ Questions: Check existing issues or create new one

## API Endpoints Quick Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Redirect to admin dashboard |
| GET | `/profile/create` | Create profile form |
| POST | `/profile/create` | Submit new profile |
| GET | `/profile/:id` | View profile details |
| POST | `/profile/:id/delete` | Delete profile |
| GET | `/admin/profiles` | Admin dashboard |
| POST | `/admin/rate/:id` | Rate teacher |
| GET | `/admin/department/feedbacks` | Department feedbacks |
| POST | `/admin/department/feedback/:dept` | Generate feedback |
| GET | `/admin/department/comparison` | Comparison dashboard |

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| PORT | No | 3000 | Server port |
| NODE_ENV | No | development | Environment |
| MONGODB_URL | Yes | - | MongoDB connection |
| HUGGINGFACE_API_KEY | Yes | - | AI API key |

## Troubleshooting Checklist

- [ ] MongoDB is running
- [ ] .env file exists with all required variables
- [ ] Node modules installed (npm install)
- [ ] Port is not in use
- [ ] MongoDB connection string is correct
- [ ] API keys are valid

---

🎉 **You're all set!** Start building amazing faculty management features!

For detailed documentation, see [README.md](README.md)
