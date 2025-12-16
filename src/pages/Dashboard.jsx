import React, { useState, useEffect } from 'react';
import { Briefcase, Users, FileText, TrendingUp, Plus, Eye, Settings, Calendar, ArrowRight, Bell, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';
import StatusCard from '../components/StatusCard';
import NotificationCenter from '../components/NotificationCenter';

const Dashboard = () => {
    const { token, user } = useAuth();
    const [stats, setStats] = useState({
        totalJobs: 0,
        activeJobs: 0,
        totalApplications: 0
    });
    const [applications, setApplications] = useState([]);
    const [recentJobs, setRecentJobs] = useState([]);
    const [statusBreakdown, setStatusBreakdown] = useState({
        pending: 0,
        interview: 0,
        accepted: 0,
        rejected: 0
    });
    const [loading, setLoading] = useState(true);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const statsRes = await fetch('/api/dashboard/employer', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const statsData = await statsRes.json();
                if (statsData.success) {
                    setStats(statsData.data);
                }

                const appsRes = await fetch('/api/dashboard/employer/applications', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const appsData = await appsRes.json();
                if (appsData.success) {
                    setApplications(appsData.data.slice(0, 5));

                    const breakdown = appsData.data.reduce((acc, app) => {
                        acc[app.status] = (acc[app.status] || 0) + 1;
                        return acc;
                    }, { pending: 0, interview: 0, accepted: 0, rejected: 0 });
                    setStatusBreakdown(breakdown);
                }

                const jobsRes = await fetch('/api/dashboard/employer/jobs', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const jobsData = await jobsRes.json();
                if (jobsData.success) {
                    setRecentJobs(jobsData.data.slice(0, 3));
                }
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
            setLoading(false);
        };

        if (token) {
            fetchDashboardData();
        }
    }, [token]);

    if (loading) return (
        <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{getGreeting()}, {user?.companyName || user?.name}!</h1>
                    <p className="text-gray-500 mt-1">Here's what's happening with your job postings today</p>
                </div>
                <div className="flex items-center gap-3">
                    <NotificationCenter />
                    <Link
                        to="/profile"
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                    >
                        <User size={18} />
                        Profile
                    </Link>
                    <Link
                        to="/dashboard/post-job"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        <Plus size={20} />
                        Post New Job
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard
                    label="Total Jobs Posted"
                    value={stats.totalJobs}
                    icon={Briefcase}
                    color="bg-blue-500"
                />
                <StatCard
                    label="Total Applicants"
                    value={stats.totalApplications}
                    icon={Users}
                    color="bg-purple-500"
                />
                <StatCard
                    label="Active Jobs"
                    value={stats.activeJobs}
                    icon={TrendingUp}
                    color="bg-green-600"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Applications */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Application Status */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Application Status</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <StatusCard
                                label="Pending"
                                value={statusBreakdown.pending}
                                color="text-yellow-600"
                                bgColor="bg-yellow-500"
                            />
                            <StatusCard
                                label="Interview"
                                value={statusBreakdown.interview}
                                color="text-blue-600"
                                bgColor="bg-blue-500"
                            />
                            <StatusCard
                                label="Accepted"
                                value={statusBreakdown.accepted}
                                color="text-green-600"
                                bgColor="bg-green-500"
                            />
                            <StatusCard
                                label="Rejected"
                                value={statusBreakdown.rejected}
                                color="text-red-600"
                                bgColor="bg-red-500"
                            />
                        </div>
                    </div>

                    {/* Recent Applications */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="font-bold text-gray-900 text-lg">Recent Applications</h3>
                            <Link to="/dashboard/applications" className="text-sm font-medium text-green-600 hover:text-green-700 transition-colors flex items-center gap-1">
                                View All <ArrowRight size={14} />
                            </Link>
                        </div>
                        <div className="divide-y divide-gray-50">
                            {applications.length === 0 ? (
                                <div className="p-8 text-center text-gray-500">
                                    <FileText className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-1">No applications yet</h3>
                                    <p className="text-gray-400 text-sm">Applications will appear here when candidates apply to your jobs.</p>
                                </div>
                            ) : (
                                applications.map((app) => (
                                    <Link
                                        key={app._id}
                                        to={`/dashboard/applications/${app._id}`}
                                        className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:shadow-md transition-all">
                                                {app.candidateId?.name?.charAt(0) || 'U'}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">{app.candidateId?.name || 'Unknown Candidate'}</h4>
                                                <p className="text-sm text-gray-500">{app.jobId?.title}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs text-gray-400">{new Date(app.createdAt).toLocaleDateString()}</span>
                                            <ArrowRight size={16} className="text-gray-400 group-hover:text-green-600 transition-colors" />
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column - Jobs & Actions */}
                <div className="space-y-8">
                    {/* Recent Jobs */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                                <Briefcase size={20} className="text-green-600" />
                                Recent Jobs
                            </h3>
                            <Link to="/dashboard/jobs" className="text-sm font-medium text-green-600 hover:text-green-700 transition-colors">View All</Link>
                        </div>
                        <div className="p-4 space-y-3">
                            {recentJobs.length === 0 ? (
                                <div className="text-center py-6 text-gray-500">
                                    <p className="text-sm">No jobs posted yet</p>
                                </div>
                            ) : (
                                recentJobs.map((job) => (
                                    <Link
                                        key={job._id}
                                        to={`/dashboard/jobs/edit/${job._id}`}
                                        className="block p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-md transition-all group bg-white"
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <h4 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-green-600 transition-colors">{job.title}</h4>
                                            <span className={`text-xs px-2 py-0.5 rounded-full border ${job.isActive ? 'bg-green-50 text-green-700 border-green-100' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                                                {job.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                            <span className="bg-gray-100 px-2 py-1 rounded">{job.location}</span>
                                            <span className="bg-gray-100 px-2 py-1 rounded">{job.type}</span>
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white">
                        <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <Link
                                to="/dashboard/post-job"
                                className="flex items-center gap-3 p-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all group"
                            >
                                <div className="w-10 h-10 bg-white/30 rounded-lg flex items-center justify-center">
                                    <Plus size={20} />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold">Post Job</p>
                                    <p className="text-xs text-green-50">Create new listing</p>
                                </div>
                            </Link>
                            <Link
                                to="/dashboard/applications"
                                className="flex items-center gap-3 p-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all group"
                            >
                                <div className="w-10 h-10 bg-white/30 rounded-lg flex items-center justify-center">
                                    <Eye size={20} />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold">Applications</p>
                                    <p className="text-xs text-green-50">Review candidates</p>
                                </div>
                            </Link>
                            <Link
                                to="/dashboard/jobs"
                                className="flex items-center gap-3 p-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all group"
                            >
                                <div className="w-10 h-10 bg-white/30 rounded-lg flex items-center justify-center">
                                    <Settings size={20} />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold">Manage Jobs</p>
                                    <p className="text-xs text-green-50">Edit or delete</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
