import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  guestLogin: () => void;
  logout: () => void;
  toggleCompleteLesson: (lessonId: string) => Promise<void>;
  toggleBookmarkLesson: (lessonId: string) => Promise<void>;
  recordQuizScore: (quizId: string, score: number) => Promise<void>;
  recordSolvedProblem: (problemId: string) => Promise<void>;
  isCompleted: (lessonId: string) => boolean;
  isBookmarked: (lessonId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_USER_KEY = 'hca_current_user';
const LOCAL_STORAGE_TOKEN_KEY = 'hca_auth_token';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize session on mount
  useEffect(() => {
    async function restoreSession() {
      try {
        const savedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
        const savedUserStr = localStorage.getItem(LOCAL_STORAGE_USER_KEY);

        if (savedToken) {
          setToken(savedToken);
          // Verify with server
          try {
            const res = await fetch('/api/auth/me', {
              headers: { Authorization: `Bearer ${savedToken}` }
            });
            if (res.ok) {
              const data = await res.json();
              setUser(data.user);
              localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(data.user));
              setIsLoading(false);
              return;
            }
          } catch (e) {
            console.warn('Network check failed, falling back to local storage session');
          }
        }

        if (savedUserStr) {
          const parsed = JSON.parse(savedUserStr);
          setUser(parsed);
        } else {
          // Provide default welcoming guest profile so learner can immediately explore & track progress
          const guestUser: User = {
            id: 'guest-' + Math.random().toString(36).substring(2, 9),
            name: 'Learner',
            email: 'guest@hemanthcoding.edu',
            role: 'learner',
            createdAt: new Date().toISOString(),
            streak: 1,
            lastActiveDate: new Date().toISOString().split('T')[0],
            completedLessons: ['py-intro'],
            bookmarkedLessons: ['dsa-big-o'],
            solvedProblems: [],
            quizScores: { 'py-q1': 100 },
            badges: ['New Explorer'],
            points: 70
          };
          setUser(guestUser);
          localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(guestUser));
        }
      } catch (err) {
        console.error('Session restoration error:', err);
      } finally {
        setIsLoading(false);
      }
    }
    restoreSession();
  }, []);

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass })
      });
      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.error || 'Failed to login.' };
      }

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(data.user));
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, data.token);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Connection error. Please try again.' };
    }
  };

  const signup = async (name: string, email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password: pass })
      });
      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.error || 'Failed to sign up.' };
      }

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(data.user));
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, data.token);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Connection error. Please try again.' };
    }
  };

  const guestLogin = () => {
    const demoUser: User = {
      id: 'demo-student-id',
      name: 'Hemanth Learner',
      email: 'student@hemanthcoding.edu',
      role: 'learner',
      createdAt: new Date().toISOString(),
      streak: 3,
      lastActiveDate: new Date().toISOString().split('T')[0],
      completedLessons: ['py-intro', 'html-semantic-basics'],
      bookmarkedLessons: ['dsa-big-o', 'dsa-linked-list'],
      solvedProblems: ['prob-two-sum-py'],
      quizScores: { 'py-q1': 100 },
      badges: ['First Code Run', '3-Day Streak', 'Python Pioneer'],
      points: 190
    };
    setUser(demoUser);
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(demoUser));
  };

  const logout = async () => {
    try {
      if (token) {
        fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` }
        }).catch(() => {});
      }
    } finally {
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
      setToken(null);
      guestLogin(); // fallback to demo guest
    }
  };

  const syncProgressWithServer = async (payload: any) => {
    if (!token) return;
    try {
      const res = await fetch('/api/user/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(data.user));
      }
    } catch (e) {
      console.warn('Progress sync to server failed, stored locally', e);
    }
  };

  const toggleCompleteLesson = async (lessonId: string) => {
    if (!user) return;
    const isAlreadyCompleted = user.completedLessons.includes(lessonId);
    const updatedCompleted = isAlreadyCompleted
      ? user.completedLessons.filter(id => id !== lessonId)
      : [...user.completedLessons, lessonId];

    const updatedUser: User = {
      ...user,
      completedLessons: updatedCompleted,
      points: user.points + (isAlreadyCompleted ? -20 : 20)
    };

    setUser(updatedUser);
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(updatedUser));

    await syncProgressWithServer(
      isAlreadyCompleted ? { uncompletedLessonId: lessonId } : { completedLessonId: lessonId }
    );
  };

  const toggleBookmarkLesson = async (lessonId: string) => {
    if (!user) return;
    const isBookmarkedAlready = user.bookmarkedLessons.includes(lessonId);
    const updatedBookmarks = isBookmarkedAlready
      ? user.bookmarkedLessons.filter(id => id !== lessonId)
      : [...user.bookmarkedLessons, lessonId];

    const updatedUser: User = {
      ...user,
      bookmarkedLessons: updatedBookmarks
    };

    setUser(updatedUser);
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(updatedUser));

    await syncProgressWithServer(
      isBookmarkedAlready ? { removeBookmarkLessonId: lessonId } : { bookmarkLessonId: lessonId }
    );
  };

  const recordQuizScore = async (quizId: string, score: number) => {
    if (!user) return;
    const updatedUser: User = {
      ...user,
      quizScores: {
        ...user.quizScores,
        [quizId]: score
      },
      points: user.points + Math.round(score / 5)
    };

    setUser(updatedUser);
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(updatedUser));

    await syncProgressWithServer({
      quizScore: { quizId, score }
    });
  };

  const recordSolvedProblem = async (problemId: string) => {
    if (!user) return;
    if (user.solvedProblems.includes(problemId)) return;

    const updatedSolved = [...user.solvedProblems, problemId];
    const updatedBadges = [...user.badges];
    if (!updatedBadges.includes('Problem Solver')) {
      updatedBadges.push('Problem Solver');
    }

    const updatedUser: User = {
      ...user,
      solvedProblems: updatedSolved,
      badges: updatedBadges,
      points: user.points + 30
    };

    setUser(updatedUser);
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(updatedUser));

    await syncProgressWithServer({
      solvedProblemId: problemId
    });
  };

  const isCompleted = (lessonId: string) => {
    return user ? user.completedLessons.includes(lessonId) : false;
  };

  const isBookmarked = (lessonId: string) => {
    return user ? user.bookmarkedLessons.includes(lessonId) : false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        signup,
        guestLogin,
        logout,
        toggleCompleteLesson,
        toggleBookmarkLesson,
        recordQuizScore,
        recordSolvedProblem,
        isCompleted,
        isBookmarked
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
