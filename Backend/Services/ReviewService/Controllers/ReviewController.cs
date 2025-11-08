using Microsoft.AspNetCore.Mvc;
using ReviewService.Interfaces;
using SmartLocalBusiness.Domain.Entities;
using SmartLocalBusiness.Shared.DTOs;
using SmartLocalBusiness.Shared.Responses;

namespace ReviewController.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewController : ControllerBase
    {
        private readonly IReviewService _reviewService;
        public ReviewController(IReviewService reviewService)
        {
            _reviewService = reviewService;
        }

        // ✅ All Reviews
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var reviews = await _reviewService.GetAllAsync();
            return Ok(ApiResponse<IEnumerable<Review>>.SuccessResponse(reviews));
        }

        // ✅ Review by Id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var review = await _reviewService.GetByIdAsync(id);
            return review == null
                ? NotFound(ApiResponse<Review>.ErrorResponse("Review not found"))
                : Ok(ApiResponse<Review>.SuccessResponse(review));
        }

        // ✅ Reviews by Business
        [HttpGet("business/{businessId}")]
        public async Task<IActionResult> GetByBusinessId(int businessId)
        {
            var reviews = await _reviewService.GetByBusinessIdAsync(businessId);
            return Ok(ApiResponse<IEnumerable<Review>>.SuccessResponse(reviews));
        }

        // 🆕 Reviews by User
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetByUserId(int userId)
        {
            var reviews = await _reviewService.GetByUserIdAsync(userId);
            return Ok(ApiResponse<IEnumerable<Review>>.SuccessResponse(reviews));
        }

        // 🆕 Average Rating for Business
        [HttpGet("business/{businessId}/average")]
        public async Task<IActionResult> GetAverageRating(int businessId)
        {
            var result = await _reviewService.GetAverageRatingAsync(businessId);
            return Ok(ApiResponse<object>.SuccessResponse(result, "Average rating fetched"));
        }

        // ✅ Add Review
        [HttpPost]
        public async Task<IActionResult> Add([FromBody] ReviewDto dto)
        {
            var review = await _reviewService.AddAsync(dto);
            return Ok(ApiResponse<Review>.SuccessResponse(review, "Review added successfully"));
        }

        // ✅ Update
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ReviewDto dto)
        {
            var review = await _reviewService.UpdateAsync(id, dto);
            return Ok(ApiResponse<Review>.SuccessResponse(review, "Review updated successfully"));
        }

        // ✅ Delete
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _reviewService.DeleteAsync(id);
            return Ok(ApiResponse<object>.SuccessResponse(null, "Review deleted"));
        }
    }
}
