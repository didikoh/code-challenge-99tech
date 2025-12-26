#!/bin/bash

echo "🚀 Starting Backend and Frontend..."
echo ""

# Start backend in background
echo "📦 Starting Backend (NestJS)..."
cd backend
npm run start:dev &
BACKEND_PID=$!
echo "✅ Backend starting on http://localhost:3000 (PID: $BACKEND_PID)"
echo ""

# Wait a moment for backend to initialize
sleep 3

# Start frontend in background
echo "🎨 Starting Frontend (Vite)..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!
echo "✅ Frontend starting on http://localhost:5173 (PID: $FRONTEND_PID)"
echo ""

echo "================================================"
echo "✨ Both services are starting!"
echo ""
echo "Backend:  http://localhost:3000"
echo "Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both services"
echo "================================================"

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
