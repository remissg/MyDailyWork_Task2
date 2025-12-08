import React, { useState, useEffect } from 'react';
import { Building2, MapPin, Briefcase, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Companies = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await fetch('/api/companies');
                const data = await res.json();
                if (data.success) {
                    setCompanies(data.data);
                }
            } catch (error) {
                console.error('Failed to fetch companies', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanies();
    }, []);

    const filteredCompanies = companies.filter(company =>
        company.companyName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="py-20 text-center">Loading companies...</div>;

    return (
        <div className="bg-white min-h-screen py-10">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Top Companies Hiring Now</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Explore companies with exciting job opportunities. Find the best place to grow your career.
                    </p>
                </div>

                {/* Search */}
                <div className="max-w-xl mx-auto mb-12 relative">
                    <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search companies..."
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#10b981] shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCompanies.map((company) => (
                        <div key={company._id} className="border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group">
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center text-2xl font-bold text-[#10b981] border border-gray-100 group-hover:bg-[#10b981] group-hover:text-white transition-colors">
                                    {company.companyName?.charAt(0).toUpperCase()}
                                </div>
                                <span className="bg-green-50 text-[#10b981] text-xs font-semibold px-3 py-1 rounded-full">
                                    {company.activeJobs} Jobs
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#10b981] transition-colors">
                                {company.companyName}
                            </h3>

                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                                <MapPin size={16} />
                                <span>Location not specified</span>
                            </div>

                            <Link
                                to={`/jobs?keyword=${encodeURIComponent(company.companyName)}`}
                                className="block w-full text-center py-2.5 border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                            >
                                View Openings
                            </Link>
                        </div>
                    ))}
                </div>

                {filteredCompanies.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        No companies found matching "{searchTerm}"
                    </div>
                )}
            </div>
        </div>
    );
};

export default Companies;
