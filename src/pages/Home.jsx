import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import JobCard from '../components/JobCard';
import SearchBar from '../components/SearchBar';
import { ArrowRight, Briefcase, Building2, Users } from 'lucide-react';

const Home = () => {
    const [featuredJobs, setFeaturedJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeaturedJobs = async () => {
            try {
                const res = await fetch('/api/jobs?limit=3');
                const data = await res.json();
                if (data.success) {
                    setFeaturedJobs(data.data);
                }
            } catch (error) {
                console.error('Failed to fetch featured jobs', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedJobs();
    }, []);

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-indigo-50 via-white to-green-50 pt-20 pb-32 px-4 relative overflow-hidden">
                {/* Decorative blobs */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style={{ animationDelay: '2s' }}></div>

                <div className="container mx-auto max-w-5xl text-center relative z-10">
                    <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm text-sm font-semibold text-gray-700">
                        🚀 The #1 Job Platform for Developers
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight text-gray-900 leading-[1.1]">
                        Find your next <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] to-emerald-600">
                            dream career
                        </span> today.
                    </h1>
                    <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Connect with top tech companies and startups. We make it easy to find diverse, remote-friendly, and high-paying jobs.
                    </p>

                    <div className="max-w-3xl mx-auto shadow-2xl shadow-gray-200/50 rounded-2xl bg-white p-2">
                        <SearchBar />
                    </div>

                    <div className="mt-12 flex items-center justify-center gap-8 text-gray-400 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Mock Logos */}
                        {['Google', 'Microsoft', 'Spotify', 'Slack', 'Airbnb'].map((brand) => (
                            <span key={brand} className="text-xl font-bold">{brand}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-white py-16 border-b border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex items-center gap-4 p-6 rounded-2xl bg-gray-50 border border-gray-100">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                <Briefcase size={28} />
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-gray-900">10k+</div>
                                <div className="text-gray-500 font-medium">Active Jobs</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-6 rounded-2xl bg-gray-50 border border-gray-100">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                                <Building2 size={28} />
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-gray-900">500+</div>
                                <div className="text-gray-500 font-medium">Companies</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-6 rounded-2xl bg-gray-50 border border-gray-100">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                <Users size={28} />
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-gray-900">100k+</div>
                                <div className="text-gray-500 font-medium">Candidates</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Jobs */}
            <section className="bg-white py-24">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Jobs</h2>
                            <p className="text-gray-500">The latest opportunities from top employers.</p>
                        </div>
                        <Link to="/jobs">
                            <Button variant="outline" className="flex items-center gap-2 border-2 hover:bg-gray-50 group">
                                View All Jobs <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>

                    {loading ? (
                        <div className="text-center py-20 text-gray-500">Loading featured jobs...</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featuredJobs.length > 0 ? (
                                featuredJobs.map(job => (
                                    <JobCard key={job._id} job={job} />
                                ))
                            ) : (
                                <div className="col-span-3 text-center py-10 bg-gray-50 rounded-xl text-gray-500">
                                    No featured jobs available at the moment.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-[#10b981] relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to start your career?</h2>
                    <p className="text-green-50 text-xl mb-10 max-w-2xl mx-auto">
                        Join thousands of developers and companies building the future together.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link to="/register">
                            <button className="bg-white text-[#10b981] px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
                                Create Account
                            </button>
                        </Link>
                        <Link to="/jobs">
                            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all">
                                Browse Jobs
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
