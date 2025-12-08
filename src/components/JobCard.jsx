import React from 'react';
import { MapPin, Clock, Briefcase } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import { useAuth } from '../context/AuthContext';

const JobCard = ({ job }) => {
    const { user, token } = useAuth();
    const navigate = useNavigate();

    const handleApply = (e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent card click event if any
        if (!token) {
            navigate('/login');
            return;
        }
        if (user?.role === 'employer' || user?.role === 'admin') {
            alert('Only candidates can apply to jobs.');
            return;
        }
        navigate(`/jobs/${job?._id || job?.id}/apply`);
    };
    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 group flex flex-col h-full">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">{job?.title || 'Untitled Job'}</h3>
                    <p className="text-gray-500 font-medium text-base">{job?.company || 'Confidential Company'}</p>
                </div>
                <div className="px-4 py-1.5 bg-green-50 text-primary rounded-full text-xs font-bold uppercase tracking-wider">
                    {job?.jobType || 'N/A'}
                </div>
            </div>

            <div className="flex flex-col gap-3 mb-8 flex-1">
                <div className="flex items-center gap-2 text-gray-500 font-medium">
                    <MapPin size={18} className="text-gray-400" />
                    {job?.location || 'Remote'}
                </div>
                <div className="flex items-center gap-2 text-gray-500 font-medium">
                    <Briefcase size={18} className="text-gray-400" />
                    {job?.salaryRange || 'Competitive Salary'}
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Clock size={16} />
                    {job?.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'Recently'}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-auto">
                <Link to={`/jobs/${job?._id || job?.id}`} className="w-full">
                    <Button variant="outline" className="w-full font-semibold border-2 hover:border-gray-300">Details</Button>
                </Link>
                <Button
                    onClick={handleApply}
                    className="w-full font-semibold shadow-lg shadow-green-500/20"
                >
                    Apply
                </Button>
            </div>
        </div>
    );
};

export default JobCard;
