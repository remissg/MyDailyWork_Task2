import React, { useState, useEffect } from 'react';
import { FileText, Bookmark, CheckCircle, Clock, TrendingUp, Bell, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';
import StatusCard from '../components/StatusCard';
import NotificationCenter from '../components/NotificationCenter';



const CandidateDashboard = () => {
    const { token, user } = useAuth();
    const [stats, setStats] = useState({ appliedJobs: 0, savedJobs: 0 });
    const [recentApps, setRecentApps] = useState([]);
    const [newestJobs, setNewestJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
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
        const fetchData = async () => {
            try {
                // Fetch Stats
                const statsRes = await fetch('/api/dashboard/candidate', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const statsData = await statsRes.json();
                if (statsData.success) {
                    setStats(statsData.data);
                }

                // Fetch Recent Activity (Applied Jobs)
                const appsRes = await fetch('/api/dashboard/candidate/applied', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const appsData = await appsRes.json();
                if (appsData.success) {
                    setRecentApps(appsData.data.slice(0, 5));

                    // Calculate status breakdown
                    const breakdown = appsData.data.reduce((acc, app) => {
                        acc[app.status] = (acc[app.status] || 0) + 1;
                        return acc;
                    }, { pending: 0, interview: 0, accepted: 0, rejected: 0 });
                    setStatusBreakdown(breakdown);
                }

                // Fetch Newest Jobs
                const jobsRes = await fetch('/api/jobs?limit=3&sort=-createdAt', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const jobsData = await jobsRes.json();
                if (jobsData.success) {
                    setNewestJobs(jobsData.data.slice(0, 3));
                }

            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
            setLoading(false);
        };

        if (token) {
            fetchData();
        }
    }, [token, user]);

    const filteredApps = recentApps.filter(app =>
        app.jobId?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.jobId?.company?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{getGreeting()}, {user?.name}!</h1>
                    <p className="text-gray-500 mt-1">Here is your daily activities and job applications</p>
                </div>
                <div className="flex items-center gap-3">
                    <NotificationCenter />
                    <Link
                        to="/profile"
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-sm hover:shadow-md"
                    >
                        <User size={18} />
                        Profile
                    </Link>
                    <span className="text-sm font-medium text-gray-500 bg-white px-3 py-2 rounded-full border border-gray-200">
                        {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard
                    label="Applications Submitted"
                    value={stats.appliedJobs}
                    icon={FileText}
                    color="bg-blue-500"
                />
                <StatCard
                    label="Jobs Saved"
                    value={stats.savedJobs}
                    icon={Bookmark}
                    color="bg-purple-500"
                />
                <StatCard
                    label="Interviews Scheduled"
                    value={statusBreakdown.interview}
                    icon={Clock}
                    color="bg-orange-500"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Applications */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Status Breakdown */}
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

                    {/* Recent Applications with Search */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <h3 className="font-bold text-gray-900 text-lg">Recent Applications</h3>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search applications..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-4 pr-10 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full sm:w-64 transition-all"
                                />
                                <div className="absolute right-3 top-2.5 text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {filteredApps.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">
                                <FileText className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-1">No applications found</h3>
                                <p className="text-gray-400 text-sm mb-4">
                                    {searchTerm ? `No results for "${searchTerm}"` : "You haven't applied to any jobs yet."}
                                </p>
                                {!searchTerm && (
                                    <Link
                                        to="/jobs"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors shadow-sm hover:shadow"
                                    >
                                        Browse Jobs
                                    </Link>
                                )}
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-50">
                                {filteredApps.map((app) => (
                                    <div key={app._id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:shadow-md transition-all">
                                                {app.jobId?.company?.charAt(0) || 'C'}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">{app.jobId?.title || 'Unknown Role'}</h4>
                                                <p className="text-sm text-gray-500">{app.jobId?.company || 'Unknown Company'} • {app.jobId?.location}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-1.5">
                                            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize border ${app.status === 'interview' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                                app.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                                                    app.status === 'accepted' ? 'bg-green-50 text-green-700 border-green-100' :
                                                        'bg-red-50 text-red-700 border-red-100'
                                                }`}>
                                                {app.status}
                                            </span>
                                            <span className="text-xs text-gray-400">{new Date(app.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {filteredApps.length > 0 && (
                            <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 text-center">
                                <Link to="/candidate-dashboard/applied" className="text-sm font-medium text-primary hover:text-primary-dark transition-colors">
                                    View All Applications
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column - Newest Jobs */}
                <div className="space-y-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                                <TrendingUp size={20} className="text-primary" />
                                Newest Jobs
                            </h3>
                            <Link to="/jobs" className="text-sm text-primary font-medium hover:underline">View All</Link>
                        </div>

                        <div className="space-y-4">
                            {newestJobs.length === 0 ? (
                                <p className="text-gray-500 text-sm text-center py-4">No jobs found.</p>
                            ) : (
                                newestJobs.map(job => (
                                    <div key={job._id} className="group p-4 rounded-lg border border-gray-200 hover:border-primary/30 hover:shadow-md transition-all bg-white">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-primary transition-colors">{job.title}</h4>
                                            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">New</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-3">{job.company}</p>
                                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                                            <span className="bg-gray-100 px-2 py-1 rounded">{job.type}</span>
                                            <span className="bg-gray-100 px-2 py-1 rounded">{job.location}</span>
                                        </div>
                                        <Link
                                            to={`/jobs/${job._id}`}
                                            className="block w-full text-center py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5 active:scale-95"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CandidateDashboard;
