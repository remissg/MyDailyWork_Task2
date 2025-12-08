import React, { useState, useEffect } from 'react';
import { FileText, Bookmark, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';
import StatusCard from '../components/StatusCard';



const CandidateDashboard = () => {
    const { token, user } = useAuth();
    const [stats, setStats] = useState({ appliedJobs: 0, savedJobs: 0 });
    const [recentApps, setRecentApps] = useState([]);
    const [statusBreakdown, setStatusBreakdown] = useState({
        pending: 0,
        interview: 0,
        accepted: 0,
        rejected: 0
    });
    const [loading, setLoading] = useState(true);

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
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
            setLoading(false);
        };

        if (token) {
            fetchData();
        }
    }, [token]);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
                    <p className="text-gray-500">Here is your daily activities and job applications</p>
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

            {/* Application Status Breakdown */}
            <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Application Status Overview</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatusCard
                        label="Pending Review"
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

            {/* Recent Activity */}
            <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">Recent Applications</h3>
                    <Link to="/candidate-dashboard/applied" className="text-sm text-[#10b981] font-medium hover:underline">View All</Link>
                </div>
                {recentApps.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">
                        <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
                        <p className="text-gray-500 mb-4">Start applying to jobs to see them here.</p>
                        <Link
                            to="/jobs"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#10b981] text-white rounded-md font-medium hover:bg-[#0e9f6e] transition-colors"
                        >
                            Browse Jobs
                        </Link>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {recentApps.map((app) => (
                            <div key={app._id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                                        {app.jobId?.company?.charAt(0) || 'C'}
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900">{app.jobId?.title || 'Unknown Role'}</h4>
                                        <p className="text-sm text-gray-500">{app.jobId?.company || 'Unknown Company'} • {app.jobId?.location}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${app.status === 'interview' ? 'bg-blue-100 text-blue-700' :
                                        app.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                            app.status === 'accepted' ? 'bg-green-100 text-green-700' :
                                                'bg-red-100 text-red-700'
                                        }`}>
                                        {app.status}
                                    </span>
                                    <span className="text-xs text-gray-400">{new Date(app.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CandidateDashboard;
