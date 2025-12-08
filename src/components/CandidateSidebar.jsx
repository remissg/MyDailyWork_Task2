import React from 'react';
import { LayoutDashboard, Briefcase, Bookmark, FileText, Settings, LogOut, Upload } from 'lucide-react';
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

const CandidateSidebar = ({ className = "hidden md:block" }) => {
    const location = useLocation();
    const { logout } = useAuth();
    const isActive = (path) => location.pathname === path;

    return (
        <div className={`w-64 border-r border-gray-100 h-[calc(100vh-64px)] overflow-y-auto sticky top-16 bg-white ${className}`}>
            <div className="p-4 space-y-1">
                <SidebarItem
                    icon={LayoutDashboard}
                    label="Profile"
                    to="/candidate-dashboard"
                    active={isActive('/candidate-dashboard')}
                />
                <SidebarItem
                    icon={Briefcase}
                    label="Applied Jobs"
                    to="/candidate-dashboard/applied"
                    active={isActive('/candidate-dashboard/applied')}
                />
                <SidebarItem
                    icon={Bookmark}
                    label="Saved Jobs"
                    to="/candidate-dashboard/saved"
                    active={isActive('/candidate-dashboard/saved')}
                />
                <SidebarItem
                    icon={Upload}
                    label="Resume Upload"
                    to="/candidate-dashboard/resume"
                    active={isActive('/candidate-dashboard/resume')}
                />
                <SidebarItem
                    icon={Settings}
                    label="Settings"
                    to="/candidate-dashboard/settings"
                    active={isActive('/candidate-dashboard/settings')}
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

export default CandidateSidebar;
