namespace SmartLocalBusiness.Shared.DTOs
{
     public class BookingDto
    {
        public int BookingId { get; set; }
        public int UserId { get; set; }
        public int BusinessId { get; set; }
        public int ServiceId { get; set; }
        public DateTime BookingDate { get; set; }
        public string Status { get; set; }
        public decimal TotalAmount { get; set; }
        public string Notes { get; set; }
    }

    public class CreateBookingDto
    {
        public int UserId { get; set; }
        public int BusinessId { get; set; }
        public int ServiceId { get; set; }
        public DateTime BookingDate { get; set; }
        public string Notes { get; set; }
    }
}