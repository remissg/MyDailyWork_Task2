import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, DollarSign, Calendar, Edit, Trash2, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const MyJobs = () => {
    const { token } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await fetch('/api/dashboard/employer/jobs', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = await res.json();

                if (data.success) {
                    setJobs(data.data);
                } else {
                    setError('Failed to fetch jobs');
                }
            } catch (err) {
                console.error(err);
                setError('An error occurred while fetching jobs');
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchJobs();
        }
    }, [token]);

    const handleDelete = async (jobId) => {
        if (!window.confirm('Are you sure you want to delete this job?')) return;

        try {
            const res = await fetch(`/api/jobs/${jobId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await res.json();

            if (data.success) {
                setJobs(jobs.filter(job => job._id !== jobId));
            } else {
                alert(data.message || 'Failed to delete job');
            }
        } catch (err) {
            console.error(err);
            alert('An error occurred');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">My Jobs</h1>
                <Link to="/dashboard/post-job" className="bg-[#10b981] text-white px-4 py-2 rounded-md hover:bg-[#059669] transition-colors">
                    Post New Job
                </Link>
            </div>

            {jobs.length === 0 ? (
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
                    <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs posted yet</h3>
                    <p className="text-gray-500 mb-6">Get started by creating your first job posting.</p>
                    <Link to="/dashboard/post-job" className="text-[#10b981] font-medium hover:underline">
                        Post a Job
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {jobs.map((job) => (
                        <div key={job._id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 transition-all hover:shadow-md">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-1">
                                            <Briefcase size={16} />
                                            <span>{job.jobType}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MapPin size={16} />
                                            <span>{job.location}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <DollarSign size={16} />
                                            <span>{job.salaryRange}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar size={16} />
                                            <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex gap-2">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${job.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                            {job.isActive ? 'Active' : 'Closed'}
                                        </span>
                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            {job.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Link
                                        to={`/dashboard/applications?job=${job._id}`}
                                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                                        title="View Applicants"
                                    >
                                        <Users size={20} />
                                    </Link>
                                    <Link
                                        to={`/dashboard/jobs/edit/${job._id}`}
                                        className="p-2 text-gray-500 hover:text-[#10b981] hover:bg-green-50 rounded-full transition-colors"
                                        title="Edit"
                                    >
                                        <Edit size={20} />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(job._id)}
                                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyJobs;
