import React, { useState } from 'react';
import { 
  BookOpen, 
  Code2, 
  Coffee, 
  Cpu, 
  Layers, 
  FileCode, 
  Palette, 
  Zap, 
  Network, 
  Database, 
  GitBranch, 
  Sparkles, 
  Layout, 
  Server,
  CheckCircle2,
  Clock,
  ArrowRight,
  Share2,
  Search,
  Filter
} from 'lucide-react';
import { Course } from '../types';
import { useAuth } from '../context/AuthContext';

interface CoursesViewProps {
  courses: Course[];
  onSelectCourse: (course: Course) => void;
  onSelectLesson: (course: Course, lessonId: string) => void;
  onShareCourse: (courseId: string) => void;
  selectedCourseId?: string | null;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Code2,
  Coffee,
  Cpu,
  Layers,
  FileCode,
  Palette,
  Zap,
  Network,
  Database,
  GitBranch,
  Sparkles,
  Layout,
  Server
};

export const CoursesView: React.FC<CoursesViewProps> = ({
  courses,
  onSelectCourse,
  onSelectLesson,
  onShareCourse,
  selectedCourseId
}) => {
  const { user, isCompleted } = useAuth();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [detailCourse, setDetailCourse] = useState<Course | null>(
    selectedCourseId ? courses.find(c => c.id === selectedCourseId) || null : null
  );

  const categories = ['All', 'Programming', 'Web Development', 'Computer Science', 'Database', 'Artificial Intelligence', 'Tools'];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = activeCategory === 'All' || course.category.toLowerCase().includes(activeCategory.toLowerCase());
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCourseProgress = (course: Course) => {
    if (!user || course.lessons.length === 0) return 0;
    const completedCount = course.lessons.filter(l => user.completedLessons.includes(l.id)).length;
    return Math.round((completedCount / course.lessons.length) * 100);
  };

  // If a specific course is opened in detailed syllabus mode
  if (detailCourse) {
    const progress = getCourseProgress(detailCourse);
    const IconComponent = ICON_MAP[detailCourse.iconName] || Code2;

    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 animate-in fade-in duration-200">
        
        {/* Back link */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => setDetailCourse(null)}
            className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            ← Back to All 13 Courses
          </button>
          
          <button
            onClick={() => onShareCourse(detailCourse.id)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-emerald-400" />
            Share Course
          </button>
        </div>

        {/* Course Header Banner */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 mb-8 shadow-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
              <IconComponent className="w-8 h-8 text-indigo-400" />
            </div>

            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {detailCourse.category}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  100% Free
                </span>
                <span className="text-xs text-slate-400">
                  {detailCourse.level} • {detailCourse.lessons.length} Lessons
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {detailCourse.title}
              </h1>
              <p className="text-sm text-slate-300">
                {detailCourse.description}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 pt-6 border-t border-slate-800/80">
            <div className="flex justify-between items-center text-xs font-semibold mb-2">
              <span className="text-slate-400">Your Learning Progress</span>
              <span className="text-emerald-400">{progress}% Completed</span>
            </div>
            <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Syllabus / Lessons List */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            Course Curriculum & Lessons
          </h2>

          <div className="space-y-3">
            {detailCourse.lessons.map((lesson, idx) => {
              const completed = isCompleted(lesson.id);
              return (
                <div
                  key={lesson.id}
                  onClick={() => onSelectLesson(detailCourse, lesson.id)}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 cursor-pointer transition-all flex items-center justify-between group shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                      completed
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {completed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>

                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-indigo-400 transition-colors">
                        {lesson.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          lesson.level === 'Beginner' ? 'bg-emerald-500/10 text-emerald-400' :
                          lesson.level === 'Intermediate' ? 'bg-amber-500/10 text-amber-400' :
                          'bg-purple-500/10 text-purple-400'
                        }`}>
                          {lesson.level}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {lesson.durationMinutes} mins
                        </span>
                        {lesson.teluguHint && (
                          <span className="text-amber-400/90 text-[11px] hidden md:inline">
                            💡 Telugu Explanation Included
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button className="px-3.5 py-1.5 rounded-xl bg-slate-800 group-hover:bg-indigo-600 text-slate-300 group-hover:text-white font-semibold text-xs transition-colors shrink-0 flex items-center gap-1">
                    <span>{completed ? 'Review' : 'Start'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    );
  }

  // Catalog Grid of All 13 Courses
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="mb-8 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>All 13 Courses • 100% Free For All Learners</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Explore Our Complete Coding Curriculum
        </h1>
        <p className="text-sm text-slate-400 mt-2">
          From beginner programming foundations to advanced data structures, full-stack development, and artificial intelligence.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Box */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search 13 courses..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const IconComponent = ICON_MAP[course.iconName] || Code2;
          const progress = getCourseProgress(course);

          return (
            <div
              key={course.id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 hover:bg-slate-900 transition-all flex flex-col justify-between shadow-lg group relative"
            >
              <div>
                {/* Top Row: Icon + Badge + Share */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-600/15 border border-indigo-500/25 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <IconComponent className="w-6 h-6 text-indigo-400" />
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      FREE
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onShareCourse(course.id);
                      }}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors"
                      title="Share course"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Title and Tagline */}
                <div className="space-y-1 mb-3">
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                    {course.category}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {course.tagline}
                  </p>
                </div>
              </div>

              {/* Bottom Row: Progress and CTA */}
              <div className="pt-4 border-t border-slate-800/80 space-y-3">
                {/* Progress bar */}
                <div>
                  <div className="flex justify-between items-center text-[10px] font-semibold text-slate-400 mb-1">
                    <span>{course.lessons.length} Modules</span>
                    <span>{progress}% Completed</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => setDetailCourse(course)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-indigo-600 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 group-hover:shadow-md"
                >
                  <span>{progress > 0 ? 'Continue Learning' : 'Start Course Free'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
