# Setup & Installation Guide

This guide will help you set up and run both the frontend and backend applications.

## Prerequisites

Make sure you have the following installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** (comes with Node.js)

## Quick Start

### Option 1: Run Both Frontend & Backend

```bash
# Terminal 1 - Backend
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run start:dev

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
```

Then visit:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

---

## Detailed Setup

### Backend Setup (NestJS + Prisma + SQLite)

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```

4. **Run database migrations:**
   ```bash
   npx prisma migrate dev --name init
   ```
   This creates the SQLite database at `prisma/dev.db`

5. **Start development server:**
   ```bash
   npm run start:dev
   ```
   
   The API will be running at: **http://localhost:3000**

6. **Test the API:**
   ```bash
   # Create a resource
   curl -X POST http://localhost:3000/resources \
     -H "Content-Type: application/json" \
     -d '{
       "title": "Test Resource",
       "description": "Testing the API",
       "category": "test",
       "status": "active",
       "priority": 1
     }'

   # Get all resources
   curl http://localhost:3000/resources
   ```

7. **(Optional) Open Prisma Studio to view database:**
   ```bash
   npx prisma studio
   ```
   This opens a web interface at http://localhost:5555

---

### Frontend Setup (React + Vite + TypeScript)

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   
   The app will be running at: **http://localhost:5173**

4. **Build for production (optional):**
   ```bash
   npm run build
   ```
   
   Output will be in the `dist/` folder

5. **Preview production build:**
   ```bash
   npm run preview
   ```

---

## Testing Individual Problems

### Problem 1: Three Ways to Sum to n

```bash
cd src
npx ts-node problem1.ts
```

**Expected Output:**
```
Testing sum_to_n implementations:
sum_to_n_a(5): 15
sum_to_n_b(5): 15
sum_to_n_c(5): 15

sum_to_n_a(100): 5050
sum_to_n_b(100): 5050
sum_to_n_c(100): 5050
```

---

## Common Issues & Troubleshooting

### Issue: `npx: command not found`
**Solution:** Make sure Node.js and npm are installed correctly
```bash
node --version
npm --version
```

### Issue: Port 3000 already in use (Backend)
**Solution:** Either:
1. Stop the process using port 3000
2. Or change the port in backend `.env` file:
   ```
   PORT=3001
   ```

### Issue: Port 5173 already in use (Frontend)
**Solution:** Vite will automatically try the next available port (5174, 5175, etc.)

### Issue: `Prisma Client not found`
**Solution:** Generate Prisma Client:
```bash
cd backend
npx prisma generate
```

### Issue: `Cannot find module` errors
**Solution:** Make sure all dependencies are installed:
```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

### Issue: Database migration fails
**Solution:** Reset the database:
```bash
cd backend
rm -rf prisma/dev.db prisma/dev.db-journal
npx prisma migrate dev --name init
```

### Issue: CORS errors when frontend calls backend
**Solution:** The backend is already configured to accept requests from `http://localhost:5173`. If you changed the frontend port, update `src/main.ts` in backend:
```typescript
app.enableCors({
  origin: ['http://localhost:5173', 'http://localhost:YOUR_PORT'],
  credentials: true,
});
```

---

## Development Workflow

### Hot Reload

Both applications support hot reload:
- **Backend:** Automatic restart on file changes (via `--watch` flag)
- **Frontend:** Instant HMR (Hot Module Replacement) via Vite

### Code Linting

```bash
# Backend
cd backend
npm run lint

# Frontend
cd frontend
npm run lint
```

### Code Formatting

```bash
# Backend
cd backend
npm run format

# Frontend (if configured)
cd frontend
npm run format
```

---

## Project Structure Overview

```
code-challenge-99tech/
│
├── frontend/               # React + Vite + TypeScript
│   ├── src/
│   │   ├── components/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── backend/               # NestJS + Prisma + SQLite
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── src/
│   │   ├── prisma/
│   │   ├── resources/
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── package.json
│   └── .env
│
└── src/                   # Problem solutions
    ├── problem1.ts
    ├── problem3-analysis.md
    └── problem3-refactored.tsx
```

---

## Available Scripts

### Backend Scripts
```bash
npm run start          # Start (production mode)
npm run start:dev      # Start with watch mode
npm run start:debug    # Start with debug mode
npm run build          # Build for production
npm run lint           # Lint code
npm run test           # Run unit tests
npm run test:e2e       # Run E2E tests
```

### Frontend Scripts
```bash
npm run dev            # Start development server
npm run build          # Build for production
npm run preview        # Preview production build
npm run lint           # Lint code
```

---

## Next Steps

1. **Explore the Currency Swap Form:**
   - Open http://localhost:5173
   - Try swapping different tokens
   - Watch the real-time exchange rate calculations

2. **Test the CRUD API:**
   - Use Postman, cURL, or Thunder Client
   - Create, read, update, and delete resources
   - Try different filters and pagination

3. **Review the Code:**
   - Read through the implementations
   - Check out the analysis documents
   - Review the architecture specification

4. **Read the Documentation:**
   - [SOLUTIONS.md](SOLUTIONS.md) - Overview of all solutions
   - [backend/API_README.md](backend/API_README.md) - API documentation
   - [docs/Problem6-Architecture.md](docs/Problem6-Architecture.md) - Architecture spec
   - [src/problem3-analysis.md](src/problem3-analysis.md) - React code analysis

---

## Additional Resources

- **React:** https://react.dev/
- **Vite:** https://vite.dev/
- **NestJS:** https://docs.nestjs.com/
- **Prisma:** https://www.prisma.io/docs/
- **TypeScript:** https://www.typescriptlang.org/docs/

---

## Support

If you encounter any issues:
1. Check the [Common Issues](#common-issues--troubleshooting) section
2. Ensure all prerequisites are installed
3. Try deleting `node_modules` and reinstalling:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

---

## License

UNLICENSED
