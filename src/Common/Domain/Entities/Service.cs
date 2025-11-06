namespace SmartLocalBusiness.Domain.Entities
{
    public class Service
    {
        public int ServiceId { get; set; }
        public string ServiceName { get; set; } = string.Empty;
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int BusinessId { get; set; }

        public Business? Business { get; set; }

        public ICollection<Booking>? Bookings { get; set; }
    }
}
