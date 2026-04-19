import { NextResponse } from "next/server";

const quizzes = [
  {
    id: "quiz-1",
    title: "Intro to Learning Platform",
    questions: [
      {
        questionText: "Which of these is a key benefit of the platform?",
        options: [
          "Real-time learning analytics",
          "One-size-fits-all courses",
          "Offline-only content",
          "Manual grade submission"
        ],
        correctAnswerIndex: 0
      }
    ]
  },
  {
    id: "quiz-2",
    title: "Course Progress",
    questions: [
      {
        questionText: "What does completing a quiz help unlock?",
        options: [
          "The next milestone",
          "A user profile update",
          "A hidden side menu",
          "Automatic translation"
        ],
        correctAnswerIndex: 0
      }
    ]
  },
  {
    id: "quiz-3",
    title: "Study Habits",
    questions: [
      {
        questionText: "What is the best way to retain new course material?",
        options: [
          "Practice often and review regularly",
          "Skip lessons quickly",
          "Rely only on memorization",
          "Avoid asking questions"
        ],
        correctAnswerIndex: 0
      }
    ]
  }
];

export async function GET() {
  return NextResponse.json(quizzes, { status: 200 });
}
