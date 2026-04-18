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
    <footer className="relative mt-auto overflow-hidden bg-slate-950 text-slate-300">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.1),transparent_50%)] bg-[radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.1),transparent_50%)]"></div>

      {/* CTA Section */}
      <div className="relative border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <div className="flex-1">
              <p className="text-sm font-semibold uppercase tracking-wider text-cyan-300">
                Ready to grow your skills?
              </p>
              <h2 className="mt-2 text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
                Start learning with a more professional e-learning experience
              </h2>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row sm:w-auto lg:flex-col lg:items-end">
              <Link
                href="/Courses"
                className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-4 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:bg-indigo-700 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                Explore Courses
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/10 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                Join Free
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 xl:gap-12">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900/5 shadow-lg">
                <LogoGraphic />
              </div>
              <h2 className="text-2xl font-bold text-white">{platform.brand.name}</h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-400 max-w-xs">
              A modern platform for learning programming, front-end development,
              and practical digital skills through guided lessons and projects.
            </p>

            <div className="flex flex-wrap gap-2">
              {platform.stats.map((item) => (
                <span
                  key={`${item.value}-${item.label}`}
                  className="inline-flex items-center rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-slate-200 backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                  {item.value} {item.label}
                </span>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Platform
            </h3>
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
                    className="text-sm text-slate-400 transition-colors duration-200 hover:text-white hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {platform.resources.map((item) => (
                <li key={item}>
                  <span className="text-sm text-slate-400 transition-colors duration-200 hover:text-white cursor-pointer inline-block hover:translate-x-1">
                    {item}
                  </span>
                </li>
              ))}
              <li>
                <Link href="/help" className="text-sm text-slate-400 transition-colors duration-200 hover:text-white hover:translate-x-1 inline-block">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-slate-400 transition-colors duration-200 hover:text-white hover:translate-x-1 inline-block">
                  Learning Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Contact
            </h3>
            <div className="space-y-3 text-sm text-slate-400">
              <p className="flex items-center gap-2">
                <svg className="h-4 w-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {platform.contact.email}
              </p>
              <p className="flex items-center gap-2">
                <svg className="h-4 w-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {platform.contact.phone}
              </p>
              <p className="flex items-center gap-2">
                <svg className="h-4 w-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {platform.contact.hours}
              </p>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-white mb-3">Follow Us</h4>
              <div className="flex gap-3">
                {[
                  { icon: <ElearnSymbol className="h-5 w-5" />, label: "Facebook", href: "#" },
                  { icon: <ElearnSymbol className="h-5 w-5" />, label: "Twitter", href: "#" },
                  { icon: <ElearnSymbol className="h-5 w-5" />, label: "LinkedIn", href: "#" },
                  { icon: <ElearnSymbol className="h-5 w-5" />, label: "Instagram", href: "#" },
                  { icon: <ElearnSymbol className="h-5 w-5" />, label: "YouTube", href: "#" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-lg transition-all duration-200 hover:bg-white/20 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} {platform.brand.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
            <Link href="/privacy" className="transition-colors hover:text-slate-400">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-slate-400">
              Terms of Service
            </Link>
            <span className="text-slate-600">{platform.footerNote}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}