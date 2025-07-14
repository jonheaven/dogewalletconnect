export abstract class WalletConnector {
  abstract connect(): Promise<{ address: string; balance: string; publicKey?: string }>;

  abstract getBalance(): Promise<{ balance: string }>;

  abstract signMessage(message: string): Promise<{ signedMessage: string }>;

  abstract sendTransaction(recipient: string, amount: number): Promise<{ txId: string }>;

  abstract getInscriptions(address: string): Promise<any[]>;  // Requires address param now
}