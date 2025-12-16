import React, { useState, useEffect } from 'react';
import { Bell, Save } from 'lucide-react';
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
            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${enabled ? 'bg-green-600' : 'bg-gray-200'
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

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (user?.notifications) {
            setNotifications(user.notifications);
        }
    }, [user]);

    const handleToggle = (key) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
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
                body: JSON.stringify({ notifications })
            });
            const data = await res.json();

            if (res.ok) {
                setMessage('Settings updated successfully!');
                setTimeout(() => setMessage(''), 3000);
            } else {
                setMessage(data.message || 'Failed to update settings');
            }
        } catch (error) {
            console.error(error);
            setMessage('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 lg:p-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                <p className="text-sm text-gray-500 font-medium mt-2">
                    Manage your notification preferences. <a href="/profile" className="text-green-600 hover:underline">Edit your profile →</a>
                </p>
            </div>

            {message && (
                <div className={`mb-6 p-4 rounded-lg ${message.includes('success') ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'}`}>
                    {message}
                </div>
            )}

            {/* Notifications */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
                    <Bell className="text-green-600" size={22} />
                    <h3 className="text-xl font-bold text-gray-900">Email Notifications</h3>
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

                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                    <Button
                        onClick={handleSave}
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-2.5 bg-green-600 hover:bg-green-700 shadow-lg"
                    >
                        <Save size={18} /> {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
