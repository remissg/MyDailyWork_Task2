import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Award, Plus, X, Save, AlertCircle, ArrowLeft } from 'lucide-react';
import Button from '../components/Button';

const Profile = () => {
    const { user, token, login } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        location: '',
        bio: '',
        companyName: '',
        foundedDate: '',
        skills: [],
        experience: [],
        education: []
    });
    const [newSkill, setNewSkill] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                location: user.location || '',
                bio: user.bio || '',
                companyName: user.companyName || '',
                foundedDate: user.foundedDate ? new Date(user.foundedDate).toISOString().split('T')[0] : '',
                skills: user.skills || [],
                experience: user.experience || [],
                education: user.education || []
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddSkill = () => {
        if (newSkill.trim()) {
            setFormData(prev => ({
                ...prev,
                skills: [...prev.skills, newSkill.trim()]
            }));
            setNewSkill('');
        }
    };

    const handleRemoveSkill = (index) => {
        setFormData(prev => ({
            ...prev,
            skills: prev.skills.filter((_, i) => i !== index)
        }));
    };

    const handleAddExperience = () => {
        setFormData(prev => ({
            ...prev,
            experience: [...prev.experience, {
                title: '',
                company: '',
                location: '',
                startDate: '',
                endDate: '',
                current: false,
                description: ''
            }]
        }));
    };

    const handleRemoveExperience = (index) => {
        setFormData(prev => ({
            ...prev,
            experience: prev.experience.filter((_, i) => i !== index)
        }));
    };

    const handleExperienceChange = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            experience: prev.experience.map((exp, i) =>
                i === index ? { ...exp, [field]: value } : exp
            )
        }));
    };

    const handleAddEducation = () => {
        setFormData(prev => ({
            ...prev,
            education: [...prev.education, {
                degree: '',
                school: '',
                field: '',
                startDate: '',
                endDate: '',
                current: false
            }]
        }));
    };

    const handleRemoveEducation = (index) => {
        setFormData(prev => ({
            ...prev,
            education: prev.education.filter((_, i) => i !== index)
        }));
    };

    const handleEducationChange = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            education: prev.education.map((edu, i) =>
                i === index ? { ...edu, [field]: value } : edu
            )
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const res = await fetch('/api/auth/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Failed to update profile');
            }

            login(data.token);
            setSuccess('Profile updated successfully!');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            {/* Back Button */}
            <Link
                to={user?.role === 'candidate' ? '/candidate-dashboard' : '/dashboard'}
                className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 transition-colors font-medium"
            >
                <ArrowLeft size={18} /> Back to Dashboard
            </Link>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Alerts */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-start gap-3">
                        <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{error}</span>
                    </div>
                )}
                {success && (
                    <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-start gap-3">
                        <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{success}</span>
                    </div>
                )}

                {/* Header Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-12 text-center">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-green-600 font-bold text-4xl shadow-lg mx-auto mb-4">
                            {user?.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">{user?.name}</h1>
                        <p className="text-green-50">{formData.location || 'Add your location'}</p>
                    </div>
                </div>

                {/* Basic Info */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <User size={22} className="text-green-600" />
                        Contact Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                            <input
                                type="email"
                                value={formData.email}
                                disabled
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+1 (555) 123-4567"
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="San Francisco, CA"
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Tell us about yourself..."
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                            />
                        </div>

                        {user?.role === 'employer' && (
                            <>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name *</label>
                                    <input
                                        type="text"
                                        name="companyName"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        required
                                        placeholder="Your Company Name"
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Founded Date</label>
                                    <input
                                        type="date"
                                        name="foundedDate"
                                        value={formData.foundedDate}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Professional Sections - ONLY FOR CANDIDATES */}
                {user?.role === 'candidate' && (
                    <>
                        {/* Skills */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <Award size={22} className="text-green-600" />
                                Skills
                            </h2>
                            <div className="space-y-4">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newSkill}
                                        onChange={(e) => setNewSkill(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                                        placeholder="Add a skill (e.g., React, Python, Project Management)"
                                        className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddSkill}
                                        className="px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                                    >
                                        <Plus size={18} /> Add
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {formData.skills.map((skill, index) => (
                                        <span key={index} className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full flex items-center gap-2 text-sm font-medium">
                                            {skill}
                                            <button type="button" onClick={() => handleRemoveSkill(index)} className="hover:text-green-900">
                                                <X size={14} />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Experience */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <Briefcase size={22} className="text-green-600" />
                                    Work Experience
                                </h2>
                                <button type="button" onClick={handleAddExperience} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 text-sm">
                                    <Plus size={16} /> Add Experience
                                </button>
                            </div>
                            <div className="space-y-6">
                                {formData.experience.map((exp, index) => (
                                    <div key={index} className="p-4 border border-gray-200 rounded-lg relative">
                                        <button type="button" onClick={() => handleRemoveExperience(index)} className="absolute top-4 right-4 text-red-500 hover:text-red-700">
                                            <X size={18} />
                                        </button>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <input
                                                type="text"
                                                placeholder="Job Title *"
                                                value={exp.title}
                                                onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
                                                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Company *"
                                                value={exp.company}
                                                onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                                                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Location"
                                                value={exp.location}
                                                onChange={(e) => handleExperienceChange(index, 'location', e.target.value)}
                                                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                            />
                                            <div className="flex gap-2">
                                                <input
                                                    type="month"
                                                    value={exp.startDate}
                                                    onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                                                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                                />
                                                {!exp.current && (
                                                    <input
                                                        type="month"
                                                        value={exp.endDate}
                                                        onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                                                        className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <label className="flex items-center gap-2 mb-4">
                                            <input
                                                type="checkbox"
                                                checked={exp.current}
                                                onChange={(e) => handleExperienceChange(index, 'current', e.target.checked)}
                                                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                            />
                                            <span className="text-sm text-gray-700">I currently work here</span>
                                        </label>
                                        <textarea
                                            placeholder="Description"
                                            value={exp.description}
                                            onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                                            rows={3}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Education */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <GraduationCap size={22} className="text-green-600" />
                                    Education
                                </h2>
                                <button type="button" onClick={handleAddEducation} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 text-sm">
                                    <Plus size={16} /> Add Education
                                </button>
                            </div>
                            <div className="space-y-6">
                                {formData.education.map((edu, index) => (
                                    <div key={index} className="p-4 border border-gray-200 rounded-lg relative">
                                        <button type="button" onClick={() => handleRemoveEducation(index)} className="absolute top-4 right-4 text-red-500 hover:text-red-700">
                                            <X size={18} />
                                        </button>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <input
                                                type="text"
                                                placeholder="Degree *"
                                                value={edu.degree}
                                                onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                                                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                            />
                                            <input
                                                type="text"
                                                placeholder="School/University *"
                                                value={edu.school}
                                                onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
                                                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Field of Study"
                                                value={edu.field}
                                                onChange={(e) => handleEducationChange(index, 'field', e.target.value)}
                                                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                            />
                                            <div className="flex gap-2">
                                                <input
                                                    type="month"
                                                    value={edu.startDate}
                                                    onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                                                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                                />
                                                {!edu.current && (
                                                    <input
                                                        type="month"
                                                        value={edu.endDate}
                                                        onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
                                                        className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={edu.current}
                                                onChange={(e) => handleEducationChange(index, 'current', e.target.checked)}
                                                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                            />
                                            <span className="text-sm text-gray-700">I currently study here</span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {/* Submit */}
                <div className="flex justify-end sticky bottom-4">
                    <Button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        <Save size={18} />
                        {loading ? 'Saving...' : 'Save Profile'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Profile;
