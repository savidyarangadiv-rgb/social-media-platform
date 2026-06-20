# Social Media Platform (Instagram-like)

A full-stack social media application for sharing photos and connecting with friends. Built with Node.js, React, and PostgreSQL.

## Features

✨ **User Management**
- User registration and authentication
- Profile creation and editing
- Follower/following system

📸 **Content Sharing**
- Upload and share photos
- Create posts with captions
- Like and comment on posts

🔔 **Interactions**
- Follow/Unfollow users
- Like and unlike posts
- Comment on posts

🔐 **Security**
- JWT-based authentication
- Password hashing
- Protected API routes

## Quick Start with Docker

```bash
docker-compose up --build
```

Open `http://localhost:3000` in your browser!

## Manual Setup

### Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

### Database
```bash
psql -U postgres -c "CREATE DATABASE social_media;"
psql -U postgres -d social_media -f backend/migrations/init.sql
```

## First Steps

1. Register a new account at `http://localhost:3000/register`
2. Create posts with photos
3. Follow your friends
4. Like and comment on posts

## Tech Stack

- **Backend**: Node.js + Express.js
- **Frontend**: React
- **Database**: PostgreSQL
- **Auth**: JWT
- **Styling**: CSS

## API Endpoints

- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login
- `GET /api/posts` - Get feed
- `POST /api/posts` - Create post
- `POST /api/likes` - Like post
- `POST /api/comments` - Comment
- `POST /api/follows` - Follow user

## Deployment

See SETUP.md for deployment guides (Heroku, AWS, DigitalOcean).

## License

MIT
