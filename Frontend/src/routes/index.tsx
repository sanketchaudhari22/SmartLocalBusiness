import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/components/shared/ProtectedRoute';

// Auth Pages
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage';

// Home & Landing
import { HomePage } from '@/pages/home/HomePage';

// Business Pages
import { BusinessListPage } from '@/pages/business/BusinessListPage';
import { BusinessDetailPage } from '@/pages/business/BusinessDetailPage';
import { CreateBusinessPage } from '@/pages/business/CreateBusinessPage';
import { EditBusinessPage } from '@/pages/business/EditBusinessPage';
import { MyBusinessesPage } from '@/pages/business/MyBusinessesPage';

// Booking Pages
import { CreateBookingPage } from '@/pages/booking/CreateBookingPage';
import { MyBookingsPage } from '@/pages/booking/MyBookingsPage';

// Review Pages
import { CreateReviewPage } from '@/pages/review/CreateReviewPage';
import { MyReviewsPage } from '@/pages/review/MyReviewsPage';

// Search Pages
import { SearchPage } from '@/pages/search/SearchPage';

// User Pages
import { ProfilePage } from '@/pages/user/ProfilePage';
import { EditProfilePage } from '@/pages/user/EditProfilePage';

// Dashboard Pages
import { DashboardPage } from '@/pages/dashboard/DashboardPage';

// Admin Pages
import { AdminDashboard } from '@/pages/admin/AdminDashboard';
import { AdminUsers } from '@/pages/admin/AdminUsers';
import { AdminBusinesses } from '@/pages/admin/AdminBusinesses';
import { AdminCategories } from '@/pages/admin/AdminCategories';

// Error Pages
import { NotFoundPage } from '@/pages/errors/NotFoundPage';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Business Routes (Public) */}
      <Route path="/businesses" element={<BusinessListPage />} />
      <Route path="/businesses/:id" element={<BusinessDetailPage />} />
      <Route path="/search" element={<SearchPage />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile/edit"
        element={
          <ProtectedRoute>
            <EditProfilePage />
          </ProtectedRoute>
        }
      />

      {/* Bookings */}
      <Route
        path="/bookings/create/:businessId"
        element={
          <ProtectedRoute>
            <CreateBookingPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-bookings"
        element={
          <ProtectedRoute>
            <MyBookingsPage />
          </ProtectedRoute>
        }
      />

      {/* Reviews */}
      <Route
        path="/reviews/create/:businessId"
        element={
          <ProtectedRoute>
            <CreateReviewPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-reviews"
        element={
          <ProtectedRoute>
            <MyReviewsPage />
          </ProtectedRoute>
        }
      />

      {/* Business Owner */}
      <Route
        path="/businesses/create"
        element={
          <ProtectedRoute>
            <CreateBusinessPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/businesses/:id/edit"
        element={
          <ProtectedRoute>
            <EditBusinessPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-businesses"
        element={
          <ProtectedRoute>
            <MyBusinessesPage />
          </ProtectedRoute>
        }
      />

      {/* Admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute>
            <AdminUsers />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/businesses"
        element={
          <ProtectedRoute>
            <AdminBusinesses />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/categories"
        element={
          <ProtectedRoute>
            <AdminCategories />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};
