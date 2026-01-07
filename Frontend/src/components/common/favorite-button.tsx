'use client';

import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFavoritesStore } from '@/lib/stores/favorites.store';
import { useAuth } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface FavoriteButtonProps {
  businessId: string;
  businessName?: string;
  variant?: 'default' | 'icon';
  className?: string;
}

export function FavoriteButton({
  businessId,
  businessName,
  variant = 'icon',
  className,
}: FavoriteButtonProps) {
  const { isAuthenticated } = useAuth();
  const { toggleFavorite, isFavorite } = useFavoritesStore();

  const isFav = isFavorite(businessId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error('Please login to save favorites');
      return;
    }

    toggleFavorite(businessId);

    if (isFav) {
      toast.success(businessName ? `${businessName} removed from favorites` : 'Removed from favorites');
    } else {
      toast.success(businessName ? `${businessName} added to favorites` : 'Added to favorites');
    }
  };

  if (variant === 'icon') {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          'transition-colors',
          isFav
            ? 'text-red-500 hover:text-red-600 hover:bg-red-50'
            : 'text-muted-foreground hover:text-red-500 hover:bg-red-50',
          className
        )}
        onClick={handleClick}
      >
        <Heart className={cn('h-5 w-5', isFav && 'fill-current')} />
      </Button>
    );
  }

  return (
    <Button
      variant={isFav ? 'default' : 'outline'}
      className={cn(
        isFav && 'bg-red-500 hover:bg-red-600',
        className
      )}
      onClick={handleClick}
    >
      <Heart className={cn('h-4 w-4 mr-2', isFav && 'fill-current')} />
      {isFav ? 'Saved' : 'Save'}
    </Button>
  );
}
