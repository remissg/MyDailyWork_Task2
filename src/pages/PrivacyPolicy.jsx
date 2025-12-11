import React from 'react';
import { Shield, Calendar, Lock, Eye, Share2, UserCheck } from 'lucide-react';

const PrivacyPolicy = () => {
    const lastUpdated = "December 11, 2025";

    const sections = [
        {
            icon: Eye,
            title: "1. Information We Collect",
            subsections: [
                {
                    subtitle: "Personal Information",
                    text: "When you register for an account, we collect your name, email address, phone number, and other contact details. Job seekers may provide resume data, work history, and education information. Employers may provide company information and job posting details."
                },
                {
                    subtitle: "Automatically Collected Information",
                    text: "We automatically collect certain information when you visit our Service, including your IP address, browser type, operating system, referring URLs, and pages visited. We use cookies and similar tracking technologies to track activity on our Service."
                }
            ]
        },
        {
            icon: Lock,
            title: "2. How We Use Your Information",
            content: `We use the information we collect to:
            
• Provide, maintain, and improve our Service
• Process job applications and facilitate connections between candidates and employers
• Send you technical notices, updates, security alerts, and support messages
• Respond to your comments, questions, and customer service requests
• Communicate with you about products, services, offers, and events
• Monitor and analyze trends, usage, and activities in connection with our Service
• Detect, prevent, and address technical issues and fraudulent activities
• Comply with legal obligations and enforce our Terms of Service`
        },
        {
            icon: Share2,
            title: "3. Information Sharing and Disclosure",
            subsections: [
                {
                    subtitle: "With Employers",
                    text: "When you apply for a job, we share your application materials (resume, cover letter, contact information) with the respective employer."
                },
                {
                    subtitle: "With Service Providers",
                    text: "We may share your information with third-party service providers who perform services on our behalf, such as hosting, data analysis, payment processing, and customer service."
                },
                {
                    subtitle: "Legal Requirements",
                    text: "We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency)."
                },
                {
                    subtitle: "Business Transfers",
                    text: "If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction."
                }
            ]
        },
        {
            icon: UserCheck,
            title: "4. Your Rights and Choices",
            content: `You have the following rights regarding your personal information:

• **Access**: You can request access to the personal information we hold about you
• **Correction**: You can update or correct your information through your account settings
• **Deletion**: You can request deletion of your account and associated data
• **Opt-Out**: You can opt out of receiving promotional emails by following the unsubscribe link
• **Data Portability**: You can request a copy of your data in a structured, commonly used format
• **Restriction**: You can request that we restrict the processing of your personal information

To exercise these rights, please contact us at privacy@jobportal.com or through your account settings.`
        },
        {
            icon: Lock,
            title: "5. Data Security",
            content: `We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. However, no internet or email transmission is ever fully secure or error-free. Please take special care in deciding what information you send to us.

We use industry-standard encryption (SSL/TLS) to protect data in transit and encrypt sensitive data at rest. Our servers are hosted in secure facilities with restricted access.`
        },
        {
            title: "6. Data Retention",
            content: `We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law. When you delete your account, we will delete or anonymize your personal information within 30 days, except where we need to retain it for legal compliance.`
        },
        {
            title: "7. International Data Transfers",
            content: `Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ. By using our Service, you consent to the transfer of your information to the United States and other countries.`
        },
        {
            title: "8. Children's Privacy",
            content: `Our Service is not intended for children under the age of 16. We do not knowingly collect personal information from children under 16. If you are a parent or guardian and believe your child has provided us with personal information, please contact us so we can delete such information.`
        },
        {
            title: "9. Cookies and Tracking Technologies",
            content: `We use cookies, web beacons, and similar technologies to collect information about your browsing activities. You can control cookies through your browser settings. However, disabling cookies may affect your ability to use certain features of our Service.`
        },
        {
            title: "10. Third-Party Links",
            content: `Our Service may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to read their privacy policies before providing any personal information.`
        },
        {
            title: "11. Changes to This Privacy Policy",
            content: `We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.`
        },
        {
            title: "12. Contact Us",
            content: `If you have any questions about this Privacy Policy, please contact us at:

**Email**: privacy@jobportal.com
**Address**: 123 Business Street, San Francisco, CA 94105
**Phone**: +1 (555) 123-4567

You can also visit our Contact Us page for more ways to reach us.`
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-16">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-2xl mb-6">
                        <Shield className="text-white" size={36} />
                    </div>
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
                    <div className="flex items-center justify-center gap-2 text-gray-600">
                        <Calendar size={18} />
                        <p>Last Updated: {lastUpdated}</p>
                    </div>
                </div>

                {/* Notice Banner */}
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
                    <h3 className="font-bold text-gray-900 mb-2">Your Privacy Matters</h3>
                    <p className="text-gray-700 leading-relaxed">
                        At JobPortal, we take your privacy seriously. This policy explains how we collect, use, and protect your personal information. We are committed to transparency and giving you control over your data.
                    </p>
                </div>

                {/* Content */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12">
                    <div className="prose prose-lg max-w-none">
                        <p className="text-gray-600 leading-relaxed mb-8">
                            This Privacy Policy describes how JobPortal collects, uses, and discloses your personal information when you use our service. By using JobPortal, you agree to the collection and use of information in accordance with this policy.
                        </p>

                        <div className="space-y-10">
                            {sections.map((section, index) => (
                                <div key={index} className="border-l-4 border-[#10b981] pl-6">
                                    <div className="flex items-start gap-3 mb-4">
                                        {section.icon && (
                                            <div className="w-10 h-10 bg-[#10b981]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <section.icon className="text-[#10b981]" size={20} />
                                            </div>
                                        )}
                                        <h2 className="text-2xl font-bold text-gray-900 flex-1">{section.title}</h2>
                                    </div>
                                    {section.content && (
                                        <div className="text-gray-700 leading-relaxed mb-4 whitespace-pre-line">
                                            {section.content}
                                        </div>
                                    )}
                                    {section.subsections && (
                                        <div className="space-y-4">
                                            {section.subsections.map((subsection, subIndex) => (
                                                <div key={subIndex} className="ml-4 bg-gray-50 rounded-xl p-4 border border-gray-200">
                                                    <h3 className="font-bold text-gray-800 mb-2">{subsection.subtitle}</h3>
                                                    <p className="text-gray-700 leading-relaxed">{subsection.text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 p-6 bg-gradient-to-r from-[#10b981] to-[#059669] rounded-xl text-white">
                            <h3 className="font-bold text-xl mb-2">Questions About Your Privacy?</h3>
                            <p className="mb-4 opacity-90">
                                We're here to help. If you have any questions or concerns about this Privacy Policy or our data practices, please don't hesitate to reach out.
                            </p>
                            <a
                                href="/contact"
                                className="inline-block bg-white text-[#10b981] px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-shadow"
                            >
                                Contact Privacy Team
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
