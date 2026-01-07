'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/stores';
import { UserType } from '@/types';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserType[];
  redirectTo?: string;
}

/**
 * Protected Route Wrapper
 * Redirects to login if not authenticated
 * Redirects to home if user doesn't have required role
 */
export function ProtectedRoute({
  children,
  allowedRoles,
  redirectTo = '/login',
}: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // Not authenticated - redirect to login
    if (!isAuthenticated || !user) {
      router.push(redirectTo);
      return;
    }

    // Check role permissions
    if (allowedRoles && allowedRoles.length > 0) {
      if (!allowedRoles.includes(user.userType)) {
        // User doesn't have permission - redirect to home
        router.push('/');
        return;
      }
    }
  }, [isAuthenticated, user, allowedRoles, redirectTo, router]);

  // Show loading while checking auth
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Check role permissions
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.userType)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-muted-foreground">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
