import React, { useState, useEffect } from 'react';
import { Bell, User, Briefcase, Lock, Save } from 'lucide-react';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

const Toggle = ({ label, description, enabled, onChange }) => (
    <div className="flex items-center justify-between py-6 border-b border-gray-100 last:border-0">
        <div className="flex-1 pr-8">
            <h4 className="text-base font-semibold text-gray-900 mb-1">{label}</h4>
            <p className="text-sm text-gray-500 font-medium">{description}</p>
        </div>
        <button
            onClick={() => onChange(!enabled)}
            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:ring-offset-2 ${enabled ? 'bg-[#10b981]' : 'bg-gray-200'
                }`}
        >
            <span
                className={`${enabled ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out shadow-sm`}
            />
        </button>
    </div>
);

const Settings = () => {
    const { user, token } = useAuth();
    const [notifications, setNotifications] = useState({
        applicationUpdates: true,
        jobAlerts: true,
        employerMessages: false
    });

    const [profile, setProfile] = useState({
        name: '',
        email: '',
        companyName: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (user) {
            setProfile({
                name: user.name || '',
                email: user.email || '',
                companyName: user.companyName || '',
                password: ''
            });
            if (user.notifications) {
                setNotifications(user.notifications);
            }
        }
    }, [user]);

    const handleToggle = (key) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        setMessage('');
        setLoading(true);
        try {
            const res = await fetch('/api/auth/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ ...profile, notifications })
            });
            const data = await res.json();

            if (res.ok) {
                setMessage('Profile updated successfully!');
            } else {
                setMessage(data.message || 'Failed to update profile');
            }
        } catch (error) {
            console.error(error);
            setMessage('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 lg:p-10">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="text-sm text-gray-500 font-medium mt-1">Manage your profile and preferences.</p>
            </div>

            {message && (
                <div className={`mb-6 p-4 rounded-md ${message.includes('success') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                    {message}
                </div>
            )}

            <div className="space-y-6">
                {/* Profile Settings */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
                        <User className="text-[#10b981]" size={20} />
                        <h3 className="text-lg font-bold text-gray-900">Profile Information</h3>
                    </div>
                    <div className="p-6 sm:p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={profile.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#10b981]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={profile.email}
                                    onChange={handleChange}
                                    disabled
                                    className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed"
                                />
                            </div>
                            {user?.role === 'employer' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                                    <input
                                        type="text"
                                        name="companyName"
                                        value={profile.companyName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#10b981]"
                                    />
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={profile.password}
                                    onChange={handleChange}
                                    placeholder="Leave blank to keep current"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#10b981]"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end pt-4">
                            <Button
                                onClick={handleSave}
                                disabled={loading}
                                className="flex items-center gap-2 px-6 py-2.5 shadow-lg shadow-primary/20"
                            >
                                <Save size={18} /> {loading ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Notifications */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
                        <Bell className="text-[#10b981]" size={20} />
                        <h3 className="text-lg font-bold text-gray-900">Email Notifications</h3>
                    </div>

                    <div className="p-6 sm:p-8">
                        <div className="space-y-1">
                            <Toggle
                                label="Application Updates"
                                description="Receive emails when your application status changes."
                                enabled={notifications.applicationUpdates}
                                onChange={() => handleToggle('applicationUpdates')}
                            />
                            <Toggle
                                label="Job Alerts"
                                description="Get notified when new jobs match your profile."
                                enabled={notifications.jobAlerts}
                                onChange={() => handleToggle('jobAlerts')}
                            />
                            <Toggle
                                label="Employer Messages"
                                description="Receive emails when an employer sends you a message."
                                enabled={notifications.employerMessages}
                                onChange={() => handleToggle('employerMessages')}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
