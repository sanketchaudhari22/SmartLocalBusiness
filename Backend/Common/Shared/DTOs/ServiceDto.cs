namespace SmartLocalBusiness.Shared.DTOs
{
    public class ServiceDto
    {
        public int ServiceId { get; set; }
        public int BusinessId { get; set; }
        public string ServiceName { get; set; } = string.Empty;
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int? Duration { get; set; } // Duration in minutes
    }

    public class CreateServiceDto
    {
        public int BusinessId { get; set; }
        public string ServiceName { get; set; } = string.Empty;
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int? Duration { get; set; }
    }

    public class UpdateServiceDto
    {
        public string? ServiceName { get; set; }
        public string? Description { get; set; }
        public decimal? Price { get; set; }
        public int? Duration { get; set; }
    }
}
