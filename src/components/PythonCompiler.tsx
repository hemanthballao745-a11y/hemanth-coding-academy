import React, { useState, useEffect } from 'react';
import { 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  Terminal, 
  Share2, 
  Sparkles, 
  Clock, 
  AlertCircle, 
  Code2, 
  FileCode,
  Settings,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface PythonCompilerProps {
  initialCode?: string;
  onShareCode?: (code: string) => void;
}

const SAMPLE_TEMPLATES = [
  {
    id: 'hello',
    name: 'Hello World & Variables',
    code: `# Welcome to Hemanth Coding Academy Online Python Compiler!
academy = "Hemanth Coding Academy"
learner = "Super Coder"

print(f"🚀 Running Python 3 in the cloud!")
print(f"Welcome {learner} to {academy}!")

# Simple calculation
total_courses = 13
free_percentage = 100
print(f"Access all {total_courses} courses: {free_percentage}% Free forever.")`
  },
  {
    id: 'loops',
    name: 'Loops & List Comprehension',
    code: `# Finding Prime Numbers between 1 and 30
def is_prime(n):
    if n <= 1:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

primes = [x for x in range(1, 31) if is_prime(x)]
print(f"Prime numbers up to 30: {primes}")
print(f"Total count: {len(primes)}")`
  },
  {
    id: 'dsa_twosum',
    name: 'DSA: Two Sum (Hash Map)',
    code: `def two_sum(nums, target):
    lookup = {} # number -> index
    for idx, val in enumerate(nums):
        diff = target - val
        if diff in lookup:
            return [lookup[diff], idx]
        lookup[val] = idx
    return []

# Test run
test_array = [2, 11, 7, 15]
target_sum = 9
result = two_sum(test_array, target_sum)

print(f"Array: {test_array}, Target: {target_sum}")
print(f"Indices found: {result}")
if result:
    print(f"Verification: {test_array[result[0]]} + {test_array[result[1]]} == {target_sum}")`
  },
  {
    id: 'oop',
    name: 'Object-Oriented Programming (OOP)',
    code: `class Student:
    def __init__(self, name, streak):
        self.name = name
        self.streak = streak
        self.points = 100

    def complete_lesson(self, title):
        self.streak += 1
        self.points += 20
        print(f"✅ {self.name} completed '{title}'!")
        print(f"🔥 Current streak: {self.streak} days | Total points: {self.points}")

student1 = Student("Aarav", 5)
student1.complete_lesson("Binary Search Trees")
student1.complete_lesson("Dynamic Programming")`
  }
];

export const PythonCompiler: React.FC<PythonCompilerProps> = ({ 
  initialCode,
  onShareCode
}) => {
  const { user } = useAuth();
  const [code, setCode] = useState(initialCode || SAMPLE_TEMPLATES[0].code);
  const [stdin, setStdin] = useState('');
  const [showStdin, setShowStdin] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [errorOutput, setErrorOutput] = useState<string | null>(null);
  const [execTime, setExecTime] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState('hello');

  useEffect(() => {
    if (initialCode) {
      setCode(initialCode);
    }
  }, [initialCode]);

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);
    setErrorOutput(null);

    try {
      const res = await fetch('/api/run-python', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, stdin: showStdin ? stdin : undefined })
      });

      const data = await res.json();
      setOutput(data.stdout || '');
      setErrorOutput(data.stderr || '');
      setExecTime(data.executionTimeMs || 0);
    } catch (err: any) {
      setErrorOutput('Failed to connect to execution server. ' + err.message);
    } finally {
      setIsRunning(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTemplateSelect = (templateId: string) => {
    const selected = SAMPLE_TEMPLATES.find(t => t.id === templateId);
    if (selected) {
      setCode(selected.code);
      setActiveTemplate(templateId);
      setOutput(null);
      setErrorOutput(null);
    }
  };

  const lineCount = code.split('\n').length;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Terminal className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Online Python Compiler & Editor
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Write, execute and test real Python 3 code in seconds. No installation required. 100% Free.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            id="btn-run-python"
            onClick={handleRunCode}
            disabled={isRunning}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-900/30 transition-all hover:scale-102 active:scale-98"
          >
            {isRunning ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Running Code...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Run Python Code</span>
              </>
            )}
          </button>

          <button
            onClick={handleCopyCode}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors text-xs font-semibold flex items-center gap-1.5"
            title="Copy Code"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
          </button>

          {onShareCode && (
            <button
              onClick={() => onShareCode(code)}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors text-xs font-semibold flex items-center gap-1.5"
              title="Share Code Link"
            >
              <Share2 className="w-4 h-4 text-indigo-400" />
              <span className="hidden sm:inline">Share</span>
            </button>
          )}

          <button
            onClick={() => handleTemplateSelect(activeTemplate)}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
            title="Reset to Template"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Code Templates Quick Selector */}
      <div className="mb-4 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-400 font-semibold shrink-0">Sample Starters:</span>
        {SAMPLE_TEMPLATES.map((tpl) => (
          <button
            key={tpl.id}
            onClick={() => handleTemplateSelect(tpl.id)}
            className={`px-3 py-1 rounded-lg border whitespace-nowrap transition-all font-medium ${
              activeTemplate === tpl.id
                ? 'bg-indigo-600/30 border-indigo-500 text-white font-semibold'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {tpl.name}
          </button>
        ))}
      </div>

      {/* Editor & Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Code Editor Panel (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          
          {/* Editor Header Bar */}
          <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="ml-2 font-mono text-slate-400 font-medium flex items-center gap-1">
                <FileCode className="w-3.5 h-3.5 text-indigo-400" />
                main.py
              </span>
            </div>

            <div className="flex items-center gap-3 text-slate-400">
              <span>{lineCount} lines</span>
              <button
                onClick={() => setShowStdin(!showStdin)}
                className={`text-[11px] px-2 py-0.5 rounded border transition-colors ${
                  showStdin ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
              >
                {showStdin ? 'Hide Input (stdin)' : '+ Add Input (stdin)'}
              </button>
            </div>
          </div>

          {/* Stdin Area (Optional) */}
          {showStdin && (
            <div className="p-3 bg-slate-950/80 border-b border-slate-800">
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Standard Input (stdin):
              </label>
              <textarea
                value={stdin}
                onChange={(e) => setStdin(e.target.value)}
                placeholder="Enter input lines to pass to input() in your Python code..."
                rows={2}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 font-mono text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
              />
            </div>
          )}

          {/* Code Area with Line Numbers */}
          <div className="relative flex flex-1 min-h-[380px] max-h-[550px] font-mono text-xs sm:text-sm bg-slate-950">
            {/* Line Numbers Bar */}
            <div className="w-10 sm:w-12 bg-slate-950 text-slate-600 select-none py-3 text-right pr-3 font-mono border-r border-slate-900">
              {Array.from({ length: lineCount }).map((_, i) => (
                <div key={i} className="leading-6">
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Code Textarea */}
            <textarea
              id="python-code-textarea"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="flex-1 w-full bg-transparent text-slate-100 p-3 leading-6 font-mono focus:outline-none resize-none overflow-y-auto selection:bg-indigo-600/40"
              placeholder="# Write your Python code here..."
            />
          </div>

          {/* Editor Footer */}
          <div className="px-4 py-2 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
            <span>Python 3.10 Runtime Environment</span>
            <span>Tab size: 4 spaces</span>
          </div>
        </div>

        {/* Output Console Panel (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          
          {/* Console Header Bar */}
          <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-white tracking-wide">Terminal Output</span>
            </div>

            <div className="flex items-center gap-3 text-slate-400">
              {execTime !== null && (
                <span className="flex items-center gap-1 text-[11px] text-slate-400">
                  <Clock className="w-3 h-3" />
                  {execTime}ms
                </span>
              )}
              {(output !== null || errorOutput !== null) && (
                <button
                  onClick={() => { setOutput(null); setErrorOutput(null); }}
                  className="text-[11px] text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Console Body */}
          <div className="p-4 flex-1 min-h-[380px] max-h-[550px] font-mono text-xs overflow-y-auto bg-slate-950 text-slate-200">
            {isRunning ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-3 py-16">
                <div className="w-8 h-8 border-2 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin" />
                <p className="text-xs font-medium animate-pulse">Compiling & executing Python script...</p>
              </div>
            ) : output === null && errorOutput === null ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center p-6">
                <Code2 className="w-8 h-8 text-slate-600 mb-2" />
                <p className="font-semibold text-slate-400">No output yet</p>
                <p className="text-[11px] mt-1 text-slate-500">
                  Click the green "Run Python Code" button above to execute this program.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Standard Output (stdout) */}
                {output && (
                  <div>
                    <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Standard Output:
                    </div>
                    <pre className="whitespace-pre-wrap font-mono text-emerald-300 bg-emerald-950/20 p-3 rounded-xl border border-emerald-900/40 leading-relaxed">
                      {output}
                    </pre>
                  </div>
                )}

                {/* Standard Error (stderr) */}
                {errorOutput && (
                  <div>
                    <div className="text-[10px] font-bold text-rose-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                      Errors & Traceback:
                    </div>
                    <pre className="whitespace-pre-wrap font-mono text-rose-300 bg-rose-950/30 p-3 rounded-xl border border-rose-900/40 leading-relaxed">
                      {errorOutput}
                    </pre>
                  </div>
                )}

                {/* Empty Output Message */}
                {!output && !errorOutput && (
                  <div className="p-3 rounded-xl bg-slate-900 text-slate-400 text-xs border border-slate-800">
                    Process exited with code 0 (Execution succeeded with no printed output).
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Console Footer */}
          <div className="px-4 py-2 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-500 flex justify-between items-center">
            <span>Built-in standard libraries ready to import</span>
            <span className="text-emerald-400 font-semibold">Active Cloud Node</span>
          </div>

        </div>

      </div>

    </div>
  );
};
