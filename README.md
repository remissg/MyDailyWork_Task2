# 🚀 JobPortal - Modern Job Portal Application

<img width="400" alt="JobPortal logo" src="public/logo.png" />

**JobPortal** is a full-stack MERN (MongoDB, Express, React, Node.js) application designed to connect top talent with great companies. It features a modern, responsive UI, role-based authentication, comprehensive dashboards for both candidates and employers, and complete support infrastructure.

---

## ✨ Key Features

### 🔐 Authentication & Security
- **Role-Based Access Control**: Separate portals for Candidates, Employers, and Admins
- **Secure Authentication**: JWT-based session management
- **Protected Routes**: Dashboard access strictly limited to authenticated users

### 👨‍💼 For Employers
- **Post & Manage Jobs**: Easy interface to create, edit, and delete job listings
- **Application Tracking**: View applicant profiles and manage hiring status
- **Company Profile**: Customize company details and branding
- **Pricing Plans**: Three tiers (Starter, Professional, Enterprise) with monthly/yearly billing

### 👩‍💻 For Candidates
- **Advanced Job Search**: Filter by keyword, location, salary, and category
- **One-Click Apply**: Streamlined application process with resume upload
- **Dashboard**: Track applied jobs, saved jobs, and application status in real-time
- **Email Alerts**: Customizable notification settings for new jobs and updates

### 🛠️ Admin Power
- **System Overview**: Statistics on total users, jobs, and applications
- **User Management**: Ability to manage registered users
- **Contact Form Management**: Review and respond to user inquiries

### 📋 Support & Information Pages
- **Help Center** (`/help-center`): Searchable FAQ with 4 categories (Getting Started, For Job Seekers, For Employers, Account Management)
- **Contact Us** (`/contact`): Functional contact form with backend integration and database storage
- **Terms of Service** (`/terms`): Comprehensive legal terms (13 sections)
- **Privacy Policy** (`/privacy`): GDPR-compliant privacy information (12 sections)
- **Sitemap** (`/sitemap`): Complete site navigation organized by category
- **Pricing Plans** (`/pricing`): Three-tier pricing with feature comparison and billing toggle

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React.js (Vite)
- **Styling**: Vanilla CSS, Gradient designs
- **Icons**: Lucide React
- **Routing**: React Router v6
- **State Management**: React Context API

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken)
- **Email**: Nodemailer
- **Security**: Bcrypt for password hashing

### Deployment
- **Frontend & Backend**: Vercel
- **Database**: MongoDB Atlas
- **CI/CD**: GitHub integration with Vercel

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (Local or Atlas URI)

### 1. Clone the Repository
```bash
git clone https://github.com/remissg/MyDailyWork_Task2.git
cd MyDailyWork_Task2
```

### 2. Backend Setup
Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```env
PORT=5050
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_SERVICE=gmail
EMAIL_USERNAME=your_email@gmail.com
EMAIL_PASSWORD=your_email_app_password
EMAIL_FROM=noreply@jobportal.com
```

Seed the database with test data:
```bash
node seed.js           # Seeds companies and jobs
node seed_candidate.js # Seeds a candidate and applications
```

Start the server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal, navigate to the root directory, and install dependencies:
```bash
cd ..
npm install
```

Start the development server:
```bash
npm run dev
```

Visit `http://localhost:5173` to view the app.

---

## 📁 Project Structure

```
JobPortal/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Layout.jsx      # App layout with navbar and footer
│   │   ├── Navbar.jsx      # Navigation component
│   │   ├── Button.jsx      # Button component
│   │   └── JobCard.jsx     # Job listing card
│   ├── pages/              # Application pages
│   │   ├── Home.jsx        # Landing page
│   │   ├── JobListings.jsx # Browse jobs
│   │   ├── JobDetail.jsx   # Individual job details
│   │   ├── Login.jsx       # Authentication
│   │   ├── Register.jsx    # User registration
│   │   ├── Dashboard.jsx   # Employer dashboard
│   │   ├── CandidateDashboard.jsx # Candidate dashboard
│   │   ├── HelpCenter.jsx  # FAQ page
│   │   ├── ContactUs.jsx   # Contact form
│   │   ├── TermsOfService.jsx # Legal terms
│   │   ├── PrivacyPolicy.jsx # Privacy information
│   │   ├── Sitemap.jsx     # Site navigation
│   │   └── Pricing.jsx     # Pricing plans
│   ├── context/            # React context
│   │   └── AuthContext.jsx # Authentication state
│   └── App.jsx             # Main app component
├── server/
│   ├── models/             # Database schemas
│   │   ├── User.js
│   │   ├── Job.js
│   │   ├── Application.js
│   │   └── Contact.js      # Contact form submissions
│   ├── controllers/        # Route controllers
│   │   ├── authController.js
│   │   ├── jobController.js
│   │   ├── applicationController.js
│   │   └── contactController.js
│   ├── routes/             # API routes
│   │   ├── authRoutes.js
│   │   ├── jobRoutes.js
│   │   ├── applicationRoutes.js
│   │   └── contactRoutes.js
│   ├── middleware/         # Custom middleware
│   │   └── authMiddleware.js
│   └── server.js           # Express server setup
└── vercel.json             # Vercel deployment config
```

---

## 🧪 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin@jobportal.com` | `password123` |
| **Employer** | `employer@example.com` | `password123` |
| **Candidate** | `candidate@test.com` | `password123` |

---

## 🌐 Live Demo

🔗 **Production URL**: [https://job-portal-h2km2i05a-maitijoydip888-6970s-projects.vercel.app](https://job-portal-h2km2i05a-maitijoydip888-6970s-projects.vercel.app)

### Available Pages
- `/` - Home page with featured jobs
- `/jobs` - Browse all job listings
- `/jobs/:id` - Individual job details
- `/companies` - Browse companies
- `/login` - User authentication
- `/register` - Create new account
- `/dashboard` - Employer dashboard
- `/candidate-dashboard` - Candidate dashboard
- `/help-center` - Help and FAQ
- `/contact` - Contact form
- `/pricing` - Pricing plans
- `/terms` - Terms of Service
- `/privacy` - Privacy Policy
- `/sitemap` - Site navigation

---

## 🎨 Design Features

- **Modern UI**: Clean, professional design with gradient accents
- **Responsive Layout**: Fully mobile-responsive across all pages
- **Green Theme**: Consistent `#10b981` to `#059669` gradient branding
- **Smooth Animations**: Hover effects and transitions throughout
- **Icon Integration**: Lucide React icons for visual enhancement
- **Card-Based Layout**: Modern card designs for content organization

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Jobs
- `GET /api/jobs` - Get all jobs (with filters)
- `GET /api/jobs/:id` - Get single job
- `POST /api/jobs` - Create job (Employer only)
- `PUT /api/jobs/:id` - Update job (Employer only)
- `DELETE /api/jobs/:id` - Delete job (Employer only)

### Applications
- `POST /api/applications` - Submit application
- `GET /api/applications` - Get user's applications
- `PUT /api/applications/:id` - Update application status

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (Admin only)
- `PUT /api/contact/:id` - Update contact status (Admin only)

---

## 🚀 Deployment

### Vercel Deployment

#### Prerequisites
- A Vercel account ([sign up here](https://vercel.com))
- MongoDB Atlas account (for production database)
- GitHub repository (optional, for automatic deployments)

#### Step 1: Install Vercel CLI
```bash
npm i -g vercel
```

#### Step 2: Login to Vercel
```bash
vercel login
```

#### Step 3: Set Environment Variables
Before deploying, you need to set environment variables in Vercel:

**Option A: Via Vercel Dashboard**
1. Go to your project settings on Vercel
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_jwt_secret_key
NODE_ENV=production
PORT=5000

# Email Configuration (Production)
EMAIL_HOST_PROD=your_smtp_host
EMAIL_PORT_PROD=587
EMAIL_USER_PROD=your_email@example.com
EMAIL_PASS_PROD=your_email_app_password
EMAIL_FROM=noreply@jobportal.com
EMAIL_FROM_NAME=JobPortal
```

**Option B: Via Vercel CLI**
```bash
vercel env add MONGO_URI
vercel env add JWT_SECRET
vercel env add NODE_ENV production
# ... add other variables
```

#### Step 4: Deploy to Production
```bash
# Deploy to production
vercel --prod

# Or deploy to preview
vercel
```

#### Step 5: Verify Deployment
After deployment, Vercel will provide you with:
- **Production URL**: Your live application URL
- **Preview URLs**: For each commit/PR

#### Alternative: GitHub Integration (Recommended)
1. Push your code to GitHub
2. Import your repository in Vercel Dashboard
3. Vercel will automatically:
   - Detect the framework (Vite)
   - Build and deploy on every push
   - Create preview deployments for PRs

#### Configuration Details
The `vercel.json` configuration handles:
- **Frontend Build**: Automatically builds React app using Vite
- **Output Directory**: Serves files from `dist/` folder
- **API Routes**: All `/api/*` requests are routed to `api/index.js` (serverless function)
- **SPA Routing**: All non-API routes serve `index.html` for React Router
- **CORS Headers**: Configured for API endpoints
- **Function Settings**: API functions have 1024MB memory and 30s timeout

#### Important Notes
- **File Uploads**: Resume uploads use in-memory storage (suitable for serverless)
- **Database**: Use MongoDB Atlas for production (free tier available)
- **Environment Variables**: Never commit `.env` files to Git
- **Build Command**: `npm run build` (configured in `vercel.json`)
- **Install Command**: `npm install` (default)

---

## 📝 Recent Updates

### Latest Features (December 2024)
✅ Complete support infrastructure (Help Center, Contact Us, Terms, Privacy)  
✅ Sitemap page with organized navigation  
✅ Three-tier pricing plans with billing toggle  
✅ Contact form backend with database integration  
✅ GDPR-compliant privacy policy  
✅ Comprehensive FAQ system  
✅ Updated footer with working links  
✅ Simplified Vercel deployment configuration

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/remissg/MyDailyWork_Task2/issues).

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Joydip Maiti**
- GitHub: [@remissg](https://github.com/remissg)

---

## 🙏 Acknowledgments

- Built with React, Node.js, Express, and MongoDB
- UI icons by Lucide React
- Deployed on Vercel
- Database hosted on MongoDB Atlas

---

**Made with ❤️ for connecting talent with opportunities**
