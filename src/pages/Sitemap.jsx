import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Briefcase, Building2, Users, FileText, ShieldCheck, HelpCircle, Mail, Settings, Upload, Bookmark, Send } from 'lucide-react';

const Sitemap = () => {
    const sitemapSections = [
        {
            title: 'Main Pages',
            icon: Home,
            links: [
                { path: '/', label: 'Home', description: 'JobPortal homepage with hero and featured jobs' },
                { path: '/jobs', label: 'Browse Jobs', description: 'Search and filter through available job listings' },
                { path: '/companies', label: 'Companies', description: 'Browse companies hiring on our platform' }
            ]
        },
        {
            title: 'Authentication',
            icon: Users,
            links: [
                { path: '/login', label: 'Login', description: 'Sign in to your account' },
                { path: '/register', label: 'Register', description: 'Create a new candidate or employer account' },
                { path: '/forgot-password', label: 'Forgot Password', description: 'Reset your account password' }
            ]
        },
        {
            title: 'For Job Seekers',
            icon: Briefcase,
            links: [
                { path: '/candidate-dashboard', label: 'Candidate Dashboard', description: 'View your job search overview and statistics' },
                { path: '/candidate-dashboard/applied', label: 'Applied Jobs', description: 'Track your job applications and their status' },
                { path: '/candidate-dashboard/saved', label: 'Saved Jobs', description: 'View your bookmarked job listings' },
                { path: '/candidate-dashboard/resume', label: 'Resume Upload', description: 'Upload and manage your resume' },
                { path: '/candidate-dashboard/settings', label: 'Candidate Settings', description: 'Update your profile and preferences' }
            ]
        },
        {
            title: 'For Employers',
            icon: Building2,
            links: [
                { path: '/dashboard', label: 'Employer Dashboard', description: 'Overview of your job postings and applications' },
                { path: '/dashboard/post-job', label: 'Post a Job', description: 'Create a new job listing' },
                { path: '/dashboard/jobs', label: 'My Jobs', description: 'Manage your active job postings' },
                { path: '/dashboard/applications', label: 'Applications', description: 'Review candidate applications' },
                { path: '/dashboard/settings', label: 'Employer Settings', description: 'Update company profile and settings' },
                { path: '/pricing', label: 'Pricing Plans', description: 'Choose the right plan for your hiring needs' }
            ]
        },
        {
            title: 'Support & Legal',
            icon: HelpCircle,
            links: [
                { path: '/help-center', label: 'Help Center', description: 'FAQs and helpful resources' },
                { path: '/contact', label: 'Contact Us', description: 'Get in touch with our support team' },
                { path: '/terms', label: 'Terms of Service', description: 'Terms and conditions of using JobPortal' },
                { path: '/privacy', label: 'Privacy Policy', description: 'How we handle and protect your data' },
                { path: '/sitemap', label: 'Sitemap', description: 'Complete list of all pages (you are here)' }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-16">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-2xl mb-6">
                        <FileText className="text-white" size={36} />
                    </div>
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">Sitemap</h1>
                    <p className="text-xl text-gray-600">Navigate to any page on JobPortal</p>
                </div>

                {/* Sitemap Sections */}
                <div className="grid md:grid-cols-2 gap-8">
                    {sitemapSections.map((section, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
                            <div className="bg-gradient-to-r from-[#10b981] to-[#059669] p-6">
                                <div className="flex items-center gap-3 text-white">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                        <section.icon size={24} />
                                    </div>
                                    <h2 className="text-2xl font-bold">{section.title}</h2>
                                </div>
                            </div>
                            <div className="p-6">
                                <ul className="space-y-4">
                                    {section.links.map((link, linkIndex) => (
                                        <li key={linkIndex}>
                                            <Link
                                                to={link.path}
                                                className="group block p-4 rounded-xl border border-gray-200 hover:border-[#10b981] hover:bg-gray-50 transition-all"
                                            >
                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="flex-1">
                                                        <h3 className="font-bold text-gray-900 group-hover:text-[#10b981] transition-colors mb-1">
                                                            {link.label}
                                                        </h3>
                                                        <p className="text-sm text-gray-600">{link.description}</p>
                                                    </div>
                                                    <div className="text-gray-400 group-hover:text-[#10b981] transition-colors flex-shrink-0">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Links Section */}
                <div className="mt-12 bg-gradient-to-r from-[#10b981] to-[#059669] rounded-2xl p-8 text-white">
                    <h3 className="text-2xl font-bold mb-4">Quick Actions</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        <Link
                            to="/jobs"
                            className="flex items-center gap-3 bg-white/20 hover:bg-white/30 rounded-xl p-4 transition-all"
                        >
                            <Briefcase size={24} />
                            <span className="font-semibold">Browse Jobs</span>
                        </Link>
                        <Link
                            to="/dashboard/post-job"
                            className="flex items-center gap-3 bg-white/20 hover:bg-white/30 rounded-xl p-4 transition-all"
                        >
                            <Send size={24} />
                            <span className="font-semibold">Post a Job</span>
                        </Link>
                        <Link
                            to="/contact"
                            className="flex items-center gap-3 bg-white/20 hover:bg-white/30 rounded-xl p-4 transition-all"
                        >
                            <Mail size={24} />
                            <span className="font-semibold">Contact Support</span>
                        </Link>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-8 text-center text-gray-600">
                    <p>Can't find what you're looking for? <Link to="/contact" className="text-[#10b981] hover:underline font-semibold">Contact us</Link> for assistance.</p>
                </div>
            </div>
        </div>
    );
};

export default Sitemap;
