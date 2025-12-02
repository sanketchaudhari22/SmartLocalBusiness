import { AnalyticsDashboard } from '@/components/admin/AnalyticsDashboard';
import { AdminLayout } from '@/components/layout/AdminLayout';

export const AdminDashboard = () => {
  // Mock stats data
  const stats = {
    totalUsers: 5234,
    totalBusinesses: 1842,
    totalBookings: 12567,
    averageRating: 4.6,
    usersTrend: { value: 8.5, isPositive: true },
    businessesTrend: { value: 12.3, isPositive: true },
    bookingsTrend: { value: 5.2, isPositive: true }
  };

  const chartData = {
    users: [
      { label: 'Jan', value: 450 },
      { label: 'Feb', value: 520 },
      { label: 'Mar', value: 680 },
      { label: 'Apr', value: 750 },
      { label: 'May', value: 890 },
      { label: 'Jun', value: 944 }
    ],
    businesses: [
      { label: 'Jan', value: 120 },
      { label: 'Feb', value: 145 },
      { label: 'Mar', value: 180 },
      { label: 'Apr', value: 210 },
      { label: 'May', value: 245 },
      { label: 'Jun', value: 280 }
    ],
    bookings: [
      { label: 'Mon', value: 145 },
      { label: 'Tue', value: 189 },
      { label: 'Wed', value: 167 },
      { label: 'Thu', value: 234 },
      { label: 'Fri', value: 289 },
      { label: 'Sat', value: 356 },
      { label: 'Sun', value: 198 }
    ]
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-h2 text-neutral-900 mb-2">Admin Dashboard</h1>
          <p className="text-neutral-600">
            Platform overview and analytics
          </p>
        </div>

        <AnalyticsDashboard stats={stats} chartData={chartData} />
      </div>
    </AdminLayout>
  );
};
