import React, { useState } from 'react';
import './SumToN.css';

/**
 * Implementation 1: Mathematical Formula (Gauss's Formula)
 * Time Complexity: O(1) - constant time
 * Space Complexity: O(1) - no additional space
 */
function sum_to_n_a(n: number): number {
  return (n * (n + 1)) / 2;
}

/**
 * Implementation 2: Iterative Loop
 * Time Complexity: O(n) - linear time
 * Space Complexity: O(1) - only stores sum variable
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
 * Time Complexity: O(n) - makes n recursive calls
 * Space Complexity: O(n) - call stack stores n frames
 */
function sum_to_n_c(n: number): number {
  if (n === 1) {
    return 1;
  }
  return n + sum_to_n_c(n - 1);
}

const SumToN: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('5');
  const [results, setResults] = useState<{ a: number; b: number; c: number } | null>(null);

  const handleCalculate = () => {
    const n = parseInt(inputValue);
    if (isNaN(n) || n <= 0) {
      alert('Please enter a valid positive integer');
      return;
    }
    
    setResults({
      a: sum_to_n_a(n),
      b: sum_to_n_b(n),
      c: sum_to_n_c(n),
    });
  };

  return (
    <div className="sum-to-n-container">
      <div className="sum-to-n-card">
        <h2 className="title">Problem 1: Three Ways to Sum to n</h2>
        <p className="description">
          Calculate the sum from 1 to n using three different implementations
        </p>

        <div className="input-section">
          <label htmlFor="n-input">Enter n:</label>
          <input
            id="n-input"
            type="number"
            min="1"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleCalculate()}
          />
          <button onClick={handleCalculate}>Calculate</button>
        </div>

        {results && (
          <div className="results-section">
            <h3>Results:</h3>
            <div className="result-item">
              <div className="method">
                <strong>Method A: Mathematical Formula</strong>
                <span className="complexity">O(1) - Constant Time</span>
              </div>
              <div className="result-value">{results.a.toLocaleString()}</div>
            </div>

            <div className="result-item">
              <div className="method">
                <strong>Method B: Iterative Loop</strong>
                <span className="complexity">O(n) - Linear Time</span>
              </div>
              <div className="result-value">{results.b.toLocaleString()}</div>
            </div>

            <div className="result-item">
              <div className="method">
                <strong>Method C: Recursive</strong>
                <span className="complexity">O(n) - Linear Time, O(n) Space</span>
              </div>
              <div className="result-value">{results.c.toLocaleString()}</div>
            </div>
          </div>
        )}

        <div className="info-section">
          <h3>Implementation Details:</h3>
          <div className="implementation">
            <h4>🔹 Method A: Mathematical Formula</h4>
            <code>return (n * (n + 1)) / 2</code>
            <p>Uses Gauss's formula - most efficient approach with constant time complexity.</p>
          </div>

          <div className="implementation">
            <h4>🔹 Method B: Iterative Loop</h4>
            <code>
              for (let i = 1; i &lt;= n; i++) &#123;<br />
              &nbsp;&nbsp;sum += i;<br />
              &#125;
            </code>
            <p>Traditional approach using a loop - easy to understand and debug.</p>
          </div>

          <div className="implementation">
            <h4>🔹 Method C: Recursive</h4>
            <code>
              if (n === 1) return 1;<br />
              return n + sum_to_n_c(n - 1);
            </code>
            <p>Functional programming approach - elegant but uses more memory due to call stack.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SumToN;
