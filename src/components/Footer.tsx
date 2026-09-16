import React from 'react';
import { Code2, Heart, Share2, Sparkles, Terminal, BookOpen, Network, Briefcase, FileText } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onShareApp: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onShareApp }) => {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 text-slate-400 text-sm mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1: Brand & Mission */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <Code2 className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="font-extrabold text-white text-base">
                Hemanth <span className="text-emerald-400">Coding</span> Academy
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              "Learn Coding. Practice Coding. Prepare for Interviews."
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
              <Sparkles className="w-3 h-3" />
              100% Free For All Learners
            </div>
          </div>

          {/* Col 2: Core Courses */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Popular Courses</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('courses')} className="hover:text-emerald-400 transition-colors">
                  Python Programming
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('courses')} className="hover:text-emerald-400 transition-colors">
                  Java & Enterprise JVM
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('courses')} className="hover:text-emerald-400 transition-colors">
                  C & C++ Systems
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('courses')} className="hover:text-emerald-400 transition-colors">
                  HTML, CSS & JavaScript
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('courses')} className="hover:text-emerald-400 transition-colors">
                  SQL & Databases
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('courses')} className="hover:text-emerald-400 transition-colors">
                  Frontend & Backend Dev
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Practice & Preparation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Practice & Tools</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('compiler')} className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <Terminal className="w-3 h-3 text-emerald-400" />
                  Online Python Compiler
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('dsa')} className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <Network className="w-3 h-3 text-emerald-400" />
                  DSA Mastery Roadmap
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('problems')} className="hover:text-emerald-400 transition-colors">
                  Daily Coding Challenges
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('interview')} className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <Briefcase className="w-3 h-3 text-emerald-400" />
                  Technical Interview Prep
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('notes')} className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <FileText className="w-3 h-3 text-emerald-400" />
                  Downloadable Notes & PDFs
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Share & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Share Knowledge</h4>
            <p className="text-xs text-slate-400">
              Help fellow learners start their tech journey for free. Share the academy with your friends and college batchmates.
            </p>
            <button
              onClick={onShareApp}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors shadow-sm"
            >
              <Share2 className="w-3.5 h-3.5" />
              Share Academy Link
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Hemanth Coding Academy. Built with passion for open computer science education.</p>
          <div className="flex items-center gap-2 text-slate-400">
            <span>Telugu & English Friendly</span>
            <span>•</span>
            <span>Zero Subscription Fees</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
