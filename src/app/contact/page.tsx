"use client";

import { useState } from "react";
import ElearnSymbol from "../components/ElearnSymbol";
import Footer from "../components/Footer";

const contactMethods = [
  {
    title: "Email Us",
    description: "Get in touch via email",
    contact: "support@elearn.com",
    action: "mailto:support@elearn.com"
  },
  {
    title: "Live Chat",
    description: "Chat with our support team",
    contact: "Available 24/7",
    action: "#"
  },
  {
    title: "Call Us",
    description: "Speak with our experts",
    contact: "+20 100 123 4567",
    action: "tel:+201001234567"
  },
  {
    title: "Help Center",
    description: "Find answers instantly",
    contact: "Browse FAQs",
    action: "/help"
  }
];

const offices = [
  {
    city: "Cairo",
    country: "Egypt",
    address: "123 Learning Street, Downtown Cairo",
    phone: "+20 100 123 4567"
  },
  {
    city: "Alexandria",
    country: "Egypt",
    address: "456 Knowledge Avenue, Alexandria",
    phone: "+20 101 987 6543"
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });

    // Reset success message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-600 dark:from-indigo-900 dark:via-purple-900 dark:to-cyan-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              Get in Touch
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-indigo-100">
              Have questions about our courses? Need help with your learning journey?
              We're here to help you succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.action}
                className="group rounded-xl border border-slate-200 bg-slate-50 p-6 text-center transition hover:border-indigo-300 hover:bg-indigo-50 hover:shadow-lg"
              >
                <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-indigo-50">
                <ElearnSymbol className="h-8 w-8 text-indigo-600" />
              </div>
                <h3 className="mt-4 text-xl font-bold text-slate-900">{method.title}</h3>
                <p className="mt-2 text-slate-600">{method.description}</p>
                <p className="mt-3 font-semibold text-indigo-600 group-hover:text-indigo-700">
                  {method.contact}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Send us a Message</h2>
              <p className="mt-4 text-lg text-slate-600">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="billing">Billing & Payments</option>
                    <option value="courses">Course Content</option>
                    <option value="partnership">Partnership Opportunities</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-indigo-600 px-6 py-3 text-lg font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>

                {submitted && (
                  <div className="rounded-lg bg-green-50 p-4 text-green-800">
                    <div className="flex">
                      <div className="text-sm font-medium">
                        ✅ Message sent successfully! We'll get back to you soon.
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Contact Information</h2>
              <p className="mt-4 text-lg text-slate-600">
                Prefer to reach out directly? Here are all the ways to get in touch with our team.
              </p>

              {/* Office Locations */}
              <div className="mt-8">
                <h3 className="text-xl font-bold text-slate-900">Our Offices</h3>
                <div className="mt-6 space-y-6">
                  {offices.map((office, index) => (
                    <div key={index} className="rounded-lg border border-slate-200 bg-white p-6">
                      <h4 className="text-lg font-bold text-slate-900">
                        {office.city}, {office.country}
                      </h4>
                      <p className="mt-2 text-slate-600">{office.address}</p>
                      <p className="mt-1 text-slate-600">{office.phone}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Hours */}
              <div className="mt-8">
                <h3 className="text-xl font-bold text-slate-900">Business Hours</h3>
                <div className="mt-4 space-y-2 text-slate-600">
                  <p><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM EST</p>
                  <p><strong>Saturday:</strong> 10:00 AM - 4:00 PM EST</p>
                  <p><strong>Sunday:</strong> Closed</p>
                  <p className="mt-4 text-sm">
                    <strong>24/7 Support:</strong> Available for urgent technical issues
                  </p>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <h3 className="text-xl font-bold text-slate-900">Follow Us</h3>
                <div className="mt-4 flex gap-4">
                  <a href="#" className="text-2xl text-slate-400 hover:text-indigo-600 transition">
                    <ElearnSymbol className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-2xl text-slate-400 hover:text-indigo-600 transition">
                    <ElearnSymbol className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-2xl text-slate-400 hover:text-indigo-600 transition">
                    <ElearnSymbol className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-2xl text-slate-400 hover:text-indigo-600 transition">
                    <ElearnSymbol className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}