import { Injectable } from '@nestjs/common';

@Injectable()
export class SumService {
  /**
   * Implementation 1: Mathematical Formula (Gauss's Formula)
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  sumToNFormula(n: number): number {
    if (n < 1) return 0;
    return (n * (n + 1)) / 2;
  }

  /**
   * Implementation 2: Iterative Loop
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  sumToNIterative(n: number): number {
    if (n < 1) return 0;
    let sum = 0;
    for (let i = 1; i <= n; i++) {
      sum += i;
    }
    return sum;
  }

  /**
   * Implementation 3: Recursive Approach
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  sumToNRecursive(n: number): number {
    if (n < 1) return 0;
    if (n === 1) return 1;
    return n + this.sumToNRecursive(n - 1);
  }

  /**
   * Calculate sum using all three methods and return results
   */
  calculateAll(n: number) {
    return {
      input: n,
      results: {
        formula: this.sumToNFormula(n),
        iterative: this.sumToNIterative(n),
        recursive: this.sumToNRecursive(n),
      },
      methods: [
        {
          name: 'formula',
          description: 'Mathematical Formula (Gauss\'s Formula)',
          timeComplexity: 'O(1)',
          spaceComplexity: 'O(1)',
          result: this.sumToNFormula(n),
        },
        {
          name: 'iterative',
          description: 'Iterative Loop',
          timeComplexity: 'O(n)',
          spaceComplexity: 'O(1)',
          result: this.sumToNIterative(n),
        },
        {
          name: 'recursive',
          description: 'Recursive Approach',
          timeComplexity: 'O(n)',
          spaceComplexity: 'O(n)',
          result: this.sumToNRecursive(n),
        },
      ],
    };
  }
}
