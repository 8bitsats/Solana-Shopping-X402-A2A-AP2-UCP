// app/page.tsx - Updated Home Page with Wallet Button
'use client';
import { useState } from 'react';
import axios from 'axios';
import { WalletButton } from '../components/WalletButton';

interface Product {
  title: string;
  link: string;
  snippet?: string;
  displayLink?: string;
}

export default function Home() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const discoverProducts = async () => {
    if (!query.trim()) {
      setError('Please enter a search query');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // AI-powered product discovery using OpenRouter
      if (process.env.NEXT_PUBLIC_OPENROUTER_API_KEY) {
        try {
          const aiResponse = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
              model: 'anthropic/claude-3-haiku',
              messages: [
                {
                  role: 'user',
                  content: `Discover products for: ${query}. Return a JSON array of product suggestions with title, description, and estimated price.`,
                },
              ],
            },
            {
              headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
              },
            }
          );

          console.log('AI Response:', aiResponse.data);
        } catch (aiError) {
          console.warn('AI discovery failed, continuing with search:', aiError);
        }
      }

      // Google Custom Search for products
      if (process.env.NEXT_PUBLIC_GOOGLE_API_KEY && process.env.NEXT_PUBLIC_GOOGLE_SEARCH_ENGINE_ID) {
        const searchResponse = await axios.get(
          `https://www.googleapis.com/customsearch/v1`,
          {
            params: {
              key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
              cx: process.env.NEXT_PUBLIC_GOOGLE_SEARCH_ENGINE_ID,
              q: `${query} products buy`,
            },
          }
        );

        if (searchResponse.data?.items) {
          setProducts(searchResponse.data.items);
        } else {
          setError('No products found. Please try a different search.');
        }
      } else {
        // Fallback: Mock products for demo
        setProducts([
          {
            title: `${query} - Premium Product`,
            link: '#',
            snippet: `High-quality ${query} available now`,
            displayLink: 'example.com',
          },
          {
            title: `${query} - Best Value`,
            link: '#',
            snippet: `Affordable ${query} with great features`,
            displayLink: 'example.com',
          },
        ]);
      }
    } catch (err: any) {
      console.error('Product discovery error:', err);
      setError(err.response?.data?.error?.message || 'Failed to discover products');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Product Discovery</h1>
        <WalletButton />
      </div>

      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && discoverProducts()}
            placeholder="Search products..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={discoverProducts}
            disabled={loading}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Searching...' : 'Discover'}
          </button>
        </div>
        {error && (
          <p className="mt-2 text-red-500 text-sm">{error}</p>
        )}
      </div>

      {products.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Search Results</h2>
          <ul className="space-y-4">
            {products.map((product, i) => (
              <li
                key={i}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold text-purple-600 mb-2">
                  {product.title}
                </h3>
                {product.snippet && (
                  <p className="text-gray-600 mb-2">{product.snippet}</p>
                )}
                {product.displayLink && (
                  <p className="text-sm text-gray-400">{product.displayLink}</p>
                )}
                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline mt-2 inline-block"
                >
                  View Product →
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {products.length === 0 && !loading && !error && (
        <div className="text-center py-12 text-gray-500">
          <p>Enter a search query to discover products</p>
        </div>
      )}
    </div>
  );
}
