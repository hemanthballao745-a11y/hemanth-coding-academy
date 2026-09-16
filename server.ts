import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { execFile } from 'child_process';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '2mb' }));

// Database directory & file initialization
const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface StoredUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: 'learner' | 'pro';
  createdAt: string;
  streak: number;
  lastActiveDate: string;
  completedLessons: string[];
  bookmarkedLessons: string[];
  solvedProblems: string[];
  quizScores: Record<string, number>;
  badges: string[];
  points: number;
  token?: string;
}

function loadUsers(): Record<string, StoredUser> {
  try {
    if (fs.existsSync(USERS_FILE)) {
      const data = fs.readFileSync(USERS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Failed reading users.json:', err);
  }
  return {};
}

function saveUsers(users: Record<string, StoredUser>) {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed writing users.json:', err);
  }
}

function hashPassword(pass: string): string {
  return crypto.createHash('sha256').update(pass).digest('hex');
}

// Ensure default demo student exists for instant testing
const initialUsers = loadUsers();
if (Object.keys(initialUsers).length === 0) {
  const defaultId = 'demo-student-id';
  initialUsers['student@hemanthcoding.edu'] = {
    id: defaultId,
    name: 'Hemanth Learner',
    email: 'student@hemanthcoding.edu',
    passwordHash: hashPassword('Learner@123'),
    role: 'learner',
    createdAt: new Date().toISOString(),
    streak: 3,
    lastActiveDate: new Date().toISOString().split('T')[0],
    completedLessons: ['py-intro', 'html-basics'],
    bookmarkedLessons: ['dsa-linked-list-reversal', 'py-lists-dicts'],
    solvedProblems: ['prob-two-sum-py'],
    quizScores: { 'py-intro-quiz': 100 },
    badges: ['First Code Run', '3-Day Streak', 'Python Pioneer'],
    points: 180,
    token: 'token-' + crypto.randomBytes(16).toString('hex'),
  };
  saveUsers(initialUsers);
}

// API: Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    academy: 'Hemanth Coding Academy',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// API: Auth Signup
app.post('/api/auth/signup', (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const users = loadUsers();

    if (users[normalizedEmail]) {
      return res.status(409).json({ error: 'An account with this email already exists. Please log in.' });
    }

    const id = 'user-' + crypto.randomBytes(8).toString('hex');
    const token = 'token-' + crypto.randomBytes(24).toString('hex');
    const newUser: StoredUser = {
      id,
      name: String(name).trim(),
      email: normalizedEmail,
      passwordHash: hashPassword(password),
      role: 'learner',
      createdAt: new Date().toISOString(),
      streak: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      completedLessons: [],
      bookmarkedLessons: [],
      solvedProblems: [],
      quizScores: {},
      badges: ['New Explorer'],
      points: 50,
      token,
    };

    users[normalizedEmail] = newUser;
    saveUsers(users);

    const { passwordHash, ...safeUser } = newUser;
    return res.status(201).json({ user: safeUser, token });
  } catch (err: any) {
    console.error('Signup error:', err);
    return res.status(500).json({ error: 'Internal server error during signup.' });
  }
});

// API: Auth Login
app.post('/api/auth/login', (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const users = loadUsers();
    const user = users[normalizedEmail];

    if (!user || user.passwordHash !== hashPassword(password)) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // Update streak if needed
    const today = new Date().toISOString().split('T')[0];
    if (user.lastActiveDate !== today) {
      const lastDate = new Date(user.lastActiveDate);
      const currentDate = new Date(today);
      const diffDays = Math.round((currentDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
      if (diffDays === 1) {
        user.streak += 1;
      } else if (diffDays > 1) {
        user.streak = 1;
      }
      user.lastActiveDate = today;
    }

    user.token = 'token-' + crypto.randomBytes(24).toString('hex');
    users[normalizedEmail] = user;
    saveUsers(users);

    const { passwordHash, ...safeUser } = user;
    return res.json({ user: safeUser, token: user.token });
  } catch (err: any) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Internal server error during login.' });
  }
});

// Helper to authenticate request
function authenticateRequest(req: Request): StoredUser | null {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;
  const token = authHeader.replace('Bearer ', '').trim();
  if (!token) return null;

  const users = loadUsers();
  for (const email of Object.keys(users)) {
    if (users[email].token === token) {
      return users[email];
    }
  }
  return null;
}

// API: Get Current User
app.get('/api/auth/me', (req: Request, res: Response) => {
  const user = authenticateRequest(req);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized or session expired.' });
  }
  const { passwordHash, ...safeUser } = user;
  return res.json({ user: safeUser });
});

// API: Auth Logout
app.post('/api/auth/logout', (req: Request, res: Response) => {
  const user = authenticateRequest(req);
  if (user) {
    const users = loadUsers();
    if (users[user.email]) {
      delete users[user.email].token;
      saveUsers(users);
    }
  }
  return res.json({ success: true, message: 'Logged out successfully.' });
});

// API: Update User Progress & Streaks
app.post('/api/user/progress', (req: Request, res: Response) => {
  const user = authenticateRequest(req);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized. Please login to save progress.' });
  }

  const {
    completedLessonId,
    uncompletedLessonId,
    bookmarkLessonId,
    removeBookmarkLessonId,
    solvedProblemId,
    quizScore, // { quizId, score }
  } = req.body;

  const users = loadUsers();
  const currentUser = users[user.email];

  if (completedLessonId && !currentUser.completedLessons.includes(completedLessonId)) {
    currentUser.completedLessons.push(completedLessonId);
    currentUser.points += 20;
    if (currentUser.completedLessons.length >= 5 && !currentUser.badges.includes('Fast Learner')) {
      currentUser.badges.push('Fast Learner');
    }
    if (currentUser.completedLessons.length >= 15 && !currentUser.badges.includes('Master Student')) {
      currentUser.badges.push('Master Student');
    }
  }

  if (uncompletedLessonId) {
    currentUser.completedLessons = currentUser.completedLessons.filter((id) => id !== uncompletedLessonId);
  }

  if (bookmarkLessonId && !currentUser.bookmarkedLessons.includes(bookmarkLessonId)) {
    currentUser.bookmarkedLessons.push(bookmarkLessonId);
  }

  if (removeBookmarkLessonId) {
    currentUser.bookmarkedLessons = currentUser.bookmarkedLessons.filter((id) => id !== removeBookmarkLessonId);
  }

  if (solvedProblemId && !currentUser.solvedProblems.includes(solvedProblemId)) {
    currentUser.solvedProblems.push(solvedProblemId);
    currentUser.points += 30;
    if (!currentUser.badges.includes('Problem Solver')) {
      currentUser.badges.push('Problem Solver');
    }
  }

  if (quizScore && quizScore.quizId) {
    currentUser.quizScores[quizScore.quizId] = quizScore.score;
    currentUser.points += Math.round(quizScore.score / 5);
  }

  // Activity streak update
  const today = new Date().toISOString().split('T')[0];
  if (currentUser.lastActiveDate !== today) {
    currentUser.streak += 1;
    currentUser.lastActiveDate = today;
  }

  users[user.email] = currentUser;
  saveUsers(users);

  const { passwordHash, ...safeUser } = currentUser;
  return res.json({ user: safeUser });
});

// API: Run Python Code safely
app.post('/api/run-python', (req: Request, res: Response) => {
  const { code, stdin } = req.body;

  if (typeof code !== 'string' || !code.trim()) {
    return res.status(400).json({
      stdout: '',
      stderr: 'Error: No code provided to run.',
      exitCode: 1,
      executionTimeMs: 0,
    });
  }

  // Basic security checks to prevent dangerous OS destruction or infinite forks
  const forbiddenPatterns = [
    /os\.system\s*\(/i,
    /subprocess\./i,
    /shutil\.rmtree/i,
    /__import__\s*\(\s*['"]os['"]\s*\)/i,
    /__import__\s*\(\s*['"]subprocess['"]\s*\)/i,
  ];

  for (const pattern of forbiddenPatterns) {
    if (pattern.test(code)) {
      return res.status(403).json({
        stdout: '',
        stderr: 'Security Notice: System shell command execution is restricted in online playground for security. Standard Python, math, algorithms, data structures, strings, and loops are fully supported!',
        exitCode: 1,
        executionTimeMs: 0,
      });
    }
  }

  const startTime = Date.now();
  const timeoutMs = 5000; // 5 seconds max execution

  // Execute using python3 -c with input stdin
  const child = execFile(
    'python3',
    ['-c', code],
    {
      timeout: timeoutMs,
      maxBuffer: 1024 * 512, // 512 KB
    },
    (error, stdout, stderr) => {
      const executionTimeMs = Date.now() - startTime;

      if (error && (error as any).killed) {
        return res.json({
          stdout,
          stderr: `Timeout Error: Code execution exceeded ${timeoutMs / 1000}s limit. Check for infinite loops!`,
          exitCode: 124,
          executionTimeMs,
        });
      }

      return res.json({
        stdout: stdout || '',
        stderr: stderr || '',
        exitCode: error ? error.code || 1 : 0,
        executionTimeMs,
      });
    }
  );

  // If standard input provided, feed it to python stdin
  if (stdin && typeof stdin === 'string') {
    child.stdin?.write(stdin);
    child.stdin?.end();
  } else {
    child.stdin?.end();
  }
});

async function startServer() {
  // Vite middleware for dev
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Hemanth Coding Academy server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
