import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Puzzle templates to create variety
  const puzzleTemplates = [
    {
      title: "Sum Array",
      description: `Fix the off-by-one error in the sumArray function.

The function is supposed to sum all numbers in an array, but there's a bug in the loop condition. 

**Instructions:**
- Fix the bug in the sumArray function
- Make sure all test cases pass
- The function should work for any array of numbers`,
      starterCode: `function sumArray(numbers) {
  let total = 0;

  // The bug is hidden in the loop condition
  for (let i = 0; i <= numbers.length; i++) {
    total += numbers[i];
  }

  return total;
}

// Test your solution
console.log(sumArray([1, 2, 3])); // Expected: 6
console.log(sumArray([10, 5])); // Expected: 15
console.log(sumArray([-1, 0, 1])); // Expected: 0`,
      solutionCode: `function sumArray(numbers) {
  let total = 0;

  // Fixed: Changed <= to < to avoid accessing index out of bounds
  for (let i = 0; i < numbers.length; i++) {
    total += numbers[i];
  }

  return total;
}`,
      difficulty: "easy",
      language: "javascript",
      hints: `💡 **Hint 1:** Look at the loop condition. What happens when i equals numbers.length?

💡 **Hint 2:** Remember that array indices start at 0. If an array has 3 elements, valid indices are 0, 1, and 2.

💡 **Hint 3:** Try running the code and see what error you get. That should point you in the right direction!`,
      testCases: [
        { input: "[1, 2, 3]", expectedOutput: "6", isPublic: true },
        { input: "[10, 5]", expectedOutput: "15", isPublic: true },
        { input: "[-1, 0, 1]", expectedOutput: "0", isPublic: true },
        { input: "[]", expectedOutput: "0", isPublic: false },
        { input: "[5]", expectedOutput: "5", isPublic: false },
        { input: "[-10, -5, -3]", expectedOutput: "-18", isPublic: false },
        { input: "[100, 200, 300, 400, 500]", expectedOutput: "1500", isPublic: false },
      ],
    },
    {
      title: "Find Maximum",
      description: `Fix the bug in the findMax function.

The function should return the maximum value in an array, but it's not working correctly. 

**Instructions:**
- Fix the bug in the findMax function
- Make sure all test cases pass
- The function should handle negative numbers and empty arrays`,
      starterCode: `function findMax(numbers) {
  let max = 0;

  // The bug is here somewhere...
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] > max) {
      max = numbers[i];
    }
  }

  return max;
}

// Test your solution
console.log(findMax([1, 5, 3])); // Expected: 5
console.log(findMax([-1, -5, -3])); // Expected: -1
console.log(findMax([10, 2, 8])); // Expected: 10`,
      solutionCode: `function findMax(numbers) {
  if (numbers.length === 0) return undefined;
  
  let max = numbers[0]; // Fixed: Start with first element instead of 0

  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > max) {
      max = numbers[i];
    }
  }

  return max;
}`,
      difficulty: "easy",
      language: "javascript",
      hints: `💡 **Hint 1:** What happens if all numbers in the array are negative?

💡 **Hint 2:** The initial value of max might be causing issues.

💡 **Hint 3:** Think about what value you should initialize max to.`,
      testCases: [
        { input: "[1, 5, 3]", expectedOutput: "5", isPublic: true },
        { input: "[-1, -5, -3]", expectedOutput: "-1", isPublic: true },
        { input: "[10, 2, 8]", expectedOutput: "10", isPublic: true },
        { input: "[5]", expectedOutput: "5", isPublic: false },
        { input: "[0, -1, 1]", expectedOutput: "1", isPublic: false },
        { input: "[-100, -50, -200]", expectedOutput: "-50", isPublic: false },
      ],
    },
    {
      title: "Reverse String",
      description: `Fix the bug in the reverseString function.

The function should reverse a string, but there's an issue with how it's building the result. 

**Instructions:**
- Fix the bug in the reverseString function
- Make sure all test cases pass
- The function should work for any string`,
      starterCode: `function reverseString(str) {
  let reversed = "";

  // Something's wrong with the loop...
  for (let i = 0; i < str.length; i++) {
    reversed = str[i] + reversed;
  }

  return reversed;
}

// Test your solution
console.log(reverseString("hello")); // Expected: "olleh"
console.log(reverseString("world")); // Expected: "dlrow"
console.log(reverseString("abc")); // Expected: "cba"`,
      solutionCode: `function reverseString(str) {
  let reversed = "";

  // Fixed: Changed loop to iterate backwards
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }

  return reversed;
}`,
      difficulty: "easy",
      language: "javascript",
      hints: `💡 **Hint 1:** How are you building the reversed string? Are you going forward or backward?

💡 **Hint 2:** Think about which character should come first in the reversed string.

💡 **Hint 3:** Try tracing through the loop with "abc" to see what happens.`,
      testCases: [
        { input: '"hello"', expectedOutput: '"olleh"', isPublic: true },
        { input: '"world"', expectedOutput: '"dlrow"', isPublic: true },
        { input: '"abc"', expectedOutput: '"cba"', isPublic: true },
        { input: '""', expectedOutput: '""', isPublic: false },
        { input: '"a"', expectedOutput: '"a"', isPublic: false },
        { input: '"12345"', expectedOutput: '"54321"', isPublic: false },
      ],
    },
    {
      title: "Count Vowels",
      description: `Fix the bug in the countVowels function.

The function should count the number of vowels in a string, but it's not counting all vowels correctly. 

**Instructions:**
- Fix the bug in the countVowels function
- Make sure all test cases pass
- Both uppercase and lowercase vowels should be counted`,
      starterCode: `function countVowels(str) {
  let count = 0;
  const vowels = "aeiou";

  for (let i = 0; i < str.length; i++) {
    if (vowels.includes(str[i])) {
      count++;
    }
  }

  return count;
}

// Test your solution
console.log(countVowels("hello")); // Expected: 2
console.log(countVowels("WORLD")); // Expected: 1
console.log(countVowels("aeiou")); // Expected: 5`,
      solutionCode: `function countVowels(str) {
  let count = 0;
  const vowels = "aeiouAEIOU"; // Fixed: Include both lowercase and uppercase

  for (let i = 0; i < str.length; i++) {
    if (vowels.includes(str[i])) {
      count++;
    }
  }

  return count;
}`,
      difficulty: "easy",
      language: "javascript",
      hints: `💡 **Hint 1:** What happens when the string has uppercase letters?

💡 **Hint 2:** Check the vowels string - does it include both cases?

💡 **Hint 3:** Test with "WORLD" to see what happens.`,
      testCases: [
        { input: '"hello"', expectedOutput: "2", isPublic: true },
        { input: '"WORLD"', expectedOutput: "1", isPublic: true },
        { input: '"aeiou"', expectedOutput: "5", isPublic: true },
        { input: '"Hello World"', expectedOutput: "3", isPublic: false },
        { input: '"bcdfg"', expectedOutput: "0", isPublic: false },
        { input: '"AeIoU"', expectedOutput: "5", isPublic: false },
      ],
    },
    {
      title: "Check Palindrome",
      description: `Fix the bug in the isPalindrome function.

The function should check if a string is a palindrome (reads the same forwards and backwards), but it has a logical error. 

**Instructions:**
- Fix the bug in the isPalindrome function
- Make sure all test cases pass
- The function should be case-insensitive`,
      starterCode: `function isPalindrome(str) {
  const lowerStr = str.toLowerCase();
  const reversed = lowerStr.split("").reverse().join("");

  // What's wrong here?
  return lowerStr === reversed;
}

// Test your solution
console.log(isPalindrome("racecar")); // Expected: true
console.log(isPalindrome("hello")); // Expected: false
console.log(isPalindrome("A")); // Expected: true`,
      solutionCode: `function isPalindrome(str) {
  const lowerStr = str.toLowerCase();
  // Fixed: Need to remove non-alphanumeric characters
  const cleaned = lowerStr.replace(/[^a-z0-9]/g, "");
  const reversed = cleaned.split("").reverse().join("");

  return cleaned === reversed;
}`,
      difficulty: "medium",
      language: "javascript",
      hints: `💡 **Hint 1:** What happens with spaces or special characters?

💡 **Hint 2:** "race car" should be a palindrome, but will it pass?

💡 **Hint 3:** You might need to clean the string before comparing.`,
      testCases: [
        { input: '"racecar"', expectedOutput: "true", isPublic: true },
        { input: '"hello"', expectedOutput: "false", isPublic: true },
        { input: '"A"', expectedOutput: "true", isPublic: true },
        { input: '"race car"', expectedOutput: "true", isPublic: false },
        { input: '"A man a plan a canal Panama"', expectedOutput: "true", isPublic: false },
        { input: '"not a palindrome"', expectedOutput: "false", isPublic: false },
      ],
    },
  ];

  // Create all puzzles
  const createdPuzzles = [];
  for (const template of puzzleTemplates) {
    const puzzle = await prisma.puzzle.create({
      data: {
        title: template.title,
        description: template.description,
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
    `✅ Scheduled ${scheduledCount} daily puzzles starting from ${todayDate.toISOString().split("T")[0]}`
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
