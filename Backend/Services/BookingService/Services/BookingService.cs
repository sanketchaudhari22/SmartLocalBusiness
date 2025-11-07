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

        public async Task<BookingDto> CreateBookingAsync(CreateBookingDto dto)
        {
            var service = await _context.Services
                .Include(s => s.Business)
                .FirstOrDefaultAsync(s => s.ServiceId == dto.ServiceId);

            if (service == null)
                throw new Exception("Service not found");

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

        public async Task<BookingDto> GetBookingByIdAsync(int bookingId)
        {
            var booking = await _context.Bookings
                .Include(b => b.User)
                .Include(b => b.Business)
                .Include(b => b.Service)
                .FirstOrDefaultAsync(b => b.BookingId == bookingId);

            if (booking == null)
                throw new Exception("Booking not found");

            return MapToDto(booking);
        }

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

        public async Task<BookingDto> UpdateBookingStatusAsync(int bookingId, string status)
        {
            var booking = await _context.Bookings.FindAsync(bookingId);
            if (booking == null)
                throw new Exception("Booking not found");

            var validStatuses = new[] { "Pending", "Confirmed", "Completed", "Cancelled" };
            if (!validStatuses.Contains(status))
                throw new Exception("Invalid status");

            booking.Status = status;
            booking.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return await GetBookingByIdAsync(bookingId);
        }

        public async Task<bool> CancelBookingAsync(int bookingId)
        {
            var booking = await _context.Bookings.FindAsync(bookingId);
            if (booking == null) return false;

            booking.Status = "Cancelled";
            booking.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return true;
        }

        private static BookingDto MapToDto(Booking booking)
        {
            return new BookingDto
            {
                BookingId = booking.BookingId,
                UserId = booking.UserId,
                BusinessId = booking.BusinessId,
                ServiceId = booking.ServiceId,
                BookingDate = booking.BookingDate,
                Status = booking.Status,
                TotalAmount = booking.TotalAmount,
                Notes = booking.Notes
            };
        }
    }
}
