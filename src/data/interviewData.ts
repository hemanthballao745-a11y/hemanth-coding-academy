import { InterviewQuestion, QuizQuestion } from '../types';

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  // Python
  {
    id: 'int-py-1',
    track: 'Python',
    level: 'Beginner',
    question: 'What is the difference between deep copy and shallow copy in Python?',
    answer: 'A shallow copy creates a new object, but inserts references into it to the objects found in the original. A deep copy constructs a new compound object and then, recursively, inserts copies of the objects found in the original. Use `copy.copy()` for shallow copy and `copy.deepcopy()` for deep copy.',
    codeExample: `import copy
original = [[1, 2, 3], [4, 5, 6]]
shallow = copy.copy(original)
deep = copy.deepcopy(original)

original[0][0] = 999
print("Shallow:", shallow[0][0]) # Outputs 999 (shared reference)
print("Deep:", deep[0][0])       # Outputs 1 (independent clone)`,
    keyPoints: [
      'Shallow copy shares nested mutable objects.',
      'Deep copy creates completely independent memory duplicates.',
      'Crucial when working with nested matrices or dictionaries.'
    ],
    teluguInsight: 'షాల్లో కాపీ (Shallow copy) లోపలి లిస్టుల రిఫరెన్స్‌ను షేర్ చేసుకుంటుంది. డీప్ కాపీ (Deep copy) లోపల ఉన్న వాటన్నింటికీ కొత్త మెమొరీ కేటాయించి అసలైన క్లోన్‌ను సృష్టిస్తుంది.'
  },
  {
    id: 'int-py-2',
    track: 'Python',
    level: 'Advanced',
    question: 'What is the Global Interpreter Lock (GIL) and how does it affect multi-threading in Python?',
    answer: 'The Python GIL is a mutex that prevents multiple native threads from executing Python bytecodes at once in CPython. This ensures thread-safety in memory management. For CPU-bound tasks, multithreading does not give true parallelism in CPython (use `multiprocessing` instead). For I/O-bound tasks (network, disk), Python threads release the GIL during wait times.',
    codeExample: `# For CPU-intensive tasks, use multiprocessing to bypass GIL:
from multiprocessing import Process

def calculate_primes():
    pass # Runs on dedicated separate CPU core

if __name__ == '__main__':
    p = Process(target=calculate_primes)
    p.start()`,
    keyPoints: [
      'GIL allows only one thread to execute Python bytecode at a time.',
      'Use multiprocessing or external C extensions for CPU-bound parallelism.',
      'Asyncio or threading works great for I/O-bound tasks.'
    ],
    teluguInsight: 'GIL వల్ల పైథాన్‌లో ఒకేసారి ఒక CPU కోర్ మాత్రమే పైథాన్ బైట్‌కోడ్‌ను రన్ చేయగలదు. భారీ కంప్యూటేషన్స్ కోసం మల్టీ-ప్రాసెసింగ్ వాడాలి.'
  },

  // Java
  {
    id: 'int-java-1',
    track: 'Java',
    level: 'Beginner',
    question: 'What is the difference between == and .equals() in Java?',
    answer: '`==` is an operator that compares object references (memory addresses) to check if both point to the exact same memory location. `.equals()` is a method that can be overridden (e.g. by String) to compare the logical content and values inside the objects.',
    codeExample: `String s1 = new String("HCA");
String s2 = new String("HCA");

System.out.println(s1 == s2);      // false (different memory instances)
System.out.println(s1.equals(s2));  // true (same character sequence)`,
    keyPoints: [
      'Always use .equals() for String and Object value equality.',
      'Use == for primitive types like int, double, boolean.',
      'If you override .equals(), you must also override .hashCode().'
    ],
    teluguInsight: 'జావాలో == అనేది మెమరీ అడ్రస్‌లను పోలుస్తుంది. .equals() అనేది లోపల ఉన్న నిజమైన సమాచారాన్ని (కంటెంట్) పోలుస్తుంది.'
  },
  {
    id: 'int-java-2',
    track: 'Java',
    level: 'Advanced',
    question: 'How does Garbage Collection work in Java and what are Generations?',
    answer: 'Java HotSpot JVM divides the heap into Young Generation (Eden and Survivor spaces) and Old/Tenured Generation. Newly allocated objects start in Eden. Minor GC collects short-lived objects quickly. Surviving objects are promoted to Tenured generation, which is collected by Major/Full GC using algorithms like G1GC or ZGC.',
    keyPoints: [
      'Weak Generational Hypothesis: Most objects die young.',
      'Stop-the-World pauses minimized by modern collectors (G1, ZGC).',
      'Memory leaks happen when unused objects remain reachable in root set.'
    ]
  },

  // C / C++
  {
    id: 'int-c-1',
    track: 'C',
    level: 'Beginner',
    question: 'What is the difference between malloc() and calloc() in C?',
    answer: '`malloc(size)` allocates a single continuous block of memory of specified size without initializing it (contains garbage values). `calloc(num, size)` allocates multiple contiguous blocks and initializes all allocated bytes to zero. Both return a `void*` and must be freed with `free()`.',
    codeExample: `int *arr1 = (int*) malloc(5 * sizeof(int)); // uninitialized (garbage)
int *arr2 = (int*) calloc(5, sizeof(int));  // all 5 integers set to 0
free(arr1);
free(arr2);`,
    keyPoints: [
      'malloc is slightly faster as it skips zero initialization.',
      'calloc prevents garbage bugs by setting memory to zero.',
      'Always check if the returned pointer is NULL.'
    ]
  },
  {
    id: 'int-cpp-1',
    track: 'C++',
    level: 'Advanced',
    question: 'What are Smart Pointers in modern C++ (unique_ptr, shared_ptr, weak_ptr)?',
    answer: 'Smart pointers are RAII wrappers around raw pointers that automatically manage memory lifecycle and deallocate memory when going out of scope, eliminating memory leaks and dangling pointers.',
    codeExample: `#include <memory>
// unique_ptr: exclusive ownership, non-copyable
std::unique_ptr<int> u = std::make_unique<int>(42);

// shared_ptr: reference-counted shared ownership
std::shared_ptr<int> s1 = std::make_shared<int>(100);
std::shared_ptr<int> s2 = s1; // ref count = 2`,
    keyPoints: [
      'std::unique_ptr for exclusive ownership (zero overhead).',
      'std::shared_ptr uses atomic reference counting.',
      'std::weak_ptr breaks circular references in shared_ptr graphs.'
    ]
  },

  // SQL
  {
    id: 'int-sql-1',
    track: 'SQL',
    level: 'Beginner',
    question: 'What is the difference between WHERE and HAVING clauses in SQL?',
    answer: '`WHERE` is used to filter individual rows before any grouping or aggregations take place. `HAVING` filters aggregated data after the `GROUP BY` clause has combined rows.',
    codeExample: `SELECT department, AVG(salary) AS avg_sal
FROM employees
WHERE status = 'ACTIVE'       -- Filter before grouping
GROUP BY department
HAVING AVG(salary) > 80000;   -- Filter after grouping`,
    keyPoints: [
      'WHERE cannot evaluate aggregate functions like SUM() or AVG().',
      'HAVING applies filters to summary statistics computed across groups.'
    ]
  },
  {
    id: 'int-sql-2',
    track: 'SQL',
    level: 'Advanced',
    question: 'What are Database Indexes and what are B-Tree vs Hash indexes?',
    answer: 'An index is a data structure (commonly a B+ Tree) that enables the database engine to find rows in logarithmic time O(log N) instead of scanning the full table O(N). B-Tree indexes support equality (`=`) and range searches (`<`, `>`, `BETWEEN`), while Hash indexes only support exact equality.',
    keyPoints: [
      'Indexes speed up SELECT queries but add overhead to INSERT/UPDATE/DELETE.',
      'Composite indexes follow the Leftmost Prefix Rule.',
      'Clustered index defines the physical sorting order of rows on disk.'
    ]
  },

  // DSA
  {
    id: 'int-dsa-1',
    track: 'DSA',
    level: 'Beginner',
    question: 'How do you detect a cycle in a Linked List in O(1) space?',
    answer: 'Use Floyd\'s Cycle-Finding Algorithm (Tortoise and Hare). Maintain two pointers: a slow pointer moving 1 step at a time, and a fast pointer moving 2 steps at a time. If there is a cycle, the fast pointer will lap the slow pointer and they will meet. If fast reaches `null`, there is no cycle.',
    keyPoints: [
      'Time Complexity: O(N), Space Complexity: O(1).',
      'To find the cycle start node, reset slow to head and move both 1 step until they meet.'
    ]
  },
  {
    id: 'int-dsa-2',
    track: 'DSA',
    level: 'Advanced',
    question: 'Explain the difference between Dynamic Programming and Divide & Conquer.',
    answer: 'Divide & Conquer partitions a problem into non-overlapping subproblems, solves them recursively, and combines the results (e.g. Merge Sort). Dynamic Programming is applied when subproblems overlap heavily (e.g. Fibonacci, Knapsack); DP solves each subproblem once and caches the result to avoid exponential re-evaluations.',
    keyPoints: [
      'D&C: independent subproblems (Merge Sort, Quick Sort).',
      'DP: overlapping subproblems + optimal substructure (Memoization / Tabulation).'
    ]
  },

  // Frontend
  {
    id: 'int-fe-1',
    track: 'Frontend',
    level: 'Beginner',
    question: 'What is the Virtual DOM in React and how does reconciliation work?',
    answer: 'The Virtual DOM is a lightweight in-memory representation of the real DOM tree. When state changes, React generates a new Virtual DOM tree, compares it with the previous snapshot using a diffing algorithm (Reconciliation), and batches the minimal set of real DOM updates, maximizing browser rendering performance.',
    keyPoints: [
      'Real DOM manipulation is expensive; VDOM batching is cheap and fast.',
      'React uses heuristic O(N) diffing based on element types and unique keys.'
    ]
  },
  {
    id: 'int-fe-2',
    track: 'Frontend',
    level: 'Advanced',
    question: 'What is the Event Loop in modern browsers and JavaScript runtimes?',
    answer: 'The Event Loop coordinates the execution of code, collecting and processing events, and executing queued sub-tasks. It monitors the Call Stack. When the Call Stack is empty, it processes Microtasks first (Promises, queueMicrotask), and then Macrotasks (setTimeout, setInterval, I/O, UI events).',
    keyPoints: [
      'Call Stack -> Microtask Queue (Promises) -> Macrotask Queue (setTimeout).',
      'Microtasks have priority and drain completely before the next macrotask.'
    ]
  },

  // Backend
  {
    id: 'int-be-1',
    track: 'Backend',
    level: 'Beginner',
    question: 'What is the difference between Authentication and Authorization?',
    answer: 'Authentication (AuthN) verifies who the user is (e.g., username & password, biometric, JWT signature). Authorization (AuthZ) verifies what permissions or resources the authenticated user is allowed to access (e.g., admin vs regular learner role, file edit privileges).',
    keyPoints: [
      'AuthN: Identity verification ("Who are you?").',
      'AuthZ: Permission check ("What are you allowed to do?").',
      'Usually AuthN happens first, followed by AuthZ checks in middleware.'
    ]
  },
  {
    id: 'int-be-2',
    track: 'Backend',
    level: 'Advanced',
    question: 'How do you design a high-throughput rate limiter for a distributed backend?',
    answer: 'A distributed rate limiter typically uses algorithms like Token Bucket or Sliding Window Log implemented on top of Redis using atomic Lua scripts. The sliding window counters in Redis ensure synchronized request quotas across auto-scaled container instances without race conditions.',
    keyPoints: [
      'Token Bucket vs Leaky Bucket vs Sliding Window Counter.',
      'Centralized in-memory storage (Redis) with TTL keys for low latency.',
      'Return standard HTTP 429 Too Many Requests with Retry-After headers.'
    ]
  }
];

export const COMPANY_INTERVIEW_QUESTIONS = [
  {
    id: 'comp-tcs',
    company: 'TCS (Tata Consultancy Services)',
    focus: 'NQT & Digital Technical Interviews',
    frequentlyAskedTopics: [
      'Difference between Call by Value and Call by Reference in C',
      'Explain OOP concepts with real-world banking example in Java',
      'SQL Queries: Write a query to find the 2nd highest salary using Subquery or LIMIT',
      'String reversal and Palindrome check without built-in functions',
      'Explain Primary Key vs Foreign Key vs Candidate Key'
    ],
    preparationStrategy: 'Strongly master C and Java fundamentals, loop logic, basic array manipulation, and SQL JOINs/GROUP BY clauses.'
  },
  {
    id: 'comp-infosys',
    company: 'Infosys (Specialist Programmer & DSE)',
    focus: 'Data Structures, Python/Java & Pseudo-code',
    frequentlyAskedTopics: [
      'Detect and remove cycle in a Singly Linked List',
      'Two Sum and Subarray with Given Sum problem',
      'Difference between Interface and Abstract Class in Java 8+',
      'Python Dictionary vs List time complexity for lookups',
      'Explain normalization up to 3NF with an example'
    ],
    preparationStrategy: 'Practice medium-level DSA problems on arrays, strings, hashing, and write clean, commented code during the technical round.'
  },
  {
    id: 'comp-wipro',
    company: 'Wipro (Elite & Turbo National Talent Hunt)',
    focus: 'Core Engineering Basics, C/C++ & Problem Solving',
    frequentlyAskedTopics: [
      'What are storage classes in C (auto, static, extern, register)?',
      'Explain Method Overloading vs Method Overriding',
      'Bubble Sort vs Insertion Sort mechanism and best-case time',
      'Explain Exception Handling using try-catch-finally block',
      'Difference between process and thread in Operating Systems'
    ],
    preparationStrategy: 'Focus on clear verbal explanations of basic concepts, write simple code on whiteboard/screen, and avoid syntax errors.'
  },
  {
    id: 'comp-accenture',
    company: 'Accenture (Associate Software Engineer & Advanced)',
    focus: 'Coding, Pseudo-code & Web Technologies',
    frequentlyAskedTopics: [
      'Count frequency of characters in a string using Hash Map',
      'Difference between GET and POST methods in HTTP REST APIs',
      'Explain ACID properties and transaction rollback',
      'Binary Search implementation and why array must be sorted',
      'What is Polymorphism and compile-time vs runtime binding'
    ],
    preparationStrategy: 'Practice pseudo-code questions and solve 2-3 standard coding problems within the 45-minute technical assessment.'
  },
  {
    id: 'comp-google',
    company: 'Google',
    focus: 'Complex Algorithms, Graph Theory, System Scalability',
    frequentlyAskedTopics: [
      'Shortest path algorithms (Dijkstra, BFS on unweighted grid)',
      'LRU Cache implementation using Doubly Linked List and Hash Map',
      'Trie data structure for autocomplete search prefixes',
      'Topological Sort and detecting cycle in directed graph',
      'Dynamic Programming on Trees & Bitmask DP'
    ],
    preparationStrategy: 'Explain thoughts out loud before coding. Analyze time and space complexity upfront and verify boundary/edge cases meticulously.'
  },
  {
    id: 'comp-amazon',
    company: 'Amazon',
    focus: 'Leadership Principles & Practical Data Structures',
    frequentlyAskedTopics: [
      'Course Schedule (Detect Cycle in DAG)',
      'Design Snake Game or Parking Lot system (Object-Oriented Design)',
      'Serialize and Deserialize Binary Tree',
      'Merge K Sorted Lists using Min-Heap',
      'Customer Obsession & Ownership behavioral scenario questions'
    ],
    preparationStrategy: 'Structure behavioral answers in STAR format (Situation, Task, Action, Result) alongside solid DSA heap/tree patterns.'
  },
  {
    id: 'comp-microsoft',
    company: 'Microsoft',
    focus: 'Data Structures, Clean Code & Low-Level Architecture',
    frequentlyAskedTopics: [
      'Lowest Common Ancestor in Binary Tree and BST',
      'Reverse Nodes in k-Group in Linked List',
      'Word Search II using Trie and Backtracking',
      'Design TinyURL (System Design & URL shortening hash)',
      'Thread synchronization and Deadlock avoidance conditions'
    ],
    preparationStrategy: 'Write modular, clean code with self-explanatory variable names and proactively walk through test cases.'
  },
  {
    id: 'comp-startups',
    company: 'High-Growth Tech Startups',
    focus: 'Practical Full-Stack, React, Node.js & System Architecture',
    frequentlyAskedTopics: [
      'Explain React Virtual DOM, reconciliation, and Hook dependencies',
      'Design JWT Authentication flow with Refresh Tokens and HTTP-only cookies',
      'Database Indexing: B-Tree vs Hash Index and when to use composite indexes',
      'How to prevent SQL Injection and Cross-Site Scripting (XSS)',
      'Walk through a full-stack project you built from architecture to deployment'
    ],
    preparationStrategy: 'Be prepared to demo real full-stack web applications, explain technical trade-offs, and live-code end-to-end API features.'
  }
];

export const INTERVIEW_QUIZZES: QuizQuestion[] = [
  {
    id: 'int-q1',
    question: 'In Python, which built-in data type is mutable?',
    options: ['tuple', 'str', 'list', 'int'],
    correctAnswer: 2,
    explanation: 'Lists are mutable in Python and can have elements added, removed, or modified in place.'
  },
  {
    id: 'int-q2',
    question: 'Which time complexity guarantees O(N log N) worst-case performance for sorting?',
    options: ['Bubble Sort', 'Quick Sort', 'Merge Sort', 'Insertion Sort'],
    correctAnswer: 2,
    explanation: 'Merge Sort always splits arrays in half and merges them in O(N log N) worst-case time.'
  },
  {
    id: 'int-q3',
    question: 'In SQL, which constraint uniquely identifies each record in a table?',
    options: ['FOREIGN KEY', 'PRIMARY KEY', 'CHECK', 'DEFAULT'],
    correctAnswer: 1,
    explanation: 'PRIMARY KEY uniquely identifies every record and cannot contain NULL values.'
  },
  {
    id: 'int-q4',
    question: 'What does ACID stand for in database transaction management?',
    options: [
      'Atomicity, Consistency, Isolation, Durability',
      'Asynchronous, Concurrent, Indexed, Distributed',
      'Access, Control, Integrity, Data',
      'Application, Cache, Interface, Database'
    ],
    correctAnswer: 0,
    explanation: 'ACID guarantees reliable database transactions: Atomicity, Consistency, Isolation, and Durability.'
  }
];
