import { NoteDoc } from '../types';

export const NOTES_DATA: NoteDoc[] = [
  {
    id: 'note-python-cheatsheet',
    title: 'Python Core & Advanced Quick Revision Cheat Sheet',
    category: 'Python',
    readTime: '8 min read',
    summary: 'Comprehensive revision guide covering syntax, data types, list comprehensions, lambda functions, OOP, decorators, and generator expressions.',
    keyTakeaways: [
      'Variables are dynamically typed references in Python.',
      'List comprehensions: `[f(x) for x in iterable if condition]`.',
      'Dictionaries offer O(1) key lookups via internal hash tables.',
      'Use `with open("file.txt") as f:` for automatic resource cleanup.'
    ],
    content: `
# Hemanth Coding Academy — Python Revision Notes
**Platform:** 100% Free Coding Education | **Instructor:** Hemanth Coding Academy

---

### 1. Variables & Types
- **Integers & Floats**: Arbitrary precision in Python 3.
- **Strings**: Immutable sequences of Unicode characters. Slicing: \`s[start:stop:step]\`.
- **Booleans**: \`True\` and \`False\` (subclass of integers 1 and 0).

### 2. Built-in Data Structures
| Structure | Syntax | Mutable? | Ordered? | Duplicates? |
| :--- | :--- | :--- | :--- | :--- |
| **List** | \`[1, 2, 3]\` | Yes | Yes | Yes |
| **Tuple** | \`(1, 2, 3)\` | No | Yes | Yes |
| **Set** | \`{1, 2, 3}\` | Yes | No | No |
| **Dict** | \`{"a": 1}\` | Yes | Keys No | Keys Unique |

### 3. Essential String Operations
\`\`\`python
text = "  Hemanth Coding Academy  "
clean = text.strip().lower()       # "hemanth coding academy"
words = clean.split(" ")          # ['hemanth', 'coding', 'academy']
joined = "-".join(words)          # "hemanth-coding-academy"
\`\`\`

### 4. Advanced Python Concepts
- **Decorators**: Functions that modify the behavior of another function without altering its source code.
- **Generators**: Functions containing \`yield\` that evaluate values lazily, conserving immense memory.
- **Dunder Methods**: \`__init__\`, \`__str__\`, \`__repr__\`, \`__len__\`.
    `
  },
  {
    id: 'note-dsa-mastery',
    title: 'DSA Complete Roadmap & Big-O Reference Chart',
    category: 'DSA',
    readTime: '12 min read',
    summary: 'Complete overview of Arrays, Linked Lists, Stacks, Queues, Trees, Graphs, Sorting, Dynamic Programming, and algorithm pattern decision tree.',
    keyTakeaways: [
      'Know your Big-O limits: N=10^5 requires O(N log N) or O(N).',
      'Arrays for indexing, HashMaps for lookups, Heaps for top K items.',
      'Two-pointers for sorted arrays, Sliding Window for contiguous subarrays.',
      'BFS for shortest path in unweighted graphs, DFS for topological sort.'
    ],
    content: `
# Hemanth Coding Academy — DSA Master Cheat Sheet
**Master Algorithms & Crack Product Interviews**

---

### 1. Big-O Complexity Comparison
- **O(1)**: Constant (Hash map lookup, array indexing, stack push/pop).
- **O(log N)**: Logarithmic (Binary search, balanced BST search).
- **O(N)**: Linear (Single pass scan, two pointers).
- **O(N log N)**: Linearithmic (Merge Sort, Quick Sort, Heap Sort).
- **O(N^2)**: Quadratic (Nested loops, Bubble sort).
- **O(2^N)**: Exponential (Recursive power sets, brute force subsets).

### 2. Problem Pattern Cheat Sheet
- **Contiguous Subarray with min/max length** ➔ Sliding Window.
- **Sorted Array pair sum / triple sum** ➔ Two Pointers (Left & Right).
- **Top K frequent / Kth smallest element** ➔ Min/Max Heap (\`heapq\`).
- **Shortest path on unweighted grid** ➔ Breadth-First Search (BFS) with Queue.
- **Connected components / Cycle detection** ➔ Depth-First Search (DFS) / Union-Find.
- **Overlapping subproblems & Optimal substructure** ➔ Dynamic Programming.
    `
  },
  {
    id: 'note-interview-handbook',
    title: 'Top 50 Technical Interview Q&A Handbook',
    category: 'Interviews',
    readTime: '15 min read',
    summary: 'Curated technical interview handbook covering Python, Java, C, C++, SQL, Frontend, and Backend system design basics for freshers and experienced engineers.',
    keyTakeaways: [
      'Explain your thought process before writing a single line of code in interviews.',
      'State Time and Space complexities upfront.',
      'Ask clarifying questions regarding edge cases: empty inputs, negative numbers, duplicates.',
      'Always test code dry-run with a small example.'
    ],
    content: `
# Hemanth Coding Academy — Technical Interview Handbook
**Your Step-by-Step Guide to Cracking Coding Rounds**

---

### Golden 4-Step Technical Interview Framework:
1. **Clarify**: Confirm constraints (N size, range of values, memory constraints).
2. **Brainstorm**: Start with brute force (e.g. O(N^2)), then optimize with Hash Map or Two Pointers (e.g. O(N)).
3. **Code Cleanly**: Write modular functions with descriptive variable names.
4. **Dry Run**: Trace execution with sample input and test edge cases.

### Core Database Interview Concepts:
- **ACID properties**: Atomicity, Consistency, Isolation, Durability.
- **Indexing**: Speeds up reads using B+ Tree structures; slows down writes.
- **Normalization vs Denormalization**: Reducing redundancy (3NF) vs optimizing read latency.
    `
  },
  {
    id: 'note-sql-cheatsheet',
    title: 'SQL Queries, Joins, Window Functions & Optimization',
    category: 'SQL',
    readTime: '10 min read',
    summary: 'A fast-reference guide to CRUD, INNER/LEFT/FULL JOINs, GROUP BY, HAVING, subqueries, RANK(), and DENSE_RANK() window functions.',
    keyTakeaways: [
      'JOINs connect related tables using Foreign Key relationships.',
      'WHERE filters before aggregation; HAVING filters after aggregation.',
      'Window functions like ROW_NUMBER() and RANK() evaluate over partitioned subsets.',
      'Indexes on WHERE and JOIN columns prevent full-table scans.'
    ],
    content: `
# Hemanth Coding Academy — SQL Reference Notes
**Structured Query Language & Database Design Guide**

---

### 1. The 4 Main JOIN Types:
- **INNER JOIN**: Returns records that have matching values in both tables.
- **LEFT JOIN**: Returns all records from left table, and matching records from right table.
- **RIGHT JOIN**: Returns all records from right table, and matching records from left table.
- **FULL OUTER JOIN**: Returns all records when there is a match in either table.

### 2. Window Functions:
\`\`\`sql
SELECT 
    name, 
    department, 
    salary,
    DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) as dept_rank
FROM employees;
\`\`\`
    `
  }
];
