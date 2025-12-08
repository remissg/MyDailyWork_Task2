import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import DashboardSidebar from './DashboardSidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    if (!token) return null;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <div className="flex flex-1 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 gap-8 relative">
                {/* Mobile Sidebar Toggle - Visible only on mobile */}
                <button
                    className="md:hidden absolute top-8 right-4 z-40 p-2 bg-white rounded-lg shadow-sm border border-gray-200 text-gray-500"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                </button>

                {/* Sidebar - Controlled by state on mobile, always visible on desktop */}
                <DashboardSidebar className={`${isSidebarOpen ? 'block fixed inset-0 z-30 pt-20 px-4 w-3/4 shadow-2xl' : 'hidden md:block'}`} />

                {/* Overlay for mobile sidebar */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-20 md:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                <main className="flex-1 bg-white rounded-lg shadow-sm border border-gray-100 p-6 w-full">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
