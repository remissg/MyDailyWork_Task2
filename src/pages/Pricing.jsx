import React, { useState } from 'react';
import { Check, X, Zap, TrendingUp, Crown, ArrowRight } from 'lucide-react';
import Button from '../components/Button';

const Pricing = () => {
    const [billingCycle, setBillingCycle] = useState('monthly');

    const pricingPlans = [
        {
            name: 'Starter',
            icon: Zap,
            tagline: 'Perfect for small businesses',
            monthlyPrice: 0,
            yearlyPrice: 0,
            description: 'Get started with basic job posting features',
            features: [
                { text: '1 active job posting', included: true },
                { text: '30-day listing duration', included: true },
                { text: 'Basic applicant tracking', included: true },
                { text: 'Email notifications', included: true },
                { text: 'Standard support', included: true },
                { text: 'Featured listing', included: false },
                { text: 'Priority placement', included: false },
                { text: 'Advanced analytics', included: false },
                { text: 'Dedicated account manager', included: false }
            ],
            popular: false,
            cta: 'Get Started Free'
        },
        {
            name: 'Professional',
            icon: TrendingUp,
            tagline: 'For growing companies',
            monthlyPrice: 99,
            yearlyPrice: 990,
            description: 'Enhanced features for active hiring',
            features: [
                { text: '10 active job postings', included: true },
                { text: '60-day listing duration', included: true },
                { text: 'Advanced applicant tracking', included: true },
                { text: 'Email & SMS notifications', included: true },
                { text: 'Priority support', included: true },
                { text: 'Featured listing (2 per month)', included: true },
                { text: 'Priority placement', included: true },
                { text: 'Advanced analytics', included: true },
                { text: 'Dedicated account manager', included: false }
            ],
            popular: true,
            cta: 'Start Free Trial'
        },
        {
            name: 'Enterprise',
            icon: Crown,
            tagline: 'For large organizations',
            monthlyPrice: 299,
            yearlyPrice: 2990,
            description: 'Full-featured solution with premium support',
            features: [
                { text: 'Unlimited job postings', included: true },
                { text: '90-day listing duration', included: true },
                { text: 'Enterprise applicant tracking', included: true },
                { text: 'Multi-channel notifications', included: true },
                { text: 'Premium 24/7 support', included: true },
                { text: 'Unlimited featured listings', included: true },
                { text: 'Top priority placement', included: true },
                { text: 'Advanced analytics & reporting', included: true },
                { text: 'Dedicated account manager', included: true }
            ],
            popular: false,
            cta: 'Contact Sales'
        }
    ];

    const getPrice = (plan) => {
        if (plan.monthlyPrice === 0) return 'Free';
        const price = billingCycle === 'monthly' ? plan.monthlyPrice : Math.floor(plan.yearlyPrice / 12);
        return `$${price}`;
    };

    const getSavings = (plan) => {
        if (plan.monthlyPrice === 0) return null;
        const monthlyCost = plan.monthlyPrice * 12;
        const savings = monthlyCost - plan.yearlyPrice;
        return savings;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-16">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">Pricing Plans</h1>
                    <p className="text-xl text-gray-600 mb-8">Choose the perfect plan for your hiring needs</p>

                    {/* Billing Toggle */}
                    <div className="inline-flex items-center gap-4 bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
                        <button
                            onClick={() => setBillingCycle('monthly')}
                            className={`px-6 py-3 rounded-xl font-semibold transition-all ${billingCycle === 'monthly'
                                    ? 'bg-[#10b981] text-white shadow-md'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingCycle('yearly')}
                            className={`px-6 py-3 rounded-xl font-semibold transition-all ${billingCycle === 'yearly'
                                    ? 'bg-[#10b981] text-white shadow-md'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Yearly
                            <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                Save up to 17%
                            </span>
                        </button>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {pricingPlans.map((plan, index) => {
                        const Icon = plan.icon;
                        const savings = getSavings(plan);

                        return (
                            <div
                                key={index}
                                className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all hover:shadow-2xl ${plan.popular
                                        ? 'border-[#10b981] scale-105 md:scale-110 z-10'
                                        : 'border-gray-200 hover:border-[#10b981]'
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-gradient-to-r from-[#10b981] to-[#059669] text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                                            Most Popular
                                        </span>
                                    </div>
                                )}

                                <div className="p-8">
                                    {/* Plan Header */}
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${plan.popular
                                                ? 'bg-gradient-to-br from-[#10b981] to-[#059669]'
                                                : 'bg-gray-100'
                                            }`}>
                                            <Icon className={plan.popular ? 'text-white' : 'text-gray-600'} size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                                            <p className="text-sm text-gray-500">{plan.tagline}</p>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 mb-6">{plan.description}</p>

                                    {/* Price */}
                                    <div className="mb-6">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-5xl font-bold text-gray-900">
                                                {getPrice(plan)}
                                            </span>
                                            {plan.monthlyPrice > 0 && (
                                                <span className="text-gray-500">
                                                    /{billingCycle === 'monthly' ? 'month' : 'month'}
                                                </span>
                                            )}
                                        </div>
                                        {billingCycle === 'yearly' && savings > 0 && (
                                            <p className="text-sm text-green-600 font-semibold mt-2">
                                                Save ${savings}/year
                                            </p>
                                        )}
                                        {billingCycle === 'yearly' && plan.monthlyPrice > 0 && (
                                            <p className="text-sm text-gray-500 mt-1">
                                                Billed ${plan.yearlyPrice} annually
                                            </p>
                                        )}
                                    </div>

                                    {/* CTA Button */}
                                    <Button
                                        className={`w-full mb-8 flex items-center justify-center gap-2 ${plan.popular ? 'shadow-lg shadow-green-500/30' : ''
                                            }`}
                                    >
                                        {plan.cta}
                                        <ArrowRight size={18} />
                                    </Button>

                                    {/* Features List */}
                                    <div className="space-y-4">
                                        <p className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                                            What's included:
                                        </p>
                                        <ul className="space-y-3">
                                            {plan.features.map((feature, featureIndex) => (
                                                <li key={featureIndex} className="flex items-start gap-3">
                                                    {feature.included ? (
                                                        <Check className="text-[#10b981] flex-shrink-0 mt-0.5" size={20} />
                                                    ) : (
                                                        <X className="text-gray-300 flex-shrink-0 mt-0.5" size={20} />
                                                    )}
                                                    <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                                                        {feature.text}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* FAQ Section */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12 mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-bold text-gray-900 mb-2">Can I change plans later?</h3>
                            <p className="text-gray-600">
                                Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate your billing accordingly.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 mb-2">Is there a free trial?</h3>
                            <p className="text-gray-600">
                                Professional and Enterprise plans come with a 14-day free trial. No credit card required to start.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 mb-2">What payment methods do you accept?</h3>
                            <p className="text-gray-600">
                                We accept all major credit cards (Visa, MasterCard, American Express) and PayPal for annual subscriptions.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 mb-2">Can I cancel anytime?</h3>
                            <p className="text-gray-600">
                                Absolutely. You can cancel your subscription at any time. Your account will remain active until the end of your billing period.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact CTA */}
                <div className="bg-gradient-to-r from-[#10b981] to-[#059669] rounded-2xl p-12 text-white text-center">
                    <h3 className="text-3xl font-bold mb-4">Need a custom plan?</h3>
                    <p className="text-lg mb-6 opacity-90">
                        We offer customized solutions for enterprises and large-scale hiring needs.
                    </p>
                    <a
                        href="/contact"
                        className="inline-block bg-white text-[#10b981] px-8 py-3 rounded-xl font-semibold hover:shadow-xl transition-shadow"
                    >
                        Contact Our Sales Team
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
