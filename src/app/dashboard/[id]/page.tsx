"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import SideBar from "../../components/SideBar";
import LessonViewer from "../../components/LessonViewer";

interface Lesson {
  id: number;
  title: string;
  completed?: boolean;
  duration?: string;
  summary?: string;
}

export default function LearningPage() {
  const params = useParams();
  const courseId = params?.id;
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentLessonId, setCurrentLessonId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchCourseData = async () => {
      try {
        const res = await fetch(`/api/courses/${courseId}`);
        const data = await res.json();
        if (data.course?.lessonItems) {
          setLessons(data.course.lessonItems);
          setCurrentLessonId(data.course.lessonItems[0].id);
        }
      } finally { setLoading(false); }
    };
    if (courseId) fetchCourseData();
  }, [courseId]);

  const currentLesson = useMemo(() => {
    return lessons.find((l) => l.id === currentLessonId) || lessons[0];
  }, [currentLessonId, lessons]);

  const progress = lessons.length > 0 
    ? Math.round((lessons.filter(l => l.completed).length / lessons.length) * 100) 
    : 0;

  if (!mounted) return <div className="min-h-screen bg-[#F8FAFC]" />;

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <SideBar
        lessons={lessons}
        currentLessonId={currentLessonId || 0}
        onSelectLesson={(id) => setCurrentLessonId(id)}
      />

      <div className="flex-1 flex flex-col">
        {/* Top Header Section */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Learning Dashboard</h1>
              <p className="text-xs text-slate-500 font-medium">Continue your programming journey [cite: 8]</p>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-indigo-600">{progress}% Completed [cite: 57]</p>
                <div className="w-40 h-2 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-700" 
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
                YW
              </div>
            </div>
          </div>
        </header>

        <main className="p-8">
          <div className="max-w-5xl mx-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                <p className="mt-4 text-slate-500 font-medium italic">Preparing your classroom...</p>
              </div>
            ) : currentLesson && (
              <LessonViewer 
                lessonTitle={currentLesson.title} 
                lessonSummary={currentLesson.summary} 
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}