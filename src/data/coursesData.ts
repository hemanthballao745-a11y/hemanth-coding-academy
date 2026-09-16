import { Course } from '../types';

export const COURSES_DATA: Course[] = [
  {
    id: 'python',
    title: 'Python Programming Masterclass',
    category: 'Programming',
    tagline: 'From Hello World to OOP, Data Science & Real-world Automation',
    description: 'Learn Python from scratch. Python is the most popular beginner-friendly programming language used for AI, Web Development, Data Science, and Automation.',
    iconName: 'Code2',
    badgeColor: 'emerald',
    topicsCount: 16,
    level: 'All Levels',
    lessons: [
      {
        id: 'py-intro',
        courseId: 'python',
        title: '1. Introduction to Python, Syntax & Variables',
        level: 'Beginner',
        durationMinutes: 15,
        explanation: 'Python is a high-level, interpreted programming language known for its clear, clean English-like syntax. You do not need semicolons (;) or complex boilerplate code to start printing and calculating!',
        teluguHint: 'పైథాన్ చాలా సులభమైన ప్రోగ్రామింగ్ భాష. సెమికోలన్ (;) లేదా కర్లీ బ్రేసెస్ అవసరం లేకుండా సులభంగా ఇంగ్లీష్ లాగా కోడ్ రాయవచ్చు.',
        syntax: 'variable_name = value\nprint("Message", variable_name)',
        code: `# Welcome to Python at Hemanth Coding Academy!
name = "Hemanth Student"
language = "Python"
hours_per_day = 2
is_excited = True

print(f"Hello, {name}!")
print(f"You are mastering {language} for {hours_per_day} hours/day.")
print("Goal: Become a confident software developer!")`,
        codeExplanation: [
          { line: 'name = "Hemanth Student"', explanation: 'Creates a string variable named `name` storing text.' },
          { line: 'hours_per_day = 2', explanation: 'Creates an integer variable storing the number 2.' },
          { line: 'is_excited = True', explanation: 'A boolean variable that holds True or False (capitalized in Python).' },
          { line: 'print(f"Hello, {name}!")', explanation: 'An f-string (formatted string literal) to inject variables directly into the printed message.' }
        ],
        expectedOutput: `Hello, Hemanth Student!
You are mastering Python for 2 hours/day.
Goal: Become a confident software developer!`,
        tipsAndTricks: [
          'Python variable names are case-sensitive (`age` and `Age` are distinct).',
          'Use snake_case for Python variables (e.g., `user_total_score`).',
          'Type casting: convert strings to numbers using `int("42")` or `float("3.14")`.'
        ],
        commonMistakes: [
          'Forgetting that Python indentation (whitespace) defines code blocks instead of `{ }`.',
          'Mixing tabs and spaces—always use 4 spaces for indentation.'
        ],
        practiceQuestions: [
          'Declare three variables: `first_name`, `age`, and `favorite_tech`. Print a sentence introducing yourself.',
          'Calculate the area of a rectangle with width 7 and height 12 using variables.'
        ],
        miniTask: 'Write a program that takes a student name and their three test marks, computes the average, and prints it.',
        quiz: [
          {
            id: 'py-q1',
            question: 'Which of the following is the correct way to output "Hello" in Python?',
            options: ['echo "Hello"', 'System.out.println("Hello");', 'print("Hello")', 'Console.WriteLine("Hello");'],
            correctAnswer: 2,
            explanation: 'In Python, print() is the built-in function to display text or values to the console.'
          },
          {
            id: 'py-q2',
            question: 'How do you create a comment in Python?',
            options: ['// This is a comment', '/* This is a comment */', '# This is a comment', '<!-- This is a comment -->'],
            correctAnswer: 2,
            explanation: 'The hash symbol (#) is used for single-line comments in Python.'
          }
        ]
      },
      {
        id: 'py-control-flow',
        courseId: 'python',
        title: '2. Conditionals (if, elif, else) & Loops (for, while)',
        level: 'Beginner',
        durationMinutes: 20,
        explanation: 'Control flow structures let your program make decisions based on conditions and repeat repetitive tasks automatically without duplicating code.',
        teluguHint: 'if-else ద్వారా షరతులను చెక్ చేయవచ్చు (కండిషన్స్), for మరియు while లూప్స్ ద్వారా ఒకే పనిని పదే పదే స్వయంచాలకంగా చేయవచ్చు.',
        syntax: 'if condition:\n    # code block\nelif another_condition:\n    # code block\nelse:\n    # fallback\n\nfor item in iterable:\n    # code block',
        code: `# Checking age eligibility & printing a countdown
marks = 85

if marks >= 90:
    grade = "A+"
elif marks >= 80:
    grade = "A"
elif marks >= 70:
    grade = "B"
else:
    grade = "C"

print(f"Grade achieved: {grade}")

print("\\nLearning Countdown:")
for i in range(5, 0, -1):
    print(f"Launching lesson in {i}...")
print("🚀 Ready to code!")`,
        codeExplanation: [
          { line: 'if marks >= 90:', explanation: 'Evaluates the first boolean expression; if false, moves to the elif statement.' },
          { line: 'elif marks >= 80:', explanation: 'Matches because 85 >= 80 is true, setting grade to "A".' },
          { line: 'for i in range(5, 0, -1):', explanation: 'A loop starting at 5 down to 1 with a step of -1.' }
        ],
        expectedOutput: `Grade achieved: A

Learning Countdown:
Launching lesson in 5...
Launching lesson in 4...
Launching lesson in 3...
Launching lesson in 2...
Launching lesson in 1...
🚀 Ready to code!`,
        tipsAndTricks: [
          'Use `enumerate()` in for loops when you need both the index and the item.',
          'The `range(start, stop, step)` function stops BEFORE the stop number.'
        ],
        commonMistakes: [
          'Forgetting the colon `:` at the end of `if`, `elif`, `else`, `for`, or `while` statements.',
          'Accidentally writing `=` (assignment) instead of `==` (equality check).'
        ],
        practiceQuestions: [
          'Write a loop that prints all even numbers between 1 and 20.',
          'Write an if-else check that determines if a number is positive, negative, or zero.'
        ],
        miniTask: 'Build a number guessing condition that checks if a guessed number is too high, too low, or exact.',
        quiz: [
          {
            id: 'py-q3',
            question: 'What does range(1, 6) produce in a for loop?',
            options: ['[1, 2, 3, 4, 5, 6]', '[1, 2, 3, 4, 5]', '[0, 1, 2, 3, 4, 5]', '[2, 3, 4, 5, 6]'],
            correctAnswer: 1,
            explanation: 'range(start, stop) generates numbers starting from start up to, but not including, stop.'
          }
        ]
      },
      {
        id: 'py-data-structures',
        courseId: 'python',
        title: '3. Data Structures: Lists, Tuples, Sets, Dictionaries',
        level: 'Intermediate',
        durationMinutes: 25,
        explanation: 'Python provides 4 built-in collection types: Lists (ordered, mutable), Tuples (ordered, immutable), Sets (unordered, unique elements), and Dictionaries (key-value pairs).',
        teluguHint: 'Lists (మార్చవచ్చు), Tuples (మార్చలేము), Sets (డూప్లికేట్స్ ఉండవు), Dictionaries (కీ-వాల్యూ జంటలు). డేటాను స్టోర్ చేయడానికి ఇవి మూలస్తంభాలు.',
        syntax: 'my_list = [1, 2, 3]\nmy_dict = {"name": "Hemanth", "role": "Teacher"}\nmy_set = {1, 2, 3}',
        code: `# Working with Lists & Dictionaries
skills = ["Python", "DSA", "SQL", "Git"]
skills.append("AI")

student = {
    "name": "Ananya",
    "course": "Hemanth Coding Academy",
    "skills": skills,
    "streak_days": 12
}

print(f"Student: {student['name']}")
print(f"Total Skills learned: {len(student['skills'])}")
print("Skills list:")
for idx, skill in enumerate(student['skills'], start=1):
    print(f"  {idx}. {skill}")`,
        codeExplanation: [
          { line: 'skills = ["Python", "DSA", "SQL", "Git"]', explanation: 'Creates a mutable ordered list of skill names.' },
          { line: 'skills.append("AI")', explanation: 'Adds the string "AI" to the end of the list.' },
          { line: 'student = { ... }', explanation: 'Creates a dictionary mapping string keys to values of any type.' },
          { line: 'for idx, skill in enumerate(...)', explanation: 'Iterates through list items while keeping track of the count.' }
        ],
        expectedOutput: `Student: Ananya
Total Skills learned: 5
Skills list:
  1. Python
  2. DSA
  3. SQL
  4. Git
  5. AI`,
        tipsAndTricks: [
          'List comprehensions are faster and more concise: `[x*x for x in range(5)]`.',
          'Use `.get(key, default)` on dictionaries to avoid KeyError exceptions.'
        ],
        commonMistakes: [
          'Trying to modify a Tuple (`tuple[0] = 5` raises a TypeError).',
          'Using unhashable types (like lists) as dictionary keys.'
        ],
        practiceQuestions: [
          'Create a dictionary of 5 programming languages and their creators.',
          'Given a list with duplicate numbers, convert it into unique numbers using set().'
        ],
        miniTask: 'Write a frequency counter that counts how many times each word appears in a sentence.',
        quiz: [
          {
            id: 'py-q4',
            question: 'Which collection is immutable (cannot be changed after creation)?',
            options: ['List', 'Dictionary', 'Set', 'Tuple'],
            correctAnswer: 3,
            explanation: 'Tuples are immutable sequences in Python.'
          }
        ]
      },
      {
        id: 'py-functions-oop',
        courseId: 'python',
        title: '4. Functions, Modules & Object-Oriented Programming (OOP)',
        level: 'Advanced',
        durationMinutes: 30,
        explanation: 'Functions allow modular reusable logic. Object-Oriented Programming (OOP) groups state (attributes) and behavior (methods) into classes, mirroring real-world models.',
        teluguHint: 'ఫంక్షన్స్ ద్వారా కోడ్ తిరిగి ఉపయోగించవచ్చు. OOP (క్లాసెస్ & ఆబ్జెక్ట్స్) ద్వారా రియల్-వరల్డ్ సాఫ్ట్‌వేర్‌ను క్లీన్‌గా డిజైన్ చేయవచ్చు.',
        syntax: 'class ClassName:\n    def __init__(self, param):\n        self.param = param\n    def method(self):\n        pass',
        code: `class Developer:
    def __init__(self, name: str, main_language: str):
        self.name = name
        self.main_language = main_language
        self.projects_built = 0

    def build_project(self, project_title: str):
        self.projects_built += 1
        return f"{self.name} successfully deployed '{project_title}' using {self.main_language}!"

dev = Developer("Kiran", "Python")
msg1 = dev.build_project("Weather Predictor")
msg2 = dev.build_project("Student Portal")

print(msg1)
print(msg2)
print(f"Total projects completed by {dev.name}: {dev.projects_built}")`,
        codeExplanation: [
          { line: 'class Developer:', explanation: 'Defines the blueprint for Developer objects.' },
          { line: 'def __init__(self, ...):', explanation: 'The constructor method called automatically when creating a new instance.' },
          { line: 'self.projects_built = 0', explanation: 'Initializes an instance attribute to keep track of state.' },
          { line: 'def build_project(self, ...):', explanation: 'An instance method that modifies the object state and returns a confirmation string.' }
        ],
        expectedOutput: `Kiran successfully deployed 'Weather Predictor' using Python!
Kiran successfully deployed 'Student Portal' using Python!
Total projects completed by Kiran: 2`,
        tipsAndTricks: [
          'Always use `self` as the first argument in instance methods to access instance data.',
          'Leverage type hints (`name: str`) to make your code self-documenting and easier to debug.'
        ],
        commonMistakes: [
          'Omitting `self.` when assigning or reading instance attributes inside methods.',
          'Calling a method without parentheses `dev.build_project` instead of `dev.build_project(...)`.'
        ],
        practiceQuestions: [
          'Create a BankAccount class with deposit, withdraw, and get_balance methods.',
          'Implement inheritance with a `StudentDeveloper` child class that extends `Developer`.'
        ],
        miniTask: 'Build a simple Book and Library class system that tracks borrowed and returned books.',
        quiz: [
          {
            id: 'py-q5',
            question: 'What is the purpose of the __init__ method in Python classes?',
            options: ['To destroy the object', 'To initialize new instances with default or given values', 'To import modules', 'To run tests'],
            correctAnswer: 1,
            explanation: '__init__ is the initializer / constructor method invoked upon object instantiation.'
          }
        ]
      }
    ]
  },
  {
    id: 'java',
    title: 'Java Enterprise & Core Concepts',
    category: 'Programming',
    tagline: 'Object-Oriented Mastery, Collections, JVM & Backend Foundations',
    description: 'Learn Java: the rock-solid, strictly typed language that powers millions of enterprise backend services, Android apps, and high-frequency systems worldwide.',
    iconName: 'Coffee',
    badgeColor: 'amber',
    topicsCount: 14,
    level: 'All Levels',
    lessons: [
      {
        id: 'java-intro',
        courseId: 'java',
        title: '1. Java Architecture, JVM, and Hello World',
        level: 'Beginner',
        durationMinutes: 15,
        explanation: 'Java is platform-independent thanks to the Java Virtual Machine (JVM). Write Once, Run Anywhere (WORA). Java code compiles into Bytecode (.class), which runs on any JVM.',
        teluguHint: 'జావా ప్లాట్‌ఫారమ్ ఇండిపెండెంట్. రాసిన కోడ్ బైట్‌కోడ్‌గా మారి ప్రపంచంలో ఏ కంప్యూటర్‌లో అయినా JVM ద్వారా నడుస్తుంది.',
        syntax: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello");\n    }\n}',
        code: `public class Main {
    public static void main(String[] args) {
        String academy = "Hemanth Coding Academy";
        int foundedYear = 2024;
        boolean isFree = true;

        System.out.println("Welcome to " + academy + "!");
        System.out.println("100% Free Coding for Everyone: " + isFree);
        System.out.println("Let's build powerful enterprise applications!");
    }
}`,
        codeExplanation: [
          { line: 'public class Main', explanation: 'Every Java application requires at least one class definition.' },
          { line: 'public static void main(String[] args)', explanation: 'The entry point for any Java program executed by the JVM.' },
          { line: 'System.out.println(...)', explanation: 'Standard output method to print a line with a trailing newline.' }
        ],
        expectedOutput: `Welcome to Hemanth Coding Academy!
100% Free Coding for Everyone: true
Let's build powerful enterprise applications!`,
        tipsAndTricks: [
          'Java class name must match the filename (e.g. `Main.java` for `public class Main`).',
          'Use primitive types (`int`, `double`, `boolean`) for performance, and wrapper classes (`Integer`, `Double`) for collections.'
        ],
        commonMistakes: [
          'Missing semicolons `;` at the end of statements.',
          'Case sensitivity: `String` (capitalized wrapper) vs `int` (lowercase primitive).'
        ],
        practiceQuestions: [
          'Write a program to calculate the Simple Interest given P, T, R in Java.',
          'Print the multiplication table of 7 using a Java `for` loop.'
        ],
        miniTask: 'Write a program that takes user details and prints an employee badge format.',
        quiz: [
          {
            id: 'java-q1',
            question: 'What translates Java bytecode into machine code at runtime?',
            options: ['JDK', 'JRE', 'JVM', 'Javac'],
            correctAnswer: 2,
            explanation: 'The JVM (Java Virtual Machine) executes bytecode and compiles it into machine instructions.'
          }
        ]
      },
      {
        id: 'java-oop-collections',
        courseId: 'java',
        title: '2. OOP & Java Collections Framework (ArrayList, HashMap)',
        level: 'Intermediate',
        durationMinutes: 25,
        explanation: 'Java shines in OOP (Encapsulation, Inheritance, Polymorphism, Abstraction) and provides the Collections Framework (`List`, `Set`, `Map`) for storing data structures cleanly.',
        teluguHint: 'జావా కలెక్షన్స్ (ArrayList, HashMap) ద్వారా డేటాను ఆటోమేటిక్‌గా రీసైజ్ చేసుకుంటూ అద్భుతంగా మేనేజ్ చేయవచ్చు.',
        syntax: 'List<String> list = new ArrayList<>();\nMap<String, Integer> map = new HashMap<>();',
        code: `import java.util.*;

public class StudentRegistry {
    public static void main(String[] args) {
        // Using HashMap to map student names to their quiz score
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Ravi", 95);
        scores.put("Priya", 98);
        scores.put("Suresh", 89);

        for (Map.Entry<String, Integer> entry : scores.entrySet()) {
            System.out.println("Student: " + entry.getKey() + " -> Score: " + entry.getValue());
        }
    }
}`,
        codeExplanation: [
          { line: 'Map<String, Integer> scores = new HashMap<>();', explanation: 'Creates a hash map with String keys and Integer values.' },
          { line: 'scores.put("Ravi", 95);', explanation: 'Stores key "Ravi" with value 95 in constant average time O(1).' },
          { line: 'for (Map.Entry<...> entry : scores.entrySet())', explanation: 'Iterates through each key-value entry in the map.' }
        ],
        expectedOutput: `Student: Ravi -> Score: 95
Student: Priya -> Score: 98
Student: Suresh -> Score: 89`,
        tipsAndTricks: [
          'Prefer interface types on the left side of declarations: `List<String> list = new ArrayList<>()`.',
          'Use `ArrayList` when you need fast index lookups (O(1)), and `LinkedList` when you need frequent insertions at the ends.'
        ],
        commonMistakes: [
          'Using `==` to compare Strings instead of `.equals()`.',
          'Attempting to store primitives directly in Collections (must use wrapper types like `Integer`).'
        ],
        practiceQuestions: [
          'Count the frequency of characters in a string using HashMap in Java.',
          'Sort an ArrayList of integers in descending order using Collections.sort().'
        ],
        miniTask: 'Build a simple banking system with Account class and customer balance lookup.',
        quiz: [
          {
            id: 'java-q2',
            question: 'How should you compare two String values for equality in Java?',
            options: ['str1 == str2', 'str1.equals(str2)', 'str1.isSame(str2)', 'str1 = str2'],
            correctAnswer: 1,
            explanation: 'The .equals() method compares the actual character contents of the two strings.'
          }
        ]
      }
    ]
  },
  {
    id: 'c-lang',
    title: 'C Programming & System Foundations',
    category: 'Programming',
    tagline: 'The Mother of Modern Languages: Memory, Pointers, and Performance',
    description: 'Master C programming. Understand raw computer memory, CPU architecture, memory addresses, pointers, and memory allocation (malloc/free).',
    iconName: 'Cpu',
    badgeColor: 'blue',
    topicsCount: 12,
    level: 'Beginner to Intermediate',
    lessons: [
      {
        id: 'c-pointers-basics',
        courseId: 'c-lang',
        title: '1. Variables, Pointers & Memory Addresses in C',
        level: 'Beginner',
        durationMinutes: 20,
        explanation: 'A pointer in C is a variable that stores the memory address of another variable. Understanding pointers gives you superpower control over computer hardware and high-performance algorithms.',
        teluguHint: 'పాయింటర్ అంటే వేరే వేరియబుల్ యొక్క మెమొరీ అడ్రస్‌ను దాచుకునే ఒక ప్రత్యేకమైన వేరియబుల్. కంప్యూటర్ మెమరీ ఎలా పనిచేస్తుందో C ద్వారా స్పష్టంగా అర్థమవుతుంది.',
        syntax: 'int x = 10;\nint *ptr = &x;\nprintf("%d", *ptr);',
        code: `#include <stdio.h>

int main() {
    int score = 100;
    int *ptr = &score; // ptr holds address of score

    printf("Value of score: %d\\n", score);
    printf("Memory address of score (&score): %p\\n", (void*)&score);
    printf("Value via pointer (*ptr): %d\\n", *ptr);

    // Modifying value via pointer
    *ptr = 150;
    printf("New value of score after pointer edit: %d\\n", score);

    return 0;
}`,
        codeExplanation: [
          { line: 'int *ptr = &score;', explanation: '`&score` retrieves the memory address of `score`. `*ptr` declares a pointer to an integer.' },
          { line: 'printf("%p", ...)', explanation: '`%p` format specifier is used to display pointer addresses in hexadecimal format.' },
          { line: '*ptr = 150;', explanation: 'Dereferencing the pointer to modify the contents directly at that memory location.' }
        ],
        expectedOutput: `Value of score: 100
Memory address of score (&score): 0x7ffd1234
Value via pointer (*ptr): 100
New value of score after pointer edit: 150`,
        tipsAndTricks: [
          'Remember: `&` is the address-of operator; `*` is the dereference operator.',
          'Always initialize pointers (`int *p = NULL;`) to avoid dangerous garbage addresses (wild pointers).'
        ],
        commonMistakes: [
          'Dereferencing a NULL pointer, leading to a Segmentation Fault crash.',
          'Forgetting `&` in `scanf("%d", &var)`. C requires the address to write into the variable.'
        ],
        practiceQuestions: [
          'Write a function in C to swap two numbers using pointers (call by reference).',
          'Find the length of a string using pointers without using `strlen()`.'
        ],
        miniTask: 'Write a C program that dynamically allocates an array of N numbers with malloc(), takes input, and frees the memory.',
        quiz: [
          {
            id: 'c-q1',
            question: 'What operator is used to find the memory address of a variable in C?',
            options: ['*', '&', '#', '%'],
            correctAnswer: 1,
            explanation: 'The ampersand (&) is the address-of operator in C.'
          }
        ]
      }
    ]
  },
  {
    id: 'cpp',
    title: 'C++ & Standard Template Library (STL)',
    category: 'Programming',
    tagline: 'Modern C++, STL Containers, Algorithms & Competitive Programming',
    description: 'Learn C++: The choice for game engines, operating systems, and top competitive programmers. Master vectors, sets, maps, iterators, and lambdas.',
    iconName: 'Layers',
    badgeColor: 'indigo',
    topicsCount: 15,
    level: 'All Levels',
    lessons: [
      {
        id: 'cpp-stl-vectors',
        courseId: 'cpp',
        title: '1. C++ STL Vectors, Sorting & Fast I/O',
        level: 'Beginner',
        durationMinutes: 20,
        explanation: 'The C++ Standard Template Library (STL) provides ready-to-use dynamic arrays (`vector`), balanced trees (`set`, `map`), and lightning-fast sorting algorithms (`std::sort`).',
        teluguHint: 'C++ STL లోని vectors మరియు sort() ఫంక్షన్ల వల్ల పోటీ కోడింగ్ (competitive programming) లో ప్రశ్నలను అతి తక్కువ సమయంలో వేగంగా సాల్వ్ చేయవచ్చు.',
        syntax: '#include <vector>\n#include <algorithm>\nstd::vector<int> v = {4, 2, 8};\nstd::sort(v.begin(), v.end());',
        code: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    // Fast I/O for competitive programming
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    vector<int> nums = {45, 12, 85, 32, 89, 21};

    cout << "Original vector size: " << nums.size() << "\\n";

    // Sort in ascending order
    sort(nums.begin(), nums.end());

    cout << "Sorted numbers: ";
    for (int num : nums) {
        cout << num << " ";
    }
    cout << "\\n";

    // Binary search in O(log N)
    bool found = binary_search(nums.begin(), nums.end(), 85);
    cout << "Is 85 present? " << (found ? "YES" : "NO") << "\\n";

    return 0;
}`,
        codeExplanation: [
          { line: 'vector<int> nums = { ... }', explanation: 'Creates a dynamic array that handles resizing automatically in contiguous memory.' },
          { line: 'sort(nums.begin(), nums.end())', explanation: 'Hybrid IntroSort algorithm achieving O(N log N) worst-case time complexity.' },
          { line: 'binary_search(...)', explanation: 'Standard STL algorithm to check element presence in sorted ranges in logarithmic time.' }
        ],
        expectedOutput: `Original vector size: 6
Sorted numbers: 12 21 32 45 85 89 
Is 85 present? YES`,
        tipsAndTricks: [
          'Pass large objects by reference (`const vector<int>& v`) to avoid expensive deep copies.',
          'Use `nums.reserve(N)` if you know the final size in advance to avoid multiple memory reallocations.'
        ],
        commonMistakes: [
          'Accessing `v[i]` out of bounds leads to undefined behavior. Use `v.at(i)` if you need bounds checking.',
          'Using `binary_search` on an unsorted vector produces invalid results.'
        ],
        practiceQuestions: [
          'Find the kth largest element using `std::priority_queue`.',
          'Remove duplicates from a vector while preserving order.'
        ],
        miniTask: 'Write a C++ program that groups words by their anagram signatures using `unordered_map<string, vector<string>>`.',
        quiz: [
          {
            id: 'cpp-q1',
            question: 'What is the average time complexity of std::sort in C++ STL?',
            options: ['O(N^2)', 'O(N)', 'O(N log N)', 'O(log N)'],
            correctAnswer: 2,
            explanation: 'std::sort uses IntroSort which guarantees O(N log N) performance.'
          }
        ]
      }
    ]
  },
  {
    id: 'html',
    title: 'HTML5 Semantic Web Architecture',
    category: 'Web Development',
    tagline: 'The Skeleton of the Web: Accessible, Semantic & Modern Markup',
    description: 'Learn HTML5 from scratch. Build semantic structures, forms, audio/video players, metadata tags, and accessible web experiences.',
    iconName: 'FileCode',
    badgeColor: 'orange',
    topicsCount: 10,
    level: 'Beginner',
    lessons: [
      {
        id: 'html-semantic-basics',
        courseId: 'html',
        title: '1. Semantic Tags, Document Tree & Forms',
        level: 'Beginner',
        durationMinutes: 15,
        explanation: 'HTML (HyperText Markup Language) creates the structural hierarchy of web pages. Semantic elements (`<header>`, `<main>`, `<article>`, `<section>`, `<footer>`) improve SEO, accessibility, and clean code.',
        teluguHint: 'HTML అంటే వెబ్ పేజీకి ఎముకల గూడు వంటి నిర్మాణం. సెమాంటిక్ ట్యాగ్స్ వాడటం వల్ల గూగుల్ సెర్చ్ ఇంజిన్లు మరియు స్క్రీన్ రీడర్లు పేజీని సులభంగా గుర్తిస్తాయి.',
        syntax: '<!DOCTYPE html>\n<html>\n  <body>\n    <main>...</main>\n  </body>\n</html>',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Hemanth Coding Academy - Course Preview</title>
</head>
<body>
  <header>
    <h1>Hemanth Coding Academy</h1>
    <nav>
      <a href="#courses">Courses</a> |
      <a href="#compiler">Python Compiler</a> |
      <a href="#interview">Interview Prep</a>
    </nav>
  </header>

  <main>
    <article>
      <h2>Why Learn to Code in 2025?</h2>
      <p>Coding empowers you to build software, solve real problems, and unlock global career opportunities.</p>
    </article>
  </main>

  <footer>
    <p>&copy; 2025 Hemanth Coding Academy. 100% Free Education.</p>
  </footer>
</body>
</html>`,
        codeExplanation: [
          { line: '<!DOCTYPE html>', explanation: 'Informs the browser that the document is modern HTML5.' },
          { line: '<header>, <nav>, <main>, <article>, <footer>', explanation: 'Semantic elements defining purpose clearly to browsers, search engines, and screen readers.' }
        ],
        expectedOutput: `Rendered web page with clear banner, navigation links, main article, and footer.`,
        tipsAndTricks: [
          'Always include an `alt` attribute on `<img>` tags for accessibility and image fallback.',
          'Use `<label for="inputId">` paired with `<input id="inputId">` for accessible form controls.'
        ],
        commonMistakes: [
          'Overusing `<div>` everywhere (known as "div soup") instead of meaningful semantic tags.',
          'Missing `<meta name="viewport" content="width=device-width, initial-scale=1.0">` causing bad mobile rendering.'
        ],
        practiceQuestions: [
          'Create a contact form containing name, email, role dropdown, and submit button.',
          'Build a student report card table using `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, and `<td>`.'
        ],
        miniTask: 'Code a personal portfolio profile card containing your photo, bio, skills list, and social links.',
        quiz: [
          {
            id: 'html-q1',
            question: 'Which HTML5 element represents the primary content area of a document?',
            options: ['<content>', '<section>', '<main>', '<div id="main">'],
            correctAnswer: 2,
            explanation: 'The <main> tag represents the dominant content of the <body> of a document.'
          }
        ]
      }
    ]
  },
  {
    id: 'css',
    title: 'CSS3, Flexbox, Grid & Modern Styling',
    category: 'Web Development',
    tagline: 'Design Visually Stunning, Responsive Layouts with Flexbox & Grid',
    description: 'Transform raw HTML into beautiful, responsive web applications. Master the Box Model, Flexbox, CSS Grid, animations, and dark mode themes.',
    iconName: 'Palette',
    badgeColor: 'sky',
    topicsCount: 12,
    level: 'Beginner to Intermediate',
    lessons: [
      {
        id: 'css-flex-grid',
        courseId: 'css',
        title: '1. CSS Box Model, Flexbox & Responsive Layouts',
        level: 'Beginner',
        durationMinutes: 20,
        explanation: 'CSS controls colors, typography, spacing, and layouts. The CSS Box Model consists of Content, Padding, Border, and Margin. Flexbox provides one-dimensional alignment, while CSS Grid handles two-dimensional layouts.',
        teluguHint: 'CSS ద్వారా వెబ్ పేజీకి అందమైన రంగులు, ఫాంట్స్, స్టైల్స్ ఇవ్వవచ్చు. Flexbox మరియు Grid ద్వారా మొబైల్, ల్యాప్‌టాప్ రెండింటిలోనూ వెబ్‌సైట్ అద్భుతంగా కనిపించేలా చేయవచ్చు.',
        syntax: '.container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}',
        code: `/* Modern Card & Flex Layout */
.card-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 480px;
  padding: 24px;
  background-color: #0f172a;
  border: 1px solid #1e293b;
  border-radius: 12px;
  color: #f8fafc;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.badge {
  background-color: #10b981;
  color: #ffffff;
  padding: 4px 10px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;
}

.action-btn {
  background: #6366f1;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.2s ease;
}

.action-btn:hover {
  transform: translateY(-2px);
}`,
        codeExplanation: [
          { line: 'display: flex; flex-direction: column; gap: 16px;', explanation: 'Arranges children vertically with consistent 16px spacing without margin hacks.' },
          { line: 'justify-content: space-between; align-items: center;', explanation: 'Pushes title and badge to opposite edges and vertically aligns them to the middle.' },
          { line: 'transition: transform 0.2s ease;', explanation: 'Smoothly animates hover lift effect for a polished user experience.' }
        ],
        expectedOutput: `Clean, dark-mode card with centered title, pill badge, and interactive lift-on-hover action button.`,
        tipsAndTricks: [
          'Always set `* { box-sizing: border-box; }` so padding doesn\'t unintentionally enlarge element width.',
          'Use CSS variables (`--primary-color: #6366f1;`) for effortless theming and dark-mode toggling.'
        ],
        commonMistakes: [
          'Using fixed pixel widths (`width: 800px`) instead of fluid widths (`max-width: 800px; width: 100%;`), breaking on mobile devices.',
          'Not clearing default margins on `<body>`.'
        ],
        practiceQuestions: [
          'Create a 3-column responsive pricing card layout using CSS Grid (`grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));`).',
          'Center a modal both vertically and horizontally in one line of CSS using `place-items: center;`.'
        ],
        miniTask: 'Design a responsive navigation bar with a logo on the left and menu links on the right that stack on mobile.',
        quiz: [
          {
            id: 'css-q1',
            question: 'What property makes padding and border included inside the total width of an element?',
            options: ['box-sizing: content-box', 'box-sizing: border-box', 'display: block', 'overflow: hidden'],
            correctAnswer: 1,
            explanation: 'box-sizing: border-box includes padding and border in the element\'s total width and height.'
          }
        ]
      }
    ]
  },
  {
    id: 'javascript',
    title: 'JavaScript Modern (ES6+)',
    category: 'Programming',
    tagline: 'The Language of the Web: Async/Await, DOM, Closures & Modern APIs',
    description: 'Master JavaScript: Promises, Event Loop, Closures, Prototypes, Fetch API, and modern functional methods like map, filter, and reduce.',
    iconName: 'Zap',
    badgeColor: 'yellow',
    topicsCount: 16,
    level: 'All Levels',
    lessons: [
      {
        id: 'js-async-promises',
        courseId: 'javascript',
        title: '1. Async/Await, Promises & Fetch API',
        level: 'Intermediate',
        durationMinutes: 20,
        explanation: 'JavaScript is single-threaded and non-blocking using an event loop. Asynchronous operations like network requests, timers, and database calls are handled with Promises and the async/await syntax.',
        teluguHint: 'జావాస్క్రిప్ట్ అసింక్రోనస్ (Async/Await) ద్వారా ఇంటర్నెట్ నుండి డేటాను పేజీ స్తంభించిపోకుండా (freeze అవ్వకుండా) బ్యాక్‌గ్రౌండ్‌లో లోడ్ చేస్తుంది.',
        syntax: 'async function fetchData() {\n  try {\n    const res = await fetch(url);\n    const data = await res.json();\n  } catch (err) {\n    console.error(err);\n  }\n}',
        code: `// Fetching user coding stats asynchronously
async function loadStudentStats(studentId) {
  try {
    console.log("Fetching student profile...");
    
    // Simulating async network call
    const response = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: studentId,
          name: "Hemanth Learner",
          streak: 7,
          solvedProblems: 14,
          certified: true
        });
      }, 500);
    });

    console.log(\`✅ Loaded profile for \${response.name}\`);
    console.log(\`🔥 Current streak: \${response.streak} days\`);
    console.log(\`🏆 Problems solved: \${response.solvedProblems}\`);
    return response;
  } catch (error) {
    console.error("Failed to load profile:", error.message);
  }
}

loadStudentStats("student-101");`,
        codeExplanation: [
          { line: 'async function loadStudentStats(...)', explanation: 'Declares an asynchronous function that always returns a Promise.' },
          { line: 'await new Promise(...)', explanation: 'Pauses execution of the function until the Promise settles without blocking the main thread.' },
          { line: 'try { ... } catch (error) { ... }', explanation: 'Standard error handling block for caught rejections and runtime exceptions.' }
        ],
        expectedOutput: `Fetching student profile...
✅ Loaded profile for Hemanth Learner
🔥 Current streak: 7 days
🏆 Problems solved: 14`,
        tipsAndTricks: [
          'Use `Promise.all([p1, p2])` to execute multiple independent network calls concurrently in parallel.',
          'Remember array destructuring and optional chaining (`user?.profile?.avatar`) to prevent crashes.'
        ],
        commonMistakes: [
          'Forgetting `await` before a Promise call, resulting in a pending Promise object instead of the actual data.',
          'Not catching errors with try/catch, causing unhandled promise rejections.'
        ],
        practiceQuestions: [
          'Write a function that retries a failed fetch call up to 3 times before throwing an error.',
          'Transform an array of numbers using `.map()`, `.filter()`, and `.reduce()`.'
        ],
        miniTask: 'Build a function that debounces search inputs so an API is only called 300ms after the user stops typing.',
        quiz: [
          {
            id: 'js-q1',
            question: 'What does the await keyword do in JavaScript?',
            options: ['Pauses the entire browser', 'Waits for a Promise to resolve/reject before proceeding', 'Creates a new thread', 'Cancels the network request'],
            correctAnswer: 1,
            explanation: 'await pauses execution inside an async function until the Promise resolves or rejects.'
          }
        ]
      }
    ]
  },
  {
    id: 'dsa',
    title: 'Data Structures & Algorithms (DSA)',
    category: 'Computer Science',
    tagline: 'Arrays to DP: Ace Product Company & FAANG Technical Rounds',
    description: 'Master all major Data Structures: Arrays, Strings, Linked Lists, Stacks, Queues, Hashing, Trees, BST, Graphs, Recursion, Sorting, Searching, Dynamic Programming, Greedy, and Big-O Complexity.',
    iconName: 'Network',
    badgeColor: 'violet',
    topicsCount: 18,
    level: 'All Levels',
    lessons: [
      {
        id: 'dsa-big-o',
        courseId: 'dsa',
        title: '1. Time & Space Complexity (Big-O Notation)',
        level: 'Beginner',
        durationMinutes: 20,
        explanation: 'Big-O notation describes how an algorithm\'s runtime or memory requirement grows as the input size (N) scales. Understanding Big-O lets you pick the optimal approach before writing code.',
        teluguHint: 'Big-O అంటే మన కోడ్ ఎంత వేగంగా (టైమ్) మరియు ఎంత మెమొరీ (స్పేస్) వాడుతుందో కొలిచే సూత్రం. O(1) అత్యంత వేగవంతమైనది, O(N^2) పెద్ద డేటాకు నెమ్మదిగా మారుతుంది.',
        syntax: 'O(1) - Constant\nO(log N) - Logarithmic\nO(N) - Linear\nO(N log N) - Linearithmic\nO(N^2) - Quadratic',
        code: `# Comparing O(1) vs O(N) vs O(N^2)

# O(1) Constant Time: Direct array index lookup
def get_first_element(arr):
    return arr[0] if arr else None

# O(N) Linear Time: Single scan through array
def find_maximum(arr):
    max_val = arr[0]
    for num in arr:
        if num > max_val:
            max_val = num
    return max_val

# O(N^2) Quadratic: Nested loop checking all pairs
def has_duplicate_pairs(arr):
    n = len(arr)
    for i in range(n):
        for j in range(i + 1, n):
            if arr[i] == arr[j]:
                return True
    return False

sample = [5, 12, 9, 44, 18, 9]
print("First item O(1):", get_first_element(sample))
print("Maximum item O(N):", find_maximum(sample))
print("Has duplicates O(N^2):", has_duplicate_pairs(sample))`,
        codeExplanation: [
          { line: 'return arr[0]', explanation: 'Direct memory offset calculation takes exact same time regardless of array size -> O(1).' },
          { line: 'for num in arr:', explanation: 'Visits all N elements once; operations grow proportionally with N -> O(N).' },
          { line: 'for i in range(n): for j in range(...)', explanation: 'N * (N-1) / 2 comparisons; time grows quadratically with N^2 -> O(N^2).' }
        ],
        expectedOutput: `First item O(1): 5
Maximum item O(N): 44
Has duplicates O(N^2): True`,
        tipsAndTricks: [
          'Drop constants: O(2N + 5) simplifies to O(N).',
          'Drop non-dominant terms: O(N^2 + N + 100) simplifies to O(N^2).',
          'Trade space for time: Using a HashSet reduces lookup from O(N) to O(1) space O(N).'
        ],
        commonMistakes: [
          'Assuming built-in methods are O(1)—for example, `arr.pop(0)` or `x in list` in Python is O(N)!',
          'Ignoring recursion stack space in Big-O space complexity calculations.'
        ],
        practiceQuestions: [
          'What is the time complexity of binary search on a sorted array of size N?',
          'What is the space complexity of storing an N x N matrix?'
        ],
        miniTask: 'Optimize the `has_duplicate_pairs` function from O(N^2) down to O(N) using a Python `set()`.',
        quiz: [
          {
            id: 'dsa-q1',
            question: 'What is the time complexity of looking up a key in a balanced HashMap?',
            options: ['O(N)', 'O(N^2)', 'O(1) average', 'O(log N)'],
            correctAnswer: 2,
            explanation: 'Hash maps compute a hash code for direct index access in O(1) average time.'
          }
        ]
      },
      {
        id: 'dsa-linked-list',
        courseId: 'dsa',
        title: '2. Singly Linked Lists & Reversing a Linked List',
        level: 'Intermediate',
        durationMinutes: 25,
        explanation: 'A Linked List is a linear collection of data elements called Nodes, where each node points to the next node via a memory reference. Unlike arrays, linked lists allow O(1) insertions at the head without memory shifts.',
        teluguHint: 'లింక్డ్ లిస్ట్ అంటే రైలు బోగీల వంటిది. ప్రతి నోడ్ తన డేటాను మరియు తర్వాతి నోడ్ యొక్క అడ్రస్‌ను కలిగి ఉంటుంది. Reversing a Linked List చాలా ముఖ్యమైన ఇంటర్వ్యూ ప్రశ్న!',
        syntax: 'class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next',
        code: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_linked_list(head):
    prev = None
    curr = head
    while curr is not None:
        next_temp = curr.next  # Save next node
        curr.next = prev       # Reverse pointer
        prev = curr            # Move prev forward
        curr = next_temp       # Move curr forward
    return prev

# Helper to print list
def print_list(node):
    vals = []
    while node:
        vals.append(str(node.val))
        node = node.next
    print(" -> ".join(vals) + " -> None")

# Create 1 -> 2 -> 3 -> 4 -> None
head = ListNode(1, ListNode(2, ListNode(3, ListNode(4))))
print("Original List:")
print_list(head)

reversed_head = reverse_linked_list(head)
print("Reversed List:")
print_list(reversed_head)`,
        codeExplanation: [
          { line: 'prev = None; curr = head', explanation: 'Initialize pointers: `prev` starts at None, `curr` points to the head.' },
          { line: 'next_temp = curr.next', explanation: 'Crucial: save the reference to the next node before overwriting `curr.next`.' },
          { line: 'curr.next = prev', explanation: 'The core reversal: points the current node backward to the previous node.' },
          { line: 'prev = curr; curr = next_temp', explanation: 'Advance both pointers one step along the chain.' }
        ],
        expectedOutput: `Original List:
1 -> 2 -> 3 -> 4 -> None
Reversed List:
4 -> 3 -> 2 -> 1 -> None`,
        tipsAndTricks: [
          'Always draw pointers on paper with boxes and arrows when solving linked list questions.',
          'Use a Dummy Head Node (`dummy = ListNode(0)`) to simplify edge cases at the head.'
        ],
        commonMistakes: [
          'Losing the next node reference (`curr.next = prev` before saving `next_temp`), breaking the chain permanently.',
          'Forgetting to check if head is None or has only 1 element.'
        ],
        practiceQuestions: [
          'Detect if a linked list has a cycle using Floyd\'s Tortoise and Hare algorithm.',
          'Find the middle element of a linked list in a single pass.'
        ],
        miniTask: 'Write a function to delete a node given only a reference to that node (without head access).',
        quiz: [
          {
            id: 'dsa-q2',
            question: 'What is the time and space complexity of reversing a linked list iteratively?',
            options: ['O(N) time, O(N) space', 'O(N) time, O(1) space', 'O(N^2) time, O(1) space', 'O(log N) time, O(1) space'],
            correctAnswer: 1,
            explanation: 'Iterative reversal visits each node once in O(N) time and requires only 3 pointers in O(1) constant auxiliary space.'
          }
        ]
      }
    ]
  },
  {
    id: 'sql',
    title: 'SQL & Database Management (DBMS)',
    category: 'Database',
    tagline: 'Master Queries, Joins, Indexing, Grouping & ACID Transactions',
    description: 'Learn relational database management. Write performant SELECT queries, JOINs (INNER, LEFT, RIGHT), GROUP BY, aggregations, window functions, indexes, and normalization.',
    iconName: 'Database',
    badgeColor: 'teal',
    topicsCount: 12,
    level: 'All Levels',
    lessons: [
      {
        id: 'sql-joins-basics',
        courseId: 'sql',
        title: '1. SQL CRUD, Joins (INNER, LEFT) & Aggregations',
        level: 'Beginner',
        durationMinutes: 20,
        explanation: 'SQL (Structured Query Language) is the universal language for querying relational databases (PostgreSQL, MySQL, SQLite). JOINs combine rows from two or more tables based on a related column.',
        teluguHint: 'SQL ద్వారా డేటాబేస్ నుండి మనకు కావలసిన సమాచారాన్ని సులభంగా వెలికితీయవచ్చు. JOINs ద్వారా రెండు వేర్వేరు టేబుల్స్‌ను ఒకేసారి కలిపి చూడవచ్చు.',
        syntax: 'SELECT c.name, COUNT(o.id) AS total_orders\nFROM customers c\nLEFT JOIN orders o ON c.id = o.customer_id\nGROUP BY c.name\nHAVING COUNT(o.id) > 2;',
        code: `-- Creating demo tables & querying
CREATE TABLE students (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    course VARCHAR(50)
);

CREATE TABLE course_scores (
    student_id INT,
    score INT,
    passed BOOLEAN
);

-- Query: Retrieve student name with their quiz score using INNER JOIN
SELECT 
    s.name, 
    s.course, 
    cs.score,
    CASE 
        WHEN cs.score >= 90 THEN 'Distinction'
        WHEN cs.score >= 60 THEN 'Passed'
        ELSE 'Needs Improvement'
    END AS result_status
FROM students s
INNER JOIN course_scores cs ON s.id = cs.student_id
WHERE cs.score >= 75
ORDER BY cs.score DESC;`,
        codeExplanation: [
          { line: 'INNER JOIN course_scores cs ON s.id = cs.student_id', explanation: 'Pairs records that have matching keys in both students and scores tables.' },
          { line: 'CASE WHEN ... END AS result_status', explanation: 'Conditional logic in SQL to create dynamic computed columns.' },
          { line: 'ORDER BY cs.score DESC', explanation: 'Sorts results from highest score to lowest.' }
        ],
        expectedOutput: `+-----------------+--------+-------+---------------+
| name            | course | score | result_status |
+-----------------+--------+-------+---------------+
| Priya Sharma    | Python | 98    | Distinction   |
| Hemanth Student | DSA    | 92    | Distinction   |
| Rajesh Kumar    | Java   | 84    | Passed        |
+-----------------+--------+-------+---------------+`,
        tipsAndTricks: [
          'Use `EXPLAIN ANALYZE` to inspect query execution plans and identify missing indexes.',
          '`WHERE` filters rows before grouping; `HAVING` filters aggregate calculations after `GROUP BY`.'
        ],
        commonMistakes: [
          'Using `SELECT *` in production code instead of selecting only the necessary columns.',
          'Missing index on Foreign Key columns, which causes slow table scans on JOINs.'
        ],
        practiceQuestions: [
          'Find the 2nd highest salary from an Employee table without using LIMIT.',
          'Write a query to find all customers who have never placed an order using LEFT JOIN.'
        ],
        miniTask: 'Write a query that groups students by course and returns the average score and count per course.',
        quiz: [
          {
            id: 'sql-q1',
            question: 'Which clause is used to filter results after an aggregation with GROUP BY?',
            options: ['WHERE', 'ORDER BY', 'HAVING', 'FILTER'],
            correctAnswer: 2,
            explanation: 'The HAVING clause filters grouped records based on aggregate functions like COUNT(), SUM(), AVG().'
          }
        ]
      }
    ]
  },
  {
    id: 'git-github',
    title: 'Git & GitHub Collaboration',
    category: 'Tools',
    tagline: 'Version Control, Branching, Pull Requests, Merge Conflicts & CI/CD',
    description: 'Master professional version control. Branching strategies, Git commits, push, pull, resolving merge conflicts, rebase, and collaborating on open-source GitHub projects.',
    iconName: 'GitBranch',
    badgeColor: 'rose',
    topicsCount: 10,
    level: 'Beginner to Intermediate',
    lessons: [
      {
        id: 'git-core-commands',
        courseId: 'git-github',
        title: '1. Git Workflow, Commits, Branching & Resolving Conflicts',
        level: 'Beginner',
        durationMinutes: 15,
        explanation: 'Git tracks changes in your codebase over time, allowing safe experimentation via branches and effortless collaboration with teams across the globe.',
        teluguHint: 'Git అనేది టైమ్ మెషిన్ లాంటిది. మనం రాసిన కోడ్‌ను ఎప్పటికప్పుడు సేవ్ చేసుకుని, ఎప్పుడైనా వెనక్కి వెళ్లడానికి లేదా ఇతర డెవలపర్లతో కలిసి పనిచేయడానికి ఇది తప్పనిసరి.',
        syntax: 'git init\ngit add .\ngit commit -m "feat: message"\ngit branch feature-name\ngit checkout feature-name',
        code: `# Complete Git feature development lifecycle
# 1. Check current status
git status

# 2. Create and switch to a new feature branch
git checkout -b feature/auth-system

# 3. Stage changes
git add src/auth/ server.ts

# 4. Commit with conventional commit message
git commit -m "feat(auth): implement secure student login and progress tracking"

# 5. Push branch to GitHub remote
git push -u origin feature/auth-system

# 6. Merge back to main after code review
git checkout main
git pull origin main
git merge feature/auth-system`,
        codeExplanation: [
          { line: 'git checkout -b feature/auth-system', explanation: 'Creates and immediately activates an isolated branch so the main branch stays clean.' },
          { line: 'git add ...', explanation: 'Moves files from the working directory to the staging area.' },
          { line: 'git commit -m "..."', explanation: 'Creates an immutable snapshot of the staged files with a descriptive changelog message.' }
        ],
        expectedOutput: `[feature/auth-system 7c9a412] feat(auth): implement secure student login
 2 files changed, 142 insertions(+)
Branch 'feature/auth-system' set up to track remote branch.`,
        tipsAndTricks: [
          'Use `git stash` to temporarily shelve uncommitted work when you need to switch tasks quickly.',
          'Always use a `.gitignore` file to avoid pushing `node_modules/` or sensitive `.env` files.'
        ],
        commonMistakes: [
          'Committing API keys or secrets to public GitHub repositories.',
          'Working directly on the `main` branch without feature branches in team environments.'
        ],
        practiceQuestions: [
          'How do you undo the last commit while keeping your local changes intact? (`git reset --soft HEAD~1`)',
          'What is the difference between `git merge` and `git rebase`?'
        ],
        miniTask: 'Initialize a Git repository, create two conflicting branches that edit the same line, and resolve the merge conflict.',
        quiz: [
          {
            id: 'git-q1',
            question: 'Which command stages all modified and newly created files in the repository?',
            options: ['git commit -a', 'git add .', 'git stage all', 'git push'],
            correctAnswer: 1,
            explanation: 'git add . stages all changes in the current directory and subdirectories for the next commit.'
          }
        ]
      }
    ]
  },
  {
    id: 'ai-foundations',
    title: 'AI, LLMs & Prompt Engineering',
    category: 'Artificial Intelligence',
    tagline: 'Modern AI: LLM Fundamentals, Gemini API, Embeddings & RAG Systems',
    description: 'Understand the foundations of Artificial Intelligence, Large Language Models, Transformer architectures, embeddings, vector search, and integrating AI into software products.',
    iconName: 'Sparkles',
    badgeColor: 'purple',
    topicsCount: 12,
    level: 'All Levels',
    lessons: [
      {
        id: 'ai-llm-basics',
        courseId: 'ai-foundations',
        title: '1. How LLMs Work, Tokens & Prompt Engineering',
        level: 'Beginner',
        durationMinutes: 20,
        explanation: 'Large Language Models (like Gemini) are trained on vast datasets to predict the most likely next token. Effective prompt engineering (zero-shot, few-shot, chain-of-thought) enables precise, high-accuracy software integrations.',
        teluguHint: 'ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ (AI) మరియు లార్జ్ లాంగ్వేజ్ మోడల్స్ (LLMs) కంప్యూటర్‌కు మానవుడిలా అర్థం చేసుకుని సమాధానాలు ఇచ్చే సామర్థ్యాన్ని అందిస్తాయి.',
        syntax: 'system_instruction = "You are a senior tutor..."\nprompt = "Explain recursion simply"\nresponse = model.generate_content(prompt)',
        code: `# Calling AI LLM with structured prompt in Python
import os

def generate_coding_explanation(topic: str, language: str):
    system_prompt = (
        "You are an expert tutor at Hemanth Coding Academy. "
        "Explain programming concepts in simple language with clear examples."
    )
    user_query = f"Explain {topic} in {language} for an absolute beginner."

    # Simulation of API request payload
    request_payload = {
        "model": "gemini-2.5-flash",
        "system_instruction": system_prompt,
        "contents": user_query,
        "temperature": 0.2
    }

    print(f"🤖 Requesting AI explanation for: '{topic}'...")
    print(f"📌 System Directive: {system_prompt[:55]}...")
    print("✨ Generated Response: Recursion is when a function calls itself until reaching a base condition!")

generate_coding_explanation("Recursion", "Python")`,
        codeExplanation: [
          { line: 'system_prompt = ...', explanation: 'Guides model persona, tone, safety, and output structure.' },
          { line: 'temperature: 0.2', explanation: 'Lower temperature ensures focused, deterministic, fact-grounded responses.' }
        ],
        expectedOutput: `🤖 Requesting AI explanation for: 'Recursion'...
📌 System Directive: You are an expert tutor at Hemanth Coding Academy...
✨ Generated Response: Recursion is when a function calls itself until reaching a base condition!`,
        tipsAndTricks: [
          'Give few-shot examples (input -> expected output pairs) to guarantee consistent JSON schema.',
          'Always validate AI output programmatically with tools like Zod or Pydantic before saving to a database.'
        ],
        commonMistakes: [
          'Exposing secret API keys in frontend client code—always make LLM calls server-side.',
          'Not setting limits on token output, which can cause runaway latency or costs.'
        ],
        practiceQuestions: [
          'Explain what temperature and top_p parameters control in generative AI models.',
          'What is RAG (Retrieval-Augmented Generation) and why does it reduce hallucinations?'
        ],
        miniTask: 'Design a prompt that parses an unstructured resume string into a clean JSON object with name, skills, and experience.',
        quiz: [
          {
            id: 'ai-q1',
            question: 'What happens when you lower the temperature setting of an LLM?',
            options: ['The model outputs become more random', 'The model outputs become more deterministic and focused', 'The model runs slower', 'The context window increases'],
            correctAnswer: 1,
            explanation: 'Lower temperature reduces randomness, making the model\'s token selection more predictable and focused.'
          }
        ]
      }
    ]
  },
  {
    id: 'frontend-dev',
    title: 'Frontend Development (React & Vite)',
    category: 'Web Development',
    tagline: 'Modern Single-Page Apps: Components, Hooks, State & Tailwind CSS',
    description: 'Build fast, responsive web applications using React, Vite, TypeScript, and Tailwind CSS. Master useState, useEffect, custom hooks, and state management.',
    iconName: 'Layout',
    badgeColor: 'cyan',
    topicsCount: 14,
    level: 'All Levels',
    lessons: [
      {
        id: 'frontend-react-hooks',
        courseId: 'frontend-dev',
        title: '1. React Components, Props, useState & useEffect',
        level: 'Beginner',
        durationMinutes: 20,
        explanation: 'React lets you build modular UI out of reusable components. Hooks (`useState`, `useEffect`) manage internal component state and side effects without class components.',
        teluguHint: 'రియాక్ట్ (React) ద్వారా వెబ్‌సైట్‌ను చిన్న చిన్న బ్లాకులుగా (కాంపోనెంట్స్) విభజించి, యూజర్ క్లిక్ చేసినప్పుడు పేజీ రీలోడ్ కాకుండా రియల్-టైమ్‌లో అప్‌డేట్ చేయవచ్చు.',
        syntax: 'const [count, setCount] = useState(0);\nuseEffect(() => {\n  // effect logic\n}, [dependencies]);',
        code: `import React, { useState, useEffect } from 'react';

export function CodeStreakCounter() {
  const [streak, setStreak] = useState(1);
  const [completedToday, setCompletedToday] = useState(false);

  const handleCompleteLesson = () => {
    if (!completedToday) {
      setStreak(prev => prev + 1);
      setCompletedToday(true);
    }
  };

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl text-white">
      <h3 className="text-xl font-bold">Daily Streak: 🔥 {streak} Days</h3>
      <p className="text-slate-400 mt-1">
        {completedToday ? "Great job! Keep the momentum going tomorrow." : "Complete a lesson today to maintain your streak!"}
      </p>
      <button 
        onClick={handleCompleteLesson}
        disabled={completedToday}
        className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 font-semibold rounded-lg"
      >
        {completedToday ? "Completed for Today" : "Mark Today Completed"}
      </button>
    </div>
  );
}`,
        codeExplanation: [
          { line: 'const [streak, setStreak] = useState(1);', explanation: 'Creates reactive state `streak` initialized to 1, and its setter function.' },
          { line: 'setStreak(prev => prev + 1);', explanation: 'Functional state update ensuring accuracy even when multiple updates occur.' },
          { line: 'disabled={completedToday}', explanation: 'Disables button to prevent multiple increments on the same day.' }
        ],
        expectedOutput: `Interactive React component displaying flame streak counter and actionable completion button.`,
        tipsAndTricks: [
          'Never mutate state directly (`streak = 5`); always use the setter function `setStreak(5)`.',
          'Keep components small and focused on a single responsibility.'
        ],
        commonMistakes: [
          'Setting state directly in the component body, triggering an infinite render loop.',
          'Missing keys when rendering arrays of items in JSX (`<li key={item.id}>`).'
        ],
        practiceQuestions: [
          'Build a controlled input component in React with live character counter.',
          'Explain why React requires unique `key` props when mapping lists.'
        ],
        miniTask: 'Build an interactive Todo item component that toggles between edit mode and view mode.',
        quiz: [
          {
            id: 'fe-q1',
            question: 'What is the purpose of the dependency array in useEffect?',
            options: ['To speed up downloads', 'To control when the effect re-runs based on value changes', 'To hide errors', 'To render HTML'],
            correctAnswer: 1,
            explanation: 'The dependency array instructs React to only re-run the effect if specified values change between renders.'
          }
        ]
      }
    ]
  },
  {
    id: 'backend-dev',
    title: 'Backend Development (Node.js & Express)',
    category: 'Web Development',
    tagline: 'REST APIs, Middleware, JWT Authentication, Microservices & Databases',
    description: 'Build secure, scalable backend services. Create RESTful APIs using Node.js and Express, handle request routing, validation, password hashing, JWT sessions, and database integration.',
    iconName: 'Server',
    badgeColor: 'emerald',
    topicsCount: 14,
    level: 'All Levels',
    lessons: [
      {
        id: 'backend-express-rest',
        courseId: 'backend-dev',
        title: '1. Express Architecture, REST Endpoints & Middleware',
        level: 'Beginner',
        durationMinutes: 20,
        explanation: 'Backend applications serve as the brain of software systems. Express provides an unopinionated routing layer and middleware pipeline for handling HTTP requests, authentication, and database transactions.',
        teluguHint: 'బ్యాకెండ్ అంటే వెబ్‌సైట్ వెనుక ఉండే అసలైన మెదడు. యూజర్ లాగిన్, డేటాబేస్ సేవింగ్, పేమెంట్లు అన్నీ బ్యాకెండ్ సర్వర్ ద్వారా సురక్షితంగా జరుగుతాయి.',
        syntax: 'app.get("/api/data", (req, res) => res.json({ ... }));\napp.use((req, res, next) => next());',
        code: `import express from 'express';

const app = express();
app.use(express.json()); // Built-in JSON parser middleware

// Custom logging middleware
app.use((req, res, next) => {
  console.log(\`[\${new Date().toISOString()}] \${req.method} \${req.url}\`);
  next(); // Pass control to next handler
});

// Mock database
const courses = [
  { id: "py", title: "Python Masterclass", free: true },
  { id: "dsa", title: "DSA for Interviews", free: true }
];

// REST Endpoints
app.get('/api/courses', (req, res) => {
  res.status(200).json({ success: true, count: courses.length, data: courses });
});

app.post('/api/courses', (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  const newCourse = { id: \`c-\${Date.now()}\`, title, free: true };
  courses.push(newCourse);
  res.status(201).json({ success: true, data: newCourse });
});`,
        codeExplanation: [
          { line: 'app.use(express.json())', explanation: 'Parses incoming request bodies containing JSON payload and populates `req.body`.' },
          { line: 'app.use((req, res, next) => { ... next(); })', explanation: 'Middleware function executing before route handlers; `next()` forwards the request.' },
          { line: 'res.status(200).json(...)', explanation: 'Returns appropriate HTTP status codes (200 OK, 201 Created, 400 Bad Request, 500 Error).' }
        ],
        expectedOutput: `Server handles GET /api/courses and POST /api/courses with clean JSON responses and HTTP status codes.`,
        tipsAndTricks: [
          'Always return after sending an error response (`return res.status(400)...`) to prevent "Headers already sent" errors.',
          'Use environment variables (`process.env.PORT`) for configuration, never hardcode database credentials.'
        ],
        commonMistakes: [
          'Forgetting `next()` in middleware, which leaves client requests hanging indefinitely.',
          'Not validating user inputs before database writes, risking security vulnerabilities.'
        ],
        practiceQuestions: [
          'What is the difference between PUT and PATCH HTTP methods?',
          'How do you handle global errors in Express using error-handling middleware (`(err, req, res, next)`)?'
        ],
        miniTask: 'Write an Express route that accepts user registration, hashes passwords using bcrypt, and rejects duplicate emails.',
        quiz: [
          {
            id: 'be-q1',
            question: 'What HTTP status code represents a successfully created resource?',
            options: ['200 OK', '201 Created', '204 No Content', '302 Found'],
            correctAnswer: 1,
            explanation: 'HTTP 201 Created is the standard response for successful POST operations that generate new resources.'
          }
        ]
      }
    ]
  }
];
