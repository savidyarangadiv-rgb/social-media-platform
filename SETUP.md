# Social Media Platform - Setup Guide

## Prerequisites
- Node.js v14+ installed
- PostgreSQL v12+ installed
- Docker (optional, for containerized setup)
- npm or yarn

## Local Setup (Without Docker)

### 1. Setup Backend

```bash
cd backend
npm install
cp .env.example .env
```

Update `.env` with your PostgreSQL credentials:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=social_media
DB_USER=postgres
DB_PASSWORD=your_password
```

Create database:
```bash
psql -U postgres -c "CREATE DATABASE social_media;"
```

Run migrations:
```bash
psql -U postgres -d social_media -f migrations/init.sql
```

Start backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### 2. Setup Frontend

In another terminal:
```bash
cd frontend
npm install
cp .env.example .env
npm start
```

The frontend will run on `http://localhost:3000`

## Docker Setup (Recommended)

### Build and Run with Docker Compose

```bash
docker-compose up --build
```

This will start:
- PostgreSQL on `localhost:5432`
- Backend API on `http://localhost:5000`
- Frontend on `http://localhost:3000`

To stop:
```bash
docker-compose down
```

To stop and remove volumes:
```bash
docker-compose down -v
```

## First Steps

1. Open `http://localhost:3000` in your browser
2. Click "Register" to create a new account
3. Fill in your details and register
4. Start creating posts!

## Features

✅ User Registration & Login
✅ Create Posts with Images
✅ Like Posts
✅ Comment on Posts
✅ Follow/Unfollow Users
✅ View User Profiles
✅ Delete Your Posts

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile (requires auth)

### Posts
- `GET /api/posts` - Get feed (requires auth)
- `POST /api/posts` - Create post (requires auth)
- `GET /api/posts/:id` - Get post details
- `DELETE /api/posts/:id` - Delete post (requires auth)

### Likes
- `POST /api/likes` - Like a post (requires auth)
- `DELETE /api/likes/:postId` - Unlike a post (requires auth)

### Comments
- `GET /api/comments/post/:postId` - Get comments for a post
- `POST /api/comments` - Add comment (requires auth)
- `DELETE /api/comments/:id` - Delete comment (requires auth)

### Follows
- `POST /api/follows` - Follow user (requires auth)
- `DELETE /api/follows/:followingId` - Unfollow user (requires auth)

## Sharing with Friends

1. Deploy the application to a server (AWS, Heroku, DigitalOcean, etc.)
2. Share the URL with your friends
3. They can register and start connecting!

## Deployment Options

### Heroku
- Add `Procfile` in backend directory with: `web: npm start`
- Deploy using `git push heroku main`

### AWS EC2
- Launch instance, install Node.js and PostgreSQL
- Clone repository and run setup commands
- Use PM2 to manage processes

### DigitalOcean
- Create app from GitHub repo
- Set environment variables
- Deploy automatically

## Troubleshooting

### Port Already in Use
```bash
# Kill process using port 5000 (backend)
lsof -ti:5000 | xargs kill -9

# Kill process using port 3000 (frontend)
lsof -ti:3000 | xargs kill -9
```

### Database Connection Error
- Check PostgreSQL is running
- Verify .env credentials match your database setup
- Ensure database exists

### CORS Error
- Check `CLIENT_URL` in backend `.env`
- Make sure frontend URL matches

## Next Steps

- Add real-time notifications with Socket.io
- Implement direct messaging
- Add image resizing and optimization
- Add hashtag support
- Implement search functionality
- Add user recommendations
- Add Stories feature
- Add video support

## License

MIT

## Support

For issues or questions, open an issue in the repository.
