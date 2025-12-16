import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Briefcase, MapPin, DollarSign, Bookmark, Search, Trash2, Eye, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const SavedJobs = () => {
    const { token } = useAuth();
    const [savedJobs, setSavedJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchSavedJobs = async () => {
            try {
                const res = await fetch('/api/dashboard/candidate/saved', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                if (data.success) {
                    setSavedJobs(data.data);
                    setFilteredJobs(data.data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (token) fetchSavedJobs();
    }, [token]);

    useEffect(() => {
        if (searchTerm) {
            const filtered = savedJobs.filter(item =>
                item.jobId?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.jobId?.employerId?.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.jobId?.location?.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredJobs(filtered);
        } else {
            setFilteredJobs(savedJobs);
        }
    }, [searchTerm, savedJobs]);

    const handleRemove = async (jobId) => {
        if (!confirm('Remove this job from saved list?')) return;

        try {
            const res = await fetch(`/api/save/${jobId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                setSavedJobs(savedJobs.filter(job => job.jobId?._id !== jobId));
            }
        } catch (error) {
            console.error(error);
        }
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
                <h1 className="text-3xl font-bold text-gray-900">Saved Jobs</h1>
                <p className="text-gray-500 mt-1">Jobs you've bookmarked for later review</p>
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-purple-100 text-sm mb-1">Total Saved Jobs</p>
                        <p className="text-4xl font-bold">{savedJobs.length}</p>
                    </div>
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Bookmark size={32} />
                    </div>
                </div>
            </div>

            {/* Search */}
            {savedJobs.length > 0 && (
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <div className="relative">
                        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search saved jobs by title, company, or location..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>
                </div>
            )}

            {/* Jobs Grid */}
            {filteredJobs.length === 0 ? (
                <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100 text-center">
                    <Bookmark className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {searchTerm ? 'No matching jobs found' : 'No saved jobs yet'}
                    </h3>
                    <p className="text-gray-500 mb-6">
                        {searchTerm
                            ? 'Try adjusting your search terms'
                            : 'Jobs you bookmark will appear here for easy access.'}
                    </p>
                    {!searchTerm && (
                        <Link
                            to="/jobs"
                            className="inline-block px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-sm hover:shadow-md"
                        >
                            Browse Jobs
                        </Link>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredJobs.map((item) => (
                        <div key={item._id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all group overflow-hidden">
                            {/* Header with gradient */}
                            <div className="bg-gradient-to-r from-purple-100 to-indigo-100 p-4 border-b border-gray-100">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0">
                                        {item.jobId?.employerId?.companyName?.charAt(0) || 'C'}
                                    </div>
                                    <button
                                        onClick={() => handleRemove(item.jobId?._id)}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Remove from saved"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                                <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-2 group-hover:text-purple-600 transition-colors">
                                    {item.jobId?.title}
                                </h3>
                                <p className="text-sm text-gray-600 font-medium">{item.jobId?.employerId?.companyName}</p>
                            </div>

                            {/* Body */}
                            <div className="p-4 space-y-3">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <MapPin size={16} className="text-gray-400 flex-shrink-0" />
                                    <span className="truncate">{item.jobId?.location || 'Location not specified'}</span>
                                </div>

                                {item.jobId?.salaryRange && (
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <DollarSign size={16} className="text-gray-400 flex-shrink-0" />
                                        <span className="font-medium text-green-600">{item.jobId?.salaryRange}</span>
                                    </div>
                                )}

                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Clock size={16} className="text-gray-400 flex-shrink-0" />
                                    <span>Saved {new Date(item.createdAt).toLocaleDateString()}</span>
                                </div>

                                {item.jobId?.type && (
                                    <div className="pt-2">
                                        <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                                            {item.jobId.type}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="p-4 bg-gray-50 border-t border-gray-100">
                                <Link
                                    to={`/jobs/${item.jobId?._id}`}
                                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5"
                                >
                                    <Eye size={18} />
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SavedJobs;
