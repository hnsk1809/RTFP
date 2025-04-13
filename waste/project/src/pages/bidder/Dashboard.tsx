import React, { useState } from 'react';
import { useProductStore } from '../../store/productStore';
import { useAuthStore } from '../../store/authStore';
// Simple date formatter since date-fns isn't installed
const formatDate = (date: Date) => {
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

function BidderDashboard() {
  const { getActiveProducts, placeBid } = useProductStore();
  const user = useAuthStore((state) => state.user);
  const [bidAmounts, setBidAmounts] = useState<Record<string, number>>({});

  const activeProducts = getActiveProducts();

  const handleBidSubmit = (productId: string) => {
    if (!user) return;
    if (!bidAmounts[productId] || bidAmounts[productId] <= 0) return;

    placeBid(productId, {
      productId,
      bidderId: user.id,
      bidderName: user.name,
      amount: bidAmounts[productId],
      isAutoBid: false
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Bidder Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {activeProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow p-6">
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="object-cover rounded-lg w-full h-48"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.title}</h3>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <div className="mb-2">
              <p className="text-sm text-gray-500">Ends: {formatDate(new Date(product.endTime))}</p>
              <p className="text-lg font-medium text-indigo-600">Current: ${product.currentPrice}</p>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min={product.currentPrice + 1}
                value={bidAmounts[product.id] || ''}
                onChange={(e) => setBidAmounts({
                  ...bidAmounts,
                  [product.id]: Number(e.target.value)
                })}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder={`Min $${product.currentPrice + 1}`}
              />
              <button
                onClick={() => handleBidSubmit(product.id)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Bid
              </button>
            </div>
          </div>
        ))}
      </div>

      {activeProducts.length === 0 && (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-600">No active auctions available</p>
        </div>
      )}
    </div>
  );
}

export default BidderDashboard;