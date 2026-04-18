"use client";

import { useState } from "react";
import Link from "next/link";
import ElearnSymbol from "../components/ElearnSymbol";
import Footer from "../components/Footer";

const blogPosts = [
  {
    id: 1,
    title: "The Future of Remote Learning: Trends to Watch in 2026",
    excerpt: "Explore the emerging technologies and methodologies shaping the future of online education.",
    author: "Dr. Sarah Johnson",
    date: "2026-04-15",
    readTime: "5 min read",
    category: "Education Trends",
    image: "📊",
    featured: true
  },
  {
    id: 2,
    title: "Mastering React Hooks: A Complete Guide",
    excerpt: "Learn how to effectively use React hooks to build more efficient and maintainable components.",
    author: "Michael Chen",
    date: "2026-04-12",
    readTime: "8 min read",
    category: "Web Development",
    image: "⚛️",
    featured: false
  },
  {
    id: 3,
    title: "UX Design Principles for Better User Engagement",
    excerpt: "Discover the fundamental principles that can transform your user interface designs.",
    author: "Lisa Thompson",
    date: "2026-04-10",
    readTime: "6 min read",
    category: "Design",
    image: "🎨",
    featured: false
  },
  {
    id: 4,
    title: "Getting Started with Machine Learning: A Beginner's Guide",
    excerpt: "A comprehensive introduction to machine learning concepts and practical applications.",
    author: "Dr. Emily Rodriguez",
    date: "2026-04-08",
    readTime: "10 min read",
    category: "Data Science",
    image: "🤖",
    featured: true
  },
  {
    id: 5,
    title: "Building Scalable Applications with Microservices",
    excerpt: "Learn the architecture patterns and best practices for building scalable microservices.",
    author: "David Kim",
    date: "2026-04-05",
    readTime: "7 min read",
    category: "Architecture",
    image: "🏗️",
    featured: false
  },
  {
    id: 6,
    title: "Cybersecurity Best Practices for Developers",
    excerpt: "Essential security practices every developer should know to protect their applications.",
    author: "Alex Rodriguez",
    date: "2026-04-03",
    readTime: "9 min read",
    category: "Security",
    image: "🔒",
    featured: false
  }
];

const categories = ["All", "Education Trends", "Web Development", "Design", "Data Science", "Architecture", "Security"];

const resources = [
  {
    title: "Free Learning Resources",
    description: "Curated collection of free tutorials, courses, and documentation",
    icon: <ElearnSymbol className="h-6 w-6" />,
    link: "#"
  },
  {
    title: "Code Templates",
    description: "Ready-to-use code snippets and project templates",
    icon: <ElearnSymbol className="h-6 w-6" />,
    link: "#"
  },
  {
    title: "Design Assets",
    description: "UI kits, icons, and design resources for your projects",
    icon: <ElearnSymbol className="h-6 w-6" />,
    link: "#"
  },
  {
    title: "Career Guides",
    description: "Tips and advice for advancing your tech career",
    icon: <ElearnSymbol className="h-6 w-6" />,
    link: "#"
  }
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <>
      
      {/* Hero Section */}
      <section className="bg-linear-to-br from-indigo-600 via-purple-600 to-cyan-600 text-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              Learning Resources & Insights
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-indigo-100">
              Stay updated with the latest trends, tutorials, and insights from our expert instructors and the tech community.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-slate-900">Featured Articles</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {featuredPosts.map((post) => (
              <article key={post.id} className="group rounded-xl bg-slate-50 p-6 transition hover:bg-slate-100">
                <div className="flex gap-4">
                  <div className="mb-4">
                    <ElearnSymbol className="h-10 w-10 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <span>{post.category}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="mt-2 text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition">
                      <Link href={`/blog/${post.id}`}>{post.title}</Link>
                    </h3>
                    <p className="mt-2 text-slate-600">{post.excerpt}</p>
                    <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                      <span>By {post.author}</span>
                      <span>•</span>
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    selectedCategory === category
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 rounded-full border border-slate-300 bg-white px-4 py-2 pl-10 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <ElearnSymbol className="h-5 w-5 text-slate-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-slate-900">All Articles</h2>
            <p className="text-slate-600">{filteredPosts.length} articles found</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <article key={post.id} className="group rounded-xl bg-white p-6 shadow-sm border border-slate-200 transition hover:shadow-md">
                <div className="mb-4">
                  <ElearnSymbol className="h-10 w-10 text-indigo-600" />
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                  <span>{post.category}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition mb-3">
                  <Link href={`/blog/${post.id}`}>{post.title}</Link>
                </h3>
                <p className="text-slate-600 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span>By {post.author}</span>
                  <span>•</span>
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-50">
                <ElearnSymbol className="h-10 w-10 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No articles found</h3>
              <p className="text-slate-600">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Resources Section */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Learning Resources</h2>
            <p className="mt-4 text-xl text-slate-600">
              Free tools and resources to accelerate your learning journey.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {resources.map((resource, index) => (
              <a
                key={index}
                href={resource.link}
                className="group rounded-xl border border-slate-200 bg-slate-50 p-6 text-center transition hover:border-indigo-300 hover:bg-indigo-50 hover:shadow-lg"
              >
                <div className="mb-4">
                <ElearnSymbol className="h-10 w-10 text-indigo-600" />
              </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition">
                  {resource.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{resource.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-indigo-600 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Stay Updated with Latest Insights
          </h2>
          <p className="mt-4 text-xl text-indigo-100">
            Get weekly articles, tutorials, and learning tips delivered to your inbox.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 max-w-md rounded-lg px-4 py-3 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="rounded-lg bg-white px-8 py-3 text-lg font-semibold text-indigo-600 transition hover:bg-indigo-50">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}