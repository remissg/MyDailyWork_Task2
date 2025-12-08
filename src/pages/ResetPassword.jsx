import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { Briefcase, Lock, CheckCircle } from 'lucide-react';

const ResetPassword = () => {
    const { resetToken } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(`/api/auth/reset-password/${resetToken}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ password })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Failed to reset password');
            }

            // Show success and redirect to login
            alert('Password reset successful! Please login with your new password.');
            navigate('/login');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-2xl shadow-xl shadow-gray-100 border border-gray-100">
                <div className="text-center mb-10">
                    <div className="mx-auto h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 transform rotate-3">
                        <Briefcase size={28} />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Reset Password</h2>
                    <p className="mt-2 text-gray-500 font-medium">
                        Enter your new password below
                    </p>
                    {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <InputField
                        label="New Password"
                        type="password"
                        placeholder="••••••••"
                        icon={Lock}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <InputField
                        label="Confirm Password"
                        type="password"
                        placeholder="••••••••"
                        icon={Lock}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    <Button
                        className="w-full py-3.5 text-lg font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all"
                        disabled={loading}
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </Button>

                    <div className="text-center mt-8">
                        <p className="text-gray-600 text-sm">
                            Remember your password?{' '}
                            <Link to="/login" className="font-bold text-primary hover:text-primary-dark transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
