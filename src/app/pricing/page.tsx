"use client";

import { useState } from "react";
import Link from "next/link";
import ElearnSymbol from "../components/ElearnSymbol";
import Footer from "../components/Footer";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying out our platform",
    features: [
      "Access to 5 free courses",
      "Basic learning paths",
      "Community forum access",
      "Mobile app access",
      "Certificate of completion",
      "Email support"
    ],
    limitations: [
      "Limited course access",
      "No advanced features",
      "Basic support only"
    ],
    popular: false,
    buttonText: "Get Started Free",
    buttonLink: "/register"
  },
  {
    name: "Pro",
    price: "$29",
    period: "per month",
    description: "Ideal for serious learners and professionals",
    features: [
      "Unlimited course access",
      "Advanced learning paths",
      "Priority support",
      "Downloadable resources",
      "Progress tracking & analytics",
      "Offline viewing",
      "Interactive quizzes",
      "Certificate of completion",
      "Discussion forums",
      "Live Q&A sessions"
    ],
    limitations: [],
    popular: true,
    buttonText: "Start Pro Trial",
    buttonLink: "/register?plan=pro"
  },
  {
    name: "Team",
    price: "$49",
    period: "per user/month",
    description: "Perfect for organizations and teams",
    features: [
      "Everything in Pro",
      "Team management dashboard",
      "Custom learning paths",
      "Advanced analytics & reporting",
      "API access",
      "White-label options",
      "Dedicated account manager",
      "Custom integrations",
      "Bulk enrollment",
      "Priority phone support"
    ],
    limitations: [
      "Minimum 5 users required"
    ],
    popular: false,
    buttonText: "Contact Sales",
    buttonLink: "/contact?subject=team"
  }
];

const faqs = [
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes, you can cancel your subscription at any time. You'll continue to have access to your courses until the end of your billing period."
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team for a full refund."
  },
  {
    question: "Can I change my plan?",
    answer: "Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate the billing."
  },
  {
    question: "Do you offer student discounts?",
    answer: "Yes! Students with a valid student ID can get 50% off our Pro plan. Contact our support team to apply for the student discount."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual plans."
  },
  {
    question: "Is there a free trial?",
    answer: "Yes! Our Pro plan comes with a 14-day free trial. No credit card required to start. You can cancel anytime during the trial period."
  }
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <>
      
      {/* Hero Section */}
      <section className="bg-linear-to-br from-indigo-600 via-purple-600 to-cyan-600 text-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="text-center">
            <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10">
              <ElearnSymbol className="h-10 w-10" />
            </div>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              Choose Your Learning Journey
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-indigo-100">
              Unlock your potential with our flexible pricing plans. Start free and upgrade as you grow.
            </p>
          </div>
        </div>
      </section>

      {/* Billing Toggle */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-4 rounded-full bg-slate-100 dark:bg-slate-800 p-1">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`rounded-full px-6 py-2 text-sm font-medium transition ${
                  billingCycle === "monthly"
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`rounded-full px-6 py-2 text-sm font-medium transition ${
                  billingCycle === "yearly"
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Yearly
                <span className="ml-2 rounded-full bg-green-500 px-2 py-0.5 text-xs text-white">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl bg-white p-8 shadow-sm border transition hover:shadow-lg ${
                  plan.popular ? "border-indigo-500 ring-2 ring-indigo-500" : "border-slate-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-indigo-500 px-4 py-1 text-sm font-semibold text-white">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center">
                  <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-indigo-50">
                    <ElearnSymbol className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">{plan.name}</h3>
                  <div className="mt-4">
                    <span className="text-5xl font-bold text-slate-900">
                      {billingCycle === "yearly" && plan.name !== "Free"
                        ? `$${Math.round(parseInt(plan.price.slice(1)) * 12 * 0.8)}`
                        : plan.price
                      }
                    </span>
                    <span className="text-slate-500">
                      {plan.name === "Free" ? "" : billingCycle === "yearly" ? "/year" : `/${plan.period}`}
                    </span>
                  </div>
                  <p className="mt-2 text-slate-600">{plan.description}</p>
                </div>

                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <div className="text-green-500">✓</div>
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                  {plan.limitations.map((limitation, limitationIndex) => (
                    <li key={limitationIndex} className="flex items-center gap-3">
                      <div className="text-slate-400">✗</div>
                      <span className="text-slate-500">{limitation}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Link
                    href={plan.buttonLink}
                    className={`block w-full rounded-lg py-3 text-center text-lg font-semibold transition ${
                      plan.popular
                        ? "bg-indigo-600 text-white hover:bg-indigo-700"
                        : "bg-slate-900 text-white hover:bg-slate-800"
                    }`}
                  >
                    {plan.buttonText}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Compare Plans</h2>
            <p className="mt-4 text-xl text-slate-600">
              See what's included in each plan at a glance.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-4 pr-8 font-semibold text-slate-900">Features</th>
                  <th className="py-4 px-4 text-center font-semibold text-slate-900">Free</th>
                  <th className="py-4 px-4 text-center font-semibold text-slate-900">Pro</th>
                  <th className="py-4 px-4 text-center font-semibold text-slate-900">Team</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="py-4 pr-8 font-medium text-slate-900">Course Access</td>
                  <td className="py-4 px-4 text-center text-slate-600">5 courses</td>
                  <td className="py-4 px-4 text-center text-green-600">✓ Unlimited</td>
                  <td className="py-4 px-4 text-center text-green-600">✓ Unlimited</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-4 pr-8 font-medium text-slate-900">Certificates</td>
                  <td className="py-4 px-4 text-center text-green-600">✓</td>
                  <td className="py-4 px-4 text-center text-green-600">✓</td>
                  <td className="py-4 px-4 text-center text-green-600">✓</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-4 pr-8 font-medium text-slate-900">Progress Tracking</td>
                  <td className="py-4 px-4 text-center text-slate-400">✗</td>
                  <td className="py-4 px-4 text-center text-green-600">✓</td>
                  <td className="py-4 px-4 text-center text-green-600">✓</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-4 pr-8 font-medium text-slate-900">Live Support</td>
                  <td className="py-4 px-4 text-center text-slate-400">✗</td>
                  <td className="py-4 px-4 text-center text-green-600">✓</td>
                  <td className="py-4 px-4 text-center text-green-600">✓ Priority</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-4 pr-8 font-medium text-slate-900">Team Management</td>
                  <td className="py-4 px-4 text-center text-slate-400">✗</td>
                  <td className="py-4 px-4 text-center text-slate-400">✗</td>
                  <td className="py-4 px-4 text-center text-green-600">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
            <p className="mt-4 text-xl text-slate-600">
              Got questions? We've got answers.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="rounded-lg border border-slate-200 bg-white">
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <span className="text-lg font-semibold text-slate-900">{faq.question}</span>
                  <span className="text-2xl text-slate-400">
                    {expandedFaq === index ? "−" : "+"}
                  </span>
                </button>
                {expandedFaq === index && (
                  <div className="border-t border-slate-200 px-6 pb-6">
                    <p className="pt-4 text-slate-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Ready to Start Learning?
          </h2>
          <p className="mt-4 text-xl text-indigo-100">
            Join thousands of learners already improving their skills with E-Learn.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/register"
              className="rounded-lg bg-white px-8 py-3 text-lg font-semibold text-indigo-600 transition hover:bg-indigo-50"
            >
              Start Free Trial
            </Link>
            <Link
              href="/Courses"
              className="rounded-lg border border-white/20 bg-white/10 px-8 py-3 text-lg font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}