# 🚀 Smart Local Business - Frontend

## Enterprise-Grade SaaS Platform for Local Business Discovery & Booking

A production-ready, type-safe Next.js 14 frontend built with modern best practices and industry-standard technologies.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Development Workflow](#development-workflow)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)
- [Architecture Overview](#architecture-overview)
- [Contributing](#contributing)

---

## ✨ Features

### User Features
- 🔐 **Secure Authentication** - JWT-based auth with automatic token refresh
- 🔍 **Advanced Search** - Filter by category, location, rating, and more
- 📍 **Location-Based Discovery** - Find businesses near you
- ⭐ **Reviews & Ratings** - Read and write authentic reviews
- 📅 **Instant Booking** - Schedule appointments in seconds
- 👤 **User Dashboard** - Manage bookings, reviews, and profile

### Business Owner Features
- 📊 **Business Dashboard** - Analytics and performance metrics
- 🏢 **Business Management** - Create and manage multiple businesses
- 💼 **Service Management** - Add, edit, and price services
- 📋 **Booking Management** - Accept, reject, and track bookings
- 📈 **Revenue Tracking** - Monitor earnings and trends

### Admin Features
- 🎛️ **Admin Dashboard** - System-wide analytics
- 👥 **User Management** - Manage all users
- 🏪 **Business Verification** - Approve and verify businesses
- 🗂️ **Category Management** - Create and manage categories

### Technical Features
- ✅ **100% Type-Safe** - Full TypeScript coverage
- 🎨 **Modern UI/UX** - shadcn/ui + Tailwind CSS
- 🚀 **Optimized Performance** - React Query caching, code splitting
- 📱 **Fully Responsive** - Mobile-first design
- 🌙 **Dark Mode Ready** - Theme support built-in
- ♿ **Accessible** - WCAG 2.1 compliant components
- 🔄 **Real-time Updates** - Optimistic UI updates
- 🎭 **Animations** - Smooth Framer Motion transitions

---

## 🛠️ Tech Stack

### Core
- **Next.js 14.2+** - React framework with App Router
- **React 18.3+** - UI library
- **TypeScript** - Type safety

### State Management
- **Zustand** - Client state (auth, UI, filters)
- **TanStack Query (React Query v5)** - Server state & caching

### API & Data
- **Axios** - HTTP client with interceptors
- **Zod** - Runtime validation

### UI & Styling
- **Tailwind CSS** - Utility-first CSS
- **shadcn/ui** - Accessible component library
- **Radix UI** - Headless UI primitives
- **Framer Motion** - Animations
- **Lucide React** - Icons

### Forms & Validation
- **React Hook Form** - Form state management
- **Zod** - Schema validation

### Developer Experience
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **TypeScript** - Static type checking

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.17.0 or higher
- **npm**: v9.0.0 or higher (or **yarn** / **pnpm**)
- **Git**: Latest version

Check versions:
```bash
node --version
npm --version
git --version
```

---

## 🚀 Installation

### 1. Clone the Repository

```bash
cd Desktop/SmartLocalBusiness/frontend
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages (~500MB, takes 2-3 minutes).

### 3. Configure Environment Variables

Create a `.env.local` file in the `frontend` directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your configuration:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5005/api

# Google Maps API Key (Get from: https://console.cloud.google.com/)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# NextAuth Configuration (for future OAuth)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate_with_openssl_rand_base64_32

# Environment
NODE_ENV=development
```

### 4. Verify Installation

```bash
npm run type-check
```

If no errors appear, you're ready to go!

---

## 🏃 Running the Project

### Development Mode

Start the development server with hot-reload:

```bash
npm run dev
```

The app will be available at:
- **Frontend**: http://localhost:3000
- **API**: http://localhost:5005/api (your backend)

### What You'll See

1. **Landing Page** at `/` - Hero section with search
2. **Login Page** at `/login` - User authentication
3. **Register Page** at `/register` - User registration
4. **Dashboard** at `/dashboard` - After login (role-based)

### First Time Setup

1. **Start your backend services**:
   ```bash
   cd Desktop/SmartLocalBusiness/Backend
   dotnet run --project Services/ApiGateway
   ```

2. **Start the frontend**:
   ```bash
   cd Desktop/SmartLocalBusiness/frontend
   npm run dev
   ```

3. **Open browser** to `http://localhost:3000`

4. **Create an account** at `/register`

5. **Login** and explore!

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router (Pages)
│   │   ├── layout.tsx         # Root layout with providers
│   │   ├── page.tsx           # Landing page
│   │   ├── login/page.tsx     # Login page
│   │   ├── register/page.tsx  # Register page
│   │   └── ...                # Other routes
│   │
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   └── ...
│   │   ├── common/            # Reusable components
│   │   ├── features/          # Feature-specific components
│   │   └── layout/            # Layout components
│   │
│   ├── lib/
│   │   ├── api/               # API clients
│   │   │   ├── client.ts      # Axios instance
│   │   │   ├── auth.api.ts    # Auth endpoints
│   │   │   ├── business.api.ts
│   │   │   └── ...
│   │   ├── hooks/             # React Query hooks
│   │   │   ├── use-auth.ts
│   │   │   ├── use-businesses.ts
│   │   │   └── ...
│   │   ├── stores/            # Zustand stores
│   │   │   ├── auth.store.ts
│   │   │   ├── ui.store.ts
│   │   │   └── ...
│   │   ├── utils/             # Utility functions
│   │   ├── validations/       # Zod schemas
│   │   └── providers/         # Context providers
│   │
│   ├── types/                 # TypeScript types
│   │   └── index.ts           # Global types
│   │
│   └── styles/                # Global CSS
│       └── globals.css        # Tailwind + custom styles
│
├── public/                    # Static assets
│   ├── images/
│   └── icons/
│
├── .env.local                 # Environment variables (git-ignored)
├── .env.example               # Environment template
├── package.json               # Dependencies & scripts
├── tsconfig.json              # TypeScript config
├── tailwind.config.ts         # Tailwind config
├── next.config.js             # Next.js config
├── .eslintrc.json             # ESLint rules
├── .prettierrc                # Prettier rules
└── README.md                  # This file
```

---

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server (http://localhost:3000) |
| `npm run build` | Build for production |
| `npm start` | Run production build |
| `npm run lint` | Lint code with ESLint |
| `npm run format` | Format code with Prettier |
| `npm run type-check` | Check TypeScript types |

---

## 🔐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:5005/api` |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps API key | `AIzaSy...` |
| `NEXTAUTH_URL` | NextAuth base URL | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | NextAuth secret key | `secret123` |
| `NODE_ENV` | Environment | `development` / `production` |

**Note:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

---

## 💻 Development Workflow

### 1. Code Style

We use **ESLint** and **Prettier** for consistent code style:

```bash
# Format code
npm run format

# Lint code
npm run lint
```

### 2. Type Checking

Always type-check before committing:

```bash
npm run type-check
```

### 3. Git Workflow

```bash
# Create a feature branch
git checkout -b feature/my-feature

# Make changes
# ...

# Format and lint
npm run format
npm run lint

# Type check
npm run type-check

# Commit
git add .
git commit -m "feat: add my feature"

# Push
git push origin feature/my-feature
```

### 4. Adding New Features

#### Adding a New Page

```bash
# Create page file
touch src/app/my-page/page.tsx
```

```tsx
'use client';

export default function MyPage() {
  return <div>My Page</div>;
}
```

#### Adding a New Component

```bash
# Create component file
touch src/components/common/my-component.tsx
```

```tsx
import { cn } from '@/lib/utils';

interface MyComponentProps {
  className?: string;
}

export function MyComponent({ className }: MyComponentProps) {
  return <div className={cn('', className)}>My Component</div>;
}
```

#### Adding a New API Endpoint

```typescript
// src/lib/api/my-resource.api.ts
import apiClient from './client';
import { MyResource } from '@/types';

export const myResourceApi = {
  getAll: async (): Promise<MyResource[]> => {
    const response = await apiClient.get<MyResource[]>('/my-resources');
    return response.data;
  },

  create: async (data: CreateMyResourceRequest): Promise<MyResource> => {
    const response = await apiClient.post<MyResource>('/my-resources', data);
    return response.data;
  },
};
```

#### Adding a React Query Hook

```typescript
// src/lib/hooks/use-my-resource.ts
import { useQuery } from '@tanstack/react-query';
import { myResourceApi } from '@/lib/api';

export function useMyResources() {
  return useQuery({
    queryKey: ['my-resources'],
    queryFn: () => myResourceApi.getAll(),
  });
}
```

---

## 🏗️ Building for Production

### 1. Build the Application

```bash
npm run build
```

This creates an optimized production build in the `.next` folder.

### 2. Test Production Build Locally

```bash
npm start
```

Visit `http://localhost:3000` to test.

### 3. Build Output

Next.js will show you:
- ✅ Route segments
- ✅ First Load JS sizes
- ✅ Performance metrics

Example:
```
Route (app)                              Size     First Load JS
┌ ○ /                                    5.2 kB          87.4 kB
├ ○ /login                               3.8 kB          85.9 kB
└ ○ /register                            4.1 kB          86.2 kB

○  (Static)  prerendered as static content
```

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

Vercel is built by the creators of Next.js and provides zero-config deployment.

#### Option 1: Deploy via CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

#### Option 2: Deploy via GitHub

1. Push code to GitHub
2. Go to https://vercel.com
3. Click "Import Project"
4. Select your repository
5. Add environment variables
6. Click "Deploy"

**Environment Variables to Add:**
- `NEXT_PUBLIC_API_URL` → Your production API URL
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` → Your Maps API key
- `NEXTAUTH_URL` → Your production URL
- `NEXTAUTH_SECRET` → Generate new secret for production

#### Production URL

After deployment, you'll get a URL like:
```
https://smart-local-business.vercel.app
```

### Deploy to Other Platforms

- **Netlify**: Similar to Vercel, supports Next.js
- **AWS Amplify**: Full AWS integration
- **Docker**: Use the included Dockerfile (to be created)

---

## 🏛️ Architecture Overview

### Data Flow

```
User Action
    ↓
React Component
    ↓
Custom Hook (useAuth, useBusinesses, etc.)
    ↓
React Query (Caching Layer)
    ↓
Axios Client (HTTP + JWT Interceptors)
    ↓
Backend API (.NET Microservices)
    ↓
SQL Server Database
```

### State Management

- **Server State**: React Query (API data, caching)
- **Client State**: Zustand (auth, UI, filters)
- **Form State**: React Hook Form (form inputs)
- **URL State**: Next.js routing (search params)

### Authentication Flow

1. User submits login form
2. `useAuth` hook calls `authApi.login()`
3. Backend returns `{ user, token }`
4. Token stored in Zustand + localStorage
5. Axios interceptor adds token to all requests
6. On 401, user is logged out and redirected

---

## 🧪 Testing (Future)

We plan to add:
- **Unit Tests**: Vitest
- **Component Tests**: React Testing Library
- **E2E Tests**: Playwright
- **API Tests**: MSW (Mock Service Worker)

---

## 📝 Common Issues & Solutions

### Issue: `Module not found: Can't resolve '@/...'`

**Solution**: TypeScript path alias issue. Run:
```bash
npm run type-check
```

### Issue: `Error: ECONNREFUSED localhost:5005`

**Solution**: Backend not running. Start your .NET services:
```bash
cd Backend
dotnet run --project Services/ApiGateway
```

### Issue: `Hydration failed` error

**Solution**: Ensure no conditional rendering based on `window` or `localStorage` without `useEffect`.

### Issue: ESLint errors

**Solution**: Auto-fix with:
```bash
npm run lint -- --fix
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📚 Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [React Query Docs](https://tanstack.com/query/latest)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Docs](https://ui.shadcn.com)
- [Zustand Docs](https://zustand.docs.pmnd.rs)

### Learning
- [Next.js Learn](https://nextjs.org/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Best Practices](https://react.dev/learn)

---

## 📄 License

This project is private and proprietary.

---

## 👨‍💻 Developer

**Built for 8+ LPA roles and client-ready deployments.**

---

## 🎯 Quick Start Checklist

- [ ] Clone repository
- [ ] Install dependencies (`npm install`)
- [ ] Copy `.env.example` to `.env.local`
- [ ] Add environment variables
- [ ] Start backend services
- [ ] Run `npm run dev`
- [ ] Open http://localhost:3000
- [ ] Create an account
- [ ] Start building!

---

**Last Updated:** December 2024

**Status:** 🟢 Production Ready (Foundation Complete)

---

*For questions or support, please create an issue in the repository.*
