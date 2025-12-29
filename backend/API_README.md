# Backend CRUD API with NestJS & Prisma SQLite

A complete RESTful CRUD API built with NestJS and Prisma ORM using SQLite database.

## Features

- ✅ **Create** resources
- ✅ **Read** resources (list with filters and get by ID)
- ✅ **Update** resources
- ✅ **Delete** resources
- ✅ Pagination support
- ✅ Advanced filtering (category, status, search)
- ✅ Input validation
- ✅ TypeScript support
- ✅ SQLite database with Prisma ORM

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database:
```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# (Optional) Seed the database
npx prisma db seed
```

## Configuration

The application uses environment variables defined in `.env`:

```env
DATABASE_URL="file:./dev.db"
PORT=3000
```

## Running the Application

### Development Mode (with hot-reload)
```bash
npm run start:dev
```

### Production Mode
```bash
npm run build
npm run start:prod
```

The API will be available at: `http://localhost:3000`

## API Endpoints

### Base URL: `http://localhost:3000`

### 1. Create a Resource
**POST** `/resources`

**Request Body:**
```json
{
  "title": "Sample Resource",
  "description": "This is a sample description",
  "category": "technology",
  "status": "active",
  "priority": 5
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "title": "Sample Resource",
  "description": "This is a sample description",
  "category": "technology",
  "status": "active",
  "priority": 5,
  "createdAt": "2025-12-26T10:00:00.000Z",
  "updatedAt": "2025-12-26T10:00:00.000Z"
}
```

### 2. List Resources (with filters)
**GET** `/resources`

**Query Parameters:**
- `category` (optional) - Filter by category
- `status` (optional) - Filter by status (active, inactive, archived)
- `search` (optional) - Search in title and description
- `page` (optional, default: 1) - Page number
- `limit` (optional, default: 10) - Items per page

**Examples:**
```bash
# Get all resources
GET /resources

# Filter by category
GET /resources?category=technology

# Filter by status
GET /resources?status=active

# Search
GET /resources?search=sample

# Pagination
GET /resources?page=2&limit=20

# Combined filters
GET /resources?category=technology&status=active&page=1&limit=10
```

**Response:** `200 OK`
```json
{
  "data": [
    {
      "id": 1,
      "title": "Sample Resource",
      "description": "This is a sample description",
      "category": "technology",
      "status": "active",
      "priority": 5,
      "createdAt": "2025-12-26T10:00:00.000Z",
      "updatedAt": "2025-12-26T10:00:00.000Z"
    }
  ],
  "meta": {
    "total": 1,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

### 3. Get Resource Details
**GET** `/resources/:id`

**Example:**
```bash
GET /resources/1
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "title": "Sample Resource",
  "description": "This is a sample description",
  "category": "technology",
  "status": "active",
  "priority": 5,
  "createdAt": "2025-12-26T10:00:00.000Z",
  "updatedAt": "2025-12-26T10:00:00.000Z"
}
```

**Error Response:** `404 Not Found`
```json
{
  "statusCode": 404,
  "message": "Resource with ID 999 not found",
  "error": "Not Found"
}
```

### 4. Update Resource
**PATCH** `/resources/:id`

**Request Body:** (all fields are optional)
```json
{
  "title": "Updated Title",
  "status": "inactive",
  "priority": 10
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "title": "Updated Title",
  "description": "This is a sample description",
  "category": "technology",
  "status": "inactive",
  "priority": 10,
  "createdAt": "2025-12-26T10:00:00.000Z",
  "updatedAt": "2025-12-26T10:05:00.000Z"
}
```

### 5. Delete Resource
**DELETE** `/resources/:id`

**Example:**
```bash
DELETE /resources/1
```

**Response:** `204 No Content`

## Data Model

### Resource

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| id | Integer | Auto | - | Unique identifier |
| title | String | Yes | - | Resource title |
| description | String | No | null | Resource description |
| category | String | Yes | - | Resource category |
| status | String | No | "active" | Status (active/inactive/archived) |
| priority | Integer | No | 0 | Priority level |
| createdAt | DateTime | Auto | now() | Creation timestamp |
| updatedAt | DateTime | Auto | now() | Last update timestamp |

## Validation Rules

- **title**: Required, minimum 1 character
- **description**: Optional string
- **category**: Required, minimum 1 character
- **status**: Optional, must be one of: "active", "inactive", "archived"
- **priority**: Optional, must be a positive integer (≥ 0)

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Database Management

### View Database (Prisma Studio)
```bash
npx prisma studio
```
This opens a web interface at `http://localhost:5555` to view and edit data.

### Reset Database
```bash
npx prisma migrate reset
```

### Create New Migration
```bash
npx prisma migrate dev --name your_migration_name
```

## Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── dev.db                 # SQLite database file
├── src/
│   ├── prisma/
│   │   ├── prisma.module.ts   # Prisma module
│   │   └── prisma.service.ts  # Prisma service
│   ├── resources/
│   │   ├── dto/
│   │   │   ├── create-resource.dto.ts
│   │   │   ├── update-resource.dto.ts
│   │   │   └── filter-resource.dto.ts
│   │   ├── resources.controller.ts
│   │   ├── resources.service.ts
│   │   └── resources.module.ts
│   ├── app.module.ts          # Root module
│   └── main.ts                # Application entry
├── .env                       # Environment variables
└── package.json
```

## Technologies Used

- **NestJS** - Progressive Node.js framework
- **Prisma** - Next-generation ORM
- **SQLite** - Lightweight database
- **TypeScript** - Type-safe JavaScript
- **class-validator** - Validation decorators
- **class-transformer** - Object transformation

## Error Handling

The API uses standard HTTP status codes:

- `200 OK` - Successful GET/PATCH request
- `201 Created` - Successful POST request
- `204 No Content` - Successful DELETE request
- `400 Bad Request` - Invalid input data
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## CORS Configuration

CORS is enabled for:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000` (alternative)

To add more origins, edit `src/main.ts`.

## License

UNLICENSED
