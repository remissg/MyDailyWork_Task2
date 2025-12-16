import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, Calendar, Building, Search, Filter, Eye } from 'lucide-react';

const AppliedJobs = () => {
    const { token } = useAuth();
    const [applications, setApplications] = useState([]);
    const [filteredApplications, setFilteredApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const res = await fetch('/api/dashboard/candidate/applied', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                if (data.success) {
                    setApplications(data.data);
                    setFilteredApplications(data.data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (token) fetchApplications();
    }, [token]);

    useEffect(() => {
        let filtered = applications;

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(app =>
                app.jobId?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.jobId?.employerId?.companyName?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by status
        if (statusFilter !== 'all') {
            filtered = filtered.filter(app => app.status === statusFilter);
        }

        setFilteredApplications(filtered);
    }, [searchTerm, statusFilter, applications]);

    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        interview: 'bg-blue-100 text-blue-700 border-blue-200',
        accepted: 'bg-green-100 text-green-700 border-green-200',
        rejected: 'bg-red-100 text-red-700 border-red-200'
    };

    const getStatusCount = (status) => {
        return applications.filter(app => app.status === status).length;
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Applied Jobs</h1>
                <p className="text-gray-500 mt-1">Track and manage all your job applications</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-500 mb-1">Total</p>
                    <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                    <p className="text-sm text-yellow-700 mb-1">Pending</p>
                    <p className="text-2xl font-bold text-yellow-700">{getStatusCount('pending')}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <p className="text-sm text-blue-700 mb-1">Interview</p>
                    <p className="text-2xl font-bold text-blue-700">{getStatusCount('interview')}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <p className="text-sm text-green-700 mb-1">Accepted</p>
                    <p className="text-2xl font-bold text-green-700">{getStatusCount('accepted')}</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by job title or company..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="relative">
                        <Filter size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none bg-white cursor-pointer"
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="interview">Interview</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Applications List */}
            {filteredApplications.length === 0 ? (
                <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100 text-center">
                    <Briefcase className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {searchTerm || statusFilter !== 'all' ? 'No matching applications' : 'No applications yet'}
                    </h3>
                    <p className="text-gray-500 mb-6">
                        {searchTerm || statusFilter !== 'all'
                            ? 'Try adjusting your filters'
                            : 'Start exploring jobs and apply to find your next opportunity.'}
                    </p>
                    {!searchTerm && statusFilter === 'all' && (
                        <Link
                            to="/jobs"
                            className="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-sm hover:shadow-md"
                        >
                            Browse Jobs
                        </Link>
                    )}
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredApplications.map((app) => (
                        <div key={app._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all group">
                            <div className="flex flex-col md:flex-row justify-between gap-4">
                                {/* Job Info */}
                                <div className="flex items-start gap-4 flex-1">
                                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-sm flex-shrink-0">
                                        {app.jobId?.employerId?.companyName?.charAt(0) || 'C'}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-green-600 transition-colors">
                                            {app.jobId?.title}
                                        </h3>
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <Building size={14} className="flex-shrink-0" />
                                                <span className="truncate">{app.jobId?.employerId?.companyName}</span>
                                            </div>
                                            {app.jobId?.location && (
                                                <div className="flex items-center gap-1">
                                                    <MapPin size={14} className="flex-shrink-0" />
                                                    <span>{app.jobId?.location}</span>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-1">
                                                <Calendar size={14} className="flex-shrink-0" />
                                                <span>Applied {new Date(app.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Status & Actions */}
                                <div className="flex md:flex-col items-start md:items-end gap-3">
                                    <span className={`px-3 py-1.5 rounded-full text-sm font-semibold border ${statusColors[app.status] || statusColors.pending}`}>
                                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                                    </span>
                                    <Link
                                        to={`/admin/applications/${app._id}`}
                                        className="flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
                                    >
                                        <Eye size={16} />
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AppliedJobs;
