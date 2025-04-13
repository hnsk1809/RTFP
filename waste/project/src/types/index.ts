export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'seller' | 'bidder';
}

export interface Product {
  id: string;
  title: string;
  description: string;
  features: string[];
  age: number;
  condition: 'new' | 'like-new' | 'good' | 'fair' | 'poor';
  startingPrice: number;
  currentPrice: number;
  sellerId: string;
  endTime: Date;
  imageUrl: string;
  status: 'active' | 'ended' | 'sold';
  bids: Bid[];
  winnerId?: string;
  commission?: number;
}

export interface Bid {
  id: string;
  productId: string;
  bidderId: string;
  bidderName: string;
  amount: number;
  timestamp: Date;
  isAutoBid: boolean;
  maxAutoBidAmount?: number;
}
