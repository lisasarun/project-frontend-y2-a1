"use client";
import { useState } from "react";
import QuizModule from "./QuizModule";

interface LessonViewerProps {
  lessonTitle?: string;
  lessonSummary?: string;
}

export default function LessonViewer({ lessonTitle = "Lesson", lessonSummary }: LessonViewerProps) {
  const [showQuiz, setShowQuiz] = useState(false);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden">
        {/* Banner Section */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-10 text-white">
          <span className="px-3 py-1 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-[10px] font-bold uppercase tracking-widest text-indigo-300">
            Current Module
          </span>
          <h2 className="text-3xl font-black mt-4">{lessonTitle}</h2>
        </div>

        <div className="p-10">
          {/* Lesson Content Section */}
          <div className="prose prose-slate max-w-none">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
              <span className="h-2 w-2 bg-indigo-600 rounded-full"></span>
              Lesson Content
            </h3>
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 text-slate-700 leading-relaxed shadow-inner">
              {lessonSummary || "No content available for this lesson."}
              <div className="mt-6 flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                <span>Reading materials (PDF, text)</span>
              </div>
            </div>
          </div>

          {/* Quiz Section - កែសម្រួលត្រង់នេះបាទ! */}
          <div className="mt-12 pt-10 border-t border-slate-100">
            {!showQuiz ? (
              <div className="bg-indigo-50 rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-indigo-100">
                <div className="text-center md:text-left">
                  <h4 className="text-xl font-bold text-indigo-900">Ready to test your knowledge?</h4>
                  <p className="text-indigo-600/70 text-sm mt-1">Complete this quiz to unlock the next milestone.</p>
                </div>
                <button 
                  onClick={() => setShowQuiz(true)}
                  className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 transition-all active:scale-95"
                >
                  Start Quiz Now
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-[2rem] border-2 border-indigo-600 p-8">
                {/* Fetch quiz questions from the local Next.js API */}
                <QuizModule /> 

                <button 
                  onClick={() => setShowQuiz(false)}
                  className="mt-4 text-sm text-slate-500 hover:text-indigo-600 underline"
                >
                  Back to Lesson Content
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}