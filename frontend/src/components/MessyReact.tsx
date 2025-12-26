import React from 'react';
import './MessyReact.css';

const MessyReact: React.FC = () => {
  return (
    <div className="messy-react-container">
      <div className="messy-react-card">
        <h2 className="title">Problem 3: Messy React Code Analysis</h2>
        
        <div className="content-section">
          <h3>🔍 Issues Found</h3>
          
          <div className="issue-item">
            <div className="issue-number">1</div>
            <div className="issue-content">
              <h4>Undefined Variable `lhsPriority`</h4>
              <p>The variable <code>lhsPriority</code> is used but never defined. Should be <code>balancePriority</code>.</p>
              <span className="severity critical">Critical</span>
            </div>
          </div>

          <div className="issue-item">
            <div className="issue-number">2</div>
            <div className="issue-content">
              <h4>Inverted Filter Logic</h4>
              <p>Filter returns <code>true</code> for negative/zero amounts, keeping wrong balances.</p>
              <span className="severity critical">Critical</span>
            </div>
          </div>

          <div className="issue-item">
            <div className="issue-number">3</div>
            <div className="issue-content">
              <h4>Missing `blockchain` Property</h4>
              <p>The code uses <code>balance.blockchain</code> but it's not in the interface.</p>
              <span className="severity high">High</span>
            </div>
          </div>

          <div className="issue-item">
            <div className="issue-number">4</div>
            <div className="issue-content">
              <h4>Wrong Dependencies in useMemo</h4>
              <p><code>prices</code> is listed but never used in sorting. <code>getPriority</code> function is missing.</p>
              <span className="severity medium">Medium</span>
            </div>
          </div>

          <div className="issue-item">
            <div className="issue-number">5</div>
            <div className="issue-content">
              <h4>Redundant Computation</h4>
              <p><code>formattedBalances</code> is computed but never used.</p>
              <span className="severity medium">Medium</span>
            </div>
          </div>

          <div className="issue-item">
            <div className="issue-number">6</div>
            <div className="issue-content">
              <h4>Type Mismatch in Map</h4>
              <p>Maps over <code>sortedBalances</code> but types as <code>FormattedWalletBalance</code>.</p>
              <span className="severity high">High</span>
            </div>
          </div>

          <div className="issue-item">
            <div className="issue-number">7</div>
            <div className="issue-content">
              <h4>Using Index as Key</h4>
              <p>React keys should be unique identifiers, not array indices.</p>
              <span className="severity medium">Medium</span>
            </div>
          </div>

          <div className="issue-item">
            <div className="issue-number">8</div>
            <div className="issue-content">
              <h4>Function Recreated on Every Render</h4>
              <p><code>getPriority</code> is defined inside component, breaking memoization.</p>
              <span className="severity low">Low</span>
            </div>
          </div>

          <div className="issue-item">
            <div className="issue-number">9</div>
            <div className="issue-content">
              <h4>Inconsistent Sort Return</h4>
              <p>Sort function doesn't return a value when priorities are equal.</p>
              <span className="severity medium">Medium</span>
            </div>
          </div>

          <div className="issue-item">
            <div className="issue-number">10</div>
            <div className="issue-content">
              <h4>Missing Type Definition</h4>
              <p><code>BoxProps</code> is not imported or defined.</p>
              <span className="severity high">High</span>
            </div>
          </div>
        </div>

        <div className="content-section">
          <h3>✅ Key Improvements</h3>
          
          <div className="improvement-card">
            <h4>🔧 Fixed Logic Errors</h4>
            <ul>
              <li>Corrected undefined variable to <code>balancePriority</code></li>
              <li>Fixed filter to keep positive balances only</li>
              <li>Added missing <code>blockchain</code> property to interface</li>
            </ul>
          </div>

          <div className="improvement-card">
            <h4>⚡ Performance Optimizations</h4>
            <ul>
              <li>Moved <code>getPriority</code> outside component</li>
              <li>Combined filter/sort/map into single memoized operation</li>
              <li>Proper dependency arrays in <code>useMemo</code></li>
              <li>Simplified sort comparator</li>
            </ul>
          </div>

          <div className="improvement-card">
            <h4>🎯 React Best Practices</h4>
            <ul>
              <li>Changed from index to unique identifier (<code>currency</code>) as key</li>
              <li>Better decimal formatting with <code>.toFixed(2)</code></li>
              <li>Removed redundant computations</li>
              <li>Proper TypeScript types throughout</li>
            </ul>
          </div>
        </div>

        <div className="content-section">
          <h3>📊 Complexity Analysis</h3>
          
          <div className="complexity-comparison">
            <div className="complexity-box original">
              <h4>Original Code</h4>
              <div className="metric">
                <span>Time:</span>
                <code>O(n log n)</code>
              </div>
              <div className="metric">
                <span>Space:</span>
                <code>O(n)</code>
              </div>
              <p className="note">Multiple passes, wasted computations</p>
            </div>

            <div className="arrow">→</div>

            <div className="complexity-box refactored">
              <h4>Refactored Code</h4>
              <div className="metric">
                <span>Time:</span>
                <code>O(n log n)</code>
              </div>
              <div className="metric">
                <span>Space:</span>
                <code>O(n)</code>
              </div>
              <p className="note">Same complexity, but optimized execution</p>
            </div>
          </div>
        </div>

        <div className="code-link">
          <p>📁 View the complete refactored code in:</p>
          <code>src/problem3-refactored.tsx</code>
        </div>
      </div>
    </div>
  );
};

export default MessyReact;
