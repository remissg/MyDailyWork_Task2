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
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="jobs" element={<JobListings />} />
        <Route path="jobs/:id" element={<JobDetail />} />
        <Route path="companies" element={<Companies />} />
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
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Employer Dashboard Routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="jobs" element={<MyJobs />} />
        <Route path="jobs/edit/:id" element={<EditJob />} />
        <Route path="post-job" element={<PostJob />} />
        <Route path="applications" element={<Applications />} />
        <Route path="applications/:id" element={<ApplicationDetail />} />

        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default App
