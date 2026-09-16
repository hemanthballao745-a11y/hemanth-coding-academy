import React from 'react';
import { 
  Sparkles, 
  Terminal, 
  BookOpen, 
  Network, 
  Briefcase, 
  FileText, 
  CheckSquare, 
  Flame, 
  ArrowRight, 
  Play, 
  Share2, 
  CheckCircle2, 
  Code2, 
  Coffee, 
  Cpu, 
  Layers, 
  FileCode, 
  Palette, 
  Zap, 
  Database, 
  GitBranch, 
  Layout, 
  Server 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { COURSES_DATA } from '../data/coursesData';
import { DAILY_CHALLENGE } from '../data/problemsData';

interface HomeViewProps {
  onNavigate: (tab: string, params?: any) => void;
  onShareApp: () => void;
  onOpenCompilerWithCode: (code: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onShareApp,
  onOpenCompilerWithCode
}) => {
  const { user } = useAuth();

  const QUICK_LANGUAGES = [
    { name: 'Python', courseId: 'python', icon: Code2, desc: 'Syntax, OOP, Functions' },
    { name: 'Java', courseId: 'java', icon: Coffee, desc: 'JVM, OOP, Collections' },
    { name: 'C & C++', courseId: 'c-lang', icon: Cpu, desc: 'Pointers, Memory, STL' },
    { name: 'HTML & CSS', courseId: 'html', icon: FileCode, desc: 'Flexbox, Grid, Semantics' },
    { name: 'JavaScript', courseId: 'javascript', icon: Zap, desc: 'ES6+, Async/Await, DOM' },
    { name: 'DSA Roadmap', courseId: 'dsa-fundamentals', icon: Network, desc: 'Trees, Graphs, DP' },
    { name: 'SQL DB', courseId: 'sql', icon: Database, desc: 'Joins, Indexes, Schema' },
    { name: 'Git & GitHub', courseId: 'git-github', icon: GitBranch, desc: 'Branching, PRs, Merge' },
    { name: 'Artificial Intelligence', courseId: 'ai-essentials', icon: Sparkles, desc: 'LLMs, Embeddings, RAG' },
    { name: 'Frontend Dev', courseId: 'frontend-dev', icon: Layout, desc: 'React, State, Tailwind' },
    { name: 'Backend Dev', courseId: 'backend-dev', icon: Server, desc: 'Node.js, APIs, Auth' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16 animate-in fade-in duration-200">
      
      {/* Hero Section */}
      <div className="relative text-center max-w-4xl mx-auto space-y-6 pt-4 sm:pt-8">
        
        {/* Badges row */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/25 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>100% Free Coding Platform For All Learners</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold border border-indigo-500/25">
            <span>Telugu & English Friendly</span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.15]">
          Master Coding from Scratch to <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400">Tech Career Ready</span>
        </h1>

        {/* Tagline / Subtitle */}
        <p className="text-base sm:text-xl font-medium text-slate-300 max-w-2xl mx-auto leading-relaxed">
          "Learn Coding. Practice Coding. Prepare for Interviews."
        </p>

        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          13 comprehensive beginner-to-advanced courses with line-by-line code explanations, real Python cloud compiler, complete DSA mastery roadmap, and placement interview prep.
        </p>

        {/* Hero CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('courses')}
            className="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all hover:scale-102 active:scale-98 flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>Start Learning (13 Free Courses)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigate('compiler')}
            className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white font-bold text-sm transition-all flex items-center gap-2 shadow-lg"
          >
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>Open Python Compiler</span>
          </button>

          <button
            onClick={onShareApp}
            className="px-4 py-3.5 rounded-2xl bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-800/60 text-emerald-300 text-sm font-semibold transition-all flex items-center gap-2"
            title="Share platform with friends"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>

        {/* User Progress Glance Bar */}
        {user && (
          <div className="mt-8 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 max-w-2xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black">
                <Flame className="w-4 h-4 fill-amber-500" />
              </div>
              <div className="text-left">
                <div className="font-bold text-white">{user.name}'s Learning Streak</div>
                <div className="text-slate-400">{user.streak} Days Active • {user.completedLessons.length} Completed Lessons</div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('profile')}
              className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              View Learning Dashboard →
            </button>
          </div>
        )}
      </div>

      {/* 4 Major Academy Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Pillar 1: 13 Complete Courses */}
        <div 
          onClick={() => onNavigate('courses')}
          className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/60 hover:bg-slate-900 transition-all cursor-pointer group shadow-lg flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/15 border border-indigo-500/25 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-white group-hover:text-indigo-400 transition-colors">
              13 Structured Courses
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Python, Java, C, C++, HTML, CSS, JavaScript, DSA, SQL, Git & GitHub, AI, Frontend, and Backend.
            </p>
          </div>
          <div className="pt-4 mt-2 flex items-center text-xs font-bold text-indigo-400 gap-1 group-hover:translate-x-1 transition-transform">
            <span>Explore All 13 Tracks</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Pillar 2: Online Python Compiler */}
        <div 
          onClick={() => onNavigate('compiler')}
          className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/60 hover:bg-slate-900 transition-all cursor-pointer group shadow-lg flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <Terminal className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-white group-hover:text-emerald-400 transition-colors">
              Online Python Compiler
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Instant in-browser Python 3 execution sandbox with stdin support, live output and syntax validation.
            </p>
          </div>
          <div className="pt-4 mt-2 flex items-center text-xs font-bold text-emerald-400 gap-1 group-hover:translate-x-1 transition-transform">
            <span>Launch Compiler</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Pillar 3: DSA Mastery */}
        <div 
          onClick={() => onNavigate('dsa')}
          className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/60 hover:bg-slate-900 transition-all cursor-pointer group shadow-lg flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/25 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
              <Network className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-white group-hover:text-purple-400 transition-colors">
              DSA Mastery Roadmap
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Arrays, Trees, Graphs, Recursion, DP, and Big-O with line-by-line explanations and real-world analogies.
            </p>
          </div>
          <div className="pt-4 mt-2 flex items-center text-xs font-bold text-purple-400 gap-1 group-hover:translate-x-1 transition-transform">
            <span>Learn Data Structures</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Pillar 4: Interview & Cheat-Sheets */}
        <div 
          onClick={() => onNavigate('interview')}
          className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/60 hover:bg-slate-900 transition-all cursor-pointer group shadow-lg flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-white group-hover:text-amber-400 transition-colors">
              Interview Prep & PDFs
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              TCS, Infosys, Wipro, Google, Amazon questions, detailed model answers, interviewer tips, and printable notes.
            </p>
          </div>
          <div className="pt-4 mt-2 flex items-center text-xs font-bold text-amber-400 gap-1 group-hover:translate-x-1 transition-transform">
            <span>Interview Preparation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

      </div>

      {/* Quick Access Language Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Start Learning by Technology
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Select any track to access line-by-line lessons, code examples, and quizzes.
            </p>
          </div>
          <button
            onClick={() => onNavigate('courses')}
            className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            View All 13 Courses →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {QUICK_LANGUAGES.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.courseId}
                onClick={() => onNavigate('courses', { courseId: item.courseId })}
                className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-850 text-left transition-all flex items-center gap-3.5 group shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors truncate">
                    {item.name}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    {item.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Daily Challenge Interactive Card */}
      <div className="bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-900/40 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
                <Flame className="w-3.5 h-3.5 fill-amber-500" />
                Featured Daily Coding Challenge
              </span>
              <span className="text-xs font-bold text-slate-400">
                Difficulty: {DAILY_CHALLENGE.difficulty}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {DAILY_CHALLENGE.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {DAILY_CHALLENGE.description}
            </p>
          </div>

          <button
            onClick={() => onNavigate('problems')}
            className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-emerald-900/30 shrink-0"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Practice & Solve Now</span>
          </button>
        </div>
      </div>

      {/* Interactive Live Python Mini Demo */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-emerald-400" />
              Try Real Python Execution Right Now
            </h3>
            <p className="text-xs text-slate-400">
              Run this script directly in the cloud with zero setup:
            </p>
          </div>

          <button
            onClick={() => onOpenCompilerWithCode(`def calculate_career_growth(current_streak):\n    print(f"🔥 Daily Coding Streak: {current_streak} days")\n    milestones = ["Learner", "Problem Solver", "Full-Stack Dev", "Interview Ready"]\n    for idx, role in enumerate(milestones, start=1):\n        print(f"Level {idx}: {role} achieved!")\n\ncalculate_career_growth(7)`)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all self-start sm:self-auto shadow-md"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Open in Full Compiler</span>
          </button>
        </div>

        <pre className="p-4 bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 rounded-2xl overflow-x-auto leading-relaxed">
{`# Sample Python code ready to run
academy = "Hemanth Coding Academy"
print(f"Welcome to {academy}!")
print("Learn Coding. Practice Coding. Prepare for Interviews.")
for day in range(1, 4):
    print(f"Day {day}: Completed lesson & maintained streak!")`}
        </pre>
      </div>

    </div>
  );
};
