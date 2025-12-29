import React, { useMemo } from 'react';

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props {
  children?: React.ReactNode;
}

// Move getPriority outside component to prevent recreation on every render
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

// Mock hooks for demonstration
const useWalletBalances = (): WalletBalance[] => {
  // This would be your actual hook implementation
  return [];
};

const usePrices = (): Record<string, number> => {
  // This would be your actual hook implementation
  return {};
};

// Mock component for demonstration
const WalletRow: React.FC<{
  amount: number;
  usdValue: number;
  formattedAmount: string;
}> = () => null;

const WalletPage: React.FC<Props> = ({ children, ...rest }) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  // Combine filtering, sorting, and formatting into a single memoized computation
  const formattedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        // Keep only balances with valid priority and positive amounts
        return balancePriority > -99 && balance.amount > 0;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        // Sort by priority descending
        return rightPriority - leftPriority;
      })
      .map(
        (balance: WalletBalance): FormattedWalletBalance => ({
          ...balance,
          formatted: balance.amount.toFixed(2),
        })
      );
  }, [balances]);

  // Memoize rows separately to re-render only when prices or balances change
  const rows = useMemo(() => {
    return formattedBalances.map((balance: FormattedWalletBalance) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          key={balance.currency}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    });
  }, [formattedBalances, prices]);

  return <div {...rest}>{rows}</div>;
};

export default WalletPage;
