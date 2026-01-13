// app/products/page.tsx - Products listing page
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Product {
  id: string;
  title: string;
  price: number;
  description?: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch from your API
    // For now, using mock data
    setProducts([
      { id: '1', title: 'Premium Product A', price: 0.5, description: 'High-quality product' },
      { id: '2', title: 'Product B', price: 0.3, description: 'Great value' },
      { id: '3', title: 'Product C', price: 1.0, description: 'Best seller' },
    ]);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading products...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
            {product.description && (
              <p className="text-gray-600 mb-4">{product.description}</p>
            )}
            <p className="text-2xl font-bold text-purple-600 mb-4">
              {product.price} SOL
            </p>
            <Link
              href={`/checkout?product=${product.id}`}
              className="block w-full text-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Add to Cart
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
