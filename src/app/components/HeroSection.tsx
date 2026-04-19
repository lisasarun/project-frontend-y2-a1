"use client";

import { useEffect, useState } from "react";

type HeroData = {
  banner: {
    badge: string;
    title: string;
    description: string;
  };
  stats: Array<{
    value: string;
    label: string;
  }>;
  featuredCourses?: Array<{
    id: number;
    title: string;
    lessons: string;
  }>;
};

const defaultHeroData: HeroData = {
  banner: {
    badge: "Distance Learning Education Center",
    title: "Our online courses are designed to fit your industry supporting all-round with latest technologies.",
    description:
      "Professional remote lessons with clear structure, modern design, and real career-focused outcomes.",
  },
  stats: [
    { value: "120+", label: "video lessons" },
    { value: "24+", label: "hands-on projects" },
    { value: "4.8/5", label: "student rating" },
  ],
  featuredCourses: [
    { id: 2, title: "React Development", lessons: "18 lessons" },
    { id: 1, title: "C++ Basics", lessons: "14 lessons" },
  ],
};

export default function HeroSection() {
  const [heroData, setHeroData] = useState<HeroData>(defaultHeroData);

  useEffect(() => {
    let active = true;

    const loadHeroData = async () => {
      try {
        const response = await fetch("/api/platform", { cache: "no-store" });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as HeroData;

        if (active) {
          setHeroData(data);
        }
      } catch {
        // Keep fallback hero data when the API is unavailable.
      }
    };

    void loadHeroData();

    return () => {
      active = false;
    };
  }, []);

  const featuredCourses =
    heroData.featuredCourses ?? defaultHeroData.featuredCourses ?? [];

  return (
    <section className="relative overflow-hidden bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50 py-16 sm:py-20 lg:py-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] xl:gap-16">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm dark:bg-slate-800 dark:text-emerald-200">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {heroData.banner.badge}
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-tight text-slate-900 dark:text-slate-100 sm:text-5xl lg:text-6xl">
              Distance Learning
              <span className="block text-emerald-600 dark:text-emerald-300">Education Center</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg lg:mx-0">
              {heroData.banner.title}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <a
                href="/Courses"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
              >
                Discover more
              </a>
              <a
                href="/Courses"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-4 text-lg font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-2"
              >
                Browse courses
              </a>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {heroData.stats.map((item, index) => (
                <div key={index} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
                  <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">{item.value}</p>
                  <p className="mt-3 text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div
              className="relative overflow-hidden rounded-[40px] border border-slate-200 shadow-2xl min-h-130"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(15,23,42,0.2), rgba(15,23,42,0.18)), url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-slate-950/20" />
              <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-10">
                <div className="rounded-[28px] border border-white/20 bg-white/85 p-6 shadow-xl backdrop-blur-xl max-w-sm">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Live academy</p>
                  <h2 className="mt-3 text-2xl font-semibold text-slate-900">Professional mentors</h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    Learn from certified experts via project-based training and flexible schedules.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[28px] bg-white/90 p-5 text-slate-900 shadow-xl backdrop-blur-xl">
                    <p className="text-sm font-semibold">Trusted Content</p>
                    <p className="mt-2 text-sm text-slate-600">Curated lessons for real-world skills.</p>
                  </div>
                  <div className="rounded-[28px] bg-white/90 p-5 text-slate-900 shadow-xl backdrop-blur-xl">
                    <p className="text-sm font-semibold">Certification</p>
                    <p className="mt-2 text-sm text-slate-600">Earn shareable certificates after completion.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
