import { useState } from 'react';
import './App.css';
import SumToN from './components/SumToN';
import CurrencySwapForm from './components/CurrencySwapForm';
import MessyReact from './components/MessyReact';

type Tab = 'problem1' | 'problem2' | 'problem3';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('problem2');

  return (
    <div className="App">
      <nav className="tabs-nav">
        <button
          className={`tab-button ${activeTab === 'problem1' ? 'active' : ''}`}
          onClick={() => setActiveTab('problem1')}
        >
          Problem 1: Sum to N
        </button>
        <button
          className={`tab-button ${activeTab === 'problem2' ? 'active' : ''}`}
          onClick={() => setActiveTab('problem2')}
        >
          Problem 2: Currency Swap
        </button>
        <button
          className={`tab-button ${activeTab === 'problem3' ? 'active' : ''}`}
          onClick={() => setActiveTab('problem3')}
        >
          Problem 3: React Analysis
        </button>
      </nav>

      <div className="tab-content">
        {activeTab === 'problem1' && <SumToN />}
        {activeTab === 'problem2' && <CurrencySwapForm />}
        {activeTab === 'problem3' && <MessyReact />}
      </div>
    </div>
  );
}

export default App;
