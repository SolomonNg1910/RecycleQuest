# RecycleQuest Build & Development Guide

## Project Structure Overview

Yes, you're absolutely correct:

- **`backend/`** folder = All Python FastAPI backend logic, APIs, database models
- **`mobile/`** folder = All React Native frontend logic, screens, components, state management

## Prerequisites

Before building, ensure you have:

### Required Software

1. **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
2. **Python** (3.11 or higher) - [Download here](https://python.org/)
3. **Docker & Docker Compose** - [Download here](https://docker.com/)
4. **Git** - [Download here](https://git-scm.com/)

### For Mobile Development (Optional for now)

5. **React Native CLI**: `npm install -g react-native-cli`
6. **Android Studio** (for Android) - [Download here](https://developer.android.com/studio)
7. **Xcode** (for iOS, Mac only) - Available on Mac App Store

## Step-by-Step Build Instructions

### 1. Initial Setup

```bash
# Clone/navigate to your project directory
cd recycle-quest

# Install root dependencies (workspace management)
npm install

# This will install concurrently for running both servers
```

### 2. Backend Setup & Build

```bash
# Navigate to backend directory
cd backend

# Create Python virtual environment (recommended)
python -m venv venv
or
python3 -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Create environment file
cp .env.example .env

# Edit .env file with your settings (use any text editor)
# At minimum, set SECRET_KEY to a random string
```

### 3. Database Setup (Using Docker - Easiest)

```bash
# From project root directory
cd ..  # Go back to project root

# Start PostgreSQL and Redis using Docker
docker-compose up -d postgres redis

# Wait a few seconds for databases to start
# Check if they're running:
docker-compose ps
```

### 4. Start Backend Server

```bash
# From project root
cd backend

# Make sure virtual environment is activated
# Then start the FastAPI server
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Or use the npm script from project root:
# npm run backend
```

**Backend will be running at:** `http://localhost:8000`

- API docs: `http://localhost:8000/docs`
- Health check: `http://localhost:8000/health`

### 5. Mobile App Setup & Build

```bash
# Open a new terminal window
# Navigate to mobile directory
cd mobile

# Install React Native dependencies
npm install

# For iOS (Mac only), install CocoaPods dependencies
cd ios && pod install && cd ..
```

### 6. Start Mobile Development Server

```bash
# From mobile directory
npm start

# This starts the Metro bundler
# You'll see a QR code and options to run on different platforms
```

### 7. Run Mobile App on Device/Simulator

**Option A: Using Expo Go (Easiest)**

```bash
# If you have Expo Go app on your phone
# Scan the QR code from the Metro bundler
```

**Option B: Android Emulator**

```bash
# Make sure Android Studio is installed and emulator is running
npm run android
```

**Option C: iOS Simulator (Mac only)**

```bash
# Make sure Xcode is installed
npm run ios
```

## Alternative: Run Everything with Docker

If you prefer to use Docker for everything:

```bash
# From project root
docker-compose up

# This will start:
# - PostgreSQL database
# - Redis cache
# - FastAPI backend server
```

## Development Workflow

### Running Both Backend & Frontend Together

```bash
# From project root directory
npm run dev

# This runs both backend and mobile servers concurrently
# Backend: http://localhost:8000
# Mobile: Metro bundler will start
```

### Individual Commands

**Backend only:**

```bash
npm run backend
# or
cd backend && python -m uvicorn app.main:app --reload
```

**Mobile only:**

```bash
npm run mobile
# or
cd mobile && npm start
```

## Testing Your Setup

### 1. Test Backend

```bash
# Open browser or use curl
curl http://localhost:8000/health

# Should return:
# {"status":"healthy","environment":"development","database":"connected","redis":"connected"}
```

### 2. Test Mobile App

- Mobile app should show a basic interface
- Check that it can connect to the backend API

## Common Issues & Solutions

### Backend Issues

**Issue: Database connection failed**

```bash
# Make sure PostgreSQL is running
docker-compose ps

# If not running:
docker-compose up -d postgres
```

**Issue: Redis connection failed**

```bash
# Make sure Redis is running
docker-compose ps

# If not running:
docker-compose up -d redis
```

**Issue: Python module not found**

```bash
# Make sure virtual environment is activated
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Reinstall dependencies
pip install -r requirements.txt
```

### Mobile Issues

**Issue: Metro bundler won't start**

```bash
# Clear React Native cache
cd mobile
npx react-native start --reset-cache
```

**Issue: Android build fails**

```bash
# Clean and rebuild
cd mobile/android
./gradlew clean
cd ..
npm run android
```

## Production Build

### Backend Production Build

```bash
cd backend

# Install production dependencies
pip install -r requirements.txt

# Run with production settings
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### Mobile Production Build

**Android APK:**

```bash
cd mobile
npm run android -- --variant=release
```

**iOS (Mac only):**

```bash
cd mobile
npm run ios -- --configuration Release
```

## Environment Variables

Create `.env` file in backend directory:

```env
SECRET_KEY=your-super-secret-key-here
DATABASE_URL=postgresql://recyclequest:recyclequest123@localhost:5432/recyclequest
REDIS_URL=redis://localhost:6379
ENVIRONMENT=development
DEBUG=true
```

## Next Steps

Once everything is running:

1. Backend API will be available at `http://localhost:8000`
2. Mobile app will connect to the backend
3. You can start implementing the authentication system (next task)
4. Use the API docs at `http://localhost:8000/docs` to test endpoints

## Quick Start Summary

```bash
# 1. Install dependencies
npm install

# 2. Start databases
docker-compose up -d postgres redis

# 3. Setup backend
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
cp .env.example .env

# 4. Start everything
cd ..
npm run dev
```

That's it! Your RecycleQuest development environment should be running.
