# MagicBricks Clone

A simplified property listing application similar to MagicBricks, built with the MERN stack (MongoDB, Express, React, Node.js).

## Live Demo

[View Live Demo](https://magicbricks-ten.vercel.app) <!-- Replace with your actual deployed URL -->

## Features

- **Home Page**: Browse and search all available properties
- **Property Details**: View comprehensive information about each property
- **Admin Panel**: Manage property listings (add, edit, delete)
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Built with Tailwind CSS and Shadcn UI
- **Auto Health Checks**: Built-in 14-minute interval health monitoring

## Tech Stack

### Frontend
- React with Vite
- React Router for navigation
- Tailwind CSS for styling
- Shadcn UI components
- Axios for API requests

### Backend
- Node.js
- Express.js
- MongoDB for database
- Mongoose for data modeling
- Node-cron for scheduled tasks

## Project Structure

```
/
├── client/              # Frontend React application
│   ├── src/
│   │   ├── api/         # API integration
│   │   ├── components/  # Reusable UI components
│   │   ├── contexts/    # React context providers
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # Utility functions
│   │   └── pages/       # Page components
│   └── ...
│
├── server/              # Backend Node.js application
│   ├── config/          # Configuration files
│   ├── controllers/     # Request handlers
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions and services
│   └── server.js        # Entry point
└── ...
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB (local installation or MongoDB Atlas)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/krishna-nishant/magicbricks-clone.git
   cd magicbricks-clone
   ```

2. Install server dependencies
   ```bash
   cd server
   npm install
   ```

3. Install client dependencies
   ```bash
   cd ../client
   npm install
   ```

4. Set up environment variables
   - Create a `.env` file in the server directory with:
     ```
     PORT=3000
     MONGO_URI=mongodb://localhost:27017/magicbricks
     NODE_ENV=development
     ```
   - Create a `.env` file in the client directory with:
     ```
     VITE_API_URL=http://localhost:3000/api
     ```

5. Seed the database (optional)
   ```bash
   cd ../server
   node seed.js
   ```

### Running the Application

1. Start the backend server
   ```bash
   cd server
   npm run dev
   ```

2. Start the frontend application
   ```bash
   cd client
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`


## Server Health Monitoring

The application includes automatic health checks that run every 14 minutes to prevent the server from sleeping on free hosting platforms. This is built directly into the application using node-cron - no external setup required.

## Acknowledgments

- MagicBricks for inspiration
- Unsplash for property images 