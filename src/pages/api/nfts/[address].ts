import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { address } = req.query;

  if (!address || typeof address !== 'string') {
    return res.status(400).json({ error: 'Address query parameter is required' });
  }

  try {
    const apiUrl = `https://api.doggy.market/wallet/${address}/nfts?offset=0&limit=100`;
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data.total > 100) {
      console.warn('More than 100 NFTs; implement pagination for full list.');
    }
    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch NFTs', details: err.message });
  }
}