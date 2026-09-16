import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Bookmark, 
  Share2, 
  Play, 
  Copy, 
  Check, 
  Lightbulb, 
  AlertTriangle, 
  HelpCircle, 
  Target, 
  Code2, 
  Terminal,
  FileCheck
} from 'lucide-react';
import { Course, Lesson } from '../types';
import { useAuth } from '../context/AuthContext';

interface LessonViewProps {
  course: Course;
  lesson: Lesson;
  onBackToCourse: () => void;
  onNavigateLesson: (lessonId: string) => void;
  onOpenCompilerWithCode: (code: string) => void;
  onShareLesson: (courseId: string, lessonId: string) => void;
}

export const LessonView: React.FC<LessonViewProps> = ({
  course,
  lesson,
  onBackToCourse,
  onNavigateLesson,
  onOpenCompilerWithCode,
  onShareLesson
}) => {
  const { toggleCompleteLesson, toggleBookmarkLesson, isCompleted, isBookmarked, recordQuizScore } = useAuth();
  const [copiedCode, setCopiedCode] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const completed = isCompleted(lesson.id);
  const bookmarked = isBookmarked(lesson.id);

  // Lesson index in course
  const currentIdx = course.lessons.findIndex(l => l.id === lesson.id);
  const prevLesson = currentIdx > 0 ? course.lessons[currentIdx - 1] : null;
  const nextLesson = currentIdx < course.lessons.length - 1 ? course.lessons[currentIdx + 1] : null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(lesson.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleQuizOptionSelect = (quizId: string, optionIdx: number) => {
    if (submittedQuiz) return;
    setSelectedAnswers(prev => ({ ...prev, [quizId]: optionIdx }));
  };

  const handleSubmitQuiz = () => {
    setSubmittedQuiz(true);
    if (!lesson.quiz || lesson.quiz.length === 0) return;

    let correctCount = 0;
    lesson.quiz.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount += 1;
      }
    });

    const scorePercentage = Math.round((correctCount / lesson.quiz.length) * 100);
    recordQuizScore(lesson.id + '-quiz', scorePercentage);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-in fade-in duration-200">
      
      {/* Top Breadcrumb & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <button
          onClick={onBackToCourse}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {course.title}</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Bookmark Button */}
          <button
            onClick={() => toggleBookmarkLesson(lesson.id)}
            className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              bookmarked
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
            title="Bookmark lesson"
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-amber-400' : ''}`} />
            <span className="hidden sm:inline">{bookmarked ? 'Bookmarked' : 'Bookmark'}</span>
          </button>

          {/* Share Button */}
          <button
            onClick={() => onShareLesson(course.id, lesson.id)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Share this lesson"
          >
            <Share2 className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Share Lesson</span>
          </button>

          {/* Mark Completed Button */}
          <button
            onClick={() => toggleCompleteLesson(lesson.id)}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm ${
              completed
                ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/40'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{completed ? 'Completed' : 'Mark Complete (+20 pts)'}</span>
          </button>
        </div>
      </div>

      {/* Lesson Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            {course.title}
          </span>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
            lesson.level === 'Beginner' ? 'bg-emerald-500/10 text-emerald-400' :
            lesson.level === 'Intermediate' ? 'bg-amber-500/10 text-amber-400' :
            'bg-purple-500/10 text-purple-400'
          }`}>
            {lesson.level}
          </span>
          <span className="text-xs text-slate-500">
            • {lesson.durationMinutes} mins read
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
          {lesson.title}
        </h1>
      </div>

      {/* 1. Simple Explanation */}
      <section className="mb-8 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 shadow-sm">
        <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-400" />
          Concept Explanation
        </h3>
        <p className="text-sm leading-relaxed text-slate-300 mb-4">
          {lesson.explanation}
        </p>

        {/* Telugu Friendly Explanation Hint */}
        {lesson.teluguHint && (
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs sm:text-sm leading-relaxed">
            <div className="font-bold flex items-center gap-1.5 text-amber-400 mb-1">
              <Lightbulb className="w-4 h-4 shrink-0" />
              <span>Beginner Tip (సులభమైన వివరణ):</span>
            </div>
            <p>{lesson.teluguHint}</p>
          </div>
        )}
      </section>

      {/* 2. Syntax */}
      {lesson.syntax && (
        <section className="mb-8 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
          <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Syntax Reference
          </h3>
          <pre className="font-mono text-xs sm:text-sm text-emerald-300 bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto leading-relaxed">
            {lesson.syntax}
          </pre>
        </section>
      )}

      {/* 3. Code Example & Runnable Box */}
      <section className="mb-8 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-md">
        <div className="px-5 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-white">Example Code Implementation</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCode}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center gap-1 font-medium transition-colors"
              title="Copy Code"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={() => onOpenCompilerWithCode(lesson.code)}
              className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 font-bold transition-colors shadow-sm"
              title="Open and Run in Python Compiler"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Run in Python Compiler</span>
            </button>
          </div>
        </div>

        <div className="p-4 bg-slate-950/70 overflow-x-auto">
          <pre className="font-mono text-xs sm:text-sm text-slate-200 leading-relaxed">
            {lesson.code}
          </pre>
        </div>

        {/* Expected Output */}
        {lesson.expectedOutput && (
          <div className="border-t border-slate-800 bg-slate-950 p-4">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Expected Output:
            </div>
            <pre className="font-mono text-xs text-emerald-400/90 whitespace-pre-wrap">
              {lesson.expectedOutput}
            </pre>
          </div>
        )}
      </section>

      {/* 4. Line-by-Line Code Explanation */}
      {lesson.codeExplanation && lesson.codeExplanation.length > 0 && (
        <section className="mb-8 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-400" />
            Line-by-Line Code Explanation
          </h3>
          <div className="space-y-3">
            {lesson.codeExplanation.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/60 flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                <code className="shrink-0 font-mono text-xs text-indigo-300 font-semibold bg-indigo-950/40 px-2 py-1 rounded border border-indigo-900/40">
                  {item.line}
                </code>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.explanation}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. Tips & Tricks and Common Mistakes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        
        {/* Tips & Tricks */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
          <h4 className="text-sm font-bold text-emerald-400 mb-3 flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            Pro Tips & Tricks
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
            {lesson.tipsAndTricks.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold shrink-0">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Common Mistakes */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
          <h4 className="text-sm font-bold text-rose-400 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Common Beginner Mistakes
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
            {lesson.commonMistakes.map((mistake, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-rose-400 font-bold shrink-0">⚠️</span>
                <span>{mistake}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* 6. Practice Questions & Mini Tasks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Practice Questions */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
          <h4 className="text-sm font-bold text-indigo-400 mb-3 flex items-center gap-2">
            <HelpCircle className="w-4 h-4" />
            Practice Questions
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
            {lesson.practiceQuestions.map((q, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold shrink-0">Q{idx + 1}.</span>
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Mini Task */}
        <div className="bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-indigo-900/40 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-amber-400 mb-2 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Lesson Mini Task
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {lesson.miniTask}
            </p>
          </div>
          <button
            onClick={() => onOpenCompilerWithCode(`# Mini Task: ${lesson.miniTask}\n# Write your solution below:\n\n`)}
            className="mt-4 self-start px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            Solve in Python Compiler
          </button>
        </div>
      </div>

      {/* 7. Lesson Quiz Engine */}
      {lesson.quiz && lesson.quiz.length > 0 && (
        <section className="mb-10 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-emerald-400" />
                Lesson Mastery Quiz
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Test your understanding and earn learner points.
              </p>
            </div>
            {submittedQuiz && (
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                Quiz Submitted
              </span>
            )}
          </div>

          <div className="space-y-6">
            {lesson.quiz.map((q, qIdx) => {
              const selectedOption = selectedAnswers[q.id];
              const isAnswered = selectedOption !== undefined;
              const isCorrect = isAnswered && selectedOption === q.correctAnswer;

              return (
                <div key={q.id} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <p className="text-sm font-semibold text-slate-200 mb-3">
                    {qIdx + 1}. {q.question}
                  </p>

                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedOption === optIdx;
                      let btnClass = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                      if (submittedQuiz) {
                        if (optIdx === q.correctAnswer) {
                          btnClass = 'bg-emerald-950/50 border-emerald-500 text-emerald-200 font-semibold';
                        } else if (isSelected && optIdx !== q.correctAnswer) {
                          btnClass = 'bg-rose-950/50 border-rose-500 text-rose-300';
                        }
                      } else if (isSelected) {
                        btnClass = 'bg-indigo-600/30 border-indigo-500 text-white font-semibold';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={submittedQuiz}
                          onClick={() => handleQuizOptionSelect(q.id, optIdx)}
                          className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${btnClass}`}
                        >
                          <span>{opt}</span>
                          {submittedQuiz && optIdx === q.correctAnswer && (
                            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {submittedQuiz && (
                    <div className={`mt-3 p-3 rounded-lg text-xs leading-relaxed ${
                      isCorrect ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20' : 'bg-slate-900 text-slate-300 border border-slate-800'
                    }`}>
                      <span className="font-bold">{isCorrect ? '✅ Correct! ' : '💡 Explanation: '}</span>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}

            {!submittedQuiz ? (
              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(selectedAnswers).length === 0}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-sm shadow-md shadow-indigo-600/20 transition-all"
              >
                Submit Answers & Check Score
              </button>
            ) : (
              <button
                onClick={() => { setSubmittedQuiz(false); setSelectedAnswers({}); }}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
              >
                Retake Quiz
              </button>
            )}
          </div>
        </section>
      )}

      {/* Lesson Navigation Footer */}
      <div className="pt-6 border-t border-slate-800 flex items-center justify-between gap-4">
        {prevLesson ? (
          <button
            onClick={() => onNavigateLesson(prevLesson.id)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <div className="text-left hidden sm:block">
              <div className="text-[10px] text-slate-500 uppercase">Previous</div>
              <div className="truncate max-w-[150px]">{prevLesson.title}</div>
            </div>
            <span className="sm:hidden">Prev</span>
          </button>
        ) : <div />}

        <button
          onClick={() => toggleCompleteLesson(lesson.id)}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            completed ? 'bg-emerald-950/40 border border-emerald-800 text-emerald-400' : 'bg-emerald-600 text-white hover:bg-emerald-500'
          }`}
        >
          {completed ? '✓ Completed' : 'Mark Lesson Complete'}
        </button>

        {nextLesson ? (
          <button
            onClick={() => onNavigateLesson(nextLesson.id)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors shadow-sm"
          >
            <div className="text-right hidden sm:block">
              <div className="text-[10px] text-indigo-200 uppercase">Next Lesson</div>
              <div className="truncate max-w-[150px]">{nextLesson.title}</div>
            </div>
            <span className="sm:hidden">Next</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={onBackToCourse}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold"
          >
            Finish Course
          </button>
        )}
      </div>

    </div>
  );
};
