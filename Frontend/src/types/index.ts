// Export individual DTOs
export * from './api.types';
export * from './booking.types';
export * from './business.types';
export * from './category.types';
export * from './review.types';
export * from './service.types';
export * from './search.types';
export * from './user.types';

// Backward compatibility aliases (old UI code support)
export type Business = import('./business.types').BusinessDto;
export type Service = import('./service.types').ServiceDto;
export type Review = import('./review.types').ReviewDto;
export type Booking = import('./booking.types').BookingDto;

// Explicit exports for stores (very important)
export { 
  BookingStatus,
  type CreateBookingDto,
  type BookingDto,
  type UpdateStatusRequest
} from './booking.types';

export {
  type CreateBusinessDto,
  type BusinessDto
} from './business.types';

export {
  type CreateCategoryDto,
  type CategoryDto
} from './category.types';

export {
  type ReviewDto,
  type AverageRatingResponse
} from './review.types';

export {
  type ServiceDto,
  type CreateServiceDto,
  type UpdateServiceDto
} from './service.types';

export {
  type SearchRequest,
  type PagedResult
} from './search.types';

export {
  type UserDto,
  type RegisterUserDto,
  type LoginDto,
  type LoginResponse
} from './user.types';
