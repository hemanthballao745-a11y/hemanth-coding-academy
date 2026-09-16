export interface DsaTopic {
  id: string;
  title: string;
  category: string;
  timeComplexity: string;
  spaceComplexity: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  teluguExplanation?: string;
  teluguHint?: string;
  realWorldAnalogy: string;
  keyConcepts: string[];
  pythonCode: string;
  lineByLineExplanation: {
    line: string;
    explanation: string;
  }[];
  commonInterviewQuestions: string[];
  tipsAndTricks: string[];
}

export const DSA_TOPICS: DsaTopic[] = [
  {
    id: 'arrays',
    title: 'Arrays & Two-Pointer Technique',
    category: 'Linear Structures',
    timeComplexity: 'Access: O(1), Search: O(N), Insert/Delete: O(N)',
    spaceComplexity: 'O(N)',
    difficulty: 'Easy',
    description: 'An Array is a contiguous block of memory storing elements of the same type. Two-Pointer technique uses two references traversing the array from opposite or same ends to solve problems in O(N) time instead of O(N^2).',
    teluguExplanation: 'అర్రే (Array) అనేది వరుసగా ఒకదాని పక్కన ఒకటి మెమొరీలో నిల్వ ఉండే డేటా నిర్మాణం. టూ-పాయింటర్స్ పద్ధతి ద్వారా అర్రేని రెండు వైపుల నుండి స్కాన్ చేసి వేగంగా ప్రశ్నలు సాధించవచ్చు.',
    realWorldAnalogy: 'A row of numbered locker compartments side-by-side in a bank.',
    keyConcepts: [
      'Contiguous memory allocation ensures O(1) random access by index.',
      'Two-pointer approach (Left & Right, or Slow & Fast).',
      'Prefix sums for range queries in O(1).'
    ],
    pythonCode: `# Two-Sum problem in sorted array using Two Pointers
def two_sum_sorted(nums, target):
    left = 0
    right = len(nums) - 1
    
    while left < right:
        current_sum = nums[left] + nums[right]
        if current_sum == target:
            return [left, right] # Found target pair
        elif current_sum < target:
            left += 1  # Need larger sum, advance left pointer
        else:
            right -= 1 # Need smaller sum, decrement right pointer
            
    return [] # No pair found

numbers = [2, 7, 11, 15, 20]
target = 18
result = two_sum_sorted(numbers, target)
print(f"Indices for target {target}: {result} -> Values: {numbers[result[0]]} + {numbers[result[1]]}")`,
    lineByLineExplanation: [
      { line: 'left = 0; right = len(nums) - 1', explanation: 'Initialize two pointers: `left` at the start (smallest value) and `right` at the end (largest value).' },
      { line: 'while left < right:', explanation: 'Continue searching while the two pointers do not cross or meet.' },
      { line: 'current_sum = nums[left] + nums[right]', explanation: 'Calculate the sum of the currently pointed pair in O(1) time.' },
      { line: 'elif current_sum < target: left += 1', explanation: 'Since the array is sorted, incrementing `left` is guaranteed to increase the sum.' },
      { line: 'else: right -= 1', explanation: 'Decrementing `right` is guaranteed to decrease the sum toward the target.' }
    ],
    commonInterviewQuestions: [
      'Two Sum (LeetCode #1)',
      'Best Time to Buy and Sell Stock',
      'Container With Most Water',
      '3Sum / 4Sum'
    ],
    tipsAndTricks: [
      'If the array is unsorted, consider using a HashSet to achieve O(N) time and O(N) space.',
      'Watch out for integer overflow when computing `(left + right) // 2` in typed languages (use `left + (right - left) // 2`).'
    ]
  },
  {
    id: 'strings',
    title: 'Strings & Sliding Window',
    category: 'Linear Structures',
    timeComplexity: 'Scan: O(N), Substring checks: O(N)',
    spaceComplexity: 'O(1) to O(K) where K is unique character set',
    difficulty: 'Medium',
    description: 'Strings are sequences of characters. The Sliding Window technique maintains a dynamic window [L, R] over a string to find optimal contiguous substrings (longest, shortest, or with specific counts).',
    teluguExplanation: 'స్ట్రింగ్స్ (Strings) అంటే అక్షరాల సముదాయం. స్లైడింగ్ విండో (Sliding Window) ద్వారా అతి తక్కువ లేదా ఎక్కువ పొడవున్న ఉప-స్ట్రింగ్స్‌ను O(N) సమయంలో కనుగొనవచ్చు.',
    realWorldAnalogy: 'A sliding magnifying glass moving over a sentence word by word.',
    keyConcepts: [
      'Strings are immutable in Python and Java (modifications create new strings).',
      'Sliding Window expansion and contraction pattern.',
      'Frequency arrays or hash maps for character counts.'
    ],
    pythonCode: `# Longest Substring Without Repeating Characters
def length_of_longest_substring(s: str) -> int:
    char_index_map = {}
    max_len = 0
    left = 0

    for right in range(len(s)):
        current_char = s[right]
        # If character is already seen and inside current window, jump left pointer
        if current_char in char_index_map and char_index_map[current_char] >= left:
            left = char_index_map[current_char] + 1
        
        char_index_map[current_char] = right
        current_window_len = right - left + 1
        max_len = max(max_len, current_window_len)

    return max_len

test_str = "abcabcbb"
print("Length of longest unique substring:", length_of_longest_substring(test_str))`,
    lineByLineExplanation: [
      { line: 'char_index_map = {}', explanation: 'Stores the most recent index where each character appeared.' },
      { line: 'if current_char in char_index_map and char_index_map[current_char] >= left:', explanation: 'Checks if we found a duplicate within our active sliding window.' },
      { line: 'left = char_index_map[current_char] + 1', explanation: 'Shrinks the window by jumping the left boundary just past the previous occurrence.' },
      { line: 'max_len = max(max_len, right - left + 1)', explanation: 'Updates the global maximum length found so far.' }
    ],
    commonInterviewQuestions: [
      'Longest Substring Without Repeating Characters (LeetCode #3)',
      'Minimum Window Substring (LeetCode #76)',
      'Valid Anagram & Group Anagrams'
    ],
    tipsAndTricks: [
      'ASCII strings have at most 128 or 256 unique characters, so the hash map size is bounded by O(1) space!',
      'When building strings in loops, append to a list and use `" ".join(list)` to avoid O(N^2) memory reallocations.'
    ]
  },
  {
    id: 'linked-lists',
    title: 'Linked Lists (Singly, Doubly, Fast & Slow Pointers)',
    category: 'Linear Structures',
    timeComplexity: 'Access: O(N), Insertion at head: O(1)',
    spaceComplexity: 'O(N)',
    difficulty: 'Medium',
    description: 'Linked Lists store nodes connected via pointers. The Fast & Slow Pointer (Floyd’s Cycle Finding) technique detects cycles and locates midpoints in a single pass without extra memory.',
    teluguExplanation: 'లింక్డ్ లిస్ట్ అనేది పాయింటర్లతో కలిపిన నోడ్స్ సముదాయం. ఫాస్ట్ & స్లో పాయింటర్స్ పద్ధతి ద్వారా లూప్స్ ఉన్నాయా అని O(1) మెమొరీలో సులభంగా కనుక్కోవచ్చు.',
    realWorldAnalogy: 'A scavenger hunt where each clue holds the location of the next clue.',
    keyConcepts: [
      'Nodes with data and `next` pointer.',
      'Cycle detection via Floyd\'s Tortoise and Hare algorithm.',
      'Dummy head technique for cleaner pointer updates.'
    ],
    pythonCode: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# Detect Cycle in Linked List
def has_cycle(head: ListNode) -> bool:
    slow = head
    fast = head

    while fast and fast.next:
        slow = slow.next          # Slow moves 1 step
        fast = fast.next.next     # Fast moves 2 steps
        
        if slow == fast:
            return True # Met inside loop!

    return False # Reached end of list -> No cycle

# Setup list with a cycle: 1 -> 2 -> 3 -> back to 2
n1 = ListNode(1)
n2 = ListNode(2)
n3 = ListNode(3)
n1.next = n2
n2.next = n3
n3.next = n2 # Creates cycle

print("Cycle detected?", has_cycle(n1))`,
    lineByLineExplanation: [
      { line: 'slow = head; fast = head', explanation: 'Both pointers start at the head of the list.' },
      { line: 'while fast and fast.next:', explanation: 'Ensures fast pointer can safely jump two steps without encountering None.' },
      { line: 'slow = slow.next; fast = fast.next.next', explanation: 'The difference in speed reduces the relative distance by 1 step each iteration inside a cycle.' },
      { line: 'if slow == fast: return True', explanation: 'If pointers intersect, a mathematical loop is proven to exist.' }
    ],
    commonInterviewQuestions: [
      'Reverse Linked List (LeetCode #206)',
      'Linked List Cycle I & II (LeetCode #141, #142)',
      'Merge Two Sorted Lists (LeetCode #21)'
    ],
    tipsAndTricks: [
      'Always consider the edge cases: `head == None` or list of length 1.',
      'To find the middle of a list, when fast reaches the end, slow will be at the exact middle!'
    ]
  },
  {
    id: 'stack-queue',
    title: 'Stack (LIFO) & Queue (FIFO) & Monotonic Stack',
    category: 'Linear Structures',
    timeComplexity: 'Push/Pop/Enqueue/Dequeue: O(1)',
    spaceComplexity: 'O(N)',
    difficulty: 'Medium',
    description: 'Stacks operate on Last-In-First-Out (LIFO) and Queues operate on First-In-First-Out (FIFO). Monotonic Stacks keep elements in strictly increasing or decreasing order to solve Next Greater Element in O(N).',
    teluguExplanation: 'స్టాక్ అంటే ప్లేట్ల దొంతర లాంటిది (చివరగా పెట్టింది మొదటగా తీయడం). క్యూ అంటే టికెట్ లైన్ లాంటిది (మొదట వచ్చిన వారు మొదట సేవ పొందడం).',
    realWorldAnalogy: 'Stack: A stack of cafeteria trays. Queue: Customers waiting in line at an ATM.',
    keyConcepts: [
      'Stack LIFO: `push`, `pop`, `peek`. Useful for backtracking and syntax parsing.',
      'Queue FIFO: `enqueue`, `dequeue`. Foundation for Breadth-First Search (BFS).',
      'Monotonic stack for nearest greater or smaller elements.'
    ],
    pythonCode: `# Valid Parentheses checker using Stack
def is_valid_parentheses(s: str) -> bool:
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}

    for char in s:
        if char in mapping:
            # Pop topmost element or dummy value if empty
            top_element = stack.pop() if stack else '#'
            if mapping[char] != top_element:
                return False
        else:
            # Opening bracket: push to stack
            stack.append(char)

    return len(stack) == 0

print("Is '()[]{}' valid?", is_valid_parentheses("()[]{}"))
print("Is '([)]' valid?", is_valid_parentheses("([)]"))`,
    lineByLineExplanation: [
      { line: 'stack = []', explanation: 'Initializes an empty stack using Python\'s dynamic list.' },
      { line: 'if char in mapping:', explanation: 'Detects closing brackets to check against corresponding opening brackets.' },
      { line: 'top_element = stack.pop() if stack else "#"', explanation: 'Safely extracts the top bracket or uses a sentinel character if stack is empty.' },
      { line: 'return len(stack) == 0', explanation: 'Returns True only if all opened brackets were properly matched and closed.' }
    ],
    commonInterviewQuestions: [
      'Valid Parentheses (LeetCode #20)',
      'Daily Temperatures (Monotonic Stack)',
      'Implement Queue using Stacks'
    ],
    tipsAndTricks: [
      'In Python, use `collections.deque` for queues because list `.pop(0)` is slow O(N), whereas deque `.popleft()` is O(1).',
      'Monotonic stack gives O(N) total time for Next Greater Element because each item is pushed and popped at most once.'
    ]
  },
  {
    id: 'hashing',
    title: 'Hashing, Hash Tables & Hash Sets',
    category: 'Associative Structures',
    timeComplexity: 'Average: Insert/Delete/Search: O(1), Worst case: O(N)',
    spaceComplexity: 'O(N)',
    difficulty: 'Easy',
    description: 'Hashing maps keys to array buckets via a mathematical hash function. It provides lightning-fast constant time O(1) lookups, deduplication, and frequency maps.',
    teluguHint: 'హ్యాషింగ్ (Hashing) ద్వారా ఎంత పెద్ద డేటా ఉన్నప్పటికీ క్షణాల్లో O(1) సమయంలో ఏదైనా విలువను వెతకవచ్చు. డిక్షనరీలు, సెట్లు దీనిపై ఆధారపడి ఉంటాయి.',
    realWorldAnalogy: 'A library where every book has a call number calculated directly from its title for instant shelf access.',
    keyConcepts: [
      'Hash functions and collision resolution (Chaining vs Open Addressing).',
      'Load factor and dynamic rehashing.',
      'Two-Sum in O(N) using Hash Map.'
    ],
    pythonCode: `# Two-Sum in O(N) time using Hash Map
def two_sum_hashmap(nums, target):
    seen = {} # value -> index
    for index, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], index]
        seen[num] = index
    return []

nums = [3, 2, 4]
target = 6
print("Two sum indices:", two_sum_hashmap(nums, target))`,
    lineByLineExplanation: [
      { line: 'seen = {}', explanation: 'Hash map storing previously visited numbers and their indices.' },
      { line: 'complement = target - num', explanation: 'Calculates the needed counterpart value to hit the target sum.' },
      { line: 'if complement in seen:', explanation: 'Checks hash map in O(1) average time.' }
    ],
    commonInterviewQuestions: [
      'Two Sum (LeetCode #1)',
      'Subarray Sum Equals K (Prefix sum + Hash Map)',
      'Longest Consecutive Sequence (HashSet)'
    ],
    tipsAndTricks: [
      'Python dictionaries and sets use Robin Hood / open addressing hash tables and are extremely optimized.',
      'Remember custom objects must implement both `__hash__` and `__eq__` to be used as hash keys.'
    ]
  },
  {
    id: 'trees-bst',
    title: 'Binary Trees & Binary Search Trees (BST)',
    category: 'Hierarchical Structures',
    timeComplexity: 'BST Search/Insert: O(log N) average, O(N) worst',
    spaceComplexity: 'O(H) where H is tree height',
    difficulty: 'Medium',
    description: 'Trees are non-linear hierarchical data structures. A Binary Search Tree (BST) maintains the property that for every node, all values in its left subtree are smaller, and all values in its right subtree are greater.',
    teluguHint: 'బైనరీ ట్రీ (Binary Tree) లో ప్రతి నోడ్‌కు గరిష్టంగా రెండు పిల్లలు (లెఫ్ట్ & రైట్) ఉంటాయి. BST లో ఎడమ వైపు చిన్న విలువలు, కుడి వైపు పెద్ద విలువలు ఉంటాయి.',
    realWorldAnalogy: 'A company organizational chart or a computer filesystem directory structure.',
    keyConcepts: [
      'Tree Traversals: In-order (Left, Root, Right), Pre-order, Post-order, Level-order (BFS).',
      'In-order traversal of a BST yields elements in strictly sorted order!',
      'Tree Height and Balanced BSTs (AVL, Red-Black Trees).'
    ],
    pythonCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# Search in a Binary Search Tree
def search_bst(root: TreeNode, val: int) -> TreeNode:
    curr = root
    while curr:
        if curr.val == val:
            return curr
        elif val < curr.val:
            curr = curr.left  # Go to left subtree
        else:
            curr = curr.right # Go to right subtree
    return None

# Max Depth of Binary Tree (DFS)
def max_depth(root: TreeNode) -> int:
    if not root:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))

# Construct tree: 4 -> left: 2, right: 7
tree = TreeNode(4, TreeNode(2), TreeNode(7))
print("Max Depth:", max_depth(tree))
found_node = search_bst(tree, 7)
print("Found value 7?", found_node is not None)`,
    lineByLineExplanation: [
      { line: 'class TreeNode: ...', explanation: 'Blueprint holding value and pointers to left and right child nodes.' },
      { line: 'if not root: return 0', explanation: 'Base case of recursion: an empty tree has height 0.' },
      { line: 'return 1 + max(...)', explanation: 'Computes height recursively by taking the maximum height between children and adding 1 for the root.' }
    ],
    commonInterviewQuestions: [
      'Maximum Depth of Binary Tree (LeetCode #104)',
      'Invert Binary Tree (LeetCode #226)',
      'Validate Binary Search Tree (LeetCode #98)',
      'Lowest Common Ancestor in BST'
    ],
    tipsAndTricks: [
      'Almost every tree question can be solved via recursion (DFS) or iteration with a queue (BFS).',
      'If you need level-by-level processing, always use BFS with `collections.deque`.'
    ]
  },
  {
    id: 'graphs',
    title: 'Graphs (BFS, DFS, Dijkstra & Topological Sort)',
    category: 'Non-Linear Structures',
    timeComplexity: 'BFS/DFS: O(V + E)',
    spaceComplexity: 'O(V)',
    difficulty: 'Hard',
    description: 'Graphs model pairwise relationships between objects (vertices) connected by edges. Graph algorithms power social networks, navigation maps (GPS), package dependencies, and network routing.',
    teluguHint: 'గ్రాఫ్స్ (Graphs) అంటే వ్యక్తులు, నగరాలు లేదా వెబ్‌సైట్ల మధ్య సంబంధాలను సూచించే నెట్‌వర్క్. గూగుల్ మ్యాప్స్ దారిని కనుక్కోవడానికి ఇవే వాడతారు.',
    realWorldAnalogy: 'Airline flight routes connecting airports across world cities.',
    keyConcepts: [
      'Adjacency List vs Adjacency Matrix representation.',
      'Breadth-First Search (BFS) for shortest path in unweighted graphs.',
      'Depth-First Search (DFS) for connected components and cycle detection.',
      'Dijkstra\'s algorithm for shortest path in weighted graphs.'
    ],
    pythonCode: `from collections import deque

# BFS on an unweighted Graph to find shortest distance
def shortest_path_bfs(graph, start, target):
    visited = {start}
    queue = deque([(start, 0)]) # (node, distance)

    while queue:
        current_node, distance = queue.popleft()
        if current_node == target:
            return distance
        
        for neighbor in graph.get(current_node, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, distance + 1))

    return -1 # Target unreachable

# Adjacency list representation
network = {
    'Hyderabad': ['Bangalore', 'Chennai'],
    'Bangalore': ['Hyderabad', 'Mumbai', 'Kochi'],
    'Chennai': ['Hyderabad', 'Kochi'],
    'Mumbai': ['Bangalore', 'Delhi'],
    'Kochi': ['Bangalore', 'Chennai'],
    'Delhi': ['Mumbai']
}

print("Shortest hops from Hyderabad to Delhi:", shortest_path_bfs(network, 'Hyderabad', 'Delhi'))`,
    lineByLineExplanation: [
      { line: 'visited = {start}', explanation: 'Set tracking visited vertices to avoid infinite loops and cycles.' },
      { line: 'queue = deque([(start, 0)])', explanation: 'FIFO queue maintaining nodes and their distance from the start.' },
      { line: 'current_node, distance = queue.popleft()', explanation: 'Extracts the earliest unvisited node at the current level.' }
    ],
    commonInterviewQuestions: [
      'Number of Islands (LeetCode #200)',
      'Course Schedule (Topological Sort / Cycle Detection)',
      'Clone Graph',
      'Word Ladder (Bidirectional BFS)'
    ],
    tipsAndTricks: [
      'Use BFS when looking for the shortest path in an unweighted graph.',
      'Topological sort is only possible on Directed Acyclic Graphs (DAG).'
    ]
  },
  {
    id: 'recursion-backtracking',
    title: 'Recursion & Backtracking (Subsets, N-Queens)',
    category: 'Algorithmic Paradigms',
    timeComplexity: 'Exponential: O(2^N) or O(N!)',
    spaceComplexity: 'O(N) recursion call stack',
    difficulty: 'Hard',
    description: 'Recursion solves a problem by having a function call itself on smaller subproblems with an essential Base Case. Backtracking explores all candidates systematically and abandons a path ("backtracks") as soon as it violates constraints.',
    teluguHint: 'రీకర్షన్ అంటే ఒక ఫంక్షన్ తనను తానే మళ్లీ పిలుచుకోవడం (బేస్ కండిషన్ తప్పనిసరి). బ్యాక్‌ట్రాకింగ్ అంటే ఒక దారిలో వెళ్లి తప్పు అని తెలిసినప్పుడు వెనక్కి వచ్చి వేరే దారిని వెతకడం.',
    realWorldAnalogy: 'Navigating a physical maze: when you hit a dead-end wall, you retrace your steps back to the last crossroads and try the other corridor.',
    keyConcepts: [
      'Base Case: When to stop recursion to prevent Stack Overflow.',
      'Choice, Constraints, Goal mental model.',
      'Subsets, Permutations, Combinations.'
    ],
    pythonCode: `# Generate all Subsets (Power Set) using Backtracking
def generate_subsets(nums):
    result = []
    
    def backtrack(start_index, current_subset):
        result.append(list(current_subset)) # Save copy of current subset
        
        for i in range(start_index, len(nums)):
            current_subset.append(nums[i])      # 1. Make choice
            backtrack(i + 1, current_subset)   # 2. Recurse forward
            current_subset.pop()               # 3. Undo choice (backtrack)

    backtrack(0, [])
    return result

nums = [1, 2, 3]
subsets = generate_subsets(nums)
print(f"Total subsets of {nums}: {len(subsets)}")
print("Subsets:", subsets)`,
    lineByLineExplanation: [
      { line: 'result.append(list(current_subset))', explanation: 'Records the current configuration into results before exploring deeper.' },
      { line: 'current_subset.append(nums[i])', explanation: 'Choose: include element nums[i] in the active subset.' },
      { line: 'backtrack(i + 1, current_subset)', explanation: 'Explore: recurse to process subsequent elements.' },
      { line: 'current_subset.pop()', explanation: 'Unchoose: remove element to restore state for other candidates (Backtrack).' }
    ],
    commonInterviewQuestions: [
      'Subsets & Subsets II (LeetCode #78, #90)',
      'Permutations (LeetCode #46)',
      'N-Queens Problem',
      'Sudoku Solver'
    ],
    tipsAndTricks: [
      'Always append a copy `list(curr)` or `curr[:]` because `curr` is mutated in place.',
      'Every recursive function must have at least one base case where no further recursive call is made.'
    ]
  },
  {
    id: 'sorting-searching',
    title: 'Sorting (Merge Sort, Quick Sort) & Binary Search',
    category: 'Algorithms',
    timeComplexity: 'Binary Search: O(log N), Merge/Quick Sort: O(N log N)',
    spaceComplexity: 'Merge Sort: O(N), Binary Search: O(1)',
    difficulty: 'Medium',
    description: 'Sorting organizes data in specified order, unlocking logarithmic searching. Binary Search divides search space in half each step, finding targets in O(log N) time.',
    teluguHint: 'బైనరీ సెర్చ్ (Binary Search) ద్వారా కోటి రికార్డులు ఉన్నా కేవలం 24 స్టెప్స్‌లో కావలసిన దానిని కనుక్కోవచ్చు!',
    realWorldAnalogy: 'Opening a dictionary directly in the middle to look for a word starting with "M".',
    keyConcepts: [
      'Divide and Conquer paradigm.',
      'Merge Sort (Stable, O(N log N) worst-case) vs Quick Sort (In-place, O(N log N) average).',
      'Binary Search on Answer pattern (monotonic functions).'
    ],
    pythonCode: `# Classic Binary Search & Merge Sort
def binary_search(arr, target):
    low = 0
    high = len(arr) - 1

    while low <= high:
        mid = low + (high - low) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1  # Target is in right half
        else:
            high = mid - 1 # Target is in left half

    return -1 # Not found

sorted_scores = [12, 24, 38, 49, 56, 72, 88, 95]
target = 72
idx = binary_search(sorted_scores, target)
print(f"Target {target} located at index: {idx}")`,
    lineByLineExplanation: [
      { line: 'mid = low + (high - low) // 2', explanation: 'Calculates midpoint safely to prevent integer overflow.' },
      { line: 'if arr[mid] == target: return mid', explanation: 'Target matched in O(1) checks.' },
      { line: 'elif arr[mid] < target: low = mid + 1', explanation: 'Discards entire left half of the array.' }
    ],
    commonInterviewQuestions: [
      'Binary Search (LeetCode #704)',
      'Search in Rotated Sorted Array (LeetCode #33)',
      'Find First and Last Position of Element',
      'Koko Eating Bananas (Binary Search on Answer)'
    ],
    tipsAndTricks: [
      'Binary Search doesn\'t just work on sorted arrays—it works on any condition that is monotonic (True, True, False, False...).',
      'Pay close attention to `low <= high` vs `low < high` to prevent infinite loops.'
    ]
  },
  {
    id: 'dynamic-programming',
    title: 'Dynamic Programming (Memoization & Tabulation)',
    category: 'Algorithms',
    timeComplexity: 'Reduces O(2^N) exponential down to O(N) or O(N*W) polynomial',
    spaceComplexity: 'O(N) state table',
    difficulty: 'Hard',
    description: 'Dynamic Programming (DP) solves complex problems by breaking them down into simpler overlapping subproblems, solving each subproblem once, and storing the results (Memoization or Tabulation).',
    teluguHint: 'డైనమిక్ ప్రోగ్రామింగ్ (DP) అంటే ఒకసారి చేసిన లెక్కను మళ్లీ చేయకుండా మెమొరీలో గుర్తుంచుకోవడం (Smart Caching). ఇది అత్యంత క్లిష్టమైన సమస్యలను కూడా వేగంగా పరిష్కరిస్తుంది.',
    realWorldAnalogy: 'Writing down 1 + 1 + 1 + 1 on a board. How many? 4. Add another "+ 1". How many? You immediately say 5 because you remembered the previous 4 without recounting.',
    keyConcepts: [
      'Optimal Substructure: Solution to problem contains solutions to subproblems.',
      'Overlapping Subproblems: Same subproblems evaluated repeatedly.',
      'Top-down (Recursion + Memoization) vs Bottom-up (Tabulation).'
    ],
    pythonCode: `# 0/1 Knapsack Problem using Dynamic Programming (Bottom-Up)
def knapsack(weights, values, capacity):
    n = len(weights)
    # dp[i][w] stores maximum value with first i items and weight limit w
    dp = [[0 for _ in range(capacity + 1)] for _ in range(n + 1)]

    for i in range(1, n + 1):
        for w in range(1, capacity + 1):
            # Option 1: Exclude item i
            dp[i][w] = dp[i - 1][w]
            # Option 2: Include item i if weight fits
            if weights[i - 1] <= w:
                include_val = values[i - 1] + dp[i - 1][w - weights[i - 1]]
                dp[i][w] = max(dp[i][w], include_val)

    return dp[n][capacity]

weights = [2, 3, 4, 5]
values = [3, 4, 5, 6]
capacity = 8
print("Maximum loot value in Knapsack:", knapsack(weights, values, capacity))`,
    lineByLineExplanation: [
      { line: 'dp = [[0 ...]]', explanation: 'Initializes DP grid where rows represent items and columns represent capacities.' },
      { line: 'dp[i][w] = dp[i - 1][w]', explanation: 'Carries over best result achievable without including current item.' },
      { line: 'include_val = values[i - 1] + dp[i - 1][w - weights[i - 1]]', explanation: 'Adds item value to optimal subproblem result with remaining capacity.' },
      { line: 'return dp[n][capacity]', explanation: 'Bottom-right cell contains the global optimal answer.' }
    ],
    commonInterviewQuestions: [
      'Climbing Stairs (LeetCode #70)',
      'Coin Change (LeetCode #322)',
      'Longest Common Subsequence (LCS)',
      '0/1 Knapsack & Subset Sum'
    ],
    tipsAndTricks: [
      'Identify the DP state: what variables uniquely identify a subproblem?',
      'Space optimization: If dp[i] only depends on dp[i-1], reduce 2D table to two 1D arrays!'
    ]
  },
  {
    id: 'greedy-algorithms',
    title: 'Greedy Algorithms (Intervals, Huffman & MST)',
    category: 'Algorithms',
    timeComplexity: 'Typically O(N log N) due to sorting',
    spaceComplexity: 'O(1) to O(N)',
    difficulty: 'Medium',
    description: 'Greedy algorithms make the locally optimal choice at each stage with the hope of finding a global optimum. They are fast, intuitive, and excel in interval scheduling, minimum spanning trees, and graph traversal.',
    teluguHint: 'గ్రీడీ ఆల్గారిథమ్స్ ప్రతి అడుగులో ప్రస్తుతం ఏది ఉత్తమమో ఆ నిర్ణయం తీసుకుంటాయి. ఇంటర్వెల్ షెడ్యూలింగ్ వంటి సమస్యలను ఇవి సులభంగా పరిష్కరిస్తాయి.',
    realWorldAnalogy: 'Making change for money by choosing the largest denomination coins first.',
    keyConcepts: [
      'Greedy Choice Property: Local choices lead to global optimum.',
      'Interval scheduling: Sort by end time.',
      'Kruskal\'s and Prim\'s algorithms for Minimum Spanning Trees.'
    ],
    pythonCode: `# Non-overlapping Intervals / Meeting Rooms
def erase_overlap_intervals(intervals):
    if not intervals:
        return 0
        
    # Sort intervals by their end times (Greedy choice)
    intervals.sort(key=lambda x: x[1])
    
    non_overlapping_count = 1
    last_end = intervals[0][1]

    for i in range(1, len(intervals)):
        start, end = intervals[i]
        if start >= last_end:
            # Compatible meeting found!
            non_overlapping_count += 1
            last_end = end

    return len(intervals) - non_overlapping_count

meetings = [[1, 2], [2, 3], [3, 4], [1, 3]]
removals_needed = erase_overlap_intervals(meetings)
print("Minimum removals to make meetings conflict-free:", removals_needed)`,
    lineByLineExplanation: [
      { line: 'intervals.sort(key=lambda x: x[1])', explanation: 'Sorting by finish time frees up the room as early as possible for subsequent meetings.' },
      { line: 'if start >= last_end:', explanation: 'Meeting starts after or when previous meeting ends, meaning no conflict.' },
      { line: 'return len(intervals) - non_overlapping_count', explanation: 'Total intervals minus maximum compatible intervals gives minimum deletions.' }
    ],
    commonInterviewQuestions: [
      'Non-overlapping Intervals (LeetCode #435)',
      'Jump Game I & II (LeetCode #55, #45)',
      'Gas Station (LeetCode #134)'
    ],
    tipsAndTricks: [
      'Always sort the input data first when designing a greedy strategy.',
      'Prove that the greedy choice never closes the door to an optimal solution.'
    ]
  }
];
