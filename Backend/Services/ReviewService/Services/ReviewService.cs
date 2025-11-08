using Microsoft.EntityFrameworkCore;
using ReviewService.Interfaces;
using SmartLocalBusiness.Domain.Entities;
using SmartLocalBusiness.Infrastructure.Data;
using SmartLocalBusiness.Shared.DTOs;

namespace ReviewService.Services
{
    public class ReviewService : IReviewService
    {
        private readonly ApplicationDbContext _context;

        public ReviewService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Review>> GetAllAsync()
        {
            return await _context.Reviews
                .Include(r => r.User)
                .Include(r => r.Business)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();
        }

        public async Task<Review?> GetByIdAsync(int id)
        {
            return await _context.Reviews
                .Include(r => r.User)
                .Include(r => r.Business)
                .FirstOrDefaultAsync(r => r.ReviewId == id);
        }

        public async Task<IEnumerable<Review>> GetByBusinessIdAsync(int businessId)
        {
            return await _context.Reviews
                .Where(r => r.BusinessId == businessId)
                .Include(r => r.User)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();
        }

        public async Task<IEnumerable<Review>> GetByUserIdAsync(int userId)
        {
            return await _context.Reviews
                .Where(r => r.UserId == userId)
                .Include(r => r.Business)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();
        }

        public async Task<object> GetAverageRatingAsync(int businessId)
        {
            var avg = await _context.Reviews
                .Where(r => r.BusinessId == businessId)
                .AverageAsync(r => (double?)r.Rating) ?? 0;

            return new { BusinessId = businessId, AverageRating = Math.Round(avg, 2) };
        }

        public async Task<Review> AddAsync(ReviewDto dto)
        {
            var review = new Review
            {
                BusinessId = dto.BusinessId,
                UserId = dto.UserId,
                Rating = dto.Rating,
                ReviewText = dto.ReviewText,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            await _context.Reviews.AddAsync(review);
            await _context.SaveChangesAsync();
            return review;
        }

        public async Task<Review> UpdateAsync(int id, ReviewDto dto)
        {
            var review = await _context.Reviews.FindAsync(id);
            if (review == null)
                throw new Exception("Review not found");

            review.Rating = dto.Rating;
            review.ReviewText = dto.ReviewText;
            review.UpdatedAt = DateTime.UtcNow;

            _context.Reviews.Update(review);
            await _context.SaveChangesAsync();
            return review;
        }

        public async Task DeleteAsync(int id)
        {
            var review = await _context.Reviews.FindAsync(id);
            if (review != null)
            {
                _context.Reviews.Remove(review);
                await _context.SaveChangesAsync();
            }
        }
    }
}
