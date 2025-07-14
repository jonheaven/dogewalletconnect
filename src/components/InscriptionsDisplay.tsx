import { FC, useEffect, useState } from 'react';
import { WalletConnector } from '@/lib/WalletConnector';

interface InscriptionsDisplayProps {
  connector: WalletConnector;
  defaultAddress: string | null;
}

const InscriptionsDisplay: FC<InscriptionsDisplayProps> = ({ connector, defaultAddress }) => {
  const [inscriptions, setInscriptions] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchInscriptions = async () => {
    if (!defaultAddress) {
      setError('Connect wallet to fetch inscriptions.');
      return;
    }
    try {
      const result = await connector.getInscriptions(defaultAddress);
      setInscriptions(result);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (defaultAddress) {
      fetchInscriptions();
    }
  }, [defaultAddress]);

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Doginals / Inscriptions (NFTs)</h2>
      <p>Total NFTs: {inscriptions.length}</p>
      <button onClick={fetchInscriptions}>Refresh Inscriptions</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {inscriptions.length > 0 && (
        <ul>
          {inscriptions.map((ins, index) => (
            <li key={index} style={{ marginBottom: '20px' }}>
              <strong>Inscription ID:</strong> {ins.inscriptionId}<br />
              <strong>Collection:</strong> {ins.nft.collectionId} / {ins.nft.itemName} (#{ins.nft.itemId})<br />
              <img
                src={`https://api.doggy.market/inscriptions/${ins.inscriptionId}/content`}
                alt={ins.nft.itemName}
                style={{ width: '100px', height: 'auto', marginTop: '5px' }}
              /><br />
              <strong>Attributes:</strong>
              <ul>
                {Object.entries(ins.nft.attributes || {}).map(([key, value]: [string, any]) => (
                  <li key={key}>{key}: {value}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InscriptionsDisplay;