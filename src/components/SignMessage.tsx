import { FC, useState } from 'react';
import { WalletConnector } from '@/lib/WalletConnector';

interface SignMessageProps {
  connector: WalletConnector;
}

const SignMessage: FC<SignMessageProps> = ({ connector }) => {
  const [message, setMessage] = useState('');
  const [signed, setSigned] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSign = async () => {
    try {
      const { signedMessage } = await connector.signMessage(message);
      setSigned(signedMessage);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Sign Message</h2>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message to sign"
      />
      <button onClick={handleSign}>Sign</button>
      {signed && <p>Signed Message: {signed}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default SignMessage;