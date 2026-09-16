import React, { useState } from 'react';
import { 
  Briefcase, 
  ChevronDown, 
  ChevronUp, 
  Lightbulb, 
  AlertTriangle, 
  Code2, 
  Printer, 
  CheckCircle2, 
  Building2, 
  Sparkles, 
  FileCheck,
  Check,
  Search
} from 'lucide-react';
import { INTERVIEW_QUESTIONS, COMPANY_INTERVIEW_QUESTIONS, INTERVIEW_QUIZZES } from '../data/interviewData';
import { useAuth } from '../context/AuthContext';

export const InterviewView: React.FC = () => {
  const { recordQuizScore } = useAuth();
  const [selectedTrack, setSelectedTrack] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<'qa' | 'companies' | 'quiz'>('qa');
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const tracks = ['All', 'Python', 'Java', 'C', 'C++', 'DSA', 'SQL', 'Frontend', 'Backend'];

  const filteredQuestions = INTERVIEW_QUESTIONS.filter(q => {
    const matchTrack = selectedTrack === 'All' || q.track.toLowerCase() === selectedTrack.toLowerCase();
    const matchLevel = selectedLevel === 'All' || q.level.toLowerCase() === selectedLevel.toLowerCase();
    const matchSearch = q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        q.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTrack && matchLevel && matchSearch;
  });

  const handlePrint = () => {
    window.print();
  };

  const handleQuizSelect = (quizId: string, optIdx: number) => {
    if (submittedQuiz) return;
    setQuizAnswers(prev => ({ ...prev, [quizId]: optIdx }));
  };

  const handleQuizSubmit = () => {
    setSubmittedQuiz(true);
    let correct = 0;
    INTERVIEW_QUIZZES.forEach(q => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        correct += 1;
      }
    });
    const score = Math.round((correct / INTERVIEW_QUIZZES.length) * 100);
    recordQuizScore('interview-mastery', score);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold border border-indigo-500/20 mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Placement & Tech Interview Preparation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Technical Interview Questions & Answers
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Top questions with model answers, interviewer expectations, common traps, and company-wise prep.
          </p>
        </div>

        {/* Print / Save PDF Button */}
        <button
          onClick={handlePrint}
          className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white text-xs font-bold transition-colors shadow-sm"
        >
          <Printer className="w-4 h-4 text-emerald-400" />
          <span>Download / Print Interview Prep</span>
        </button>
      </div>

      {/* Top Section Nav Tabs */}
      <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-slate-800 mb-8 max-w-md">
        <button
          onClick={() => setActiveTab('qa')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'qa'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Top Q&A Guide
        </button>
        <button
          onClick={() => setActiveTab('companies')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'companies'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Company-Wise Prep
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'quiz'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Practice Mock Quiz
        </button>
      </div>

      {/* TAB 1: Q&A GUIDE */}
      {activeTab === 'qa' && (
        <div>
          {/* Filter Bar */}
          <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Track Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 text-xs">
              {tracks.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTrack(t)}
                  className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all ${
                    selectedTrack === t
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Level Toggle & Search */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="bg-slate-900 border border-slate-800 text-xs text-white rounded-xl px-3 py-2 focus:outline-none"
              >
                <option value="All">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Advanced">Advanced</option>
              </select>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search interview Q&As..."
                className="bg-slate-900 border border-slate-800 text-xs text-white rounded-xl px-3 py-2 focus:outline-none w-full md:w-48 placeholder-slate-500"
              />
            </div>
          </div>

          {/* Questions Accordion List */}
          <div className="space-y-4">
            {filteredQuestions.map((item, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div 
                  key={item.id}
                  className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden transition-all shadow-md"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-850 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                          {item.track}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          item.level === 'Beginner' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                        }`}>
                          {item.level}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        {item.question}
                      </h3>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-indigo-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="p-5 sm:p-6 border-t border-slate-800 space-y-5 bg-slate-950/50 animate-in fade-in duration-150">
                      {/* Model Answer */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
                          Model Answer:
                        </h4>
                        <p className="text-sm text-slate-200 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>

                      {/* Code Snippet */}
                      {item.codeExample && (
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                            <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                            Reference Implementation:
                          </div>
                          <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                            {item.codeExample}
                          </pre>
                        </div>
                      )}

                      {/* Key Points & Interviewer Expectations */}
                      {item.keyPoints && item.keyPoints.length > 0 && (
                        <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40 text-xs text-emerald-200">
                          <div className="font-bold text-emerald-400 mb-2 flex items-center gap-1.5">
                            <Lightbulb className="w-4 h-4" />
                            Key Points Interviewers Look For:
                          </div>
                          <ul className="space-y-1.5">
                            {item.keyPoints.map((pt, ptIdx) => (
                              <li key={ptIdx} className="flex items-start gap-2">
                                <span className="text-emerald-400 font-bold">•</span>
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Telugu Friendly Clarification */}
                      {item.teluguInsight && (
                        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
                          <span className="font-bold text-amber-400">Telugu Tip (సులభంగా గుర్తుంచుకోవడానికి): </span>
                          {item.teluguInsight}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: COMPANY-WISE PREPARATION */}
      {activeTab === 'companies' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 mb-6">
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-indigo-400" />
              Service & Product Company Interview Tracks
            </h2>
            <p className="text-xs text-slate-400">
              Pattern breakdown for TCS, Infosys, Wipro, Accenture, Google, Amazon, Microsoft, and tech startups.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {COMPANY_INTERVIEW_QUESTIONS.map((comp) => (
              <div 
                key={comp.id}
                className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all shadow-lg space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">{comp.company}</h3>
                    <span className="text-xs text-indigo-400 font-semibold">{comp.focus}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {comp.frequentlyAskedTopics.length} Focus Areas
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Frequently Asked Questions:
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-200">
                    {comp.frequentlyAskedTopics.map((topic, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-amber-300/90">
                  <span className="font-bold text-amber-400">Placement Strategy: </span>
                  {comp.preparationStrategy}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: MOCK QUIZ */}
      {activeTab === 'quiz' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-3xl mx-auto shadow-xl">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-emerald-400" />
                Technical Interview Mock Quiz
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Real technical questions from corporate interviews.
              </p>
            </div>
            {submittedQuiz && (
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Evaluation Complete
              </span>
            )}
          </div>

          <div className="space-y-6">
            {INTERVIEW_QUIZZES.map((q, idx) => {
              const userAns = quizAnswers[q.id];
              const isAnswered = userAns !== undefined;
              const isCorrect = userAns === q.correctAnswer;

              return (
                <div key={q.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                  <p className="text-sm font-semibold text-white mb-3">
                    {idx + 1}. {q.question}
                  </p>

                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = userAns === optIdx;
                      let cls = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                      if (submittedQuiz) {
                        if (optIdx === q.correctAnswer) {
                          cls = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold';
                        } else if (isSelected && optIdx !== q.correctAnswer) {
                          cls = 'bg-rose-950/60 border-rose-500 text-rose-300';
                        }
                      } else if (isSelected) {
                        cls = 'bg-indigo-600/30 border-indigo-500 text-white font-semibold';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={submittedQuiz}
                          onClick={() => handleQuizSelect(q.id, optIdx)}
                          className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${cls}`}
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
                    <div className={`mt-3 p-3 rounded-xl text-xs leading-relaxed ${
                      isCorrect ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20' : 'bg-slate-900 text-slate-300 border border-slate-800'
                    }`}>
                      <span className="font-bold">{isCorrect ? '✅ Spot on! ' : '💡 Answer Explanation: '}</span>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}

            {!submittedQuiz ? (
              <button
                onClick={handleQuizSubmit}
                disabled={Object.keys(quizAnswers).length === 0}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-sm shadow-md transition-all"
              >
                Submit Mock Interview Quiz
              </button>
            ) : (
              <button
                onClick={() => { setSubmittedQuiz(false); setQuizAnswers({}); }}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
              >
                Retake Quiz
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
