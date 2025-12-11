import React from 'react';
import { FileText, Calendar } from 'lucide-react';

const TermsOfService = () => {
    const lastUpdated = "December 11, 2025";

    const sections = [
        {
            title: "1. Acceptance of Terms",
            content: `By accessing and using JobPortal ("the Service"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these Terms of Service, please do not use the Service.`
        },
        {
            title: "2. User Accounts",
            content: `When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms. You are responsible for safeguarding the password and for all activities that occur under your account.`
        },
        {
            title: "3. User Conduct",
            subsections: [
                {
                    subtitle: "For All Users",
                    text: "You agree not to post false, inaccurate, misleading, defamatory, or libelous content. You must not violate any local, state, national, or international law."
                },
                {
                    subtitle: "For Job Seekers",
                    text: "You must provide truthful information in your profile and applications. Misrepresenting your qualifications or experience is strictly prohibited."
                },
                {
                    subtitle: "For Employers",
                    text: "You must post only legitimate job opportunities. Fraudulent job postings, pyramid schemes, or any deceptive practices are strictly forbidden."
                }
            ]
        },
        {
            title: "4. Job Postings",
            content: `Employers are solely responsible for the content of their job postings. JobPortal reserves the right to remove any job posting that violates our policies or applicable laws. Job postings must not discriminate based on race, color, religion, sex, national origin, age, disability, or any other protected characteristic.`
        },
        {
            title: "5. Applications and Resume Submissions",
            content: `By submitting an application or resume through the Service, you grant the respective employer permission to contact you regarding employment opportunities. JobPortal is not responsible for employer communications or hiring decisions.`
        },
        {
            title: "6. Intellectual Property",
            content: `The Service and its original content, features, and functionality are owned by JobPortal and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws. You may not copy, modify, distribute, sell, or lease any part of our Service without express written permission.`
        },
        {
            title: "7. Links to Other Websites",
            content: `Our Service may contain links to third-party websites or services that are not owned or controlled by JobPortal. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services.`
        },
        {
            title: "8. Limitation of Liability",
            content: `In no event shall JobPortal, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.`
        },
        {
            title: "9. Disclaimer",
            content: `Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We do not guarantee the accuracy, completeness, or usefulness of any information on the Service.`
        },
        {
            title: "10. Termination",
            content: `We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.`
        },
        {
            title: "11. Changes to Terms",
            content: `We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. Continued use of the Service after changes constitutes acceptance of the new Terms.`
        },
        {
            title: "12. Governing Law",
            content: `These Terms shall be governed and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.`
        },
        {
            title: "13. Contact Us",
            content: `If you have any questions about these Terms, please contact us at legal@jobportal.com or visit our Contact Us page.`
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-16">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-2xl mb-6">
                        <FileText className="text-white" size={36} />
                    </div>
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">Terms of Service</h1>
                    <div className="flex items-center justify-center gap-2 text-gray-600">
                        <Calendar size={18} />
                        <p>Last Updated: {lastUpdated}</p>
                    </div>
                </div>

                {/* Content */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12">
                    <div className="prose prose-lg max-w-none">
                        <p className="text-gray-600 leading-relaxed mb-8">
                            Please read these Terms of Service carefully before using JobPortal. These terms govern your access to and use of our services.
                        </p>

                        <div className="space-y-8">
                            {sections.map((section, index) => (
                                <div key={index} className="border-l-4 border-[#10b981] pl-6">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
                                    {section.content && (
                                        <p className="text-gray-700 leading-relaxed mb-4">{section.content}</p>
                                    )}
                                    {section.subsections && (
                                        <div className="space-y-4">
                                            {section.subsections.map((subsection, subIndex) => (
                                                <div key={subIndex} className="ml-4">
                                                    <h3 className="font-bold text-gray-800 mb-2">{subsection.subtitle}</h3>
                                                    <p className="text-gray-700 leading-relaxed">{subsection.text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 p-6 bg-gray-50 rounded-xl border border-gray-200">
                            <h3 className="font-bold text-gray-900 mb-2">Questions or Concerns?</h3>
                            <p className="text-gray-700">
                                If you have any questions about these Terms of Service, please{' '}
                                <a href="/contact" className="text-[#10b981] hover:underline font-semibold">
                                    contact us
                                </a>
                                {' '}or email us at legal@jobportal.com
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
