# RecycleQuest

A gamified recycling application that transforms everyday recycling tasks into engaging game-like experiences.

## Architecture

- **Frontend**: React Native with TypeScript
- **Backend**: Python FastAPI with SQLAlchemy
- **Database**: Supabase PostgreSQL with Upstash Redis for caching
- **Storage**: Cloudflare R2 for images and media
- **Hosting**: Railway/Render for backend, Cloudflare for CDN
- **Real-time**: WebSocket connections for live updates

## Project Structure

```
recycle-quest/
├── mobile/                 # React Native app
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── screens/        # App screens
│   │   ├── store/          # Redux store and slices
│   │   ├── services/       # API services
│   │   ├── types/          # TypeScript type definitions
│   │   └── utils/          # Utility functions
│   └── package.json
├── backend/                # FastAPI backend
│   ├── app/
│   │   ├── api/            # API routes
│   │   ├── core/           # Core configuration
│   │   ├── models/         # Database models
│   │   ├── schemas/        # Pydantic schemas
│   │   ├── services/       # Business logic
│   │   └── main.py         # FastAPI app entry point
│   └── requirements.txt
├── docker-compose.yml      # Local development setup
└── README.md
```

## Quick Start

### Option 1: Cloud Services (Recommended)
1. **Set up cloud services**:
   - Create [Supabase](https://supabase.com) project for PostgreSQL
   - Create [Upstash](https://upstash.com) Redis database
   - Create [Cloudflare R2](https://cloudflare.com/products/r2/) bucket
   - Deploy backend to [Railway](https://railway.app) or [Render](https://render.com)

2. **Configure environment**:
   ```bash
   cp backend/.env.example backend/.env
   # Edit backend/.env with your cloud service URLs
   ```

3. **Install and start**:
   ```bash
   npm run setup
   npm run dev
   ```

### Option 2: Local Development
1. **Start local databases**:
   ```bash
   docker-compose --profile local-db --profile backend up
   ```

2. **Install dependencies**:
   ```bash
   npm run setup
   ```

3. **Start mobile app**:
   ```bash
   npm run mobile
   ```

## Features

- 🎮 Gamification with points, levels, and achievements
- 🏆 Daily and weekly quests
- 👥 Social leaderboards and team battles
- 🎁 Real-world rewards marketplace
- 📱 Smart bin integration with computer vision
- 📚 Educational content and recycling tips
- ⚡ Real-time updates with WebSocket connections

## Development

See individual README files in `mobile/` and `backend/` directories for detailed setup instructions.
## 
Cost-Effective Architecture

### Free Tier (MVP Development)
- **Supabase**: 500MB PostgreSQL database, 2GB bandwidth/month
- **Upstash**: 10K Redis commands/day
- **Cloudflare R2**: 10GB storage, 1M Class A operations/month
- **Railway**: 500 hours/month backend hosting
- **Cloudflare CDN**: Unlimited bandwidth on free plan

**Total Monthly Cost: $0** (within free tier limits)

### Production Scale (When You Grow)
- **Supabase Pro**: $25/month (8GB database, 250GB bandwidth)
- **Upstash**: $0.20 per 100K requests (pay-as-you-go)
- **Cloudflare R2**: $0.015/GB storage + $0.36/million requests
- **Railway Pro**: $5-20/month (depending on usage)
- **Cloudflare Workers**: $5/month for 10M requests

**Estimated Monthly Cost: $35-50** (for moderate traffic)

### Why This Stack?
- ✅ **No AWS complexity or costs**
- ✅ **Generous free tiers for MVP development**
- ✅ **Pay-as-you-grow pricing**
- ✅ **Global CDN and edge computing**
- ✅ **Managed services (no DevOps overhead)**
- ✅ **Built-in real-time features**