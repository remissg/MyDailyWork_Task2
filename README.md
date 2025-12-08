# 🚀 JobPortal - Modern Job Portal Application

<img width="400" alt="JobPortal logo" src="public/logo.png" />

**JobPortal** is a full-stack MERN (MongoDB, Express, React, Node.js) application designed to connect top talent with great companies. It features a modern, responsive UI, role-based authentication, and comprehensive dashboards for both candidates and employers.

## ✨ Key Features

### 🔐 Authentication & Security
- **Role-Based Access Control**: Separate portals for Candidates, Employers, and Admins.
- **Secure Authentication**: JWT-based session management.
- **Protected Routes**: Dashboard access strictly limited to authenticated users.

### 👨‍💼 For Employers
- **Post & Manage Jobs**: easy interface to create, edit, and delete job listings.
- **Application Tracking**: View applicant profiles and manage hiring status.
- **Company Profile**: Customize company details and branding.

### 👩‍💻 For Candidates
- **Advanced Job Search**: Filter by keyword, location, salary, and category.
- **One-Click Apply**: Streamlined application process with resume upload.
- **Dashboard**: Track applied jobs, saved jobs, and application status in real-time.
- **Email Alerts**: Customizable notification settings for new jobs and updates.

### 🛠️ Admin Power
- **System Overview**: Statistics on total users, jobs, and applications.
- **User Management**: Ability to manage registered users.

---

## 🛠️ Technology Stack

- **Frontend**: React.js (Vite), Tailwind CSS, Lucide Icons
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **State Management**: React Context API
- **Deployment**: Vercel (Frontend), Render/Heroku (Backend ready)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (Local or Atlas URI)

### 1. Clone the Repository
\`\`\`bash
git clone https://github.com/remissg/MyDailyWork_Task2.git
cd MyDailyWork_Task2
\`\`\`

### 2. Backend Setup
Navigate to the server directory and install dependencies:
\`\`\`bash
cd server
npm install
\`\`\`

Create a \`.env\` file in the \`server\` directory:
\`\`\`env
PORT=5050
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_SERVICE=gmail
EMAIL_USERNAME=your_email@gmail.com
EMAIL_PASSWORD=your_email_app_password
EMAIL_FROM=noreply@jobportal.com
\`\`\`

Seed the database with test data:
\`\`\`bash
node seed.js           # Seeds companies and jobs
node seed_candidate.js # Seeds a candidate and applications
\`\`\`

Start the server:
\`\`\`bash
npm run dev
\`\`\`

### 3. Frontend Setup
Open a new terminal, navigate to the root directory (or \`client\` if separated), and install dependencies:
\`\`\`bash
cd ..
npm install
\`\`\`

Start the development server:
\`\`\`bash
npm run dev
\`\`\`

Visit \`http://localhost:5173\` to view the app.

---

## 🧪 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin@jobportal.com` | `password123` |
| **Employer** | `employer@example.com` | `password123` |
| **Candidate** | `candidate@test.com` | `password123` |

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
