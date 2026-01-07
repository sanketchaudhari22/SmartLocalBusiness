# 🧪 Complete Installation & Testing Guide

## Your Frontend is Production-Ready! Let's Test It

This guide will walk you through installing, running, and testing the complete application end-to-end.

---

## 📋 Prerequisites Checklist

Before starting, ensure you have:

- [x] Windows 10/11
- [x] Node.js 18.17.0+ installed
- [x] npm 9.0.0+ installed
- [x] .NET 9.0 SDK installed (for backend)
- [x] SQL Server running
- [x] Git installed

**Verify installations:**
```bash
node --version    # Should be 18.17.0+
npm --version     # Should be 9.0.0+
dotnet --version  # Should be 9.0.0
```

---

## 🚀 Step-by-Step Installation

### Step 1: Navigate to Frontend Directory

```bash
cd C:\Users\SANKET\Desktop\SmartLocalBusiness\frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

**Expected Output:**
```
added 500+ packages in 2-3 minutes
```

**If you see errors:**
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

### Step 3: Verify Installation

```bash
npm run type-check
```

**Expected Output:**
```
No errors found
```

---

## ⚙️ Backend Setup

### Step 1: Start SQL Server

Make sure SQL Server is running.

### Step 2: Update Connection Strings

Edit `Backend/Services/UserService/appsettings.json` (and all other services):

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=SmartLocalBusiness;Trusted_Connection=true;TrustServerCertificate=true;"
  }
}
```

### Step 3: Run Database Migrations

```bash
cd C:\Users\SANKET\Desktop\SmartLocalBusiness\Backend\Common\Infrastructure
dotnet ef database update
```

### Step 4: Start Backend Services

Open **5 separate terminals** and run:

**Terminal 1 - API Gateway (Port 5005):**
```bash
cd C:\Users\SANKET\Desktop\SmartLocalBusiness\Backend\Services\ApiGateway
dotnet run
```

Wait for: `Now listening on: http://localhost:5005`

**Terminal 2 - User Service (Port 5000):**
```bash
cd C:\Users\SANKET\Desktop\SmartLocalBusiness\Backend\Services\UserService
dotnet run
```

**Terminal 3 - Business Service (Port 5001):**
```bash
cd C:\Users\SANKET\Desktop\SmartLocalBusiness\Backend\Services\BusinessService
dotnet run
```

**Terminal 4 - Booking Service (Port 5002):**
```bash
cd C:\Users\SANKET\Desktop\SmartLocalBusiness\Backend\Services\BookingService
dotnet run
```

**Terminal 5 - Search Service (Port 5003):**
```bash
cd C:\Users\SANKET\Desktop\SmartLocalBusiness\Backend\Services\SearchService
dotnet run
```

### Step 5: Verify Backend is Running

Open browser: `http://localhost:5005/swagger`

You should see the Swagger API documentation.

---

## 🎯 Start Frontend

Open a **new terminal**:

```bash
cd C:\Users\SANKET\Desktop\SmartLocalBusiness\frontend
npm run dev
```

**Expected Output:**
```
  ▲ Next.js 14.2.18
  - Local:        http://localhost:3000
  - Environments: .env.local

 ✓ Ready in 1.2s
```

Open browser: **http://localhost:3000**

---

## 🧪 Complete Testing Checklist

### ✅ Test 1: Landing Page

**URL:** http://localhost:3000

**What to Check:**
- [ ] Page loads without errors
- [ ] Hero section displays
- [ ] Search bar is visible
- [ ] "Browse" button works
- [ ] "Login" and "Sign Up" buttons are visible
- [ ] Footer is present
- [ ] No console errors (F12 → Console tab)

**Screenshot should show:**
- Professional hero section
- Search bar
- Features grid (6 cards)
- CTA section with blue background
- Footer with links

---

### ✅ Test 2: Registration Flow (Customer)

**URL:** http://localhost:3000/register

**Steps:**
1. Click "Sign Up" button from homepage
2. Fill in the form:
   - **I am a:** Customer
   - **First Name:** John
   - **Last Name:** Doe
   - **Email:** john.doe@test.com
   - **Phone:** (555) 123-4567
   - **Password:** password123
   - **Confirm Password:** password123
   - [ ] Check "I agree to terms"
3. Click "Create Account"

**Expected Behavior:**
- [ ] Form validates (shows errors if fields are empty)
- [ ] Password must match confirmation
- [ ] On success: Green toast "Registration successful!"
- [ ] Redirects to homepage (/)
- [ ] Navbar shows user avatar with initials "JD"

**If API Error:**
- Check backend is running
- Check console for CORS errors
- Verify `.env.local` has correct API URL

---

### ✅ Test 3: Registration Flow (Business Owner)

**Steps:**
1. Go to http://localhost:3000/register
2. Fill in form:
   - **I am a:** Business Owner
   - **First Name:** Jane
   - **Last Name:** Smith
   - **Email:** jane.smith@business.com
   - **Password:** password123
   - **Confirm Password:** password123
3. Click "Create Account"

**Expected Behavior:**
- [ ] On success: Redirects to `/business/dashboard`
- [ ] Shows business owner dashboard
- [ ] "Add Business" button visible

---

### ✅ Test 4: Login Flow

**URL:** http://localhost:3000/login

**Steps:**
1. Enter credentials from registration:
   - **Email:** john.doe@test.com
   - **Password:** password123
2. Click "Sign In"

**Expected Behavior:**
- [ ] Shows "Signing in..." loading state
- [ ] Green toast "Login successful!"
- [ ] Redirects based on user type:
   - Customer → /
   - Business Owner → /business/dashboard
   - Admin → /admin/dashboard
- [ ] Navbar shows user avatar
- [ ] Dropdown menu works (click avatar)

---

### ✅ Test 5: Customer Dashboard

**URL:** http://localhost:3000/dashboard

**Prerequisites:** Logged in as Customer

**What to Check:**
- [ ] Protected route works (redirects to login if not authenticated)
- [ ] Shows "Welcome back, John!"
- [ ] Stats cards show:
   - Upcoming Bookings: 0
   - Past Bookings: 0
   - Reviews Written: 0
   - Favorite Places: 0
- [ ] "Browse Services" button visible
- [ ] No console errors

---

### ✅ Test 6: Business Owner Dashboard

**URL:** http://localhost:3000/business/dashboard

**Prerequisites:** Logged in as Business Owner

**What to Check:**
- [ ] Shows "Business Dashboard"
- [ ] "Add Business" button visible
- [ ] Stats cards display:
   - Total Businesses: 0
   - Monthly Revenue: $0.00
   - Total Bookings: 0
   - Average Rating: 0.0
- [ ] "No businesses yet" message if empty
- [ ] "Create Business" CTA button

---

### ✅ Test 7: Search Page

**URL:** http://localhost:3000/search

**Steps:**
1. Go to search page
2. Enter "restaurant" in search bar
3. Click "Search" button

**Expected Behavior:**
- [ ] Loading spinner appears
- [ ] If no data: "No results found" message
- [ ] Filters work:
   - [ ] Category dropdown
   - [ ] Rating filter
- [ ] Results display as cards
- [ ] Each card shows:
   - Business name
   - Rating with stars
   - Description
   - Location
   - "View Details" button

---

### ✅ Test 8: Protected Routes

**Test unauthorized access:**

1. **Logout** (click avatar → Log out)
2. Try to access: http://localhost:3000/dashboard

**Expected Behavior:**
- [ ] Redirects to `/login`
- [ ] Shows loading spinner briefly
- [ ] Cannot access dashboard without login

3. **Login as Customer**
4. Try to access: http://localhost:3000/admin/dashboard

**Expected Behavior:**
- [ ] Shows "Access Denied" message
- [ ] Cannot access admin dashboard

---

### ✅ Test 9: User Avatar Dropdown

**Prerequisites:** Logged in

**Steps:**
1. Click on avatar in navbar
2. Check dropdown menu items:
   - [ ] Shows user name and email
   - [ ] "Dashboard" link
   - [ ] "Profile" link
   - [ ] "Settings" link
   - [ ] "Log out" button (red text)

3. Click "Log out"

**Expected Behavior:**
- [ ] Shows "Logged out successfully" toast
- [ ] Redirects to homepage
- [ ] Navbar shows "Login" and "Sign Up" buttons again
- [ ] Avatar disappears

---

### ✅ Test 10: Form Validation

**URL:** http://localhost:3000/register

**Test empty submission:**
1. Click "Create Account" without filling form

**Expected Behavior:**
- [ ] Shows validation errors:
   - "Invalid email address"
   - "Password must be at least 6 characters"
   - "First name must be at least 2 characters"

**Test password mismatch:**
1. Fill form with mismatched passwords:
   - Password: "password123"
   - Confirm: "password456"
2. Click "Create Account"

**Expected Behavior:**
- [ ] Shows "Passwords don't match" error

---

### ✅ Test 11: Responsive Design

**Test on different screen sizes:**

1. **Desktop (1920x1080):**
   - [ ] Navbar spreads full width
   - [ ] 3-column layout for business cards
   - [ ] All content visible

2. **Tablet (768px):**
   - Press F12 → Toggle device toolbar → Select "iPad"
   - [ ] 2-column layout
   - [ ] Navbar still works
   - [ ] Cards resize properly

3. **Mobile (375px):**
   - Select "iPhone SE"
   - [ ] Single column layout
   - [ ] Hamburger menu (if implemented)
   - [ ] Cards stack vertically
   - [ ] Text is readable

---

### ✅ Test 12: API Integration

**Check Network Tab:**

1. Open DevTools (F12) → Network tab
2. Login as customer
3. Check requests:
   - [ ] POST `/api/users/login` → Status 200
   - [ ] Returns `{ token, user }` object
   - [ ] Token stored in localStorage

4. Go to dashboard
5. Check requests:
   - [ ] GET `/api/bookings/user/{id}/upcoming` → Status 200
   - [ ] GET `/api/bookings/user/{id}/history` → Status 200
   - [ ] Authorization header includes "Bearer {token}"

---

## 🐛 Common Issues & Fixes

### Issue 1: "Cannot find module '@/components/ui/...'"

**Solution:**
```bash
cd frontend
npm install
```

### Issue 2: "ECONNREFUSED localhost:5005"

**Cause:** Backend not running

**Solution:**
1. Start API Gateway: `cd Backend/Services/ApiGateway && dotnet run`
2. Check it's on port 5005
3. Verify `.env.local` has correct URL

### Issue 3: "Hydration failed" error

**Cause:** SSR mismatch (localStorage accessed during render)

**Solution:** Already fixed in code with `useEffect`

### Issue 4: CORS Error

**Cause:** Backend not allowing frontend origin

**Solution:**
Edit `Backend/Services/UserService/Program.cs`:
```csharp
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});
```

Restart backend services.

### Issue 5: TypeScript Errors

**Solution:**
```bash
npm run type-check
```

Fix any errors shown.

### Issue 6: Slow Page Load

**This is normal in development!**

Production build is much faster:
```bash
npm run build
npm start
```

---

## ✅ Final Verification Checklist

Before considering testing complete:

- [ ] All 5 backend services running
- [ ] Frontend dev server running
- [ ] Can register new user
- [ ] Can login
- [ ] Can logout
- [ ] Protected routes work
- [ ] Customer dashboard loads
- [ ] Business owner dashboard loads
- [ ] Search page works
- [ ] Form validation works
- [ ] No console errors
- [ ] No network errors (check Network tab)
- [ ] Responsive on mobile/tablet
- [ ] User avatar dropdown works

---

## 📊 Performance Check

### Lighthouse Audit

1. Open http://localhost:3000
2. Press F12 → Lighthouse tab
3. Click "Analyze page load"

**Target Scores:**
- Performance: 70+ (dev mode) | 90+ (production)
- Accessibility: 90+
- Best Practices: 90+
- SEO: 80+

**Production Build:**
```bash
npm run build
npm start
```

Rerun Lighthouse → Should be 90+ for all!

---

## 🚀 Production Deployment Test

### Build for Production

```bash
cd frontend
npm run build
```

**Expected Output:**
```
Route (app)                              Size     First Load JS
┌ ○ /                                    5.2 kB          87.4 kB
├ ○ /login                               3.8 kB          85.9 kB
├ ○ /register                            4.1 kB          86.2 kB
└ ...

○  (Static)  prerendered as static content
```

### Test Production Build Locally

```bash
npm start
```

Visit http://localhost:3000 and test all features again.

---

## ✅ You're Ready When...

- [ ] All tests pass
- [ ] No console errors
- [ ] Backend connects successfully
- [ ] Authentication works end-to-end
- [ ] All dashboards load correctly
- [ ] Forms validate properly
- [ ] Search functionality works
- [ ] Production build succeeds
- [ ] Lighthouse score 90+

---

## 🎉 Success Criteria Met!

If all tests pass, congratulations! You have a **production-ready enterprise frontend**.

**Next Steps:**
1. Deploy backend to Azure/AWS
2. Deploy frontend to Vercel
3. Add custom domain
4. Set up monitoring
5. Add to resume
6. Show to recruiters!

---

**Testing Completed:** _____________ (Date)

**All Tests Passed:** Yes / No

**Ready for Production:** Yes / No

---

*For any issues, check `GETTING_STARTED.md` or create an issue.*
