import React, { useState, useEffect } from 'react';
import './CurrencySwapForm.css';

interface TokenPrice {
  currency: string;
  date: string;
  price: number;
}

interface Token {
  currency: string;
  price?: number;
}

const CurrencySwapForm: React.FC = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [fromToken, setFromToken] = useState<string>('');
  const [toToken, setToToken] = useState<string>('');
  const [fromAmount, setFromAmount] = useState<string>('');
  const [toAmount, setToAmount] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Fetch token prices from the API
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://interview.switcheo.com/prices.json');
        const data: TokenPrice[] = await response.json();
        
        // Group by currency and get the latest price
        const priceMap = new Map<string, number>();
        data.forEach((item) => {
          if (item.price > 0 && !priceMap.has(item.currency)) {
            priceMap.set(item.currency, item.price);
          }
        });

        const tokenList: Token[] = Array.from(priceMap.entries()).map(([currency, price]) => ({
          currency,
          price,
        }));

        setTokens(tokenList.sort((a, b) => a.currency.localeCompare(b.currency)));
      } catch (err) {
        setError('Failed to load token prices. Please try again later.');
        console.error('Error fetching prices:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrices();
  }, []);

  // Calculate exchange rate and convert amount
  const calculateToAmount = (amount: string, from: string, to: string) => {
    if (!amount || !from || !to) return '';
    
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) return '';

    const fromTokenData = tokens.find((t) => t.currency === from);
    const toTokenData = tokens.find((t) => t.currency === to);

    if (!fromTokenData?.price || !toTokenData?.price) return '';

    const converted = (amountNum * fromTokenData.price) / toTokenData.price;
    return converted.toFixed(6);
  };

  // Handle from amount change
  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    setError('');
    
    if (value && fromToken && toToken) {
      const calculated = calculateToAmount(value, fromToken, toToken);
      setToAmount(calculated);
    } else {
      setToAmount('');
    }
  };

  // Handle token selection
  const handleFromTokenChange = (currency: string) => {
    setFromToken(currency);
    setError('');
    if (fromAmount && currency && toToken) {
      const calculated = calculateToAmount(fromAmount, currency, toToken);
      setToAmount(calculated);
    }
  };

  const handleToTokenChange = (currency: string) => {
    setToToken(currency);
    setError('');
    if (fromAmount && fromToken && currency) {
      const calculated = calculateToAmount(fromAmount, fromToken, currency);
      setToAmount(calculated);
    }
  };

  // Swap tokens
  const handleSwapTokens = () => {
    const tempToken = fromToken;
    setFromToken(toToken);
    setToToken(tempToken);
    
    const tempAmount = fromAmount;
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  // Validate form
  const validateForm = (): boolean => {
    if (!fromToken || !toToken) {
      setError('Please select both tokens');
      return false;
    }

    if (fromToken === toToken) {
      setError('Cannot swap the same token');
      return false;
    }

    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      setError('Please enter a valid amount greater than 0');
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setError('');

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert(`Successfully swapped ${fromAmount} ${fromToken} to ${toAmount} ${toToken}`);
      // Reset form
      setFromAmount('');
      setToAmount('');
    } catch (err) {
      setError('Swap failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get token icon URL
  const getTokenIcon = (currency: string): string => {
    return `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${currency}.svg`;
  };

  if (isLoading) {
    return (
      <div className="swap-container">
        <div className="loading">Loading tokens...</div>
      </div>
    );
  }

  return (
    <div className="swap-container">
      <div className="swap-card">
        <h2 className="swap-title">Currency Swap</h2>
        
        <form onSubmit={handleSubmit} className="swap-form">
          {/* From Section */}
          <div className="swap-section">
            <label className="swap-label">From</label>
            <div className="input-group">
              <input
                type="number"
                className="amount-input"
                placeholder="0.00"
                value={fromAmount}
                onChange={(e) => handleFromAmountChange(e.target.value)}
                step="any"
                min="0"
              />
              <select
                className="token-select"
                value={fromToken}
                onChange={(e) => handleFromTokenChange(e.target.value)}
              >
                <option value="">Select token</option>
                {tokens.map((token) => (
                  <option key={token.currency} value={token.currency}>
                    {token.currency}
                  </option>
                ))}
              </select>
              {fromToken && (
                <img
                  src={getTokenIcon(fromToken)}
                  alt={fromToken}
                  className="token-icon"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
            </div>
            {fromToken && tokens.find((t) => t.currency === fromToken)?.price && (
              <div className="price-info">
                1 {fromToken} = ${tokens.find((t) => t.currency === fromToken)?.price?.toFixed(4)}
              </div>
            )}
          </div>

          {/* Swap Button */}
          <button
            type="button"
            className="swap-direction-btn"
            onClick={handleSwapTokens}
            disabled={!fromToken || !toToken}
          >
            ⇅
          </button>

          {/* To Section */}
          <div className="swap-section">
            <label className="swap-label">To</label>
            <div className="input-group">
              <input
                type="number"
                className="amount-input"
                placeholder="0.00"
                value={toAmount}
                readOnly
              />
              <select
                className="token-select"
                value={toToken}
                onChange={(e) => handleToTokenChange(e.target.value)}
              >
                <option value="">Select token</option>
                {tokens.map((token) => (
                  <option key={token.currency} value={token.currency}>
                    {token.currency}
                  </option>
                ))}
              </select>
              {toToken && (
                <img
                  src={getTokenIcon(toToken)}
                  alt={toToken}
                  className="token-icon"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
            </div>
            {toToken && tokens.find((t) => t.currency === toToken)?.price && (
              <div className="price-info">
                1 {toToken} = ${tokens.find((t) => t.currency === toToken)?.price?.toFixed(4)}
              </div>
            )}
          </div>

          {/* Exchange Rate */}
          {fromToken && toToken && fromAmount && (
            <div className="exchange-rate">
              Exchange Rate: 1 {fromToken} ≈{' '}
              {calculateToAmount('1', fromToken, toToken)} {toToken}
            </div>
          )}

          {/* Error Message */}
          {error && <div className="error-message">{error}</div>}

          {/* Submit Button */}
          <button
            type="submit"
            className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Swapping...' : 'Swap Tokens'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CurrencySwapForm;
