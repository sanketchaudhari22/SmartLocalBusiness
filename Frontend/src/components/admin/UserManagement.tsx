import { useState } from 'react';
import { User } from '@/types';
import { DataTable, Column } from './DataTable';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Modal } from '../common/Modal';
import { Search, UserX, UserCheck, Mail } from 'lucide-react';
import { formatDate } from '@/utils/formatters';

interface UserManagementProps {
  users: User[];
  loading?: boolean;
  onBlockUser?: (userId: string) => Promise<void>;
  onUnblockUser?: (userId: string) => Promise<void>;
  onSendEmail?: (userId: string) => void;
}

export const UserManagement = ({
  users,
  loading = false,
  onBlockUser,
  onUnblockUser,
  onSendEmail
}: UserManagementProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortColumn, setSortColumn] = useState<string>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.firstName?.toLowerCase().includes(query) ||
      user.lastName?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query)
    );
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const aValue = (a as any)[sortColumn];
    const bValue = (b as any)[sortColumn];

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const columns: Column<User>[] = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (_, user) => (
        <div>
          <p className="font-medium">{`${user.firstName} ${user.lastName}`}</p>
          <p className="text-xs text-neutral-500">{user.email}</p>
        </div>
      )
    },
    {
      key: 'userType',
      label: 'Type',
      sortable: true,
      render: (value) => (
        <Badge variant={value === 'Owner' ? 'primary' : 'secondary'}>
          {value}
        </Badge>
      )
    },
    {
      key: 'createdAt',
      label: 'Joined',
      sortable: true,
      render: (value) => formatDate(value)
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, user) => (
        <div className="flex items-center gap-2">
          {onSendEmail && (
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                onSendEmail(user.id);
              }}
              leftIcon={<Mail className="w-4 h-4" />}
            >
              Email
            </Button>
          )}
          {onBlockUser && (
            <Button
              size="sm"
              variant="error"
              onClick={(e) => {
                e.stopPropagation();
                onBlockUser(user.id);
              }}
              leftIcon={<UserX className="w-4 h-4" />}
            >
              Block
            </Button>
          )}
        </div>
      ),
      width: '250px'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-5 h-5" />}
          />
        </div>
        <div className="text-sm text-neutral-600">
          {filteredUsers.length} users
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={sortedUsers}
        loading={loading}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={handleSort}
        onRowClick={(user) => {
          setSelectedUser(user);
          setIsModalOpen(true);
        }}
        emptyMessage="No users found"
      />

      {/* User Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedUser(null);
        }}
        title="User Details"
      >
        {selectedUser && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-neutral-700">Name</label>
              <p className="text-neutral-900">
                {selectedUser.firstName} {selectedUser.lastName}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-700">Email</label>
              <p className="text-neutral-900">{selectedUser.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-700">User Type</label>
              <p className="text-neutral-900">{selectedUser.userType}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-700">Joined</label>
              <p className="text-neutral-900">{formatDate(selectedUser.createdAt)}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
