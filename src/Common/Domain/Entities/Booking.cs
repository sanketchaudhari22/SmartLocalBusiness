namespace SmartLocalBusiness.Domain.Entities
{
    public class Booking
    {
        public int BookingId { get; set; }
        public int UserId { get; set; }
        public int BusinessId { get; set; }
        public int ServiceId { get; set; }
        public DateTime BookingDate { get; set; }
        public string Status { get; set; } = "Pending";
        public decimal TotalAmount { get; set; }
        public string? Notes { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // 🟢 Add these navigation properties
        public virtual User? User { get; set; }
        public virtual Business? Business { get; set; }
        public virtual Service? Service { get; set; }
    }
}
