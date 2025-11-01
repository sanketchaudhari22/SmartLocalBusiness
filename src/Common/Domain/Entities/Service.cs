namespace SmartLocalBusiness.Domain.Entities
{
    public class Service
    {
        public int ServiceId { get; set; }
        public int BusinessId { get; set; }
        public string ServiceName { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Duration { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}