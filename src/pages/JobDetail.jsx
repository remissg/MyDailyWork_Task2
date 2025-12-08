import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import { MapPin, Clock, Briefcase, DollarSign, Globe, ArrowLeft } from 'lucide-react';

const JobDetail = () => {
    const { id } = useParams();
    const { token, user } = useAuth();
    const navigate = useNavigate();
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(false);
    const [jobLoading, setJobLoading] = useState(true);
    const [job, setJob] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchJob = async () => {
            setJobLoading(true);
            setError('');
            try {
                const res = await fetch(`/api/jobs/${id}`);
                const data = await res.json();
                if (data.success) {
                    setJob(data.data);
                } else {
                    setError(data.message || 'Unable to load job');
                }
            } catch (err) {
                console.error(err);
                setError('Unable to load job. Please try again.');
            } finally {
                setJobLoading(false);
            }
        };

        fetchJob();
    }, [id]);

    const requirementItems = useMemo(() => {
        if (!job?.requirements) return [];
        if (Array.isArray(job.requirements)) return job.requirements;
        return job.requirements
            .split(',')
            .map((item) => item.trim())
            .filter(Boolean);
    }, [job]);

    const handleSaveJob = async () => {
        if (!token) {
            navigate('/login');
            return;
        }

        if (user?.role !== 'candidate') {
            alert('Only candidates can save jobs');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`/api/save/${id}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (data.success) {
                setSaved(true);
                alert('Job saved successfully!');
            } else {
                alert(data.message || 'Failed to save job');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleApply = () => {
        if (!token) {
            navigate('/login');
            return;
        }
        if (user?.role === 'employer' || user?.role === 'admin') {
            alert('Only candidates can apply to jobs.');
            return;
        }
        navigate(`/jobs/${id}/apply`);
    };

    if (jobLoading) {
        return <div className="container py-10">Loading job...</div>;
    }

    if (error || !job) {
        return (
            <div className="container py-10 max-w-3xl">
                <Link to="/jobs" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 text-sm font-semibold transition-colors">
                    <ArrowLeft size={18} /> Back to Jobs
                </Link>
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Job not available</h1>
                    <p className="text-gray-600">{error || 'This job could not be found.'}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-10 max-w-5xl">
            <Link to="/jobs" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 text-sm font-semibold transition-colors">
                <ArrowLeft size={18} /> Back to Jobs
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Header */}
                    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm relative overflow-hidden">
                        <div className="flex items-start justify-between gap-4 mb-6">
                            <div className="flex gap-5">
                                <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center text-3xl font-bold text-primary border border-gray-100">
                                    {job.company?.[0] || job.employerId?.companyName?.[0] || 'C'}
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-1 leading-tight">{job.title}</h1>
                                    <div className="text-lg text-gray-600 font-medium">
                                        {job.company || job.employerId?.companyName || 'Confidential Company'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-y-3 gap-x-6 text-sm text-gray-600 font-medium mb-8">
                            <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                                <MapPin size={18} className="text-gray-400" /> {job.location || 'Remote'}
                            </div>
                            <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                                <Briefcase size={18} className="text-gray-400" /> {job.jobType}
                            </div>
                            <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                                <DollarSign size={18} className="text-gray-400" /> {job.salaryRange}
                            </div>
                            <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                                <Clock size={18} className="text-gray-400" /> Posted {new Date(job.createdAt).toLocaleDateString()}
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button
                                onClick={handleApply}
                                className="flex-1 text-lg py-3 shadow-lg shadow-primary/20"
                            >
                                Apply Now
                            </Button>
                            <Button
                                variant="outline"
                                className="px-6 border-2 font-semibold hover:border-gray-300"
                                onClick={handleSaveJob}
                                disabled={loading}
                            >
                                {saved ? 'Saved' : 'Save Job'}
                            </Button>
                        </div>
                    </div>

                    {/* Job Overview */}
                    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Job Overview</h3>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {job.description || 'Job description will be provided by the employer.'}
                        </p>
                    </div>

                    {/* Responsibilities */}
                    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Key Responsibilities</h3>
                        {requirementItems.length > 0 ? (
                            <ul className="space-y-4">
                                {requirementItems.map((item, i) => (
                                    <li key={i} className="flex gap-3 text-gray-600">
                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                        <span className="leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">The employer has not listed specific responsibilities.</p>
                        )}
                    </div>

                    {/* Requirements */}
                    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Additional Details</h3>
                        <ul className="space-y-4 text-gray-600">
                            <li className="flex gap-3">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                <span className="leading-relaxed">Experience: {job.experience || 'Not specified'}</span>
                            </li>
                            <li className="flex gap-3">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                <span className="leading-relaxed">Category: {job.category || 'Not specified'}</span>
                            </li>
                            <li className="flex gap-3">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                <span className="leading-relaxed">Status: {job.isActive ? 'Open' : 'Closed'}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Company Card */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-24">
                        <h4 className="font-bold text-gray-900 mb-6 text-lg">About the Company</h4>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center text-2xl font-bold text-primary border border-gray-100">
                                {job.company?.[0] || job.employerId?.companyName?.[0] || 'C'}
                            </div>
                            <div>
                                <div className="font-bold text-gray-900">{job.company || job.employerId?.companyName || 'Company'}</div>
                                <span className="text-primary text-sm font-medium">
                                    {job.employerId?.email || 'Email not provided'}
                                </span>
                            </div>
                        </div>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            {job.description?.slice(0, 200) || 'The employer has not added a company bio yet.'}
                        </p>

                        <div className="space-y-4 pt-6 border-t border-gray-100">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Industry</span>
                                <span className="font-medium text-gray-900">{job.category || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Company Size</span>
                                <span className="font-medium text-gray-900">Not specified</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Founded</span>
                                <span className="font-medium text-gray-900">—</span>
                            </div>
                        </div>

                        <Button variant="outline" className="w-full mt-6 flex items-center justify-center gap-2">
                            <Globe size={18} /> Visit Website
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetail;
