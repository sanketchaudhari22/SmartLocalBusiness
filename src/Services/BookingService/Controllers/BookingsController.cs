using Microsoft.AspNetCore.Mvc;
using SmartLocalBusiness.BookingService.Interfaces;
using SmartLocalBusiness.Shared.DTOs;

namespace SmartLocalBusiness.BookingService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingController : ControllerBase
    {
        private readonly IBookingService _bookingService;

        public BookingController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateBookingDto dto)
        {
            var booking = await _bookingService.CreateBookingAsync(dto);
            return Ok(new { success = true, message = "Booking created successfully", data = booking });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var booking = await _bookingService.GetBookingByIdAsync(id);
            return Ok(new { success = true, data = booking });
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserBookings(int userId)
        {
            var bookings = await _bookingService.GetUserBookingsAsync(userId);
            return Ok(new { success = true, data = bookings });
        }

        [HttpGet("business/{businessId}")]
        public async Task<IActionResult> GetBusinessBookings(int businessId)
        {
            var bookings = await _bookingService.GetBusinessBookingsAsync(businessId);
            return Ok(new { success = true, data = bookings });
        }

        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateStatusRequest request)
        {
            var booking = await _bookingService.UpdateBookingStatusAsync(id, request.Status);
            return Ok(new { success = true, message = "Status updated", data = booking });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Cancel(int id)
        {
            var result = await _bookingService.CancelBookingAsync(id);
            return Ok(new { success = result, message = result ? "Booking cancelled" : "Booking not found" });
        }
    }
}
