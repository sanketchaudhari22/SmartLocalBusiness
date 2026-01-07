'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/common/protected-route';
import { Navbar } from '@/components/layout/navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useBusinesses } from '@/lib/hooks';
import { UserType, Business } from '@/types';
import {
  ArrowLeft,
  Search,
  Store,
  MapPin,
  Star,
  CheckCircle,
  XCircle,
  Eye,
  Loader2,
  Shield,
  Clock,
} from 'lucide-react';
import { toast } from 'sonner';
import { formatDate } from '@/lib/utils';

function AdminBusinessesContent() {
  const { data: businesses, isLoading } = useBusinesses();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<'verify' | 'reject'>('verify');
  const [isProcessing, setIsProcessing] = useState(false);

  const pendingBusinesses = businesses?.filter((b) => !b.isVerified) || [];
  const verifiedBusinesses = businesses?.filter((b) => b.isVerified) || [];

  const filteredPending = pendingBusinesses.filter((business) =>
    business.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    business.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredVerified = verifiedBusinesses.filter((business) =>
    business.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    business.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAction = async () => {
    if (!selectedBusiness) return;

    setIsProcessing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success(
        actionType === 'verify'
          ? `${selectedBusiness.businessName} has been verified`
          : `${selectedBusiness.businessName} has been rejected`
      );
      setActionDialogOpen(false);
      setSelectedBusiness(null);
    } catch (error) {
      toast.error('Failed to process action');
    } finally {
      setIsProcessing(false);
    }
  };

  const BusinessCard = ({ business, showActions = false }: { business: Business; showActions?: boolean }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-lg font-semibold">{business.businessName}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {business.city}, {business.state}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {business.isVerified ? (
                  <Badge variant="success">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                ) : (
                  <Badge variant="warning">
                    <Clock className="h-3 w-3 mr-1" />
                    Pending
                  </Badge>
                )}
                {!business.isActive && (
                  <Badge variant="destructive">Inactive</Badge>
                )}
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {business.description || 'No description available'}
            </p>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="font-medium">{business.rating.toFixed(1)}</span>
                <span className="text-muted-foreground">({business.totalReviews} reviews)</span>
              </div>
              {business.category && (
                <Badge variant="outline">{business.category.categoryName}</Badge>
              )}
            </div>
          </div>

          <div className="flex gap-2 md:flex-col">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/business/${business.businessId}`}>
                <Eye className="h-4 w-4 mr-1" />
                View
              </Link>
            </Button>
            {showActions && (
              <>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => {
                    setSelectedBusiness(business);
                    setActionType('verify');
                    setActionDialogOpen(true);
                  }}
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Verify
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    setSelectedBusiness(business);
                    setActionType('reject');
                    setActionDialogOpen(true);
                  }}
                >
                  <XCircle className="h-4 w-4 mr-1" />
                  Reject
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin/dashboard"
            className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Business Management</h1>
              <p className="text-muted-foreground">Review and manage business listings</p>
            </div>
            <div className="flex items-center gap-2">
              {pendingBusinesses.length > 0 && (
                <Badge variant="warning" className="text-lg px-4 py-2">
                  <Clock className="h-4 w-4 mr-2" />
                  {pendingBusinesses.length} Pending
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search businesses by name or location..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Pending Verification
              {pendingBusinesses.length > 0 && (
                <Badge variant="secondary">{pendingBusinesses.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="verified" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Verified
            </TabsTrigger>
          </TabsList>

          {/* Pending Tab */}
          <TabsContent value="pending">
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredPending.length > 0 ? (
              <div className="space-y-4">
                {filteredPending.map((business) => (
                  <BusinessCard key={business.businessId} business={business} showActions />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-16 text-center">
                  <Shield className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">No Pending Verifications</h3>
                  <p className="text-muted-foreground">
                    All businesses have been reviewed
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Verified Tab */}
          <TabsContent value="verified">
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredVerified.length > 0 ? (
              <div className="space-y-4">
                {filteredVerified.map((business) => (
                  <BusinessCard key={business.businessId} business={business} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-16 text-center">
                  <Store className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">No Verified Businesses</h3>
                  <p className="text-muted-foreground">
                    Verified businesses will appear here
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Action Dialog */}
      <Dialog open={actionDialogOpen} onOpenChange={setActionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === 'verify' ? 'Verify Business' : 'Reject Business'}
            </DialogTitle>
            <DialogDescription>
              {actionType === 'verify'
                ? 'This will mark the business as verified and make it visible to users.'
                : 'This will reject the business application.'}
            </DialogDescription>
          </DialogHeader>
          {selectedBusiness && (
            <div className="py-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Store className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{selectedBusiness.businessName}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedBusiness.city}, {selectedBusiness.state}
                  </p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setActionDialogOpen(false)} disabled={isProcessing}>
              Cancel
            </Button>
            <Button
              variant={actionType === 'reject' ? 'destructive' : 'default'}
              onClick={handleAction}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : actionType === 'verify' ? (
                'Verify Business'
              ) : (
                'Reject Business'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function AdminBusinessesPage() {
  return (
    <ProtectedRoute allowedRoles={[UserType.Admin]}>
      <AdminBusinessesContent />
    </ProtectedRoute>
  );
}
