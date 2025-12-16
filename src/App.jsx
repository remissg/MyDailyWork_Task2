import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import DashboardLayout from './components/DashboardLayout'
import Home from './pages/Home'
import Companies from './pages/Companies'
import JobListings from './pages/JobListings'
import JobDetail from './pages/JobDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import JobApplication from './pages/JobApplication'
import CandidateDashboard from './pages/CandidateDashboard'
import AdminDashboard from './pages/AdminDashboard'
import CandidateLayout from './components/CandidateLayout'
import Settings from './pages/Settings'
import MyJobs from './pages/MyJobs'
import EditJob from './pages/EditJob'
import PostJob from './pages/PostJob'
import Applications from './pages/Applications'
import ApplicationDetail from './pages/ApplicationDetail'
import AppliedJobs from './pages/AppliedJobs'
import SavedJobs from './pages/SavedJobs'
import ResumeUpload from './pages/ResumeUpload'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'
import HelpCenter from './pages/HelpCenter'
import ContactUs from './pages/ContactUs'
import TermsOfService from './pages/TermsOfService'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Sitemap from './pages/Sitemap'
import Pricing from './pages/Pricing'

import { SpeedInsights } from "@vercel/speed-insights/react"

function App() {
  return (
    <>
      <SpeedInsights />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="jobs" element={<JobListings />} />
          <Route path="jobs/:id" element={<JobDetail />} />
          <Route path="companies" element={<Companies />} />
          <Route path="help-center" element={<HelpCenter />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="terms" element={<TermsOfService />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="sitemap" element={<Sitemap />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Auth Routes */}
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="/forgot-password" element={<Layout><ForgotPassword /></Layout>} />
        <Route path="/reset-password/:resetToken" element={<Layout><ResetPassword /></Layout>} />
        <Route path="/jobs/:id/apply" element={<JobApplication />} />

        {/* Candidate Dashboard Routes */}
        <Route path="/candidate-dashboard" element={<CandidateLayout />}>
          <Route index element={<CandidateDashboard />} />
          <Route path="applied" element={<AppliedJobs />} />
          <Route path="saved" element={<SavedJobs />} />
          <Route path="resume" element={<ResumeUpload />} />
        </Route>

        {/* Profile Route */}
        <Route path="/profile" element={<Layout><Profile /></Layout>} />

        {/* Employer Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="jobs" element={<MyJobs />} />
          <Route path="jobs/edit/:id" element={<EditJob />} />
          <Route path="post-job" element={<PostJob />} />
          <Route path="applications" element={<Applications />} />
          <Route path="applications/:id" element={<ApplicationDetail />} />
        </Route>

        {/* Admin Dashboard Routes */}
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="applications/:id" element={<ApplicationDetail />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
