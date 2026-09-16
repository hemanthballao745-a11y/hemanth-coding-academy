export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: 'learner' | 'pro';
  createdAt: string;
  streak: number;
  lastActiveDate: string;
  completedLessons: string[]; // lesson ids
  bookmarkedLessons: string[];
  solvedProblems: string[];
  quizScores: Record<string, number>; // quizId -> percentage
  badges: string[];
  points: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctAnswer: number; // 0-based index
  explanation: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  durationMinutes: number;
  explanation: string;
  teluguHint?: string; // Telugu friendly simplified note
  syntax?: string;
  code: string;
  codeExplanation: {
    line: string;
    explanation: string;
  }[];
  expectedOutput: string;
  tipsAndTricks: string[];
  commonMistakes: string[];
  practiceQuestions: string[];
  miniTask: string;
  quiz?: QuizQuestion[];
}

export interface Course {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  iconName: string;
  badgeColor: string;
  topicsCount: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels' | 'Beginner to Intermediate' | 'Intermediate to Advanced';
  lessons: Lesson[];
}

export interface CodingProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  description: string;
  inputFormat?: string;
  outputFormat?: string;
  sampleInput?: string;
  sampleOutput?: string;
  starterCode: string;
  solutionCode: string;
  testCases: {
    input: string;
    expectedOutput: string;
  }[];
  explanation: string;
}

export interface InterviewQuestion {
  id: string;
  track: 'Python' | 'Java' | 'C' | 'C++' | 'SQL' | 'DSA' | 'Frontend' | 'Backend';
  level: 'Beginner' | 'Advanced';
  question: string;
  answer: string;
  codeExample?: string;
  keyPoints: string[];
  teluguInsight?: string;
}

export interface NoteDoc {
  id: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  content: string; // Markdown or structured text
  keyTakeaways: string[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}
