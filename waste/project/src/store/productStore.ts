import { create } from 'zustand';
import { Product, Bid } from '../types';

interface ProductState {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'status' | 'currentPrice' | 'bids'>) => void;
  getSellerProducts: (sellerId: string) => Product[];
  placeBid: (productId: string, bid: Omit<Bid, 'id' | 'timestamp'>) => void;
  endAuction: (productId: string) => void;
  getActiveProducts: () => Product[];
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  addProduct: (productData) => {
    const newProduct: Product = {
      id: crypto.randomUUID(),
      ...productData,
      currentPrice: productData.startingPrice,
      status: 'active',
      bids: [],
    };
    set((state) => ({ products: [...state.products, newProduct] }));
  },
  getSellerProducts: (sellerId) => {
    return get().products.filter(product => product.sellerId === sellerId);
  },
  placeBid: (productId, bidData) => {
    const newBid: Bid = {
      ...bidData,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    };
    
    set((state) => ({
      products: state.products.map(product => {
        if (product.id === productId) {
          const updatedBids = [...product.bids, newBid];
          const currentPrice = Math.max(newBid.amount, product.currentPrice);
          return { ...product, bids: updatedBids, currentPrice };
        }
        return product;
      })
    }));
  },
  endAuction: (productId) => {
    set((state) => ({
      products: state.products.map(product => {
        if (product.id === productId) {
          const winner = product.bids.reduce((prev: Bid, current: Bid) => 
            (prev.amount > current.amount) ? prev : current, {amount: 0} as Bid);
          return {
            ...product,
            status: winner.amount >= product.startingPrice ? 'sold' : 'ended',
            winnerId: winner.amount >= product.startingPrice ? winner.bidderId : undefined,
            commission: winner.amount * 0.02
          };
        }
        return product;
      })
    }));
  },
  getActiveProducts: () => {
    return get().products.filter(product => product.status === 'active');
  }
}));
