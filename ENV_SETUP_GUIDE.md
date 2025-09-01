# Environment Variables Setup Guide

This guide will walk you through setting up each environment variable in your `.env` file.

## Step 1: Copy the Example File

```bash
cd backend
cp .env.example .env
```

Now open the `.env` file in your text editor and follow this guide to fill in each value.

## Step 2: Basic Configuration (Required)

### Environment Settings
```env
ENVIRONMENT=development
DEBUG=true
```
**What to do:** Keep these as-is for development.

### Security Settings
```env
SECRET_KEY=your-super-secret-key-change-in-production
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ORIGINS=http://localhost:3000,http://localhost:19006
```

**SECRET_KEY - REQUIRED:**
- **What it is:** Used for JWT token encryption
- **How to get it:** Generate a random 32+ character string
- **Easy way:** Go to https://djecrety.ir/ and copy a generated key
- **Or use this command:** `python -c "import secrets; print(secrets.token_urlsafe(32))"`
- **Example:** `SECRET_KEY=abc123def456ghi789jkl012mno345pqr678stu901vwx234yz`

**ALLOWED_HOSTS & CORS_ORIGINS:**
- Keep as-is for local development
- The `19006` port is for React Native Metro bundler

## Step 3: Database Setup (Choose One Option)

### Option A: Local PostgreSQL (Easiest for Development)
```env
DATABASE_URL=postgresql://recyclequest:recyclequest123@localhost:5432/recyclequest
```
**What to do:** Use Docker (already configured in docker-compose.yml)
```bash
# From project root
docker-compose up -d postgres
```

### Option B: Supabase (Free Cloud Database)
```env
DATABASE_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
```

**How to get Supabase credentials:**
1. Go to https://supabase.com/
2. Click "Start your project" (free account)
3. Create a new project
4. Go to Settings → Database
5. Copy the connection string
6. Replace `[password]` with your database password
7. Replace `[project-ref]` with your project reference

**Example:**
```env
DATABASE_URL=postgresql://postgres:mypassword123@db.abcdefghijklmnop.supabase.co:5432/postgres
```

## Step 4: Redis Setup (Choose One Option)

### Option A: Local Redis (Easiest for Development)
```env
REDIS_URL=redis://localhost:6379
```
**What to do:** Use Docker (already configured)
```bash
# From project root
docker-compose up -d redis
```

### Option B: Upstash Redis (Free Cloud Redis)
```env
REDIS_URL=rediss://:[password]@[endpoint].upstash.io:6380
```

**How to get Upstash Redis:**
1. Go to https://upstash.com/
2. Sign up for free account
3. Create a new Redis database
4. Copy the connection URL from the dashboard
5. Paste it as REDIS_URL

## Step 5: Optional External APIs (Can Skip for Now)

### CDC Voucher API (Singapore Government)
```env
CDC_VOUCHER_API_URL=https://api.cdc.gov.sg/vouchers
CDC_VOUCHER_API_KEY=your-cdc-api-key
```
**Status:** Not publicly available yet - leave as placeholder for now

### Smart Bin Integration
```env
SMART_BIN_API_URL=https://api.smartbins.sg
SMART_BIN_API_KEY=your-smart-bin-api-key
```
**Status:** Hypothetical API - leave as placeholder for now

## Step 6: File Storage (Optional for MVP)

### Option A: Local Storage (Default)
```env
# Remove or comment out Cloudflare variables
# CLOUDFLARE_R2_ACCOUNT_ID=
# CLOUDFLARE_R2_ACCESS_KEY_ID=
# CLOUDFLARE_R2_SECRET_ACCESS_KEY=
# CLOUDFLARE_R2_BUCKET_NAME=
MAX_FILE_SIZE=10485760
```

### Option B: Cloudflare R2 (Free 10GB)
```env
CLOUDFLARE_R2_ACCOUNT_ID=your-account-id
CLOUDFLARE_R2_ACCESS_KEY_ID=your-access-key
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your-secret-key
CLOUDFLARE_R2_BUCKET_NAME=recyclequest-uploads
MAX_FILE_SIZE=10485760
```

**How to get Cloudflare R2:**
1. Go to https://cloudflare.com/
2. Sign up for free account
3. Go to R2 Object Storage
4. Create a bucket named "recyclequest-uploads"
5. Go to Manage R2 API tokens
6. Create API token with R2 permissions
7. Copy Account ID, Access Key ID, and Secret Access Key

## Step 7: Gamification Settings
```env
BASE_XP_PER_KG=10
BASE_COINS_PER_KG=10
LEVEL_XP_MULTIPLIER=1.5
```
**What to do:** Keep these default values (you can adjust later)

## Quick Start Configuration (Minimal Setup)

For the fastest setup to get started, here's a minimal `.env` file:

```env
# Environment Configuration
ENVIRONMENT=development
DEBUG=true

# Security (CHANGE THIS!)
SECRET_KEY=put-your-generated-secret-key-here

# Hosts
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ORIGINS=http://localhost:3000,http://localhost:19006

# Local Database (using Docker)
DATABASE_URL=postgresql://recyclequest:recyclequest123@localhost:5432/recyclequest
DATABASE_ECHO=false

# Local Redis (using Docker)
REDIS_URL=redis://localhost:6379

# File Storage
MAX_FILE_SIZE=10485760

# Gamification Settings
BASE_XP_PER_KG=10
BASE_COINS_PER_KG=10
LEVEL_XP_MULTIPLIER=1.5
```

## Testing Your Configuration

After setting up your `.env` file:

1. **Start the databases:**
   ```bash
   docker-compose up -d postgres redis
   ```

2. **Test the backend:**
   ```bash
   cd backend
   python -m uvicorn app.main:app --reload
   ```

3. **Check health endpoint:**
   Open http://localhost:8000/health in your browser

4. **Check API docs:**
   Open http://localhost:8000/docs in your browser

## Common Issues & Solutions

### Issue: "SECRET_KEY not set"
**Solution:** Make sure you generated and set a SECRET_KEY in your `.env` file

### Issue: "Database connection failed"
**Solution:** 
- For local: Make sure Docker PostgreSQL is running: `docker-compose up -d postgres`
- For Supabase: Check your connection string and password

### Issue: "Redis connection failed"
**Solution:**
- For local: Make sure Docker Redis is running: `docker-compose up -d redis`
- For Upstash: Check your connection URL

### Issue: "Module not found" errors
**Solution:** Make sure you're in the backend directory and have installed dependencies:
```bash
cd backend
pip install -r requirements.txt
```

## Next Steps

Once your `.env` file is configured and the backend starts successfully:

1. The API will be available at http://localhost:8000
2. API documentation at http://localhost:8000/docs
3. You can proceed to start the mobile app
4. Test user registration and login

## Security Note

**Never commit your `.env` file to version control!** It's already in `.gitignore`, but double-check that your actual passwords and keys are never pushed to GitHub.