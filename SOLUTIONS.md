# Code Challenge Solutions - 99Tech

This repository contains solutions to multiple coding challenges covering frontend (React + Vite + TypeScript) and backend (NestJS + Prisma + SQLite) development.

## 📋 Table of Contents

1. [Problem 1: Three Ways to Sum to n](#problem-1-three-ways-to-sum-to-n)
2. [Problem 2: Fancy Form - Currency Swap](#problem-2-fancy-form---currency-swap)
3. [Problem 3: Messy React Analysis](#problem-3-messy-react-analysis)
4. [Problem 5: CRUD Backend API](#problem-5-crud-backend-api)
5. [Problem 6: Scoreboard Architecture](#problem-6-scoreboard-architecture)

---

## Problem 1: Three Ways to Sum to n

**Location:** [`src/problem1.ts`](src/problem1.ts)

Three unique TypeScript implementations to calculate sum from 1 to n:
- **Mathematical Formula (O(1))** - Gauss's formula
- **Iterative Loop (O(n))** - Traditional for loop
- **Recursive (O(n))** - Functional programming approach

Each implementation includes complexity analysis and trade-offs.

**Run:**
```bash
cd src
npx ts-node problem1.ts
```

---

## Problem 2: Fancy Form - Currency Swap

**Location:** [`frontend/src/components/CurrencySwapForm.tsx`](frontend/src/components/CurrencySwapForm.tsx)

A beautiful, interactive currency swap form built with React + Vite + TypeScript featuring:
- ✅ Real-time exchange rate calculations
- ✅ Token price fetching from external API
- ✅ Token icons from Switcheo repository
- ✅ Input validation and error handling
- ✅ Responsive design with smooth animations
- ✅ Loading states and swap simulation
- ✅ Token selection with visual feedback

**Setup & Run:**
```bash
cd frontend
npm install
npm run dev
```
Visit: `http://localhost:5173`

**Features:**
- Fetches live token prices from `https://interview.switcheo.com/prices.json`
- Displays token icons from GitHub
- Swap direction button with rotation animation
- Form validation (same token check, positive amounts)
- Simulated API call with loading indicator

---

## Problem 3: Messy React Analysis

**Location:** 
- Analysis: [`src/problem3-analysis.md`](src/problem3-analysis.md)
- Refactored Code: [`src/problem3-refactored.tsx`](src/problem3-refactored.tsx)

Comprehensive analysis of React anti-patterns and inefficiencies including:

**Issues Found:**
1. ❌ Undefined variable `lhsPriority`
2. ❌ Inverted filter logic
3. ❌ Missing `blockchain` property in interface
4. ❌ Incorrect dependencies in `useMemo`
5. ❌ Redundant computation of `formattedBalances`
6. ❌ Type mismatch in mapping function
7. ❌ Using array index as React key
8. ❌ Function recreated on every render
9. ❌ Missing return value in sort comparator
10. ❌ Unused `prices` in dependency array

**Improvements:**
- ✅ Fixed all logic errors
- ✅ Proper memoization with correct dependencies
- ✅ Moved `getPriority` outside component
- ✅ Combined operations into efficient pipeline
- ✅ Used unique identifier as key
- ✅ Improved type safety

---

## Problem 5: CRUD Backend API

**Location:** [`backend/`](backend/)

Complete RESTful CRUD API built with NestJS, Prisma ORM, and SQLite.

**Features:**
- ✅ **CREATE** - Add new resources
- ✅ **READ** - List with pagination & filters (category, status, search)
- ✅ **READ** - Get single resource by ID
- ✅ **UPDATE** - Partial update with validation
- ✅ **DELETE** - Remove resources
- ✅ Input validation with class-validator
- ✅ CORS enabled for frontend
- ✅ TypeScript throughout
- ✅ SQLite database with Prisma ORM

**Setup & Run:**
```bash
cd backend
npm install

# Setup database
npx prisma generate
npx prisma migrate dev --name init

# Run development server
npm run start:dev
```

**API Documentation:** See [`backend/API_README.md`](backend/API_README.md)

**Endpoints:**
- `POST /resources` - Create resource
- `GET /resources` - List resources (with filters)
- `GET /resources/:id` - Get resource details
- `PATCH /resources/:id` - Update resource
- `DELETE /resources/:id` - Delete resource

**Example Request:**
```bash
curl -X POST http://localhost:3000/resources \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Sample Resource",
    "description": "Description here",
    "category": "technology",
    "status": "active",
    "priority": 5
  }'
```

**Database Management:**
```bash
# View database in browser
npx prisma studio

# Reset database
npx prisma migrate reset
```

---

## Problem 6: Scoreboard Architecture

**Location:** [`docs/Problem6-Architecture.md`](docs/Problem6-Architecture.md)

Comprehensive architectural specification for a live scoreboard system with:

**Requirements:**
- 🏆 Display top 10 users
- ⚡ Real-time updates via WebSocket
- 🔒 Secure score submission with authorization
- 🛡️ Anti-cheat protection

**Key Components:**
1. **Action Token System** - Prevents unauthorized score updates
2. **WebSocket Integration** - Real-time scoreboard broadcasts
3. **Rate Limiting** - Prevents abuse (10 updates/min per user)
4. **Redis Caching** - Fast top 10 retrieval (5s TTL)
5. **Database Design** - PostgreSQL with optimized indexes
6. **Security Layers** - JWT auth, nonce validation, IP tracking

**Features:**
- ✅ Complete API endpoint specifications
- ✅ Detailed architecture diagram (ASCII art)
- ✅ Security implementation guide
- ✅ Data flow diagrams
- ✅ Database schema definitions
- ✅ Performance optimization strategies
- ✅ Monitoring and alerting guidelines
- ✅ Potential improvements and future enhancements

**Technology Stack:**
- Backend: Node.js + Express/NestJS
- Database: PostgreSQL + Redis
- WebSocket: Socket.io
- Authentication: JWT (RS256)
- Monitoring: Prometheus + Grafana

---

## 🚀 Quick Start

### Frontend (Currency Swap Form)
```bash
cd frontend
npm install
npm run dev
```
Visit: http://localhost:5173

### Backend (CRUD API)
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run start:dev
```
API: http://localhost:3000

### Test Problem 1 (Sum to n)
```bash
cd src
npx ts-node problem1.ts
```

---

## 📁 Project Structure

```
code-challenge-99tech/
├── frontend/                   # React + Vite + TypeScript
│   ├── src/
│   │   ├── components/
│   │   │   ├── CurrencySwapForm.tsx
│   │   │   └── CurrencySwapForm.css
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
│
├── backend/                    # NestJS + Prisma + SQLite
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── prisma/
│   │   ├── resources/
│   │   │   ├── dto/
│   │   │   ├── resources.controller.ts
│   │   │   ├── resources.service.ts
│   │   │   └── resources.module.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── API_README.md
│   └── package.json
│
├── src/                        # Problem solutions
│   ├── problem1.ts            # Three ways to sum
│   ├── problem3-analysis.md   # React code analysis
│   └── problem3-refactored.tsx
│
├── docs/                       # Documentation
│   ├── ProblemBackend.md
│   ├── ProblemsFrontend.md
│   └── Problem6-Architecture.md
│
└── README.md                   # This file
```

---

## 🛠️ Technologies Used

### Frontend
- **React 19** - UI library
- **Vite** - Build tool
- **TypeScript** - Type safety
- **CSS3** - Styling with animations

### Backend
- **NestJS 11** - Progressive Node.js framework
- **Prisma** - Next-gen ORM
- **SQLite** - Lightweight database
- **class-validator** - Validation decorators
- **class-transformer** - Object transformation

### Tools
- **ts-node** - TypeScript execution
- **ESLint** - Code linting
- **Prettier** - Code formatting

---

## 📚 Documentation

Each problem has detailed documentation:

1. **Problem 1** - Inline comments with complexity analysis
2. **Problem 2** - Component documentation in source
3. **Problem 3** - Full analysis document with explanations
4. **Problem 5** - Comprehensive API documentation (API_README.md)
5. **Problem 6** - Complete architecture specification with diagrams

---

## ✅ Completed Features

- [x] Problem 1: Three implementations of sum to n
- [x] Problem 2: Currency swap form with live prices
- [x] Problem 3: React code analysis and refactoring
- [x] Problem 5: Full CRUD API with NestJS + Prisma
- [x] Problem 6: Scoreboard architecture specification

---

## 🎯 Key Highlights

### Code Quality
- ✅ Full TypeScript coverage
- ✅ Comprehensive error handling
- ✅ Input validation
- ✅ Clean code architecture
- ✅ Detailed comments and documentation

### Best Practices
- ✅ RESTful API design
- ✅ React hooks optimization
- ✅ Proper memoization
- ✅ Security considerations
- ✅ Performance optimization

### User Experience
- ✅ Responsive design
- ✅ Smooth animations
- ✅ Loading states
- ✅ Error messages
- ✅ Intuitive interfaces

---

## 📝 License

UNLICENSED

---

## 👤 Author

Built with ❤️ for 99Tech code challenge

---

## 🔗 Additional Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vite.dev/)
- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
