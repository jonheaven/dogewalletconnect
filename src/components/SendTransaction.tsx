import { FC, useState } from 'react';
import { WalletConnector } from '@/lib/WalletConnector';

interface SendTransactionProps {
  connector: WalletConnector;
}

const SendTransaction: FC<SendTransactionProps> = ({ connector }) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState(0);
  const [txId, setTxId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async () => {
    try {
      const { txId } = await connector.sendTransaction(recipient, amount);
      setTxId(txId);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Send Transaction</h2>
      <input
        type="text"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="Recipient Address"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
        placeholder="Amount (DOGE)"
      />
      <button onClick={handleSend}>Send</button>
      {txId && <p>Transaction ID: {txId}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default SendTransaction;