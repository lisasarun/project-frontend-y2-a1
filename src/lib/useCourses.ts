"use client";

import { useEffect, useMemo, useState } from "react";

export type CourseSummary = {
  id: number;
  title: string;
  level: string;
  category: string;
  track: string;
  price: string;
  image: string;
  mentor: string;
  rating: string;
  learners: string;
  duration: string;
  lessons: string;
  description: string;
};

export type CourseDetail = CourseSummary & {
  outcomes: string[];
  curriculum: string[];
  lessonItems: {
    id: number;
    title: string;
    duration: string;
    completed: boolean;
    summary: string;
  }[];
};

export function useCourseList() {
  const [courses, setCourses] = useState<CourseSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    let active = true;

    const loadCourses = async () => {
      setLoading(true);
      setError(undefined);

      try {
        const response = await fetch("/api/courses", { cache: "no-store" });

        if (!response.ok) {
          throw new Error("Failed to load courses");
        }

        const data = (await response.json()) as { courses?: CourseSummary[] };

        if (active) {
          setCourses(data.courses ?? []);
        }
      } catch (error) {
        if (active) {
          setCourses([]);
          setError(error instanceof Error ? error.message : "Unable to fetch courses");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadCourses();

    return () => {
      active = false;
    };
  }, []);

  const stats = useMemo(
    () => ({
      total: courses.length,
      averageRating:
        courses.length > 0
          ? (
              courses
                .map((course) => parseFloat(course.rating.replace(/[^0-9.]/g, "")))
                .reduce((sum, value) => sum + value, 0) / courses.length
            ).toFixed(1)
          : "0.0",
    }),
    [courses]
  );

  return { courses, loading, error, stats };
}

export function useCourseDetail(courseId: number | null) {
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!courseId) {
      setCourse(null);
      setLoading(false);
      return;
    }

    let active = true;

    const loadCourse = async () => {
      setLoading(true);
      setError(undefined);

      try {
        const response = await fetch(`/api/courses/${courseId}`, { cache: "no-store" });

        if (!response.ok) {
          throw new Error("Failed to load course details");
        }

        const data = (await response.json()) as { course?: CourseDetail };

        if (active) {
          setCourse(data.course ?? null);
        }
      } catch (error) {
        if (active) {
          setCourse(null);
          setError(error instanceof Error ? error.message : "Unable to fetch course details");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadCourse();

    return () => {
      active = false;
    };
  }, [courseId]);

  return { course, loading, error };
}

const ENROLLMENT_STORAGE_KEY = "elearn-enrollments";

type StoredEnrollment = CourseDetail & {
  progress: number;
  enrolledAt: string;
};

function safeParseStorage<T>(value: string | null): T | null {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export function getStoredEnrollments(): StoredEnrollment[] {
  if (typeof window === "undefined") {
    return [];
  }

  const stored = safeParseStorage<Record<string, StoredEnrollment>>(
    window.localStorage.getItem(ENROLLMENT_STORAGE_KEY)
  );

  return stored ? Object.values(stored) : [];
}

export function getStoredEnrollment(courseId: number): StoredEnrollment | null {
  if (typeof window === "undefined") {
    return null;
  }

  const stored = safeParseStorage<Record<string, StoredEnrollment>>(
    window.localStorage.getItem(ENROLLMENT_STORAGE_KEY)
  );

  return stored?.[courseId.toString()] ?? null;
}

export function isCourseEnrolled(courseId: number): boolean {
  return Boolean(getStoredEnrollment(courseId));
}

export function enrollCourse(course: CourseDetail, progress = 0) {
  if (typeof window === "undefined") {
    return;
  }

  const stored =
    safeParseStorage<Record<string, StoredEnrollment>>(
      window.localStorage.getItem(ENROLLMENT_STORAGE_KEY)
    ) ?? {};

  stored[course.id.toString()] = {
    ...course,
    progress,
    enrolledAt: new Date().toISOString(),
  };

  window.localStorage.setItem(ENROLLMENT_STORAGE_KEY, JSON.stringify(stored));
}

export function updateCourseProgress(
  courseId: number,
  lessonItems: CourseDetail["lessonItems"]
) {
  if (typeof window === "undefined") {
    return;
  }

  const stored =
    safeParseStorage<Record<string, StoredEnrollment>>(
      window.localStorage.getItem(ENROLLMENT_STORAGE_KEY)
    ) ?? {};

  const current = stored[courseId.toString()];

  if (!current) {
    return;
  }

  const completedCount = lessonItems.filter((lesson) => lesson.completed).length;
  const progress = Math.round((completedCount / Math.max(lessonItems.length, 1)) * 100);

  stored[courseId.toString()] = {
    ...current,
    lessonItems,
    progress,
  };

  window.localStorage.setItem(ENROLLMENT_STORAGE_KEY, JSON.stringify(stored));
}
