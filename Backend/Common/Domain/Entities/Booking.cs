using SmartLocalBusiness.Domain.Enums;

namespace SmartLocalBusiness.Domain.Entities
{
    public class Booking
    {
        public int BookingId { get; set; }
        public int UserId { get; set; }
        public int BusinessId { get; set; }
        public int ServiceId { get; set; }
        public DateTime BookingDate { get; set; }
        public BookingStatus Status { get; set; } = BookingStatus.Pending;  // ✅ Changed to enum
        public decimal TotalAmount { get; set; }
        public string? Notes { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // 🟢 Navigation properties
        public virtual User? User { get; set; }
        public virtual Business? Business { get; set; }
        public virtual Service? Service { get; set; }
    }
}
