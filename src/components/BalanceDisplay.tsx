import { FC } from 'react';

interface BalanceDisplayProps {
  balance: string | null;
  onRefresh: () => void;
}

const BalanceDisplay: FC<BalanceDisplayProps> = ({ balance, onRefresh }) => {
  return (
    <div>
      <p>Balance: {balance ? balance : 'N/A'}</p>
      <button onClick={onRefresh}>Refresh Balance</button>
    </div>
  );
};

export default BalanceDisplay;