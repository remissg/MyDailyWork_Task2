import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Briefcase, Menu, X, User, LogOut } from 'lucide-react';
import Button from './Button';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const { user, logout } = useAuth();

    const isActive = (path) => location.pathname === path;

    const getDashboardLink = () => {
        if (!user) return '/dashboard';
        return user.role === 'employer' ? '/dashboard' : '/candidate-dashboard';
    };

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="container h-20 flex items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2.5 text-xl font-bold text-gray-900 group">
                    <div className="w-10 h-10 bg-[#10b981] rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-500/20 group-hover:scale-105 transition-transform">
                        <Briefcase size={22} />
                    </div>
                    <span>JobFlow</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-500">
                    <Link to="/" className={`hover:text-[#10b981] transition-colors ${isActive('/') ? 'text-[#10b981]' : ''}`}>Home</Link>
                    <Link to="/jobs" className={`hover:text-[#10b981] transition-colors ${isActive('/jobs') ? 'text-[#10b981]' : ''}`}>Jobs</Link>
                    {user && (
                        <Link to={getDashboardLink()} className={`hover:text-[#10b981] transition-colors ${location.pathname.includes('dashboard') ? 'text-[#10b981]' : ''}`}>
                            Dashboard
                        </Link>
                    )}
                </div>

                {/* Auth Buttons / User Menu */}
                <div className="hidden md:flex items-center gap-4">
                    {user ? (
                        <>
                            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-50">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                    {user.name?.charAt(0) || 'U'}
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                                    <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                                </div>
                            </div>
                            <button
                                onClick={logout}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <LogOut size={16} />
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-sm font-bold text-gray-700 hover:text-gray-900 px-2">
                                Sign In
                            </Link>
                            <Link to="/register">
                                <Button className="px-6 shadow-lg shadow-primary/20">Register</Button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-gray-500" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-4 shadow-xl absolute w-full left-0">
                    <Link to="/" className="block text-sm font-semibold text-gray-600 hover:text-primary" onClick={() => setIsOpen(false)}>Home</Link>
                    <Link to="/jobs" className="block text-sm font-semibold text-gray-600 hover:text-primary" onClick={() => setIsOpen(false)}>Jobs</Link>
                    {user && (
                        <Link to={getDashboardLink()} className="block text-sm font-semibold text-gray-600 hover:text-primary" onClick={() => setIsOpen(false)}>
                            Dashboard
                        </Link>
                    )}
                    <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
                        {user ? (
                            <>
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                                        {user.name?.charAt(0) || 'U'}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                                        <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        logout();
                                        setIsOpen(false);
                                    }}
                                    className="flex items-center justify-center gap-2 w-full py-2 text-sm font-semibold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                                >
                                    <LogOut size={16} />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" onClick={() => setIsOpen(false)}>
                                    <Button variant="outline" className="w-full justify-center">Sign In</Button>
                                </Link>
                                <Link to="/register" onClick={() => setIsOpen(false)}>
                                    <Button className="w-full justify-center">Register</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
