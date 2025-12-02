import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { businessApi } from '@/api';
import { BusinessDto } from '@/types';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Alert } from '@/components/common/Alert';
import { useAuthStore } from '@/store';
import { useUIStore } from '@/store';
import { Plus, Edit, Trash2, Eye, Star, MapPin } from 'lucide-react';

export const MyBusinessesPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { addToast } = useUIStore();

  const [businesses, setBusinesses] = useState<BusinessDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    fetchMyBusinesses();
  }, []);

  const fetchMyBusinesses = async () => {
    if (!user?.userId) return;

    try {
      setLoading(true);
      setError('');

      const response = await businessApi.getBusinessesByUser(user.userId);
      setBusinesses(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to load businesses');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (businessId: number) => {
    if (!window.confirm('Are you sure you want to delete this business? This action cannot be undone.')) {
      return;
    }

    try {
      setDeletingId(businessId);
      await businessApi.deleteBusiness(businessId);

      setBusinesses((prev) => prev.filter((b) => b.businessId !== businessId));

      addToast({
        type: 'success',
        message: 'Business deleted successfully'
      });
    } catch (err: any) {
      addToast({
        type: 'error',
        message: err.message || 'Failed to delete business'
      });
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="container-custom py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-h1 mb-2">My Businesses</h1>
          <p className="text-body text-neutral-600">
            Manage your business listings
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => navigate('/businesses/create')}
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Business
        </Button>
      </div>

      {error && (
        <Alert type="error" onClose={() => setError('')} className="mb-6">
          {error}
        </Alert>
      )}

      {businesses.length === 0 ? (
        <Card>
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏢</div>
            <h3 className="text-h3 mb-2">No businesses yet</h3>
            <p className="text-body text-neutral-600 mb-6">
              Start by creating your first business listing
            </p>
            <Button
              variant="primary"
              onClick={() => navigate('/businesses/create')}
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Your First Business
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {businesses.map((business) => (
            <Card key={business.businessId}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-h4 mb-1">{business.businessName}</h3>
                  <span className="badge-info">{business.categoryName}</span>
                </div>
                {business.isActive ? (
                  <span className="badge-success">Active</span>
                ) : (
                  <span className="badge-error">Inactive</span>
                )}
              </div>

              <p className="text-body text-neutral-600 mb-4 line-clamp-2">
                {business.description || 'No description'}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm">
                    {business.rating?.toFixed(1) || '0.0'} ({business.totalReviews || 0})
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-neutral-400" />
                  <span className="text-sm text-neutral-600">{business.city}</span>
                </div>
              </div>

              <div className="border-t border-neutral-200 pt-4 mt-4">
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate(`/businesses/${business.businessId}`)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate(`/businesses/${business.businessId}/edit`)}
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(business.businessId)}
                    isLoading={deletingId === business.businessId}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
