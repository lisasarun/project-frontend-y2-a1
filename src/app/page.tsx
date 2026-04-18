import HeroSection from "./components/HeroSection";
import CourseCard from "./components/CourseCard";
import ElearnSymbol from "./components/ElearnSymbol";
import Link from "next/link";
import { courseCategories, getFeaturedCourses } from "@/lib/elearn-data";

const stats = [
  {
    number: "01",
    title: "Trending Courses",
    description: "Known is free education HTML Bootstrap Template. You can modify it any way and use this for your website."
  },
  {
    number: "02",
    title: "Books & Library",
    description: "You are allowed to use Known HTML Template for your commercial or non-commercial websites."
  },
  {
    number: "03",
    title: "Certified Teachers",
    description: "Please spread a word about us. Template redistribution is NOT allowed on any download website."
  }
];

const features = [
  {
    title: "Personalized Learning",
    description: "AI-powered recommendations tailored to your goals and skill level."
  },
  {
    title: "Learn Anywhere",
    description: "Access courses on any device with our mobile-first platform."
  },
  {
    title: "Earn Certificates",
    description: "Get recognized for your achievements with industry-recognized certificates."
  },
  {
    title: "Community Support",
    description: "Connect with fellow learners and instructors in our vibrant community."
  }
];

export default function Home() {
  const featuredCourses = getFeaturedCourses(3);

  return (
    <>
      <HeroSection />

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-2">
              Explore by category
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Find the right learning path for your goals
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {courseCategories.map((category) => (
              <Link
                key={category.name}
                href={`/Courses?category=${encodeURIComponent(category.name)}`}
                className="group rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-indigo-50 text-2xl">
                  {category.icon}
                </div>
                <div className="mt-5">
                  <p className="text-lg font-semibold text-slate-900">{category.name}</p>
                  <p className="mt-2 text-sm text-slate-500">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Intro Cards Section */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {stats.map((stat, index) => (
              <div key={index} className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-lg font-semibold text-white mb-4">
                  {stat.number}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{stat.title}</h3>
                <p className="text-slate-600 leading-relaxed">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-2">Featured programs</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Popular learning paths
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Start with our most popular courses, handpicked by our expert instructors.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCourses.map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                level={course.level}
                category={course.category}
                price={course.price}
                image={course.image}
                description={course.description}
                track={course.track}
                duration={course.duration}
                lessons={course.lessons}
                mentor={course.mentor}
                rating={course.rating}
                learners={course.learners}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/Courses"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:bg-indigo-700 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              View All Courses
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Why Choose E-Learn?
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
              We're not just another learning platform. We're your partner in professional growth,
              combining cutting-edge technology with proven educational methods.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div key={index} className="group text-center p-6 rounded-xl hover:bg-slate-50 transition-all duration-200 hover:shadow-lg">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-linear-to-br from-indigo-100 to-cyan-100 mb-6 group-hover:scale-110 transition-transform duration-200">
                  <ElearnSymbol className="h-10 w-10 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-linear-to-br from-indigo-600 via-purple-600 to-cyan-600 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Career?
          </h2>
          <p className="text-lg sm:text-xl text-indigo-100 mb-8">
            Join thousands of professionals who are advancing their careers with E-Learn.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-indigo-600 shadow-lg transition-all duration-200 hover:bg-indigo-50 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Start Learning Free
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/20 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
