import React, { useState } from 'react';
import { 
  CheckSquare, 
  Flame, 
  Play, 
  CheckCircle2, 
  Code2, 
  HelpCircle, 
  Sparkles, 
  ArrowRight,
  Filter,
  Eye,
  EyeOff
} from 'lucide-react';
import { CODING_PROBLEMS, DAILY_CHALLENGE } from '../data/problemsData';
import { CodingProblem } from '../types';
import { useAuth } from '../context/AuthContext';

interface CodingProblemsViewProps {
  onOpenCompilerWithCode: (code: string) => void;
}

export const CodingProblemsView: React.FC<CodingProblemsViewProps> = ({
  onOpenCompilerWithCode
}) => {
  const { user, recordSolvedProblem } = useAuth();
  const [filterDifficulty, setFilterDifficulty] = useState<string>('All');
  const [selectedProblem, setSelectedProblem] = useState<CodingProblem>(DAILY_CHALLENGE);
  const [showSolution, setShowSolution] = useState(false);

  const filteredList = CODING_PROBLEMS.filter(p => {
    if (filterDifficulty === 'All') return true;
    return p.difficulty.toLowerCase() === filterDifficulty.toLowerCase();
  });

  const isSolved = (id: string) => {
    return user ? user.solvedProblems.includes(id) : false;
  };

  const handleSolveProblem = (problem: CodingProblem) => {
    onOpenCompilerWithCode(problem.starterCode);
    recordSolvedProblem(problem.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="mb-8 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20 mb-3">
          <CheckSquare className="w-3.5 h-3.5" />
          <span>Coding Practice & Daily Tasks</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Coding Problems & Daily Programming Challenges
        </h1>
        <p className="text-sm text-slate-400 mt-2">
          Solve curated coding questions across Arrays, Strings, Stack, and Greedy. Filter by difficulty: Easy, Medium, and Hard.
        </p>
      </div>

      {/* Daily Challenge Highlight Card */}
      <div className="mb-10 bg-gradient-to-r from-indigo-950/60 via-slate-900 to-slate-900 border border-indigo-900/60 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
                <Flame className="w-3.5 h-3.5 fill-amber-500" />
                Today's Daily Challenge
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400">
                {DAILY_CHALLENGE.difficulty}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {DAILY_CHALLENGE.category}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              {DAILY_CHALLENGE.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 line-clamp-2">
              {DAILY_CHALLENGE.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={() => {
                setSelectedProblem(DAILY_CHALLENGE);
                setShowSolution(false);
              }}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors text-center"
            >
              View Problem Details
            </button>
            <button
              onClick={() => handleSolveProblem(DAILY_CHALLENGE)}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/40"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              Solve in Python Compiler
            </button>
          </div>
        </div>
      </div>

      {/* Main Problems Explorer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Problem Filters & List (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Difficulty Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs">
            {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
              <button
                key={diff}
                onClick={() => setFilterDifficulty(diff)}
                className={`flex-1 py-1.5 rounded-lg font-semibold transition-all ${
                  filterDifficulty === diff
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          {/* List of Problems */}
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredList.map((prob) => {
              const solved = isSolved(prob.id);
              const isSelected = selectedProblem.id === prob.id;

              return (
                <div
                  key={prob.id}
                  onClick={() => {
                    setSelectedProblem(prob);
                    setShowSolution(false);
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                    isSelected
                      ? 'bg-indigo-950/40 border-indigo-500 text-white'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        prob.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400' :
                        prob.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400' :
                        'bg-rose-500/10 text-rose-400'
                      }`}>
                        {prob.difficulty}
                      </span>
                      <span className="text-[11px] text-slate-500">{prob.category}</span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
                      {prob.title}
                    </h4>
                  </div>

                  {solved ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-950/50 px-2 py-1 rounded-lg border border-emerald-800/40">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Solved
                    </span>
                  ) : (
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                  )}
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Column: Active Problem Solver & Playground (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  selectedProblem.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400' :
                  selectedProblem.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400' :
                  'bg-rose-500/10 text-rose-400'
                }`}>
                  {selectedProblem.difficulty}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {selectedProblem.category}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {selectedProblem.title}
              </h3>
            </div>

            <button
              onClick={() => handleSolveProblem(selectedProblem)}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Solve in Python Compiler</span>
            </button>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Problem Statement</h4>
            <p className="text-sm leading-relaxed text-slate-300">
              {selectedProblem.description}
            </p>
          </div>

          {/* Sample I/O */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Sample Input:
              </span>
              <code className="text-xs font-mono text-emerald-400">
                {selectedProblem.sampleInput}
              </code>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Sample Output:
              </span>
              <code className="text-xs font-mono text-emerald-400">
                {selectedProblem.sampleOutput}
              </code>
            </div>
          </div>

          {/* Starter Code Box */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Starter Python Code
              </span>
              <button
                onClick={() => handleSolveProblem(selectedProblem)}
                className="text-xs font-semibold text-emerald-400 hover:text-emerald-300"
              >
                Open in Editor →
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed">
              {selectedProblem.starterCode}
            </pre>
          </div>

          {/* Solution & Explanation Toggle */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="flex items-center gap-2 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              {showSolution ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{showSolution ? 'Hide Solution & Complexity Analysis' : 'Show Solution & Complexity Analysis'}</span>
            </button>

            {showSolution && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-900/40 text-xs text-indigo-200 leading-relaxed">
                  <div className="font-bold text-indigo-400 mb-1">Approach & Complexity:</div>
                  <p>{selectedProblem.explanation}</p>
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Optimal Python Solution
                  </span>
                  <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                    {selectedProblem.solutionCode}
                  </pre>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
