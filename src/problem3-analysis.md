# Problem 3: Messy React - Code Analysis

## Issues and Anti-patterns Found

### 1. **Undefined Variable `lhsPriority`**
- **Location**: Line in filter callback
- **Issue**: The variable `lhsPriority` is used but never defined. It should be `balancePriority`.
- **Impact**: This will cause a runtime error and break the application.

### 2. **Inverted Filter Logic**
- **Location**: Filter function in `sortedBalances`
- **Issue**: The filter returns `true` when `balance.amount <= 0`, which means it keeps balances with zero or negative amounts and filters out positive ones. This is the opposite of what's intended.
- **Impact**: Shows wrong balances to users.

### 3. **Unused `blockchain` Property**
- **Issue**: The code calls `getPriority(balance.blockchain)` but `WalletBalance` interface doesn't have a `blockchain` property.
- **Impact**: Will cause TypeScript errors and runtime issues.

### 4. **Missing Dependency in useMemo**
- **Location**: `sortedBalances` useMemo dependency array
- **Issue**: The callback uses `getPriority` function but doesn't include it in dependencies. Also `prices` is in dependencies but never used in the sorting/filtering logic.
- **Impact**: Stale closures and unnecessary re-renders.

### 5. **Redundant Computation**
- **Location**: `formattedBalances` calculation
- **Issue**: The `formattedBalances` array is computed but never used. The subsequent `rows` mapping uses `sortedBalances` instead of `formattedBalances`.
- **Impact**: Wasted computation on every render.

### 6. **Incorrect Type in Map Function**
- **Location**: `rows` mapping
- **Issue**: Maps over `sortedBalances` but types the parameter as `FormattedWalletBalance`, which has a `formatted` property that doesn't exist on `WalletBalance`.
- **Impact**: TypeScript error and potential runtime issues.

### 7. **Using Index as Key**
- **Location**: `<WalletRow key={index} />`
- **Issue**: Using array index as React key is an anti-pattern. If items reorder, React won't properly track them.
- **Impact**: Can cause rendering bugs and poor performance.

### 8. **Inefficient Re-renders**
- **Issue**: The `getPriority` function is defined inside the component, so it's recreated on every render.
- **Impact**: Breaks memoization and causes unnecessary re-computations.

### 9. **Inconsistent Return Values**
- **Location**: Sort comparator
- **Issue**: The sort function doesn't return a value when priorities are equal.
- **Impact**: Unstable sort behavior.

### 10. **Missing Props Type Definition**
- **Issue**: `Props extends BoxProps` but `BoxProps` is not imported or defined.
- **Impact**: TypeScript compilation error.

---

## Refactored Code

```typescript
import React, { useMemo } from 'react';

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string; // Added missing property
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

// Assuming BoxProps is imported from a UI library
interface Props {
  children?: React.ReactNode;
}

// Move getPriority outside component to prevent recreation
const getPriority = (blockchain: string): number => {
  switch (blockchain) {
    case 'Osmosis':
      return 100;
    case 'Ethereum':
      return 50;
    case 'Arbitrum':
      return 30;
    case 'Zilliqa':
      return 20;
    case 'Neo':
      return 20;
    default:
      return -99;
  }
};

const WalletPage: React.FC<Props> = ({ children, ...rest }) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  // Combine filtering, sorting, and formatting into a single memoized computation
  const formattedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        // Fixed: Keep balances with priority > -99 AND amount > 0
        return balancePriority > -99 && balance.amount > 0;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        // Fixed: Return 0 when equal for stable sorting
        return rightPriority - leftPriority;
      })
      .map((balance: WalletBalance): FormattedWalletBalance => ({
        ...balance,
        formatted: balance.amount.toFixed(2), // Better formatting with 2 decimals
      }));
  }, [balances]); // Removed 'prices' as it's not used in this computation

  // Memoize rows separately if prices might change independently
  const rows = useMemo(() => {
    return formattedBalances.map((balance: FormattedWalletBalance) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          key={balance.currency} // Use unique identifier instead of index
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    });
  }, [formattedBalances, prices]); // Proper dependencies

  return <div {...rest}>{rows}</div>;
};

export default WalletPage;
```

---

## Key Improvements

### 1. **Fixed Logic Errors**
- Corrected undefined variable `lhsPriority` to `balancePriority`
- Fixed inverted filter logic to keep positive balances
- Added missing `blockchain` property to interface

### 2. **Performance Optimizations**
- Moved `getPriority` outside component to prevent recreation
- Combined filter/sort/map operations into single memoized value
- Separated concerns: `formattedBalances` for data, `rows` for UI
- Proper dependency arrays in both `useMemo` hooks

### 3. **Better Sort Implementation**
- Simplified sort comparator: `rightPriority - leftPriority`
- Always returns a number for stable sorting

### 4. **Removed Redundant Code**
- Eliminated unused `formattedBalances` computation
- Streamlined the data transformation pipeline

### 5. **Fixed React Best Practices**
- Changed from index to unique identifier (`balance.currency`) as key
- Proper TypeScript types throughout
- Better decimal formatting (`.toFixed(2)`)

### 6. **Improved Memoization**
- Only includes actual dependencies
- Prevents unnecessary re-computations
- Better separation of concerns for caching

---

## Complexity Analysis

**Original Code:**
- Time: O(n log n) for sort + O(n) for filters/maps = O(n log n)
- Space: O(n) for filtered/sorted arrays
- Issues: Multiple passes over data, wasted computations

**Refactored Code:**
- Time: O(n log n) - same but single efficient pass
- Space: O(n) - optimized with proper memoization
- Benefits: Fewer re-renders, better cache utilization, cleaner code
