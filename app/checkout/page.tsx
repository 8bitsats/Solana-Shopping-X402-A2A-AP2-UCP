// app/checkout/page.tsx - Updated Checkout with Wallet Payment
'use client';
import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { WalletButton } from '../../components/WalletButton';

export default function Checkout() {
  const { publicKey, signTransaction, connected } = useWallet();
  const [connection] = useState(
    () => new Connection(process.env.NEXT_PUBLIC_RPC_URL || 'https://api.devnet.solana.com')
  );
  const [paymentAmount, setPaymentAmount] = useState(0.01);
  const [merchantAddress, setMerchantAddress] = useState(
    process.env.NEXT_PUBLIC_WALLET_ADDRESS || ''
  );
  const [txStatus, setTxStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (publicKey) {
      console.log('Wallet connected:', publicKey.toString());
    }
  }, [publicKey]);

  const completeCheckoutWithWallet = async () => {
    if (!publicKey || !signTransaction) {
      alert('Please connect your wallet first.');
      return;
    }

    if (!merchantAddress) {
      alert('Merchant wallet address not configured. Please set NEXT_PUBLIC_WALLET_ADDRESS in your .env file.');
      return;
    }

    setLoading(true);
    setTxStatus('Preparing transaction...');

    try {
      const merchantPubkey = new PublicKey(merchantAddress);
      const lamports = paymentAmount * LAMPORTS_PER_SOL;

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: merchantPubkey,
          lamports,
        })
      );

      // Fetch recent blockhash
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      setTxStatus('Signing transaction...');

      // Sign and send
      const signedTx = await signTransaction(transaction);
      setTxStatus('Sending transaction...');

      const txId = await connection.sendRawTransaction(signedTx.serialize(), {
        skipPreflight: false,
      });

      setTxStatus('Confirming transaction...');

      await connection.confirmTransaction({
        blockhash,
        lastValidBlockHeight,
        signature: txId,
      });

      setTxStatus(`Payment successful! Transaction ID: ${txId}`);
      
      // Optionally send txId to backend for verification
      try {
        await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ txId, amount: paymentAmount }),
        });
      } catch (err) {
        console.warn('Failed to verify transaction on backend:', err);
      }
    } catch (error: any) {
      console.error('Payment failed:', error);
      setTxStatus(`Payment failed: ${error.message || 'Unknown error'}`);
      alert(`Payment failed: ${error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const completeCheckoutWithX402 = async () => {
    setLoading(true);
    setTxStatus('Processing x402 payment...');

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMethod: 'x402',
          amount: paymentAmount,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setTxStatus(`x402 payment successful! Checkout ID: ${data.id}`);
      } else {
        throw new Error(data.error || 'Payment failed');
      }
    } catch (error: any) {
      console.error('x402 payment failed:', error);
      setTxStatus(`x402 payment failed: ${error.message || 'Unknown error'}`);
      alert(`Payment failed: ${error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="mb-6">
        <WalletButton />
        {connected && publicKey && (
          <p className="mt-2 text-sm text-gray-600">
            Connected: {publicKey.toString().slice(0, 8)}...{publicKey.toString().slice(-8)}
          </p>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount (SOL)
          </label>
          <input
            type="number"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(parseFloat(e.target.value) || 0)}
            step="0.01"
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Merchant Wallet Address
          </label>
          <input
            type="text"
            value={merchantAddress}
            onChange={(e) => setMerchantAddress(e.target.value)}
            placeholder="Enter merchant wallet address"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {txStatus && (
          <div className={`p-4 rounded-lg mb-4 ${
            txStatus.includes('successful') 
              ? 'bg-green-50 text-green-800' 
              : txStatus.includes('failed')
              ? 'bg-red-50 text-red-800'
              : 'bg-blue-50 text-blue-800'
          }`}>
            <p className="text-sm">{txStatus}</p>
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={completeCheckoutWithWallet}
            disabled={loading || !connected}
            className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Pay with Solana Wallet'}
          </button>
          <button
            onClick={completeCheckoutWithX402}
            disabled={loading}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Pay with x402'}
          </button>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Payment Methods</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• <strong>Solana Wallet:</strong> Direct on-chain payment using your connected wallet</li>
          <li>• <strong>x402:</strong> HTTP-based payment protocol for agentic payments</li>
        </ul>
      </div>
    </div>
  );
}
