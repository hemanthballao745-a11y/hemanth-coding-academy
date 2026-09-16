import React from 'react';
import { 
  User as UserIcon, 
  Flame, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Bookmark, 
  LogOut, 
  Sparkles, 
  Calendar, 
  Clock, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { COURSES_DATA } from '../data/coursesData';

interface ProfileViewProps {
  onSelectCourseLesson: (courseId: string, lessonId: string) => void;
  onOpenAuthModal: () => void;
}

const ALL_AVAILABLE_BADGES = [
  { name: 'New Explorer', desc: 'Started journey at Hemanth Coding Academy', icon: '🚀' },
  { name: 'Python Pioneer', desc: 'Completed Python fundamentals & executed code', icon: '🐍' },
  { name: 'Problem Solver', desc: 'Solved coding challenge with custom logic', icon: '💡' },
  { name: '3-Day Streak', desc: 'Maintained steady learning streak for 3 days', icon: '🔥' },
  { name: 'Algorithm Wizard', desc: 'Explored DSA topics & time complexity', icon: '⚡' },
  { name: 'Interview Ready', desc: 'Practiced technical interview quizzes', icon: '🎯' },
];

export const ProfileView: React.FC<ProfileViewProps> = ({
  onSelectCourseLesson,
  onOpenAuthModal
}) => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-slate-900 border border-slate-800 rounded-3xl text-center space-y-4">
        <UserIcon className="w-12 h-12 text-slate-500 mx-auto" />
        <h2 className="text-xl font-bold text-white">Student Account</h2>
        <p className="text-xs text-slate-400">
          Sign in or create a free account to track your progress, code history, and streaks.
        </p>
        <button
          onClick={onOpenAuthModal}
          className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/25"
        >
          Sign In / Create Free Account
        </button>
      </div>
    );
  }

  // Find bookmarked lesson metadata
  const bookmarkedDetails = user.bookmarkedLessons.map(lessonId => {
    for (const course of COURSES_DATA) {
      const found = course.lessons.find(l => l.id === lessonId);
      if (found) {
        return { course, lesson: found };
      }
    }
    return null;
  }).filter(Boolean);

  // Find completed lesson metadata
  const completedDetails = user.completedLessons.map(lessonId => {
    for (const course of COURSES_DATA) {
      const found = course.lessons.find(l => l.id === lessonId);
      if (found) {
        return { course, lesson: found };
      }
    }
    return null;
  }).filter(Boolean);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 animate-in fade-in duration-200">
      
      {/* Profile Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 mb-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-2xl font-black text-white shadow-lg shadow-indigo-600/30">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                  {user.name}
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Student
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                {user.email}
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  Active Learner
                </span>
                <span>•</span>
                <span className="text-emerald-400 font-semibold">100% Free Lifetime Access</span>
              </div>
            </div>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-rose-400 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800/80">
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold mb-1">
              <Flame className="w-4 h-4 fill-amber-500" />
              Streak
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">{user.streak} Days</div>
            <div className="text-[10px] text-slate-500">Keep daily momentum</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold mb-1">
              <CheckCircle2 className="w-4 h-4" />
              Completed
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">{user.completedLessons.length}</div>
            <div className="text-[10px] text-slate-500">Lessons mastered</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-1.5 text-xs text-indigo-400 font-bold mb-1">
              <Sparkles className="w-4 h-4" />
              Points
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">{user.points} XP</div>
            <div className="text-[10px] text-slate-500">Earned across quizzes</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-1.5 text-xs text-purple-400 font-bold mb-1">
              <Award className="w-4 h-4" />
              Badges
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">{user.badges.length}</div>
            <div className="text-[10px] text-slate-500">Achievements unlocked</div>
          </div>
        </div>
      </div>

      {/* Badges Showcase */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 mb-8 shadow-xl">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          Achievement Badges
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {ALL_AVAILABLE_BADGES.map((badge) => {
            const isUnlocked = user.badges.includes(badge.name);

            return (
              <div 
                key={badge.name}
                className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                  isUnlocked
                    ? 'bg-slate-950 border-amber-500/30'
                    : 'bg-slate-950/40 border-slate-800/60 opacity-50'
                }`}
              >
                <div className="text-2xl p-2 rounded-xl bg-slate-900 shrink-0">
                  {badge.icon}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs sm:text-sm font-bold text-white">
                      {badge.name}
                    </h3>
                    {isUnlocked && (
                      <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300">
                        UNLOCKED
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {badge.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bookmarked Lessons */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 mb-8 shadow-xl">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-indigo-400" />
          Bookmarked for Quick Revision ({bookmarkedDetails.length})
        </h2>

        {bookmarkedDetails.length === 0 ? (
          <p className="text-xs text-slate-400">
            No lessons bookmarked yet. While studying any lesson, click the bookmark icon to save it here for fast review!
          </p>
        ) : (
          <div className="space-y-3">
            {bookmarkedDetails.map((item: any) => (
              <div
                key={item.lesson.id}
                onClick={() => onSelectCourseLesson(item.course.id, item.lesson.id)}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all flex items-center justify-between group"
              >
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-indigo-400 uppercase">
                    {item.course.title}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
                    {item.lesson.title}
                  </h3>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
