using Microsoft.AspNetCore.Mvc;
using SmartLocalBusiness.BookingService.Interfaces;
using SmartLocalBusiness.Shared.DTOs;

namespace SmartLocalBusiness.BookingService.Controllers
{
    [ApiController]
    [Route("api/booking")]
    public class BookingController : ControllerBase
    {
        private readonly IBookingService _bookingService;
        public BookingController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }

        // ✅ Create
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateBookingDto dto)
        {
            var booking = await _bookingService.CreateBookingAsync(dto);
            return Ok(new { success = true, message = "Booking created successfully", data = booking });
        }

        // ✅ Get By Id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var booking = await _bookingService.GetBookingByIdAsync(id);
            return Ok(new { success = true, data = booking });
        }

        // ✅ User Bookings
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserBookings(int userId)
        {
            var bookings = await _bookingService.GetUserBookingsAsync(userId);
            return Ok(new { success = true, data = bookings });
        }

        // ✅ Business Bookings
        [HttpGet("business/{businessId}")]
        public async Task<IActionResult> GetBusinessBookings(int businessId)
        {
            var bookings = await _bookingService.GetBusinessBookingsAsync(businessId);
            return Ok(new { success = true, data = bookings });
        }

        // ✅ Update Status
        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateStatusRequest request)
        {
            var booking = await _bookingService.UpdateBookingStatusAsync(id, request.Status);
            return Ok(new { success = true, message = "Status updated", data = booking });
        }

        // ✅ Cancel
        [HttpDelete("{id}")]
        public async Task<IActionResult> Cancel(int id)
        {
            var result = await _bookingService.CancelBookingAsync(id);
            return Ok(new { success = result, message = result ? "Booking cancelled" : "Booking not found" });
        }

        // 🆕 Upcoming bookings
        [HttpGet("user/{userId}/upcoming")]
        public async Task<IActionResult> GetUpcomingBookings(int userId)
        {
            var bookings = await _bookingService.GetUpcomingBookingsAsync(userId);
            return Ok(new { success = true, data = bookings });
        }

        // 🆕 Booking History
        [HttpGet("user/{userId}/history")]
        public async Task<IActionResult> GetHistory(int userId)
        {
            var bookings = await _bookingService.GetBookingHistoryAsync(userId);
            return Ok(new { success = true, data = bookings });
        }
    }
}
