import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { useAuthStore } from '@/store';
import { User, Mail, Phone, Calendar, Edit, Key } from 'lucide-react';
import { format } from 'date-fns';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  if (!user) {
    return null;
  }

  return (
    <div className="container-custom py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-h1 mb-8">My Profile</h1>

        <Card className="mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-primary-600" />
              </div>
              <div>
                <h2 className="text-h2 mb-1">
                  {user.firstName} {user.lastName}
                </h2>
                <span className="badge-info">{user.userType}</span>
              </div>
            </div>
            <Button
              variant="secondary"
              onClick={() => navigate('/profile/edit')}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-neutral-700">
              <Mail className="w-5 h-5 text-neutral-400" />
              <div>
                <p className="text-sm text-neutral-500">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>

            {user.phone && (
              <div className="flex items-center space-x-3 text-neutral-700">
                <Phone className="w-5 h-5 text-neutral-400" />
                <div>
                  <p className="text-sm text-neutral-500">Phone</p>
                  <p className="font-medium">{user.phone}</p>
                </div>
              </div>
            )}

            <div className="flex items-center space-x-3 text-neutral-700">
              <Calendar className="w-5 h-5 text-neutral-400" />
              <div>
                <p className="text-sm text-neutral-500">Member Since</p>
                <p className="font-medium">
                  {format(new Date(user.createdAt), 'MMMM dd, yyyy')}
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-h3 mb-4">Security</h3>
          <Button
            variant="secondary"
            onClick={() => navigate('/profile/change-password')}
          >
            <Key className="w-4 h-4 mr-2" />
            Change Password
          </Button>
        </Card>
      </div>
    </div>
  );
};
