import { useAuthStore } from '@/store';

export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    clearError
  } = useAuthStore();

  const isAdmin = user?.userType === 'Admin';
  const isOwner = user?.userType === 'Owner';
  const isCustomer = user?.userType === 'Customer';

  return {
    user,
    isAuthenticated,
    loading,
    error,
    isAdmin,
    isOwner,
    isCustomer,
    login,
    register,
    logout,
    clearError
  };
};
