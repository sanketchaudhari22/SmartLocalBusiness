using SmartLocalBusiness.Domain.Entities;
using SmartLocalBusiness.Shared.DTOs;

namespace ReviewService.Interfaces
{
    public interface IReviewService
    {
        Task<IEnumerable<Review>> GetAllAsync();
        Task<Review?> GetByIdAsync(int id);
        Task<IEnumerable<Review>> GetByBusinessIdAsync(int businessId);
        Task<IEnumerable<Review>> GetByUserIdAsync(int userId); // ✅ new
        Task<object> GetAverageRatingAsync(int businessId);     // ✅ new
        Task<Review> AddAsync(ReviewDto dto);                   // ✅ changed
        Task<Review> UpdateAsync(int id, ReviewDto dto);        // ✅ changed
        Task DeleteAsync(int id);
    }
}
