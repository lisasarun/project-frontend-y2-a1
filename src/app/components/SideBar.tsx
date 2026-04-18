"use client";

interface Lesson {
  id: number;
  title: string;
  completed?: boolean;
  duration?: string;
  summary?: string;
}

interface SideBarProps {
  lessons: Lesson[];
  currentLessonId: number;
  onSelectLesson: (id: number) => void;
}

export default function SideBar({ lessons, currentLessonId, onSelectLesson }: SideBarProps) {
  return (
    <aside className="w-85 border-r border-slate-200 bg-white h-screen sticky top-0 overflow-y-auto flex flex-col shadow-2xl z-30">
      <div className="p-8 border-b border-slate-50 bg-slate-900 text-white">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-indigo-500 rounded-lg transform rotate-12 flex items-center justify-center font-black">E</div>
          <h2 className="text-lg font-black tracking-tighter uppercase italic">Coding Class</h2>
        </div>
      </div>
      
      <nav className="p-6 space-y-3 flex-1">
        {lessons.map((lesson, idx) => (
          <button
            key={lesson.id}
            onClick={() => onSelectLesson(lesson.id)}
            className={`w-full group flex items-start gap-4 p-5 rounded-[1.5rem] text-left transition-all duration-300 ${
              currentLessonId === lesson.id 
                ? "bg-indigo-600 text-white shadow-xl shadow-indigo-100 scale-[1.02]" 
                : "hover:bg-slate-50 text-slate-600 border border-transparent hover:border-slate-200"
            }`}
          >
            <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold border ${
              currentLessonId === lesson.id ? "bg-white/20 border-white/30" : "bg-slate-100 border-slate-200 text-slate-400"
            }`}>
              {lesson.completed ? "✓" : idx + 1}
            </span>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold truncate leading-tight">{lesson.title}</p>
              <p className={`text-[10px] mt-1 font-medium ${currentLessonId === lesson.id ? "text-indigo-200" : "text-slate-400"}`}>
                {lesson.duration || "10 mins"} [cite: 18]
              </p>
            </div>
          </button>
        ))}
      </nav>
      
      <div className="p-6 bg-slate-50 border-t border-slate-200">
        <button className="w-full py-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-900 hover:text-white transition-all shadow-sm">
          Return to Course List [cite: 40]
        </button>
      </div>
    </aside>
  );
}