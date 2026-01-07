import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { businessApi } from '@/lib/api';
import { CreateBusinessRequest } from '@/types';
import { toast } from 'sonner';

/**
 * Get all businesses
 */
export function useBusinesses() {
  return useQuery({
    queryKey: ['businesses'],
    queryFn: () => businessApi.getAll(),
  });
}

/**
 * Get business by ID
 */
export function useBusiness(id?: string) {
  return useQuery({
    queryKey: ['business', id],
    queryFn: () => businessApi.getById(id!),
    enabled: !!id,
  });
}

/**
 * Get businesses by category
 */
export function useBusinessesByCategory(categoryId?: string) {
  return useQuery({
    queryKey: ['businesses', 'category', categoryId],
    queryFn: () => businessApi.getByCategory(categoryId!),
    enabled: !!categoryId,
  });
}

/**
 * Get my businesses (business owner)
 */
export function useMyBusinesses(userId?: string) {
  return useQuery({
    queryKey: ['businesses', 'user', userId],
    queryFn: () => businessApi.getMyBusinesses(userId!),
    enabled: !!userId,
  });
}

/**
 * Create business mutation
 */
export function useCreateBusiness() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBusinessRequest) => businessApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['businesses'] });
      toast.success('Business created successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create business');
    },
  });
}

/**
 * Update business mutation
 */
export function useUpdateBusiness() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateBusinessRequest> }) =>
      businessApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['business', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['businesses'] });
      toast.success('Business updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update business');
    },
  });
}

/**
 * Delete business mutation
 */
export function useDeleteBusiness() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => businessApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['businesses'] });
      toast.success('Business deleted successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete business');
    },
  });
}
