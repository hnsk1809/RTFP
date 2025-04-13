import React, { useState } from 'react';
import { Plus, Package } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useProductStore } from '../../store/productStore';

function SellerDashboard() {
  const user = useAuthStore((state) => state.user);
  const { addProduct, getSellerProducts } = useProductStore();
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const products = user ? getSellerProducts(user.id) : [];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const features = formData.get('features')?.toString().split('\n').filter(Boolean) || [];
    
    addProduct({
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      features,
      age: Number(formData.get('age')),
      condition: formData.get('condition') as 'new' | 'like-new' | 'good' | 'fair' | 'poor',
      startingPrice: Number(formData.get('startingPrice')),
      sellerId: user?.id || '',
      endTime: new Date(formData.get('endTime') as string),
      imageUrl: formData.get('imageUrl') as string
    });

    setIsAddingProduct(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
        <button
          onClick={() => setIsAddingProduct(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Gadget
        </button>
      </div>

      {isAddingProduct ? (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Gadget</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                id="description"
                name="description"
                rows={3}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="features" className="block text-sm font-medium text-gray-700">Features (one per line)</label>
              <textarea
                id="features"
                name="features"
                rows={4}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="4GB RAM&#10;128GB Storage&#10;5G Compatible"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age (in months)</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  min="0"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="condition" className="block text-sm font-medium text-gray-700">Condition</label>
                <select
                  id="condition"
                  name="condition"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="new">New</option>
                  <option value="like-new">Like New</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="startingPrice" className="block text-sm font-medium text-gray-700">Starting Price ($)</label>
                <input
                  type="number"
                  id="startingPrice"
                  name="startingPrice"
                  min="0"
                  step="0.01"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">Auction End Time</label>
                <input
                  type="datetime-local"
                  id="endTime"
                  name="endTime"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsAddingProduct(false)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Gadget
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
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
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-indigo-600">${product.currentPrice}</span>
                  <span className={`px-2 py-1 rounded text-sm ${
                    product.status === 'active' ? 'bg-green-100 text-green-800' :
                    product.status === 'ended' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center bg-white rounded-lg shadow p-6">
              <Package className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No gadgets listed</h3>
              <p className="text-gray-500">Get started by adding your first gadget for auction.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SellerDashboard;