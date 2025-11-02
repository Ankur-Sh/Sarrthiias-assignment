🧭 SarrthiIAS Assignment

A full-stack web application with Admin Dashboard, User Interface, and Secure Authentication System, built using React.js, Node.js, Express, and MongoDB.

🚀 Features

🔐 Admin Authentication — Secure login system for admins.

🧑‍💻 Admin Dashboard — Manage and edit dashboard content dynamically.

🌐 Frontend Interface — User-friendly interface built with React.

🔄 Backend API — Node.js + Express server with JWT authentication.

🗄️ Database Layer — MongoDB database for storing users, content, and admin credentials.

🚫 Access Control — Non-admin users are restricted from accessing the admin dashboard.

💾 Session Persistence — JWT stored in localStorage ensures logged-in admin sessions persist.

🧩 Tech Stack
Layer	Technology	Description
Frontend	React.js	Client-side rendering and routing
Styling	CSS	Clean responsive layout
Backend	Node.js, Express.js	RESTful API and authentication
Database	MongoDB	Stores admin credentials and dashboard content
Auth	JWT (JSON Web Token)	Secure session management
⚙️ Installation & Setup
Prerequisites

Ensure you have the following installed:

Node.js (v16+)

npm or yarn

MongoDB (running locally or using MongoDB Atlas)

Steps
1. Clone the repository
git clone https://github.com/Ankur-Sh/Sarrthiias-assignment.git
cd Sarrthiias-assignment

2. Setup the Backend
cd server
npm install


Create a .env file in the server/ directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key


Start the backend:

npm start

3. Setup the Frontend
cd ../client
npm install
npm start


Your frontend will run on http://localhost:3000

and backend on http://localhost:5000

🔗 API Endpoints
Method	Endpoint	Description
POST	/api/admin/login	Login admin and get JWT token
GET	/api/admin/dashboard	Fetch admin dashboard data
PUT	/api/admin/edit/:id	Edit dashboard content (admin only)
🧠 Workflow Diagram
                ┌────────────────────┐
                │      Client UI     │
                │ (React Frontend)   │
                └───────┬────────────┘
                        │  Login Request (username, password)
                        ▼
                ┌────────────────────┐
                │   Express Server   │
                │ (Node + JWT Auth)  │
                └───────┬────────────┘
                        │ Validate credentials
                        ▼
                ┌────────────────────┐
                │     MongoDB        │
                │ Admin collection   │
                └────────────────────┘
                        │
                        ▼
      ┌──────────────────────────────────────────────┐
      │  ✅ If valid admin: Return JWT Token          │
      │  ❌ If invalid: Return 403 Forbidden          │
      └──────────────────────────────────────────────┘
                        │
                        ▼
      ┌──────────────────────────────────────────────┐
      │ Frontend stores JWT in localStorage           │
      │ and redirects admin to dashboard              │
      └──────────────────────────────────────────────┘
                        │
                        ▼
      ┌──────────────────────────────────────────────┐
      │ On dashboard requests, frontend sends JWT     │
      │ Backend verifies → if valid, returns content   │
      │ Else → redirects to login                     │
      └──────────────────────────────────────────────┘

🧱 Folder Structure
Sarrthiias-assignment/
│
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/      # Navbar, ContentCard, etc.
│   │   ├── pages/           # AdminLogin, AdminDashboard, Home
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── server/                  # Node.js backend
│   ├── routes/              # API route handlers
│   ├── models/              # Mongoose schemas
│   ├── middleware/          # Auth middlewares (JWT)
│   ├── server.js
│   └── package.json
│
└── README.md

🔐 Authentication Flow

Admin logs in → backend validates credentials.

Backend returns a JWT token.

Frontend stores token in localStorage.

Protected routes (Dashboard) check for token before rendering.

If token is invalid or missing → user is redirected to Login.
