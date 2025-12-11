import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, HelpCircle, Briefcase, Users, FileText } from 'lucide-react';

const HelpCenter = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedFAQ, setExpandedFAQ] = useState(null);

    const faqCategories = [
        {
            icon: HelpCircle,
            title: 'Getting Started',
            faqs: [
                {
                    question: 'How do I create an account?',
                    answer: 'Click the "Register" button in the top right corner, choose whether you\'re a candidate or employer, and fill in your details. You\'ll receive a verification email to activate your account.'
                },
                {
                    question: 'What\'s the difference between candidate and employer accounts?',
                    answer: 'Candidate accounts allow you to browse and apply for jobs, save job listings, and manage your applications. Employer accounts let you post jobs, review applications, and manage your company profile.'
                },
                {
                    question: 'Is JobPortal free to use?',
                    answer: 'Yes! Creating an account and browsing jobs is completely free for candidates. Employers can post their first job for free, with premium features available for enhanced visibility.'
                }
            ]
        },
        {
            icon: Briefcase,
            title: 'For Job Seekers',
            faqs: [
                {
                    question: 'How do I apply for a job?',
                    answer: 'Browse jobs, click on a position that interests you, and click the "Apply Now" button. You\'ll need to submit your resume and can optionally include a cover letter.'
                },
                {
                    question: 'Can I save jobs to apply later?',
                    answer: 'Yes! Click the bookmark icon on any job listing to save it. You can view all your saved jobs in your candidate dashboard under "Saved Jobs".'
                },
                {
                    question: 'How do I track my applications?',
                    answer: 'Go to your candidate dashboard and click on "Applied Jobs" to see all your applications and their current status (pending, reviewed, rejected, or accepted).'
                },
                {
                    question: 'Can I upload multiple resumes?',
                    answer: 'You can maintain one primary resume in your profile. You can update it anytime from your dashboard under "Resume Upload".'
                }
            ]
        },
        {
            icon: Users,
            title: 'For Employers',
            faqs: [
                {
                    question: 'How do I post a job?',
                    answer: 'After logging in to your employer account, go to your dashboard and click "Post a Job". Fill in the job details including title, description, requirements, and salary range.'
                },
                {
                    question: 'How do I review applications?',
                    answer: 'Navigate to your dashboard and click on "Applications" to see all applications. You can filter by job position and update application statuses.'
                },
                {
                    question: 'Can I edit or delete my job postings?',
                    answer: 'Yes! Go to "My Jobs" in your dashboard. You can edit job details or remove listings that are no longer active.'
                },
                {
                    question: 'How do I contact applicants?',
                    answer: 'When reviewing an application, you\'ll see the candidate\'s contact information including their email address. You can reach out directly to schedule interviews.'
                }
            ]
        },
        {
            icon: FileText,
            title: 'Account Management',
            faqs: [
                {
                    question: 'How do I reset my password?',
                    answer: 'Click "Forgot Password" on the login page, enter your registered email, and you\'ll receive a password reset link.'
                },
                {
                    question: 'How do I update my profile information?',
                    answer: 'Go to Settings in your dashboard to update your personal information, contact details, and account preferences.'
                },
                {
                    question: 'Can I delete my account?',
                    answer: 'Yes, you can request account deletion by contacting our support team through the Contact Us page. Please note this action is irreversible.'
                }
            ]
        }
    ];

    const filteredCategories = faqCategories.map(category => ({
        ...category,
        faqs: category.faqs.filter(faq =>
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(category => category.faqs.length > 0);

    const toggleFAQ = (categoryIndex, faqIndex) => {
        const key = `${categoryIndex}-${faqIndex}`;
        setExpandedFAQ(expandedFAQ === key ? null : key);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-16">
            <div className="container mx-auto px-4 max-w-5xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">Help Center</h1>
                    <p className="text-xl text-gray-600">Find answers to commonly asked questions</p>
                </div>

                {/* Search Bar */}
                <div className="mb-12 max-w-2xl mx-auto">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search for help..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#10b981] focus:outline-none transition-colors text-lg"
                        />
                    </div>
                </div>

                {/* FAQ Categories */}
                {filteredCategories.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No results found. Try a different search term.</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {filteredCategories.map((category, categoryIndex) => (
                            <div key={categoryIndex} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="bg-gradient-to-r from-[#10b981] to-[#059669] p-6">
                                    <div className="flex items-center gap-3 text-white">
                                        <category.icon size={28} />
                                        <h2 className="text-2xl font-bold">{category.title}</h2>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-4">
                                        {category.faqs.map((faq, faqIndex) => {
                                            const key = `${categoryIndex}-${faqIndex}`;
                                            const isExpanded = expandedFAQ === key;

                                            return (
                                                <div
                                                    key={faqIndex}
                                                    className="border border-gray-200 rounded-xl overflow-hidden transition-all hover:shadow-md"
                                                >
                                                    <button
                                                        onClick={() => toggleFAQ(categoryIndex, faqIndex)}
                                                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                                                    >
                                                        <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                                                        {isExpanded ? (
                                                            <ChevronUp className="text-[#10b981] flex-shrink-0" size={20} />
                                                        ) : (
                                                            <ChevronDown className="text-gray-400 flex-shrink-0" size={20} />
                                                        )}
                                                    </button>
                                                    {isExpanded && (
                                                        <div className="px-6 pb-4 pt-2 bg-gray-50 border-t border-gray-200">
                                                            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Contact Support */}
                <div className="mt-16 text-center bg-gradient-to-r from-[#10b981] to-[#059669] rounded-2xl p-12 text-white">
                    <h3 className="text-3xl font-bold mb-4">Still need help?</h3>
                    <p className="text-lg mb-6 opacity-90">Our support team is here to assist you</p>
                    <a
                        href="/contact"
                        className="inline-block bg-white text-[#10b981] px-8 py-3 rounded-xl font-semibold hover:shadow-xl transition-shadow"
                    >
                        Contact Support
                    </a>
                </div>
            </div>
        </div>
    );
};

export default HelpCenter;
