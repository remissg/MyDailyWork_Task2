import React from 'react';
import Navbar from './Navbar';
import { Outlet, Link } from 'react-router-dom';
import { Briefcase, Twitter, Linkedin, Facebook, Instagram } from 'lucide-react';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-white flex flex-col font-sans">
            <Navbar />
            <main className="flex-1">
                {children || <Outlet />}
            </main>
            <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        {/* Brand */}
                        <div className="col-span-1">
                            <Link to="/" className="flex items-center gap-2.5 text-xl font-bold text-gray-900 mb-6 group">
                                <div className="w-10 h-10 bg-[#10b981] rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-500/20 group-hover:scale-105 transition-transform">
                                    <img
                                        src="/logo.png"
                                        alt="JobPortal logo"
                                        className="w-7 h-7 object-contain invert brightness-0"
                                        loading="lazy"
                                    />
                                </div>
                                <span>JobPortal</span>
                            </Link>
                            <p className="text-gray-500 leading-relaxed mb-6">
                                The leading platform connecting top talent with innovative companies. Find your dream career or hire the best professionals today.
                            </p>
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#10b981] hover:text-white transition-all">
                                    <Twitter size={18} />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#10b981] hover:text-white transition-all">
                                    <Linkedin size={18} />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#10b981] hover:text-white transition-all">
                                    <Instagram size={18} />
                                </a>
                            </div>
                        </div>

                        {/* Links */}
                        <div>
                            <h4 className="font-bold text-gray-900 mb-6 text-lg">For Candidates</h4>
                            <ul className="space-y-4 text-gray-500 font-medium">
                                <li><Link to="/jobs" className="hover:text-[#10b981] transition-colors">Browse Jobs</Link></li>
                                <li><Link to="/companies" className="hover:text-[#10b981] transition-colors">Browse Companies</Link></li>
                                <li><Link to="/candidate-dashboard" className="hover:text-[#10b981] transition-colors">Dashboard</Link></li>
                                <li><Link to="/candidate-dashboard/saved" className="hover:text-[#10b981] transition-colors">Saved Jobs</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-gray-900 mb-6 text-lg">For Employers</h4>
                            <ul className="space-y-4 text-gray-500 font-medium">
                                <li><Link to="/dashboard/post-job" className="hover:text-[#10b981] transition-colors">Post a Job</Link></li>
                                <li><Link to="/dashboard" className="hover:text-[#10b981] transition-colors">Dashboard</Link></li>
                                <li><Link to="/dashboard/applications" className="hover:text-[#10b981] transition-colors">Browse Candidates</Link></li>
                                <li><Link to="/pricing" className="hover:text-[#10b981] transition-colors">Pricing Plans</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-gray-900 mb-6 text-lg">Support</h4>
                            <ul className="space-y-4 text-gray-500 font-medium">
                                <li><Link to="/help-center" className="hover:text-[#10b981] transition-colors">Help Center</Link></li>
                                <li><Link to="/terms" className="hover:text-[#10b981] transition-colors">Terms of Service</Link></li>
                                <li><Link to="/privacy" className="hover:text-[#10b981] transition-colors">Privacy Policy</Link></li>
                                <li><Link to="/contact" className="hover:text-[#10b981] transition-colors">Contact Us</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-gray-400 text-sm font-medium">
                            &copy; {new Date().getFullYear()} JobPortal Inc. All rights reserved.
                        </p>
                        <div className="flex gap-8 text-sm text-gray-400 font-medium">
                            <Link to="/privacy" className="hover:text-gray-800 transition-colors">Privacy</Link>
                            <Link to="/terms" className="hover:text-gray-800 transition-colors">Terms</Link>
                            <Link to="/sitemap" className="hover:text-gray-800 transition-colors">Sitemap</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
