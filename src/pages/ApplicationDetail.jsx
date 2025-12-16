import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Briefcase, Calendar, FileText, ArrowLeft, Mail, Phone, MapPin, Award, GraduationCap } from 'lucide-react';

const ApplicationDetail = () => {
    const { id } = useParams();
    const { token, user } = useAuth();
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApplication = async () => {
            try {
                // Fetch single application details directly
                const res = await fetch(`/api/applications/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();

                if (data.success) {
                    setApplication(data.data);
                } else {
                    setError(data.message || 'Failed to fetch application details');
                }
            } catch (err) {
                console.error(err);
                setError('An error occurred');
            } finally {
                setLoading(false);
            }
        };

        if (token && id) fetchApplication();
    }, [token, id]);

    const handleStatusUpdate = async (newStatus) => {
        if (!confirm(`Are you sure you want to mark this application as ${newStatus}?`)) return;

        try {
            const res = await fetch(`/api/applications/${id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });
            const data = await res.json();

            if (data.success) {
                setApplication(prev => ({ ...prev, status: newStatus }));
            } else {
                alert(data.message || 'Failed to update status');
            }
        } catch (err) {
            console.error(err);
            alert('An error occurred');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!application) return <div>Application not found</div>;

    const getStatusColor = (status) => {
        switch (status) {
            case 'accepted': return 'bg-green-100 text-green-800 border-green-200';
            case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
            case 'interview': return 'bg-orange-100 text-orange-800 border-orange-200'; // Matched with AppliedJobs
            default: return 'bg-blue-100 text-blue-800 border-blue-200'; // Default pending color matched
        }
    };

    const getBackLink = () => {
        if (!application?.candidateId) return '/dashboard'; // Safe fallback
        // If current user is admin, go to admin dashboard
        // We verify this by checking the URL or auth context. Using URL for simplicity here as role check might need auth context
        if (window.location.pathname.includes('/admin/')) return '/admin';
        return '/dashboard/applications';
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <Link to="/admin?tab=applications" state={{ highlightId: id }} className="flex items-center text-gray-500 hover:text-gray-900 mb-4 transition-colors">
                    <ArrowLeft size={18} className="mr-2" /> Back to Applications
                </Link>
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{application.candidateId?.name}</h1>
                        <div className="flex items-center gap-4 text-gray-500">
                            <span className="flex items-center gap-1"><Mail size={16} /> {application.candidateId?.email}</span>
                            <span className="flex items-center gap-1"><Calendar size={16} /> Applied {new Date(application.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                    <div className={`px-4 py-2 rounded-full font-medium border capitalize ${getStatusColor(application.status)}`}>
                        {application.status}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Briefcase size={20} className="text-[#10b981]" /> Job Details
                        </h3>
                        <div className="space-y-3">
                            <div>
                                <span className="block text-sm text-gray-500">Role</span>
                                <span className="font-medium text-gray-900">{application.jobId?.title}</span>
                            </div>
                            <div>
                                <span className="block text-sm text-gray-500">Company</span>
                                <span className="font-medium text-gray-900">{application.jobId?.company}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <FileText size={20} className="text-[#10b981]" /> Attachments
                        </h3>
                        {application.resume || application.resumeURL ? (
                            <a
                                href={application.resume || application.resumeURL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-[#10b981] hover:bg-green-50 transition-colors group"
                            >
                                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 group-hover:text-[#10b981]">
                                    <FileText size={20} />
                                </div>
                                <div>
                                    <div className="font-medium text-gray-900 group-hover:text-[#10b981]">Resume.pdf</div>
                                    <div className="text-xs text-gray-500">Click to view</div>
                                </div>
                            </a>
                        ) : (
                            <div className="flex flex-col items-center justify-center p-8 border border-dashed border-gray-200 rounded-lg text-gray-500 bg-gray-50">
                                <FileText size={48} className="text-gray-300 mb-2" />
                                <p>No resume uploaded for this application.</p>
                            </div>
                        )}
                    </div>

                    {/* Candidate Profile - Only show to employers */}
                    {user?.role === 'employer' && application.candidateId && (
                        <>
                            {/* Contact & Bio */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <User size={20} className="text-[#10b981]" /> Candidate Profile
                                </h3>
                                <div className="space-y-3">
                                    {application.candidateId.phone && (
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <Phone size={16} className="text-gray-400" />
                                            <span>{application.candidateId.phone}</span>
                                        </div>
                                    )}
                                    {application.candidateId.location && (
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <MapPin size={16} className="text-gray-400" />
                                            <span>{application.candidateId.location}</span>
                                        </div>
                                    )}
                                    {application.candidateId.bio && (
                                        <div className="mt-3">
                                            <span className="block text-sm font-semibold text-gray-900 mb-1">About</span>
                                            <p className="text-gray-700 text-sm leading-relaxed">{application.candidateId.bio}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Skills */}
                            {application.candidateId.skills && application.candidateId.skills.length > 0 && (
                                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <Award size={20} className="text-[#10b981]" /> Skills
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {application.candidateId.skills.map((skill, index) => (
                                            <span key={index} className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Experience */}
                            {application.candidateId.experience && application.candidateId.experience.length > 0 && (
                                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <Briefcase size={20} className="text-[#10b981]" /> Work Experience
                                    </h3>
                                    <div className="space-y-4">
                                        {application.candidateId.experience.map((exp, index) => (
                                            <div key={index} className="border-l-2 border-green-500 pl-4">
                                                <h4 className="font-semibold text-gray-900">{exp.title}</h4>
                                                <p className="text-sm text-gray-600">{exp.company} • {exp.location}</p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {exp.current ? 'Present' : exp.endDate && new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                                </p>
                                                {exp.description && <p className="text-sm text-gray-700 mt-2">{exp.description}</p>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Education */}
                            {application.candidateId.education && application.candidateId.education.length > 0 && (
                                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <GraduationCap size={20} className="text-[#10b981]" /> Education
                                    </h3>
                                    <div className="space-y-4">
                                        {application.candidateId.education.map((edu, index) => (
                                            <div key={index} className="border-l-2 border-green-500 pl-4">
                                                <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                                                <p className="text-sm text-gray-600">{edu.school}</p>
                                                {edu.field && <p className="text-sm text-gray-600">Field: {edu.field}</p>}
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {edu.startDate && new Date(edu.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {edu.current ? 'Present' : edu.endDate && new Date(edu.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Show actions only for employer */}
                    {(user?.role === 'employer') && (
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Actions</h3>
                            <div className="space-y-3">
                                <button
                                    onClick={() => handleStatusUpdate('interview')}
                                    className="w-full py-2 bg-[#10b981] text-white rounded-md font-medium hover:bg-[#0e9f6e] transition-colors"
                                >
                                    Schedule Interview
                                </button>
                                <button
                                    onClick={() => handleStatusUpdate('accepted')}
                                    className="w-full py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
                                >
                                    Accept Application
                                </button>
                                <button
                                    onClick={() => handleStatusUpdate('rejected')}
                                    className="w-full py-2 border border-red-200 text-red-600 bg-red-50 rounded-md font-medium hover:bg-red-100 transition-colors"
                                >
                                    Reject Application
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ApplicationDetail;
