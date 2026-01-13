// app/cart/page.tsx - Shopping cart page
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { WalletButton } from '../../components/WalletButton';

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    // Mock cart items - in real app, load from state/context
    { id: '1', title: 'Premium Product A', price: 0.5, quantity: 1 },
  ]);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(cartItems.filter((item) => item.id !== id));
    } else {
      setCartItems(
        cartItems.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <WalletButton />
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Link
            href="/products"
            className="text-purple-600 hover:underline"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b border-gray-200 pb-4"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-gray-600">
                      {item.price} SOL × {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <p className="font-semibold w-24 text-right">
                      {(item.price * item.quantity).toFixed(2)} SOL
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold">Total:</span>
                <span className="text-2xl font-bold text-purple-600">
                  {total.toFixed(2)} SOL
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Link
              href="/products"
              className="flex-1 text-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Continue Shopping
            </Link>
            <Link
              href="/checkout"
              className="flex-1 text-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
