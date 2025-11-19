# Route Mapping Reference

## All Available Routes

### Public Routes

#### Faculty Profile Management
| Method | Route | Description | Controller |
|--------|-------|-------------|------------|
| GET | `/` | Redirect to admin dashboard | - |
| GET | `/profile/create` | Show create profile form | teacherController |
| POST | `/profile/create` | Create new faculty profile | teacherController |

### Admin Routes

#### Dashboard & Profile Management
| Method | Route | Description | Controller |
|--------|-------|-------------|------------|
| GET | `/admin/profiles` | View all faculty profiles | adminController |
| GET | `/admin/profile/:id` | View specific profile with AI feedback | teacherController |
| POST | `/admin/profile/:id/delete` | Delete faculty profile | teacherController |
| POST | `/admin/rate/:id` | Rate a faculty member | adminController |

#### Department Analytics
| Method | Route | Description | Controller |
|--------|-------|-------------|------------|
| GET | `/admin/department-feedbacks` | View department feedbacks | departmentController |
| POST | `/admin/department-feedback/:dept` | Generate dept feedback | departmentController |
| GET | `/admin/comparison-dashboard` | View comparison dashboard | departmentController |

---

## Route Parameters

### `:id` - MongoDB ObjectId
- Example: `685d4bf82d5c803fbd445e8e`
- Validated by `validateObjectId` middleware

### `:department` - Department Name
- Valid values: SOC, SOE, ISBJ, MITCOM, VEDIC-SCIENCE, CIVIL SERVICE, DESIGN, Core

---

## Query Parameters

### `/admin/profiles?department=:dept`
- Filter profiles by department
- Example: `/admin/profiles?department=SOC`

### `/admin/department-feedbacks?department=:dept`
- Filter feedbacks by department
- Example: `/admin/department-feedbacks?department=SOC`

---

## Route Organization

```
routes/
├── index.js                 ← Main router, mounts all routes
├── teacherRoutes.js         ← /profile/* routes
├── adminRoutes.js           ← /admin/* routes (profiles, rating)
└── departmentRoutes.js      ← /admin/* routes (department analytics)
```

---

## Fixed Issues

### ✅ Route Mapping
- Fixed `/admin/profile/:id` not found
- Fixed `/admin/comparison-dashboard` not found
- Properly mounted department routes under `/admin`

### ✅ Favicon Handling
- Added favicon.ico handling to prevent 404 errors
- Returns 204 No Content for favicon requests

---

## Testing Routes

### Using Browser
```
http://localhost:3000/
http://localhost:3000/profile/create
http://localhost:3000/admin/profiles
http://localhost:3000/admin/profile/YOUR_TEACHER_ID
http://localhost:3000/admin/department-feedbacks
http://localhost:3000/admin/comparison-dashboard
```

### Using Postman/cURL
```bash
# Create profile
curl -X POST http://localhost:3000/profile/create \
  -d "name=John Doe&designation=Professor&department=SOC&domain=CS"

# Get all profiles
curl http://localhost:3000/admin/profiles

# Rate a teacher
curl -X POST http://localhost:3000/admin/rate/TEACHER_ID \
  -d "adminRating=8.5"
```

---

## Middleware Applied

| Route Pattern | Middleware |
|---------------|-----------|
| `/profile/create` (POST) | validateTeacherProfile |
| `/admin/profile/:id` | validateObjectId |
| `/admin/rate/:id` | validateObjectId, validateRating |
| All routes | errorHandler (global) |

---

## Common Errors & Solutions

### 404 Not Found
```
Error: Not Found - /admin/profile/123
```
**Solution**: Check if the route exists in the table above

### Invalid ObjectId
```
Error: Invalid ID format
```
**Solution**: Ensure the ID is a valid 24-character hex string

### Validation Error
```
Error: Name, designation, department, and domain are required
```
**Solution**: Provide all required fields in the form

---

## Route Flow Example

### Creating a Profile
```
1. GET  /profile/create
   → teacherController.showCreateProfileForm()
   → Renders createProfile.ejs

2. POST /profile/create
   → validateTeacherProfile middleware
   → teacherController.createProfile()
   → teacherService.createTeacher()
   → Teacher model saves to DB
   → Success response
```

### Viewing a Profile
```
GET  /admin/profile/685d4bf82d5c803fbd445e8e
  → validateObjectId middleware
  → teacherController.viewProfile()
  → teacherService.getTeacherById()
  → feedbackService.generateTeacherFeedback()
  → Renders previewProfile.ejs
```

---

## Notes

- All routes are case-sensitive
- POST routes require proper form data or JSON body
- Admin routes don't require authentication (add if needed)
- All async errors are caught by the global error handler

---

**Last Updated**: November 19, 2025
