# 🚀 Vercel Deployment Guide

This guide will help you deploy your Job Portal application to Vercel.

## Prerequisites

- ✅ Vercel account ([Sign up](https://vercel.com))
- ✅ MongoDB Atlas account ([Sign up](https://www.mongodb.com/cloud/atlas))
- ✅ GitHub account (optional, for automatic deployments)

## Quick Start

### Method 1: Vercel CLI (Recommended for first-time deployment)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Navigate to project root**
   ```bash
   cd "C:\Users\Joydip Maiti\Desktop\Job Portal"
   ```

4. **Deploy**
   ```bash
   vercel
   ```
   Follow the prompts to link your project.

5. **Set Environment Variables**
   ```bash
   vercel env add MONGO_URI
   vercel env add JWT_SECRET
   vercel env add NODE_ENV production
   # Add other variables as needed
   ```

6. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### Method 2: GitHub Integration (Recommended for ongoing deployments)

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect settings

3. **Configure Environment Variables**
   - In project settings → Environment Variables
   - Add all required variables (see below)

4. **Deploy**
   - Vercel will automatically deploy on every push to main
   - Preview deployments are created for pull requests

## Required Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/jobportal` |
| `JWT_SECRET` | Secret key for JWT tokens | `your-super-secret-key-here` |
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Server port (optional) | `5000` |
| `EMAIL_HOST_PROD` | SMTP host for emails | `smtp.gmail.com` |
| `EMAIL_PORT_PROD` | SMTP port | `587` |
| `EMAIL_USER_PROD` | Email username | `your-email@gmail.com` |
| `EMAIL_PASS_PROD` | Email app password | `your-app-password` |
| `EMAIL_FROM` | From email address | `noreply@jobportal.com` |
| `EMAIL_FROM_NAME` | From name | `JobPortal` |

### Getting MongoDB Atlas URI

1. Create a cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a database user
3. Whitelist IP addresses (or use `0.0.0.0/0` for Vercel)
4. Get connection string: `mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority`

### Getting Gmail App Password (for email)

1. Enable 2-Step Verification on your Google Account
2. Go to [App Passwords](https://myaccount.google.com/apppasswords)
3. Generate a new app password for "Mail"
4. Use this password in `EMAIL_PASS_PROD`

## Project Structure for Vercel

```
Job Portal/
├── api/
│   └── index.js          # Serverless API handler
├── server/               # Backend code
├── src/                  # Frontend React code
├── dist/                 # Build output (generated)
├── vercel.json           # Vercel configuration
└── package.json          # Dependencies
```

## How It Works

1. **Frontend**: Vite builds React app → `dist/` folder
2. **Backend**: Express app exported from `api/index.js` as serverless function
3. **Routing**: 
   - `/api/*` → Serverless function
   - `/*` → React app (SPA routing)

## Verification Checklist

After deployment, verify:

- [ ] Frontend loads at production URL
- [ ] API health check: `https://your-app.vercel.app/api/` returns "API is running..."
- [ ] Can register new user
- [ ] Can login
- [ ] Can browse jobs
- [ ] Can apply to jobs (if logged in as candidate)
- [ ] Can post jobs (if logged in as employer)

## Troubleshooting

### Build Fails
- Check that all dependencies are in root `package.json`
- Verify Node.js version (Vercel uses Node 18+ by default)
- Check build logs in Vercel dashboard

### API Returns 500 Errors
- Verify environment variables are set correctly
- Check MongoDB connection string
- Review function logs in Vercel dashboard

### Frontend Can't Connect to API
- Verify `vercel.json` rewrites are correct
- Check CORS settings (already configured)
- Ensure API routes start with `/api/`

### Database Connection Issues
- Verify MongoDB Atlas IP whitelist includes Vercel IPs
- Check connection string format
- Ensure database user has correct permissions

## Post-Deployment

1. **Update Frontend API URLs** (if needed)
   - Currently uses relative URLs (`/api/*`) which works automatically
   - No changes needed!

2. **Test All Features**
   - User registration/login
   - Job posting/editing
   - Job applications
   - Dashboard functionality

3. **Monitor**
   - Check Vercel dashboard for function logs
   - Monitor MongoDB Atlas for connection metrics
   - Set up error tracking (optional)

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Setup](https://docs.atlas.mongodb.com/getting-started/)
- [Express on Vercel](https://vercel.com/docs/concepts/functions/serverless-functions/runtimes/node-js#using-express)

---

**Need Help?** Check the main [README.md](./README.md) or open an issue on GitHub.

