import { WalletConnector } from './WalletConnector';

export class MyDogeConnector extends WalletConnector {
  private doge: any | null = null;
  private initPromise: Promise<void>;
  private address: string | null = null;  // Cache the connected address for other methods

  constructor() {
    super();
    this.initPromise = this.initialize();
  }

  private async initialize(): Promise<void> {
    return new Promise((resolve) => {
      if ((window as any).doge) {
        this.doge = (window as any).doge;
        resolve();
      } else {
        window.addEventListener('doge#initialized', () => {
          this.doge = (window as any).doge;
          resolve();
        }, { once: true });

        // Fallback timeout if event doesn't fire (e.g., extension not installed)
        setTimeout(() => {
          if (!this.doge) {
            console.warn('MyDogeMask not detected after timeout.');
          }
          resolve();
        }, 3000);
      }
    });
  }

  private async ensureInitialized() {
    await this.initPromise;
    if (!this.doge) {
      throw new Error('MyDogeMask extension not detected or initialized.');
    }
  }

  async connect(): Promise<{ address: string; balance: string; publicKey?: string }> {
    await this.ensureInitialized();
    const res = await this.doge.connect();
    if (!res.approved) {
      throw new Error('Connection not approved.');
    }
    this.address = res.address;  // Cache address
    return { address: res.address, balance: res.balance, publicKey: res.publicKey };
  }

  async getBalance(): Promise<{ balance: string }> {
    await this.ensureInitialized();
    const res = await this.doge.getBalance();
    return { balance: res.balance };
  }

  async signMessage(message: string): Promise<{ signedMessage: string }> {
    await this.ensureInitialized();
    const res = await this.doge.requestSignedMessage({ message });
    return { signedMessage: res.signedMessage };
  }

  async sendTransaction(recipient: string, amount: number): Promise<{ txId: string }> {
    await this.ensureInitialized();
    const res = await this.doge.requestTransaction({ recipientAddress: recipient, dogeAmount: amount });
    return { txId: res.txId };
  }

  async getInscriptions(address: string): Promise<any[]> {
    if (!address) {
      throw new Error('Address is required to fetch inscriptions.');
    }
    // Use internal API endpoint (proxies to Doggy Market)
    const proxyUrl = `/api/nfts/${address}`;
    const response = await fetch(proxyUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch inscriptions: ${response.statusText}`);
    }
    const data = await response.json();
    if (data.total > 100) {
      console.warn('More than 100 NFTs; implement pagination for full list.');
    }
    return data.data || [];  // Array of NFTs with inscriptionId, nft details, etc.
  }
}