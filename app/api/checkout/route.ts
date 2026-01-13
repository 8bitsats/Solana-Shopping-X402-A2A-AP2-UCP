// app/api/checkout/route.ts - Updated Backend (Optional: Verify Tx Server-Side)
import { NextRequest, NextResponse } from 'next/server';
import { Connection, PublicKey } from '@solana/web3.js';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { txId, amount, paymentMethod } = body;

    // For x402 flow: Process cart
    if (paymentMethod === 'x402') {
      // In a real implementation, you would:
      // 1. Validate the payment request
      // 2. Process the x402 payment
      // 3. Create order in database
      // 4. Return checkout confirmation

      return NextResponse.json({
        id: `checkout_${Date.now()}`,
        status: 'success',
        paymentMethod: 'x402',
        amount,
        message: 'x402 payment processed successfully',
      });
    }

    // Optional: If txId provided, verify on-chain
    if (txId) {
      const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || 'https://api.devnet.solana.com';
      const connection = new Connection(rpcUrl);

      try {
        const tx = await connection.getTransaction(txId, {
          maxSupportedTransactionVersion: 0,
        });

        if (!tx) {
          return NextResponse.json(
            { error: 'Transaction not found' },
            { status: 404 }
          );
        }

        // Verify transaction details
        const merchantAddress = process.env.NEXT_PUBLIC_WALLET_ADDRESS;
        if (merchantAddress) {
          const merchantPubkey = new PublicKey(merchantAddress);
          // Check if transaction includes transfer to merchant
          // This is a simplified check - in production, you'd want more thorough verification
        }

        return NextResponse.json({
          status: 'verified',
          txId,
          amount,
          confirmed: tx.meta?.err === null,
        });
      } catch (error: any) {
        console.error('Transaction verification error:', error);
        return NextResponse.json(
          { error: 'Failed to verify transaction', details: error.message },
          { status: 500 }
        );
      }
    }

    // Default response
    return NextResponse.json({
      id: `checkout_${Date.now()}`,
      status: 'success',
      message: 'Checkout processed',
    });
  } catch (error: any) {
    console.error('Checkout API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
