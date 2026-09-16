import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { CoursesView } from './components/CoursesView';
import { LessonView } from './components/LessonView';
import { PythonCompiler } from './components/PythonCompiler';
import { DsaView } from './components/DsaView';
import { CodingProblemsView } from './components/CodingProblemsView';
import { InterviewView } from './components/InterviewView';
import { NotesView } from './components/NotesView';
import { ProfileView } from './components/ProfileView';
import { AuthModal } from './components/AuthModal';
import { SearchModal } from './components/SearchModal';
import { COURSES_DATA } from './data/coursesData';
import { Course, Lesson } from './types';
import { CheckCircle2, Copy } from 'lucide-react';

function AppContent() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [compilerCode, setCompilerCode] = useState<string | undefined>(undefined);
  const [dsaTopicId, setDsaTopicId] = useState<string | undefined>(undefined);
  const [noteId, setNoteId] = useState<string | undefined>(undefined);
  
  // Modals & Toasts
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Synchronize state with URL parameters for shareable links
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    const courseParam = params.get('course');
    const lessonParam = params.get('lesson');
    const dsaParam = params.get('dsa');
    const noteParam = params.get('note');

    if (courseParam) {
      const foundCourse = COURSES_DATA.find(c => c.id === courseParam);
      if (foundCourse) {
        setSelectedCourse(foundCourse);
        if (lessonParam) {
          const foundLesson = foundCourse.lessons.find(l => l.id === lessonParam);
          if (foundLesson) {
            setSelectedLesson(foundLesson);
            setActiveTab('lesson');
            return;
          }
        }
        setActiveTab('courses');
        return;
      }
    }

    if (dsaParam) {
      setDsaTopicId(dsaParam);
      setActiveTab('dsa');
      return;
    }

    if (noteParam) {
      setNoteId(noteParam);
      setActiveTab('notes');
      return;
    }

    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, []);

  // Update browser URL query string without reloading page
  const updateUrl = (newTab: string, paramsObj?: Record<string, string>) => {
    const params = new URLSearchParams();
    params.set('tab', newTab);
    if (paramsObj) {
      Object.entries(paramsObj).forEach(([k, v]) => {
        if (v) params.set(k, v);
      });
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState(null, '', newUrl);
  };

  const handleTabChange = (tab: string, extraParams?: any) => {
    setActiveTab(tab);
    if (extraParams?.courseId) {
      const course = COURSES_DATA.find(c => c.id === extraParams.courseId);
      if (course) setSelectedCourse(course);
    }
    if (extraParams?.lessonId && selectedCourse) {
      const lesson = selectedCourse.lessons.find(l => l.id === extraParams.lessonId);
      if (lesson) setSelectedLesson(lesson);
    }
    if (extraParams?.dsaId) {
      setDsaTopicId(extraParams.dsaId);
    }
    if (extraParams?.noteId) {
      setNoteId(extraParams.noteId);
    }
    
    updateUrl(tab, {
      course: extraParams?.courseId || (tab === 'courses' && selectedCourse ? selectedCourse.id : ''),
      lesson: extraParams?.lessonId || '',
      dsa: extraParams?.dsaId || '',
      note: extraParams?.noteId || ''
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
    setActiveTab('courses');
    updateUrl('courses', { course: course.id });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectLesson = (course: Course, lessonId: string) => {
    setSelectedCourse(course);
    const lesson = course.lessons.find(l => l.id === lessonId);
    if (lesson) {
      setSelectedLesson(lesson);
      setActiveTab('lesson');
      updateUrl('lesson', { course: course.id, lesson: lesson.id });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenCompilerWithCode = (code: string) => {
    setCompilerCode(code);
    setActiveTab('compiler');
    updateUrl('compiler');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShareApp = () => {
    const url = window.location.origin;
    navigator.clipboard.writeText(url);
    showToast('Shareable link for Hemanth Coding Academy copied to clipboard!');
  };

  const handleShareCourse = (courseId: string) => {
    const url = `${window.location.origin}?tab=courses&course=${courseId}`;
    navigator.clipboard.writeText(url);
    showToast('Direct course link copied to clipboard!');
  };

  const handleShareLesson = (courseId: string, lessonId: string) => {
    const url = `${window.location.origin}?tab=lesson&course=${courseId}&lesson=${lessonId}`;
    navigator.clipboard.writeText(url);
    showToast('Direct lesson link copied to clipboard!');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white font-sans antialiased">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-indigo-600 text-white text-xs sm:text-sm font-semibold shadow-2xl flex items-center gap-2 border border-indigo-400/40 animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => handleTabChange(tab)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onShareApp={handleShareApp}
      />

      {/* Main App Content Body */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeView
            onNavigate={(tab, params) => handleTabChange(tab, params)}
            onShareApp={handleShareApp}
            onOpenCompilerWithCode={handleOpenCompilerWithCode}
          />
        )}

        {activeTab === 'courses' && (
          <CoursesView
            courses={COURSES_DATA}
            selectedCourseId={selectedCourse ? selectedCourse.id : null}
            onSelectCourse={handleSelectCourse}
            onSelectLesson={handleSelectLesson}
            onShareCourse={handleShareCourse}
          />
        )}

        {activeTab === 'lesson' && selectedCourse && selectedLesson && (
          <LessonView
            course={selectedCourse}
            lesson={selectedLesson}
            onBackToCourse={() => {
              setActiveTab('courses');
              updateUrl('courses', { course: selectedCourse.id });
            }}
            onNavigateLesson={(nextLessonId) => {
              const next = selectedCourse.lessons.find(l => l.id === nextLessonId);
              if (next) {
                setSelectedLesson(next);
                updateUrl('lesson', { course: selectedCourse.id, lesson: next.id });
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            onOpenCompilerWithCode={handleOpenCompilerWithCode}
            onShareLesson={handleShareLesson}
          />
        )}

        {/* Fallback if user navigates to lesson tab without selecting a course */}
        {activeTab === 'lesson' && (!selectedCourse || !selectedLesson) && (
          <CoursesView
            courses={COURSES_DATA}
            onSelectCourse={handleSelectCourse}
            onSelectLesson={handleSelectLesson}
            onShareCourse={handleShareCourse}
          />
        )}

        {activeTab === 'compiler' && (
          <PythonCompiler
            initialCode={compilerCode}
            onShareCode={(code) => {
              const url = window.location.href;
              navigator.clipboard.writeText(url);
              showToast('Python compiler link copied to clipboard!');
            }}
          />
        )}

        {activeTab === 'dsa' && (
          <DsaView
            selectedTopicId={dsaTopicId}
            onOpenCompilerWithCode={handleOpenCompilerWithCode}
          />
        )}

        {activeTab === 'problems' && (
          <CodingProblemsView
            onOpenCompilerWithCode={handleOpenCompilerWithCode}
          />
        )}

        {activeTab === 'interview' && (
          <InterviewView />
        )}

        {activeTab === 'notes' && (
          <NotesView
            initialNoteId={noteId}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileView
            onSelectCourseLesson={(courseId, lessonId) => {
              const c = COURSES_DATA.find(x => x.id === courseId);
              if (c) {
                setSelectedCourse(c);
                const l = c.lessons.find(x => x.id === lessonId);
                if (l) {
                  setSelectedLesson(l);
                  setActiveTab('lesson');
                  updateUrl('lesson', { course: c.id, lesson: l.id });
                }
              }
            }}
            onOpenAuthModal={() => setIsAuthOpen(true)}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        setActiveTab={(tab) => handleTabChange(tab)}
        onShareApp={handleShareApp}
      />

      {/* Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={(tab, params) => handleTabChange(tab, params)}
      />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
