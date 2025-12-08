import React, { useState, useEffect } from 'react';
import { FileText, User, Mail, Calendar, Eye } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

const Applications = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchParams] = useSearchParams();
    const jobId = searchParams.get('job'); // Filter by Specific Job

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                // If jobId exists, fetch specific job applications, else fetch all
                const endpoint = jobId
                    ? `/api/applications/job/${jobId}`
                    : '/api/dashboard/employer/applications';

                const res = await fetch(endpoint, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = await res.json();

                if (data.success) {
                    setApplications(data.data);
                } else {
                    setError('Failed to fetch applications');
                }
            } catch (err) {
                console.error(err);
                setError('An error occurred while fetching applications');
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchApplications();
        }
    }, [token, jobId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                    {jobId ? 'Applications for Job' : 'All Applications'}
                </h1>
                {jobId && (
                    <Link to="/dashboard/applications" className="text-sm text-blue-600 hover:underline">
                        View All Applications
                    </Link>
                )}
            </div>

            {applications.length === 0 ? (
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
                    <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
                    <p className="text-gray-500">When candidates apply to your jobs, they will appear here.</p>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Candidate</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Job Applied For</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Applied Date</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Resume</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {applications.map((app) => (
                                    <tr
                                        key={app._id}
                                        className="hover:bg-gray-50 cursor-pointer transition-colors"
                                        onClick={() => navigate(`/dashboard/applications/${app._id}`)}
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                                    {app.candidateId?.name?.charAt(0) || 'U'}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900">{app.candidateId?.name || 'Unknown'}</div>
                                                    <div className="text-sm text-gray-500">{app.candidateId?.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">{app.jobId?.title || 'Unknown Job'}</div>
                                            <div className="text-sm text-gray-500">{app.jobId?.company}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(app.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            {app.resume || app.resumeURL ? (
                                                <a
                                                    href={app.resume || app.resumeURL}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-[#10b981] hover:underline text-sm font-medium z-10 relative"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    View Resume
                                                </a>
                                            ) : (
                                                <span className="text-gray-400 text-sm">No Resume</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                className="text-gray-400 hover:text-[#10b981] transition-colors"
                                                title="View Details"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(`/dashboard/applications/${app._id}`);
                                                }}
                                            >
                                                <Eye size={20} />
                                            </button>
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

export default Applications;
