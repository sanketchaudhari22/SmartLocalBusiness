# 🚀 QUICK START GUIDE

## Smart Local Business - Frontend

---

## ⚡ Get Started in 3 Steps

### 1. Navigate to Frontend
```bash
cd C:\Users\SANKET\Desktop\SmartLocalBusiness\frontend
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open Browser
```
http://localhost:3000
```

---

## 🎯 What's Already Built

### ✅ Pages You Can Access Now:
- **/** - Beautiful landing page
- **/login** - Login form (try logging in!)
- **/register** - Registration form
- **/dashboard** - Dashboard (requires login)

### ✅ Features Working:
- User registration
- User login with JWT
- Protected routes (dashboard)
- Responsive navbar
- Error handling
- Loading states

---

## 📂 Project Files

```
frontend/
├── src/
│   ├── api/          → All backend API calls (userApi, businessApi, etc.)
│   ├── components/   → UI components (Button, Input, Card, Navbar)
│   ├── pages/        → Pages (Landing, Login, Register, Dashboard)
│   ├── store/        → Zustand stores (authStore, uiStore)
│   ├── types/        → TypeScript types (all backend DTOs)
│   └── App.tsx       → Main routing
│
├── .env.development  → API URL config
└── package.json      → Dependencies
```

---

## 🔧 Common Commands

```bash
# Start dev server (port 3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check for errors (will fail until we fix imports)
npm run build
```

---

## 🎨 How to Use Components

### Button Example
```tsx
import { Button } from '@/components/common/Button';

<Button variant="primary">Click Me</Button>
<Button variant="secondary" size="lg">Large Button</Button>
<Button variant="danger" isLoading>Deleting...</Button>
```

### Input Example
```tsx
import { Input } from '@/components/common/Input';

<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
  error={errors.email}
  required
/>
```

### Card Example
```tsx
import { Card } from '@/components/common/Card';

<Card variant="hover" onClick={handleClick}>
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>
```

---

## 🔌 How to Use APIs

### Example: Get All Businesses
```tsx
import { businessApi } from '@/api';

const fetchBusinesses = async () => {
  try {
    const response = await businessApi.getAllBusinesses();
    const businesses = response.data; // Already typed as BusinessDto[]
    setBusinesses(businesses);
  } catch (error) {
    console.error('Error:', error.message);
  }
};
```

### Example: Create Booking
```tsx
import { bookingApi } from '@/api';

const createBooking = async () => {
  const bookingData = {
    userId: 1,
    businessId: 5,
    serviceId: 3,
    bookingDate: '2025-12-15',
    notes: 'Please call before arriving'
  };

  const response = await bookingApi.createBooking(bookingData);
  console.log('Booking created:', response.data);
};
```

---

## 📦 State Management

### Using Auth Store
```tsx
import { useAuthStore } from '@/store';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuthStore();

  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user?.firstName}!</p>
      ) : (
        <button onClick={() => login(email, password)}>Login</button>
      )}
    </div>
  );
}
```

### Using UI Store (Toasts)
```tsx
import { useUIStore } from '@/store';

function MyComponent() {
  const { addToast } = useUIStore();

  const handleSuccess = () => {
    addToast({
      type: 'success',
      message: 'Business created successfully!'
    });
  };

  return <button onClick={handleSuccess}>Create Business</button>;
}
```

---

## 🎨 Tailwind Utility Classes

### Typography
```html
<h1 className="text-h1">Main Heading</h1>
<h2 className="text-h2">Subheading</h2>
<p className="text-body">Body text</p>
<span className="text-caption">Small text</span>
```

### Buttons
```html
<button className="btn-primary">Primary</button>
<button className="btn-secondary">Secondary</button>
<button className="btn-outline">Outline</button>
<button className="btn-ghost">Ghost</button>
<button className="btn-danger">Delete</button>
```

### Cards
```html
<div className="card">Basic card</div>
<div className="card-hover">Hoverable card</div>
<div className="card-bordered">Bordered card</div>
```

### Badges
```html
<span className="badge-success">Active</span>
<span className="badge-pending">Pending</span>
<span className="badge-error">Failed</span>
<span className="badge-info">Info</span>
```

### Forms
```html
<label className="label">Email Address</label>
<input className="input-base" type="email" />
<p className="error-text">Error message</p>
```

---

## 🛣️ How to Add New Routes

### Step 1: Create Page Component
```tsx
// src/pages/business/BusinessListPage.tsx
export const BusinessListPage = () => {
  return <div>Business List</div>;
};
```

### Step 2: Add Route in App.tsx
```tsx
import { BusinessListPage } from './pages/business/BusinessListPage';

// Inside <Routes>:
<Route path="/businesses" element={<BusinessListPage />} />
```

### For Protected Routes:
```tsx
<Route element={<ProtectedRoute />}>
  <Route path="/businesses" element={<BusinessListPage />} />
</Route>
```

---

## 🔍 Backend Integration

### API Gateway URL
Configured in `.env.development`:
```
VITE_API_GATEWAY_URL=http://localhost:5000
```

### All Available APIs:
```typescript
import {
  userApi,       // register, login, getUserById, updateUser
  businessApi,   // CRUD + filters
  bookingApi,    // CRUD + history
  reviewApi,     // CRUD + ratings
  searchApi,     // search, nearby, quick
  categoryApi,   // CRUD + stats
  serviceApi     // CRUD
} from '@/api';
```

---

## 📝 Next Steps - Build Your First Feature

### Example: Business List Page

**1. Create Component:**
```bash
# Create file: src/pages/business/BusinessListPage.tsx
```

**2. Add Code:**
```tsx
import { useState, useEffect } from 'react';
import { businessApi } from '@/api';
import { BusinessDto } from '@/types';
import { Card } from '@/components/common/Card';

export const BusinessListPage = () => {
  const [businesses, setBusinesses] = useState<BusinessDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {
      const response = await businessApi.getAllBusinesses();
      setBusinesses(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container-custom py-8">
      <h1 className="text-h1 mb-6">All Businesses</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {businesses.map((business) => (
          <Card key={business.businessId} variant="hover">
            <h3 className="text-h4">{business.businessName}</h3>
            <p className="text-body-sm text-neutral-600">{business.city}</p>
            <div className="mt-2">
              <span className="badge-info">{business.categoryName}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
```

**3. Add Route:**
```tsx
// In App.tsx
import { BusinessListPage } from './pages/business/BusinessListPage';

// Add route:
<Route path="/businesses" element={<BusinessListPage />} />
```

**4. Add to Navbar:**
```tsx
// In Navbar.tsx
<Link to="/businesses">Businesses</Link>
```

**Done! You now have a working business list page.** 🎉

---

## 🐛 Common Issues & Fixes

### Issue: "Module not found"
**Fix:** Make sure path alias is correct:
```tsx
// ✅ Correct
import { Button } from '@/components/common/Button';

// ❌ Wrong
import { Button } from '../components/common/Button';
```

### Issue: TypeScript errors
**Fix:** Check types are imported:
```tsx
import type { BusinessDto } from '@/types';
```

### Issue: API not working
**Fix:** Check backend is running on port 5000

---

## 📚 Documentation Files

- **README.md** - Setup instructions
- **FRONTEND_COMPLETE_GUIDE.md** - Full roadmap (all remaining features)
- **IMPLEMENTATION_STATUS.md** - What's done, what's next
- **QUICK_START.md** - This file (quick reference)

---

## 💡 Pro Tips

1. **Use TypeScript** - All types are already defined
2. **Use Tailwind** - Don't write custom CSS
3. **Follow Patterns** - Look at existing pages as examples
4. **Test Often** - Run dev server and test in browser
5. **Read Docs** - Check FRONTEND_COMPLETE_GUIDE.md for detailed examples

---

## 🎓 Learn by Example

**Want to understand how things work?**

1. Open `src/pages/auth/LoginPage.tsx` - See form handling
2. Open `src/store/authStore.ts` - See state management
3. Open `src/api/userApi.ts` - See API calls
4. Open `src/components/common/Button.tsx` - See component pattern

---

## ✨ You're Ready!

You have:
- ✅ Complete project setup
- ✅ All backend APIs integrated
- ✅ Working authentication
- ✅ UI component library
- ✅ Example pages
- ✅ Complete documentation

**Now start building! Follow FRONTEND_COMPLETE_GUIDE.md for the roadmap.** 🚀

---

**Happy Coding!** 💻
