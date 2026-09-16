import React, { useState, useMemo } from 'react';
import { Search, X, BookOpen, Network, Briefcase, FileText, ArrowRight } from 'lucide-react';
import { COURSES_DATA } from '../data/coursesData';
import { DSA_TOPICS } from '../data/dsaTopics';
import { INTERVIEW_QUESTIONS } from '../data/interviewData';
import { NOTES_DATA } from '../data/notesData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: string, params?: { courseId?: string; lessonId?: string; dsaId?: string; noteId?: string }) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();

    const items: Array<{
      type: 'course' | 'lesson' | 'dsa' | 'interview' | 'note';
      title: string;
      subtitle: string;
      category: string;
      tab: string;
      params?: any;
    }> = [];

    // Search Courses & Lessons
    COURSES_DATA.forEach(course => {
      if (course.title.toLowerCase().includes(q) || course.description.toLowerCase().includes(q)) {
        items.push({
          type: 'course',
          title: course.title,
          subtitle: course.tagline,
          category: 'Course',
          tab: 'courses',
          params: { courseId: course.id }
        });
      }

      course.lessons.forEach(lesson => {
        if (
          lesson.title.toLowerCase().includes(q) || 
          lesson.explanation.toLowerCase().includes(q) ||
          (lesson.teluguHint && lesson.teluguHint.toLowerCase().includes(q))
        ) {
          items.push({
            type: 'lesson',
            title: lesson.title,
            subtitle: `${course.title} • ${lesson.level}`,
            category: 'Lesson',
            tab: 'lesson',
            params: { courseId: course.id, lessonId: lesson.id }
          });
        }
      });
    });

    // Search DSA Topics
    DSA_TOPICS.forEach(topic => {
      if (
        topic.title.toLowerCase().includes(q) || 
        topic.description.toLowerCase().includes(q) || 
        (topic.teluguExplanation && topic.teluguExplanation.toLowerCase().includes(q))
      ) {
        items.push({
          type: 'dsa',
          title: topic.title,
          subtitle: `${topic.category} • ${topic.timeComplexity}`,
          category: 'DSA Topic',
          tab: 'dsa',
          params: { dsaId: topic.id }
        });
      }
    });

    // Search Interview Questions
    INTERVIEW_QUESTIONS.forEach(intQ => {
      if (intQ.question.toLowerCase().includes(q) || intQ.answer.toLowerCase().includes(q)) {
        items.push({
          type: 'interview',
          title: intQ.question,
          subtitle: `${intQ.track} • ${intQ.level}`,
          category: 'Interview Prep',
          tab: 'interview'
        });
      }
    });

    // Search Notes
    NOTES_DATA.forEach(note => {
      if (note.title.toLowerCase().includes(q) || note.summary.toLowerCase().includes(q)) {
        items.push({
          type: 'note',
          title: note.title,
          subtitle: `${note.category} • ${note.readTime}`,
          category: 'PDF Notes',
          tab: 'notes',
          params: { noteId: note.id }
        });
      }
    });

    return items.slice(0, 15);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-sm">
      <div 
        className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-indigo-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Python, Java, DSA, Big-O, SQL, React, Interview questions..."
            className="w-full bg-transparent border-none text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-white px-2 py-1 bg-slate-800 rounded"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-slate-800/50">
          {query.trim() === '' ? (
            <div className="p-8 text-center text-slate-500 text-xs">
              <p className="mb-2">Type any topic or language to search the entire Academy catalog.</p>
              <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                {['Python', 'Linked List', 'SQL Joins', 'Binary Search', 'React Hooks', 'Big-O', 'Interviews'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              No results found for "{query}". Try checking another keyword or language.
            </div>
          ) : (
            results.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onNavigate(item.tab, item.params);
                  onClose();
                }}
                className="w-full p-3 rounded-xl hover:bg-slate-800/60 text-left transition-colors flex items-center justify-between group"
              >
                <div className="space-y-0.5 max-w-[85%]">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {item.category}
                    </span>
                    <h4 className="text-xs sm:text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors truncate">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">
                    {item.subtitle}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all shrink-0" />
              </button>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-950/70 border-t border-slate-800/80 text-[11px] text-slate-500 flex justify-between items-center">
          <span>Search 13 Courses, DSA, Tasks & Interviews</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
};
