import React from 'react';
import { LayoutDashboard, Briefcase, User, Settings, LogOut, FileText, Lock } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SidebarItem = ({ icon: Icon, label, to, active }) => (
    <Link
        to={to}
        className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${active
            ? 'bg-green-50 text-[#10b981]'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
    >
        <Icon size={20} />
        {label}
    </Link>
);

const DashboardSidebar = ({ className = "hidden md:block" }) => {
    const location = useLocation();
    const { user, logout } = useAuth();
    const isActive = (path) => location.pathname === path;

    return (
        <div className={`w-64 border-r border-gray-100 h-[calc(100vh-64px)] overflow-y-auto sticky top-16 bg-white ${className}`}>
            <div className="p-4 space-y-1">
                {user?.role !== 'admin' && (
                    <SidebarItem
                        icon={LayoutDashboard}
                        label="Dashboard"
                        to="/dashboard"
                        active={isActive('/dashboard')}
                    />
                )}
                {user?.role === 'employer' && (
                    <>
                        <SidebarItem
                            icon={Briefcase}
                            label="Post a Job"
                            to="/dashboard/post-job"
                            active={isActive('/dashboard/post-job')}
                        />
                        <SidebarItem
                            icon={Briefcase}
                            label="My Jobs"
                            to="/dashboard/jobs"
                            active={isActive('/dashboard/jobs')}
                        />
                        <SidebarItem
                            icon={FileText}
                            label="Applications Received"
                            to="/dashboard/applications"
                            active={isActive('/dashboard/applications')}
                        />
                    </>
                )}

                {user?.role === 'admin' && (
                    <SidebarItem
                        icon={Lock}
                        label="Admin Dashboard"
                        to="/admin"
                        active={isActive('/admin')}
                    />
                )}

                <SidebarItem
                    icon={Settings}
                    label="Profile Settings"
                    to="/dashboard/settings"
                    active={isActive('/dashboard/settings')}
                />
            </div>

            <div className="p-4 border-t border-gray-100 mt-auto">
                <button
                    onClick={logout}
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                    <LogOut size={20} />
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default DashboardSidebar;
