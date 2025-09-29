
# PulseMeet - Code To Give 2025

🚀 **Project Overview**
PulseMeet is a real-time communication and social platform that enables users to chat, make video calls, manage friends, and receive notifications—all in a secure, modern, and responsive web app. Built with the MERN stack, PulseMeet focuses on seamless user experience, privacy, and scalable community interaction.

---


---

⚠️ **Problem Statement**
In today's digital world, people need a unified platform for real-time conversations, video meetings, and social connections. Existing solutions are often fragmented, lack privacy, or are hard to use. PulseMeet solves this by providing a single, easy-to-use app for messaging, calling, and managing friends—empowering users to connect and collaborate securely and efficiently.

---

📹 **Watch Demo Video**
Click the image or [this link](#) to watch the demo video.

---

📌 **Features**
- Real-time 1:1 and group chat (Stream API)
- Audio/video calls (Stream Video SDK)
- Friend requests, friend list, and notifications
- Secure user authentication (JWT, cookies)
- Onboarding and user profile management
- Theming (light/dark mode)
- Responsive, mobile-first UI
- Toast notifications and loading indicators
- Privacy-focused architecture
- Performance analytics (future)
- AI-powered features (future)

---


🛠 **Tech Stack & Integrations**

**Frontend:**
- React.js (hooks, Zustand state management)
- React Router v7
- Tailwind CSS, DaisyUI
- Vite (build tool)
- Axios (API calls)
- Stream Chat & Video SDKs

**Backend:**
- Node.js & Express.js
- MongoDB (Mongoose ODM)
- JWT, bcryptjs, cookie-parser
- CORS, dotenv

**Integrations:**
- Stream (chat, video)
- Cloudinary (media uploads)
- Google Gemini (future)
- Nodemailer (future)

**Dev Workflow:**
- Monorepo: `/backend` and `/frontend`
- ESLint, PostCSS, Vite, Nodemon

---

🔄 **Workflow & Architecture**
- Modular Express API (auth, user, chat, friend controllers)
- Secure JWT authentication with refresh tokens
- RESTful API endpoints for auth, users, chat
- Real-time features via Stream SDK
- React SPA with protected routes and onboarding
- State management with hooks and Zustand
- Theming and responsive design

---

🛠 **Installation & Setup**

1️⃣ **Clone the Repository**
```sh
git clone https://github.com/Santoshkumar2383mandal/PulseMeet.git
cd PulseMeet
```

2️⃣ **Install Dependencies**
```sh
cd backend
npm install
cd ../frontend
npm install
```

3️⃣ **Set Up Environment Variables**
Create a `.env` file in `backend/` and add:
```env
MONGO_URL=your_mongodb_connection_string
PORT=your_port_number
CORS_ORIGIN=your_frontend_url
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=your_access_token_expiry
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=your_refresh_token_expiry
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
GMAIL_PASS=your_gmail_app_password
GEMINI_API_KEY=your_google_gemini_api_key
GEMINI_MODEL=your_gemini_model_name
GOOGLE_APPLICATION_CREDENTIALS=path_to_your_configuration_json_file
```
> **Note:** Never share your environment variables publicly. Store sensitive values securely using a `.env` file or a vault service.

4️⃣ **Start Development Servers**
```sh
# In one terminal
cd backend
npm run dev
# In another terminal
cd frontend
npm run dev
```

---

🎥 **Demo & Screenshots**
<!-- Add images or links here -->

---

🎯 **Future Enhancements**
- 🤖 AI-powered Chatbot for instant support
- 📧 Enhanced Email & Notification System
- 📱 Mobile Optimization
- 📝 Advanced Feedback & Analytics
- 📂 Document & Link Sharing
- 🛠 Zip File Support for bulk uploads/downloads
- 🔊 AI-driven Summarization & Accessibility
