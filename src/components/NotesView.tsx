import React, { useState } from 'react';
import { 
  FileText, 
  Printer, 
  Clock, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  Copy, 
  Check, 
  ArrowLeft,
  Share2
} from 'lucide-react';
import { NOTES_DATA } from '../data/notesData';
import { NoteDoc } from '../types';

interface NotesViewProps {
  initialNoteId?: string;
}

export const NotesView: React.FC<NotesViewProps> = ({ initialNoteId }) => {
  const [activeNote, setActiveNote] = useState<NoteDoc>(
    NOTES_DATA.find(n => n.id === initialNoteId) || NOTES_DATA[0]
  );
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopySection = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20 mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>100% Free Study Material</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Curated Study Notes & Cheat-Sheets
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Clean, revision-ready reference guides. Downloadable & printable for exam & interview revision.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="self-start md:self-auto flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-lg shadow-emerald-900/30"
        >
          <Printer className="w-4 h-4" />
          <span>Save as PDF / Print Note</span>
        </button>
      </div>

      {/* Grid Layout: Note Selector + Active Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left List of Notes (4 Cols) */}
        <div className="lg:col-span-4 space-y-2">
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Available Handbooks ({NOTES_DATA.length})
            </span>
          </div>

          <div className="space-y-2">
            {NOTES_DATA.map((note) => {
              const isSelected = activeNote.id === note.id;

              return (
                <button
                  key={note.id}
                  onClick={() => setActiveNote(note)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/25'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-850 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {note.category}
                      </span>
                      <span className={`text-[11px] flex items-center gap-1 ${
                        isSelected ? 'text-indigo-100' : 'text-slate-500'
                      }`}>
                        <Clock className="w-3 h-3" />
                        {note.readTime}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold">
                      {note.title}
                    </h3>
                    <p className={`text-xs line-clamp-2 ${isSelected ? 'text-indigo-100' : 'text-slate-400'}`}>
                      {note.summary}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Printable Reader View (8 Cols) */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8 print:bg-white print:text-black print:border-none print:p-0">
          
          {/* Note Title & Header */}
          <div className="border-b border-slate-800 pb-6 print:border-gray-300">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 print:border-gray-400 print:text-black">
                {activeNote.category}
              </span>
              <span className="text-xs text-slate-400 print:text-gray-600">
                • {activeNote.readTime} reading time
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3 print:text-black">
              {activeNote.title}
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed print:text-gray-700">
              {activeNote.summary}
            </p>
          </div>

          {/* Key Takeaways */}
          <div className="p-5 rounded-2xl bg-indigo-950/25 border border-indigo-900/40 print:bg-gray-100 print:border-gray-300">
            <h3 className="text-sm font-bold text-indigo-300 mb-3 flex items-center gap-2 print:text-black">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Core Takeaways:
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-200 print:text-gray-800">
              {activeNote.keyTakeaways.map((takeaway, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Note Content */}
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800 text-xs text-slate-400 print:hidden">
              <span className="font-mono text-xs text-emerald-400 font-semibold">Study Notes & Code Handbook</span>
              <button
                onClick={() => handleCopySection(activeNote.content)}
                className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied Notes' : 'Copy All Notes'}</span>
              </button>
            </div>

            <div className="p-6 bg-slate-950/80 rounded-2xl border border-slate-800/80 overflow-x-auto print:bg-white print:border-none print:p-0">
              <pre className="font-mono text-xs sm:text-sm text-slate-200 whitespace-pre-wrap leading-relaxed print:text-black print:font-sans">
                {activeNote.content}
              </pre>
            </div>
          </div>

          {/* Academy Footer Note for Prints */}
          <div className="pt-6 border-t border-slate-800 text-xs text-slate-500 flex justify-between items-center print:text-gray-600 print:border-gray-300">
            <span>Published by Hemanth Coding Academy • 100% Free For All Students</span>
            <span>https://hemanthcodingacademy.edu</span>
          </div>

        </div>

      </div>

    </div>
  );
};
