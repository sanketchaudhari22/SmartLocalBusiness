// Review Types matching backend DTOs

export interface ReviewDto {
  reviewId: number;
  businessId: number;
  userId: number;
  rating: number;
  reviewText?: string;

  // UI EXPECTED FIELDS
  comment?: string; // alias
  userName?: string;
  businessName?: string;
  createdAt?: string;
}

export interface AverageRatingResponse {
  averageRating: number;
  totalReviews: number;
}
