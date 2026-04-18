"use client";

import React, { useState } from "react";

type Lesson = {
  id: number;
  title: string;
  completed: boolean;
  duration?: string;
};

type SideBarProps = {
  lessons: Lesson[];
  currentLessonId: number;
  onSelectLesson: (id: number) => void;
};

export default function SideBar({
  lessons,
  currentLessonId,
  onSelectLesson,
}: SideBarProps) {
  const [isOpen, setIsOpen] = useState(true);

  const completedCount = lessons.filter(lesson => lesson.completed).length;
  const progressPercentage = Math.round((completedCount / lessons.length) * 100);

  return (
    <aside
      className={`${
        isOpen ? "w-80" : "w-20"
      } border-r border-slate-200 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-300`}
    >
      <div className="border-b border-slate-100 p-6">
        <div className="flex items-center justify-between gap-3">
          <div className={`${isOpen ? "block" : "hidden"} min-w-0 flex-1`}>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Course Progress</p>
                <p className="text-sm font-bold text-slate-900">{progressPercentage}% Complete</p>
              </div>
            </div>

            <div className="w-full bg-slate-200 rounded-full h-2 mb-3">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600">
              <span>{completedCount} of {lessons.length} lessons</span>
              <span className="text-emerald-600 font-medium">✓ Completed</span>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-600 transition-all hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <svg
              className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-0' : 'rotate-180'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
      </div>

      <nav className="space-y-3 p-4">
        {lessons.map((lesson, index) => {
          const isActive = lesson.id === currentLessonId;
          const isCompleted = lesson.completed;

          return (
            <button
              key={lesson.id}
              onClick={() => onSelectLesson(lesson.id)}
              className={`group w-full rounded-2xl px-4 py-4 text-left transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25"
                  : isCompleted
                  ? "bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-200"
                  : "bg-slate-50 text-slate-700 hover:bg-slate-100 hover:shadow-sm"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <div className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition-all ${
                    isActive
                      ? "bg-white/20 text-white"
                      : isCompleted
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-200 text-slate-600 group-hover:bg-slate-300"
                  }`}>
                    {isCompleted ? (
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className={`font-semibold leading-tight truncate ${
                      isActive ? "text-white" : isCompleted ? "text-emerald-900" : "text-slate-900"
                    }`}>
                      {isOpen ? lesson.title : lesson.title[0]}
                    </p>
                    {isOpen && lesson.duration && (
                      <div className="flex items-center gap-2 mt-2">
                        <svg className={`h-3 w-3 ${
                          isActive ? "text-white/70" : isCompleted ? "text-emerald-600" : "text-slate-400"
                        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className={`text-xs ${
                          isActive ? "text-white/70" : isCompleted ? "text-emerald-600" : "text-slate-500"
                        }`}>
                          {lesson.duration}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {isActive && (
                  <div className="flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}