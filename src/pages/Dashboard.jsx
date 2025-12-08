import React, { useState, useEffect } from 'react';
import { Briefcase, Users, FileText, TrendingUp, Plus, Eye, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';
import StatusCard from '../components/StatusCard';



const Dashboard = () => {
    const { token } = useAuth();
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

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Fetch Stats
                const statsRes = await fetch('/api/dashboard/employer', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const statsData = await statsRes.json();
                if (statsData.success) {
                    setStats(statsData.data);
                }

                // Fetch Recent Applications
                const appsRes = await fetch('/api/dashboard/employer/applications', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const appsData = await appsRes.json();
                if (appsData.success) {
                    setApplications(appsData.data.slice(0, 5));

                    // Calculate status breakdown
                    const breakdown = appsData.data.reduce((acc, app) => {
                        acc[app.status] = (acc[app.status] || 0) + 1;
                        return acc;
                    }, { pending: 0, interview: 0, accepted: 0, rejected: 0 });
                    setStatusBreakdown(breakdown);
                }

                // Fetch Recent Jobs
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

    if (loading) return <div>Loading dashboard...</div>;

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                <Link
                    to="/dashboard/post-job"
                    className="flex items-center gap-2 px-4 py-2 bg-[#10b981] text-white rounded-md font-medium hover:bg-[#0e9f6e] transition-colors"
                >
                    <Plus size={20} />
                    Post New Job
                </Link>
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
                    color="bg-[#10b981]"
                />
            </div>

            {/* Application Status Breakdown */}
            <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Application Status</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatusCard
                        label="Pending Review"
                        value={statusBreakdown.pending}
                        color="text-yellow-600"
                        bgColor="bg-yellow-500"
                    />
                    <StatusCard
                        label="Interview Scheduled"
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Applications */}
                <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="font-bold text-gray-900">Recent Applications</h3>
                        <Link
                            to="/dashboard/applications"
                            className="text-sm text-[#10b981] font-medium hover:underline"
                        >
                            View All
                        </Link>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {applications.map((app) => (
                            <Link
                                key={app._id}
                                to={`/dashboard/applications/${app._id}`}
                                className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors block"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                                        {app.candidateId?.name?.charAt(0) || 'U'}
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900">{app.candidateId?.name || 'Unknown Candidate'}</h4>
                                        <p className="text-sm text-gray-500">{app.jobId?.title}</p>
                                    </div>
                                </div>
                                <span className="text-sm text-gray-500">{new Date(app.createdAt).toLocaleDateString()}</span>
                            </Link>
                        ))}
                        {applications.length === 0 && <p className="px-6 py-4 text-gray-500">No recent applications.</p>}
                    </div>
                </div>

                {/* Recent Jobs Posted */}
                <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="font-bold text-gray-900">Recent Jobs Posted</h3>
                        <Link
                            to="/dashboard/my-jobs"
                            className="text-sm text-[#10b981] font-medium hover:underline"
                        >
                            View All
                        </Link>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {recentJobs.map((job) => (
                            <Link
                                key={job._id}
                                to={`/dashboard/edit-job/${job._id}`}
                                className="px-6 py-4 hover:bg-gray-50 transition-colors block"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-medium text-gray-900">{job.title}</h4>
                                    <span className={`text-xs px-2 py-1 rounded-full ${job.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                        {job.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <span>{job.location}</span>
                                    <span>•</span>
                                    <span>{job.jobType}</span>
                                </div>
                            </Link>
                        ))}
                        {recentJobs.length === 0 && <p className="px-6 py-4 text-gray-500">No jobs posted yet.</p>}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                    to="/dashboard/post-job"
                    className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:border-[#10b981] hover:shadow-sm transition-all group"
                >
                    <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
                        <Plus size={20} className="text-[#10b981]" />
                    </div>
                    <div>
                        <h4 className="font-medium text-gray-900">Post New Job</h4>
                        <p className="text-sm text-gray-500">Create a new job listing</p>
                    </div>
                </Link>
                <Link
                    to="/dashboard/applications"
                    className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:border-[#10b981] hover:shadow-sm transition-all group"
                >
                    <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                        <Eye size={20} className="text-blue-600" />
                    </div>
                    <div>
                        <h4 className="font-medium text-gray-900">View Applications</h4>
                        <p className="text-sm text-gray-500">Review all applications</p>
                    </div>
                </Link>
                <Link
                    to="/dashboard/my-jobs"
                    className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:border-[#10b981] hover:shadow-sm transition-all group"
                >
                    <div className="p-2 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
                        <Settings size={20} className="text-purple-600" />
                    </div>
                    <div>
                        <h4 className="font-medium text-gray-900">Manage Jobs</h4>
                        <p className="text-sm text-gray-500">Edit or delete jobs</p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
