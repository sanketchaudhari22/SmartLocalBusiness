using Microsoft.EntityFrameworkCore;
using SmartLocalBusiness.BookingService.Interfaces;
using SmartLocalBusiness.Domain.Entities;
using SmartLocalBusiness.Infrastructure.Data;
using SmartLocalBusiness.Shared.DTOs;

namespace SmartLocalBusiness.BookingService.Services
{
    public class BookingService : IBookingService
    {
        private readonly ApplicationDbContext _context;
        public BookingService(ApplicationDbContext context)
        {
            _context = context;
        }

        // ✅ Create
        public async Task<BookingDto> CreateBookingAsync(CreateBookingDto dto)
        {
            var service = await _context.Services.Include(s => s.Business)
                .FirstOrDefaultAsync(s => s.ServiceId == dto.ServiceId)
                ?? throw new Exception("Service not found");

            var booking = new Booking
            {
                UserId = dto.UserId,
                BusinessId = dto.BusinessId,
                ServiceId = dto.ServiceId,
                BookingDate = dto.BookingDate,
                Status = "Pending",
                TotalAmount = service.Price,
                Notes = dto.Notes,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();
            return await GetBookingByIdAsync(booking.BookingId);
        }

        // ✅ Get Booking by ID
        public async Task<BookingDto> GetBookingByIdAsync(int bookingId)
        {
            var booking = await _context.Bookings
                .Include(b => b.User)
                .Include(b => b.Business)
                .Include(b => b.Service)
                .FirstOrDefaultAsync(b => b.BookingId == bookingId)
                ?? throw new Exception("Booking not found");

            return MapToDto(booking);
        }

        // ✅ Get User Bookings
        public async Task<List<BookingDto>> GetUserBookingsAsync(int userId)
        {
            var bookings = await _context.Bookings
                .Include(b => b.Business)
                .Include(b => b.Service)
                .Where(b => b.UserId == userId)
                .OrderByDescending(b => b.CreatedAt)
                .ToListAsync();

            return bookings.Select(MapToDto).ToList();
        }

        // ✅ Get Business Bookings
        public async Task<List<BookingDto>> GetBusinessBookingsAsync(int businessId)
        {
            var bookings = await _context.Bookings
                .Include(b => b.User)
                .Include(b => b.Service)
                .Where(b => b.BusinessId == businessId)
                .OrderByDescending(b => b.CreatedAt)
                .ToListAsync();

            return bookings.Select(MapToDto).ToList();
        }

        // 🆕 Upcoming Bookings
        public async Task<List<BookingDto>> GetUpcomingBookingsAsync(int userId)
        {
            var now = DateTime.UtcNow;
            var upcoming = await _context.Bookings
                .Where(b => b.UserId == userId && b.BookingDate > now && b.Status != "Cancelled")
                .Include(b => b.Business)
                .Include(b => b.Service)
                .OrderBy(b => b.BookingDate)
                .ToListAsync();

            return upcoming.Select(MapToDto).ToList();
        }

        // 🆕 Booking History
        public async Task<List<BookingDto>> GetBookingHistoryAsync(int userId)
        {
            var now = DateTime.UtcNow;
            var history = await _context.Bookings
                .Where(b => b.UserId == userId && b.BookingDate <= now)
                .Include(b => b.Business)
                .Include(b => b.Service)
                .OrderByDescending(b => b.BookingDate)
                .ToListAsync();

            return history.Select(MapToDto).ToList();
        }

        // ✅ Update Status
        public async Task<BookingDto> UpdateBookingStatusAsync(int bookingId, string status)
        {
            var booking = await _context.Bookings.FindAsync(bookingId)
                ?? throw new Exception("Booking not found");

            var validStatuses = new[] { "Pending", "Confirmed", "Completed", "Cancelled" };
            if (!validStatuses.Contains(status))
                throw new Exception("Invalid status");

            booking.Status = status;
            booking.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return await GetBookingByIdAsync(bookingId);
        }

        // ✅ Cancel Booking
        public async Task<bool> CancelBookingAsync(int bookingId)
        {
            var booking = await _context.Bookings.FindAsync(bookingId);
            if (booking == null) return false;

            booking.Status = "Cancelled";
            booking.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return true;
        }

        private static BookingDto MapToDto(Booking b) => new()
        {
            BookingId = b.BookingId,
            UserId = b.UserId,
            BusinessId = b.BusinessId,
            ServiceId = b.ServiceId,
            BookingDate = b.BookingDate,
            Status = b.Status,
            TotalAmount = b.TotalAmount,
            Notes = b.Notes
        };
    }
}
