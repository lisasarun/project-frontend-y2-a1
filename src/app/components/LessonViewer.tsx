type LessonViewerProps = {
  lessonTitle?: string;
  lessonSummary?: string;
  lessonNumber?: number;
  totalLessons?: number;
  duration?: string;
  isCompleted?: boolean;
  onComplete?: () => void;
  onDownload?: () => void;
};

export default function LessonViewer({
  lessonTitle = "Lesson Content",
  lessonSummary = "Watch the lesson, review the notes, and complete the quick exercise to continue.",
  lessonNumber = 1,
  totalLessons = 12,
  duration = "15 min",
  isCompleted = false,
  onComplete,
  onDownload,
}: LessonViewerProps) {
  return (
    <div className="group relative overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 via-transparent to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br from-indigo-100/50 to-purple-100/50 blur-3xl group-hover:blur-2xl transition-all duration-500" />

      <div className="relative p-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-sm shadow-lg">
                {lessonNumber}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{duration}</span>
                <span className="mx-2">•</span>
                <span>{lessonNumber} of {totalLessons}</span>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mb-3 leading-tight">{lessonTitle}</h2>
            <p className="text-slate-600 leading-relaxed max-w-2xl">{lessonSummary}</p>
          </div>

          <div className="flex items-center gap-3 md:flex-col md:items-end">
            <div className={`rounded-full px-4 py-2 text-sm font-semibold shadow-sm ${
              isCompleted
                ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                : "bg-amber-100 text-amber-700 border border-amber-200"
            }`}>
              <div className="flex items-center gap-2">
                {isCompleted ? (
                  <>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Completed
                  </>
                ) : (
                  <>
                    <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                    In Progress
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Video Area */}
        <div className="relative mb-8">
          <div className="aspect-video w-full rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="relative">
                    <div className="h-20 w-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                      <svg className="h-8 w-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-300" />
                  </div>
                </div>
                <p className="text-white/80 text-lg font-medium">Video Lesson Content</p>
                <p className="text-white/60 text-sm mt-1">Interactive learning experience</p>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="w-full bg-white/20 rounded-full h-1">
                <div className="bg-white/60 h-1 rounded-full w-1/3 transition-all duration-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Lesson Features */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <div className="group/feature rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-5 border border-blue-100/50 hover:shadow-lg transition-all duration-200">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-500 flex items-center justify-center text-white shadow-sm">
                <span className="text-lg">📌</span>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">Key Concepts</h4>
                <p className="text-sm text-slate-600">Core ideas explained with examples</p>
              </div>
            </div>
          </div>

          <div className="group/feature rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50 p-5 border border-emerald-100/50 hover:shadow-lg transition-all duration-200">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-sm">
                <span className="text-lg">🧩</span>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">Practice Tasks</h4>
                <p className="text-sm text-slate-600">Hands-on exercises included</p>
              </div>
            </div>
          </div>

          <div className="group/feature rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 p-5 border border-purple-100/50 hover:shadow-lg transition-all duration-200">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl bg-purple-500 flex items-center justify-center text-white shadow-sm">
                <span className="text-lg">📋</span>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">Progress Tracking</h4>
                <p className="text-sm text-slate-600">Mark complete when finished</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <button
            onClick={onComplete}
            disabled={isCompleted}
            className={`group/btn flex items-center gap-3 rounded-2xl px-8 py-4 font-semibold text-white shadow-lg transition-all duration-200 ${
              isCompleted
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            }`}
          >
            {isCompleted ? (
              <>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Completed
              </>
            ) : (
              <>
                <svg className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Mark as Complete
              </>
            )}
          </button>

          <button
            onClick={onDownload}
            className="flex items-center gap-3 rounded-2xl border-2 border-slate-200 bg-white px-8 py-4 font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:border-slate-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Notes
          </button>
        </div>
      </div>
    </div>
  );
}