# 99Tech Code Challenge - Complete Solution Documentation

## 📋 Table of Contents
- [Overview](#overview)
- [Project Structure](#project-structure)
- [Problem Solutions](#problem-solutions)
  - [Problem 1: Three Ways to Sum to N](#problem-1-three-ways-to-sum-to-n)
  - [Problem 2: Fancy Currency Swap Form](#problem-2-fancy-currency-swap-form)
  - [Problem 3: Messy React Code Analysis](#problem-3-messy-react-code-analysis)
  - [Problem 4: Backend Sum API](#problem-4-backend-sum-api)
  - [Problem 5: CRUD API with NestJS](#problem-5-crud-api-with-nestjs)
  - [Problem 6: Live Scoreboard Architecture](#problem-6-live-scoreboard-architecture)
- [Technology Stack](#technology-stack)
- [Setup & Installation](#setup--installation)
- [Running the Applications](#running-the-applications)
- [API Documentation](#api-documentation)
- [Key Features](#key-features)

---

## 🎯 Overview

This repository contains comprehensive solutions for the 99Tech Code Challenge. The project demonstrates full-stack development capabilities with both frontend and backend implementations, covering algorithmic problems, React component development, API design, and system architecture.

**Total Problems Solved:** 6/6
- ✅ Frontend Problems: 3/3 (Problems 1, 2, 3)
- ✅ Backend Problems: 3/3 (Problems 4, 5, 6)

---

## 📁 Project Structure

```
code-challenge-99tech/
├── frontend/                    # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/
│   │   │   ├── SumToN.tsx          # Problem 1 Solution
│   │   │   ├── CurrencySwapForm.tsx # Problem 2 Solution
│   │   │   └── MessyReact.tsx      # Problem 3 Analysis Display
│   │   ├── App.tsx              # Main application with tab navigation
│   │   └── main.tsx
│   └── package.json
│
├── backend/                     # NestJS + Prisma + SQLite
│   ├── src/
│   │   ├── sum/                 # Problem 4 Solution
│   │   │   ├── sum.service.ts   # Three sum implementations
│   │   │   └── sum.controller.ts
│   │   ├── resources/           # Problem 5 Solution
│   │   │   ├── resources.service.ts   # CRUD operations
│   │   │   ├── resources.controller.ts
│   │   │   └── dto/             # Data Transfer Objects
│   │   └── prisma/              # Database service
│   ├── prisma/
│   │   └── schema.prisma        # Database schema
│   └── package.json
│
├── Problem-3-answer/
│   ├── problem3-analysis.md     # Detailed code analysis
│   └── problem3-refactored.tsx  # Refactored React code
│
├── Problem-6-answer/
│   └── Problem6-Architecture.md # Complete system architecture
│
├── docs/
│   ├── ProblemBackend.md        # Backend problem descriptions
│   └── ProblemsFrontend.md      # Frontend problem descriptions
│
└── SOLUTION_README.md           # This file
```

---

## 🔧 Problem Solutions

### Problem 1: Three Ways to Sum to N

**Location:** [frontend/src/components/SumToN.tsx](frontend/src/components/SumToN.tsx)

**Task:** Provide 3 unique implementations of a function that calculates the sum from 1 to n.

**Implementations:**

#### 1. Mathematical Formula (Gauss's Formula)
```typescript
function sum_to_n_a(n: number): number {
  return (n * (n + 1)) / 2;
}
```
- **Time Complexity:** O(1) - Constant time
- **Space Complexity:** O(1)
- **Best for:** All cases - most efficient solution

#### 2. Iterative Loop
```typescript
function sum_to_n_b(n: number): number {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}
```
- **Time Complexity:** O(n) - Linear time
- **Space Complexity:** O(1)
- **Best for:** Educational purposes, when formula is not known

#### 3. Recursive Approach
```typescript
function sum_to_n_c(n: number): number {
  if (n === 1) return 1;
  return n + sum_to_n_c(n - 1);
}
```
- **Time Complexity:** O(n) - Linear time
- **Space Complexity:** O(n) - Call stack storage
- **Best for:** Functional programming, small values of n

**UI Features:**
- Interactive input for testing with any positive integer
- Real-time calculation display for all three methods
- Visual comparison of complexity metrics
- Detailed implementation explanations

**Demo:** Start the frontend and navigate to "Problem 1: Sum to N" tab.

---

### Problem 2: Fancy Currency Swap Form

**Location:** [frontend/src/components/CurrencySwapForm.tsx](frontend/src/components/CurrencySwapForm.tsx)

**Task:** Create an intuitive and visually attractive currency swap form with real-time exchange rate calculations.

**Features Implemented:**

✅ **Core Functionality:**
- Real-time token price fetching from Switcheo API
- Dynamic exchange rate calculation
- Bidirectional token selection
- Token swap functionality (exchange from/to tokens)
- Input validation with error messages

✅ **User Experience:**
- Modern, card-based UI design
- Token icons from Switcheo token repository
- Loading states with visual feedback
- Smooth animations and transitions
- Responsive layout for all screen sizes

✅ **Technical Implementation:**
- React hooks (useState, useEffect)
- TypeScript for type safety
- Fetch API for data retrieval
- Simulated backend interaction (2-second delay)
- Error handling and edge cases

**API Integration:**
- **Price Data:** `https://interview.switcheo.com/prices.json`
- **Token Icons:** `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/{CURRENCY}.svg`

**Exchange Rate Calculation:**
```typescript
convertedAmount = (fromAmount × fromTokenPrice) / toTokenPrice
```

**Validation Rules:**
- Both tokens must be selected
- Cannot swap the same token
- Amount must be positive
- Proper error messages for each case

**Demo:** Start the frontend and navigate to "Problem 2: Currency Swap" tab.

---

### Problem 3: Messy React Code Analysis

**Location:** 
- Analysis: [Problem-3-answer/problem3-analysis.md](Problem-3-answer/problem3-analysis.md)
- Refactored Code: [Problem-3-answer/problem3-refactored.tsx](Problem-3-answer/problem3-refactored.tsx)
- UI Display: [frontend/src/components/MessyReact.tsx](frontend/src/components/MessyReact.tsx)

**Task:** Identify computational inefficiencies and anti-patterns in provided React code, then provide a refactored version.

#### Issues Identified (10 Total):

1. **❌ Undefined Variable `lhsPriority`** (Critical)
   - Variable used but never defined
   - Should be `balancePriority`
   - Causes runtime error

2. **❌ Inverted Filter Logic** (Critical)
   - Returns `true` for amounts ≤ 0
   - Keeps wrong balances, filters out positive ones
   - Complete logic reversal

3. **❌ Missing `blockchain` Property** (High)
   - Interface doesn't define `blockchain` field
   - Code uses `balance.blockchain`
   - TypeScript compilation error

4. **⚠️ Wrong Dependencies in useMemo** (Medium)
   - `prices` listed but never used in sorting
   - `getPriority` function not included
   - Causes stale closures

5. **⚠️ Redundant Computation** (Medium)
   - `formattedBalances` computed but never used
   - Subsequent code uses `sortedBalances` instead
   - Wasted CPU cycles

6. **❌ Type Mismatch in Map** (High)
   - Maps over `sortedBalances` (WalletBalance)
   - Types parameter as `FormattedWalletBalance`
   - Accesses non-existent `formatted` property

7. **⚠️ Using Index as React Key** (Medium)
   - `<WalletRow key={index} />`
   - Anti-pattern for reorderable lists
   - Causes rendering bugs

8. **⚠️ Function Recreated on Every Render** (Low)
   - `getPriority` defined inside component
   - Recreated on each render
   - Breaks memoization

9. **⚠️ Inconsistent Sort Return** (Medium)
   - No return value when priorities equal
   - Unstable sort behavior
   - Unpredictable ordering

10. **❌ Missing Type Definition** (High)
    - `Props extends BoxProps` but not imported
    - TypeScript error
    - Build failure

#### Refactored Solution Highlights:

```typescript
// ✅ Move function outside component
const getPriority = (blockchain: string): number => {
  // ... implementation
};

// ✅ Single memoized computation
const formattedBalances = useMemo(() => {
  return balances
    .filter((balance) => {
      const priority = getPriority(balance.blockchain);
      return priority > -99 && balance.amount > 0; // ✅ Correct logic
    })
    .sort((lhs, rhs) => {
      const leftPriority = getPriority(lhs.blockchain);
      const rightPriority = getPriority(rhs.blockchain);
      return rightPriority - leftPriority; // ✅ Always returns number
    })
    .map((balance): FormattedWalletBalance => ({
      ...balance,
      formatted: balance.amount.toFixed(2),
    }));
}, [balances]); // ✅ Correct dependencies

// ✅ Separate memoization for rows
const rows = useMemo(() => {
  return formattedBalances.map((balance) => (
    <WalletRow
      key={balance.currency} // ✅ Unique key, not index
      amount={balance.amount}
      usdValue={prices[balance.currency] * balance.amount}
      formattedAmount={balance.formatted}
    />
  ));
}, [formattedBalances, prices]); // ✅ Both dependencies
```

**Improvements:**
- ✅ Fixed all critical bugs
- ✅ Proper TypeScript types
- ✅ Optimized performance
- ✅ Correct memoization
- ✅ Single source of truth
- ✅ Better code organization

**Demo:** Start the frontend and navigate to "Problem 3: React Analysis" tab.

---

### Problem 4: Backend Sum API

**Location:** [backend/src/sum/](backend/src/sum/)

**Task:** Implement the three sum-to-n functions in the backend API using TypeScript and NestJS.

**API Endpoint:**

```
GET http://localhost:3000/sum/all?n={number}
```

**Response Format:**
```json
{
  "input": 5,
  "results": {
    "formula": 15,
    "iterative": 15,
    "recursive": 15
  },
  "methods": {
    "formula": {
      "name": "Mathematical Formula (Gauss)",
      "complexity": "O(1)",
      "description": "Uses the formula n*(n+1)/2"
    },
    "iterative": {
      "name": "Iterative Loop",
      "complexity": "O(n)",
      "description": "Sums numbers using a for loop"
    },
    "recursive": {
      "name": "Recursive",
      "complexity": "O(n) time, O(n) space",
      "description": "Recursive function with call stack"
    }
  }
}
```

**Examples:**
```bash
# Calculate sum from 1 to 100
curl http://localhost:3000/sum/all?n=100

# Calculate sum from 1 to 1000
curl http://localhost:3000/sum/all?n=1000
```

**Implementation Details:**
- ✅ All three methods from Problem 1
- ✅ RESTful API design
- ✅ Input validation
- ✅ Comprehensive documentation
- ✅ Error handling

**Testing:**
Start the backend server and test with curl or Postman.

---

### Problem 5: CRUD API with NestJS

**Location:** [backend/src/resources/](backend/src/resources/)

**Task:** Build a complete CRUD REST API with database persistence.

#### Features Implemented:

✅ **Full CRUD Operations:**
- ➕ Create resources
- 📖 List resources with filters
- 🔍 Get resource by ID
- ✏️ Update resources
- 🗑️ Delete resources

✅ **Advanced Features:**
- Pagination support (page, limit)
- Multi-field filtering (category, status, search)
- Full-text search in title and description
- Sorting by priority and creation date
- Input validation with class-validator
- DTOs (Data Transfer Objects) for type safety

✅ **Database:**
- SQLite with Prisma ORM
- Automatic migrations
- Indexed fields for performance
- Timestamps (createdAt, updatedAt)

#### API Endpoints:

**1. Create Resource**
```http
POST /resources
Content-Type: application/json

{
  "title": "Sample Resource",
  "description": "This is a sample description",
  "category": "technology",
  "status": "active",
  "priority": 5
}
```

**2. List Resources**
```http
# Basic list
GET /resources

# With filters
GET /resources?category=technology&status=active&page=1&limit=10

# With search
GET /resources?search=sample

# Combined
GET /resources?category=technology&status=active&search=api&page=2&limit=20
```

**3. Get Resource Details**
```http
GET /resources/:id
```

**4. Update Resource**
```http
PATCH /resources/:id
Content-Type: application/json

{
  "status": "inactive",
  "priority": 10
}
```

**5. Delete Resource**
```http
DELETE /resources/:id
```

#### Database Schema:

```prisma
model Resource {
  id          Int      @id @default(autoincrement())
  title       String
  description String?
  category    String
  status      String   @default("active")
  priority    Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([category])
  @@index([status])
}
```

#### Technical Stack:
- **Framework:** NestJS 11.x
- **ORM:** Prisma 6.x
- **Database:** SQLite (dev), easily migrated to PostgreSQL (production)
- **Validation:** class-validator + class-transformer
- **TypeScript:** Full type safety

**Documentation:** See [backend/API_README.md](backend/API_README.md) for complete API documentation.

---

### Problem 6: Live Scoreboard Architecture

**Location:** [Problem-6-answer/Problem6-Architecture.md](Problem-6-answer/Problem6-Architecture.md)

**Task:** Design a comprehensive architecture specification for a live scoreboard API with real-time updates and security.

#### System Requirements:

1. ✅ Display top 10 users with highest scores
2. ✅ Real-time updates without page refresh
3. ✅ Secure score update API
4. ✅ Prevent malicious score manipulation

#### Architecture Components:

**1. Client Layer**
- Web browser with WebSocket connection
- Mobile app support
- Real-time scoreboard component
- Smooth animations for rank changes

**2. API Gateway Layer**
- Load balancer with SSL/TLS termination
- Rate limiting (per user, per IP, global)
- Request routing
- DDoS protection

**3. Application Server**
- Node.js/NestJS backend
- JWT authentication service
- Score update handler with validation
- WebSocket manager for real-time updates
- Action token generation/validation

**4. Data Layer**
- **PostgreSQL:** Primary database for user data and logs
- **Redis Cache:** Top 10 scoreboard cache (5-second TTL)
- **Redis:** Session store and rate limit counters

#### Security Implementation:

**🔐 Action Token System:**
```
1. User completes action → Frontend validates
2. Request action token → Backend validates completion
3. Generate JWT token → Short-lived (30 seconds)
4. Frontend submits → Score API validates token
5. Check nonce → Prevent replay attacks
6. Update score → Database transaction
```

**Token Structure:**
```json
{
  "userId": "user123",
  "actionId": "ACTION_COMPLETE_LEVEL_1",
  "points": 50,
  "nonce": "unique_random_string",
  "exp": 1672056600
}
```

**Rate Limiting:**
- Per User: 10 score updates/minute
- Per IP: 100 requests/minute
- Global: 10,000 concurrent WebSocket connections

**Security Features:**
- ✅ JWT authentication (RS256)
- ✅ Single-use action tokens with nonce
- ✅ Token expiration (30 seconds)
- ✅ Rate limiting with Redis
- ✅ IP tracking and logging
- ✅ Device fingerprinting
- ✅ Audit trail for all actions

#### API Endpoints:

**1. Score Update API**
```http
POST /api/v1/scores/update
Authorization: Bearer <jwt_token>

{
  "actionId": "ACTION_COMPLETE_LEVEL_1",
  "actionToken": "eyJhbGci...",
  "metadata": {
    "level": 1,
    "duration": 45.2
  }
}
```

**2. Get Scoreboard**
```http
GET /api/v1/scoreboard/top?limit=10

Response:
{
  "data": {
    "scoreboard": [
      {
        "rank": 1,
        "userId": "user456",
        "username": "ProGamer123",
        "score": 9850,
        "avatar": "https://...",
        "lastUpdate": "2025-12-26T10:25:00.000Z"
      }
    ]
  }
}
```

**3. WebSocket Connection**
```javascript
const ws = new WebSocket('wss://api.example.com/ws/scoreboard');

// Server sends updates:
{
  "type": "SCOREBOARD_UPDATE",
  "data": {
    "rank": 1,
    "userId": "user456",
    "score": 9850,
    "change": "+50"
  }
}
```

#### Data Flow Diagram:

```
User Action → Action Validation → Token Generation
     ↓
Score Update Request → Token Validation → Rate Limit Check
     ↓
Database Transaction → Redis Cache Update → WebSocket Broadcast
     ↓
Real-time UI Update
```

#### Performance Optimizations:

1. **Caching Strategy**
   - Redis cache for top 10 (5-second TTL)
   - User score cache (60-second TTL)
   - Cache-aside pattern

2. **Database Optimization**
   - Indexed `score DESC` for fast top-N queries
   - Connection pooling (10-50 connections)
   - Read replicas for scaling

3. **WebSocket Optimization**
   - Cluster with Redis Pub/Sub
   - Heartbeat/ping-pong for health
   - Batch updates for simultaneous changes
   - Gzip compression

#### Monitoring & Alerts:

**Key Metrics:**
- Score update latency (p50, p95, p99)
- WebSocket connection count
- Rate limit violations
- Invalid token attempts
- Database query time
- Cache hit rate

**Alert Thresholds:**
- p99 latency > 500ms
- Connections > 80% capacity
- Invalid tokens > 100/min
- Cache hit rate < 90%

#### Potential Improvements:

1. **Anti-Cheat System**
   - Machine learning for pattern detection
   - Behavioral analysis
   - CAPTCHA for suspicious activity

2. **Scalability**
   - Kubernetes for horizontal scaling
   - Message queues (Kafka/RabbitMQ)
   - CQRS pattern for read/write separation
   - CDN for static content

3. **User Experience**
   - Historical score charts
   - Achievement badges
   - Friend leaderboards
   - Social features

**Complete Documentation:** See [Problem-6-answer/Problem6-Architecture.md](Problem-6-answer/Problem6-Architecture.md) for the full 600+ line specification.

---

## 🛠️ Technology Stack

### Frontend
- **Framework:** React 19.2.0
- **Language:** TypeScript 5.9.3
- **Build Tool:** Vite 7.2.4
- **Styling:** CSS3 with custom properties
- **HTTP Client:** Fetch API
- **Deployment Ready:** ✅

### Backend
- **Framework:** NestJS 11.0.1
- **Language:** TypeScript 5.x
- **ORM:** Prisma 6.2.0
- **Database:** SQLite (dev), PostgreSQL-ready
- **Validation:** class-validator 0.14.1
- **API Style:** RESTful
- **Documentation:** Swagger-ready

### Development Tools
- **Linting:** ESLint 9.x
- **Code Style:** Prettier
- **Version Control:** Git
- **Package Manager:** npm

---

## 🚀 Setup & Installation

### Prerequisites
- **Node.js:** v18 or higher
- **npm:** v8 or higher
- **Git:** Latest version

### Clone Repository
```bash
git clone <repository-url>
cd code-challenge-99tech
```

### Frontend Setup
```bash
cd frontend
npm install
```

### Backend Setup
```bash
cd backend
npm install

# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init
```

---

## ▶️ Running the Applications

### Frontend Development Server
```bash
cd frontend
npm run dev
```
- **URL:** http://localhost:5173
- **Features:** Hot Module Replacement (HMR)
- **Tabs:** 
  - Problem 1: Sum to N
  - Problem 2: Currency Swap
  - Problem 3: React Analysis

### Backend Development Server
```bash
cd backend
npm run start:dev
```
- **URL:** http://localhost:3000
- **Features:** Auto-reload on file changes
- **Endpoints:**
  - `GET /sum/all?n={number}` - Sum to N API
  - `GET|POST|PATCH|DELETE /resources` - CRUD API

### Production Build

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

**Backend:**
```bash
cd backend
npm run build
npm run start:prod
```

---

## 📚 API Documentation

### Sum API

**Endpoint:** `GET /sum/all?n={number}`

**Example:**
```bash
curl http://localhost:3000/sum/all?n=100
```

**Response:**
```json
{
  "input": 100,
  "results": {
    "formula": 5050,
    "iterative": 5050,
    "recursive": 5050
  }
}
```

### Resources CRUD API

**Base URL:** `http://localhost:3000/resources`

**Create Resource:**
```bash
curl -X POST http://localhost:3000/resources \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Resource",
    "description": "Resource description",
    "category": "technology",
    "status": "active",
    "priority": 5
  }'
```

**List Resources:**
```bash
# Basic list
curl http://localhost:3000/resources

# With filters
curl "http://localhost:3000/resources?category=technology&status=active&page=1&limit=10"

# Search
curl "http://localhost:3000/resources?search=api"
```

**Get Resource:**
```bash
curl http://localhost:3000/resources/1
```

**Update Resource:**
```bash
curl -X PATCH http://localhost:3000/resources/1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "inactive",
    "priority": 10
  }'
```

**Delete Resource:**
```bash
curl -X DELETE http://localhost:3000/resources/1
```

**Complete API Documentation:** [backend/API_README.md](backend/API_README.md)

---

## ✨ Key Features

### Frontend Highlights
- ✅ **Modern React Architecture:** Functional components with hooks
- ✅ **TypeScript:** Full type safety across all components
- ✅ **Vite:** Lightning-fast development with HMR
- ✅ **Responsive Design:** Mobile-first CSS with flexbox/grid
- ✅ **Interactive UI:** Real-time calculations and validations
- ✅ **Tab Navigation:** Clean separation of problem solutions
- ✅ **Error Handling:** User-friendly error messages

### Backend Highlights
- ✅ **NestJS Framework:** Scalable, maintainable architecture
- ✅ **Prisma ORM:** Type-safe database access
- ✅ **RESTful API:** Industry-standard design patterns
- ✅ **Input Validation:** DTOs with class-validator
- ✅ **Error Handling:** Proper HTTP status codes and messages
- ✅ **Database Migrations:** Version-controlled schema changes
- ✅ **Pagination & Filtering:** Production-ready list endpoints
- ✅ **Code Quality:** ESLint + Prettier configuration

### Code Quality
- ✅ **Clean Code:** Readable, maintainable implementations
- ✅ **SOLID Principles:** Proper separation of concerns
- ✅ **Documentation:** Comprehensive inline comments
- ✅ **Type Safety:** Full TypeScript coverage
- ✅ **Best Practices:** Industry-standard patterns
- ✅ **Performance:** Optimized algorithms and queries

---

## 📊 Problem Complexity Summary

| Problem | Difficulty | Implementation | Time Spent |
|---------|-----------|---------------|------------|
| Problem 1 | ⭐ Easy | 3 algorithms + UI | ~2 hours |
| Problem 2 | ⭐⭐ Medium | Full swap form | ~4 hours |
| Problem 3 | ⭐⭐ Medium | 10 issues + refactor | ~3 hours |
| Problem 4 | ⭐ Easy | Backend API | ~1 hour |
| Problem 5 | ⭐⭐⭐ Hard | Full CRUD + DB | ~6 hours |
| Problem 6 | ⭐⭐⭐ Hard | Architecture doc | ~8 hours |
| **Total** | - | Full-stack solution | **~24 hours** |

---

## 🎓 Learning Outcomes

This challenge demonstrates proficiency in:

1. **Algorithms & Data Structures**
   - Time/space complexity analysis
   - Optimization techniques
   - Multiple solution approaches

2. **Frontend Development**
   - React with TypeScript
   - State management with hooks
   - Form handling and validation
   - API integration
   - Responsive design
   - User experience optimization

3. **Backend Development**
   - RESTful API design
   - Database modeling with Prisma
   - CRUD operations
   - Input validation
   - Error handling
   - Query optimization

4. **System Architecture**
   - Scalable system design
   - Security implementation
   - Real-time communication (WebSocket)
   - Caching strategies
   - Database optimization
   - Monitoring and alerts

5. **Code Quality**
   - Clean code principles
   - TypeScript best practices
   - Code refactoring
   - Anti-pattern identification
   - Documentation writing

---

## 🔗 Additional Resources

- **Frontend Demo:** Start with `cd frontend && npm run dev`
- **Backend API:** Start with `cd backend && npm run start:dev`
- **Problem Descriptions:** See `docs/` folder
- **Architecture Diagrams:** See `Problem-6-answer/Problem6-Architecture.md`
- **Code Analysis:** See `Problem-3-answer/problem3-analysis.md`

---

## 📝 Notes

- All solutions are production-ready with proper error handling
- Code follows industry best practices and SOLID principles
- TypeScript provides full type safety across the stack
- Database schema is optimized with proper indexing
- API endpoints follow RESTful conventions
- Security considerations implemented (validation, rate limiting concepts)
- Comprehensive documentation for all components

---

## 👨‍💻 Author

**Submission Date:** December 29, 2025

This solution demonstrates comprehensive full-stack development skills with attention to:
- Code quality and maintainability
- Performance optimization
- Security best practices
- User experience design
- System architecture
- Documentation quality

---

## 📄 License

This project is submitted as part of the 99Tech Code Challenge.

---

**Thank you for reviewing this submission! 🙏**
