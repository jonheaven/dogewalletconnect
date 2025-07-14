import { useEffect, useState } from 'react';
import { MyDogeConnector } from '@/lib/MyDogeConnector';
import ConnectButton from '@/components/ConnectButton';
import BalanceDisplay from '@/components/BalanceDisplay';
import SignMessage from '@/components/SignMessage';
import SendTransaction from '@/components/SendTransaction';
import InscriptionsDisplay from '@/components/InscriptionsDisplay';

export default function Home() {
  const [connector, setConnector] = useState<MyDogeConnector | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const conn = new MyDogeConnector();
    setConnector(conn);
  }, []);

  const handleConnect = async () => {
    if (!connector) {
      setError('Connector not ready');
      return;
    }
    try {
      const { address, balance } = await connector.connect();
      setAddress(address);
      setBalance(balance);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleRefreshBalance = async () => {
    if (!connector || !address) return;
    try {
      const { balance } = await connector.getBalance();
      setBalance(balance);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div role="main" style={{ padding: '20px', textAlign: 'center' }}>
      <h1>MyDoge Wallet Connector Demo</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ConnectButton onConnect={handleConnect} connected={!!address} />
      {address && connector && (
        <>
          <p>Connected Address: {address}</p>
          <BalanceDisplay balance={balance} onRefresh={handleRefreshBalance} />
          <SignMessage connector={connector} />
          <SendTransaction connector={connector} />
          <InscriptionsDisplay connector={connector} defaultAddress={address} />
        </>
      )}
    </div>
  );
}