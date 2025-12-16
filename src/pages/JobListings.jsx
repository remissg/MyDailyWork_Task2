import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import JobCard from '../components/JobCard';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { Search, Filter, Briefcase } from 'lucide-react';

const JobSkeleton = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-pulse">
        <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
            <div className="flex-1">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>
        <div className="space-y-2 mb-4">
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        </div>
        <div className="flex gap-2">
            <div className="h-6 bg-gray-200 rounded w-16"></div>
            <div className="h-6 bg-gray-200 rounded w-20"></div>
        </div>
    </div>
);

const JobListings = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);
    const [searchParams] = useSearchParams();

    const [filters, setFilters] = useState({
        keyword: searchParams.get('keyword') || '',
        location: searchParams.get('location') || '',
        salaryRange: searchParams.get('salaryRange') || '',
        category: searchParams.get('category') || 'All Categories',
        jobType: [],
        experience: []
    });
    const [sortBy, setSortBy] = useState('newest');

    useEffect(() => {
        const urlFilters = {
            keyword: searchParams.get('keyword') || '',
            location: searchParams.get('location') || '',
            salaryRange: searchParams.get('salaryRange') || '',
            category: searchParams.get('category') || 'All Categories',
        };

        setFilters(prev => ({ ...prev, ...urlFilters }));
        fetchJobs(urlFilters, 'newest');
    }, [searchParams]);

    const fetchJobs = async (activeFilters = filters, activeSort = sortBy) => {
        setLoading(true);
        try {
            const query = new URLSearchParams();
            if (activeFilters.keyword) query.append('keyword', activeFilters.keyword);
            if (activeFilters.location) query.append('location', activeFilters.location);
            if (activeFilters.salaryRange) query.append('salaryRange', activeFilters.salaryRange);
            if (activeFilters.category !== 'All Categories') query.append('category', activeFilters.category);

            query.append('sort', activeSort);

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

    const handleSortChange = (e) => {
        const newSort = e.target.value;
        setSortBy(newSort);
        fetchJobs(filters, newSort);
    };

    const applyFilters = () => {
        fetchJobs(filters);
    };

    const clearFilters = () => {
        const cleared = {
            keyword: '',
            location: '',
            salaryRange: '',
            category: 'All Categories',
            jobType: [],
            experience: []
        };
        setFilters(cleared);
        fetchJobs(cleared);
    };

    return (
        <div className="container py-12 px-4">
            <div className="flex flex-col lg:flex-row gap-10">
                {/* Mobile Filter Toggle */}
                <button
                    className="lg:hidden w-full flex items-center justify-center gap-2 bg-white border border-gray-200 p-3 rounded-lg font-bold text-gray-700 shadow-sm hover:shadow-md transition-shadow"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <Filter size={20} /> {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>

                {/* Sidebar Filters */}
                <aside className={`w-full lg:w-72 space-y-8 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                        <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2 text-lg">
                            <Filter size={20} className="text-green-600" /> Filters
                        </h3>

                        <div className="space-y-6">
                            <InputField
                                label="Keywords"
                                name="keyword"
                                placeholder="e.g. React Developer"
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

                            <div>
                                <label className="text-sm font-bold text-gray-900 mb-3 block">Category</label>
                                <select
                                    name="category"
                                    value={filters.category}
                                    onChange={handleFilterChange}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    <option>All Categories</option>
                                    <option>Engineering</option>
                                    <option>Design</option>
                                    <option>Marketing</option>
                                    <option>Sales</option>
                                    <option>Finance</option>
                                    <option>HR</option>
                                </select>
                            </div>

                            <div className="flex gap-2">
                                <Button onClick={applyFilters} className="flex-1 py-2.5 font-semibold shadow-lg shadow-green-500/20">
                                    Apply
                                </Button>
                                <button
                                    onClick={clearFilters}
                                    className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                                >
                                    Clear
                                </button>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Job Grid */}
                <main className="flex-1">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                        <h1 className="text-3xl font-bold text-gray-900">
                            All Jobs <span className="text-gray-400 text-xl font-normal ml-2">({loading ? '...' : jobs.length})</span>
                        </h1>
                        <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-lg border border-gray-100 shadow-sm w-full md:w-auto justify-between md:justify-start">
                            <span className="text-sm text-gray-500 font-medium">Sort by:</span>
                            <select
                                className="text-sm border-none bg-transparent font-bold text-gray-900 outline-none cursor-pointer"
                                value={sortBy}
                                onChange={handleSortChange}
                            >
                                <option value="newest">Newest</option>
                                <option value="oldest">Oldest</option>
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[1, 2, 3, 4, 5, 6].map(i => <JobSkeleton key={i} />)}
                        </div>
                    ) : jobs.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Briefcase size={40} className="text-gray-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">No jobs found</h3>
                            <p className="text-gray-500 mb-6 max-w-md mx-auto">
                                {filters.keyword || filters.location || filters.category !== 'All Categories'
                                    ? "We couldn't find any jobs matching your criteria. Try adjusting your filters."
                                    : "There are no job postings available at the moment. Check back soon!"}
                            </p>
                            {(filters.keyword || filters.location || filters.category !== 'All Categories') && (
                                <button
                                    onClick={clearFilters}
                                    className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-sm hover:shadow-md"
                                >
                                    Clear All Filters
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {jobs.map(job => (
                                <JobCard key={job._id} job={job} />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default JobListings;
