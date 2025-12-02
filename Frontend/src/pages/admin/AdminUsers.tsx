import { useState, useEffect } from 'react';
import { UserManagement } from '@/components/admin/UserManagement';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { userApi } from '@/api';

export const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await userApi.getAll();
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBlockUser = async (userId: string) => {
    try {
      // await userApi.block(userId);
      console.log('Block user:', userId);
      await fetchUsers();
    } catch (error) {
      console.error('Failed to block user:', error);
    }
  };

  const handleSendEmail = (userId: string) => {
    console.log('Send email to user:', userId);
    // Implement email functionality
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-h2 text-neutral-900 mb-2">User Management</h1>
          <p className="text-neutral-600">
            Manage platform users and permissions
          </p>
        </div>

        <UserManagement
          users={users}
          loading={loading}
          onBlockUser={handleBlockUser}
          onSendEmail={handleSendEmail}
        />
      </div>
    </AdminLayout>
  );
};
