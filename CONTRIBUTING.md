# Contributing to Faculty Management System

Thank you for considering contributing to this project! Here are some guidelines to help you get started.

## Code of Conduct

- Be respectful and inclusive
- Follow professional coding standards
- Provide constructive feedback
- Help others learn and grow

## Getting Started

1. **Fork the repository**
2. **Clone your fork**
 faculty-management-system
   ```
3. **Install dependencies**
   ```bash
   npm install
   ```
4. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### 1. Setting Up Development Environment

- Copy `.env.example` to `.env` and configure your environment variables
- Ensure MongoDB is running locally or configure a remote connection
- Set up your HuggingFace API key
- Configure Google Sheets credentials if needed

### 2. Running in Development Mode

```bash
npm run dev
```

This uses nodemon for auto-reloading on file changes.

### 3. Code Style Guidelines

#### JavaScript Style
- Use ES6+ features (const, let, arrow functions, async/await)
- Use 2 spaces for indentation
- Use semicolons
- Use single quotes for strings
- Add JSDoc comments for functions

Example:
```javascript
/**
 * Calculate the final rating
 * @param {number} autoRating - Automatically calculated rating
 * @param {number} adminRating - Admin provided rating
 * @returns {number} - Final combined rating
 */
const calculateFinalRating = (autoRating, adminRating) => {
  // Implementation
};
```

#### File Organization
- Place controllers in `/controllers`
- Place services in `/services`
- Place utilities in `/utils`
- Place routes in `/routes`
- Place models in `/models`

#### Naming Conventions
- **Files**: camelCase (e.g., `teacherController.js`)
- **Functions**: camelCase (e.g., `createTeacher`)
- **Classes/Models**: PascalCase (e.g., `Teacher`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `RATING_WEIGHTS`)
- **Variables**: camelCase (e.g., `teacherId`)

### 4. Architecture Principles

Follow the MVC + Service Layer architecture:

```
Request → Route → Middleware → Controller → Service → Model → Database
```

- **Controllers**: Handle HTTP requests, thin layer
- **Services**: Business logic, reusable functions
- **Models**: Data structure and validation
- **Utils**: Helper functions, no dependencies
- **Middleware**: Request processing pipeline

### 5. Error Handling

Always use the asyncHandler for async routes:

```javascript
const { asyncHandler } = require('../middleware/errorHandler');

const myRoute = asyncHandler(async (req, res) => {
  // Your async code here
  // Errors will be automatically caught and handled
});
```

### 6. Validation

Add validation middleware before controller functions:

```javascript
router.post('/create',
  validateTeacherProfile,  // Validation middleware
  teacherController.createProfile
);
```

### 7. Logging

Use the provided logger utility:

```javascript
const logger = require('../utils/logger');

logger.info('Information message');
logger.success('Success message');
logger.warn('Warning message');
logger.error('Error message');
logger.debug('Debug message'); // Only in development
```

## Making Changes

### 1. Feature Development

- Create a new branch for each feature
- Keep commits focused and atomic
- Write descriptive commit messages

Example commit message:
```
feat: Add teacher rating export functionality

- Add export service in teacherService.js
- Create new route for CSV export
- Update admin dashboard with export button
```

### 2. Bug Fixes

- Create a branch named `fix/bug-description`
- Reference issue number in commit message
- Add tests if applicable

Example commit message:
```
fix: Resolve rating calculation overflow (#123)

- Fix division by zero in ratingCalculator.js
- Add validation for empty teacher profiles
- Update tests
```

### 3. Code Review Checklist

Before submitting a PR, ensure:

- [ ] Code follows the style guidelines
- [ ] All functions have JSDoc comments
- [ ] No console.logs (use logger instead)
- [ ] Error handling is implemented
- [ ] No sensitive data in code
- [ ] .env.example is updated if needed
- [ ] README is updated if needed
- [ ] Code is tested locally

## Commit Message Guidelines

Follow the Conventional Commits specification:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

## Pull Request Process

1. **Update documentation** if needed
2. **Ensure all tests pass** (once implemented)
3. **Update the CHANGELOG** with your changes
4. **Request review** from maintainers
5. **Address feedback** promptly
6. **Squash commits** if requested

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe how you tested your changes

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings
```

## Adding New Features

### Example: Adding a New Route

1. **Create service function** in `/services`
   ```javascript
   // services/teacherService.js
   const getTeacherStats = async (teacherId) => {
     // Implementation
   };
   ```

2. **Create controller** in `/controllers`
   ```javascript
   // controllers/teacherController.js
   const getStats = asyncHandler(async (req, res) => {
     const stats = await teacherService.getTeacherStats(req.params.id);
     res.json({ success: true, data: stats });
   });
   ```

3. **Add route** in `/routes`
   ```javascript
   // routes/teacherRoutes.js
   router.get('/:id/stats', validateObjectId, teacherController.getStats);
   ```

4. **Update constants** if needed
   ```javascript
   // config/constants.js
   STATS_CONFIG: {
     maxItems: 10,
     cacheTime: 3600
   }
   ```

## Testing Guidelines

### Manual Testing
- Test all CRUD operations
- Test edge cases (empty data, invalid input)
- Test error scenarios
- Test with different user roles (when auth is added)

### Automated Testing (Future)
```bash
npm test
```

## Documentation

- Update README.md for user-facing changes
- Update ARCHITECTURE.md for structural changes
- Add JSDoc comments for all functions
- Update API documentation

## Questions or Issues?

- Check existing issues first
- Create a new issue with detailed description
- Join our community discussions
- Contact maintainers

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

---

Thank you for contributing! 🎉
