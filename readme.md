# PulseMeet

<div align="center">
  <img src="https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js" alt="Node.js" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Stream-Chat_&_Video-orange?style=for-the-badge&logo=stream" alt="Stream" />
</div>

## 🚀 Overview

**PulseMeet** is a modern, real-time communication platform that connects language learners worldwide. Built with the MERN stack, it offers secure authentication, friend management, instant messaging, and video calling capabilities—all designed to facilitate meaningful language exchange partnerships.

### 🎯 Key Features

- **🔐 Secure Authentication** - JWT-based authentication with cookie security
- **👥 Friend Management** - Send/receive friend requests with smart recommendations
- **💬 Real-time Chat** - Powered by Stream Chat API with message threading
- **📹 Video Calling** - High-quality video calls using Stream Video SDK
- **🌍 Language Exchange** - Connect with native speakers of your target language
- **🎨 Modern UI** - Responsive design with light/dark theme support
- **📱 Mobile-First** - Optimized for all device sizes
- **🔔 Smart Notifications** - Real-time friend request and chat notifications

## 🛠 Tech Stack

### Frontend
- **React 19.0.0** - Latest React with modern hooks
- **React Router v7** - Client-side routing
- **Tailwind CSS + DaisyUI** - Utility-first styling with component library
- **Vite** - Fast build tool and dev server
- **TanStack Query** - Server state management
- **Zustand** - Lightweight state management
- **Stream Chat & Video SDKs** - Real-time communication
- **Axios** - HTTP client
- **Lucide React** - Beautiful icons
- **React Hot Toast** - Elegant notifications

### Backend
- **Node.js + Express.js** - Server framework
- **MongoDB + Mongoose** - Database and ODM
- **JWT + bcryptjs** - Authentication and password hashing
- **Stream Chat** - Real-time messaging infrastructure
- **CORS + Cookie Parser** - Cross-origin and cookie handling

### Development Tools
- **ESLint** - Code linting
- **PostCSS + Autoprefixer** - CSS processing
- **Nodemon** - Development server auto-restart

## 📁 Project Structure

```
PulseMeet/
├── backend/                 # Node.js/Express API
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   │   ├── auth.controller.js
│   │   │   ├── chat.controller.js
│   │   │   └── user.controller.js
│   │   ├── lib/            # Utilities and integrations
│   │   │   ├── db.js       # MongoDB connection
│   │   │   └── stream.js   # Stream API integration
│   │   ├── middleware/     # Custom middleware
│   │   │   └── auth.middleware.js
│   │   ├── models/         # Database schemas
│   │   │   ├── User.js
│   │   │   └── FriendRequest.js
│   │   ├── routes/         # API routes
│   │   │   ├── auth.route.js
│   │   │   ├── user.route.js
│   │   │   └── chat.route.js
│   │   └── server.js       # Express server setup
│   ├── package.json
│   └── package-lock.json
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── Layout.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── ...
│   │   ├── hooks/          # Custom React hooks
│   │   │   ├── useAuthUser.js
│   │   │   ├── useLogin.js
│   │   │   └── ...
│   │   ├── lib/            # Utilities and API clients
│   │   │   ├── api.js
│   │   │   ├── axios.js
│   │   │   └── utils.js
│   │   ├── pages/          # Route components
│   │   │   ├── HomePage.jsx
│   │   │   ├── ChatPage.jsx
│   │   │   ├── CallPage.jsx
│   │   │   └── ...
│   │   ├── store/          # Zustand stores
│   │   │   └── useThemeStore.js
│   │   ├── constants/      # App constants
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # App entry point
│   ├── public/             # Static assets
│   ├── package.json
│   └── vite.config.js
└── readme.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB instance
- Stream account for chat and video features

### 1. Clone the Repository
```bash
git clone https://github.com/Santoshkumar2383mandal/PulseMeet.git
cd PulseMeet
```

### 2. Install Dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Environment Setup

#### Backend Environment Variables
Create a `.env` file in the `backend/` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGO_URL=your_mongodb_connection_string

# JWT Configuration
JWT_SECRET_KEY=your_jwt_secret_key

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# Stream Configuration
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
```

#### Frontend Environment Variables
Create a `.env` file in the `frontend/` directory:

```env
# Stream Configuration
VITE_STREAM_API_KEY=your_stream_api_key

# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api
```

### 4. Start Development Servers

```bash
# Terminal 1 - Backend Server
cd backend
npm run dev

# Terminal 2 - Frontend Server
cd frontend
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

## 🔧 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /signup` - User registration
- `POST /login` - User login
- `POST /logout` - User logout
- `GET /me` - Get current user
- `POST /onboarding` - Complete user onboarding

### User Routes (`/api/users`)
- `GET /friends` - Get user's friends list
- `GET /` - Get recommended users
- `GET /friend-requests` - Get incoming friend requests
- `GET /outgoing-friend-requests` - Get sent friend requests
- `POST /friend-request/:userId` - Send friend request
- `PUT /friend-request/:requestId/accept` - Accept friend request

### Chat Routes (`/api/chat`)
- `GET /token` - Get Stream chat token

## 🎨 Features in Detail

### 🔐 Authentication & Security
- Secure JWT token-based authentication
- HTTP-only cookies to prevent XSS attacks
- Password hashing with bcrypt
- Protected routes and middleware
- CSRF protection with SameSite cookies

### 👥 Social Features
- **Smart Recommendations** - AI-powered user suggestions based on language preferences
- **Friend Management** - Send, receive, and manage friend requests
- **Profile Customization** - Bio, languages, location, and profile pictures
- **Onboarding Flow** - Guided setup for new users

### 💬 Real-time Communication
- **Instant Messaging** - Real-time chat with message history
- **Message Threading** - Organized conversation threads
- **Typing Indicators** - See when others are typing
- **Message Status** - Read receipts and delivery confirmations

### 📹 Video Calling
- **High-Quality Calls** - Powered by Stream Video SDK
- **Screen Sharing** - Share your screen during calls
- **Call Controls** - Mute, camera toggle, and call management
- **Responsive Layout** - Optimized for all screen sizes

### 🎨 User Experience
- **Responsive Design** - Mobile-first approach
- **Dark/Light Themes** - User preference support
- **Loading States** - Smooth loading animations
- **Error Handling** - Graceful error management
- **Toast Notifications** - Non-intrusive feedback

## 🚀 Deployment

### Frontend Deployment (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend Deployment (Railway/Render)
1. Connect your GitHub repository
2. Set environment variables
3. Configure build command: `npm install`
4. Configure start command: `npm start`

### Environment Variables for Production
```env
NODE_ENV=production
MONGO_URL=your_production_mongodb_url
JWT_SECRET_KEY=your_secure_jwt_secret
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
CORS_ORIGIN=https://your-frontend-domain.vercel.app
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Stream](https://getstream.io/) for providing excellent chat and video SDKs
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [DaisyUI](https://daisyui.com/) for beautiful component library
- [Lucide](https://lucide.dev/) for the amazing icon set

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Contact the development team
- Check the documentation

---

<div align="center">
  <p>Built with ❤️ for language learners worldwide</p>
  <p>⭐ Star this repository if you found it helpful!</p>
</div>