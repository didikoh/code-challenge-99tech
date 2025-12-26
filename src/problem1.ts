/**
 * Problem 1: Three ways to sum to n
 * Task: Provide 3 unique implementations to calculate sum from 1 to n
 */

/**
 * Implementation 1: Mathematical Formula (Gauss's Formula)
 * 
 * Uses the mathematical formula: n * (n + 1) / 2
 * This is the most efficient approach.
 * 
 * Time Complexity: O(1) - constant time, single calculation
 * Space Complexity: O(1) - no additional space needed
 * 
 * Pros:
 * - Extremely fast, no loops or recursion
 * - Memory efficient
 * - Most optimal solution for large values of n
 * 
 * Cons:
 * - Less intuitive for beginners
 */
function sum_to_n_a(n: number): number {
  return (n * (n + 1)) / 2;
}

/**
 * Implementation 2: Iterative Loop
 * 
 * Uses a simple for loop to sum all numbers from 1 to n.
 * Traditional approach, easy to understand.
 * 
 * Time Complexity: O(n) - linear time, loops n times
 * Space Complexity: O(1) - only stores sum variable
 * 
 * Pros:
 * - Very readable and intuitive
 * - Easy to debug and modify
 * - Straightforward logic
 * 
 * Cons:
 * - Slower than mathematical formula for large n
 * - Performance degrades linearly with input size
 */
function sum_to_n_b(n: number): number {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

/**
 * Implementation 3: Recursive Approach
 * 
 * Uses recursion to break down the problem: sum(n) = n + sum(n-1)
 * Base case: sum(1) = 1
 * 
 * Time Complexity: O(n) - makes n recursive calls
 * Space Complexity: O(n) - call stack stores n frames
 * 
 * Pros:
 * - Elegant and demonstrates functional programming
 * - Good for teaching recursion concepts
 * 
 * Cons:
 * - Risk of stack overflow for large n
 * - Higher memory usage due to call stack
 * - Slower than iterative due to function call overhead
 * - Not tail-call optimized in TypeScript/JavaScript
 */
function sum_to_n_c(n: number): number {
  if (n === 1) {
    return 1;
  }
  return n + sum_to_n_c(n - 1);
}

// Test cases
console.log('Testing sum_to_n implementations:');
console.log('sum_to_n_a(5):', sum_to_n_a(5)); // Expected: 15
console.log('sum_to_n_b(5):', sum_to_n_b(5)); // Expected: 15
console.log('sum_to_n_c(5):', sum_to_n_c(5)); // Expected: 15

console.log('\nsum_to_n_a(100):', sum_to_n_a(100)); // Expected: 5050
console.log('sum_to_n_b(100):', sum_to_n_b(100)); // Expected: 5050
console.log('sum_to_n_c(100):', sum_to_n_c(100)); // Expected: 5050

export { sum_to_n_a, sum_to_n_b, sum_to_n_c };
