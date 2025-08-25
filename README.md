# DesignAI (Matty)

A modern AI-powered design tool built with React, Vite, Node.js (Express), and MongoDB.

## Features
- Beautiful landing page, login, signup, dashboard, and editor
- Modern UI with glassmorphism and custom CSS (no Tailwind)
- Authentication (JWT, bcrypt)
- MongoDB database
- Protected routes (React Router)
- Polotno editor for design creation

## Prerequisites
- Node.js (v16+ recommended)
- npm (v8+ recommended)
- MongoDB Atlas account (or local MongoDB)

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Sabari1510/Matty.git
cd Matty
```

### 2. Install dependencies
#### Frontend
```bash
npm install
```
#### Backend
```bash
cd server
npm install
```

### 3. Configure environment variables
Create a file at `server/config.env` with the following:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 4. Run the backend server
```bash
cd server
npm start
# or
node server.js
```

### 5. Run the frontend (in a new terminal)
```bash
cd .. # if you're in /server
npm start
# or
npm run dev
```

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:5000](http://localhost:5000)

## Project Structure
```
Matty/
├── src/                # React frontend
├── server/             # Node.js + Express backend
├── public/             # Static assets
├── .gitignore
├── README.md
├── package.json        # Frontend dependencies
└── ...
```

## Environment Variables
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: Secret for JWT authentication

## Deployment
- Make sure to set environment variables in your deployment environment.
- Build frontend: `npm run build`
- Serve static files or deploy to Vercel/Netlify for frontend, and Render/Heroku for backend.



---

**Made with ❤️ by Sabari1510 and team
