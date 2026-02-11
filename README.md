This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Features

- 🤖 RAG (Retrieval-Augmented Generation) with vector search
- 📄 PDF document upload and processing
- 💬 AI-powered chat interface
- 🔐 Authentication with Better Auth
- 🗄️ PostgreSQL database with pgvector extension
- 🎨 Modern UI with Tailwind CSS and Radix UI

## Prerequisites

- Node.js 18+
- PostgreSQL database with pgvector extension (e.g., Neon)
- OpenAI API key
- pnpm (recommended) or npm

## Getting Started

### 1. Clone and Install Dependencies

```bash
pnpm install
```

### 2. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in your credentials:

```env
DATABASE_URL=postgresql://user:password@host:5432/database?sslmode=require
BETTER_AUTH_SECRET=your-random-secret-here
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
OPENAI_API_KEY=sk-your-openai-api-key-here
NODE_ENV=development
```

**Generate a secure secret:**

```bash
openssl rand -base64 32
```

### 3. Set Up Database

Push the database schema:

```bash
pnpm db:push:dev
```

Or generate and run migrations:

```bash
pnpm db:generate:dev
pnpm db:migrate:dev
```

### 4. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Production Deployment

### Prerequisites

1. **Database**: Set up a production PostgreSQL database with pgvector extension (Neon recommended)
2. **Domain**: Have your production domain ready
3. **API Keys**: Production OpenAI API key

### Step 1: Prepare Environment Variables

Create production environment variables based on `.env.production.example`:

```env
DATABASE_URL=postgresql://user:password@production-host:5432/database?sslmode=require
BETTER_AUTH_SECRET=your-production-secret-here-must-be-random-and-secure
BETTER_AUTH_URL=https://yourdomain.com
NEXT_PUBLIC_APP_URL=https://yourdomain.com
OPENAI_API_KEY=sk-your-production-openai-key
NODE_ENV=production
```

### Step 2: Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

**Important Vercel Settings:**

- Add all environment variables from `.env.production.example`
- Enable "Automatically expose System Environment Variables"

### Step 3: Run Database Migrations

After deployment, run migrations on your production database:

```bash
# Using Drizzle Studio (recommended)
pnpm db:studio

# Or push schema directly (use with caution)
DATABASE_URL="your-production-url" pnpm db:push:dev
```

### Alternative Deployment Options

#### Docker (Coming Soon)

```bash
# Build
docker build -t my-rag-app .

# Run
docker run -p 3000:3000 --env-file .env.production my-rag-app
```

#### Manual/VPS Deployment

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

Make sure to:

- Set all environment variables
- Use a process manager (PM2, systemd)
- Set up a reverse proxy (nginx, caddy)
- Configure SSL certificates

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/         # Better Auth endpoints
│   │   └── chat/         # Chat API with RAG
│   ├── chat/             # Chat page
│   ├── upload/           # PDF upload page
│   └── (auth)/           # Authentication pages
├── components/            # React components
│   ├── ui/               # UI components (shadcn)
│   └── navbar.tsx        # Navigation bar
├── db/                    # Database
│   ├── schema.ts         # Drizzle schema (documents)
│   ├── auth-schema.ts    # Auth tables schema
│   └── index.ts          # Database client
├── lib/                   # Utilities
│   ├── auth.ts           # Better Auth config
│   ├── auth-client.ts    # Client-side auth
│   ├── embeddings.ts     # OpenAI embeddings
│   ├── search.ts         # Vector search
│   └── chunking.ts       # Document chunking
├── features/              # Feature modules
│   └── auth/             # Auth components & actions
└── middleware.ts          # Auth middleware
```

## Environment Variables Reference

| Variable              | Description                                | Required |
| --------------------- | ------------------------------------------ | -------- |
| `DATABASE_URL`        | PostgreSQL connection string with pgvector | ✅       |
| `BETTER_AUTH_SECRET`  | Secret for auth sessions (min 32 chars)    | ✅       |
| `BETTER_AUTH_URL`     | Your app's base URL                        | ✅       |
| `NEXT_PUBLIC_APP_URL` | Public-facing app URL (client-side)        | ✅       |
| `OPENAI_API_KEY`      | OpenAI API key for embeddings & chat       | ✅       |
| `NODE_ENV`            | Environment (development/production)       | ✅       |

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm check` - Run both typecheck and lint
- `pnpm db:generate:dev` - Generate database migrations
- `pnpm db:push:dev` - Push schema to database
- `pnpm db:migrate:dev` - Run migrations
- `pnpm db:studio` - Open Drizzle Studio

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Better Auth](https://better-auth.com/)
- [OpenAI API](https://platform.openai.com/docs)
- [pgvector](https://github.com/pgvector/pgvector)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)

## Security Considerations

- Never commit `.env.local` or `.env.production` files
- Use strong, randomly generated secrets (min 32 characters)
- Enable SSL in production
- Keep dependencies updated
- Use environment-specific API keys
- Implement rate limiting for production
- Monitor API usage and costs

## Troubleshooting

### Database Connection Issues

- Verify `DATABASE_URL` format
- Ensure pgvector extension is installed
- Check SSL mode requirements

### Authentication Issues

- Verify `BETTER_AUTH_URL` matches your domain
- Check `BETTER_AUTH_SECRET` is set
- Clear browser cookies and try again

### Build Errors

- Run `pnpm typecheck` to find TypeScript errors
- Ensure all environment variables are set
- Check Node.js version compatibility

## Support

For issues and questions:

- [Next.js GitHub](https://github.com/vercel/next.js)
- [Better Auth Docs](https://better-auth.com/)
- [Drizzle Discord](https://discord.gg/drizzle)
