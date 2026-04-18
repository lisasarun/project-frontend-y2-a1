"use client";

import Link from "next/link";
import ElearnSymbol from "../components/ElearnSymbol";
import Footer from "../components/Footer";

const stats = [
  { number: "10,000+", label: "Active Learners" },
  { number: "500+", label: "Expert Instructors" },
  { number: "1,200+", label: "Courses Available" },
  { number: "95%", label: "Completion Rate" },
];

const values = [
  {
    title: "Excellence",
    description: "We strive for the highest quality in education and user experience."
  },
  {
    title: "Community",
    description: "Building a supportive learning community where everyone can thrive."
  },
  {
    title: "Innovation",
    description: "Continuously evolving our platform with cutting-edge technology."
  },
  {
    title: "Accessibility",
    description: "Making quality education accessible to learners worldwide."
  }
];

const team = [
  {
    name: "Sarah Johnson",
    role: "CEO & Co-Founder",
    image: "👩‍💼",
    bio: "Former tech executive with 15+ years in education technology."
  },
  {
    name: "Michael Chen",
    role: "CTO & Co-Founder",
    image: "👨‍💻",
    bio: "Full-stack developer and AI specialist with extensive platform experience."
  },
  {
    name: "Dr. Emily Rodriguez",
    role: "Head of Education",
    image: "👩‍🏫",
    bio: "PhD in Education Technology, passionate about innovative learning methods."
  },
  {
    name: "David Kim",
    role: "Head of Product",
    image: "👨‍🎨",
    bio: "Product designer focused on creating intuitive learning experiences."
  }
];

export default function AboutPage() {
  return (
    <>
      
      {/* Hero Section */}
      <section className="bg-linear-to-br from-indigo-600 via-purple-600 to-cyan-600 text-white">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold leading-tight md:text-6xl">
              Empowering the Next Generation
              <span className="block text-cyan-200">of Digital Learners</span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-indigo-100">
              We're on a mission to democratize education through innovative technology,
              making high-quality learning accessible to everyone, everywhere.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white dark:bg-slate-900 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-indigo-600">{stat.number}</div>
                <div className="mt-2 text-lg font-semibold text-slate-900">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900">Our Story</h2>
              <div className="mt-6 space-y-6 text-lg leading-relaxed text-slate-600">
                <p>
                  Founded in 2020, E-Learn emerged from a simple observation: traditional
                  education wasn't keeping pace with the rapidly evolving digital landscape.
                  Our founders, frustrated with outdated learning methods, set out to create
                  a platform that combines the best of modern technology with proven educational principles.
                </p>
                <p>
                  What started as a small team of passionate educators and developers has
                  grown into a global community of learners and instructors. We've helped
                  thousands of students transition into successful careers in technology,
                  design, and digital marketing.
                </p>
                <p>
                  Today, we're proud to offer a comprehensive learning ecosystem that
                  adapts to each student's unique learning style, pace, and goals.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-linear-to-br from-indigo-500 to-cyan-500 p-8">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center text-white">
                    <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10">
                      <ElearnSymbol className="h-10 w-10" />
                    </div>
                    <div className="mt-4 text-2xl font-bold">Innovation</div>
                    <div className="mt-2 text-lg">Driving the future of education</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="bg-white dark:bg-slate-900 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-slate-900">Our Values</h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-slate-600">
              The principles that guide everything we do and shape our learning community.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
                  <ElearnSymbol className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-900">{value.title}</h3>
                <p className="mt-3 text-slate-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-slate-900">Meet Our Team</h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-slate-600">
              The passionate individuals behind E-Learn, dedicated to transforming education.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 to-cyan-500">
                  <ElearnSymbol className="h-10 w-10 text-white" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-900">{member.name}</h3>
                <p className="mt-1 text-indigo-600">{member.role}</p>
                <p className="mt-3 text-sm text-slate-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 dark:bg-indigo-900 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Ready to Join Our Learning Community?
          </h2>
          <p className="mt-4 text-xl text-indigo-100">
            Start your journey today and discover why thousands of learners choose E-Learn.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/register"
              className="rounded-lg bg-white px-8 py-3 text-lg font-semibold text-indigo-600 transition hover:bg-indigo-50"
            >
              Get Started Free
            </Link>
            <Link
              href="/Courses"
              className="rounded-lg border border-white/20 bg-white/10 px-8 py-3 text-lg font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              Explore Courses
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}