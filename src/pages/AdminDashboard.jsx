import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Users, Briefcase, FileText, CheckCircle, Trash2, Eye, Bell, User } from 'lucide-react';
import StatCard from '../components/StatCard';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import NotificationCenter from '../components/NotificationCenter';

const AdminDashboard = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { token } = useAuth();
    const location = useLocation();

    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);

    // Get activeTab from URL or default to 'users'
    const activeTab = searchParams.get('tab') || 'users';

    // Get highlightId from state (transient)
    const [highlightId, setHighlightId] = useState(location.state?.highlightId || null);

    // Clear the highlightId from history so it doesn't persist on reload
    useEffect(() => {
        if (location.state?.highlightId) {
            window.history.replaceState({}, document.title);
        }
    }, []);

    const setActiveTab = (tab) => {
        setSearchParams({ tab });
    };

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Stats
                const statsRes = await fetch('/api/admin/stats', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const statsData = await statsRes.json();
                if (statsData.success) setStats(statsData.data);

                // Fetch Users
                const usersRes = await fetch('/api/admin/users', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const usersData = await usersRes.json();
                if (usersData.success) setUsers(usersData.data);

                // Fetch Jobs
                const jobsRes = await fetch('/api/admin/jobs', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const jobsData = await jobsRes.json();
                if (jobsData.success) setJobs(jobsData.data);

                // Fetch Applications
                const appsRes = await fetch('/api/admin/applications', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const appsData = await appsRes.json();
                if (appsData.success) setApplications(appsData.data);

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (token) fetchData();
    }, [token]);

    const handleDeleteUser = async (userId) => {
        if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;
        try {
            await fetch(`/api/admin/users/${userId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteJob = async (jobId) => {
        if (!confirm('Are you sure you want to delete this job? This action cannot be undone.')) return;
        try {
            await fetch(`/api/jobs/${jobId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            setJobs(jobs.filter(job => job._id !== jobId));
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <div>Loading admin dashboard...</div>;

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <div className="flex items-center gap-3">
                    <NotificationCenter />
                    <Link
                        to="/profile"
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                    >
                        <User size={18} />
                        Profile
                    </Link>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard label="Total Candidates" value={stats?.candidates || 0} icon={Users} color="bg-blue-500" />
                <StatCard label="Total Employers" value={stats?.employers || 0} icon={Briefcase} color="bg-purple-500" />
                <StatCard label="Total Jobs" value={stats?.jobs || 0} icon={FileText} color="bg-green-500" />
                <StatCard label="Total Applications" value={stats?.applications || 0} icon={CheckCircle} color="bg-orange-500" />
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-6 border-b border-gray-200">
                <button
                    className={`pb-2 px-4 font-medium ${activeTab === 'users' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('users')}
                >
                    Users
                </button>
                <button
                    className={`pb-2 px-4 font-medium ${activeTab === 'jobs' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('jobs')}
                >
                    Jobs
                </button>
                <button
                    className={`pb-2 px-4 font-medium ${activeTab === 'applications' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('applications')}
                >
                    Applications
                </button>
            </div>

            {/* Users Table */}
            {activeTab === 'users' && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900">System Users</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Name</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Email</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Role</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Joined</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {users.map((user) => (
                                    <tr key={user._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                                        <td className="px-6 py-4 text-gray-500">{user.email}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.role === 'employer' ? 'bg-purple-100 text-purple-800' :
                                                user.role === 'admin' ? 'bg-red-100 text-red-800' :
                                                    'bg-blue-100 text-blue-800'
                                                }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">{new Date(user.createdAt).toLocaleDateString()}</td>
                                        <td className="px-6 py-4">
                                            {user.role !== 'admin' && (
                                                <button
                                                    onClick={() => handleDeleteUser(user._id)}
                                                    className="text-red-500 hover:text-red-700 p-2"
                                                    title="Delete User"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Jobs Table */}
            {activeTab === 'jobs' && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900">All Jobs</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Title</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Company</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Posted By</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {jobs.map((job) => (
                                    <tr
                                        key={job._id}
                                        className={`hover:bg-gray-50 transition-colors ${highlightId === job._id ? 'bg-blue-50 border-l-4 border-blue-500' : ''}`}
                                        ref={el => {
                                            if (highlightId === job._id && el) {
                                                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                            }
                                        }}
                                    >
                                        <td className="px-6 py-4 font-medium text-gray-900">{job.title}</td>
                                        <td className="px-6 py-4 text-gray-500">{job.company}</td>
                                        <td className="px-6 py-4 text-gray-500">{job.employerId?.name || 'Unknown'}</td>
                                        <td className="px-6 py-4 text-gray-500">{new Date(job.createdAt).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 flex gap-2">
                                            <Link
                                                to={`/jobs/${job._id}`}
                                                className="text-blue-500 hover:text-blue-700 p-2"
                                                title="View Job"
                                            >
                                                <Eye size={18} />
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteJob(job._id)}
                                                className="text-red-500 hover:text-red-700 p-2"
                                                title="Delete Job"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'applications' && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900">All Applications</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Candidate</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Applied For</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Company</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">View</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {applications.map((app) => (
                                    <tr
                                        key={app._id}
                                        className={`hover:bg-gray-50 transition-colors ${highlightId === app._id ? 'bg-blue-50 border-l-4 border-blue-500' : ''}`}
                                        ref={el => {
                                            if (highlightId === app._id && el) {
                                                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                            }
                                        }}
                                    >
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            {app.candidateId?.name || 'Unknown'}
                                            <div className="text-xs text-gray-500">{app.candidateId?.email}</div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">{app.jobId?.title || 'Job Deleted'}</td>
                                        <td className="px-6 py-4 text-gray-500">{app.jobId?.company || 'N/A'}</td>
                                        <td className="px-6 py-4 text-gray-500">{new Date(app.createdAt).toLocaleDateString()}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${app.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                                app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                    app.status === 'interview' ? 'bg-orange-100 text-orange-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {app.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link
                                                to={`/admin/applications/${app._id}`}
                                                className="text-blue-500 hover:text-blue-700 p-2 inline-block"
                                                title="View Details"
                                            >
                                                <Eye size={18} />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
