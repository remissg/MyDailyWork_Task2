import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import InputField from '../components/InputField';
import Button from '../components/Button';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        userType: 'candidate',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        // Validation
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            setStatus({ type: 'error', message: 'Please fill in all required fields.' });
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus({ type: 'success', message: 'Thank you for contacting us! We\'ll get back to you within 24-48 hours.' });
                setFormData({
                    name: '',
                    email: '',
                    userType: 'candidate',
                    subject: '',
                    message: ''
                });
            } else {
                setStatus({ type: 'error', message: 'Something went wrong. Please try again later.' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Unable to send message. Please try again later.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-16">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">Contact Us</h1>
                    <p className="text-xl text-gray-600">We'd love to hear from you. Get in touch with our team.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div className="bg-gradient-to-br from-[#10b981] to-[#059669] rounded-2xl p-8 text-white">
                            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
                            <p className="text-lg opacity-90 mb-8">
                                Have a question or need assistance? Our support team is here to help you succeed.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1">Email</h3>
                                        <p className="opacity-90">support@jobportal.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1">Phone</h3>
                                        <p className="opacity-90">+1 (555) 123-4567</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1">Address</h3>
                                        <p className="opacity-90">123 Business Street<br />San Francisco, CA 94105</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <AlertCircle className="text-blue-600" size={20} />
                                Business Hours
                            </h3>
                            <div className="space-y-2 text-gray-700">
                                <p><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM (PST)</p>
                                <p><strong>Saturday - Sunday:</strong> Closed</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>

                        {status.message && (
                            <div className={`mb-6 p-4 rounded-xl flex items-start gap-3 ${status.type === 'success'
                                    ? 'bg-green-50 border border-green-200 text-green-800'
                                    : 'bg-red-50 border border-red-200 text-red-800'
                                }`}>
                                {status.type === 'success' ? (
                                    <CheckCircle className="flex-shrink-0 mt-0.5" size={20} />
                                ) : (
                                    <AlertCircle className="flex-shrink-0 mt-0.5" size={20} />
                                )}
                                <p>{status.message}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <InputField
                                label="Full Name"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                required
                            />

                            <InputField
                                label="Email Address"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="john@example.com"
                                required
                            />

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    I am a
                                </label>
                                <select
                                    name="userType"
                                    value={formData.userType}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#10b981] focus:outline-none transition-colors"
                                >
                                    <option value="candidate">Job Seeker</option>
                                    <option value="employer">Employer</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <InputField
                                label="Subject"
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="How can we help?"
                                required
                            />

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="5"
                                    placeholder="Tell us more about your inquiry..."
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#10b981] focus:outline-none transition-colors resize-none"
                                ></textarea>
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? 'Sending...' : (
                                    <>
                                        <Send size={18} />
                                        Send Message
                                    </>
                                )}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
