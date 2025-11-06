using Microsoft.AspNetCore.Mvc;
using ReviewService.Interfaces;
using SmartLocalBusiness.Domain.Entities;
using SmartLocalBusiness.Shared.DTOs;
using SmartLocalBusiness.Shared.Responses;


using SmartLocalBusiness.Shared.Responses;

namespace ReviewController.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly IReviewService _reviewService;

        public ReviewController(IReviewService reviewService)
        {
            _reviewService = reviewService;
        }

        // 🔹 Get All Reviews
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var reviews = await _reviewService.GetAllAsync();
            return Ok(ApiResponse<IEnumerable<Review>>.SuccessResponse(reviews, "Reviews fetched successfully"));
        }

        // 🔹 Get Review by ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var review = await _reviewService.GetByIdAsync(id);
            if (review == null)
                return NotFound(ApiResponse<Review>.ErrorResponse("Review not found"));

            return Ok(ApiResponse<Review>.SuccessResponse(review, "Review fetched successfully"));
        }

        // 🔹 Get Reviews by Business ID
        [HttpGet("business/{businessId}")]
        public async Task<IActionResult> GetByBusinessId(int businessId)
        {
            var reviews = await _reviewService.GetByBusinessIdAsync(businessId);
            return Ok(ApiResponse<IEnumerable<Review>>.SuccessResponse(reviews, "Reviews fetched successfully"));
        }

        // 🔹 Add Review (using DTO)
        [HttpPost]
        public async Task<IActionResult> Add([FromBody] ReviewDto reviewDto)
        {
            if (reviewDto == null)
                return BadRequest(ApiResponse<Review>.ErrorResponse("Invalid review data"));

            var review = new Review
            {
                BusinessId = reviewDto.BusinessId,
                UserId = reviewDto.UserId,
                Rating = reviewDto.Rating,
                ReviewText = reviewDto.ReviewText,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            await _reviewService.AddAsync(review);
            return Ok(ApiResponse<Review>.SuccessResponse(review, "Review added successfully"));
        }

        // 🔹 Update Review (using DTO)
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ReviewDto reviewDto)
        {
            if (reviewDto == null || id != reviewDto.ReviewId)
                return BadRequest(ApiResponse<Review>.ErrorResponse("Invalid or mismatched review data"));

            var existingReview = await _reviewService.GetByIdAsync(id);
            if (existingReview == null)
                return NotFound(ApiResponse<Review>.ErrorResponse("Review not found"));

            existingReview.Rating = reviewDto.Rating;
            existingReview.ReviewText = reviewDto.ReviewText;
            existingReview.UpdatedAt = DateTime.UtcNow;

            await _reviewService.UpdateAsync(existingReview);
            return Ok(ApiResponse<Review>.SuccessResponse(existingReview, "Review updated successfully"));
        }

        // 🔹 Delete Review
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _reviewService.DeleteAsync(id);
            return Ok(ApiResponse<object>.SuccessResponse(null, "Review deleted successfully"));
        }
    }
}
