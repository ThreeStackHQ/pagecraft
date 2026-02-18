# PageCraft 🎨

AI-powered landing page builder for indie hackers — from prompt to production-ready Next.js code.

## Features

- **AI Design Generation**: Describe your page, get a beautiful design via Google Stitch AI
- **Next.js Code Export**: Download production-ready Next.js + Tailwind code
- **Live Code Editor**: Monaco editor with instant preview
- **One-Click Deploy**: Deploy to Vercel with a single click
- **Template Library**: Pre-built templates for SaaS, portfolios, e-commerce, and blogs

## Tech Stack

- **Framework**: Next.js 14 (App Router), TypeScript
- **Styling**: TailwindCSS
- **AI Design**: Google Stitch MCP
- **Database**: PostgreSQL (Drizzle ORM)
- **Auth**: NextAuth.js v5
- **Code Editor**: Monaco Editor
- **Deployment**: Vercel SDK
- **State**: Zustand
- **Monorepo**: Turborepo

## Project Structure

```
pagecraft/
├── apps/
│   └── web/               # Next.js web app
├── packages/
│   ├── db/                # Database schema (Drizzle ORM)
│   ├── stitch-mcp/        # Google Stitch MCP client
│   ├── code-generator/    # Stitch → Next.js code transformer
│   └── config/            # Shared configs
├── turbo.json
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+
- PostgreSQL database

### Installation

```bash
# Install dependencies
pnpm install

# Setup environment variables
cp .env.example .env
# Fill in: DATABASE_URL, NEXTAUTH_SECRET, STITCH_API_KEY, etc.

# Run database migrations
pnpm --filter @pagecraft/db db:push

# Start development server
pnpm dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Development

```bash
# Run dev server
pnpm dev

# Build all packages
pnpm build

# Lint
pnpm lint

# Database studio
pnpm --filter @pagecraft/db db:studio
```

## Deployment

Deploy to Vercel:

```bash
# Install Vercel CLI
pnpm i -g vercel

# Deploy
vercel
```

Set environment variables in Vercel dashboard.

## Pricing

- **Free**: 3 projects, 5 exports/month
- **Pro ($29/mo)**: Unlimited projects, unlimited exports

## License

Proprietary — ThreeStack

## Support

- Email: team@threestack.io
- Website: [https://pagecraft.threestack.io](https://pagecraft.threestack.io)

---

Built by [ThreeStack](https://threestack.io) 🚀
