"use client";

import { useState, useEffect } from "react";

type LearningStreakProps = {
  currentStreak: number;
  className?: string;
};

export default function LearningStreak({
  currentStreak,
  className = ""
}: LearningStreakProps) {
  const [animatedStreak, setAnimatedStreak] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (currentStreak > animatedStreak) {
      setIsAnimating(true);
      const increment = Math.ceil((currentStreak - animatedStreak) / 20);
      const timer = setInterval(() => {
        setAnimatedStreak(prev => {
          const next = prev + increment;
          if (next >= currentStreak) {
            setIsAnimating(false);
            clearInterval(timer);
            return currentStreak;
          }
          return next;
        });
      }, 50);
      return () => clearInterval(timer);
    } else {
      setAnimatedStreak(currentStreak);
    }
  }, [currentStreak, animatedStreak]);

  const getStreakEmoji = (streak: number) => {
    if (streak >= 100) return "🏆";
    if (streak >= 50) return "💎";
    if (streak >= 30) return "🔥🔥🔥";
    if (streak >= 14) return "🔥🔥";
    if (streak >= 7) return "🔥";
    if (streak >= 3) return "⚡";
    return "🌱";
  };

  const getStreakColor = (streak: number) => {
    if (streak >= 100) return "from-purple-500 to-pink-500";
    if (streak >= 50) return "from-blue-500 to-purple-500";
    if (streak >= 30) return "from-orange-400 to-red-500";
    if (streak >= 14) return "from-yellow-400 to-orange-500";
    if (streak >= 7) return "from-orange-400 to-pink-500";
    if (streak >= 3) return "from-blue-400 to-indigo-500";
    return "from-green-400 to-emerald-500";
  };

  const getStreakMessage = (streak: number) => {
    if (streak >= 100) return "Legendary!";
    if (streak >= 50) return "Amazing!";
    if (streak >= 30) return "On fire!";
    if (streak >= 14) return "Blazing!";
    if (streak >= 7) return "Heating up!";
    if (streak >= 3) return "Building momentum!";
    if (streak >= 1) return "Great start!";
    return "Ready to begin!";
  };

  const getStreakTitle = (streak: number) => {
    if (streak >= 100) return "Century Club";
    if (streak >= 50) return "Consistency King";
    if (streak >= 30) return "Streak Master";
    if (streak >= 14) return "Momentum Builder";
    if (streak >= 7) return "Rising Star";
    if (streak >= 3) return "Getting Started";
    return "Learning Journey";
  };

  return (
    <div className={`group relative overflow-hidden rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] hover:-translate-y-1 ${className}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute -top-10 -right-10 h-20 w-20 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 opacity-20 group-hover:opacity-30 transition-opacity duration-300" />

      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{getStreakTitle(animatedStreak)}</h3>
            <p className="text-sm text-slate-600">Learning Streak</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-3xl animate-bounce">{getStreakEmoji(animatedStreak)}</span>
            {animatedStreak >= 7 && (
              <div className="h-2 w-2 rounded-full bg-orange-400 animate-pulse" />
            )}
          </div>
        </div>

        <div className="flex items-center gap-6 mb-6">
          <div className={`relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${getStreakColor(animatedStreak)} text-3xl text-white font-bold shadow-xl transition-all duration-300 ${isAnimating ? 'scale-110' : 'scale-100'}`}>
            {animatedStreak}
            {animatedStreak >= 30 && (
              <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-yellow-400 animate-ping" />
            )}
          </div>

          <div className="flex-1">
            <p className="text-3xl font-bold text-slate-900 mb-1">
              {animatedStreak}
              <span className="text-lg font-normal text-slate-500 ml-1">
                {animatedStreak === 1 ? "day" : "days"}
              </span>
            </p>
            <p className="text-sm font-medium text-slate-600 mb-2">in a row</p>
            <p className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full inline-block">
              {getStreakMessage(animatedStreak)}
            </p>
          </div>
        </div>

        {/* Enhanced Streak Calendar */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">This Week</p>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-xs text-slate-500">Active</span>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 7 }, (_, i) => {
              const dayIndex = i;
              const isActive = dayIndex < (animatedStreak % 7) && animatedStreak > 0;
              const isToday = dayIndex === 6; // Assuming today is the last day

              return (
                <div
                  key={dayIndex}
                  className={`relative h-8 w-8 rounded-lg border-2 transition-all duration-200 ${
                    isActive
                      ? `bg-gradient-to-br ${getStreakColor(animatedStreak)} border-transparent shadow-lg scale-105`
                      : isToday
                      ? "border-indigo-300 bg-indigo-50 border-dashed"
                      : "border-slate-200 bg-slate-50 hover:border-slate-300"
                  } flex items-center justify-center text-xs font-bold`}
                >
                  {isActive ? (
                    <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : isToday ? (
                    <span className="text-indigo-600 font-bold">?</span>
                  ) : (
                    <span className="text-slate-400 text-[10px]">{dayIndex + 1}</span>
                  )}

                  {isToday && (
                    <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>

        {/* Achievement Badges */}
        {animatedStreak >= 7 && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="flex flex-wrap gap-2">
              {animatedStreak >= 7 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
                  <span>🔥</span>
                  Week Warrior
                </span>
              )}
              {animatedStreak >= 14 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                  <span>🔥</span>
                  Fortnight Hero
                </span>
              )}
              {animatedStreak >= 30 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
                  <span>🏆</span>
                  Month Master
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}