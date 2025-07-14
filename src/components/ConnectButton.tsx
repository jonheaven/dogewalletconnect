import { FC } from 'react';

interface ConnectButtonProps {
  onConnect: () => void;
  connected: boolean;
}

const ConnectButton: FC<ConnectButtonProps> = ({ onConnect, connected }) => {
  return (
    <button onClick={onConnect} disabled={connected}>
      {connected ? 'Connected' : 'Connect MyDoge Wallet'}
    </button>
  );
};

export default ConnectButton;