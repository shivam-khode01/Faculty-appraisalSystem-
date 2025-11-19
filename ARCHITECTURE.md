# Faculty Management System - Architecture Documentation

## Architecture Overview

This application follows the **MVC (Model-View-Controller)** architecture pattern with an additional **Service Layer** for better separation of concerns and maintainability.

## Directory Structure

```
faculty-management-system/
│
├── app.js                      # Application entry point
├── package.json                # Dependencies and scripts
├── .env                        # Environment variables (not in git)
├── .env.example                # Example environment configuration
├── .gitignore                  # Git ignore rules
├── README.md                   # Project documentation
│
├── config/                     # Configuration files
│   ├── constants.js           # Application constants (departments, weights, etc.)
│   └── database.js            # MongoDB connection configuration
│
├── controllers/                # Request handlers (MVC Controllers)
│   ├── adminController.js     # Admin dashboard and rating operations
│   ├── departmentController.js # Department feedback and comparison
│   └── teacherController.js   # Faculty profile CRUD operations
│
├── middleware/                 # Custom Express middleware
│   ├── errorHandler.js        # Global error handling
│   └── validators.js          # Request validation middleware
│
├── models/                     # Mongoose schemas (MVC Models)
│   ├── DepartmentFeedback.js  # Department feedback schema
│   └── Teacher.js             # Teacher profile schema
│
├── routes/                     # Express routes
│   ├── index.js               # Main router (aggregates all routes)
│   ├── adminRoutes.js         # Admin-related routes
│   ├── departmentRoutes.js    # Department-related routes
│   └── teacherRoutes.js       # Teacher-related routes
│
├── services/                   # Business logic layer
│   ├── feedbackService.js     # AI feedback generation logic
│   └── teacherService.js      # Teacher data operations
│
├── utils/                      # Utility functions
│   ├── helpers.js             # Common helper functions
│   ├── logger.js              # Logging utility
│   └── ratingCalculator.js   # Rating calculation logic
│
├── views/                      # EJS templates (MVC Views)
│   ├── main.ejs               # Main layout template
│   ├── NavBar.ejs             # Navigation bar partial
│   ├── Footer.ejs             # Footer partial
│   ├── adminDashboard.ejs     # Admin dashboard view
│   ├── comparisonDashboard.ejs # Department comparison view
│   ├── createProfile.ejs      # Create profile form
│   ├── department-feedbacks.ejs # Department feedbacks view
│   └── previewProfile.ejs     # Teacher profile detail view
│
└── public/                     # Static assets
    ├── css/                    # Stylesheets
    └── js/                     # Client-side JavaScript
```

## Layer Responsibilities

### 1. Models Layer (`/models`)
- **Purpose**: Define data structure and database schema
- **Responsibilities**:
  - Mongoose schema definitions
  - Data validation rules
  - Model methods and statics
  - Virtual properties

### 2. Views Layer (`/views`)
- **Purpose**: Presentation layer using EJS templates
- **Responsibilities**:
  - HTML rendering
  - User interface components
  - Template partials
  - Client-side data display

### 3. Controllers Layer (`/controllers`)
- **Purpose**: Handle HTTP requests and responses
- **Responsibilities**:
  - Receive and validate requests
  - Call appropriate services
  - Format responses
  - Handle redirects
  - **Note**: Controllers should be thin - no business logic here!

### 4. Services Layer (`/services`)
- **Purpose**: Business logic implementation
- **Responsibilities**:
  - Complex data operations
  - Business rule enforcement
  - Data aggregation and transformation
  - External API calls (AI, Google Sheets)
  - Database queries (via models)

### 5. Routes Layer (`/routes`)
- **Purpose**: Define API endpoints and route handling
- **Responsibilities**:
  - Map URLs to controllers
  - Apply middleware (validation, authentication)
  - Route organization and grouping

### 6. Middleware Layer (`/middleware`)
- **Purpose**: Request processing pipeline
- **Responsibilities**:
  - Request validation
  - Error handling
  - Authentication/Authorization (if added)
  - Logging and monitoring

### 7. Utils Layer (`/utils`)
- **Purpose**: Reusable utility functions
- **Responsibilities**:
  - Helper functions
  - Calculators
  - Formatters
  - Logger

### 8. Config Layer (`/config`)
- **Purpose**: Application configuration
- **Responsibilities**:
  - Constants and enums
  - Database connection
  - Environment-specific settings

## Request Flow

```
Client Request
    ↓
Express Router (/routes)
    ↓
Middleware (validation, etc.)
    ↓
Controller (/controllers)
    ↓
Service Layer (/services)
    ↓
Model/Database (/models)
    ↓
Response back through layers
    ↓
View Rendering (/views)
    ↓
Client Response
```

## Design Patterns Used

### 1. MVC Pattern
- Separation of concerns between data, presentation, and logic

### 2. Service Layer Pattern
- Business logic separated from controllers
- Reusable across different controllers

### 3. Repository Pattern (via Services)
- Data access abstraction
- Services handle all database operations

### 4. Middleware Pattern
- Request processing pipeline
- Reusable request handlers

### 5. Async Handler Pattern
- Consistent async error handling
- Eliminates try-catch boilerplate

## Key Features of This Architecture

### ✅ Separation of Concerns
- Each layer has a single, well-defined responsibility
- Easy to locate and modify specific functionality

### ✅ Maintainability
- Code is organized logically
- Changes in one layer don't affect others
- Easy to understand and navigate

### ✅ Scalability
- Easy to add new features
- Can scale individual components independently
- Clear structure for team collaboration

### ✅ Testability
- Services can be tested independently
- Controllers are thin and easy to test
- Mock dependencies easily

### ✅ Reusability
- Services can be shared across controllers
- Utils can be used anywhere
- Middleware can be applied to multiple routes

### ✅ Error Handling
- Centralized error handling
- Consistent error responses
- Async error handling with asyncHandler

## Best Practices Implemented

1. **Environment Variables**: All sensitive data in .env file
2. **Error Handling**: Centralized error handler with proper HTTP status codes
3. **Validation**: Input validation at middleware level
4. **Logging**: Consistent logging with color-coded output
5. **Code Organization**: Clear separation of concerns
6. **Constants**: Centralized constants management
7. **Documentation**: Comprehensive JSDoc comments
8. **Git Ignore**: Proper .gitignore for sensitive files
9. **Async/Await**: Modern async handling throughout
10. **Route Organization**: Logical grouping of related routes

## API Conventions

### HTTP Methods
- `GET`: Retrieve data
- `POST`: Create or submit data
- `PUT/PATCH`: Update data (if needed)
- `DELETE`: Remove data

### Response Format
```javascript
// Success
{
  success: true,
  data: {...},
  message: "Operation successful"
}

// Error
{
  success: false,
  message: "Error description",
  stack: "..." // Only in development
}
```

### HTTP Status Codes
- `200`: OK - Successful GET, PUT
- `201`: Created - Successful POST
- `400`: Bad Request - Validation error
- `404`: Not Found - Resource not found
- `500`: Server Error - Internal error

## Database Schema

### Teacher Model
```javascript
{
  name: String,
  designation: String,
  department: String,
  domain: String,
  expectedHours: Number,
  hoursTaught: Number,
  studentFeedback: Number,
  papers: [PaperSchema],
  workshops: [WorkshopSchema],
  awards: [AwardSchema],
  adminRating: Number,
  finalRating: Number
}
```

### DepartmentFeedback Model
```javascript
{
  department: String,
  feedback: String,
  generatedAt: Date
}
```

## Future Enhancements

1. **Authentication & Authorization**
   - Add user roles (Admin, Faculty, HOD)
   - JWT token-based authentication

2. **API Documentation**
   - Swagger/OpenAPI documentation
   - API versioning

3. **Testing**
   - Unit tests (Jest)
   - Integration tests
   - E2E tests

4. **Performance**
   - Redis caching
   - Database indexing
   - Query optimization

5. **Monitoring**
   - Application monitoring (PM2, New Relic)
   - Log aggregation (ELK stack)
   - Performance metrics

6. **Security**
   - Rate limiting
   - CORS configuration
   - Input sanitization
   - SQL injection prevention

---

This architecture provides a solid foundation for a professional, maintainable, and scalable application.
