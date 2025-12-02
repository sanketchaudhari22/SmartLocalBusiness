import { useEffect } from 'react';
import { useBusinessStore } from '@/store';
import { Business } from '@/types';

export const useBusiness = (businessId?: string) => {
  const {
    businesses,
    selectedBusiness,
    loading,
    error,
    fetchBusinesses,
    fetchBusinessById,
    createBusiness,
    updateBusiness,
    deleteBusiness,
    searchBusinesses,
    setSelectedBusiness,
    clearError
  } = useBusinessStore();

  useEffect(() => {
    if (businessId) {
      fetchBusinessById(businessId);
    }
  }, [businessId, fetchBusinessById]);

  return {
    businesses,
    selectedBusiness,
    loading,
    error,
    fetchBusinesses,
    fetchBusinessById,
    createBusiness,
    updateBusiness,
    deleteBusiness,
    searchBusinesses,
    setSelectedBusiness,
    clearError
  };
};
