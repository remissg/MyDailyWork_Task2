import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Briefcase, MapPin, DollarSign, Bookmark, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const SavedJobs = () => {
    const { token } = useAuth();
    const [savedJobs, setSavedJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSavedJobs = async () => {
            try {
                const res = await fetch('/api/dashboard/candidate/saved', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                if (data.success) {
                    setSavedJobs(data.data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (token) fetchSavedJobs();
    }, [token]);

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

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Saved Jobs</h1>
            {savedJobs.length === 0 ? (
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
                    <Bookmark className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No saved jobs</h3>
                    <p className="text-gray-500">Jobs you bookmark will appear here for easy access.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {savedJobs.map((item) => (
                        <div key={item._id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600 font-bold">
                                        {item.jobId?.employerId?.companyName?.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{item.jobId?.title}</h3>
                                        <p className="text-sm text-gray-500">{item.jobId?.employerId?.companyName}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <MapPin size={16} />
                                    {item.jobId?.location}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <DollarSign size={16} />
                                    {item.jobId?.salaryRange}
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Link to={`/jobs/${item.jobId?._id}`} className="flex-1 bg-gray-50 text-gray-900 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors text-center text-sm">
                                    View Details
                                </Link>
                                <button
                                    onClick={() => handleRemove(item.jobId?._id)}
                                    className="flex-1 bg-red-50 text-red-600 py-2 rounded-md font-medium hover:bg-red-100 transition-colors text-sm"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SavedJobs;
