"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CourseCard from "../components/CourseCard";
import { courseCategories } from "@/lib/elearn-data";
import { useCourseList } from "@/lib/useCourses";

const categoryFilters = ["All Categories", ...courseCategories.map((category) => category.name)];

function CoursesContent() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Categories");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const { courses, loading, error, stats } = useCourseList();

  useEffect(() => {
    const initialSearch = searchParams.get("search") ?? "";
    const initialCategory = searchParams.get("category") ?? "All Categories";
    setSearch(initialSearch);
    setActiveFilter(categoryFilters.includes(initialCategory) ? initialCategory : "All Categories");
  }, [searchParams]);

  const filteredCourses = useMemo(() => {
    const query = search.toLowerCase().trim();

    return courses.filter((course) => {
      const matchesSearch =
        query.length === 0 ||
        [course.title, course.track, course.description, course.mentor].some(
          (value) => value.toLowerCase().includes(query)
        );

      const matchesFilter =
        activeFilter === "All Categories" ||
        course.category === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [activeFilter, courses, search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, search]);

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 px-4 py-8 md:px-6">
      <div className="mx-auto max-w-7xl">
        <section className="overflow-hidden rounded-4xl bg-slate-900 px-6 py-8 text-white shadow-xl">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-cyan-100">
                Professional e-learning catalog
              </span>

              <h1 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                Find the right course to grow your digital skills
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
                Explore career-ready learning paths built with clear structure, real project outcomes, and mentor-guided lessons. Every course is designed to feel like a polished classroom experience with practical skills you can use immediately.
              </p>

              <div className="mt-6">
                <input
                  type="text"
                  placeholder="Search by course, skill, or mentor..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none ring-4 ring-transparent transition focus:ring-cyan-200"
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-2xl font-bold">{stats.total || "0"}</p>
                <p className="mt-1 text-sm text-slate-300">active learning paths</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-2xl font-bold">24/7</p>
                <p className="mt-1 text-sm text-slate-300">learning access</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-2xl font-bold">{stats.averageRating}/5</p>
                <p className="mt-1 text-sm text-slate-300">average rating</p>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-6 flex flex-wrap gap-2">
          {categoryFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeFilter === filter
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-600 shadow-sm hover:bg-slate-100"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {loading
                ? "Loading courses..."
                : error
                ? "Unable to fetch course catalog"
                : `${filteredCourses.length} learning paths available`}
            </p>
            <p className="text-sm text-slate-500">
              Browse immersive courses with clear outcomes, expert mentors, and career-focused lessons.
            </p>
          </div>
          {!loading && totalPages > 1 && (
            <div className="text-sm text-slate-600">
              Page {currentPage} of {totalPages}
            </div>
          )}
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {loading ? (
            <div className="col-span-full rounded-2xl bg-white p-6 text-center text-slate-500 shadow-sm">
              Loading course catalog...
            </div>
          ) : paginatedCourses.length > 0 ? (
            paginatedCourses.map((course) => (
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
            ))
          ) : (
            <p className="col-span-full rounded-2xl bg-white p-6 text-center text-slate-500 shadow-sm">
              No courses found. Try another keyword.
            </p>
          )}
        </div>

        {!loading && totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 transition"
            >
              First Page
            </button>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 transition"
            >
              Previous
            </button>
            <span className="text-sm text-slate-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 transition"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CoursesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <CoursesContent />
    </Suspense>
  );
}