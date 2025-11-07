using SmartLocalBusiness.Shared.DTOs;

namespace SmartLocalBusiness.BookingService.Interfaces
{
    public interface IBookingService
    {
        Task<BookingDto> CreateBookingAsync(CreateBookingDto dto);
        Task<BookingDto> GetBookingByIdAsync(int bookingId);
        Task<List<BookingDto>> GetUserBookingsAsync(int userId);
        Task<List<BookingDto>> GetBusinessBookingsAsync(int businessId);
        Task<BookingDto> UpdateBookingStatusAsync(int bookingId, string status);
        Task<bool> CancelBookingAsync(int bookingId);
    }
}
