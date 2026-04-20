"use client";
import { useState, useEffect } from "react";

export default function QuizModule() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(0); 
  const [score, setScore] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  useEffect(() => {
    fetch('http://localhost:8080/api/quizzes')
      .then(res => res.json())
      .then(data => {
        const formattedData = data.map((item: any) => ({
          id: item.id,
          q: item.questions[0]?.questionText || item.title,
          options: item.questions[0]?.options || [],
          answer: item.questions[0]?.options[item.questions[0]?.correctAnswerIndex]
        }));
        setQuestions(formattedData);
      })
      .catch(err => console.error("Error fetching quizzes:", err));
  }, []);

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      let total = 0;
      questions.forEach(q => {
        if (answers[q.id] === q.answer) total += 1;
      });
      setScore(total);
    }
  };

  if (questions.length === 0) return (
    <div className="flex justify-center items-center p-10">
      <p className="text-slate-500 animate-pulse font-medium">Fetching quiz data from server...</p>
    </div>
  );
  
  if (score !== null) return (
    <div className="text-center p-10 bg-indigo-50 rounded-3xl border border-indigo-100 animate-in zoom-in duration-300">
      <div className="text-5xl mb-4">🎯</div>
      <h3 className="text-2xl font-black text-slate-900 mb-2">Quiz Completed!</h3>
      <p className="text-xl font-bold text-indigo-600">Your Score: {score} / {questions.length}</p>
      <div className="mt-6 flex flex-col gap-3">
        <button 
          onClick={() => window.location.reload()} 
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all"
        >
          Retake Quiz
        </button>
      </div>
    </div>
  );

  const currentQ = questions[currentStep];

  return (
    <div className="p-2 animate-in fade-in duration-500">
      {/* Progress Header */}
      <div className="flex justify-between items-end mb-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500">Question {currentStep + 1} of {questions.length}</span>
          <h3 className="text-xl font-bold text-slate-800 mt-1">{currentQ.q}</h3>
        </div>
        <div className="text-right">
            <span className="text-sm font-mono font-bold text-slate-400">{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
        </div>
      </div>

      {/* Modern Progress Bar */}
      <div className="w-full bg-slate-100 h-1.5 rounded-full mb-8 overflow-hidden">
        <div 
          className="bg-indigo-600 h-full transition-all duration-700 ease-out" 
          style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
        ></div>
      </div>
      
      {/* Options Grid */}
      <div className="grid grid-cols-1 gap-3">
        {currentQ.options.map((opt: string) => (
          <button 
            key={opt}
            onClick={() => setAnswers({...answers, [currentQ.id]: opt})}
            className={`p-5 rounded-2xl border-2 text-left transition-all duration-200 ${
              answers[currentQ.id] === opt 
                ? "border-indigo-600 bg-indigo-50 text-indigo-700 ring-4 ring-indigo-600/10" 
                : "border-slate-100 bg-slate-50 hover:border-slate-300 text-slate-600"
            }`}
          >
            <div className="flex items-center gap-3">
                <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${answers[currentQ.id] === opt ? "border-indigo-600" : "border-slate-300"}`}>
                    {answers[currentQ.id] === opt && <div className="h-2 w-2 bg-indigo-600 rounded-full"></div>}
                </div>
                <span className="font-semibold">{opt}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Action Button */}
      <button 
        disabled={!answers[currentQ.id]}
        onClick={handleNext}
        className={`w-full py-4 rounded-2xl font-black mt-8 transition-all duration-300 shadow-lg ${
          answers[currentQ.id] 
            ? "bg-slate-900 text-white shadow-slate-200 hover:bg-black translate-y-0" 
            : "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none translate-y-0"
        }`}
      >
        {currentStep === questions.length - 1 ? "FINISH & VIEW SCORE" : "NEXT QUESTION"}
      </button>
    </div>
  );
}