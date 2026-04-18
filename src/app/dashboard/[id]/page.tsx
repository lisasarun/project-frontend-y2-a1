"use client";

import { useEffect, useMemo, useState } from "react";
import SideBar from "../../components/SideBar";
import LessonViewer from "../../components/LessonViewer";

type Lesson = {
  id: number;
  title: string;
  content: string;
  pdfFileName: string;
  pdfUrl: string;
  completed?: boolean;
};

export default function LearningPage() {

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentLessonId, setCurrentLessonId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const fetchLessons = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/lessons");
        const data = await res.json();

        const mapped = data.map((lesson: any) => ({
          id: lesson.id,
          title: lesson.title,
          content: lesson.content,
          pdfFileName: lesson.pdfFileName,

          // 🔥 FIX IMPORTANT
          pdfUrl: lesson.pdfFileName
            ? `http://localhost:8080/api/lessons/view-pdf/${encodeURIComponent(lesson.pdfFileName)}`
            : null
        }));

        setLessons(mapped);
        setCurrentLessonId(mapped[0]?.id ?? null);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  const currentLesson = useMemo(() => {
    return lessons.find(l => l.id === currentLessonId);
  }, [currentLessonId, lessons]);

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen">

      <SideBar
        lessons={lessons}
        currentLessonId={currentLessonId || 0}
        onSelectLesson={setCurrentLessonId}
      />

      <div className="flex-1 p-6">

        {loading ? (
          <p>Loading...</p>
        ) : currentLesson ? (
          <LessonViewer
            lessonTitle={currentLesson.title}
            lessonSummary={currentLesson.content}
            pdfUrl={currentLesson.pdfUrl}
          />
        ) : (
          <p>No lesson found</p>
        )}

      </div>
    </div>
  );
}