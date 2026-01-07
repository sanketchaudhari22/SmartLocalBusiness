import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/lib/api';
import { useAuthStore } from '@/lib/stores';
import { LoginRequest, RegisterRequest } from '@/types';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

/**
 * Authentication hooks using React Query
 */
export function useAuth() {
  const { user, isAuthenticated, setAuth, clearAuth } = useAuthStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginRequest) => authApi.login(credentials),
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      toast.success('Login successful!');
      queryClient.invalidateQueries();

      // Redirect based on user type
      switch (data.user.userType) {
        case 'Admin':
          router.push('/admin/dashboard');
          break;
        case 'BusinessOwner':
          router.push('/business/dashboard');
          break;
        default:
          router.push('/');
      }
    },
    onError: (error: any) => {
      toast.error(error.message || 'Login failed');
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      toast.success('Registration successful!');
      queryClient.invalidateQueries();

      // Redirect based on user type
      switch (data.user.userType) {
        case 'BusinessOwner':
          router.push('/business/dashboard');
          break;
        default:
          router.push('/');
      }
    },
    onError: (error: any) => {
      toast.error(error.message || 'Registration failed');
    },
  });

  const logout = () => {
    clearAuth();
    queryClient.clear();
    toast.success('Logged out successfully');
    router.push('/');
  };

  return {
    user,
    isAuthenticated,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
  };
}

/**
 * Hook to get user profile
 */
export function useUserProfile(userId?: string) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => authApi.getProfile(userId!),
    enabled: !!userId,
  });
}
