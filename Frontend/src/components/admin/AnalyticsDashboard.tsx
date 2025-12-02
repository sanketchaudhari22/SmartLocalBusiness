import { StatCard } from '../dashboard/StatCard';
import { Chart } from '../dashboard/Chart';
import { Users, Building2, Calendar, Star } from 'lucide-react';

interface AnalyticsDashboardProps {
  stats: {
    totalUsers: number;
    totalBusinesses: number;
    totalBookings: number;
    averageRating: number;
    usersTrend?: { value: number; isPositive: boolean };
    businessesTrend?: { value: number; isPositive: boolean };
    bookingsTrend?: { value: number; isPositive: boolean };
  };
  chartData?: {
    users: Array<{ label: string; value: number }>;
    businesses: Array<{ label: string; value: number }>;
    bookings: Array<{ label: string; value: number }>;
  };
  loading?: boolean;
}

export const AnalyticsDashboard = ({
  stats,
  chartData,
  loading = false
}: AnalyticsDashboardProps) => {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={<Users className="w-6 h-6" />}
          trend={stats.usersTrend}
          description="vs last month"
          color="primary"
        />
        <StatCard
          title="Total Businesses"
          value={stats.totalBusinesses}
          icon={<Building2 className="w-6 h-6" />}
          trend={stats.businessesTrend}
          description="vs last month"
          color="success"
        />
        <StatCard
          title="Total Bookings"
          value={stats.totalBookings}
          icon={<Calendar className="w-6 h-6" />}
          trend={stats.bookingsTrend}
          description="vs last month"
          color="warning"
        />
        <StatCard
          title="Average Rating"
          value={stats.averageRating.toFixed(1)}
          icon={<Star className="w-6 h-6" />}
          description="platform-wide"
          color="error"
        />
      </div>

      {/* Charts */}
      {chartData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Chart
            title="User Growth"
            data={chartData.users}
            type="line"
            icon={<Users className="w-5 h-5" />}
          />
          <Chart
            title="Business Growth"
            data={chartData.businesses}
            type="bar"
            icon={<Building2 className="w-5 h-5" />}
          />
        </div>
      )}

      {chartData && (
        <Chart
          title="Booking Trends"
          data={chartData.bookings}
          type="bar"
          height={250}
          icon={<Calendar className="w-5 h-5" />}
        />
      )}
    </div>
  );
};
