"use client";

import { useState } from "react";
import Link from "next/link";
import ElearnSymbol from "../components/ElearnSymbol";
import Footer from "../components/Footer";

const instructors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "Senior Software Engineer at Google",
    avatar: "👩‍💻",
    specialty: "Full-Stack Development",
    experience: "8+ years",
    students: "2,500+",
    rating: "4.9",
    courses: 12,
    bio: "Sarah has been developing software for over 8 years, with expertise in React, Node.js, and cloud architecture. She loves teaching practical coding skills that students can immediately apply in their careers.",
    skills: ["React", "Node.js", "TypeScript", "AWS", "Python"],
    achievements: ["Google Developer Expert", "Published Author", "Conference Speaker"]
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Lead UX Designer at Adobe",
    avatar: "👨‍🎨",
    specialty: "UI/UX Design",
    experience: "10+ years",
    students: "3,200+",
    rating: "4.8",
    courses: 8,
    bio: "Michael brings a decade of experience in user experience design, having worked with Fortune 500 companies. His courses focus on creating intuitive, beautiful interfaces that users love.",
    skills: ["Figma", "Sketch", "Adobe XD", "Prototyping", "Design Systems"],
    achievements: ["Adobe Certified Expert", "Design Award Winner", "Mentor"]
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    title: "Data Science Professor",
    avatar: "👩‍🏫",
    specialty: "Data Science & Machine Learning",
    experience: "12+ years",
    students: "4,100+",
    rating: "4.9",
    courses: 15,
    bio: "Emily holds a PhD in Computer Science and specializes in machine learning and data analysis. She makes complex concepts accessible through clear explanations and hands-on projects.",
    skills: ["Python", "TensorFlow", "Pandas", "SQL", "Statistics"],
    achievements: ["PhD in CS", "Published Researcher", "Industry Consultant"]
  },
  {
    id: 4,
    name: "David Kim",
    title: "DevOps Engineer at Netflix",
    avatar: "👨‍🔧",
    specialty: "DevOps & Cloud Computing",
    experience: "7+ years",
    students: "1,800+",
    rating: "4.7",
    courses: 6,
    bio: "David specializes in scalable infrastructure and automation. His courses teach students how to build and maintain robust, high-performance systems in the cloud.",
    skills: ["Docker", "Kubernetes", "AWS", "Terraform", "CI/CD"],
    achievements: ["AWS Certified", "Open Source Contributor", "Tech Blogger"]
  },
  {
    id: 5,
    name: "Lisa Thompson",
    title: "Product Manager at Spotify",
    avatar: "👩‍💼",
    specialty: "Product Management",
    experience: "9+ years",
    students: "2,900+",
    rating: "4.8",
    courses: 9,
    bio: "Lisa has led product teams at major tech companies. She teaches the art and science of product management, from ideation to launch and beyond.",
    skills: ["Product Strategy", "Analytics", "Agile", "User Research", "Roadmapping"],
    achievements: ["MBA Graduate", "Product Launch Expert", "Mentor"]
  },
  {
    id: 6,
    name: "Alex Rodriguez",
    title: "Cybersecurity Expert",
    avatar: "👨‍🛡️",
    specialty: "Cybersecurity",
    experience: "11+ years",
    students: "2,200+",
    rating: "4.9",
    courses: 7,
    bio: "Alex is a certified cybersecurity professional with extensive experience in threat analysis and security architecture. He teaches practical security skills for the modern digital world.",
    skills: ["Network Security", "Ethical Hacking", "Risk Assessment", "Compliance", "Incident Response"],
    achievements: ["CISSP Certified", "Security Consultant", "Author"]
  }
];

const specialties = ["All", "Full-Stack Development", "UI/UX Design", "Data Science & Machine Learning", "DevOps & Cloud Computing", "Product Management", "Cybersecurity"];

export default function InstructorsPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");

  const filteredInstructors = selectedSpecialty === "All"
    ? instructors
    : instructors.filter(instructor => instructor.specialty === selectedSpecialty);

  return (
    <>
      
      {/* Hero Section */}
      <section className="bg-linear-to-br from-indigo-600 via-purple-600 to-cyan-600 text-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              Meet Our Expert Instructors
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-indigo-100">
              Learn from industry professionals with years of real-world experience.
              Our instructors are passionate about sharing their knowledge and helping you succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-wrap gap-3">
            {specialties.map((specialty) => (
              <button
                key={specialty}
                onClick={() => setSelectedSpecialty(specialty)}
                className={`rounded-full px-6 py-2 text-sm font-medium transition ${
                  selectedSpecialty === specialty
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {specialty}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Instructors Grid */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 text-center">
            <p className="text-lg text-slate-600">
              Showing {filteredInstructors.length} instructor{filteredInstructors.length !== 1 ? 's' : ''}
              {selectedSpecialty !== "All" && ` specializing in ${selectedSpecialty}`}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredInstructors.map((instructor) => (
              <div key={instructor.id} className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">
                <div className="flex items-start gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 to-cyan-500">
                    <ElearnSymbol className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900">{instructor.name}</h3>
                    <p className="text-sm text-indigo-600">{instructor.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{instructor.specialty}</p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-slate-900">{instructor.experience}</div>
                    <div className="text-xs text-slate-500">Experience</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-slate-900">{instructor.students}</div>
                    <div className="text-xs text-slate-500">Students</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-slate-900 flex items-center justify-center gap-1">{instructor.rating}<ElearnSymbol className="h-4 w-4" /></div>
                    <div className="text-xs text-slate-500">Rating</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-slate-900">{instructor.courses}</div>
                    <div className="text-xs text-slate-500">Courses</div>
                  </div>
                </div>

                <p className="mt-4 text-sm text-slate-600 line-clamp-3">{instructor.bio}</p>

                <div className="mt-4">
                  <div className="flex flex-wrap gap-1">
                    {instructor.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700"
                      >
                        {skill}
                      </span>
                    ))}
                    {instructor.skills.length > 3 && (
                      <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700">
                        +{instructor.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <Link
                    href={`/instructors/${instructor.id}`}
                    className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-indigo-700"
                  >
                    View Profile
                  </Link>
                  <button className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                    Message
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Ready to Learn from the Best?
          </h2>
          <p className="mt-4 text-xl text-indigo-100">
            Join thousands of students learning from industry experts.
          </p>
          <div className="mt-8">
            <Link
              href="/Courses"
              className="rounded-lg bg-white px-8 py-3 text-lg font-semibold text-indigo-600 transition hover:bg-indigo-50"
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}