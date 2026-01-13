# Solana Shopping App

A Next.js e-commerce application with Solana wallet integration, supporting both direct on-chain payments and x402 HTTP-based payments.

## Features

- 🔗 **Solana Wallet Integration**: Connect Phantom, Solflare, and other Solana wallets
- 💳 **Dual Payment Methods**: 
  - Direct Solana wallet payments (on-chain transactions)
  - x402 HTTP-based payments for agentic commerce
- 🔍 **AI-Powered Product Discovery**: Integration with OpenRouter AI and Google Custom Search
- 🛒 **Shopping Cart & Checkout**: Complete e-commerce flow
- ⚡ **Next.js 14**: Built with App Router and TypeScript

## Prerequisites

- Node.js 18+ and npm
- A Solana wallet (Phantom, Solflare, etc.) for testing
- (Optional) OpenRouter API key for AI product discovery
- (Optional) Google Custom Search API key for product search

## Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Create a `.env.local` file in the root directory:

```env
# Solana RPC Endpoint
NEXT_PUBLIC_RPC_URL=https://api.devnet.solana.com

# Merchant Wallet Address (for receiving payments)
NEXT_PUBLIC_WALLET_ADDRESS=your_merchant_wallet_address_here

# OpenRouter API Key (optional, for AI product discovery)
NEXT_PUBLIC_OPENROUTER_API_KEY=your_openrouter_key_here

# Google Custom Search API (optional, for product search)
NEXT_PUBLIC_GOOGLE_API_KEY=your_google_api_key_here
NEXT_PUBLIC_GOOGLE_SEARCH_ENGINE_ID=your_search_engine_id_here
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Connecting a Wallet

1. Click the "Select Wallet" button in the header
2. Choose your wallet (Phantom, Solflare, etc.)
3. Approve the connection in your wallet extension

### Making a Payment

1. Navigate to the Checkout page
2. Ensure your wallet is connected
3. Enter the payment amount in SOL
4. Choose your payment method:
   - **Pay with Solana Wallet**: Direct on-chain transaction
   - **Pay with x402**: HTTP-based payment protocol

### Product Discovery

1. Enter a search query on the home page
2. Click "Discover" to search for products
3. Results will appear below (requires API keys for full functionality)

## Project Structure

```
solana-shopping/
├── app/
│   ├── api/
│   │   └── checkout/
│   │       └── route.ts          # Checkout API endpoint
│   ├── checkout/
│   │   └── page.tsx              # Checkout page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout with providers
│   └── page.tsx                  # Home page
├── components/
│   └── WalletButton.tsx          # Wallet connection button
├── lib/
│   └── providers.tsx             # Solana wallet providers
└── package.json
```

## Configuration

### RPC Endpoint

By default, the app uses Solana devnet. To switch to mainnet:

```env
NEXT_PUBLIC_RPC_URL=https://api.mainnet-beta.solana.com
```

### Merchant Wallet

Set your merchant wallet address in `.env.local`:

```env
NEXT_PUBLIC_WALLET_ADDRESS=YourMerchantWalletAddressHere
```

## Development

### Build for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Security Notes

- Always use environment variables for sensitive keys
- Verify transactions server-side in production
- Use HTTPS in production
- Implement proper error handling and user feedback
- Consider rate limiting for API endpoints

## Production Considerations

- Switch to mainnet RPC endpoint
- Implement proper error handling
- Add transaction confirmation UI
- Implement order management
- Add proper logging and monitoring
- Set up CI/CD pipeline
- Add comprehensive testing

## Token Payments

For SPL token payments (e.g., USDC), you'll need to use `@solana/spl-token`:

```bash
npm install @solana/spl-token
```

Then modify the checkout flow to use token transfers instead of SOL transfers.

## License

MIT
