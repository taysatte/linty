import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Puzzle templates to create variety
  const puzzleTemplates = [
    {
      tags: ["array", "algorithm", "two-pointer"],
      title: "Two Sum",
      description: `Given an array of integers \`nums\` and an integer \`target\`, return the indices of the two numbers that add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

**Example:**
- Input: \`nums = [2, 7, 11, 15]\`, \`target = 9\`
- Output: \`[0, 1]\` because \`nums[0] + nums[1] = 2 + 7 = 9\``,
      instructions: `- Return an array containing the two indices
- The indices should be in ascending order
- You can assume a solution always exists
- The same element cannot be used twice`,
      starterCode: `function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    // Bug: Adding number to map BEFORE checking for complement
    // This allows the same element to be used twice
    map.set(nums[i], i);
    
    const complement = target - nums[i];
    
    // Bug: This will find the same element we just added if complement === nums[i]
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
  }
  
  return [];
}`,
      solutionCode: `const twoSum = (nums, target) => {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }
  
  return [];
}`,
      difficulty: "medium",
      language: "javascript",
      hints: `💡 **Hint 1:** Instead of checking every pair (O(n²)), use a hash map to store numbers you've seen.

💡 **Hint 2:** For each number, calculate what number you need to find (target - current number).

💡 **Hint 3:** Check if you've already seen the complement number before adding the current number to the map.`,
      testCases: [
        {
          input: "console.log(twoSum([2, 7, 11, 15], 9))",
          inputParams: "[2, 7, 11, 15], 9",
          expectedOutput: "[0, 1]",
          isPublic: true,
        },
        {
          input: "console.log(twoSum([3, 2, 4], 6))",
          inputParams: "[3, 2, 4], 6",
          expectedOutput: "[1, 2]",
          isPublic: true,
        },
        {
          input: "console.log(twoSum([3, 3], 6))",
          inputParams: "[3, 3], 6",
          expectedOutput: "[0, 1]",
          isPublic: true,
        },
        {
          input: "console.log(twoSum([-1, -2, -3, -4, -5], -8))",
          inputParams: "[-1, -2, -3, -4, -5], -8",
          expectedOutput: "[2, 4]",
          isPublic: false,
        },
        {
          input: "console.log(twoSum([1, 5, 3, 7, 9], 14))",
          inputParams: "[1, 5, 3, 7, 9], 14",
          expectedOutput: "[1, 4]",
          isPublic: false,
        },
        {
          input: "console.log(twoSum([10, 20, 30, 40, 50], 90))",
          inputParams: "[10, 20, 30, 40, 50], 90",
          expectedOutput: "[3, 4]",
          isPublic: false,
        },
      ],
    },
    {
      tags: ["string", "algorithm", "sliding-window"],
      title: "Longest Substring Without Repeating Characters",
      description: `Given a string \`s\`, find the length of the longest substring without repeating characters.

**Example:**
- Input: \`s = "abcabcbb"\`
- Output: \`3\` (the substring is \`"abc"\`, which has length 3)

- Input: \`s = "bbbbb"\`
- Output: \`1\` (the substring is \`"b"\`, which has length 1)`,
      instructions: `- Return the length of the longest substring (an integer)
- The substring must be contiguous
- No characters should repeat within the substring`,
      starterCode: `function lengthOfLongestSubstring(s) {
  const charMap = new Map();
  let maxLength = 0;
  let left = 0;
  
  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    
    // Bug: Not checking if the duplicate is within the current window
    // This causes left to move backwards sometimes
    if (charMap.has(char)) {
      left = charMap.get(char) + 1;
    }
    
    charMap.set(char, right);
    maxLength = Math.max(maxLength, right - left + 1);
  }
  
  return maxLength;
}`,
      solutionCode: `const lengthOfLongestSubstring = (s) => {
  const charMap = new Map();
  let maxLength = 0;
  let left = 0;
  
  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    
    if (charMap.has(char) && charMap.get(char) >= left) {
      left = charMap.get(char) + 1;
    }
    
    charMap.set(char, right);
    maxLength = Math.max(maxLength, right - left + 1);
  }
  
  return maxLength;
}`,
      difficulty: "medium",
      language: "javascript",
      hints: `💡 **Hint 1:** Use a sliding window approach with two pointers (left and right).

💡 **Hint 2:** Keep track of characters you've seen using a map with their last seen index.

💡 **Hint 3:** When you see a duplicate character, move the left pointer to the position after where that character was last seen.`,
      testCases: [
        {
          input: 'console.log(lengthOfLongestSubstring("abcabcbb"))',
          inputParams: '"abcabcbb"',
          expectedOutput: "3",
          isPublic: true,
        },
        {
          input: 'console.log(lengthOfLongestSubstring("bbbbb"))',
          inputParams: '"bbbbb"',
          expectedOutput: "1",
          isPublic: true,
        },
        {
          input: 'console.log(lengthOfLongestSubstring("pwwkew"))',
          inputParams: '"pwwkew"',
          expectedOutput: "3",
          isPublic: true,
        },
        {
          input: 'console.log(lengthOfLongestSubstring(""))',
          inputParams: '""',
          expectedOutput: "0",
          isPublic: false,
        },
        {
          input: 'console.log(lengthOfLongestSubstring("dvdf"))',
          inputParams: '"dvdf"',
          expectedOutput: "3",
          isPublic: false,
        },
        {
          input:
            'console.log(lengthOfLongestSubstring("abcdefghijklmnopqrstuvwxyz"))',
          inputParams: '"abcdefghijklmnopqrstuvwxyz"',
          expectedOutput: "26",
          isPublic: false,
        },
      ],
    },
    {
      tags: ["array", "algorithm", "sorting"],
      title: "Merge Sorted Arrays",
      description: `You are given two integer arrays \`nums1\` and \`nums2\`, sorted in non-decreasing order. Merge \`nums2\` into \`nums1\` as one sorted array.

**Note:** \`nums1\` has a length of \`m + n\`, where the first \`m\` elements denote the elements that should be merged, and the last \`n\` elements are set to 0 and should be ignored. \`nums2\` has a length of \`n\`.

**Example:**
- Input: \`nums1 = [1,2,3,0,0,0]\`, \`m = 3\`, \`nums2 = [2,5,6]\`, \`n = 3\`
- Output: \`[1,2,2,3,5,6]\``,
      instructions: `- Modify \`nums1\` in-place (don't return a new array)
- The final sorted array should be stored inside \`nums1\`
- Work backwards from the end of the arrays for optimal space complexity`,
      starterCode: `function merge(nums1, m, nums2, n) {
  let i = 0;
  let j = 0;
  let k = m;
  
  // Bug: Starting from the beginning overwrites unprocessed elements
  while (i < m && j < n) {
    if (nums1[i] <= nums2[j]) {
      nums1[k] = nums1[i];
      i++;
    } else {
      nums1[k] = nums2[j];
      j++;
    }
    k++;
  }
  
  // Bug: Only copying remaining nums2, missing remaining nums1
  while (j < n) {
    nums1[k] = nums2[j];
    j++;
    k++;
  }
  
  return nums1;
}`,
      solutionCode: `const merge = (nums1, m, nums2, n) => {
  let i = m - 1;
  let j = n - 1;
  let k = m + n - 1;
  
  while (i >= 0 && j >= 0) {
    if (nums1[i] > nums2[j]) {
      nums1[k] = nums1[i];
      i--;
    } else {
      nums1[k] = nums2[j];
      j--;
    }
    k--;
  }
  
  while (j >= 0) {
    nums1[k] = nums2[j];
    j--;
    k--;
  }
  
  return nums1;
}`,
      difficulty: "medium",
      language: "javascript",
      hints: `💡 **Hint 1:** Work backwards from the end of the arrays to avoid overwriting values you haven't processed yet.

💡 **Hint 2:** Compare elements from the end of both arrays and place the larger one at the end of the result.

💡 **Hint 3:** After merging, if there are remaining elements in nums2, copy them to nums1.`,
      testCases: [
        {
          input: "console.log(merge([1,2,3,0,0,0], 3, [2,5,6], 3))",
          inputParams: "[1,2,3,0,0,0], 3, [2,5,6], 3",
          expectedOutput: "[1,2,2,3,5,6]",
          isPublic: true,
        },
        {
          input: "console.log(merge([1], 1, [], 0))",
          inputParams: "[1], 1, [], 0",
          expectedOutput: "[1]",
          isPublic: true,
        },
        {
          input: "console.log(merge([0], 0, [1], 1))",
          inputParams: "[0], 0, [1], 1",
          expectedOutput: "[1]",
          isPublic: true,
        },
        {
          input: "console.log(merge([4,5,6,0,0,0], 3, [1,2,3], 3))",
          inputParams: "[4,5,6,0,0,0], 3, [1,2,3], 3",
          expectedOutput: "[1,2,3,4,5,6]",
          isPublic: false,
        },
        {
          input: "console.log(merge([1,3,5,0,0], 3, [2,4], 2))",
          inputParams: "[1,3,5,0,0], 3, [2,4], 2",
          expectedOutput: "[1,2,3,4,5]",
          isPublic: false,
        },
        {
          input: "console.log(merge([2,0], 1, [1], 1))",
          inputParams: "[2,0], 1, [1], 1",
          expectedOutput: "[1,2]",
          isPublic: false,
        },
      ],
    },
    {
      tags: ["array", "algorithm", "dynamic-programming"],
      title: "Maximum Subarray",
      description: `Given an integer array \`nums\`, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

A subarray is a contiguous part of an array.

**Example:**
- Input: \`nums = [-2,1,-3,4,-1,2,1,-5,4]\`
- Output: \`6\` (the subarray \`[4,-1,2,1]\` has the largest sum)

- Input: \`nums = [1]\`
- Output: \`1\``,
      instructions: `- Return the maximum sum (a single integer)
- Use Kadane's algorithm for O(n) time complexity
- At least one element must be included in the subarray`,
      starterCode: `function maxSubArray(nums) {
  let maxSum = 0;
  let currentSum = 0;
  
  // Bug: Initializing maxSum to 0 fails with all negative numbers
  for (let i = 0; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  
  return maxSum;
}`,
      solutionCode: `const maxSubArray = (nums) => {
  let maxSum = nums[0];
  let currentSum = nums[0];
  
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  
  return maxSum;
}`,
      difficulty: "medium",
      language: "javascript",
      hints: `💡 **Hint 1:** Use Kadane's algorithm - for each position, decide whether to extend the previous subarray or start a new one.

💡 **Hint 2:** At each index, the maximum sum ending at that position is either the current element alone or the current element plus the maximum sum ending at the previous position.

💡 **Hint 3:** Keep track of both the current maximum sum and the overall maximum sum seen so far.`,
      testCases: [
        {
          input: "console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]))",
          inputParams: "[-2,1,-3,4,-1,2,1,-5,4]",
          expectedOutput: "6",
          isPublic: true,
        },
        {
          input: "console.log(maxSubArray([1]))",
          inputParams: "[1]",
          expectedOutput: "1",
          isPublic: true,
        },
        {
          input: "console.log(maxSubArray([5,4,-1,7,8]))",
          inputParams: "[5,4,-1,7,8]",
          expectedOutput: "23",
          isPublic: true,
        },
        {
          input: "console.log(maxSubArray([-1]))",
          inputParams: "[-1]",
          expectedOutput: "-1",
          isPublic: false,
        },
        {
          input: "console.log(maxSubArray([-2,-1]))",
          inputParams: "[-2,-1]",
          expectedOutput: "-1",
          isPublic: false,
        },
        {
          input: "console.log(maxSubArray([1,2,3,4,5]))",
          inputParams: "[1,2,3,4,5]",
          expectedOutput: "15",
          isPublic: false,
        },
      ],
    },
    {
      tags: ["string", "algorithm", "stack"],
      title: "Valid Parentheses",
      description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}''\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

**Example:**
- Input: \`s = "()"\`
- Output: \`true\`

- Input: \`s = "()[]{}"\`
- Output: \`true\`

- Input: \`s = "(]"\`
- Output: \`false\``,
      instructions: `- Return \`true\` if the string is valid, \`false\` otherwise
- Use a stack to track opening brackets
- When you see a closing bracket, check if it matches the most recent opening bracket`,
      starterCode: `function isValid(s) {
  const stack = [];
  const pairs = {
    ')': '(',
    '}': '{',
    ']': '['
  };
  
  for (let char of s) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else {
      // Bug: Not checking if stack is empty before popping
      // This causes issues when there are more closing than opening brackets
      if (stack.pop() !== pairs[char]) {
        return false;
      }
    }
  }
  
  return stack.length === 0;
}`,
      solutionCode: `const isValid = (s) => {
  const stack = [];
  const pairs = {
    ')': '(',
    '}': '{',
    ']': '['
  };
  
  for (let char of s) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else {
      if (stack.length === 0 || stack.pop() !== pairs[char]) {
        return false;
      }
    }
  }
  
  return stack.length === 0;
}`,
      difficulty: "medium",
      language: "javascript",
      hints: `💡 **Hint 1:** Use a stack data structure - push opening brackets, pop when you see closing brackets.

💡 **Hint 2:** When you encounter a closing bracket, check if the top of the stack matches it (using a mapping).

💡 **Hint 3:** The string is valid only if the stack is empty at the end.`,
      testCases: [
        {
          input: 'console.log(isValid("()"))',
          inputParams: '"()"',
          expectedOutput: "true",
          isPublic: true,
        },
        {
          input: 'console.log(isValid("()[]{}"))',
          inputParams: '"()[]{}"',
          expectedOutput: "true",
          isPublic: true,
        },
        {
          input: 'console.log(isValid("(]"))',
          inputParams: '"(]"',
          expectedOutput: "false",
          isPublic: true,
        },
        {
          input: 'console.log(isValid("([)]"))',
          inputParams: '"([)]"',
          expectedOutput: "false",
          isPublic: false,
        },
        {
          input: 'console.log(isValid("{[]}"))',
          inputParams: '"{[]}"',
          expectedOutput: "true",
          isPublic: false,
        },
        {
          input: 'console.log(isValid("(("))',
          inputParams: '"(("',
          expectedOutput: "false",
          isPublic: false,
        },
      ],
    },
    {
      tags: ["array", "algorithm", "binary-search"],
      title: "Search in Rotated Sorted Array",
      description: `There is an integer array \`nums\` sorted in ascending order (with distinct values).

Prior to being passed to your function, \`nums\` is rotated at an unknown pivot index \`k\` (0-indexed). For example, \`[0,1,2,4,5,6,7]\` might be rotated at pivot index 3 and become \`[4,5,6,7,0,1,2]\`.

Given the array \`nums\` after the rotation and an integer \`target\`, return the index of \`target\` if it is in \`nums\`, or \`-1\` if it is not in \`nums\`.

**Example:**
- Input: \`nums = [4,5,6,7,0,1,2]\`, \`target = 0\`
- Output: \`4\`

- Input: \`nums = [4,5,6,7,0,1,2]\`, \`target = 3\`
- Output: \`-1\``,
      instructions: `- Return the index of target if found, otherwise return -1
- You must write an algorithm with O(log n) runtime complexity
- Use a modified binary search to handle the rotation`,
      starterCode: `function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (nums[mid] === target) {
      return mid;
    }
    
    // Bug: Using < instead of <= causes issues when array has duplicates
    // Also, the condition for checking sorted half is incorrect
    if (nums[left] < nums[mid]) {
      if (target >= nums[left] && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // Bug: Missing check for target in the right half
      if (target > nums[mid]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  
  return -1;
}`,
      solutionCode: `const search = (nums, target) => {
  let left = 0;
  let right = nums.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (nums[mid] === target) {
      return mid;
    }
    
    // Check if left half is sorted
    if (nums[left] <= nums[mid]) {
      if (target >= nums[left] && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // Right half is sorted
      if (target > nums[mid] && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  
  return -1;
}`,
      difficulty: "hard",
      language: "javascript",
      hints: `💡 **Hint 1:** Use binary search, but determine which half (left or right) is sorted.

💡 **Hint 2:** If the left half is sorted, check if target is in that range. Otherwise, search the right half.

💡 **Hint 3:** If the right half is sorted, check if target is in that range. Otherwise, search the left half.`,
      testCases: [
        {
          input: "console.log(search([4,5,6,7,0,1,2], 0))",
          inputParams: "[4,5,6,7,0,1,2], 0",
          expectedOutput: "4",
          isPublic: true,
        },
        {
          input: "console.log(search([4,5,6,7,0,1,2], 3))",
          inputParams: "[4,5,6,7,0,1,2], 3",
          expectedOutput: "-1",
          isPublic: true,
        },
        {
          input: "console.log(search([1], 0))",
          inputParams: "[1], 0",
          expectedOutput: "-1",
          isPublic: true,
        },
        {
          input: "console.log(search([1,3], 3))",
          inputParams: "[1,3], 3",
          expectedOutput: "1",
          isPublic: false,
        },
        {
          input: "console.log(search([5,1,3], 3))",
          inputParams: "[5,1,3], 3",
          expectedOutput: "2",
          isPublic: false,
        },
        {
          input: "console.log(search([4,5,6,7,0,1,2], 5))",
          inputParams: "[4,5,6,7,0,1,2], 5",
          expectedOutput: "1",
          isPublic: false,
        },
      ],
    },
    // Easy difficulty puzzles
    {
      tags: ["string", "algorithm", "easy"],
      title: "Reverse String",
      description: `Write a function that reverses a string. The input string is given as an array of characters \`s\`.

You must do this by modifying the input array in-place with O(1) extra memory.

**Example:**
- Input: \`s = ["h","e","l","l","o"]\`
- Output: \`["o","l","l","e","h"]\``,
      instructions: `- Modify the input array in-place (don't return a new array)
- Use two pointers approach for O(1) space complexity
- Swap characters from both ends moving towards the center`,
      starterCode: `function reverseString(s) {
  // Bug: Only reversing half the array
  for (let i = 0; i < s.length / 2; i++) {
    const temp = s[i];
    s[i] = s[s.length - 1 - i];
    // Bug: Not swapping the other end
  }
  return s;
}`,
      solutionCode: `const reverseString = (s) => {
  let left = 0;
  let right = s.length - 1;
  
  while (left < right) {
    const temp = s[left];
    s[left] = s[right];
    s[right] = temp;
    left++;
    right--;
  }
  
  return s;
}`,
      difficulty: "easy",
      language: "javascript",
      hints: `💡 **Hint 1:** Use two pointers - one at the start, one at the end.

💡 **Hint 2:** Swap the characters at both pointers, then move them towards each other.

💡 **Hint 3:** Continue until the pointers meet in the middle.`,
      testCases: [
        {
          input: 'console.log(reverseString(["h","e","l","l","o"]))',
          inputParams: '["h","e","l","l","o"]',
          expectedOutput: '["o","l","l","e","h"]',
          isPublic: true,
        },
        {
          input: 'console.log(reverseString(["H","a","n","n","a","h"]))',
          inputParams: '["H","a","n","n","a","h"]',
          expectedOutput: '["h","a","n","n","a","H"]',
          isPublic: true,
        },
        {
          input: 'console.log(reverseString(["a"]))',
          inputParams: '["a"]',
          expectedOutput: '["a"]',
          isPublic: true,
        },
        {
          input: 'console.log(reverseString(["a","b"]))',
          inputParams: '["a","b"]',
          expectedOutput: '["b","a"]',
          isPublic: false,
        },
        {
          input: 'console.log(reverseString(["1","2","3","4"]))',
          inputParams: '["1","2","3","4"]',
          expectedOutput: '["4","3","2","1"]',
          isPublic: false,
        },
      ],
    },
    {
      tags: ["string", "algorithm", "easy"],
      title: "Valid Palindrome",
      description: `A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.

Given a string \`s\`, return \`true\` if it is a palindrome, or \`false\` otherwise.

**Example:**
- Input: \`s = "A man, a plan, a canal: Panama"\`
- Output: \`true\` (because "amanaplanacanalpanama" is a palindrome)

- Input: \`s = "race a car"\`
- Output: \`false\``,
      instructions: `- Convert to lowercase and remove non-alphanumeric characters
- Use two pointers to compare from both ends
- Return true if all characters match, false otherwise`,
      starterCode: `function isPalindrome(s) {
  // Remove non-alphanumeric and convert to lowercase
  const cleaned = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  
  // Bug: Only checking first half
  for (let i = 0; i < cleaned.length / 2; i++) {
    if (cleaned[i] !== cleaned[cleaned.length - 1 - i]) {
      return false;
    }
  }
  
  return true;
}`,
      solutionCode: `const isPalindrome = (s) => {
  const cleaned = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  
  let left = 0;
  let right = cleaned.length - 1;
  
  while (left < right) {
    if (cleaned[left] !== cleaned[right]) {
      return false;
    }
    left++;
    right--;
  }
  
  return true;
}`,
      difficulty: "easy",
      language: "javascript",
      hints: `💡 **Hint 1:** First, clean the string by removing non-alphanumeric characters and converting to lowercase.

💡 **Hint 2:** Use two pointers starting from both ends of the cleaned string.

💡 **Hint 3:** Compare characters at both pointers and move them towards the center.`,
      testCases: [
        {
          input: 'console.log(isPalindrome("A man, a plan, a canal: Panama"))',
          inputParams: '"A man, a plan, a canal: Panama"',
          expectedOutput: "true",
          isPublic: true,
        },
        {
          input: 'console.log(isPalindrome("race a car"))',
          inputParams: '"race a car"',
          expectedOutput: "false",
          isPublic: true,
        },
        {
          input: 'console.log(isPalindrome(" "))',
          inputParams: '" "',
          expectedOutput: "true",
          isPublic: true,
        },
        {
          input: 'console.log(isPalindrome("Madam"))',
          inputParams: '"Madam"',
          expectedOutput: "true",
          isPublic: false,
        },
        {
          input: 'console.log(isPalindrome("No x in Nixon"))',
          inputParams: '"No x in Nixon"',
          expectedOutput: "true",
          isPublic: false,
        },
      ],
    },
    {
      tags: ["array", "algorithm", "easy"],
      title: "Find Maximum in Array",
      description: `Write a function that finds the maximum number in an array of integers.

**Example:**
- Input: \`nums = [3, 5, 2, 8, 1]\`
- Output: \`8\`

- Input: \`nums = [-1, -5, -3]\`
- Output: \`-1\``,
      instructions: `- Return the maximum value in the array
- Handle arrays with negative numbers
- Assume the array has at least one element`,
      starterCode: `function findMax(nums) {
  let max = 0; // Bug: Initializing to 0 fails with all negative numbers
  
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > max) {
      max = nums[i];
    }
  }
  
  return max;
}`,
      solutionCode: `const findMax = (nums) => {
  let max = nums[0];
  
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > max) {
      max = nums[i];
    }
  }
  
  return max;
}`,
      difficulty: "easy",
      language: "javascript",
      hints: `💡 **Hint 1:** Initialize max to the first element of the array, not 0.

💡 **Hint 2:** Iterate through the array and update max whenever you find a larger value.

💡 **Hint 3:** This ensures it works correctly even with all negative numbers.`,
      testCases: [
        {
          input: "console.log(findMax([3, 5, 2, 8, 1]))",
          inputParams: "[3, 5, 2, 8, 1]",
          expectedOutput: "8",
          isPublic: true,
        },
        {
          input: "console.log(findMax([-1, -5, -3]))",
          inputParams: "[-1, -5, -3]",
          expectedOutput: "-1",
          isPublic: true,
        },
        {
          input: "console.log(findMax([42]))",
          inputParams: "[42]",
          expectedOutput: "42",
          isPublic: true,
        },
        {
          input: "console.log(findMax([10, 20, 30]))",
          inputParams: "[10, 20, 30]",
          expectedOutput: "30",
          isPublic: false,
        },
        {
          input: "console.log(findMax([-10, -20, -30]))",
          inputParams: "[-10, -20, -30]",
          expectedOutput: "-10",
          isPublic: false,
        },
      ],
    },
    {
      tags: ["array", "algorithm", "easy"],
      title: "Sum of Array",
      description: `Write a function that calculates the sum of all numbers in an array.

**Example:**
- Input: \`nums = [1, 2, 3, 4, 5]\`
- Output: \`15\`

- Input: \`nums = [-1, 0, 1]\`
- Output: \`0\``,
      instructions: `- Return the sum of all elements
- Handle negative numbers correctly
- Return 0 for empty arrays`,
      starterCode: `function sumArray(nums) {
  let sum = 0;
  
  // Bug: Starting from index 1 instead of 0
  for (let i = 1; i < nums.length; i++) {
    sum += nums[i];
  }
  
  return sum;
}`,
      solutionCode: `const sumArray = (nums) => {
  let sum = 0;
  
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
  }
  
  return sum;
}`,
      difficulty: "easy",
      language: "javascript",
      hints: `💡 **Hint 1:** Initialize a sum variable to 0.

💡 **Hint 2:** Iterate through all elements starting from index 0.

💡 **Hint 3:** Add each element to the sum.`,
      testCases: [
        {
          input: "console.log(sumArray([1, 2, 3, 4, 5]))",
          inputParams: "[1, 2, 3, 4, 5]",
          expectedOutput: "15",
          isPublic: true,
        },
        {
          input: "console.log(sumArray([-1, 0, 1]))",
          inputParams: "[-1, 0, 1]",
          expectedOutput: "0",
          isPublic: true,
        },
        {
          input: "console.log(sumArray([]))",
          inputParams: "[]",
          expectedOutput: "0",
          isPublic: true,
        },
        {
          input: "console.log(sumArray([10, 20, 30, 40]))",
          inputParams: "[10, 20, 30, 40]",
          expectedOutput: "100",
          isPublic: false,
        },
        {
          input: "console.log(sumArray([-5, -10, -15]))",
          inputParams: "[-5, -10, -15]",
          expectedOutput: "-30",
          isPublic: false,
        },
      ],
    },
    {
      tags: ["string", "algorithm", "easy"],
      title: "Count Characters",
      description: `Write a function that counts how many times a specific character appears in a string.

**Example:**
- Input: \`s = "hello"\`, \`char = "l"\`
- Output: \`2\` (because 'l' appears twice)

- Input: \`s = "programming"\`, \`char = "m"\`
- Output: \`2\``,
      instructions: `- Return the count of how many times the character appears
- The comparison should be case-sensitive
- Return 0 if the character is not found`,
      starterCode: `function countChar(s, char) {
  let count = 0;
  
  // Bug: Using == instead of ===, and not checking bounds
  for (let i = 0; i <= s.length; i++) {
    if (s[i] == char) {
      count++;
    }
  }
  
  return count;
}`,
      solutionCode: `const countChar = (s, char) => {
  let count = 0;
  
  for (let i = 0; i < s.length; i++) {
    if (s[i] === char) {
      count++;
    }
  }
  
  return count;
}`,
      difficulty: "easy",
      language: "javascript",
      hints: `💡 **Hint 1:** Initialize a counter to 0.

💡 **Hint 2:** Loop through each character in the string.

💡 **Hint 3:** Use strict equality (===) to compare characters and increment the counter when there's a match.`,
      testCases: [
        {
          input: 'console.log(countChar("hello", "l"))',
          inputParams: '"hello", "l"',
          expectedOutput: "2",
          isPublic: true,
        },
        {
          input: 'console.log(countChar("programming", "m"))',
          inputParams: '"programming", "m"',
          expectedOutput: "2",
          isPublic: true,
        },
        {
          input: 'console.log(countChar("test", "x"))',
          inputParams: '"test", "x"',
          expectedOutput: "0",
          isPublic: true,
        },
        {
          input: 'console.log(countChar("Mississippi", "s"))',
          inputParams: '"Mississippi", "s"',
          expectedOutput: "4",
          isPublic: false,
        },
        {
          input: 'console.log(countChar("a", "a"))',
          inputParams: '"a", "a"',
          expectedOutput: "1",
          isPublic: false,
        },
      ],
    },
  ];

  // Create all puzzles
  const createdPuzzles = [];
  for (const template of puzzleTemplates) {
    // Create PuzzleDesc first
    const puzzleDesc = await prisma.puzzleDesc.create({
      data: {
        description: template.description,
        instructions: template.instructions,
      },
    });

    // Create puzzle with reference to PuzzleDesc
    const puzzle = await prisma.puzzle.create({
      data: {
        tags: template.tags,
        title: template.title,
        descriptionId: puzzleDesc.id,
        starterCode: template.starterCode,
        solutionCode: template.solutionCode,
        difficulty: template.difficulty,
        language: template.language,
        hints: template.hints,
        testCases: {
          create: template.testCases,
        },
      },
      include: {
        testCases: true,
      },
    });

    createdPuzzles.push(puzzle);
    console.log(`✅ Created puzzle: "${puzzle.title}" (ID: ${puzzle.id})`);
    console.log(
      `   - Public test cases: ${
        puzzle.testCases.filter((tc) => tc.isPublic).length
      }`
    );
    console.log(
      `   - Hidden test cases: ${
        puzzle.testCases.filter((tc) => !tc.isPublic).length
      }`
    );
    console.log(`   - Total test cases: ${puzzle.testCases.length}`);
  }

  // Schedule puzzles for the next 60 days
  const today = new Date();
  const todayDate = new Date(
    Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
  );

  let scheduledCount = 0;
  for (let i = 0; i < 60; i++) {
    const scheduleDate = new Date(todayDate);
    scheduleDate.setUTCDate(todayDate.getUTCDate() + i);

    // Rotate through puzzles
    const puzzleIndex = i % createdPuzzles.length;
    const puzzle = createdPuzzles[puzzleIndex];

    await prisma.dailyPuzzle.upsert({
      where: {
        date: scheduleDate,
      },
      create: {
        date: scheduleDate,
        puzzleId: puzzle.id,
      },
      update: {
        puzzleId: puzzle.id,
      },
    });

    scheduledCount++;
  }

  console.log(
    `✅ Scheduled ${scheduledCount} daily puzzles starting from ${
      todayDate.toISOString().split("T")[0]
    }`
  );
  console.log("🎉 Seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
