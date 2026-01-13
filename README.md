# Solana Shopping App

A Next.js e-commerce application with Solana wallet integration, supporting both direct on-chain payments and x402 HTTP-based payments.

## Features

- 🔗 **Solana Wallet Integration**: Connect Phantom, Solflare, and other Solana wallets
- 💳 **Dual Payment Methods**: 
  - Direct Solana wallet payments (on-chain transactions)
  - x402 HTTP-based payments for agentic commerce
- 🔍 **Unified Search & Discovery**: Multi-provider search layer
  - **SERP API** ⭐ **MOST COMPLETE**: Comprehensive search with inline shopping, autocomplete, images, news, videos, knowledge graph, related questions, and people also ask
  - **Firecrawl**: Web scraping, crawling, mapping, and content extraction with Scrape, Extract, Crawl, and Map operations
  - **Exa AI**: Neural search with embeddings-based results
  - **Grok (XAI)**: Live search with real-time results
  - **Tavily**: Advanced search with research, extraction, and crawling capabilities
  - **Inline Images**: Product images displayed in search results
  - **Shopping Results**: Product listings with prices, ratings, and reviews
  - **Review Extraction**: Automatic product review aggregation
  - **Autocomplete**: AI-powered search suggestions via SERP
  - **Redis Caching**: Upstash Redis for fast, cached search results
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

# Exa API Key (Required for Exa search)
NEXT_PUBLIC_EXA_API_KEY=your_exa_api_key_here

# SERP API Key (Optional, for traditional search and shopping)
NEXT_PUBLIC_SERP_API_KEY=your_serp_api_key_here

# XAI API Key (Optional, for Grok live search)
NEXT_PUBLIC_XAI_API_KEY=your_xai_api_key_here

# SERP API Key (Recommended - Most complete search provider)
NEXT_PUBLIC_SERP_API_KEY=your_serp_api_key_here

# Tavily API Key (Optional, for advanced search and research)
NEXT_PUBLIC_TAVILY_API_KEY=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

# Firecrawl API Key (Optional, for web scraping and crawling)
NEXT_PUBLIC_FIRECRAWL_API_KEY=fc-9f8fa1f901294937ab570243b7317d70

# Upstash Redis (Required for caching)
UPSTASH_REDIS_URL=https://top-elephant-38278.upstash.io
UPSTASH_REDIS_TOKEN=AZWGAAIncDJjYjRlOTZhYzQyMGM0MmRmYWY3NzYwNzlkNGNhNTIwY3AyMzgyNzg

# OpenRouter API Key (optional, for AI product discovery)
NEXT_PUBLIC_OPENROUTER_API_KEY=your_openrouter_key_here

# Google Custom Search API (optional, for product search)
NEXT_PUBLIC_GOOGLE_API_KEY=your_google_api_key_here
NEXT_PUBLIC_GOOGLE_SEARCH_ENGINE_ID=your_search_engine_id_here
```

See [SEARCH_SETUP.md](./SEARCH_SETUP.md) for detailed search configuration.

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

### Unified Search & Discovery

1. Enter a search query on the home page
2. Configure search options (images, shopping, providers)
3. Click "Search" to query across Exa, SERP, and Grok
4. Browse results in tabs: All, Products, Images, Reviews
5. View rich result cards with images, prices, ratings, and highlights

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
