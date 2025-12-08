import React, { useState, useEffect } from 'react';
import JobCard from '../components/JobCard';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { Search, Filter } from 'lucide-react';

const JobListings = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        keyword: '',
        location: '',
        salaryRange: '',
        category: 'All Categories',
        jobType: [],
        experience: []
    });

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const query = new URLSearchParams();
            if (filters.keyword) query.append('keyword', filters.keyword);
            if (filters.location) query.append('location', filters.location);
            if (filters.salaryRange) query.append('salaryRange', filters.salaryRange);
            if (filters.category !== 'All Categories') query.append('category', filters.category);

            // Note: Multiple checkboxes for type/experience would need more complex query handling in backend
            // For now, let's just take the first selected or handle simple single-selection for simplicity in MVP
            // or pass them as comma separated strings if backend supports it.
            // Backend `jobType` is a single string match in current controller. 
            // Let's stick to single filters or update backend. For now, we will pick the last clicked or simplify UI.
            // Actually, let's keep it simple: filter by one type if selected.

            const res = await fetch(`/api/jobs?${query.toString()}`);
            const data = await res.json();
            if (data.success) {
                setJobs(data.data);
            }
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
        setLoading(false);
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const applyFilters = () => {
        fetchJobs();
    };

    return (
        <div className="container py-12 px-4">
            <div className="flex flex-col lg:flex-row gap-10">
                {/* Mobile Filter Toggle */}
                <button
                    className="lg:hidden w-full flex items-center justify-center gap-2 bg-white border border-gray-200 p-3 rounded-lg font-bold text-gray-700 shadow-sm"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <Filter size={20} /> {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>

                {/* Sidebar Filters */}
                <aside className={`w-full lg:w-72 space-y-8 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                    <div className="bg-white p-8 rounded-2xl shadow-[0_2px_12px_rgb(0,0,0,0.04)] border border-gray-100 sticky top-24">
                        <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2 text-lg">
                            <Filter size={20} /> Filters
                        </h3>

                        <div className="space-y-6">
                            <InputField
                                label="Keywords"
                                name="keyword"
                                placeholder="e.g. React"
                                value={filters.keyword}
                                onChange={handleFilterChange}
                            />
                            <InputField
                                label="Location"
                                name="location"
                                placeholder="City or Remote"
                                value={filters.location}
                                onChange={handleFilterChange}
                            />
                            <InputField
                                label="Salary Range"
                                name="salaryRange"
                                placeholder="e.g. 100k or 100000"
                                value={filters.salaryRange}
                                onChange={handleFilterChange}
                            />

                            <div>
                                <label className="text-sm font-bold text-gray-900 mb-3 block">Category</label>
                                <select
                                    name="category"
                                    value={filters.category}
                                    onChange={handleFilterChange}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                >
                                    <option>All Categories</option>
                                    <option>Engineering</option>
                                    <option>Design</option>
                                    <option>Marketing</option>
                                    <option>Sales</option>
                                </select>
                            </div>

                            <Button onClick={applyFilters} className="w-full py-3 font-semibold mt-4 shadow-lg shadow-primary/20">Apply Filters</Button>
                        </div>
                    </div>
                </aside>

                {/* Job Grid */}
                <main className="flex-1">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                        <h1 className="text-3xl font-bold text-gray-900">All Jobs <span className="text-gray-400 text-xl font-normal ml-2">({jobs.length})</span></h1>
                        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg border border-gray-100 shadow-sm w-full md:w-auto justify-between md:justify-start">
                            <span className="text-sm text-gray-500 font-medium">Sort by:</span>
                            <select className="text-sm border-none bg-transparent font-bold text-gray-900 outline-none cursor-pointer">
                                <option>Newest</option>
                                <option>Relevant</option>
                                <option>Salary</option>
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <p>Loading jobs...</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {jobs.map(job => (
                                <JobCard key={job._id} job={job} />
                            ))}
                            {jobs.length === 0 && <p>No jobs found.</p>}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default JobListings;
