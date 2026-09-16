import React, { useState } from 'react';
import { 
  Network, 
  Clock, 
  HardDrive, 
  Lightbulb, 
  Code2, 
  Play, 
  CheckCircle2, 
  Briefcase, 
  Copy, 
  Check, 
  Sparkles,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { DSA_TOPICS, DsaTopic } from '../data/dsaTopics';

interface DsaViewProps {
  onOpenCompilerWithCode: (code: string) => void;
  selectedTopicId?: string;
}

export const DsaView: React.FC<DsaViewProps> = ({ 
  onOpenCompilerWithCode,
  selectedTopicId
}) => {
  const [activeTopicId, setActiveTopicId] = useState<string>(
    selectedTopicId || DSA_TOPICS[0].id
  );
  const [copied, setCopied] = useState(false);

  const activeTopic = DSA_TOPICS.find(t => t.id === activeTopicId) || DSA_TOPICS[0];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="mb-8 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold border border-indigo-500/20 mb-3">
          <Network className="w-3.5 h-3.5" />
          <span>Complete DSA Mastery Roadmap</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Data Structures & Algorithms (DSA)
        </h1>
        <p className="text-sm text-slate-400 mt-2">
          Arrays, Strings, Linked Lists, Stack, Queue, Hashing, Trees, BST, Graphs, Recursion, Sorting, Searching, Dynamic Programming, Greedy Algorithms and Big-O Complexity.
        </p>
      </div>

      {/* Main Layout: Left Navigation + Right Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Sidebar: Topics List (4 Cols) */}
        <div className="lg:col-span-4 space-y-2">
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Core DSA Curriculum ({DSA_TOPICS.length} Topics)
            </span>
          </div>

          <div className="space-y-1.5 max-h-[70vh] overflow-y-auto pr-1">
            {DSA_TOPICS.map((topic, index) => {
              const isActive = activeTopic.id === topic.id;
              return (
                <button
                  key={topic.id}
                  onClick={() => setActiveTopicId(topic.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                    isActive
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/25'
                      : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:bg-slate-850 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {index + 1}
                      </span>
                      <span className="text-xs font-bold truncate">
                        {topic.title}
                      </span>
                    </div>
                    <div className={`text-[11px] truncate ${isActive ? 'text-indigo-100' : 'text-slate-400'}`}>
                      {topic.category}
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Panel: Detailed Topic View (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Topic Title & Complexity Badges */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                {activeTopic.category}
              </span>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                activeTopic.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400' :
                activeTopic.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400' :
                'bg-rose-500/10 text-rose-400'
              }`}>
                {activeTopic.difficulty}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
              {activeTopic.title}
            </h2>

            <p className="text-sm leading-relaxed text-slate-300 mb-6">
              {activeTopic.description}
            </p>

            {/* Time & Space Complexity Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-800">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                <Clock className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-[10px] font-bold uppercase text-slate-400">Time Complexity</div>
                  <div className="text-xs font-mono font-bold text-emerald-300">{activeTopic.timeComplexity}</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                <HardDrive className="w-5 h-5 text-indigo-400 shrink-0" />
                <div>
                  <div className="text-[10px] font-bold uppercase text-slate-400">Space Complexity</div>
                  <div className="text-xs font-mono font-bold text-indigo-300">{activeTopic.spaceComplexity}</div>
                </div>
              </div>
            </div>

            {/* Real World Analogy & Telugu Insight */}
            <div className="mt-4 space-y-3">
              <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-900/30 text-xs text-indigo-200">
                <span className="font-bold text-indigo-400">💡 Real World Analogy: </span>
                {activeTopic.realWorldAnalogy}
              </div>

              {activeTopic.teluguExplanation && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
                  <span className="font-bold text-amber-400">Telugu Friendly Summary (తెలుగు వివరణ): </span>
                  {activeTopic.teluguExplanation}
                </div>
              )}
            </div>
          </div>

          {/* Key Architectural Concepts */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Core Algorithmic Principles
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              {activeTopic.keyConcepts.map((concept, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{concept}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Implementation & Code Sandbox */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="px-5 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-indigo-400" />
                <span className="font-bold text-white">Algorithm Implementation</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyCode(activeTopic.pythonCode)}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center gap-1 font-semibold text-xs transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>

                <button
                  onClick={() => onOpenCompilerWithCode(activeTopic.pythonCode)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  Run in Python Compiler
                </button>
              </div>
            </div>

            <pre className="p-4 bg-slate-950/80 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed">
              {activeTopic.pythonCode}
            </pre>
          </div>

          {/* Line-by-Line Code Breakdown */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              Line-by-Line Code Explanation
            </h3>
            <div className="space-y-3">
              {activeTopic.lineByLineExplanation.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/60 flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                  <code className="shrink-0 font-mono text-xs text-indigo-300 font-semibold bg-indigo-950/30 px-2 py-1 rounded border border-indigo-900/40">
                    {item.line}
                  </code>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Common Interview Questions for this Topic */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-amber-400 mb-3 flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Top Interview Problems on this Topic
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
              {activeTopic.commonInterviewQuestions.map((q, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                  <span>{q}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
