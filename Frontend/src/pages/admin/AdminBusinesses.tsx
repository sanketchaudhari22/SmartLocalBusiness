import { useState, useEffect } from 'react';
import { BusinessApprovals } from '@/components/admin/BusinessApprovals';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { businessApi } from '@/api';

export const AdminBusinesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    setLoading(true);
    try {
      const response = await businessApi.getAll();
      setBusinesses(response.data);
    } catch (error) {
      console.error('Failed to fetch businesses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveBusiness = async (businessId: string) => {
    try {
      await businessApi.update(businessId, { isActive: true });
      await fetchBusinesses();
    } catch (error) {
      console.error('Failed to approve business:', error);
    }
  };

  const handleRejectBusiness = async (businessId: string, reason?: string) => {
    try {
      console.log('Reject business:', businessId, 'Reason:', reason);
      // Implement rejection logic
      await fetchBusinesses();
    } catch (error) {
      console.error('Failed to reject business:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-h2 text-neutral-900 mb-2">Business Management</h1>
          <p className="text-neutral-600">
            Review and approve business listings
          </p>
        </div>

        <BusinessApprovals
          businesses={businesses}
          loading={loading}
          onApprove={handleApproveBusiness}
          onReject={handleRejectBusiness}
        />
      </div>
    </AdminLayout>
  );
};
