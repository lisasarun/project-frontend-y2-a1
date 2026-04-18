"use client";

import React, { useState } from "react";

type QuizProps = {
  title: string;
  questions: Array<{
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
  }>;
};

export default function Quiz({ title, questions }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerClick = (selectedIndex: number) => {
    if (selectedAnswer !== null) return; // Prevent multiple clicks

    setSelectedAnswer(selectedIndex);
    setShowResult(true);

    const isCorrect = selectedIndex === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }

    // Auto-advance after showing result
    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setShowScore(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const progressPercentage = ((currentQuestion + (showResult ? 1 : 0)) / questions.length) * 100;

  return (
    <div className="mx-auto max-w-3xl rounded-[28px] bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.1)] border border-slate-200">
      {/* Header with Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
          <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2">
            <svg className="h-4 w-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-semibold text-slate-700">
              {currentQuestion + (showResult ? 1 : 0)} / {questions.length}
            </span>
          </div>
        </div>

        <div className="w-full bg-slate-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {showScore ? (
        <div className="text-center py-12">
          <div className="mb-6">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 mb-4">
              <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-2">Quiz Complete!</h3>
            <p className="text-lg text-slate-600">
              You scored <span className="font-bold text-indigo-600">{score}</span> out of{" "}
              <span className="font-bold">{questions.length}</span>
            </p>
            <p className="text-sm text-slate-500 mt-2">
              {score === questions.length
                ? "Perfect! 🎉"
                : score >= questions.length * 0.8
                ? "Great job! 👍"
                : score >= questions.length * 0.6
                ? "Good effort! 👏"
                : "Keep practicing! 💪"}
            </p>
          </div>

          <button
            onClick={resetQuiz}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-4 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Take Quiz Again
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                <span className="text-sm font-bold text-indigo-600">{currentQuestion + 1}</span>
              </div>
              <div className="h-px bg-slate-200 flex-1" />
            </div>

            <h3 className="text-xl font-bold text-slate-900 leading-relaxed">
              {questions[currentQuestion].question}
            </h3>
          </div>

          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === questions[currentQuestion].correctAnswer;
              const showCorrect = showResult && isCorrect;
              const showIncorrect = showResult && isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  disabled={selectedAnswer !== null}
                  className={`group w-full rounded-2xl border-2 p-6 text-left transition-all duration-200 ${
                    showCorrect
                      ? "border-emerald-500 bg-emerald-50 text-emerald-900 shadow-lg"
                      : showIncorrect
                      ? "border-red-500 bg-red-50 text-red-900"
                      : isSelected
                      ? "border-indigo-500 bg-indigo-50 text-indigo-900"
                      : "border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50 hover:shadow-md"
                  } ${selectedAnswer !== null ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium leading-relaxed">{option}</span>

                    {showCorrect && (
                      <div className="flex-shrink-0 ml-4">
                        <div className="h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center">
                          <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    )}

                    {showIncorrect && (
                      <div className="flex-shrink-0 ml-4">
                        <div className="h-6 w-6 rounded-full bg-red-500 flex items-center justify-center">
                          <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {showResult && (
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600">
                Next question in a moment...
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
