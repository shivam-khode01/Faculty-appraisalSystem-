# Faculty Management System

A comprehensive faculty appraisal and feedback management system built with Node.js, Express, MongoDB, and AI-powered feedback generation.

## 🚀 Features

- **Faculty Profile Management**: Create, view, update, and delete faculty profiles
- **Automated Rating System**: Calculate ratings based on research papers, teaching hours, workshops, awards, and student feedback
- **AI-Powered Feedback**: Generate personalized feedback for individual faculty members
- **Department-Level Analytics**: Generate department-wide feedback and performance metrics
- **Comparison Dashboard**: Compare performance across different departments
- **Google Sheets Integration**: Automatically sync research paper data
- **Professional MVC Architecture**: Clean, maintainable, and scalable codebase

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- Google Cloud API credentials (for Google Sheets integration)
- HuggingFace API key (for AI feedback generation)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone [<repository-url>](https://github.com/shivam-khode01/Faculty-appraisalSystem-.git)
   cd "New folder"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Server Configuration
   PORT=3000
   NODE_ENV=development

   # Database Configuration
   MONGODB_URL=mongodb://localhost:27017/appraisalDB

   # HuggingFace API
   HUGGINGFACE_API_KEY=your_huggingface_api_key

   # Google Sheets API
   GOOGLE_SHEETS_CREDENTIALS_PATH=./google-credentials.json.json
   GOOGLE_SHEET_ID=your_google_sheet_id
   ```

4. **Set up Google Sheets credentials**
   
   Place your Google API credentials file in the root directory as `google-credentials.json.json`

5. **Start the application**
   ```bash
   npm start
   ```

   For development with auto-reload:
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
├── config/                 # Configuration files
│   ├── constants.js       # Application constants
│   └── database.js        # Database connection
├── controllers/           # Route controllers (MVC)
│   ├── adminController.js
│   ├── departmentController.js
│   └── teacherController.js
├── middleware/            # Custom middleware
│   ├── errorHandler.js
│   └── validators.js
├── models/                # Mongoose models
│   ├── DepartmentFeedback.js
│   └── Teacher.js
├── routes/                # Express routes
│   ├── adminRoutes.js
│   ├── departmentRoutes.js
│   ├── teacherRoutes.js
│   └── index.js
├── services/              # Business logic layer
│   ├── feedbackService.js
│   └── teacherService.js
├── utils/                 # Utility functions
│   ├── helpers.js
│   ├── logger.js
│   └── ratingCalculator.js
├── views/                 # EJS templates
│   ├── adminDashboard.ejs
│   ├── comparisonDashboard.ejs
│   ├── createProfile.ejs
│   ├── department-feedbacks.ejs
│   ├── Footer.ejs
│   ├── main.ejs
│   ├── NavBar.ejs
│   └── previewProfile.ejs
├── public/                # Static files
│   ├── css/
│   └── js/
├── app.js                 # Application entry point
├── package.json           # Dependencies
└── README.md             # Documentation
```

## 🎯 API Endpoints

### Faculty Profile Routes

- `GET /profile/create` - Show create profile form
- `POST /profile/create` - Create new faculty profile
- `GET /profile/:id` - View faculty profile with AI feedback
- `POST /profile/:id/delete` - Delete faculty profile

### Admin Routes

- `GET /admin/profiles` - View all faculty profiles
- `POST /admin/rate/:id` - Rate a faculty member

### Department Routes

- `GET /admin/department/feedbacks` - View department feedbacks
- `POST /admin/department/feedback/:department` - Generate department feedback
- `GET /admin/department/comparison` - View comparison dashboard

## 🔧 Configuration

### Rating Weights

The system calculates auto-ratings based on the following weights (configurable in `config/constants.js`):

- Research Papers: 30%
- Teaching Hours: 20%
- Student Feedback: 30%
- Workshops: 10%
- Awards: 10%

### Final Rating Calculation

- Auto Rating: 70%
- Admin Rating: 30%

## 📊 Departments Supported

- SOC (School of Commerce)
- SOE (School of Engineering)
- ISBJ (Institute of Business Journalism)
- MITCOM (Media Studies)
- VEDIC-SCIENCE
- CIVIL SERVICE
- DESIGN
- Core

## 🧪 Testing

```bash
# Run tests (once implemented)
npm test
```

## 📝 Logging

The application uses a custom logger with color-coded output:

- 🔵 INFO - General information
- 🟢 SUCCESS - Successful operations
- 🟡 WARN - Warnings
- 🔴 ERROR - Errors
- 🟣 DEBUG - Debug information (development only)

## 🔒 Error Handling

- Centralized error handling middleware
- Async error handling with `asyncHandler`
- Validation middleware for request data
- MongoDB ObjectId validation

## 🚀 Deployment

### Production Build

1. Set environment to production:
   ```env
   NODE_ENV=production
   ```

2. Use a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start app.js --name faculty-management
   ```

3. Set up MongoDB connection string for production database

4. Configure reverse proxy (Nginx/Apache) if needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- HuggingFace for AI feedback generation
- Google Sheets API for data synchronization
- MongoDB for database management
- Express.js community


