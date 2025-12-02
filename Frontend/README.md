# Smart Local Business - Frontend

A modern, production-ready React frontend built with Vite, TypeScript, and Tailwind CSS for the Smart Local Business platform.

## 🚀 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Routing
- **Zustand** - State management
- **Axios** - HTTP client
- **Lucide React** - Icons

## 📁 Project Structure

```
src/
├── api/                    # API integration layer
├── components/            # Reusable React components
│   ├── common/           # Generic UI components
│   ├── layout/           # Layout components
│   ├── business/         # Business-specific components
│   ├── booking/          # Booking components
│   └── shared/           # Shared specialized components
├── pages/                # Page components
│   ├── auth/            # Authentication pages
│   ├── home/            # Home pages
│   ├── dashboard/       # Dashboard pages
│   └── ...
├── store/               # Zustand state management
├── types/               # TypeScript type definitions
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
└── config/              # Configuration files
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- Backend API Gateway running on `http://localhost:5000`

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies (already done):
```bash
npm install
```

3. Configure environment variables:
   - Development: `.env.development`
   - Production: `.env.production`

### Running the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🎨 Design System

The project uses a custom Tailwind CSS theme with:

- **Colors**: Primary (blue), Neutral (grays), Success, Warning, Error
- **Typography**: Consistent text styles (h1-h5, body, caption)
- **Components**: Pre-styled cards, buttons, forms, badges
- **Spacing**: Consistent padding and margins
- **Shadows**: Subtle elevation system

### Utility Classes

```css
.text-h1, .text-h2, .text-h3    /* Typography */
.btn-primary, .btn-secondary     /* Buttons */
.card, .card-hover              /* Cards */
.input-base                     /* Form inputs */
.badge-success, .badge-error    /* Status badges */
```

## 📡 API Integration

All backend API endpoints are configured in `src/api/`:

- **userApi** - User authentication and management
- **businessApi** - Business CRUD operations
- **bookingApi** - Booking management
- **reviewApi** - Review operations
- **searchApi** - Search and filters
- **categoryApi** - Category management
- **serviceApi** - Business services

## 🔐 Authentication

JWT-based authentication with automatic token injection:

- Login/Register flows
- Protected routes
- Automatic redirect on 401
- Token persistence with localStorage

## 🗺️ Routes

### Public Routes
- `/` - Landing page
- `/login` - User login
- `/register` - User registration

### Protected Routes (require authentication)
- `/dashboard` - User dashboard
- `/profile` - User profile
- `/my-bookings` - User bookings
- `/my-businesses` - Business owner dashboard (Owner only)

## 📦 State Management

Using Zustand for lightweight state management:

- **authStore** - Authentication state
- **uiStore** - UI state (toasts, modals)

## 🎯 Next Steps

### Immediate Development Tasks:

1. **Business Pages**:
   - Business list page with search/filters
   - Business detail page
   - Create/edit business forms

2. **Booking System**:
   - Booking creation flow
   - Booking history
   - Booking management

3. **Review System**:
   - Review form with rating stars
   - Review list display
   - Rating distribution charts

4. **Search Features**:
   - Advanced search page
   - Nearby businesses with map
   - Category filtering

5. **Admin Panel**:
   - User management
   - Business approvals
   - Category CRUD
   - Analytics dashboard

### Component Library Expansion:

- Modal component
- Dropdown component
- Pagination component
- Table component
- Date picker
- Image upload
- Map integration

## 🔧 Development Tips

1. **Path Aliases**: Use `@/` to import from `src/`:
   ```typescript
   import { Button } from '@/components/common/Button';
   ```

2. **TypeScript Types**: All backend DTOs are typed in `src/types/`

3. **Tailwind Classes**: Use the pre-defined utility classes in `src/index.css`

4. **API Calls**: Always use the API functions from `src/api/`

5. **State Management**: Use Zustand stores for global state

## 📝 Code Style

- Use functional components with TypeScript
- Prefer named exports over default exports (except App.tsx)
- Use Tailwind classes over custom CSS
- Follow the existing component structure
- Add proper TypeScript types for all props

## 🚨 Important Notes

- The API Gateway should be running before starting the frontend
- Update `.env.development` with your backend URL
- All routes are configured in `src/App.tsx`
- Protected routes automatically redirect to login

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Router](https://reactrouter.com)

---

**Built with ❤️ for Smart Local Business Platform**
