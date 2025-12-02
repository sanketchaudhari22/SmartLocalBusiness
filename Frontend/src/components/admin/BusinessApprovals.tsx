import { useState } from 'react';
import { Business } from '@/types';
import { DataTable, Column } from './DataTable';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { Check, X, Eye } from 'lucide-react';
import { formatDate } from '@/utils/formatters';

interface BusinessApprovalsProps {
  businesses: Business[];
  loading?: boolean;
  onApprove?: (businessId: string) => Promise<void>;
  onReject?: (businessId: string, reason?: string) => Promise<void>;
}

export const BusinessApprovals = ({
  businesses,
  loading = false,
  onApprove,
  onReject
}: BusinessApprovalsProps) => {
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
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

  const pendingBusinesses = businesses.filter(b => !b.isActive);

  const sortedBusinesses = [...pendingBusinesses].sort((a, b) => {
    const aValue = (a as any)[sortColumn];
    const bValue = (b as any)[sortColumn];

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleApprove = async (businessId: string) => {
    if (onApprove) {
      await onApprove(businessId);
    }
  };

  const handleReject = async () => {
    if (selectedBusiness && onReject) {
      await onReject(selectedBusiness.id, rejectReason);
      setIsRejectModalOpen(false);
      setRejectReason('');
      setSelectedBusiness(null);
    }
  };

  const columns: Column<Business>[] = [
    {
      key: 'name',
      label: 'Business Name',
      sortable: true,
      render: (value, business) => (
        <div>
          <p className="font-medium">{value}</p>
          <p className="text-xs text-neutral-500">{business.category}</p>
        </div>
      )
    },
    {
      key: 'address',
      label: 'Location',
      render: (value, business) => (
        <div>
          <p>{value}</p>
          <p className="text-xs text-neutral-500">
            {business.city}, {business.state}
          </p>
        </div>
      )
    },
    {
      key: 'createdAt',
      label: 'Submitted',
      sortable: true,
      render: (value) => formatDate(value)
    },
    {
      key: 'isActive',
      label: 'Status',
      render: (value) => (
        <Badge variant={value ? 'success' : 'warning'}>
          {value ? 'Approved' : 'Pending'}
        </Badge>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, business) => (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedBusiness(business);
              setIsModalOpen(true);
            }}
            leftIcon={<Eye className="w-4 h-4" />}
          >
            View
          </Button>
          {onApprove && !business.isActive && (
            <Button
              size="sm"
              variant="success"
              onClick={(e) => {
                e.stopPropagation();
                handleApprove(business.id);
              }}
              leftIcon={<Check className="w-4 h-4" />}
            >
              Approve
            </Button>
          )}
          {onReject && !business.isActive && (
            <Button
              size="sm"
              variant="error"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedBusiness(business);
                setIsRejectModalOpen(true);
              }}
              leftIcon={<X className="w-4 h-4" />}
            >
              Reject
            </Button>
          )}
        </div>
      ),
      width: '300px'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-h4 text-neutral-900">
          Pending Approvals ({pendingBusinesses.length})
        </h3>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={sortedBusinesses}
        loading={loading}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={handleSort}
        emptyMessage="No pending approvals"
      />

      {/* View Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedBusiness(null);
        }}
        title="Business Details"
        size="lg"
      >
        {selectedBusiness && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-neutral-700">Business Name</label>
              <p className="text-neutral-900">{selectedBusiness.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-700">Description</label>
              <p className="text-neutral-900">{selectedBusiness.description}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-700">Category</label>
              <p className="text-neutral-900">{selectedBusiness.category}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-700">Location</label>
              <p className="text-neutral-900">
                {selectedBusiness.address}, {selectedBusiness.city}, {selectedBusiness.state}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-700">Contact</label>
              <p className="text-neutral-900">
                Phone: {selectedBusiness.phone}<br />
                Email: {selectedBusiness.email}
              </p>
            </div>
          </div>
        )}
      </Modal>

      {/* Reject Modal */}
      <Modal
        isOpen={isRejectModalOpen}
        onClose={() => {
          setIsRejectModalOpen(false);
          setRejectReason('');
          setSelectedBusiness(null);
        }}
        title="Reject Business"
      >
        <div className="space-y-4">
          <p className="text-neutral-700">
            Are you sure you want to reject this business? Please provide a reason:
          </p>
          <textarea
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="Reason for rejection..."
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            rows={4}
          />
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setIsRejectModalOpen(false);
                setRejectReason('');
              }}
            >
              Cancel
            </Button>
            <Button variant="error" onClick={handleReject}>
              Reject Business
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
