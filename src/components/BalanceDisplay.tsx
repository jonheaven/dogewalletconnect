import { FC } from 'react';

interface BalanceDisplayProps {
  balance: string | null;
  onRefresh: () => void;
}

const BalanceDisplay: FC<BalanceDisplayProps> = ({ balance, onRefresh }) => {
  // Convert satoshis to DOGE if balance is a valid number
  let displayBalance = 'N/A';
  if (balance && !isNaN(Number(balance))) {
    displayBalance = (Number(balance) / 1e8).toFixed(3);
  }
  return (
    <div>
      <p>Balance: {displayBalance} DOGE</p>
      <button onClick={onRefresh}>Refresh Balance</button>
    </div>
  );
};

export default BalanceDisplay;