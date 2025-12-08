import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { Briefcase, User, Mail, Lock, Building } from 'lucide-react';

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [role, setRole] = useState('candidate');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        companyName: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const registrationData = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role,
            companyName: role === 'employer' ? formData.companyName : undefined
        };

        const res = await register(registrationData);
        if (!res.success) {
            setError(res.message);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-2xl shadow-xl shadow-gray-100 border border-gray-100">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Create Account</h2>
                    <p className="mt-2 text-gray-500 font-medium">
                        Join thousands of professionals
                    </p>
                </div>

                {/* Role Selection */}
                <div className="flex p-1.5 bg-gray-50 rounded-xl mb-8 border border-gray-100">
                    <button
                        className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-lg transition-all ${role === 'candidate'
                            ? 'bg-white shadow-md text-primary ring-1 ring-gray-100'
                            : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
                            }`}
                        onClick={() => setRole('candidate')}
                        type="button"
                    >
                        <User size={18} /> Candidate
                    </button>
                    <button
                        className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-lg transition-all ${role === 'employer'
                            ? 'bg-white shadow-md text-primary ring-1 ring-gray-100'
                            : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
                            }`}
                        onClick={() => setRole('employer')}
                        type="button"
                    >
                        <Briefcase size={18} /> Employer
                    </button>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <InputField label="Full Name" name="name" placeholder="John Doe" required onChange={handleChange} />

                    {role === 'employer' && (
                        <InputField
                            label="Company Name"
                            name="companyName"
                            placeholder="TechNew Inc."
                            icon={Building}
                            required
                            onChange={handleChange}
                        />
                    )}

                    <InputField
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        icon={Mail}
                        required
                        onChange={handleChange}
                    />

                    <InputField
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        icon={Lock}
                        required
                        onChange={handleChange}
                    />

                    <InputField
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        icon={Lock}
                        required
                        onChange={handleChange}
                    />

                    <Button className="w-full py-3.5 text-lg font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all mt-4">
                        Create Account
                    </Button>

                    <div className="text-center mt-6">
                        <p className="text-gray-600 text-sm">
                            Already have an account?{' '}
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

export default Register;
