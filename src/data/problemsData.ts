import { CodingProblem } from '../types';

export const CODING_PROBLEMS: CodingProblem[] = [
  {
    id: 'prob-two-sum-py',
    title: '1. Two Sum Target Finder',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    description: 'Given an array of integers `nums` and an integer `target`, write a Python function `two_sum(nums, target)` that returns the indices of the two numbers such that they add up to `target`. Assume exactly one solution exists.',
    inputFormat: 'nums: List[int], target: int',
    outputFormat: 'List[int] containing two 0-based indices',
    sampleInput: 'nums = [2, 7, 11, 15], target = 9',
    sampleOutput: '[0, 1]',
    starterCode: `def two_sum(nums, target):
    # Write your solution here
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

# Test your function:
test_nums = [2, 7, 11, 15]
test_target = 9
print("Result:", two_sum(test_nums, test_target))`,
    solutionCode: `def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i
    return []`,
    testCases: [
      { input: '[2, 7, 11, 15], target=9', expectedOutput: '[0, 1]' },
      { input: '[3, 2, 4], target=6', expectedOutput: '[1, 2]' },
      { input: '[3, 3], target=6', expectedOutput: '[0, 1]' }
    ],
    explanation: 'By storing elements in a hash map as we iterate, we can check if the complement (target - num) exists in O(1) time, yielding an overall O(N) time and O(N) space complexity.'
  },
  {
    id: 'prob-reverse-string',
    title: '2. Palindrome Check & String Reversal',
    difficulty: 'Easy',
    category: 'Strings',
    description: 'Write a Python function `is_palindrome(s)` that determines if a given string reads the same forwards and backwards after ignoring non-alphanumeric characters and case.',
    sampleInput: 's = "A man, a plan, a canal: Panama"',
    sampleOutput: 'True',
    starterCode: `def is_palindrome(s: str) -> bool:
    # 1. Clean the string (only lowercase alphanumeric)
    cleaned = [c.lower() for c in s if c.isalnum()]
    # 2. Check two pointers or slice comparison
    return cleaned == cleaned[::-1]

print("Test 1:", is_palindrome("A man, a plan, a canal: Panama"))
print("Test 2:", is_palindrome("race a car"))`,
    solutionCode: `def is_palindrome(s: str) -> bool:
    cleaned = [c.lower() for c in s if c.isalnum()]
    return cleaned == cleaned[::-1]`,
    testCases: [
      { input: '"A man, a plan, a canal: Panama"', expectedOutput: 'True' },
      { input: '"race a car"', expectedOutput: 'False' },
      { input: '" "', expectedOutput: 'True' }
    ],
    explanation: 'Filtering non-alphanumeric characters leaves normalized tokens. Comparing with reversed sequence tests the palindrome property in O(N) time.'
  },
  {
    id: 'prob-max-subarray',
    title: '3. Maximum Subarray Sum (Kadane\'s Algorithm)',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    description: 'Given an integer array `nums`, find the subarray with the largest sum, and return its sum. (Famous interview question solved using Kadane\'s Algorithm in O(N)).',
    sampleInput: 'nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]',
    sampleOutput: '6  (Subarray [4, -1, 2, 1])',
    starterCode: `def max_sub_array(nums):
    current_sum = nums[0]
    max_sum = nums[0]

    for num in nums[1:]:
        # Decide: extend current subarray or start fresh from num
        current_sum = max(num, current_sum + num)
        max_sum = max(max_sum, current_sum)

    return max_sum

arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
print("Max Subarray Sum:", max_sub_array(arr))`,
    solutionCode: `def max_sub_array(nums):
    curr = max_sum = nums[0]
    for x in nums[1:]:
        curr = max(x, curr + x)
        max_sum = max(max_sum, curr)
    return max_sum`,
    testCases: [
      { input: '[-2, 1, -3, 4, -1, 2, 1, -5, 4]', expectedOutput: '6' },
      { input: '[1]', expectedOutput: '1' },
      { input: '[5, 4, -1, 7, 8]', expectedOutput: '23' }
    ],
    explanation: 'Kadane\'s algorithm maintains the maximum subarray ending at the current index in O(N) time and O(1) space.'
  },
  {
    id: 'prob-valid-parentheses',
    title: '4. Valid Parentheses Bracket Matcher',
    difficulty: 'Easy',
    category: 'Stack',
    description: 'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid (brackets must close in correct order and type).',
    sampleInput: 's = "{[()]}"',
    sampleOutput: 'True',
    starterCode: `def is_valid(s: str) -> bool:
    stack = []
    lookup = {')': '(', '}': '{', ']': '['}

    for char in s:
        if char in lookup:
            top = stack.pop() if stack else '#'
            if lookup[char] != top:
                return False
        else:
            stack.append(char)

    return len(stack) == 0

print("Result 1:", is_valid("{[()]}"))
print("Result 2:", is_valid("([)]"))`,
    solutionCode: `def is_valid(s: str) -> bool:
    stack = []
    pairs = {')': '(', '}': '{', ']': '['}
    for ch in s:
        if ch in pairs:
            if not stack or stack.pop() != pairs[ch]:
                return False
        else:
            stack.append(ch)
    return not stack`,
    testCases: [
      { input: '"{[()]}"', expectedOutput: 'True' },
      { input: '"([)]"', expectedOutput: 'False' },
      { input: '"()[]{}"', expectedOutput: 'True' }
    ],
    explanation: 'Push opening brackets to stack; for closing brackets, pop and verify type match. Empty stack at the end indicates validity in O(N) time and space.'
  },
  {
    id: 'prob-merge-intervals',
    title: '5. Merge Overlapping Intervals',
    difficulty: 'Hard',
    category: 'Greedy & Sorting',
    description: 'Given an array of intervals where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all intervals in the input.',
    sampleInput: 'intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]',
    sampleOutput: '[[1, 6], [8, 10], [15, 18]]',
    starterCode: `def merge_intervals(intervals):
    if not intervals:
        return []

    # Sort intervals by starting time
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]

    for current in intervals[1:]:
        prev = merged[-1]
        if current[0] <= prev[1]:
            # Overlap detected! Merge by taking maximum end time
            prev[1] = max(prev[1], current[1])
        else:
            merged.append(current)

    return merged

intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]
print("Merged Intervals:", merge_intervals(intervals))`,
    solutionCode: `def merge_intervals(intervals):
    intervals.sort(key=lambda x: x[0])
    res = []
    for interval in intervals:
        if not res or res[-1][1] < interval[0]:
            res.append(interval)
        else:
            res[-1][1] = max(res[-1][1], interval[1])
    return res`,
    testCases: [
      { input: '[[1, 3], [2, 6], [8, 10], [15, 18]]', expectedOutput: '[[1, 6], [8, 10], [15, 18]]' },
      { input: '[[1, 4], [4, 5]]', expectedOutput: '[[1, 5]]' }
    ],
    explanation: 'Sorting intervals by start time allows linear scan to merge overlapping segments in O(N log N) time.'
  }
];

export const DAILY_CHALLENGE: CodingProblem = {
  id: 'daily-challenge-current',
  title: '🔥 Daily Coding Challenge: Anagram Word Grouper',
  difficulty: 'Medium',
  category: 'Strings & Hash Map',
  description: 'Given an array of strings `strs`, group the anagrams together. You can return the answer in any order. (An Anagram is a word formed by rearranging the letters of a different word, typically using all original letters exactly once).',
  inputFormat: 'strs: List[str]',
  outputFormat: 'List[List[str]] containing grouped anagram words',
  sampleInput: 'strs = ["eat", "tea", "tan", "ate", "nat", "bat"]',
  sampleOutput: '[["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]',
  starterCode: `from collections import defaultdict

def group_anagrams(strs):
    # Key concept: Sorted tuple of characters serves as universal key
    anagram_groups = defaultdict(list)

    for word in strs:
        sorted_key = "".join(sorted(word))
        anagram_groups[sorted_key].append(word)

    return list(anagram_groups.values())

words = ["eat", "tea", "tan", "ate", "nat", "bat"]
result = group_anagrams(words)
print("Grouped Anagrams:")
for group in result:
    print(" ", group)`,
  solutionCode: `from collections import defaultdict

def group_anagrams(strs):
    mp = defaultdict(list)
    for s in strs:
        key = ''.join(sorted(s))
        mp[key].append(s)
    return list(mp.values())`,
  testCases: [
    { input: '["eat", "tea", "tan", "ate", "nat", "bat"]', expectedOutput: '3 groups' },
    { input: '[""]', expectedOutput: '[[""]]' },
    { input: '["a"]', expectedOutput: '[["a"]]' }
  ],
  explanation: 'Two words are anagrams if and only if their sorted character sequence is identical. By mapping the sorted key to word lists, we group in O(N * K log K) time.'
};
