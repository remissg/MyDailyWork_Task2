import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { Upload, ArrowLeft, CheckCircle, FileText, User, Mail, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const JobApplication = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token, user } = useAuth();
    const [submitted, setSubmitted] = useState(false);
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(false);
    const [jobLoading, setJobLoading] = useState(true);
    const [error, setError] = useState('');
    const [coverLetter, setCoverLetter] = useState('');
    const [resumeFile, setResumeFile] = useState(null);

    useEffect(() => {
        const fetchJob = async () => {
            setJobLoading(true);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!token) {
            navigate('/login', { state: { from: `/jobs/${id}/apply` } });
            return;
        }

        if (user?.role !== 'candidate') {
            setError('Only candidates can apply for jobs.');
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('coverLetter', coverLetter);
            if (resumeFile) {
                formData.append('resume', resumeFile);
            }

            const res = await fetch(`/api/applications/${id}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });

            const data = await res.json();

            if (data.success) {
                setSubmitted(true);
            } else {
                setError(data.message || 'Failed to submit application');
            }
        } catch (err) {
            console.error(err);
            setError('Something went wrong while submitting your application.');
        } finally {
            setLoading(false);
        }
    };

    if (jobLoading) {
        return <div className="container py-10">Loading job...</div>;
    }

    if (!job) {
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

    if (submitted) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
                <div className="max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-green-50 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={40} />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Sent!</h2>
                    <p className="text-gray-600 mb-8 text-lg">
                        Your application has been successfully submitted to <strong>{job?.company || job?.employerId?.companyName || 'the employer'}</strong>.
                    </p>
                    <Link to="/jobs">
                        <Button className="w-full py-3 text-lg">Browse More Jobs</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <Link to={`/jobs/${id}`} className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 text-sm font-semibold transition-colors">
                    <ArrowLeft size={18} /> Back to Job Details
                </Link>

                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Apply for {job?.title}</h1>
                    <p className="text-lg text-gray-600">
                        {job?.company || job?.employerId?.companyName} • {job?.location}
                    </p>
                </div>

                {error && (
                    <div className="mb-4 p-3 rounded-md bg-red-50 text-red-700 border border-red-100 text-sm">
                        {error}
                    </div>
                )}

                <form className="space-y-8" onSubmit={handleSubmit}>
                    {/* Personal Info */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <User size={20} className="text-primary" /> Personal Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField label="Full Name" value={user?.name || ''} placeholder="e.g. Jane Doe" disabled />
                            <InputField label="Email Address" type="email" value={user?.email || ''} icon={Mail} disabled />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField label="Phone Number" placeholder="+1 (555) 000-0000" icon={Phone} />
                            <InputField label="Portfolio URL" placeholder="https://janedoe.com" />
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Resume Upload */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <FileText size={20} className="text-primary" /> Resume / CV
                        </h3>
                        <label className="border-2 border-dashed border-gray-200 rounded-xl p-10 text-center hover:border-primary/50 hover:bg-green-50/30 transition-all cursor-pointer group block">
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                className="hidden"
                                onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                            />
                            <div className="w-12 h-12 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white group-hover:text-primary transition-colors">
                                <Upload size={24} />
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-1">
                                {resumeFile ? resumeFile.name : 'Upload your resume'}
                            </h4>
                            <p className="text-sm text-gray-500 mb-4">PDF, DOC, DOCX up to 10MB</p>
                            <Button type="button" variant="outline" size="sm">
                                {resumeFile ? 'Change File' : 'Select File'}
                            </Button>
                        </label>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Cover Letter */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-gray-900">Cover Letter</h3>
                        <div className="relative">
                            <textarea
                                rows={6}
                                value={coverLetter}
                                onChange={(e) => setCoverLetter(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none text-gray-900 placeholder-gray-400"
                                placeholder="Tell us why you're a great fit for this role..."
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 text-lg font-bold shadow-xl shadow-primary/20 hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all disabled:opacity-60"
                        >
                            {loading ? 'Submitting...' : 'Submit Application'}
                        </Button>
                        <p className="text-center text-xs text-gray-500 mt-4">
                            By clicking submit, you agree to our Terms and Privacy Policy.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JobApplication;
