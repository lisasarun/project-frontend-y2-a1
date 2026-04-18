"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import LogoGraphic from "./LogoGraphic";
import ElearnSymbol from "./ElearnSymbol";

type PlatformData = {
  brand: {
    name: string;
  };
  stats: Array<{
    value: string;
    label: string;
  }>;
  resources: string[];
  contact: {
    email: string;
    phone: string;
    hours: string;
  };
  footerNote: string;
};

const defaultPlatformData: PlatformData = {
  brand: {
    name: "E-Learn",
  },
  stats: [
    { value: "120+", label: "Lessons" },
    { value: "Expert", label: "Mentors" },
    { value: "Certificates", label: "Available" },
  ],
  resources: ["Learning Paths", "Certificates", "Student Support"],
  contact: {
    email: "support@elearn.com",
    phone: "+20 100 123 4567",
    hours: "Sun - Thu, 9:00 AM - 6:00 PM",
  },
  footerNote: "Built for a clean, modern, and professional learning experience.",
};

export default function Footer() {
  const [platform, setPlatform] = useState<PlatformData>(defaultPlatformData);

  useEffect(() => {
    let active = true;

    const loadPlatformData = async () => {
      try {
        const response = await fetch("/api/platform", { cache: "no-store" });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as PlatformData;

        if (active) {
          setPlatform(data);
        }
      } catch {
        // Keep fallback footer content when the API is unavailable.
      }
    };

    void loadPlatformData();

    return () => {
      active = false;
    };
  }, []);

  return (
    <footer className="relative mt-auto overflow-hidden text-slate-700 dark:text-slate-300">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950"></div>
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-40 dark:opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(99,102,241,0.15),transparent_40%)] dark:bg-[radial-gradient(circle_at_20%_50%,rgba(99,102,241,0.25),transparent_40%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(6,182,212,0.15),transparent_40%)] dark:bg-[radial-gradient(circle_at_80%_50%,rgba(6,182,212,0.25),transparent_40%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(168,85,247,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_100%,rgba(168,85,247,0.2),transparent_50%)]"></div>
      </div>

      {/* Top Border Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500"></div>

      {/* CTA Section */}
      <div className="relative border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-indigo-50/40 to-cyan-50/40 dark:from-indigo-950/20 dark:to-cyan-950/20">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <div className="flex-1">
              <p className="text-sm font-semibold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600 dark:from-indigo-400 dark:to-cyan-400">
                ✨ Ready to grow your skills?
              </p>
              <h2 className="mt-2 text-2xl font-bold leading-tight text-slate-900 dark:text-white sm:text-3xl lg:text-4xl">
                Start learning with a more professional e-learning experience
              </h2>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row sm:w-auto lg:flex-col lg:items-end">
              <Link
                href="/Courses"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-8 py-4 text-base font-semibold text-white shadow-xl transition-all duration-300 hover:from-indigo-700 hover:to-indigo-800 hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950"
              >
                Explore Courses
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-xl border-2 border-indigo-200 dark:border-indigo-500/40 bg-white dark:bg-indigo-950/30 px-8 py-4 text-base font-semibold text-indigo-700 dark:text-indigo-300 backdrop-blur-sm transition-all duration-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:border-indigo-400 dark:hover:border-indigo-400 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:ring-offset-2 dark:focus:ring-offset-slate-950"
              >
                Join Free
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 xl:gap-16">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6 group cursor-pointer">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:shadow-xl">
                <LogoGraphic />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 dark:from-indigo-400 dark:to-cyan-300 bg-clip-text text-transparent transition-all duration-300">{platform.brand.name}</h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-600 dark:text-slate-400 max-w-xs">
              A modern platform for learning programming, front-end development,
              and practical digital skills through guided lessons and projects.
            </p>

            <div className="flex flex-wrap gap-2">
              {platform.stats.map((item) => (
                <span
                  key={`${item.value}-${item.label}`}
                  className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-100 to-cyan-100 dark:from-indigo-950/50 dark:to-cyan-950/50 px-4 py-2 text-xs font-semibold text-indigo-700 dark:text-indigo-300 backdrop-blur-sm transition-all duration-300 hover:from-indigo-200 hover:to-cyan-200 dark:hover:from-indigo-900/70 dark:hover:to-cyan-900/70 hover:scale-105"
                >
                  ⭐ {item.value} {item.label}
                </span>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="h-1 w-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white">
                Platform
              </h3>
            </div>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/Courses", label: "Courses" },
                { href: "/instructors", label: "Instructors" },
                { href: "/blog", label: "Blog" },
                { href: "/pricing", label: "Pricing" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
                { href: "/dashboard", label: "Dashboard" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 dark:text-slate-400 transition-all duration-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:translate-x-1.5 inline-block font-medium"
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="h-1 w-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white">
                Resources
              </h3>
            </div>
            <ul className="space-y-3">
              {platform.resources.map((item) => (
                <li key={item}>
                  <span className="text-sm text-slate-600 dark:text-slate-400 transition-all duration-300 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer inline-block hover:translate-x-1.5 font-medium">
                    → {item}
                  </span>
                </li>
              ))}
              <li>
                <Link href="/help" className="text-sm text-slate-600 dark:text-slate-400 transition-all duration-300 hover:text-purple-600 dark:hover:text-purple-400 hover:translate-x-1.5 inline-block font-medium">
                  → Help Center
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-slate-600 dark:text-slate-400 transition-all duration-300 hover:text-purple-600 dark:hover:text-purple-400 hover:translate-x-1.5 inline-block font-medium">
                  → Learning Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="h-1 w-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white">
                Contact
              </h3>
            </div>
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400 mb-6">
              <p className="flex items-center gap-2 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-300 cursor-pointer">
                <svg className="h-4 w-4 text-cyan-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {platform.contact.email}
              </p>
              <p className="flex items-center gap-2 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-300 cursor-pointer">
                <svg className="h-4 w-4 text-cyan-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {platform.contact.phone}
              </p>
              <p className="flex items-center gap-2 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-300 cursor-pointer">
                <svg className="h-4 w-4 text-cyan-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {platform.contact.hours}
              </p>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-widest">Follow Us</h4>
              <div className="flex gap-3">
                {[
                  { icon: "f", label: "Facebook", href: "#", color: "from-blue-500 to-blue-600" },
                  { icon: "𝕏", label: "Twitter", href: "#", color: "from-slate-700 to-slate-800 dark:from-slate-400 dark:to-slate-500" },
                  { icon: "in", label: "LinkedIn", href: "#", color: "from-blue-600 to-blue-700" },
                  { icon: "📷", label: "Instagram", href: "#", color: "from-pink-500 to-purple-500" },
                  { icon: "▶", label: "YouTube", href: "#", color: "from-red-500 to-red-600" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${social.color} text-white font-bold transition-all duration-300 hover:scale-125 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-950 transform`}
                    title={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-slate-200 dark:border-slate-800 pt-10 sm:flex-row">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            © {new Date().getFullYear()} <span className="font-semibold text-indigo-600 dark:text-indigo-400">{platform.brand.name}</span>. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 dark:text-slate-400">
            <Link href="/privacy" className="transition-all duration-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">
              Privacy Policy
            </Link>
            <div className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700"></div>
            <Link href="/terms" className="transition-all duration-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">
              Terms of Service
            </Link>
            <div className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700"></div>
            <span className="text-slate-500 dark:text-slate-500">{platform.footerNote}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}