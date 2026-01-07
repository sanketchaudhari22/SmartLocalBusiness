using SmartLocalBusiness.Shared.DTOs;
using SmartLocalBusiness.Shared.Enums;

namespace SmartLocalBusiness.BookingService.Interfaces
{
    public interface IBookingService
    {
        Task<BookingDto> CreateBookingAsync(CreateBookingDto dto);
        Task<BookingDto> GetBookingByIdAsync(int bookingId);
        Task<List<BookingDto>> GetUserBookingsAsync(int userId);
        Task<List<BookingDto>> GetBusinessBookingsAsync(int businessId);
        Task<BookingDto> UpdateBookingStatusAsync(int bookingId, BookingStatus status);
        Task<bool> CancelBookingAsync(int bookingId);
        Task<List<BookingDto>> GetUpcomingBookingsAsync(int userId);
        Task<List<BookingDto>> GetBookingHistoryAsync(int userId);

    }
}