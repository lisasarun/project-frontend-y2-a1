"use client";

import { useRouter } from "next/navigation";
import ElearnSymbol from "./ElearnSymbol";

type CourseCardProps = {
  id?: number;
  title: string;
  level: string;
  category?: string;
  price?: string;
  image?: string;
  description?: string;
  track?: string;
  duration?: string;
  lessons?: string;
  mentor?: string;
  rating?: string;
  learners?: string;
  ctaLabel?: string;
};

const levelThemes = {
  Beginner: {
    banner: "from-cyan-500 via-sky-500 to-indigo-600",
    badge: "bg-emerald-100 text-emerald-700",
    icon: "",
  },
  Intermediate: {
    banner: "from-violet-500 via-fuchsia-500 to-indigo-600",
    badge: "bg-amber-100 text-amber-700",
    icon: "",
  },
  Advanced: {
    banner: "from-slate-800 via-indigo-800 to-cyan-600",
    badge: "bg-rose-100 text-rose-700",
    icon: "",
  },
} as const;

export default function CourseCard({
  id,
  title,
  level,
  category,
  price,
  image,
  description,
  track,
  duration,
  lessons,
  mentor,
  rating,
  learners,
  ctaLabel,
}: CourseCardProps) {
  const router = useRouter();
  const theme =
    levelThemes[level as keyof typeof levelThemes] ?? levelThemes.Beginner;

  const summary =
    description ||
    "Build real skills with guided lessons, simple explanations, and hands-on practice.";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_22px_45px_rgba(79,70,229,0.15)] hover:border-indigo-200">
      <div
        className={`relative h-48 overflow-hidden bg-linear-to-br ${theme.banner} p-4 sm:p-6`}
        style={image ? { backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
      >
        {image && <div className="absolute inset-0 bg-slate-950/40" />}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_30%)]" />
        <div className="absolute -right-6 top-4 h-24 w-24 rounded-full bg-white/15 blur-2xl animate-pulse" />

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm shadow-sm">
            {category || track || "Learning Path"}
          </span>
          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm flex items-center gap-1">
            <ElearnSymbol className="h-3 w-3" />
            {rating || "4.8"}
          </span>
        </div>

        <div className="absolute right-4 top-4 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm shadow-sm">
          {price || "Free"}
        </div>

        <div className="absolute bottom-4 left-4 right-4 rounded-[20px] border border-white/15 bg-slate-950/20 p-3 backdrop-blur-md">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70">
                Featured Instructor
              </p>
              <p className="mt-1 text-sm font-semibold text-white truncate">
                {mentor || "Expert Mentor Series"}
              </p>
            </div>

            <div className="rounded-2xl bg-white/15 px-3 py-2 shadow-sm shrink-0">
              <ElearnSymbol className="h-8 w-8" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${theme.badge} shadow-sm`}
          >
            {level}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 flex items-center gap-1">
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            {learners || "1.2k learners"}
          </span>
        </div>

        <h3 className="text-xl font-bold leading-snug text-slate-900 group-hover:text-indigo-600 transition-colors duration-200 mb-3">
          {title}
        </h3>

        <p className="text-sm leading-relaxed text-slate-600 mb-4 line-clamp-3">{summary}</p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="rounded-2xl bg-slate-50 px-4 py-3 transition-colors group-hover:bg-indigo-50">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Lessons</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">
              {lessons || "12 guided lessons"}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 px-4 py-3 transition-colors group-hover:bg-indigo-50">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Duration</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">
              {duration || "4 weeks"}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-5">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 font-medium text-emerald-700">
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Certificate
          </span>
          <span className="inline-flex items-center gap-2">
            <ElearnSymbol className="h-4 w-4" />
            Projects included
          </span>
          <span className="inline-flex items-center gap-2">
            <ElearnSymbol className="h-4 w-4" />
            Mobile friendly
          </span>
        </div>

        <button
          onClick={() => router.push(id ? `/Courses/${id}` : "/Courses")}
          className="w-full rounded-xl bg-slate-900 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-indigo-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 group-hover:scale-[1.02]"
        >
          <span className="flex items-center justify-center gap-2">
            {ctaLabel || "Explore Course"}
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </button>
      </div>
    </article>
  );
}