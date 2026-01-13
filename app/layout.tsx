// app/layout.tsx - Updated Root Layout with Providers and Banner
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '../lib/providers';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Solana Shopping',
  description: 'Agentic E-commerce on Solana with x402 and Wallet Adapter',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <header className="w-full">
            <div className="w-full bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-white text-center">
              <h1 className="text-4xl font-bold mb-2">Solana Shopping</h1>
              <p className="text-lg">Agentic E-commerce powered by Solana</p>
            </div>
            <nav className="bg-gray-800 text-white p-4">
              <div className="container mx-auto flex gap-4 justify-center">
                <Link href="/" className="hover:text-purple-300">Home</Link>
                <span>|</span>
                <Link href="/products" className="hover:text-purple-300">Products</Link>
                <span>|</span>
                <Link href="/cart" className="hover:text-purple-300">Cart</Link>
                <span>|</span>
                <Link href="/checkout" className="hover:text-purple-300">Checkout</Link>
              </div>
            </nav>
          </header>
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
